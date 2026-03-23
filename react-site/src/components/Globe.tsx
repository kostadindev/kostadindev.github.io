import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Html } from '@react-three/drei';
import * as THREE from 'three';
import earcut from 'earcut';
import { travelCountries } from '../data/content';
import {
  Box,
  Container,
  Typography,
  Stack,
  Chip,
  Grid,
  Link,
} from '@mui/material';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import HikingIcon from '@mui/icons-material/Hiking';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const NATIVE_ID = '100';
const LIVED_IDS = new Set(['840', '826']);

const allIds = new Set(
  Object.values(travelCountries).flatMap((list) => list.map((c) => c.id))
);

const totalCountries = allIds.size;

const regions = [
  { key: 'europe' as const, label: 'Europe', count: travelCountries.europe.length },
  { key: 'northAmerica' as const, label: 'N. America', count: travelCountries.northAmerica.length },
  { key: 'caribbean' as const, label: 'Caribbean', count: travelCountries.caribbean.length },
  { key: 'middleEast' as const, label: 'Middle East', count: travelCountries.middleEast.length },
  { key: 'southAmerica' as const, label: 'S. America', count: travelCountries.southAmerica.length },
];

const PINS: { name: string; label: string; lat: number; lng: number }[] = [
  { name: 'Sofia', label: 'Native', lat: 42.6977, lng: 23.3219 },
  { name: 'New York', label: 'Lived', lat: 40.7128, lng: -74.006 },
  { name: 'Cambridge', label: 'Current', lat: 52.2053, lng: 0.1218 },
  { name: 'Hilo', label: 'Lived', lat: 19.7241, lng: -155.09 },
];

const RADIUS = 2;

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function decodeArcs(topo: any): number[][][] {
  const { arcs: rawArcs, transform } = topo;
  const { scale, translate } = transform;
  return rawArcs.map((arc: number[][]) => {
    let x = 0, y = 0;
    return arc.map((point: number[]) => {
      x += point[0];
      y += point[1];
      return [x * scale[0] + translate[0], y * scale[1] + translate[1]];
    });
  });
}

function getArcCoords(arcs: number[][][], indices: number[]): number[][] {
  const coords: number[][] = [];
  for (const idx of indices) {
    const arc = idx >= 0 ? arcs[idx] : arcs[~idx].slice().reverse();
    const start = coords.length > 0 ? 1 : 0;
    for (let i = start; i < arc.length; i++) {
      coords.push(arc[i]);
    }
  }
  return coords;
}

interface CountryRing {
  coords2D: number[][]; // [lng, lat] pairs for earcut
  coords3D: THREE.Vector3[]; // projected on sphere for rendering
}

interface CountryData {
  id: string;
  polygons: CountryRing[][]; // each polygon has outer ring + optional holes
}

function parseCountries(topo: any): CountryData[] {
  const arcs = decodeArcs(topo);
  const geometries = topo.objects.countries.geometries;
  const result: CountryData[] = [];

  for (const geo of geometries) {
    const id = geo.id;
    const polygons: CountryRing[][] = [];

    const polyArcs = geo.type === 'Polygon' ? [geo.arcs] : geo.type === 'MultiPolygon' ? geo.arcs : [];

    for (const polygon of polyArcs) {
      const rings: CountryRing[] = [];
      for (const arcIndices of polygon) {
        const coords = getArcCoords(arcs, arcIndices);
        rings.push({
          coords2D: coords,
          coords3D: coords.map(([lng, lat]) => latLngToVector3(lat, lng, RADIUS + 0.003)),
        });
      }
      polygons.push(rings);
    }

    result.push({ id, polygons });
  }
  return result;
}

function getCountryColor(id: string): string {
  if (id === NATIVE_ID) return '#c97a1a';
  if (LIVED_IDS.has(id)) return '#e89a3c';
  if (allIds.has(id)) return '#f0b95a';
  return '#e8e6e1'; // warm light grey for non-visited land
}

function getCountryFillOpacity(id: string): number {
  if (id === NATIVE_ID) return 0.85;
  if (LIVED_IDS.has(id)) return 0.75;
  if (allIds.has(id)) return 0.7;
  return 0.7;
}

