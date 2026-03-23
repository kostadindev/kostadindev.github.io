import { Box, Container, Typography, IconButton, Stack, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import SvgIcon from '@mui/material/SvgIcon';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { personalInfo } from '../data/content';

const iconMap: Record<string, React.ReactNode> = {
  github: <GitHubIcon />,
  linkedin: <LinkedInIcon />,
  code: <CodeIcon />,
  scholar: <SchoolIcon />,
  orcid: (
    <SvgIcon viewBox="0 0 24 24">
      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-1.847-1.238-3.722-3.806-3.722h-2.513z" />
    </SvgIcon>
  ),
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
