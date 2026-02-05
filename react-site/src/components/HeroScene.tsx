import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Environment, Dodecahedron, AdaptiveDpr, Preload } from '@react-three/drei';
import * as THREE from 'three';

const BRAND_ORANGE = '#e89a3c';
const ACCENT_PURPLE = '#a5b4fc';

const FloatingShapes = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const { shapes, count } = useMemo(() => {
    const temp = [];

    // Left side cluster (visible but outside text area)
    for (let i = 0; i < 6; i++) {
      temp.push({
        pos: new THREE.Vector3(
          -7 + Math.random() * 2,
          -3 + Math.random() * 6,
          -3 + Math.random() * 2
        ),
        scale: 0.4 + Math.random() * 0.5,
        delay: Math.random() * 5,
        color: new THREE.Color(Math.random() > 0.5 ? BRAND_ORANGE : ACCENT_PURPLE),
      });
    }

    // Right side cluster
    for (let i = 0; i < 6; i++) {
      temp.push({
        pos: new THREE.Vector3(
          5 + Math.random() * 2,
          -3 + Math.random() * 6,
          -3 + Math.random() * 2
        ),
        scale: 0.4 + Math.random() * 0.5,
        delay: Math.random() * 5,
        color: new THREE.Color(Math.random() > 0.5 ? BRAND_ORANGE : ACCENT_PURPLE),
      });
    }

    // Top left corner
    for (let i = 0; i < 4; i++) {
      temp.push({
        pos: new THREE.Vector3(
          -6 + Math.random() * 2,
          4 + Math.random() * 2,
          -4 + Math.random() * 2
        ),
        scale: 0.3 + Math.random() * 0.4,
        delay: Math.random() * 5,
        color: new THREE.Color(Math.random() > 0.5 ? BRAND_ORANGE : ACCENT_PURPLE),
      });
    }

    // Top right corner
    for (let i = 0; i < 4; i++) {
      temp.push({
        pos: new THREE.Vector3(
          4 + Math.random() * 2,
          4 + Math.random() * 2,
          -4 + Math.random() * 2
        ),
        scale: 0.3 + Math.random() * 0.4,
        delay: Math.random() * 5,
        color: new THREE.Color(Math.random() > 0.5 ? BRAND_ORANGE : ACCENT_PURPLE),
      });
    }

    // Bottom area (below the main content)
    for (let i = 0; i < 5; i++) {
      temp.push({
        pos: new THREE.Vector3(
          -3 + Math.random() * 6,
          -5 + Math.random() * 1.5,
          -2 + Math.random() * 2
        ),
        scale: 0.5 + Math.random() * 0.4,
        delay: Math.random() * 5,
        color: new THREE.Color(BRAND_ORANGE),
      });
    }

    return { shapes: temp, count: temp.length };
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!meshRef.current) return;
    shapes.forEach((shape, i) => {
      meshRef.current!.setColorAt(i, shape.color);
    });
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [shapes]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    shapes.forEach((shape, i) => {
      const wave = Math.sin(t * 0.8 + shape.delay) * 0.2;

      dummy.position.set(shape.pos.x, shape.pos.y + wave, shape.pos.z);
      dummy.scale.setScalar(shape.scale);
      dummy.rotation.set(t * 0.2 + shape.delay, t * 0.15 + shape.delay, t * 0.1);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        metalness={0.3}
        roughness={0.4}
        transparent
        opacity={0.5}
      />
    </instancedMesh>
  );
};

const CentralShape = () => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.rotation.x = t * 0.15;
      ref.current.rotation.y = t * 0.2;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.3}>
      <Dodecahedron ref={ref} args={[1.2, 0]} position={[0, -4.5, 0]}>
        <meshStandardMaterial
          color={BRAND_ORANGE}
          metalness={0.6}
          roughness={0.2}
          transparent
          opacity={0.6}
        />
      </Dodecahedron>
      {/* Wireframe overlay */}
      <Dodecahedron args={[1.5, 0]} position={[0, -4.5, 0]}>
        <meshStandardMaterial
          color={BRAND_ORANGE}
          wireframe
          transparent
          opacity={0.15}
        />
      </Dodecahedron>
    </Float>
  );
};

function Scene() {
  return (
    <>
      <fog attach="fog" args={['#fafaf8', 15, 35]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color={ACCENT_PURPLE} intensity={0.3} />

      <FloatingShapes />
      <CentralShape />

      <Environment preset="city" />
      <Stars radius={80} depth={50} count={200} factor={2} saturation={0} fade speed={0.2} />
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
        opacity: 0.8,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 16], fov: 45 }}
        gl={{
          powerPreference: 'high-performance',
          antialias: false,
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
