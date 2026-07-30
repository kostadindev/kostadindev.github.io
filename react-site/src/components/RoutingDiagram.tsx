import { Box, Typography, Stack } from '@mui/material';

const INK = '#17181C';
const ORANGE = '#E8590C';
const AGENT = '#D97757'; // Claude's native coral
const HAIRLINE = '#DBD8CF';
const MUTED = '#8A897F';
const TRACK = '#ECE7E0';

// Same skill taxonomy, different profiles: Kosta and Claude are complementary.
const DIMS = ['ideas', 'recall', 'judgment', 'coding'];
const KOSTA_SKILL = [0.9, 0.42, 0.86, 0.5];
const CLAUDE_SKILL = [0.45, 0.95, 0.5, 0.9];

const BAR_X = 180;
const BAR_W = 66;

function skillRows(values: number[], topY: number, color: string) {
  return values.map((v, i) => {
    const y = topY + i * 20;
    return (
      <g key={i}>
        <text x={172} y={y + 8} textAnchor="end" fontFamily="'IBM Plex Mono', monospace" fontSize="9.5" fill={MUTED}>
          {DIMS[i]}
        </text>
        <rect x={BAR_X} y={y} width={BAR_W} height="9" rx="4.5" fill={TRACK} />
        <rect x={BAR_X} y={y} width={Math.max(7, v * BAR_W)} height="9" rx="4.5" fill={color} />
      </g>
    );
  });
}

/**
 * The signature — the thesis as a pipeline, read left→right:
 *   candidates (Kosta + Claude, each with a different skill profile)
 *   → orchestration infers those skills and routes
 *   → a hybrid team of both.
 */
export default function RoutingDiagram({ avatar }: { avatar: string }) {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: HAIRLINE,
        borderRadius: '14px',
        bgcolor: '#fff',
        overflow: 'hidden',
        boxShadow: '0 18px 50px rgba(23,24,28,0.07)',
        maxWidth: 520,
        mx: { xs: 'auto', md: 0 },
      }}
    >
      {/* instrument header strip */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 2, py: 1.25, borderBottom: '1px solid', borderColor: HAIRLINE, bgcolor: 'var(--panel)' }}
      >
        <Typography className="mono" sx={{ fontSize: '0.7rem', color: INK, letterSpacing: '0.04em' }}>
          orchestration.graph
        </Typography>
        <Stack direction="row" alignItems="center" spacing={0.75}>
          <Box className="node-ping" sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: ORANGE }} />
          <Typography className="mono" sx={{ fontSize: '0.68rem', color: MUTED }}>
            routing
          </Typography>
        </Stack>
      </Stack>

      {/* the graph */}
      <Box sx={{ p: 1 }}>
        <svg viewBox="0 0 600 340" width="100%" style={{ display: 'block' }} role="img" aria-label="Kosta and Claude, each with a different skill profile, are routed by orchestration into an ad hoc team of both">
          <defs>
            <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.1" fill={INK} opacity="0.06" />
            </pattern>
            <clipPath id="human-clip">
              <rect x="18" y="34" width="106" height="112" rx="14" />
            </clipPath>
            <marker id="arrow-o" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L7,4 L0,8 Z" fill={ORANGE} />
            </marker>
            <marker id="arrow-a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L7,4 L0,8 Z" fill={AGENT} />
            </marker>
            <marker id="arrow-k" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
              <path d="M0,0 L8,4.5 L0,9 Z" fill={INK} />
            </marker>
          </defs>

          <rect x="0" y="0" width="600" height="340" fill="url(#dots)" />

          {/* edges: candidates → orchestration (revealed once candidates are in) */}
          <g className="rd-edge rd-d3">
            <path d="M250,90 C 282,96 290,142 300,150" fill="none" stroke={ORANGE} strokeWidth="2.5" markerEnd="url(#arrow-o)" />
            <path d="M250,246 C 282,240 290,196 300,190" fill="none" stroke={AGENT} strokeWidth="2.5" markerEnd="url(#arrow-a)" />
          </g>
          {/* edge: orchestration → the assembled team */}
          <g className="rd-edge rd-d5">
            <path d="M446,166 L487,166" fill="none" stroke={INK} strokeWidth="2" strokeDasharray="1 5" strokeLinecap="round" markerEnd="url(#arrow-k)" />
          </g>

          {/* KOSTA candidate — the headshot + skill profile */}
          <g className="rd-in rd-d1">
            <image href={avatar} x="18" y="34" width="106" height="112" clipPath="url(#human-clip)" preserveAspectRatio="xMidYMin slice" />
            <rect x="18" y="34" width="106" height="112" rx="14" fill="none" stroke={ORANGE} strokeWidth="2.5" />
            <circle cx="24" cy="166" r="4" fill={ORANGE} />
            <text x="34" y="170" fontFamily="'IBM Plex Mono', monospace" fontSize="13" fill={INK}>Kosta</text>
            {skillRows(KOSTA_SKILL, 54, ORANGE)}
          </g>

          {/* CLAUDE candidate — burst glyph + skill profile */}
          <g className="rd-in rd-d2">
            <rect x="18" y="196" width="100" height="100" rx="14" fill="#fff" stroke={AGENT} strokeWidth="2.5" />
            <g stroke={AGENT} strokeWidth="2.6" strokeLinecap="round">
              <line x1="68" y1="240" x2="68" y2="220" />
              <line x1="68" y1="252" x2="68" y2="272" />
              <line x1="62" y1="246" x2="42" y2="246" />
              <line x1="74" y1="246" x2="94" y2="246" />
              <line x1="63.8" y1="241.8" x2="49.6" y2="227.6" />
              <line x1="72.2" y1="250.2" x2="86.4" y2="264.4" />
              <line x1="63.8" y1="250.2" x2="49.6" y2="264.4" />
              <line x1="72.2" y1="241.8" x2="86.4" y2="227.6" />
            </g>
            <circle cx="24" cy="314" r="4" fill="none" stroke={AGENT} strokeWidth="2" />
            <text x="34" y="318" fontFamily="'IBM Plex Mono', monospace" fontSize="13" fill={INK}>Claude</text>
            {skillRows(CLAUDE_SKILL, 212, AGENT)}
          </g>

          {/* ORCHESTRATION junction */}
          <g className="rd-in rd-d4">
            <rect x="298" y="124" width="148" height="84" rx="16" fill="#fff" stroke={INK} strokeWidth="2" />
            <text x="372" y="161" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize="16.5" fontWeight="600" fill={INK}>orchestration</text>
            <text x="372" y="181" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="10" letterSpacing="0.02em" fill={MUTED}>infer skills &#183; route</text>
          </g>

          {/* THE PAYOFF — the ad hoc team both belong to */}
          <g className="rd-pop rd-d6">
            <rect x="486" y="118" width="102" height="96" rx="18" fill={ORANGE} opacity="0.06" />
            <rect x="490" y="122" width="94" height="88" rx="15" fill="#fff" stroke={ORANGE} strokeWidth="2.5" />
            <text x="537" y="145" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="8.5" letterSpacing="0.14em" fill={MUTED}>AD HOC TEAM</text>
            <line x1="525" y1="171" x2="549" y2="171" stroke={INK} strokeWidth="2" />
            <circle cx="525" cy="171" r="8.5" fill={ORANGE} />
            <circle cx="549" cy="171" r="8.5" fill={AGENT} />
            <text x="537" y="200" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="10.5" fill={INK}>Kosta + Claude</text>
          </g>
        </svg>
      </Box>
    </Box>
  );
}
