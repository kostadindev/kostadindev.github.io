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
  pos: THREE.Vector3;
  scale: number;
  color: THREE.Color;
  rotSpeed: THREE.Vector3;
  driftPhase: THREE.Vector3; // unique phase offsets for gentle drift
  driftAmp: THREE.Vector3;  // how far it drifts in each axis
}

const FloatingShapes = () => {
  const meshRefs = geometries.map(() => useRef<THREE.InstancedMesh>(null));

  const shapesByGeo = useMemo(() => {
    const totalShapes = 40;
    const result: ShapeData[][] = geometries.map(() => []);

    for (let i = 0; i < totalShapes; i++) {
      const geoIndex = i % geometries.length;

      // Place in a ring around center, pushed to outer edges
      const angle = (i / totalShapes) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const radius = 9 + Math.random() * 4;
      const centerY = 1.5;

      const x = Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius * 0.7;
      const z = -2 + Math.random() * -3;

      result[geoIndex].push({
        pos: new THREE.Vector3(x, y, z),
        scale: 0.2 + Math.random() * 0.4,
        color: new THREE.Color(Math.random() > 0.45 ? BRAND_ORANGE : ACCENT_PURPLE),
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.15,
          (Math.random() - 0.5) * 0.15,
          (Math.random() - 0.5) * 0.1
        ),
        driftPhase: new THREE.Vector3(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ),
        driftAmp: new THREE.Vector3(
          0.15 + Math.random() * 0.25,
          0.15 + Math.random() * 0.25,
          0.05 + Math.random() * 0.1
        ),
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
        // Gentle hovering drift
        const dx = Math.sin(t * 0.4 + s.driftPhase.x) * s.driftAmp.x;
        const dy = Math.sin(t * 0.35 + s.driftPhase.y) * s.driftAmp.y;
        const dz = Math.sin(t * 0.3 + s.driftPhase.z) * s.driftAmp.z;

        dummy.position.set(s.pos.x + dx, s.pos.y + dy, s.pos.z + dz);
        dummy.scale.setScalar(s.scale);
        dummy.rotation.set(
          t * s.rotSpeed.x + s.driftPhase.x,
          t * s.rotSpeed.y + s.driftPhase.y,
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

      <FloatingShapes />

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
