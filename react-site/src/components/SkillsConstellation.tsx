import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Line, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Box, Container, Typography } from '@mui/material';
import { skills } from '../data/content';

const CATEGORY_COLORS: Record<string, string> = {
  'Programming Languages': '#e89a3c',
  Frontend: '#7c8cf8',
  'Backend & APIs': '#56c8a8',
  Databases: '#f06292',
  'Data Science & ML': '#ffd54f',
  'Deep Learning': '#ba68c8',
  'AI Frameworks': '#4dd0e1',
  DevOps: '#ff8a65',
};

// Arrange category centers on a ring in the XZ plane
const categories = Object.keys(skills);
const CATEGORY_CENTERS: Record<string, [number, number, number]> = {};
categories.forEach((cat, i) => {
  const angle = (i / categories.length) * Math.PI * 2 - Math.PI / 2;
  CATEGORY_CENTERS[cat] = [Math.cos(angle) * 3.2, Math.sin(angle) * 2.4, 0];
});

interface SkillPoint {
  name: string;
  category: string;
  position: [number, number, number];
  color: string;
}

function buildSkillPoints(): SkillPoint[] {
  const points: SkillPoint[] = [];
  for (const [category, list] of Object.entries(skills)) {
    const center = CATEGORY_CENTERS[category];
    const color = CATEGORY_COLORS[category] || '#ffffff';
    list.forEach((name, i) => {
      const angle = (i / list.length) * Math.PI * 2;
      const spread = list.length === 1 ? 0 : 0.55 + (i % 2) * 0.15;
      points.push({
        name,
        category,
        position: [
          center[0] + Math.cos(angle) * spread,
          center[1] + Math.sin(angle) * spread,
          (Math.sin(angle * 1.5) * 0.3),
        ],
        color,
      });
    });
  }
  return points;
}

// Semantic edges: skills that genuinely relate to each other
const INTRA_EDGES: [string, string][] = [
  // Programming Languages: TS is a superset of JS
  ['JavaScript', 'TypeScript'],
  // Frontend: both are component frameworks; Tailwind styles either
  ['React', 'Angular'],
  ['React', 'Tailwind'],
  ['Angular', 'Tailwind'],
  // Backend: FastAPI & Flask are Python; Express runs on Node
  ['FastAPI', 'Flask'],
  ['NodeJS', 'Express'],
  // Databases: document stores, vector DB, relational, cache
  ['MongoDB', 'Elastic Search'],
  ['PostgreSQL', 'Redis'],
  ['Pinecone', 'Elastic Search'],
  // Data Science: NumPy underpins Pandas; Scikit-learn uses both; Plotly visualises results
  ['NumPy', 'Pandas'],
  ['Pandas', 'Scikit-learn'],
  ['Pandas', 'Plotly'],
  ['NumPy', 'Scikit-learn'],
  // Deep Learning: HF is built on PyTorch
  ['PyTorch', 'Hugging Face'],
  // AI Frameworks: LangGraph extends LangChain
  ['LangChain', 'LangGraph'],
];

// Cross-category edges: tools commonly used together
const CROSS_EDGES: [string, string][] = [
  // Python powers the data/ML/AI stack
  ['Python', 'FastAPI'],
  ['Python', 'Flask'],
  ['Python', 'Pandas'],
  ['Python', 'PyTorch'],
  ['Python', 'LangChain'],
  // JS/TS powers the frontend and Node backend
  ['JavaScript', 'React'],
  ['TypeScript', 'Angular'],
  ['JavaScript', 'NodeJS'],
  ['TypeScript', 'React'],
  // Common stack pairings
  ['NodeJS', 'MongoDB'],
  ['NodeJS', 'Redis'],
  ['FastAPI', 'PostgreSQL'],
  // ML/DL pipeline
  ['Scikit-learn', 'PyTorch'],
  ['NumPy', 'PyTorch'],
  // LLM ecosystem
  ['Hugging Face', 'LangChain'],
  ['LangChain', 'Pinecone'],
  // Containerisation
  ['Docker', 'NodeJS'],
  ['Docker', 'FastAPI'],
];

function buildConstellationLines(
  pointsByName: Map<string, SkillPoint>,
): { points: [number, number, number][]; color: string; opacity: number }[] {
  const lines: { points: [number, number, number][]; color: string; opacity: number }[] = [];

  const addEdge = (a: string, b: string, opacity: number) => {
    const pa = pointsByName.get(a);
    const pb = pointsByName.get(b);
    if (!pa || !pb) return;
    // Blend colours for cross-category edges
    const color = pa.category === pb.category ? pa.color : '#ffffff';
    lines.push({ points: [pa.position, pb.position], color, opacity });
  };

  for (const [a, b] of INTRA_EDGES) addEdge(a, b, 0.25);
  for (const [a, b] of CROSS_EDGES) addEdge(a, b, 0.08);

  return lines;
}

