import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Chip,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
} from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { projects } from '../data/content';

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
                <CardActionArea
                  href={project.links[0]?.url || '#'}
                  target="_blank"
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={project.image}
                    alt={project.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                      <Typography variant="h5" fontWeight={600}>
                        {project.title}
                      </Typography>
                      {project.links.length > 0 && <ArrowOutwardIcon fontSize="small" color="primary" />}
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
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
