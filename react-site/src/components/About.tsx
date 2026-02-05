import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { personalInfo } from '../data/content';

const stats = [
  { label: 'University', value: 'Cambridge' },
  { label: 'Focus', value: 'Human-AI' },
  { label: 'Experience', value: 'Stellar Cyber' },
  { label: 'Projects', value: '10+' },
];

export default function About() {
  return (
    <Box id="about" sx={{ py: 12 }}>
      <Container maxWidth="md">
        <Typography variant="h3" gutterBottom textAlign="center" sx={{ mb: 6 }}>
          About <Box component="span" sx={{ color: 'primary.main' }}>Me</Box>
        </Typography>

        <Box sx={{ mb: 6 }}>
          {personalInfo.bio.map((paragraph, index) => (
            <Typography
              key={index}
              variant="body1"
              color="text.secondary"
              sx={{ mb: 3, lineHeight: 1.8 }}
            >
              {paragraph}
            </Typography>
          ))}
        </Box>

        <Grid container spacing={2}>
          {stats.map((stat) => (
            <Grid size={{ xs: 6, md: 3 }} key={stat.label}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  bgcolor: 'action.hover',
                  borderRadius: 3,
                }}
              >
                <Typography variant="h5" color="primary" fontWeight={700}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
