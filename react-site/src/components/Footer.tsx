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
      sx={{
        py: 6,
        borderTop: '1px solid',
        borderColor: 'rgba(0,0,0,0.06)',
        bgcolor: '#faf9f7',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
        >
          <Box textAlign={{ xs: 'center', md: 'left' }}>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                fontFamily: '"DM Serif Display", Georgia, serif',
                fontWeight: 400,
                fontSize: '1.2rem',
              }}
            >
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
                  color: 'text.secondary',
                  border: '1px solid',
                  borderColor: 'rgba(0,0,0,0.08)',
                  width: 36,
                  height: 36,
                  '&:hover': { bgcolor: '#1a1a1a', color: 'white', borderColor: '#1a1a1a' },
                  transition: 'all 0.2s',
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
            <Link
              href={`mailto:${personalInfo.email}`}
              variant="caption"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 500,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              {personalInfo.email}
            </Link>
          </Box>
        </Stack>

        <Box textAlign="center" sx={{ mt: 4 }}>
          <IconButton
            href="#"
            size="small"
            sx={{
              color: 'text.secondary',
              border: '1px solid',
              borderColor: 'rgba(0,0,0,0.08)',
              width: 32,
              height: 32,
              '&:hover': { color: 'primary.main', borderColor: 'primary.light' },
              transition: 'all 0.2s',
            }}
          >
            <KeyboardArrowUpIcon fontSize="small" />
          </IconButton>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
            Back to top
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
