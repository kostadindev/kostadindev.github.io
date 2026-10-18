import { Box, Container, Typography, Stack, Link } from '@mui/material';
import { personalInfo } from '../data/content';

const INK = '#17181C';
const HAIRLINE = '#DBD8CF';

const affiliations = [
  { value: 'University of Cambridge', logo: './images/cambridge-logo.png', link: 'https://www.cam.ac.uk/' },
  { value: "Queens' College", logo: './images/queens-cover.png', link: 'https://www.queens.cam.ac.uk/' },
  { value: 'Centre for Human-Inspired AI', logo: './images/chia-cover.png', link: 'https://www.chia.cam.ac.uk/' },
  { value: 'TRACE Lab', logo: './images/trace-cover.png', link: 'https://trace-lab.ai/' },
  { value: 'Stellar Cyber', logo: './images/stellar-cyber-logo.png', link: 'https://stellarcyber.ai/' },
];

const links = [
  { label: 'Email', href: `mailto:${personalInfo.email}` },
  { label: 'CV', href: personalInfo.cvUrl },
  ...personalInfo.socials
    .filter((s) => ['scholar', 'github', 'linkedin'].includes(s.icon))
    .map((s) => ({ label: s.name, href: s.url })),
];

const textLink = {
  color: INK,
  textDecorationColor: HAIRLINE,
  textUnderlineOffset: '3px',
  '&:hover': { textDecorationColor: INK },
};

export default function Hero() {
  return (
    <Box id="about" component="section" sx={{ bgcolor: 'var(--paper)', pt: { xs: 6, md: 10 }, pb: { xs: 5, md: 7 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr auto' },
            gap: { xs: 4, md: 8 },
            alignItems: 'start',
          }}
        >
          <Box>
            <Typography
              variant="h1"
              sx={{ color: INK, fontSize: { xs: '2.1rem', sm: '2.6rem', md: '3rem' }, lineHeight: 1.1, mb: 1.25 }}
            >
              {personalInfo.name}
            </Typography>

            <Typography sx={{ color: 'var(--ink-soft)', fontSize: '1rem', mb: 3.5 }}>
              PhD student, Centre for Human-Inspired AI, University of Cambridge
            </Typography>

            <Typography variant="body1" sx={{ color: INK, maxWidth: 560, mb: 2, textWrap: 'pretty' }}>
              I study how people and AI agents can work together. My research looks at how to decide
              who should do each task, based on what each person or agent is good at.
            </Typography>

            <Typography variant="body1" sx={{ color: 'var(--ink-soft)', maxWidth: 560, mb: 3.5, textWrap: 'pretty' }}>
              I am part of the{' '}
              <Link href="https://trace-lab.ai/" target="_blank" rel="noopener" sx={textLink}>TRACE Lab</Link>,
              supervised by{' '}
              <Link href="https://umangsbhatt.github.io/" target="_blank" rel="noopener" sx={textLink}>Umang Bhatt</Link>{' '}
              and{' '}
              <Link href="http://mlg.eng.cam.ac.uk/adrian/" target="_blank" rel="noopener" sx={textLink}>Adrian Weller</Link>.
              Before the PhD I was a software engineer at{' '}
              <Link href="https://stellarcyber.ai" target="_blank" rel="noopener" sx={textLink}>Stellar Cyber</Link>,
              working on AI tools for security analysts.
            </Typography>

            <Stack direction="row" spacing={2.5} flexWrap="wrap" useFlexGap>
              {links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener"
                  sx={{ ...textLink, fontSize: '0.95rem', fontWeight: 500 }}
                >
                  {l.label}
                </Link>
              ))}
            </Stack>
          </Box>

          <Box
            component="img"
            src={personalInfo.avatar}
            alt={personalInfo.name}
            sx={{
              width: { xs: 160, md: 240 },
              height: { xs: 160, md: 240 },
              objectFit: 'cover',
              objectPosition: 'top',
              borderRadius: '6px',
              order: { xs: -1, md: 0 },
            }}
          />
        </Box>

        <Stack
          direction="row"
          spacing={{ xs: 3, md: 5 }}
          alignItems="center"
          flexWrap="wrap"
          useFlexGap
          sx={{ mt: { xs: 5, md: 7 }, pt: 3, borderTop: '1px solid', borderColor: HAIRLINE }}
        >
          {affiliations.map((a) => (
            <Link key={a.value} href={a.link} target="_blank" rel="noopener" title={a.value} sx={{ display: 'flex', opacity: 0.55, '&:hover': { opacity: 1 } }}>
              <Box
                component="img"
                src={a.logo}
                alt={a.value}
                sx={{ height: { xs: 26, md: 32 }, width: 'auto', filter: 'grayscale(1)', transition: 'filter 0.2s', 'a:hover > &': { filter: 'none' } }}
              />
            </Link>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