// Subdivide a triangle in lat/lng space and project each sub-vertex onto the sphere.
// This ensures large triangles follow the globe curvature.
function subdivideSphereTriangle(
  a: number[], b: number[], c: number[],
  radius: number, maxEdgeDeg: number
): number[] {
  const positions: number[] = [];

  function edgeLen(p: number[], q: number[]) {
    return Math.max(Math.abs(p[0] - q[0]), Math.abs(p[1] - q[1]));
  }

  function emit(p1: number[], p2: number[], p3: number[], depth: number) {
    const longest = Math.max(edgeLen(p1, p2), edgeLen(p2, p3), edgeLen(p3, p1));
    if (longest > maxEdgeDeg && depth < 4) {
      const m12 = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
      const m23 = [(p2[0] + p3[0]) / 2, (p2[1] + p3[1]) / 2];
      const m31 = [(p3[0] + p1[0]) / 2, (p3[1] + p1[1]) / 2];
      emit(p1, m12, m31, depth + 1);
      emit(m12, p2, m23, depth + 1);
      emit(m31, m23, p3, depth + 1);
      emit(m12, m23, m31, depth + 1);
    } else {
      for (const p of [p1, p2, p3]) {
        const v = latLngToVector3(p[1], p[0], radius);
        positions.push(v.x, v.y, v.z);
      }
    }
  }

  emit(a, b, c, 0);
  return positions;
}

function CountryFill({ polygon, color, opacity }: { polygon: CountryRing[]; color: string; opacity: number }) {
  const geometry = useMemo(() => {
    if (polygon.length === 0 || polygon[0].coords2D.length < 3) return null;

    // Flatten 2D coords for earcut: outer ring first, then holes
    const flatCoords: number[] = [];
    const holeIndices: number[] = [];
    const allCoords2D: number[][] = [];

    for (let r = 0; r < polygon.length; r++) {
      if (r > 0) holeIndices.push(flatCoords.length / 2);
      for (const coord of polygon[r].coords2D) {
        flatCoords.push(coord[0], coord[1]);
        allCoords2D.push(coord);
      }
    }

    const indices = earcut(flatCoords, holeIndices.length > 0 ? holeIndices : undefined, 2);
    if (indices.length === 0) return null;

    // For each triangle, subdivide and project onto sphere
    const positions: number[] = [];
    const R = RADIUS + 0.002;

    for (let i = 0; i < indices.length; i += 3) {
      const a = allCoords2D[indices[i]];
      const b = allCoords2D[indices[i + 1]];
      const c = allCoords2D[indices[i + 2]];
      if (!a || !b || !c) continue;
      positions.push(...subdivideSphereTriangle(a, b, c, R, 5));
    }

    if (positions.length === 0) return null;

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.computeVertexNormals();
    return geo;
  }, [polygon]);

  if (!geometry) return null;

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} />
    </mesh>
  );
}

function GlobePoint({
  position,
  color,
  size = 0.04,
  pulseSpeed = 0,
}: {
  position: THREE.Vector3;
  color: string;
  size?: number;
  pulseSpeed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current && pulseSpeed > 0) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * pulseSpeed) * 0.3;
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

// Country centroid labels for visited countries
const COUNTRY_LABELS: { id: string; name: string; lat: number; lng: number }[] = [
  { id: '100', name: 'Bulgaria', lat: 42.7, lng: 25.5 },
  { id: '300', name: 'Greece', lat: 39.1, lng: 21.8 },
  { id: '792', name: 'Turkey', lat: 39.0, lng: 35.2 },
  { id: '056', name: 'Belgium', lat: 50.8, lng: 4.4 },
  { id: '250', name: 'France', lat: 46.2, lng: 2.2 },
  { id: '528', name: 'Netherlands', lat: 52.1, lng: 5.3 },
  { id: '380', name: 'Italy', lat: 41.9, lng: 12.6 },
  { id: '040', name: 'Austria', lat: 47.5, lng: 14.6 },
  { id: '688', name: 'Serbia', lat: 44.0, lng: 21.0 },
  { id: '705', name: 'Slovenia', lat: 46.2, lng: 15.0 },
  { id: '191', name: 'Croatia', lat: 45.1, lng: 15.2 },
  { id: '826', name: 'UK', lat: 54.0, lng: -2.0 },
  { id: '840', name: 'USA', lat: 39.8, lng: -98.6 },
  { id: '124', name: 'Canada', lat: 56.1, lng: -106.3 },
  { id: '484', name: 'Mexico', lat: 23.6, lng: -102.6 },
  { id: '044', name: 'Bahamas', lat: 25.0, lng: -77.4 },
  { id: '630', name: 'Puerto Rico', lat: 18.2, lng: -66.6 },
  { id: '414', name: 'Kuwait', lat: 29.3, lng: 47.5 },
  { id: '604', name: 'Peru', lat: -9.2, lng: -75.0 },
  { id: '076', name: 'Brazil', lat: -14.2, lng: -51.9 },
  { id: '170', name: 'Colombia', lat: 4.6, lng: -74.3 },
];

