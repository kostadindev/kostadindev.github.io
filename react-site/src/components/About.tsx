import { Box, Container, Grid, Paper, Link, Avatar, Stack, Typography } from '@mui/material';

const stats = [
  {
    label: 'University',
    value: 'Cambridge',
    logo: 'https://www.cam.ac.uk/sites/default/files/secondary-logo-stacked.png',
    link: 'https://www.cam.ac.uk/',
  },
  {
    label: 'Department',
    value: 'CHIA',
    logo: '/images/chia-cover.png',
    link: 'https://www.chia.cam.ac.uk/',
  },
  {
    label: 'Lab',
    value: 'Trustworthy AI Lab',
    logo: '/images/trace-cover.jpeg',
    link: 'https://trace-lab.ai/',
  },
  {
    label: 'Experience',
    value: 'Stellar Cyber',
    link: 'https://stellarcyber.ai/',
    logo: 'data:image/png;base64,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',
  },
];

export default function About() {
  return (
    <Box id="about" sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="md">
        <Grid container spacing={2.5} justifyContent="center" className="reveal-stagger">
          {stats.map((stat) => (
            <Grid size={{ xs: 6, sm: 6, md: 3 }} key={stat.label}>
              <Link href={stat.link} target="_blank" rel="noopener" underline="none">
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'rgba(0,0,0,0.06)',
                    height: '100%',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                      borderColor: 'primary.light',
                      transform: 'translateY(-6px)',
                      boxShadow: '0 16px 40px rgba(212, 133, 31, 0.1)',
                    },
                  }}
                >
                  <Stack spacing={2} alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
                    <Box
                      sx={{
                        width: 140,
                        height: 140,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
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
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>
                      {stat.label}
                    </Typography>
                  </Stack>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
