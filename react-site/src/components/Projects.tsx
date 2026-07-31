import { useMemo, useState } from 'react';
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
import { projects } from '../data/content';
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

/** "Threat Explorer: Agentic Architectures…" → "Threat Explorer" */
function displayTitle(p: (typeof projects)[number]) {
  return p.shortTitle ?? p.title.split(':')[0].trim();
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [openTitle, setOpenTitle] = useState<string | null>(null);

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

  return (
    <Box id="projects" sx={{ py: { xs: 4.5, md: 6 } }}>
      <Container maxWidth="md">
        <SectionHeader index="06" label="Archive" title="Past projects" />

        <Box sx={{ mb: 1 }}>
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
          className="reveal-stagger"
          divider={<Box sx={{ borderBottom: '1px solid', borderColor: 'rgba(0,0,0,0.07)' }} />}
          sx={{ borderTop: '1px solid', borderColor: 'rgba(0,0,0,0.07)' }}
        >
          {visible.map((project) => {
            const open = openTitle === project.title;
            return (
              <Box
                key={project.title}
                onClick={() => setOpenTitle(open ? null : project.title)}
                sx={{
                  py: 2,
                  px: { xs: 1, md: 1.5 },
                  mx: { xs: -1, md: -1.5 },
                  cursor: 'pointer',
                  transition: 'background-color 0.18s',
                  '&:hover': { bgcolor: 'rgba(232,89,12,0.035)' },
                  '&:hover .project-title': { color: 'primary.dark' },
                }}
              >
                <Stack direction="row" alignItems="flex-start" spacing={2}>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      className="project-title"
                      sx={{
                        fontSize: '1.05rem',
                        fontWeight: 600,
                        color: '#17181C',
                        lineHeight: 1.35,
                        transition: 'color 0.18s',
                      }}
                    >
                      {displayTitle(project)}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'var(--ink-soft)', mt: 0.35, lineHeight: 1.5 }}
                    >
                      {project.tagline}
                    </Typography>
                    <Stack
                      direction="row"
                      sx={{ mt: 0.85, flexWrap: 'wrap', gap: 0.5 }}
                    >
                      {project.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            height: 21,
                            bgcolor: 'rgba(232, 89, 12, 0.08)',
                            color: 'primary.dark',
                            '& .MuiChip-label': { px: 0.9, fontSize: '0.7rem' },
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>

                  <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end', gap: 0.5, maxWidth: 160 }}
                  >
                    {project.links.map((link) => (
                      <Tooltip key={link.url} title={link.type} arrow>
                        <IconButton
                          component="a"
                          href={link.url}
                          target="_blank"
                          rel="noopener"
                          size="small"
                          onClick={(e) => e.stopPropagation()}
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
                    <KeyboardArrowDownIcon
                      sx={{
                        fontSize: '1.2rem',
                        ml: 0.25,
                        color: 'var(--ink-soft)',
                        transform: open ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s',
                      }}
                    />
                  </Stack>
                </Stack>

                <Collapse in={open} unmountOnExit>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.7, mt: 1.5, maxWidth: 660 }}
                  >
                    {project.description}
                  </Typography>
                </Collapse>
              </Box>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
}
