import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Environment, AdaptiveDpr, Preload } from '@react-three/drei';
import * as THREE from 'three';

const BRAND_ORANGE = '#e89a3c';
const ACCENT_PURPLE = '#a5b4fc';

const FloatingShapes = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const { shapes, count } = useMemo(() => {
    const temp = [];

    // Scatter shapes around the edges, avoiding center
    const numShapes = 35;

    for (let i = 0; i < numShapes; i++) {
      let x, y;

      // Random position but avoid center area (-4 to 4 x, -3 to 3 y)
      do {
        x = (Math.random() - 0.5) * 18; // -9 to 9
        y = (Math.random() - 0.5) * 14; // -7 to 7
      } while (Math.abs(x) < 4 && Math.abs(y) < 3.5);

      temp.push({
        pos: new THREE.Vector3(
          x,
          y,
          -1 + Math.random() * -5
        ),
        scale: 0.2 + Math.random() * 0.6,
        delay: Math.random() * 6,
        color: new THREE.Color(Math.random() > 0.45 ? BRAND_ORANGE : ACCENT_PURPLE),
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

function Scene() {
  return (
    <>
      <fog attach="fog" args={['#fafaf8', 15, 35]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color={ACCENT_PURPLE} intensity={0.3} />

      <FloatingShapes />

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
