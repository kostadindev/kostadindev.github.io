import { Box } from '@mui/material';

/**
 * The skillinfer pipeline (thesis ch.4, restyled to the site).
 * prior → observe a task → transfer along Σ → posterior → route an ad hoc team.
 *
 * Laid out vertically on purpose. The slot this sits in is roughly square
 * (~575x474), so the previous 5-across arrangement was 3.3:1 and filled under a
 * quarter of it — which forced the whole graphic down to ~0.69 scale and left
 * every label rendering at 5-6px. Stacking the stages puts the aspect near 1.2:1,
 * so the type can be set at a readable size instead.
 */
const INK = '#17181C';
const ORANGE = '#E8590C';
const AGENT = '#D97757';
const BLUE = '#3B6FB0';
const MUTED = '#8A897F';
const TRACK = '#F1E7DF';
const CARD = '#FBF4EF';
const HAIRLINE = '#EBD9CE';

const W = 480;
const HEAD = 30;
const ROW_H = 72;
const ROWS = 5;
const H = HEAD + ROWS * ROW_H + 10;

const RAIL = 18;      // centre of the numbered badge column
const LABEL_X = 40;   // stage name
const VIZ_X = 158;    // where each stage's mini-visualisation starts

const rowY = (i: number) => HEAD + i * ROW_H;

/** Horizontal skill bars. `spread` draws the credible interval whisker. */
function SkillBars({
  x, y, vals, opacity, spread,
}: { x: number; y: number; vals: number[]; opacity: number; spread?: number }) {
  const barW = 168;
  return (
    <>
      {vals.map((v, i) => {
        const by = y + i * 9;
        const len = Math.max(5, v * barW);
        return (
          <g key={i}>
            <rect x={x} y={by} width={barW} height={5} rx={2.5} fill={TRACK} />
            <rect x={x} y={by} width={len} height={5} rx={2.5} fill={ORANGE} opacity={opacity} />
            {spread ? (
              <line
                x1={Math.max(5, len - spread) + x}
                y1={by + 2.5}
                x2={Math.min(barW, len + spread) + x}
                y2={by + 2.5}
                stroke={ORANGE}
                strokeWidth="1"
                opacity="0.55"
                strokeLinecap="round"
              />
            ) : null}
          </g>
        );
      })}
    </>
  );
}

function Stage({
  i, n, label, note, accent, children,
}: {
  i: number; n: number; label: string; note: string; accent: string; children: React.ReactNode;
}) {
  const y = rowY(i);
  const cy = y + ROW_H / 2 - 6;
  return (
    <g>
      {/* dashed rail down to the next stage */}
      {i < ROWS - 1 && (
        <line
          x1={RAIL} y1={cy + 13} x2={RAIL} y2={cy + ROW_H - 13}
          stroke={INK} strokeWidth="1.4" strokeDasharray="1 4" strokeLinecap="round" opacity="0.55"
        />
      )}
      <circle cx={RAIL} cy={cy} r={11} fill={accent} />
      <text
        x={RAIL} y={cy + 3.5} textAnchor="middle"
        fontFamily="'IBM Plex Mono', monospace" fontSize="11" fontWeight="700" fill="#fff"
      >
        {n}
      </text>

      <text
        x={LABEL_X} y={cy - 3}
        fontFamily="'IBM Plex Mono', monospace" fontSize="11" letterSpacing="0.07em" fill={accent}
      >
        {label}
      </text>
      <text
        x={LABEL_X} y={cy + 11}
        fontFamily="'IBM Plex Mono', monospace" fontSize="9" fill={MUTED}
      >
        {note}
      </text>

      {children}
    </g>
  );
}

