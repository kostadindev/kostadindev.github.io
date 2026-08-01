import { Box, Container, Grid, Paper, Link, Avatar, Stack, Typography } from '@mui/material';

const stats = [
  {
    label: 'University',
    value: 'Cambridge',
    logo: './images/cambridge-logo.png',
    link: 'https://www.cam.ac.uk/',
  },
  {
    label: 'Department',
    value: 'CHIA',
    logo: './images/chia-cover.png',
    link: 'https://www.chia.cam.ac.uk/',
  },
  {
    label: 'Lab',
    value: 'Trustworthy AI Lab',
    logo: './images/trace-cover.png',
    link: 'https://trace-lab.ai/',
  },
  {
    label: 'Experience',
    value: 'Stellar Cyber',
    link: 'https://stellarcyber.ai/',
    logo: './images/stellar-cyber-logo.png',
  },
];

export default function About() {
  return (
    <Box id="about" sx={{ py: { xs: 4.5, md: 6 } }}>
      <Container maxWidth="lg">
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
                      boxShadow: '0 16px 40px rgba(232, 89, 12, 0.1)',
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