function SkillNode({
  point,
}: {
  point: SkillPoint;
}) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const s = hovered ? 1.6 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.15);
    }
    if (glowRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2 + point.name.length) * 0.15;
      const s = hovered ? 1.8 : pulse;
      glowRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
    }
  });

  return (
    <group>
      {/* Core */}
      <mesh
        ref={meshRef}
        position={point.position}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color={point.color} />
      </mesh>
      {/* Glow halo */}
      <mesh ref={glowRef} position={point.position}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial color={point.color} transparent opacity={0.12} />
      </mesh>
      {/* Label — always visible */}
      <Html
        position={[point.position[0], point.position[1] + 0.22, point.position[2]]}
        center
        style={{ pointerEvents: 'none' }}
      >
        <div
          style={{
            color: hovered ? '#fff' : 'rgba(255,255,255,0.8)',
            fontSize: hovered ? 11 : 9,
            fontWeight: hovered ? 700 : 500,
            fontFamily: 'DM Sans, sans-serif',
            whiteSpace: 'nowrap',
            textShadow: `0 0 6px ${point.color}80, 0 1px 3px rgba(0,0,0,0.6)`,
            transition: 'all 0.2s',
          }}
        >
          {point.name}
        </div>
      </Html>
    </group>
  );
}

function CategoryLabel({ category }: { category: string }) {
  const center = CATEGORY_CENTERS[category];
  const color = CATEGORY_COLORS[category] || '#ffffff';

  return (
    <Html
      position={[center[0], center[1] - 0.85, center[2]]}
      center
      style={{ pointerEvents: 'none' }}
    >
      <div
        style={{
          color,
          fontSize: 9,
          fontWeight: 700,
          fontFamily: 'DM Sans, sans-serif',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          whiteSpace: 'nowrap',
          opacity: 0.7,
          textShadow: `0 0 8px ${color}50`,
        }}
      >
        {category}
      </div>
    </Html>
  );
}

function ConstellationScene() {
  const groupRef = useRef<THREE.Group>(null);
  const skillPoints = useMemo(() => buildSkillPoints(), []);
  const pointsByName = useMemo(() => new Map(skillPoints.map((p) => [p.name, p])), [skillPoints]);
  const lines = useMemo(() => buildConstellationLines(pointsByName), [pointsByName]);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle hover/float instead of full rotation
      const t = state.clock.elapsedTime;
      groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.12;
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.05;
      groupRef.current.position.y = Math.sin(t * 0.2) * 0.08;
    }
  });

  return (
    <>
      <Stars radius={20} depth={40} count={400} factor={2.5} saturation={0} fade speed={0.5} />
      <ambientLight intensity={0.3} />
      <group ref={groupRef}>
        {/* Constellation lines */}
        {lines.map((line, i) => (
          <Line
            key={i}
            points={line.points}
            color={line.color}
            lineWidth={line.opacity > 0.1 ? 0.7 : 0.4}
            transparent
            opacity={line.opacity}
          />
        ))}
        {/* Skill nodes */}
        {skillPoints.map((pt) => (
          <SkillNode key={pt.name} point={pt} />
        ))}
        {/* Category labels */}
        {categories.map((cat) => (
          <CategoryLabel key={cat} category={cat} />
        ))}
      </group>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        autoRotate={false}
      />
    </>
  );
}

export default function SkillsConstellation() {
  const totalSkills = Object.values(skills).flat().length;

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#0d1117', position: 'relative' }}>
      <Container maxWidth="md">
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ mb: 1, fontSize: { xs: '1.8rem', md: '2.4rem' }, color: '#e6e6e6' }}
        >
          Skills
        </Typography>
        <Box
          sx={{
            width: 40,
            height: 3,
            bgcolor: '#d4851f',
            mx: 'auto',
            mb: 2,
            borderRadius: 2,
          }}
        />
        <Typography
          variant="body2"
          textAlign="center"
          sx={{ color: 'rgba(255,255,255,0.45)', mb: 3 }}
        >
          {totalSkills} skills across {categories.length} domains — drag to explore
        </Typography>

        <Box
          sx={{
            height: { xs: 340, md: 460 },
            borderRadius: 3,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Canvas
            camera={{ position: [0, 0, 8], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
            style={{ background: 'transparent' }}
          >
            <ConstellationScene />
          </Canvas>
        </Box>
      </Container>
    </Box>
  );
}
