import { Box, Container, Typography, IconButton, Stack, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CodeIcon from '@mui/icons-material/Code';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { personalInfo } from '../data/content';

const iconMap: Record<string, React.ReactNode> = {
  github: <GitHubIcon />,
  linkedin: <LinkedInIcon />,
  code: <CodeIcon />,
  spotify: <Box component="span" sx={{ fontSize: 20 }}>♪</Box>,
};

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ py: 6, borderTop: 1, borderColor: 'divider' }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
        >
          <Box textAlign={{ xs: 'center', md: 'left' }}>
            <Typography variant="h6" color="primary" fontWeight={700}>
              {personalInfo.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {personalInfo.tagline}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            {personalInfo.socials.map((social) => (
              <IconButton
                key={social.name}
                href={social.url}
                target="_blank"
                size="small"
                sx={{
                  bgcolor: 'action.hover',
                  '&:hover': { bgcolor: 'primary.main', color: 'white' },
                }}
              >
                {iconMap[social.icon]}
              </IconButton>
            ))}
          </Stack>

          <Box textAlign={{ xs: 'center', md: 'right' }}>
            <Typography variant="caption" color="text.secondary" display="block">
              © {new Date().getFullYear()} {personalInfo.name}
            </Typography>
            <Link href={`mailto:${personalInfo.email}`} variant="caption" color="primary">
              {personalInfo.email}
            </Link>
          </Box>
        </Stack>

        <Box textAlign="center" sx={{ mt: 4 }}>
          <IconButton
            href="#"
            size="small"
            sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
          >
            <KeyboardArrowUpIcon />
          </IconButton>
          <Typography variant="caption" color="text.secondary" display="block">
            Back to top
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
