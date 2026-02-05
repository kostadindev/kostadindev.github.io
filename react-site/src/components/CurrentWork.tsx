import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  IconButton,
  Paper,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import { currentWork } from '../data/content';

const iconMap: Record<string, React.ReactNode> = {
  github: <GitHubIcon fontSize="small" />,
  website: <LanguageIcon fontSize="small" />,
  docker: <Box sx={{ fontSize: 14, fontWeight: 700 }}>D</Box>,
  pypi: <Box sx={{ fontSize: 14, fontWeight: 700 }}>Py</Box>,
};

export default function CurrentWork() {
  return (
    <Box id="work" sx={{ py: 12, bgcolor: 'action.hover' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom textAlign="center" sx={{ mb: 6 }}>
          Current <Box component="span" sx={{ color: 'primary.main' }}>Work</Box>
        </Typography>

        <Stack spacing={6}>
          {currentWork.map((project, index) => (
            <Card
              key={project.title}
              elevation={0}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: index % 2 === 0 ? 'row' : 'row-reverse' },
                bgcolor: 'background.paper',
                overflow: 'hidden',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 8,
                },
              }}
            >
              <CardMedia
                component="img"
                image={project.image}
                alt={project.title}
                sx={{
                  width: { xs: '100%', md: '55%' },
                  height: { xs: 320, md: 480 },
                  objectFit: 'cover',
                }}
              />
              <CardContent sx={{ flex: 1, p: { xs: 3, md: 5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                  <Typography variant="h4" fontWeight={600}>
                    {project.title}
                  </Typography>
                  <Stack direction="row" spacing={0.5}>
                    {project.links.map((link) => (
                      <IconButton
                        key={link.type}
                        href={link.url}
                        target="_blank"
                        size="small"
                        sx={{
                          bgcolor: 'action.hover',
                          '&:hover': { bgcolor: 'primary.main', color: 'white' },
                        }}
                      >
                        {iconMap[link.type]}
                      </IconButton>
                    ))}
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={1} sx={{ mb: 3 }} flexWrap="wrap" useFlexGap>
                  {project.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Stack>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
                  {project.description}
                </Typography>

                {project.commands && (
                  <Stack spacing={1}>
                    {project.commands.map((cmd) => (
                      <Paper
                        key={cmd}
                        elevation={0}
                        sx={{
                          px: 2,
                          py: 1,
                          bgcolor: 'grey.900',
                          fontFamily: 'monospace',
                          fontSize: '0.9rem',
                          color: '#4ade80',
                          borderRadius: 2,
                        }}
                      >
                        $ {cmd}
                      </Paper>
                    ))}
                  </Stack>
                )}
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
