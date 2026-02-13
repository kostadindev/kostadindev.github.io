import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, AdaptiveDpr, Preload } from '@react-three/drei';
import * as THREE from 'three';

const BRAND_ORANGE = '#e89a3c';
const ACCENT_PURPLE = '#a5b4fc';

const geometries = [
  new THREE.OctahedronGeometry(1, 0),
  new THREE.TetrahedronGeometry(1, 0),
  new THREE.IcosahedronGeometry(1, 0),
  new THREE.BoxGeometry(1, 1, 1),
];

interface ShapeData {
  angle: number;
  radius: number;
  orbitSpeed: number;
  orbitTilt: number;
  scale: number;
  color: THREE.Color;
  rotSpeed: THREE.Vector3;
  geoIndex: number;
  zOffset: number;
}

const OrbitRing = () => {
  const meshRefs = geometries.map(() => useRef<THREE.InstancedMesh>(null));

  const shapesByGeo = useMemo(() => {
    const totalShapes = 40;
    const result: ShapeData[][] = geometries.map(() => []);

    for (let i = 0; i < totalShapes; i++) {
      const geoIndex = i % geometries.length;
      const angle = (i / totalShapes) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      // Push shapes far to outer edges
      const radius = 9 + Math.random() * 4;

      result[geoIndex].push({
        angle,
        radius,
        orbitSpeed: 0.06 + Math.random() * 0.08,
        orbitTilt: (Math.random() - 0.5) * 0.4,
        scale: 0.15 + Math.random() * 0.35,
        color: new THREE.Color(Math.random() > 0.45 ? BRAND_ORANGE : ACCENT_PURPLE),
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.3
        ),
        geoIndex,
        zOffset: -2 + Math.random() * -3,
      });
    }
    return result;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    shapesByGeo.forEach((shapes, gi) => {
      const mesh = meshRefs[gi].current;
      if (!mesh) return;
      shapes.forEach((s, i) => mesh.setColorAt(i, s.color));
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    });
  }, [shapesByGeo]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    shapesByGeo.forEach((shapes, gi) => {
      const mesh = meshRefs[gi].current;
      if (!mesh) return;

      shapes.forEach((s, i) => {
        const a = s.angle + t * s.orbitSpeed;
        // Center of orbit is slightly above screen center (where profile photo sits)
        const centerY = 1.5;
        const x = Math.cos(a) * s.radius;
        const y = centerY + Math.sin(a) * s.radius * 0.85 + Math.sin(a * 0.5) * s.orbitTilt;
        const z = s.zOffset + Math.sin(a) * 0.5;

        const pulse = 1 + Math.sin(t * 1.2 + s.angle * 3) * 0.06;

        dummy.position.set(x, y, z);
        dummy.scale.setScalar(s.scale * pulse);
        dummy.rotation.set(
          t * s.rotSpeed.x + s.angle,
          t * s.rotSpeed.y + s.angle,
          t * s.rotSpeed.z
        );
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
    });
  });

  return (
    <>
      {shapesByGeo.map((shapes, gi) => (
        <instancedMesh
          key={gi}
          ref={meshRefs[gi]}
          args={[geometries[gi], undefined, shapes.length]}
        >
          <meshPhysicalMaterial
            metalness={0.1}
            roughness={0.15}
            transparent
            opacity={0.55}
            clearcoat={0.8}
            clearcoatRoughness={0.1}
            envMapIntensity={1.2}
          />
        </instancedMesh>
      ))}
    </>
  );
};

function Scene() {
  return (
    <>
      <fog attach="fog" args={['#fafaf8', 12, 30]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <directionalLight position={[-5, -5, 5]} intensity={0.3} color={ACCENT_PURPLE} />
      <pointLight position={[-10, -10, -10]} color={ACCENT_PURPLE} intensity={0.4} />

      <OrbitRing />

      <Environment preset="city" />
      <AdaptiveDpr pixelated />
      <Preload all />
    </>
  );
}

export default function HeroScene() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.85,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 16], fov: 45 }}
        gl={{
          powerPreference: 'high-performance',
          antialias: true,
          stencil: false,
          depth: true,
          alpha: true,
        }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
