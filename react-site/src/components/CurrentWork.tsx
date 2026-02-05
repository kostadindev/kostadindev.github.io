import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { currentWork } from '../data/content';

const CopyableCommand = ({ command }: { command: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#1a1a2e',
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'grey.800',
      }}
    >
      <Box
        sx={{
          flex: 1,
          px: 2,
          py: 1.5,
          fontFamily: '"Fira Code", "Consolas", monospace',
          fontSize: '0.85rem',
          color: '#e2e8f0',
          overflow: 'auto',
        }}
      >
        <Box component="span" sx={{ color: '#a5b4fc', mr: 1 }}>$</Box>
        {command}
      </Box>
      <Tooltip title={copied ? 'Copied!' : 'Copy'}>
        <IconButton
          onClick={handleCopy}
          size="small"
          sx={{
            mr: 1,
            color: copied ? '#4ade80' : 'grey.500',
            '&:hover': { color: copied ? '#4ade80' : 'grey.300' },
          }}
        >
          {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

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
          Current Work
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
              <Box
                sx={{
                  width: { xs: '100%', md: '55%' },
                  height: { xs: 320, md: 480 },
                  bgcolor: '#f5f5f4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <Box
                  component="img"
                  src={project.image}
                  alt={project.title}
                  sx={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Box>
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
                  <Stack spacing={1.5}>
                    {project.commands.map((cmd) => (
                      <CopyableCommand key={cmd} command={cmd} />
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
