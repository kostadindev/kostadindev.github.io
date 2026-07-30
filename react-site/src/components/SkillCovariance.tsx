import { Box } from '@mui/material';

/**
 * Thesis Σ — the skill covariance that drives inference.
 * Observing one skill (Mathematics ★) shifts belief about the others along the
 * correlation structure: positively for its cognitive neighbours, negatively for
 * the physical skills. Orange = positive transfer, blue = negative.
 */
const INK = '#17181C';
const ORANGE = '#E8590C';
const BLUE = '#3B6FB0';
const MUTED = '#8A897F';

const SKILLS = [
  'Mathematics',
  'Math Reasoning',
  'Number Facility',
  'Science',
  'Visual Discrim.',
  'Manual Dexterity',
  'Static Strength',
];

// Symmetric correlation matrix over the O*NET skill subset (diagonal = 1).
const COV = [
  [1.0, 0.94, 0.92, 0.57, 0.01, -0.37, -0.43],
  [0.94, 1.0, 0.88, 0.6, 0.05, -0.31, -0.38],
  [0.92, 0.88, 1.0, 0.49, 0.03, -0.34, -0.4],
  [0.57, 0.6, 0.49, 1.0, 0.12, -0.2, -0.25],
  [0.01, 0.05, 0.03, 0.12, 1.0, 0.28, 0.22],
  [-0.37, -0.31, -0.34, -0.2, 0.28, 1.0, 0.66],
  [-0.43, -0.38, -0.4, -0.25, 0.22, 0.66, 1.0],
];

const N = SKILLS.length;
const PAD_L = 104;
const PAD_T = 40;
const CELL = 38;
const GAP = 4;
const GRID = N * CELL + (N - 1) * GAP;
const W = PAD_L + GRID + 16;
const H = PAD_T + GRID + 60;

const at = (i: number) => PAD_L + i * (CELL + GAP);

function fmt(v: number) {
  if (v === 1) return '1.0';
  const s = v.toFixed(2).replace(/^(-?)0\./, '$1.');
  return v > 0 ? `+${s}` : s;
}

export default function SkillCovariance() {
  return (
    <Box sx={{ width: '100%', p: { xs: 2, md: 2.5 }, display: 'flex', justifyContent: 'center' }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ maxWidth: 440, display: 'block' }}
        role="img"
        aria-label="Skill covariance matrix: observing Mathematics transfers positively to related cognitive skills and negatively to physical skills"
      >
        <defs>
          <linearGradient id="cov-div" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={BLUE} />
            <stop offset="0.5" stopColor="#fff" />
            <stop offset="1" stopColor={ORANGE} />
          </linearGradient>
        </defs>

        {/* header */}
        <text x={6} y={15} fontFamily="'IBM Plex Mono', monospace" fontSize="11" fill={INK}>skill.covariance</text>
        <text x={6} y={29} fontFamily="'IBM Plex Mono', monospace" fontSize="8.5" fill={MUTED}>observe one &#183; neighbours move</text>
        <text x={W - 118} y={13} fontFamily="'IBM Plex Mono', monospace" fontSize="8.5" fill={MUTED}>&#961;</text>
        <text x={W - 108} y={13} fontFamily="'IBM Plex Mono', monospace" fontSize="8.5" fill={MUTED}>&#8722;1</text>
        <rect x={W - 90} y={6} width="72" height="8" rx="2" fill="url(#cov-div)" stroke="#E4E0D8" strokeWidth="0.5" />
        <text x={W - 12} y={13} textAnchor="end" fontFamily="'IBM Plex Mono', monospace" fontSize="8.5" fill={MUTED}>+1</text>

        {/* cells */}
        {COV.map((row, r) =>
          row.map((v, c) => {
            const pos = v >= 0;
            const alpha = Math.max(0.04, Math.abs(v));
            const strong = Math.abs(v) > 0.55;
            return (
              <g key={`${r}-${c}`}>
                <rect
                  x={at(c)}
                  y={at(r) - PAD_L + PAD_T}
                  width={CELL}
                  height={CELL}
                  rx="6"
                  fill={pos ? ORANGE : BLUE}
                  fillOpacity={alpha}
                  stroke={r === c ? INK : 'none'}
                  strokeWidth={r === c ? 1.3 : 0}
                />
                <text
                  x={at(c) + CELL / 2}
                  y={at(r) - PAD_L + PAD_T + CELL / 2 + 3}
                  textAnchor="middle"
                  fontFamily="'IBM Plex Mono', monospace"
                  fontSize="8.5"
                  fill={strong ? '#fff' : INK}
                  opacity={strong ? 0.96 : Math.abs(v) < 0.08 ? 0.4 : 0.7}
                >
                  {fmt(v)}
                </text>
              </g>
            );
          })
        )}

        {/* observed skill highlight — row + column 0 */}
        <rect x={PAD_L - 2} y={PAD_T - 2} width={GRID + 4} height={CELL + 4} rx="8" fill="none" stroke={ORANGE} strokeWidth="1.8" />
        <rect x={PAD_L - 2} y={PAD_T - 2} width={CELL + 4} height={GRID + 4} rx="8" fill="none" stroke={ORANGE} strokeWidth="1.8" />

        {/* left labels */}
        {SKILLS.map((s, r) => {
          const y = at(r) - PAD_L + PAD_T + CELL / 2 + 3;
          const observed = r === 0;
          return (
            <text
              key={`l-${r}`}
              x={PAD_L - 9}
              y={y}
              textAnchor="end"
              fontFamily="'IBM Plex Mono', monospace"
              fontSize="8.5"
              fontWeight={observed ? 600 : 400}
              fill={observed ? ORANGE : MUTED}
            >
              {observed ? `${s} ★` : s}
            </text>
          );
        })}

        {/* bottom labels (angled) */}
        {SKILLS.map((s, c) => {
          const x = at(c) + CELL / 2;
          const y = PAD_T + GRID + 12;
          const observed = c === 0;
          return (
            <text
              key={`b-${c}`}
              x={x}
              y={y}
              textAnchor="end"
              transform={`rotate(-40 ${x} ${y})`}
              fontFamily="'IBM Plex Mono', monospace"
              fontSize="8.5"
              fontWeight={observed ? 600 : 400}
              fill={observed ? ORANGE : MUTED}
            >
              {s}
            </text>
          );
        })}
      </svg>
    </Box>
  );
}
