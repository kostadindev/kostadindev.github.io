import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Collapse,
  Container,
  Typography,
  Chip,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Tooltip,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import DescriptionIcon from '@mui/icons-material/Description';
import ArticleIcon from '@mui/icons-material/Article';
import SummarizeIcon from '@mui/icons-material/Summarize';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import ImageIcon from '@mui/icons-material/Image';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { projects, type Project } from '../data/content';
import SectionHeader from './SectionHeader';

const DockerIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
    <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186h-2.12a.186.186 0 00-.185.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" />
  </svg>
);

const PythonIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
    <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
  </svg>
);

const linkIcon: Record<string, React.ReactElement> = {
  github: <GitHubIcon sx={{ fontSize: '1.05rem' }} />,
  website: <LanguageIcon sx={{ fontSize: '1.05rem' }} />,
  paper: <DescriptionIcon sx={{ fontSize: '1.05rem' }} />,
  article: <ArticleIcon sx={{ fontSize: '1.05rem' }} />,
  report: <SummarizeIcon sx={{ fontSize: '1.05rem' }} />,
  docker: <DockerIcon />,
  pypi: <PythonIcon />,
  thesis: <MenuBookIcon sx={{ fontSize: '1.05rem' }} />,
  poster: <ImageIcon sx={{ fontSize: '1.05rem' }} />,
  presentation: <SlideshowIcon sx={{ fontSize: '1.05rem' }} />,
  docs: <AutoStoriesIcon sx={{ fontSize: '1.05rem' }} />,
};

// Display labels for the category keys used in content.ts. Any key missing from
// this map falls back to the raw key, so a new category is still filterable.
const CATEGORY_LABELS: Record<string, string> = {
  'human-ai': 'Human–AI',
  agentic: 'Agentic AI',
  genai: 'GenAI',
  nlp: 'NLP & IR',
  cv: 'Computer Vision',
  mcp: 'MCP',
  hpc: 'HPC',
  iot: 'IoT',
};

// A filter chip that returns a single project is not worth its own chip, so the
// tail categories stay reachable through "All" and their co-assigned category.
const MIN_PER_FILTER = 2;

// Every figure sits on the same paper canvas and is contained rather than
// cropped, so a 300x131 SVG and a 1500x670 screenshot read as one system.
const FIGURE_BG = '#FFFDFB';

// Clears the sticky navbar when the pane pins.
const STICKY_TOP = 92;

// Roughly the pane's natural height (430px figure + caption + copy + links), so
// the two columns stay level. Capping here is what makes the section a fixed
// block: it stays this tall at 11 projects or at 40, and the selected row can
// never scroll away from the figure it belongs to.
const LIST_MAX_H = 648;

// Height of the fade drawn over a scrollable edge.
const FADE_H = 28;

/** "Threat Explorer: Agentic Architectures…" → "Threat Explorer" */
function displayTitle(p: Project) {
  return p.shortTitle ?? p.title.split(':')[0].trim();
}

function LinkButtons({ links, onClick }: { links: Project['links']; onClick?: (e: React.MouseEvent) => void }) {
  return (
    <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.5 }}>
      {links.map((link) => (
        <Tooltip key={link.url} title={link.type} arrow>
          <IconButton
            component="a"
            href={link.url}
            target="_blank"
            rel="noopener"
            size="small"
            onClick={onClick}
            sx={{
              border: '1px solid',
              borderColor: 'rgba(0,0,0,0.08)',
              '&:hover': { bgcolor: '#17181C', color: 'white', borderColor: '#17181C' },
              transition: 'all 0.2s',
            }}
          >
            {linkIcon[link.type] || <LanguageIcon sx={{ fontSize: '1.05rem' }} />}
          </IconButton>
        </Tooltip>
      ))}
    </Stack>
  );
}

function TagList({ tags, dense = false }: { tags: string[]; dense?: boolean }) {
  return (
    <Stack direction="row" sx={{ flexWrap: 'wrap', gap: dense ? 0.4 : 0.5 }}>
      {tags.map((tag) => (
        <Chip
          key={tag}
          label={tag}
          size="small"
          sx={{
            height: dense ? 20 : 21,
            bgcolor: 'rgba(232, 89, 12, 0.08)',
            color: 'primary.dark',
            '& .MuiChip-label': {
              px: dense ? 0.8 : 0.9,
              fontSize: dense ? '0.68rem' : '0.7rem',
            },
          }}
        />
      ))}
    </Stack>
  );
}

