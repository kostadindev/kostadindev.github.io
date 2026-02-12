import { Box, Container, Typography, Grid, Paper, Link, Avatar, Stack } from '@mui/material';

const stats = [
  {
    label: 'University',
    value: 'Cambridge',
    logo: 'https://www.cam.ac.uk/sites/default/files/secondary-logo-stacked.png',
  },
  {
    label: 'Centre',
    value: 'CHIA',
    logo: 'https://www.chia.cam.ac.uk/wp-content/uploads/2023/08/chia-logo.png',
  },
  {
    label: 'Experience',
    value: 'Stellar Cyber',
    logo: 'data:image/png;base64,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',
  },
];

export default function About() {
  return (
    <Box id="about" sx={{ py: 12 }}>
      <Container maxWidth="md">
        <Typography variant="h3" gutterBottom textAlign="center" sx={{ mb: 6 }}>
          About Me
        </Typography>

        <Box sx={{ mb: 6 }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
            I'm a postgraduate student at the{' '}
            <Link href="https://www.chia.cam.ac.uk/" target="_blank" rel="noopener">
              Centre for Human-Inspired AI (CHIA)
            </Link>
            , University of Cambridge, where I am part of the{' '}
            <Link href="https://www.chia.cam.ac.uk/" target="_blank" rel="noopener">
              TRACE Lab
            </Link>{' '}
            advised by{' '}
            <Link href="https://umangsbhatt.github.io/" target="_blank" rel="noopener">
              Professor Umang Bhatt
            </Link>
            . My research focuses on <strong>human-AI orchestration</strong> — designing
            multi-agent systems where AI agents and humans collaborate under real-world conditions,
            such as varying expertise, costs, and availability. I am building{' '}
            <Link href="https://tailorworkflow.com" target="_blank" rel="noopener">
              Tailor
            </Link>
            , a platform for designing workflows with built-in <strong>human oversight</strong> and{' '}
            <strong>governance controls</strong> for regulated industries.
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
            Previously, I worked as a <strong>Software Engineer</strong> at{' '}
            <Link href="https://stellarcyber.ai" target="_blank" rel="noopener">
              Stellar Cyber
            </Link>{' '}
            in San Jose, California, where I developed AI-driven interfaces for threat hunting{' '}
            <Link
              href="https://stellarcyber.ai/ai-investigator-natural-language-threat-hunting"
              target="_blank"
              rel="noopener"
            >
              [Stellar Cyber]
            </Link>{' '}
            <Link
              href="https://aimresearch.co/generative-ai/stellar-cyber-unveils-genai-driven-open-xdr-investigator"
              target="_blank"
              rel="noopener"
            >
              [AIM Research, 2024]
            </Link>{' '}
            and <strong>human-augmented</strong> autonomous cybersecurity operations powered by{' '}
            <strong>agentic AI</strong>{' '}
            <Link
              href="https://stellarcyber.ai/platform/capabilities-autonomous-soc"
              target="_blank"
              rel="noopener"
            >
              [Stellar Cyber]
            </Link>{' '}
            <Link
              href="https://www.businesswire.com/news/home/20250422895828/en/Stellar-Cyber-Debuts-the-Human-Augmented-Autonomous-SOC-Powered-by-Agentic-AI-at-RSAC-2025"
              target="_blank"
              rel="noopener"
            >
              [Business Wire, 2025]
            </Link>
            .
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
            In my free time, I enjoy being outdoors in nature, going to music festivals, and
            playing racquet sports.
          </Typography>
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {stats.map((stat) => (
            <Grid size={{ xs: 12, sm: 4 }} key={stat.label}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  bgcolor: 'background.paper',
                  borderRadius: 3,
                  border: 1,
                  borderColor: 'divider',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    transform: 'translateY(-4px)',
                    boxShadow: 3,
                  },
                }}
              >
                <Stack spacing={2} alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
                  {stat.logo ? (
                    <Box
                      sx={{
                        width: 120,
                        height: 120,
                        bgcolor: 'grey.50',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 2,
                      }}
                    >
                      <Avatar
                        src={stat.logo}
                        alt={stat.value}
                        variant="square"
                        sx={{
                          width: '100%',
                          height: '100%',
                          bgcolor: 'transparent',
                        }}
                        imgProps={{ style: { objectFit: 'contain' } }}
                      />
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width: 120,
                        height: 120,
                        bgcolor: 'grey.50',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 2,
                      }}
                    >
                      <Typography
                        variant="body1"
                        color="primary"
                        fontWeight={600}
                        textAlign="center"
                        sx={{ lineHeight: 1.4 }}
                      >
                        {stat.value}
                      </Typography>
                    </Box>
                  )}
                  <Typography variant="subtitle2" color="text.secondary" fontWeight={500}>
                    {stat.label}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
