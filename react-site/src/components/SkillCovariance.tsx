import { Box } from '@mui/material';

/**
 * Thesis visual — the covariance behind skill inference.
 * The core mechanism: skills are correlated, so observing one shifts your
 * belief about the ones it covaries with. Darker = stronger correlation.
 */
const INK = '#17181C';
const ORANGE = '#E8590C';
const MUTED = '#8A897F';

const SKILLS = ['Mathematics', 'Science', 'Problem', 'Learning', 'Systems'];

// Symmetric correlation matrix (illustrative), diagonal = 1.
const COV = [
  [1.0, 0.72, 0.68, 0.44, 0.55],
  [0.72, 1.0, 0.6, 0.5, 0.62],
  [0.68, 0.6, 1.0, 0.58, 0.66],
  [0.44, 0.5, 0.58, 1.0, 0.47],
  [0.55, 0.62, 0.66, 0.47, 1.0],
];

const PAD_L = 78;
const PAD_T = 44;
const CELL = 42;
const GAP = 5;
const N = SKILLS.length;
const GRID = N * CELL + (N - 1) * GAP;
const W = PAD_L + GRID + 14;
const H = PAD_T + GRID + 34;

function cell(x: number, y: number) {
  return { cx: PAD_L + x * (CELL + GAP), cy: PAD_T + y * (CELL + GAP) };
}

export default function SkillCovariance() {
  return (
    <Box sx={{ width: '100%', p: { xs: 2.5, md: 3 }, display: 'flex', justifyContent: 'center' }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ maxWidth: 380, display: 'block' }}
        role="img"
        aria-label="A skill covariance matrix: correlated skills update together when one is observed"
      >
        {/* eyebrow */}
        <text x={PAD_L} y={16} fontFamily="'IBM Plex Mono', monospace" fontSize="11" letterSpacing="0.04em" fill={INK}>
          skill.covariance
        </text>
        {/* legend */}
        <defs>
          <linearGradient id="cov-legend" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={ORANGE} stopOpacity="0.14" />
            <stop offset="1" stopColor={ORANGE} stopOpacity="0.94" />
          </linearGradient>
        </defs>
        <text x={W - 78} y={16} fontFamily="'IBM Plex Mono', monospace" fontSize="9" fill={MUTED}>low</text>
        <rect x={W - 60} y={9} width="42" height="8" rx="4" fill="url(#cov-legend)" />
        <text x={W - 14} y={16} textAnchor="end" fontFamily="'IBM Plex Mono', monospace" fontSize="9" fill={MUTED}>high</text>

        {/* cells */}
        {COV.map((row, r) =>
          row.map((v, c) => {
            const { cx, cy } = cell(c, r);
            const alpha = 0.12 + v * 0.82;
            const strong = v > 0.62;
            return (
              <g key={`${r}-${c}`}>
                <rect
                  x={cx}
                  y={cy}
                  width={CELL}
                  height={CELL}
                  rx="7"
                  fill={ORANGE}
                  fillOpacity={alpha}
                  stroke={r === c ? INK : 'none'}
                  strokeWidth={r === c ? 1.4 : 0}
                />
                <text
                  x={cx + CELL / 2}
                  y={cy + CELL / 2 + 3.5}
                  textAnchor="middle"
                  fontFamily="'IBM Plex Mono', monospace"
                  fontSize="10.5"
                  fill={strong ? '#fff' : INK}
                  opacity={strong ? 0.95 : 0.72}
                >
                  {v.toFixed(2).replace(/^0/, '')}
                </text>
              </g>
            );
          })
        )}

        {/* left labels */}
        {SKILLS.map((s, r) => {
          const { cy } = cell(0, r);
          return (
            <text
              key={`l-${r}`}
              x={PAD_L - 9}
              y={cy + CELL / 2 + 3}
              textAnchor="end"
              fontFamily="'IBM Plex Mono', monospace"
              fontSize="9.5"
              fill={MUTED}
            >
              {s}
            </text>
          );
        })}

        {/* bottom labels (angled) */}
        {SKILLS.map((s, c) => {
          const { cx } = cell(c, 0);
          const x = cx + CELL / 2;
          const y = PAD_T + GRID + 12;
          return (
            <text
              key={`b-${c}`}
              x={x}
              y={y}
              textAnchor="end"
              transform={`rotate(-38 ${x} ${y})`}
              fontFamily="'IBM Plex Mono', monospace"
              fontSize="9.5"
              fill={MUTED}
            >
              {s}
            </text>
          );
        })}
      </svg>
    </Box>
  );
}