function PinMarker({ lat, lng, name, label }: { lat: number; lng: number; name: string; label: string }) {
  const position = useMemo(() => latLngToVector3(lat, lng, RADIUS + 0.015), [lat, lng]);
  const labelPos = useMemo(() => latLngToVector3(lat, lng, RADIUS + 0.06), [lat, lng]);
  const pinColor = label === 'Native' ? '#d4851f' : label === 'Current' ? '#7c8cf8' : '#e89a3c';

  return (
    <group>
      <GlobePoint position={position} color={pinColor} size={0.045} pulseSpeed={label === 'Current' ? 2 : 0} />
      <Html position={labelPos} center style={{ pointerEvents: 'none' }}>
        <div style={{
          color: '#1a1a1a',
          fontSize: 10,
          fontWeight: 700,
          fontFamily: 'DM Sans, sans-serif',
          whiteSpace: 'nowrap',
          textShadow: '0 0 3px #faf9f7, 0 0 6px #faf9f7',
        }}>
          {name}
        </div>
      </Html>
    </group>
  );
}

function CountryLabel({ lat, lng, name }: { lat: number; lng: number; name: string }) {
  const position = useMemo(() => latLngToVector3(lat, lng, RADIUS + 0.02), [lat, lng]);

  return (
    <Html position={position} center style={{ pointerEvents: 'none' }}>
      <div style={{
        color: '#6b5a3e',
        fontSize: 8,
        fontWeight: 500,
        fontFamily: 'DM Sans, sans-serif',
        whiteSpace: 'nowrap',
        textShadow: '0 0 2px #faf9f7, 0 0 4px #faf9f7',
        opacity: 0.85,
      }}>
        {name}
      </div>
    </Html>
  );
}

function Arc({ start, end, color }: { start: THREE.Vector3; end: THREE.Vector3; color: string }) {
  const points = useMemo(() => {
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const dist = start.distanceTo(end);
    // Keep arcs low — just slightly above the surface
    mid.normalize().multiplyScalar(RADIUS + 0.15 + dist * 0.08);
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return curve.getPoints(50);
  }, [start, end]);

  return <Line points={points} color={color} transparent opacity={0.5} lineWidth={1.5} />;
}

function GlobeMesh({ countries }: { countries: CountryData[] }) {
  const globeRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.06;
    }
  });

  const sofiaPos = useMemo(() => latLngToVector3(42.6977, 23.3219, RADIUS + 0.015), []);
  const arcs = useMemo(() => {
    return PINS.filter((p) => p.name !== 'Sofia').map((p) => ({
      key: p.name,
      start: sofiaPos,
      end: latLngToVector3(p.lat, p.lng, RADIUS + 0.015),
    }));
  }, [sofiaPos]);

  return (
    <group ref={globeRef}>
      {/* Ocean sphere */}
      <mesh>
        <sphereGeometry args={[RADIUS, 64, 64]} />
        <meshPhysicalMaterial
          color="#c8d8e8"
          roughness={1}
          metalness={0}
          clearcoat={0.05}
        />
      </mesh>

      {/* Country fills — proper triangulation */}
      {countries.map((country) =>
        country.polygons.map((polygon, pi) => (
          <CountryFill
            key={`fill-${country.id}-${pi}`}
            polygon={polygon}
            color={getCountryColor(country.id)}
            opacity={getCountryFillOpacity(country.id)}
          />
        ))
      )}

      {/* Country outlines */}
      {countries.map((country) =>
        country.polygons.map((polygon, pi) =>
          polygon.map((ring, ri) =>
            ring.coords3D.length >= 2 ? (
              <Line
                key={`outline-${country.id}-${pi}-${ri}`}
                points={ring.coords3D}
                color={allIds.has(country.id) ? '#b8720f' : '#bbb8b0'}
                lineWidth={allIds.has(country.id) ? 1.2 : 0.3}
                transparent
                opacity={allIds.has(country.id) ? 0.7 : 0.3}
              />
            ) : null
          )
        )
      )}

      {/* Country name labels */}
      {COUNTRY_LABELS.map((cl) => (
        <CountryLabel key={cl.id} lat={cl.lat} lng={cl.lng} name={cl.name} />
      ))}

      {/* Pin markers (cities) */}
      {PINS.map((pin) => (
        <PinMarker key={pin.name} lat={pin.lat} lng={pin.lng} name={pin.name} label={pin.label} />
      ))}

      {/* Arcs from Sofia */}
      {arcs.map((arc) => (
        <Arc key={arc.key} start={arc.start} end={arc.end} color="#d4851f" />
      ))}
    </group>
  );
}

