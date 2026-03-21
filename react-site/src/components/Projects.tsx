import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import DescriptionIcon from '@mui/icons-material/Description';
import ArticleIcon from '@mui/icons-material/Article';
import InventoryIcon from '@mui/icons-material/Inventory';
import { projects } from '../data/content';

const linkIcon: Record<string, React.ReactElement> = {
  github: <GitHubIcon fontSize="small" />,
  website: <LanguageIcon fontSize="small" />,
  paper: <DescriptionIcon fontSize="small" />,
  article: <ArticleIcon fontSize="small" />,
  docker: <InventoryIcon fontSize="small" />,
  pypi: <InventoryIcon fontSize="small" />,
};

const filters = [
  { id: 'all', label: 'All' },
  { id: 'nlp', label: 'NLP' },
  { id: 'cv', label: 'Computer Vision' },
  { id: 'hitl', label: 'Human-in-the-Loop' },
];

export default function Projects() {
  const [filter, setFilter] = useState('all');

  const filtered = projects.filter(
    (p) => filter === 'all' || p.category.includes(filter)
  );

  return (
    <Box id="projects" sx={{ py: 12 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom textAlign="center" sx={{ mb: 4 }}>
          Past Projects
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={(_, v) => v && setFilter(v)}
            size="small"
          >
            {filters.map((f) => (
              <ToggleButton
                key={f.id}
                value={f.id}
                sx={{
                  px: 3,
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.dark' },
                  },
                }}
              >
                {f.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        <Grid container spacing={4}>
          {filtered.map((project) => (
            <Grid size={{ xs: 12, md: 6 }} key={project.title}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  bgcolor: 'background.paper',
                  border: 1,
                  borderColor: 'divider',
                  transition: 'all 0.3s',
                  '&:hover': {
                    borderColor: 'primary.main',
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={project.image}
                  alt={project.title}
                  sx={{ objectFit: 'cover', width: '100%', height: 280 }}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Typography variant="h5" fontWeight={600}>
                      {project.title}
                    </Typography>
                    <Stack direction="row" spacing={0.5}>
                      {project.links.map((link) => (
                        <Tooltip key={link.url} title={link.type} arrow>
                          <IconButton
                            component="a"
                            href={link.url}
                            target="_blank"
                            size="small"
                            color="primary"
                          >
                            {linkIcon[link.type] || <LanguageIcon fontSize="small" />}
                          </IconButton>
                        </Tooltip>
                      ))}
                    </Stack>
                  </Stack>

                  <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap" useFlexGap>
                    {project.tags.slice(0, 3).map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(232, 154, 60, 0.10)',
                          color: '#b37326',
                        }}
                      />
                    ))}
                  </Stack>

                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {project.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
