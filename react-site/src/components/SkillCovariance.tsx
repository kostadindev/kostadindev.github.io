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

// Column headers are set horizontally rather than rotated. Σ is symmetric, so a
// short form per column is enough to read a cell, and -40° labels were colliding
// with each other at this size.
const SHORT = ['Math', 'MathR', 'NumF', 'Sci', 'VisD', 'ManD', 'Str'];

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
const PAD_L = 116;
const PAD_T = 62;
// Cells were 38px inside a maxWidth-440 svg, so labels landed near 8px on screen.
const CELL = 42;
const GAP = 5;
const GRID = N * CELL + (N - 1) * GAP;
const W = PAD_L + GRID + 16;
const H = PAD_T + GRID + 26;

const at = (i: number) => PAD_L + i * (CELL + GAP);
const rowTop = (r: number) => PAD_T + r * (CELL + GAP);

function fmt(v: number) {
  if (v === 1) return '1.0';
  const s = v.toFixed(2).replace(/^(-?)0\./, '$1.');
  return v > 0 ? `+${s}` : s;
}

export default function SkillCovariance() {
  return (
    <Box sx={{ width: '100%', p: { xs: 1.5, md: 2 }, display: 'flex', justifyContent: 'center' }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ maxWidth: 520, display: 'block' }}
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
        <text x={0} y={13} fontFamily="'IBM Plex Mono', monospace" fontSize="12" fill={INK}>
          skill.covariance
        </text>
        <text x={0} y={27} fontFamily="'IBM Plex Mono', monospace" fontSize="9" fill={MUTED}>
          observe one &#183; its neighbours move too
        </text>

        {/* diverging legend */}
        <text x={W - 138} y={14} fontFamily="'IBM Plex Mono', monospace" fontSize="9" fill={MUTED}>
          &#961;
        </text>
        <text x={W - 126} y={14} fontFamily="'IBM Plex Mono', monospace" fontSize="9" fill={MUTED}>
          &#8722;1
        </text>
        <rect x={W - 104} y={6} width="76" height="9" rx="2" fill="url(#cov-div)" stroke="#E4E0D8" strokeWidth="0.5" />
        <text x={W} y={14} textAnchor="end" fontFamily="'IBM Plex Mono', monospace" fontSize="9" fill={MUTED}>
          +1
        </text>

        {/* column headers */}
        {SHORT.map((s, c) => (
          <text
            key={`h-${c}`}
            x={at(c) + CELL / 2}
            y={PAD_T - 9}
            textAnchor="middle"
            fontFamily="'IBM Plex Mono', monospace"
            fontSize="9.5"
            fontWeight={c === 0 ? 600 : 400}
            fill={c === 0 ? ORANGE : MUTED}
          >
            {s}
          </text>
        ))}

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
                  y={rowTop(r)}
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
                  y={rowTop(r) + CELL / 2 + 3.5}
                  textAnchor="middle"
                  fontFamily="'IBM Plex Mono', monospace"
                  fontSize="10"
                  fill={strong ? '#fff' : INK}
                  opacity={strong ? 0.96 : Math.abs(v) < 0.08 ? 0.45 : 0.72}
                >
                  {fmt(v)}
                </text>
              </g>
            );
          })
        )}

        {/* observed skill highlight — row + column 0 */}
        <rect x={PAD_L - 3} y={PAD_T - 3} width={GRID + 6} height={CELL + 6} rx="8" fill="none" stroke={ORANGE} strokeWidth="1.8" />
        <rect x={PAD_L - 3} y={PAD_T - 3} width={CELL + 6} height={GRID + 6} rx="8" fill="none" stroke={ORANGE} strokeWidth="1.8" />

        {/* row labels */}
        {SKILLS.map((s, r) => {
          const observed = r === 0;
          return (
            <text
              key={`l-${r}`}
              x={PAD_L - 11}
              y={rowTop(r) + CELL / 2 + 3.5}
              textAnchor="end"
              fontFamily="'IBM Plex Mono', monospace"
              fontSize="9.5"
              fontWeight={observed ? 600 : 400}
              fill={observed ? ORANGE : MUTED}
            >
              {observed ? `${s} ★` : s}
            </text>
          );
        })}
      </svg>
    </Box>
  );
}