export default function Globe() {
  const [countries, setCountries] = useState<CountryData[]>([]);

  useEffect(() => {
    fetch(GEO_URL)
      .then((res) => res.json())
      .then((topo) => setCountries(parseCountries(topo)))
      .catch(console.error);
  }, []);

  const hobbies = [
    { icon: <SportsTennisIcon />, label: 'Racquet Sports', text: 'Tennis, squash, and table tennis.' },
    { icon: <HikingIcon />, label: 'Travel & Backpacking', text: 'Exploring new countries on foot.' },
    {
      icon: <MusicNoteIcon />,
      label: 'Music Festivals',
      text: (
        <>
          Favourite artist:{' '}
          <Link href="https://open.spotify.com/album/763xbIwmR5A5EzoVreGlUG" target="_blank" rel="noopener"
            sx={{ fontWeight: 600, color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            Subtronics
          </Link>.
        </>
      ),
    },
  ];

  return (
    <Box id="travel" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#faf9f7' }}>
      <Container maxWidth="md">
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ mb: 1, fontSize: { xs: '1.8rem', md: '2.4rem' } }}
        >
          Beyond Work
        </Typography>
        <Box
          sx={{
            width: 40,
            height: 3,
            bgcolor: 'primary.main',
            mx: 'auto',
            mb: 6,
            borderRadius: 2,
          }}
        />

        {/* Hobbies */}
        <Grid container spacing={3} justifyContent="center" className="reveal-stagger" sx={{ mb: 8 }}>
          {hobbies.map((hobby) => (
            <Grid size={{ xs: 12, sm: 4 }} key={hobby.label}>
              <Stack spacing={1} alignItems="center" textAlign="center">
                <Box sx={{ color: 'primary.main' }}>{hobby.icon}</Box>
                <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: '0.85rem' }}>
                  {hobby.label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {hobby.text}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>

        {/* Travel subheading */}
        <Typography
          variant="h4"
          textAlign="center"
          sx={{ mb: 1, fontSize: { xs: '1.5rem', md: '1.8rem' } }}
        >
          Travel
        </Typography>
        <Box
          sx={{
            width: 30,
            height: 3,
            bgcolor: 'primary.main',
            mx: 'auto',
            mb: 2,
            borderRadius: 2,
          }}
        />
        <Typography
          variant="body1"
          textAlign="center"
          sx={{ color: 'text.secondary', mb: 4, maxWidth: 520, mx: 'auto' }}
        >
          {totalCountries} countries across four continents.
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          flexWrap="wrap"
          useFlexGap
          sx={{ mb: 3 }}
        >
          {regions.map((r) => (
            <Chip
              key={r.key}
              label={`${r.label} (${r.count})`}
              size="small"
              sx={{
                bgcolor: 'rgba(212, 133, 31, 0.08)',
                color: 'primary.dark',
                fontWeight: 500,
              }}
            />
          ))}
        </Stack>

        <Box
          sx={{
            position: 'relative',
            height: { xs: 350, md: 500 },
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <Canvas
            camera={{ position: [0, 0, 5.2], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 3, 5]} intensity={0.5} />
            <GlobeMesh countries={countries} />
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              rotateSpeed={0.5}
              minDistance={3}
              maxDistance={8}
              zoomSpeed={0.5}
            />
          </Canvas>
        </Box>

        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          sx={{ mt: 3, mb: 2 }}
        >
          {[
            { color: '#c97a1a', label: 'Native' },
            { color: '#e89a3c', label: 'Lived' },
            { color: '#f0b95a', label: 'Visited' },
            { color: '#7c8cf8', label: 'Current' },
          ].map((item) => (
            <Stack key={item.label} direction="row" alignItems="center" spacing={0.75}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: item.color }} />
              <Typography variant="caption" sx={{ color: 'grey.600' }}>
                {item.label}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Stack
          direction="row"
          spacing={1.5}
          flexWrap="wrap"
          useFlexGap
          justifyContent="center"
          sx={{ mt: 1 }}
        >
          {Object.values(travelCountries)
            .flat()
            .map((c) => (
              <Chip
                key={c.id}
                label={c.name}
                size="small"
                variant={NATIVE_ID === c.id || LIVED_IDS.has(c.id) ? 'filled' : 'outlined'}
                sx={{
                  borderColor: NATIVE_ID === c.id ? 'primary.main' : LIVED_IDS.has(c.id) ? 'primary.light' : 'rgba(232, 154, 60, 0.3)',
                  bgcolor: NATIVE_ID === c.id ? 'primary.main' : LIVED_IDS.has(c.id) ? 'primary.light' : 'transparent',
                  color: NATIVE_ID === c.id || LIVED_IDS.has(c.id) ? 'white' : 'grey.700',
                  fontSize: 12,
                  fontWeight: NATIVE_ID === c.id || LIVED_IDS.has(c.id) ? 600 : 400,
                }}
              />
            ))}
        </Stack>
      </Container>
    </Box>
  );
}