export default function SkillPipeline() {
  const prior = [0.72, 0.5, 0.78, 0.42, 0.6];
  const post = [0.9, 0.44, 0.86, 0.5, 0.66];

  return (
    <Box sx={{ width: '100%', p: { xs: 1.5, md: 2 }, display: 'flex', justifyContent: 'center' }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ maxWidth: 520, display: 'block' }}
        role="img"
        aria-label="The skillinfer pipeline: a prior over skills, observe a task, transfer belief along the covariance, form a posterior, then route an ad hoc team"
      >
        <text x={0} y={12} fontFamily="'IBM Plex Mono', monospace" fontSize="12" fill={INK}>
          skillinfer.pipeline
        </text>
        <text x={0} y={25} fontFamily="'IBM Plex Mono', monospace" fontSize="9" fill={MUTED}>
          one noisy observation updates the whole profile
        </text>

        {/* 1 · PRIOR */}
        <Stage i={0} n={1} label="PRIOR" note="wide, uncertain" accent={ORANGE}>
          <SkillBars x={VIZ_X} y={rowY(0) + 14} vals={prior} opacity={0.45} spread={16} />
        </Stage>

        {/* 2 · OBSERVE */}
        <Stage i={1} n={2} label="OBSERVE" note="one task, one score" accent={AGENT}>
          <rect
            x={VIZ_X} y={rowY(1) + 16} width={104} height={38} rx={6}
            fill={CARD} stroke={HAIRLINE} strokeWidth="1"
          />
          <text x={VIZ_X + 10} y={rowY(1) + 30} fontFamily="'IBM Plex Mono', monospace" fontSize="8.5" fill={MUTED}>
            task
          </text>
          <line x1={VIZ_X + 10} y1={rowY(1) + 38} x2={VIZ_X + 90} y2={rowY(1) + 38} stroke={TRACK} strokeWidth="3.5" strokeLinecap="round" />
          <line x1={VIZ_X + 10} y1={rowY(1) + 46} x2={VIZ_X + 70} y2={rowY(1) + 46} stroke={TRACK} strokeWidth="3.5" strokeLinecap="round" />
          <path
            d={`M${VIZ_X + 112},${rowY(1) + 35} L${VIZ_X + 132},${rowY(1) + 35}`}
            stroke={INK} strokeWidth="1.4" strokeDasharray="1 4" strokeLinecap="round" markerEnd="url(#sp-arrow)"
          />
          <rect x={VIZ_X + 140} y={rowY(1) + 24} width={62} height={22} rx={11} fill={ORANGE} />
          <text
            x={VIZ_X + 171} y={rowY(1) + 39} textAnchor="middle"
            fontFamily="'IBM Plex Mono', monospace" fontSize="11" fontWeight="600" fill="#fff"
          >
            y = .84
          </text>
        </Stage>

        {/* 3 · TRANSFER along Σ */}
        <Stage i={2} n={3} label="TRANSFER" note="along Σ" accent={INK}>
          {(() => {
            const M = [
              [1, 0.7, -0.4],
              [0.7, 1, -0.2],
              [-0.4, -0.2, 1],
            ];
            const g = 17;
            const ox = VIZ_X;
            const oy = rowY(2) + 15;
            return (
              <>
                {M.flatMap((row, r) =>
                  row.map((v, c) => (
                    <rect
                      key={`${r}-${c}`}
                      x={ox + c * g} y={oy + r * g} width={g - 3} height={g - 3} rx={2.5}
                      fill={v >= 0 ? ORANGE : BLUE}
                      fillOpacity={Math.max(0.12, Math.abs(v))}
                      stroke={r === c ? INK : 'none'}
                      strokeWidth={r === c ? 1 : 0}
                    />
                  ))
                )}
                <text
                  x={ox + 3 * g + 10} y={oy + 26}
                  fontFamily="'Space Grotesk', sans-serif" fontSize="22" fontWeight="600" fill={INK}
                >
                  &#931;
                </text>
                <text
                  x={ox + 3 * g + 34} y={oy + 16}
                  fontFamily="'IBM Plex Mono', monospace" fontSize="8.5" fill={ORANGE}
                >
                  + correlated
                </text>
                <text
                  x={ox + 3 * g + 34} y={oy + 30}
                  fontFamily="'IBM Plex Mono', monospace" fontSize="8.5" fill={BLUE}
                >
                  &#8722; anti-correlated
                </text>
              </>
            );
          })()}
        </Stage>

        {/* 4 · POSTERIOR */}
        <Stage i={3} n={4} label="POSTERIOR" note="sharper, calibrated" accent={ORANGE}>
          <SkillBars x={VIZ_X} y={rowY(3) + 14} vals={post} opacity={0.92} spread={5} />
        </Stage>

        {/* 5 · ROUTE */}
        <Stage i={4} n={5} label="ROUTE" note="ad hoc team" accent={ORANGE}>
          {(() => {
            const cx = VIZ_X + 30;
            const cy = rowY(4) + 22;
            return (
              <>
                <circle cx={cx} cy={cy} r={7} fill="none" stroke={INK} strokeWidth="1.5" />
                <path
                  d={`M${cx},${cy + 7} L${cx - 18},${cy + 26} M${cx},${cy + 7} L${cx + 18},${cy + 26}`}
                  stroke={INK} strokeWidth="1.3"
                />
                <circle cx={cx - 18} cy={cy + 33} r={7.5} fill={ORANGE} />
                <circle cx={cx + 18} cy={cy + 33} r={7.5} fill={AGENT} />
                <text
                  x={cx + 40} y={cy + 20}
                  fontFamily="'IBM Plex Mono', monospace" fontSize="8.5" fill={ORANGE}
                >
                  human
                </text>
                <text
                  x={cx + 40} y={cy + 34}
                  fontFamily="'IBM Plex Mono', monospace" fontSize="8.5" fill={AGENT}
                >
                  agent
                </text>
                <text
                  x={cx + 100} y={cy + 27}
                  fontFamily="'IBM Plex Mono', monospace" fontSize="8.5" fill={MUTED}
                >
                  matched to the task
                </text>
              </>
            );
          })()}
        </Stage>

        <defs>
          <marker id="sp-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <path d="M0,0 L6,3.5 L0,7 Z" fill={INK} />
          </marker>
        </defs>
      </svg>
    </Box>
  );
}
