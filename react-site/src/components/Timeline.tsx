import { useRef, useMemo, useEffect } from 'react';
import { Box, Container, Typography, Tooltip, Stack } from '@mui/material';
import { experience, teaching, education } from '../data/content';

/* ── Types ── */

interface TimelineEntry {
  type: 'work' | 'education' | 'teaching';
  title: string;
  subtitle: string;
  start: Date;
  end: Date;
  color: string;
}

/* ── Date parsing ── */

const MONTHS: Record<string, number> = {
  January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
  July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
};

function parsePeriod(period: string): { start: Date; end: Date } {
  const parts = period.split('–').map((s) => s.trim());
  const parseDate = (s: string) => {
    const tokens = s.split(' ');
    return new Date(parseInt(tokens[1], 10), MONTHS[tokens[0]] ?? 0);
  };
  const start = parseDate(parts[0]);
  const end = parts.length > 1 ? parseDate(parts[1]) : new Date(start.getFullYear(), start.getMonth() + 1);
  return { start, end };
}

/* ── Colours ── */

const WORK_COLOR = '#d4851f';
const EDU_COLOR = '#6366f1';
const TEACH_COLOR = '#10b981';

/* ── Build entries ── */

function buildEntries(): TimelineEntry[] {
  const entries: TimelineEntry[] = [];

  for (const job of experience) {
    const { start, end } = parsePeriod(job.period);
    entries.push({ type: 'work', title: job.title, subtitle: job.company, start, end, color: WORK_COLOR });
  }

  const eduDates: { institution: string; start: Date; end: Date }[] = [
    { institution: 'University of Cambridge', start: new Date(2025, 9), end: new Date(2026, 5) },
    { institution: 'Stony Brook University', start: new Date(2018, 7), end: new Date(2022, 4) },
    { institution: 'University of Hawaii at Hilo', start: new Date(2019, 7), end: new Date(2020, 4) },
  ];
  for (const edu of education) {
    const dates = eduDates.find((d) => d.institution === edu.institution);
    if (dates) {
      entries.push({ type: 'education', title: edu.degree, subtitle: edu.institution, start: dates.start, end: dates.end, color: EDU_COLOR });
    }
  }

  for (const t of teaching) {
    const { start, end } = parsePeriod(t.period);
    entries.push({ type: 'teaching', title: t.title, subtitle: t.institution, start, end, color: TEACH_COLOR });
  }

  return entries;
}

/* ── Lane allocation ── */

function allocateLanes<T extends { start: Date; end: Date }>(items: T[]): (T & { lane: number })[] {
  const sorted = [...items].sort((a, b) => a.start.getTime() - b.start.getTime());
  const laneEnds: number[] = [];
  return sorted.map((item) => {
    let lane = laneEnds.findIndex((end) => item.start.getTime() >= end);
    if (lane === -1) { lane = laneEnds.length; laneEnds.push(item.end.getTime()); }
    else { laneEnds[lane] = item.end.getTime(); }
    return { ...item, lane };
  });
}

/* ── Layout constants ── */

const PX_PER_MONTH = 14;
const BAR_HEIGHT = 24;
const LANE_HEIGHT = 52;
const MIN_BAR_W = 10;
const LABEL_COL = 80;
const MIN_YEAR = 2018;
const MAX_YEAR = 2027;
const PAD_X = 16;

function dateToX(d: Date) {
  return ((d.getFullYear() - MIN_YEAR) * 12 + d.getMonth()) * PX_PER_MONTH + PAD_X;
}

/* ── Component ── */