function Figure({ project, maxHeight }: { project: Project; maxHeight: object | number }) {
  return (
    <Box
      sx={{
        borderRadius: '10px',
        border: '1px solid rgba(0,0,0,0.07)',
        bgcolor: FIGURE_BG,
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        // Keyed by src so swapping projects remounts the img and the fade replays.
        key={project.image}
        src={project.image}
        alt={`${displayTitle(project)} figure`}
        loading="lazy"
        sx={{
          display: 'block',
          width: '100%',
          maxHeight,
          objectFit: 'contain',
          p: { xs: 1, md: 1.5 },
          boxSizing: 'border-box',
          animation: 'figureIn 0.28s ease-out',
          '@keyframes figureIn': {
            from: { opacity: 0, transform: 'translateY(4px)' },
            to: { opacity: 1, transform: 'none' },
          },
        }}
      />
    </Box>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  // Desktop: which project the sticky figure pane is showing.
  const [activeTitle, setActiveTitle] = useState(projects[0].title);
  // Mobile: which row is expanded (no pane to put the figure in).
  const [openTitle, setOpenTitle] = useState<string | null>(null);

  // Edge fades are only drawn where there is actually more list to reach, so a
  // fully-scrolled or short (filtered) list has no misleading gradient.
  const listRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ top: false, bottom: false });

  const syncEdges = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    // clientHeight is 0 and scroll is unclamped while the column is display:none
    // at mobile widths, which would light up both fades.
    if (el.clientHeight === 0) {
      setEdges({ top: false, bottom: false });
      return;
    }
    const max = el.scrollHeight - el.clientHeight;
    setEdges({ top: el.scrollTop > 2, bottom: max > 2 && el.scrollTop < max - 2 });
  }, []);

  // Layout effect so the fade is correct on first paint rather than one frame late.
  useLayoutEffect(syncEdges, [syncEdges, filter]);

  useEffect(() => {
    window.addEventListener('resize', syncEdges);
    return () => window.removeEventListener('resize', syncEdges);
  }, [syncEdges]);

  // Derived from the data so the chips can never drift out of sync with content.ts.
  const filters = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects) {
      for (const c of p.category) counts.set(c, (counts.get(c) ?? 0) + 1);
    }
    const derived = [...counts.entries()]
      .filter(([, n]) => n >= MIN_PER_FILTER)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([id, count]) => ({ id, label: CATEGORY_LABELS[id] ?? id, count }));
    return [{ id: 'all', label: 'All', count: projects.length }, ...derived];
  }, []);

  const visible = projects.filter(
    (p) => filter === 'all' || p.category.includes(filter)
  );

  // Falling back to the first visible row means a filter change can never leave
  // the pane showing a project that is no longer in the list.
  const active = visible.find((p) => p.title === activeTitle) ?? visible[0];

  return (
    <Box id="projects" sx={{ py: { xs: 4.5, md: 6 } }}>
      <Container maxWidth="lg">
        <SectionHeader index="06" label="Archive" title="Past projects" />

        <Box sx={{ mb: 2.5 }}>
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={(_, v) => { if (v) { setFilter(v); setOpenTitle(null); } }}
            size="small"
            sx={{
              flexWrap: 'wrap',
              gap: 0.75,
              '& .MuiToggleButton-root': {
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: '999px !important',
                px: 1.75,
                py: 0.45,
                fontSize: '0.8rem',
                fontWeight: 500,
                textTransform: 'none',
                ml: '0 !important',
                '&.Mui-selected': {
                  bgcolor: '#17181C',
                  color: 'white',
                  borderColor: '#17181C',
                  '&:hover': { bgcolor: '#2C2D33' },
                },
              },
            }}
          >
            {filters.map((f) => (
              <ToggleButton key={f.id} value={f.id}>
                {f.label}
                <Box
                  component="span"
                  className="mono"
                  sx={{ ml: 0.75, fontSize: '0.7rem', opacity: 0.55 }}
                >
                  {f.count}
                </Box>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 0, md: 5 }}
          // stretch, not flex-start: a short filtered list (Computer Vision is
          // only 2 rows) would otherwise leave the index floating in a void
          // next to a much taller pane. Stretching lets the divider below run
          // the full height so the empty space reads as a panel, not a bug.
          alignItems="stretch"
        >
          {/* Index column */}
          <Box
            sx={{
              position: 'relative',
              width: { xs: '100%', md: '43%' },
              flexShrink: 0,
              borderRight: { xs: 'none', md: '1px solid rgba(0,0,0,0.07)' },
              pr: { xs: 0, md: 2.5 },
            }}
            // Deliberately not .reveal: that class starts at opacity 0 and
            // depends on App's one-shot IntersectionObserver, which only
            // observes nodes present at mount. Any remount would leave the
            // whole archive permanently invisible.
          >
            <Box
              ref={listRef}
              onScroll={syncEdges}
              sx={{
                borderTop: '1px solid',
                borderColor: 'rgba(0,0,0,0.07)',
                // Uncapped on mobile: the accordion expands inline there and
                // must not be trapped inside a scroller.
                maxHeight: { xs: 'none', md: LIST_MAX_H },
                overflowY: { xs: 'visible', md: 'auto' },
                scrollbarGutter: 'stable',
                '&::-webkit-scrollbar': { width: 6 },
                '&::-webkit-scrollbar-thumb': {
                  bgcolor: 'rgba(0,0,0,0.16)',
                  borderRadius: 3,
                },
                '&::-webkit-scrollbar-thumb:hover': { bgcolor: 'rgba(0,0,0,0.28)' },
                '&::-webkit-scrollbar-track': { bgcolor: 'transparent' },
              }}
            >
            {visible.map((project) => {
              const open = openTitle === project.title;
              const isActive = active?.title === project.title;
              return (
                <Box
                  key={project.title}
                  onMouseEnter={() => setActiveTitle(project.title)}
                  onFocus={() => setActiveTitle(project.title)}
                  onClick={() => {
                    setActiveTitle(project.title);
                    setOpenTitle(open ? null : project.title);
                  }}
                  tabIndex={0}
                  sx={{
                    position: 'relative',
                    py: 1.5,
                    pl: 1.5,
                    pr: 1,
                    cursor: 'pointer',
                    borderBottom: '1px solid',
                    borderColor: 'rgba(0,0,0,0.07)',
                    transition: 'background-color 0.18s',
                    outline: 'none',
                    // The accent bar only reads as "selected" where a pane exists.
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '2px',
                      bgcolor: 'primary.main',
                      opacity: { xs: 0, md: isActive ? 1 : 0 },
                      transition: 'opacity 0.18s',
                    },
                    bgcolor: { xs: 'transparent', md: isActive ? 'rgba(232,89,12,0.04)' : 'transparent' },
                    '&:hover': { bgcolor: 'rgba(232,89,12,0.05)' },
                    '&:focus-visible': { bgcolor: 'rgba(232,89,12,0.05)' },
                  }}
                >
                  <Stack direction="row" alignItems="flex-start" spacing={1}>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: isActive ? 'primary.dark' : '#17181C',
                          lineHeight: 1.35,
                          transition: 'color 0.18s',
                        }}
                      >
                        {displayTitle(project)}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: 'var(--ink-soft)', mt: 0.3, lineHeight: 1.45, fontSize: '0.855rem' }}
                      >
                        {project.tagline}
                      </Typography>
                      {/* Tags stay on every row at every width: they are the
                          fastest way to scan the archive for a topic, which
                          matters more than keeping rows to two lines. */}
                      <Box sx={{ mt: 0.75 }}>
                        <TagList tags={project.tags} dense />
                      </Box>
                    </Box>

                    {/* Chevron is the mobile accordion affordance only. */}
                    <KeyboardArrowDownIcon
                      sx={{
                        display: { xs: 'block', md: 'none' },
                        fontSize: '1.2rem',
                        flexShrink: 0,
                        color: 'var(--ink-soft)',
                        transform: open ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s',
                      }}
                    />
                  </Stack>

                  {/* Mobile-only inline detail. On md+ the pane owns this. */}
                  <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                    <Collapse in={open} unmountOnExit>
                      <Box sx={{ mt: 1.5 }}>
                        <Figure project={project} maxHeight={260} />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ lineHeight: 1.7, mt: 1.5 }}
                        >
                          {project.description}
                        </Typography>
                        {project.links.length > 0 && (
                          <Box sx={{ mt: 1.5 }}>
                            <LinkButtons links={project.links} onClick={(e) => e.stopPropagation()} />
                          </Box>
                        )}
                      </Box>
                    </Collapse>
                  </Box>
                </Box>
              );
            })}
            </Box>

            {/* Edge fades: shown only when there is more list in that direction,
                and never on mobile where the column is not a scroller. */}
            {(['top', 'bottom'] as const).map((edge) => (
              <Box
                key={edge}
                aria-hidden
                sx={{
                  display: { xs: 'none', md: 'block' },
                  position: 'absolute',
                  left: 0,
                  right: (theme) => theme.spacing(2.5),
                  [edge]: 0,
                  height: FADE_H,
                  pointerEvents: 'none',
                  opacity: edges[edge] ? 1 : 0,
                  transition: 'opacity 0.2s',
                  background: `linear-gradient(to ${edge === 'top' ? 'bottom' : 'top'}, #FAF9F7, rgba(250,249,247,0))`,
                }}
              />
            ))}
          </Box>

          {/* Sticky figure pane — one large slot serving all 11 rows. */}
          {active && (
            <Box sx={{ display: { xs: 'none', md: 'block' }, flex: 1, minWidth: 0 }}>
              <Box sx={{ position: 'sticky', top: STICKY_TOP }}>
                <Figure project={active} maxHeight={430} />
                <Typography
                  className="mono"
                  sx={{
                    mt: 1.75,
                    fontSize: '0.68rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-soft)',
                  }}
                >
                  {displayTitle(active)}
                </Typography>
                {/* No tags here: the selected row already shows them, right
                    alongside. Repeating them would just be noise. */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.7, mt: 0.85 }}
                >
                  {active.description}
                </Typography>
                {active.links.length > 0 && (
                  <Box sx={{ mt: 1.75 }}>
                    <LinkButtons links={active.links} />
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
