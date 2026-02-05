import { Box, Container, Typography, Card, CardContent, Avatar, Stack, Link, Grid } from '@mui/material';
import { education, certificates } from '../data/content';

export default function Education() {
  return (
    <Box id="education" sx={{ py: 12 }}>
      <Container maxWidth="md">
        <Typography variant="h3" gutterBottom textAlign="center" sx={{ mb: 6 }}>
          Education
        </Typography>

        <Stack spacing={3} sx={{ mb: 8 }}>
          {education.map((edu) => (
            <Card
              key={edu.institution}
              elevation={0}
              sx={{
                bgcolor: 'background.paper',
                border: 1,
                borderColor: 'divider',
                transition: 'border-color 0.3s',
                '&:hover': { borderColor: 'primary.main' },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={3} alignItems="center">
                  <Avatar
                    src={edu.logo}
                    alt={edu.institution}
                    variant="rounded"
                    sx={{ width: 180, height: 180, bgcolor: 'white', p: 3 }}
                    imgProps={{ style: { objectFit: 'contain' } }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight={600}>
                      {edu.institution}
                    </Typography>
                    <Typography variant="body2" color="primary" fontWeight={500}>
                      {edu.degree}
                    </Typography>
                    {edu.details.map((detail) => (
                      <Typography key={detail} variant="caption" color="text.secondary" display="block">
                        {detail}
                      </Typography>
                    ))}
                    {(edu.link || edu.transcript) && (
                      <Link
                        href={edu.link || edu.transcript}
                        target="_blank"
                        rel="noopener"
                        variant="caption"
                        sx={{ mt: 1, display: 'inline-block' }}
                      >
                        {edu.link ? 'Learn More →' : 'View Transcript →'}
                      </Link>
                    )}
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

        <Typography variant="h5" gutterBottom textAlign="center" sx={{ mb: 4 }}>
          Certifications
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {certificates.map((cert) => (
            <Grid key={cert.title}>
              <Link href={cert.link} target="_blank" rel="noopener">
                <Avatar
                  src={cert.image}
                  alt={cert.title}
                  variant="rounded"
                  sx={{
                    width: 140,
                    height: 140,
                    bgcolor: 'background.paper',
                    border: 1,
                    borderColor: 'divider',
                    p: 2,
                    transition: 'all 0.3s',
                    '&:hover': {
                      borderColor: 'primary.main',
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                  }}
                  imgProps={{ style: { objectFit: 'contain' } }}
                />
              </Link>
            </Grid>
          ))}
          <Grid>
            <Link
              href="https://www.credly.com/users/kostadin-devedzhiev.e059b079"
              target="_blank"
              rel="noopener"
              underline="none"
            >
              <Box
                sx={{
                  width: 140,
                  height: 140,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 2,
                  borderStyle: 'dashed',
                  borderColor: 'primary.main',
                  borderRadius: 2,
                  color: 'primary.main',
                  transition: 'all 0.3s',
                  '&:hover': { bgcolor: 'primary.main', color: 'white' },
                }}
              >
                <Typography variant="h6">+</Typography>
                <Typography variant="caption">View All</Typography>
              </Box>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
