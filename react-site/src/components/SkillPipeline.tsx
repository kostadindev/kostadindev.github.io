import { Box } from '@mui/material';

/**
 * The skillinfer pipeline (thesis ch.4, restyled to the site).
 * prior → observe a task → transfer along Σ → posterior → route an ad hoc team.
 */
const INK = '#17181C';
const ORANGE = '#E8590C';
const AGENT = '#D97757';
const BLUE = '#3B6FB0';
const MUTED = '#8A897F';
const TRACK = '#F1E7DF';

const BOX_W = 112;
const BOX_H = 150;
const TOP = 30;
const GAP = 20;
const xs = [4, 4 + (BOX_W + GAP), 4 + 2 * (BOX_W + GAP), 4 + 3 * (BOX_W + GAP), 4 + 4 * (BOX_W + GAP)];
const MIDY = TOP + BOX_H / 2;

function skillBars(x: number, y: number, vals: number[], color: string, opacity: number, whisker?: boolean) {
  return vals.map((v, i) => {
    const by = y + i * 12;
    return (
      <g key={i}>
        <rect x={x} y={by} width={84} height={6} rx={3} fill={TRACK} />
        <rect x={x} y={by} width={Math.max(6, v * 84)} height={6} rx={3} fill={color} opacity={opacity} />
        {whisker && (
          <line x1={Math.max(6, v * 84) + x - 10} y1={by + 3} x2={Math.max(6, v * 84) + x + 12} y2={by + 3} stroke={ORANGE} strokeWidth="0.6" opacity="0.5" />
        )}
      </g>
    );
  });
}

function StepNumber({ cx, n, fill }: { cx: number; n: number; fill: string }) {
  return (
    <>
      <circle cx={cx} cy={12} r={9} fill={fill} />
      <text x={cx} y={15.5} textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="9" fontWeight="700" fill="#fff">{n}</text>
    </>
  );
}

function arrow(x: number) {
  return <path d={`M${x},${MIDY} L${x + GAP - 6},${MIDY}`} stroke={INK} strokeWidth="1.6" strokeDasharray="1 4" strokeLinecap="round" markerEnd="url(#sp-arrow)" />;
}

