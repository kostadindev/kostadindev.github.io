import { Box, Container, Typography, Stack, Link, Grid } from '@mui/material';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import HikingIcon from '@mui/icons-material/Hiking';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const hobbies = [
  {
    icon: <SportsTennisIcon />,
    label: 'Racquet Sports',
    text: 'Tennis, squash, and table tennis.',
  },
  {
    icon: <HikingIcon />,
    label: 'Travel & Backpacking',
    text: 'Exploring new countries on foot.',
  },
  {
    icon: <MusicNoteIcon />,
    label: 'Music Festivals',
    text: (
      <>
        Favourite artist:{' '}
        <Link
          href="https://open.spotify.com/album/763xbIwmR5A5EzoVreGlUG"
          target="_blank"
          rel="noopener"
          sx={{ fontWeight: 600, color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          Subtronics
        </Link>
        .
      </>
    ),
  },
];

export default function Hobbies() {
  return (
    <Box sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="md">
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ mb: 1, fontSize: { xs: '1.8rem', md: '2.4rem' } }}
        >
          Beyond Work
        </Typography>
        <Box
          sx={{
            width: 40,
            height: 3,
            bgcolor: 'primary.main',
            mx: 'auto',
            mb: 4,
            borderRadius: 2,
          }}
        />

        <Grid container spacing={3} justifyContent="center" className="reveal-stagger">
          {hobbies.map((hobby) => (
            <Grid size={{ xs: 12, sm: 4 }} key={hobby.label}>
              <Stack spacing={1} alignItems="center" textAlign="center">
                <Box sx={{ color: 'primary.main' }}>{hobby.icon}</Box>
                <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: '0.85rem' }}>
                  {hobby.label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {hobby.text}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
