import { Box, Container, Typography, Card, CardContent, Avatar, Stack, Link, Grid } from '@mui/material';
import { education, certificates } from '../data/content';

export default function Education() {
  return (
    <Box id="education" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ mb: 1, fontSize: { xs: '1.8rem', md: '2.4rem' } }}
        >
          Education
        </Typography>
        <Box
          sx={{
            width: 40,
            height: 3,
            bgcolor: 'primary.main',
            mx: 'auto',
            mb: 6,
            borderRadius: 2,
          }}
        />

        <Stack spacing={3} sx={{ mb: 8 }} className="reveal-stagger">
          {education.map((edu) => (
            <Card
              key={edu.institution}
              elevation={0}
              sx={{
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'rgba(0,0,0,0.06)',
                '&:hover': {
                  borderColor: 'primary.light',
                  boxShadow: '0 8px 32px rgba(212, 133, 31, 0.08)',
                },
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                <Stack direction="row" spacing={3} alignItems="center">
                  <Avatar
                    src={edu.logo}
                    alt={edu.institution}
                    variant="rounded"
                    sx={{
                      width: { xs: 100, md: 160 },
                      height: { xs: 100, md: 160 },
                      bgcolor: 'white',
                      p: 2,
                      borderRadius: 3,
                    }}
                    imgProps={{ style: { objectFit: 'contain' } }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight={600} sx={{ fontSize: { xs: '1rem', md: '1.15rem' } }}>
                      {edu.institution}
                    </Typography>
                    <Typography variant="body2" color="primary.dark" fontWeight={500} sx={{ mb: 0.5 }}>
                      {edu.degree}
                    </Typography>
                    {edu.details.map((detail) => (
                      <Typography key={detail} variant="caption" color="text.secondary" display="block" sx={{ lineHeight: 1.6 }}>
                        {detail}
                      </Typography>
                    ))}
                    {(edu.link || edu.transcript) && (
                      <Link
                        href={edu.link || edu.transcript}
                        target="_blank"
                        rel="noopener"
                        variant="caption"
                        sx={{
                          mt: 1,
                          display: 'inline-block',
                          fontWeight: 500,
                          color: 'primary.main',
                          textDecoration: 'none',
                          '&:hover': { textDecoration: 'underline' },
                        }}
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

        <Typography variant="h5" textAlign="center" sx={{ mb: 4, fontFamily: '"DM Serif Display", Georgia, serif', fontWeight: 400 }}>
          Certifications
        </Typography>

        <Grid container spacing={2} justifyContent="center" className="reveal-stagger">
          {certificates.map((cert) => (
            <Grid key={cert.title}>
              <Link href={cert.link} target="_blank" rel="noopener">
                <Avatar
                  src={cert.image}
                  alt={cert.title}
                  variant="rounded"
                  sx={{
                    width: 130,
                    height: 130,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'rgba(0,0,0,0.06)',
                    p: 2,
                    borderRadius: 3,
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                      borderColor: 'primary.light',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 32px rgba(212, 133, 31, 0.1)',
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
                  width: 130,
                  height: 130,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px dashed',
                  borderColor: 'primary.main',
                  borderRadius: 3,
                  color: 'primary.main',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  '&:hover': { bgcolor: 'primary.main', color: 'white' },
                }}
              >
                <Typography variant="h6">+</Typography>
                <Typography variant="caption" fontWeight={500}>View All</Typography>
              </Box>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