export default function SkillPipeline() {
  const prior = [0.72, 0.5, 0.78, 0.42, 0.6, 0.46];
  const post = [0.9, 0.44, 0.86, 0.5, 0.66, 0.4];
  return (
    <Box sx={{ width: '100%', p: { xs: 2, md: 2.5 }, display: 'flex', justifyContent: 'center' }}>
      <svg viewBox="0 0 656 200" width="100%" style={{ maxWidth: 560, display: 'block' }} role="img"
        aria-label="The skillinfer pipeline: a prior over skills, observe a task, transfer belief along the covariance, form a posterior, then route an ad hoc team">
        <defs>
          <marker id="sp-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <path d="M0,0 L6,3.5 L0,7 Z" fill={INK} />
          </marker>
        </defs>

        {/* connectors */}
        {xs.slice(0, 4).map((x, i) => (
          <g key={i}>{arrow(x + BOX_W)}</g>
        ))}

        {/* 1 · PRIOR */}
        <StepNumber cx={xs[0] + BOX_W / 2} n={1} fill={ORANGE} />
        <rect x={xs[0]} y={TOP} width={BOX_W} height={BOX_H} rx="10" fill="#fff" stroke={ORANGE} strokeWidth="1.8" />
        <text x={xs[0] + BOX_W / 2} y={TOP + 18} textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="9" letterSpacing="0.08em" fill={ORANGE}>PRIOR</text>
        {skillBars(xs[0] + 14, TOP + 30, prior, ORANGE, 0.55, true)}
        <circle cx={xs[0] + BOX_W / 2} cy={TOP + BOX_H - 26} r={5.5} fill={ORANGE} opacity="0.85" />
        <path d={`M${xs[0] + BOX_W / 2 - 9},${TOP + BOX_H - 10} Q${xs[0] + BOX_W / 2 - 9},${TOP + BOX_H - 20} ${xs[0] + BOX_W / 2},${TOP + BOX_H - 20} Q${xs[0] + BOX_W / 2 + 9},${TOP + BOX_H - 20} ${xs[0] + BOX_W / 2 + 9},${TOP + BOX_H - 10}`} fill={ORANGE} opacity="0.7" />

        {/* 2 · OBSERVE */}
        <StepNumber cx={xs[1] + BOX_W / 2} n={2} fill={AGENT} />
        <rect x={xs[1]} y={TOP} width={BOX_W} height={BOX_H} rx="10" fill="#fff" stroke={AGENT} strokeWidth="1.8" />
        <text x={xs[1] + BOX_W / 2} y={TOP + 18} textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="9" letterSpacing="0.08em" fill={AGENT}>OBSERVE</text>
        <rect x={xs[1] + 18} y={TOP + 32} width={BOX_W - 36} height={40} rx="6" fill="#FBF4EF" stroke="#EBD9CE" strokeWidth="1" />
        <text x={xs[1] + 26} y={TOP + 47} fontFamily="'IBM Plex Mono', monospace" fontSize="7" fill={MUTED}>task</text>
        <line x1={xs[1] + 26} y1={TOP + 54} x2={xs[1] + BOX_W - 26} y2={TOP + 54} stroke={TRACK} strokeWidth="3" strokeLinecap="round" />
        <line x1={xs[1] + 26} y1={TOP + 62} x2={xs[1] + BOX_W - 34} y2={TOP + 62} stroke={TRACK} strokeWidth="3" strokeLinecap="round" />
        <rect x={xs[1] + 28} y={TOP + 92} width={BOX_W - 56} height={22} rx="11" fill={ORANGE} />
        <text x={xs[1] + BOX_W / 2} y={TOP + 107} textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="11" fontWeight="600" fill="#fff">y = .84</text>

        {/* 3 · TRANSFER Σ */}
        <StepNumber cx={xs[2] + BOX_W / 2} n={3} fill={INK} />
        <rect x={xs[2]} y={TOP} width={BOX_W} height={BOX_H} rx="10" fill="#fff" stroke={INK} strokeWidth="1.8" />
        <text x={xs[2] + BOX_W / 2} y={TOP + 18} textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="9" letterSpacing="0.08em" fill={INK}>TRANSFER</text>
        {(() => {
          const M = [
            [1, 0.7, -0.4],
            [0.7, 1, -0.2],
            [-0.4, -0.2, 1],
          ];
          const g = 20;
          const ox = xs[2] + BOX_W / 2 - (3 * g) / 2;
          const oy = TOP + 34;
          return M.flatMap((row, r) =>
            row.map((v, c) => (
              <rect key={`${r}-${c}`} x={ox + c * g} y={oy + r * g} width={g - 3} height={g - 3} rx="3"
                fill={v >= 0 ? ORANGE : BLUE} fillOpacity={Math.max(0.12, Math.abs(v))}
                stroke={r === c ? INK : 'none'} strokeWidth={r === c ? 1 : 0} />
            ))
          );
        })()}
        <text x={xs[2] + BOX_W / 2} y={TOP + BOX_H - 20} textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="20" fontWeight="600" fill={INK}>&#931;</text>

        {/* 4 · POSTERIOR */}
        <StepNumber cx={xs[3] + BOX_W / 2} n={4} fill={ORANGE} />
        <rect x={xs[3]} y={TOP} width={BOX_W} height={BOX_H} rx="10" fill="#fff" stroke={ORANGE} strokeWidth="1.8" />
        <text x={xs[3] + BOX_W / 2} y={TOP + 18} textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="9" letterSpacing="0.08em" fill={ORANGE}>POSTERIOR</text>
        {skillBars(xs[3] + 14, TOP + 30, post, ORANGE, 0.9)}
        <circle cx={xs[3] + BOX_W - 24} cy={TOP + BOX_H - 22} r={9} fill="none" stroke={ORANGE} strokeWidth="1.6" />
        <path d={`M${xs[3] + BOX_W - 28},${TOP + BOX_H - 22} l3,3 l5,-6`} fill="none" stroke={ORANGE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

        {/* 5 · AD HOC TEAM */}
        <StepNumber cx={xs[4] + BOX_W / 2} n={5} fill={ORANGE} />
        <rect x={xs[4] - 4} y={TOP - 4} width={BOX_W + 8} height={BOX_H + 8} rx="14" fill={ORANGE} opacity="0.06" />
        <rect x={xs[4]} y={TOP} width={BOX_W} height={BOX_H} rx="10" fill="#fff" stroke={ORANGE} strokeWidth="2.2" />
        <text x={xs[4] + BOX_W / 2} y={TOP + 18} textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="9" letterSpacing="0.08em" fill={ORANGE}>ROUTE</text>
        {/* route glyph */}
        <circle cx={xs[4] + BOX_W / 2} cy={TOP + 52} r={6} fill="none" stroke={INK} strokeWidth="1.6" />
        <path d={`M${xs[4] + BOX_W / 2},${TOP + 58} L${xs[4] + BOX_W / 2 - 20},${TOP + 84} M${xs[4] + BOX_W / 2},${TOP + 58} L${xs[4] + BOX_W / 2 + 20},${TOP + 84}`} stroke={INK} strokeWidth="1.4" />
        <circle cx={xs[4] + BOX_W / 2 - 20} cy={TOP + 90} r={7} fill={ORANGE} />
        <circle cx={xs[4] + BOX_W / 2 + 20} cy={TOP + 90} r={7} fill={AGENT} />
        <text x={xs[4] + BOX_W / 2} y={TOP + BOX_H - 16} textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="8.5" fill={INK}>ad hoc team</text>
      </svg>
    </Box>
  );
}