export default function Timeline() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const entries = useMemo(() => buildEntries(), []);
  const workEntries = useMemo(() => allocateLanes(entries.filter((e) => e.type === 'work')), [entries]);
  const eduEntries = useMemo(() => allocateLanes(entries.filter((e) => e.type === 'education')), [entries]);
  const teachEntries = useMemo(() => allocateLanes(entries.filter((e) => e.type === 'teaching')), [entries]);

  const tracks = useMemo(() => [
    { label: 'Work', color: WORK_COLOR, entries: workEntries, lanes: Math.max(1, ...workEntries.map((e) => e.lane + 1)) },
    { label: 'Education', color: EDU_COLOR, entries: eduEntries, lanes: Math.max(1, ...eduEntries.map((e) => e.lane + 1)) },
    { label: 'Teaching', color: TEACH_COLOR, entries: teachEntries, lanes: Math.max(1, ...teachEntries.map((e) => e.lane + 1)) },
  ], [workEntries, eduEntries, teachEntries]);

  const trackOffsets = useMemo(() => {
    const offsets: number[] = [];
    let y = 0;
    for (const t of tracks) {
      offsets.push(y);
      y += t.lanes * LANE_HEIGHT;
    }
    return offsets;
  }, [tracks]);

  const totalHeight = trackOffsets[trackOffsets.length - 1] + tracks[tracks.length - 1].lanes * LANE_HEIGHT + 30;
  const totalWidth = (MAX_YEAR - MIN_YEAR) * 12 * PX_PER_MONTH + PAD_X * 2;
  const years = Array.from({ length: MAX_YEAR - MIN_YEAR + 1 }, (_, i) => MIN_YEAR + i);
  const nowX = dateToX(new Date());

  // Scroll to show recent activity on mount
  useEffect(() => {
    if (scrollRef.current) {
      const target = dateToX(new Date(2021, 0));
      scrollRef.current.scrollLeft = target;
    }
  }, []);

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#faf9f7' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ mb: 1, fontSize: { xs: '1.8rem', md: '2.4rem' } }}
        >
          Timeline
        </Typography>
        <Box sx={{ width: 40, height: 3, bgcolor: 'primary.main', mx: 'auto', mb: 2, borderRadius: 2 }} />

        {/* Legend */}
        <Stack direction="row" spacing={3} justifyContent="center" sx={{ mb: 4 }}>
          {tracks.map((t) => (
            <Stack key={t.label} direction="row" alignItems="center" spacing={0.75}>
              <Box sx={{ width: 20, height: 6, borderRadius: 3, bgcolor: t.color }} />
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.75rem' }}>
                {t.label}
              </Typography>
            </Stack>
          ))}
        </Stack>

        {/* Main timeline */}
        <Box
          sx={{
            display: 'flex',
            border: '1px solid',
            borderColor: 'rgba(0,0,0,0.08)',
            borderRadius: 3,
            bgcolor: 'background.paper',
            overflow: 'hidden',
          }}
        >
          {/* Fixed track labels */}
          <Box sx={{ width: LABEL_COL, flexShrink: 0, borderRight: '1px solid rgba(0,0,0,0.06)' }}>
            {tracks.map((track, ti) => (
              <Box
                key={track.label}
                sx={{
                  height: track.lanes * LANE_HEIGHT,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottom: ti < tracks.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    color: track.color,
                    fontSize: '0.7rem',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  {track.label}
                </Typography>
              </Box>
            ))}
            {/* Year axis row label */}
            <Box sx={{ height: 30 }} />
          </Box>

          {/* Scrollable timeline area */}
          <Box
            ref={scrollRef}
            sx={{
              flex: 1,
              overflowX: 'auto',
              '&::-webkit-scrollbar': { height: 5 },
              '&::-webkit-scrollbar-thumb': { background: 'rgba(128,128,128,0.25)', borderRadius: 3 },
            }}
          >
            <Box sx={{ position: 'relative', width: totalWidth, height: totalHeight }}>
              {/* Year grid lines */}
              {years.map((year) => {
                const x = dateToX(new Date(year, 0));
                return (
                  <Box key={year}>
                    <Box
                      sx={{
                        position: 'absolute', left: x, top: 0,
                        width: '1px', height: totalHeight - 30,
                        bgcolor: 'rgba(0,0,0,0.04)',
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        position: 'absolute', left: x, top: totalHeight - 26,
                        transform: 'translateX(-50%)',
                        color: 'text.secondary', fontWeight: 600, fontSize: '0.68rem',
                      }}
                    >
                      {year}
                    </Typography>
                  </Box>
                );
              })}

              {/* Track separator lines */}
              {trackOffsets.slice(1).map((y, i) => (
                <Box
                  key={i}
                  sx={{
                    position: 'absolute', left: 0, top: y,
                    width: '100%', height: '1px',
                    bgcolor: 'rgba(0,0,0,0.06)',
                  }}
                />
              ))}

              {/* Now marker */}
              <Box
                sx={{
                  position: 'absolute', left: nowX, top: 0,
                  width: 2, height: totalHeight - 30,
                  background: `linear-gradient(180deg, ${WORK_COLOR}60, ${WORK_COLOR}10)`,
                  borderRadius: 1,
                }}
              />

              {/* Bars per track */}
              {tracks.map((track, ti) => {
                const trackY = trackOffsets[ti];
                return track.entries.map((entry, ei) => {
                  const x = dateToX(entry.start);
                  const w = Math.max(dateToX(entry.end) - x, MIN_BAR_W);
                  const y = trackY + entry.lane * LANE_HEIGHT + 18;
                  return (
                    <TimelineBar
                      key={`${track.label}-${ei}`}
                      entry={entry}
                      x={x}
                      y={y}
                      width={w}
                    />
                  );
                });
              })}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

/* ── Bar component ── */

function TimelineBar({ entry, x, y, width }: { entry: TimelineEntry; x: number; y: number; width: number }) {
  const startStr = entry.start.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  const endStr = entry.end.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  return (
    <Tooltip
      title={
        <Box sx={{ p: 0.5 }}>
          <Typography variant="body2" fontWeight={700} sx={{ mb: 0.25 }}>{entry.title}</Typography>
          <Typography variant="caption" sx={{ opacity: 0.85 }}>{entry.subtitle}</Typography>
          <Typography variant="caption" display="block" sx={{ opacity: 0.55, mt: 0.5 }}>
            {startStr} — {endStr}
          </Typography>
        </Box>
      }
      arrow
      placement="top"
      enterDelay={200}
    >
      <Box
        sx={{
          position: 'absolute',
          left: x,
          top: y,
          width,
          cursor: 'pointer',
          '&:hover .tl-bar': {
            opacity: 1,
            transform: 'scaleY(1.2)',
            boxShadow: `0 3px 12px ${entry.color}30`,
          },
          '&:hover .tl-label': {
            color: 'text.primary',
          },
        }}
      >
        {/* Label above bar */}
        <Typography
          className="tl-label"
          sx={{
            position: 'absolute',
            bottom: BAR_HEIGHT + 2,
            left: 0,
            fontSize: '0.62rem',
            fontWeight: 600,
            color: 'text.secondary',
            whiteSpace: 'nowrap',
            lineHeight: 1,
            transition: 'color 0.2s',
            pointerEvents: 'none',
          }}
        >
          {entry.subtitle}
        </Typography>
        {/* Bar */}
        <Box
          className="tl-bar"
          sx={{
            width: '100%',
            height: BAR_HEIGHT,
            bgcolor: entry.color,
            borderRadius: 1.5,
            opacity: 0.75,
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            transformOrigin: 'center bottom',
          }}
        />
      </Box>
    </Tooltip>
  );
}
