import { Box, Container, Typography, Card, CardContent, Avatar, Stack, Link, Grid, Button } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { education, certificates } from '../data/content';
import SectionHeader from './SectionHeader';

export default function Education() {
  return (
    <Box id="education" sx={{ py: { xs: 4.5, md: 6 }, bgcolor: '#FFF6F0' }}>
      <Container maxWidth="lg">
        <SectionHeader index="04" label="Training" title="Education" />

        <Stack spacing={3} sx={{ mb: 6 }} className="reveal-stagger">
          {education.map((edu) => (
            <Card
              key={`${edu.institution} · ${edu.degree}`}
              elevation={0}
              sx={{
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'rgba(0,0,0,0.06)',
                '&:hover': {
                  borderColor: 'primary.light',
                  boxShadow: '0 8px 32px rgba(232, 89, 12, 0.08)',
                },
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                {/* flex-start, matching Experience: centring made the logo sit at a
                    different height in every card once the text lengths varied. */}
                <Stack direction="row" spacing={{ xs: 2, md: 3 }} alignItems="flex-start">
                  <Avatar
                    src={edu.logo}
                    alt={edu.institution}
                    variant="rounded"
                    sx={{
                      // Was 160px square, which set a ~210px floor on every card
                      // via CardContent's padding — a 3-line entry came out as
                      // tall as a 5-line one. Landscape rather than square so
                      // wide wordmarks get the width they need: Hawaii is 2.36:1
                      // and rendered 84x36 in a square box, wasting half of it.
                      // Wide AND tall: contain draws a square logo at min(W,H), so
                      // shrinking the height to gain width just penalises the
                      // square marks (most of them). Height holds them at 84px
                      // while the extra width lets Hawaii's 2.36:1 mark breathe.
                      width: { xs: 96, md: 148 },
                      height: { xs: 76, md: 104 },
                      flexShrink: 0,
                      bgcolor: 'transparent',
                      p: 1.25,
                      borderRadius: 2.5,
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

        <Box sx={{ mt: 5 }}>
          <SectionHeader index="04.1" label="Credentials" title="Certifications" />
        </Box>

        {/* Named cards rather than bare 130px logo tiles. Two of the three
            certificates only have a wide company wordmark for artwork, which
            contained into a square tile read as an empty broken box. With the
            title alongside, the logo is a mark instead of the whole message. */}
        <Grid container spacing={2} className="reveal-stagger">
          {certificates.map((cert) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={cert.title}>
              <Link
                href={cert.link}
                target="_blank"
                rel="noopener"
                sx={{ textDecoration: 'none', display: 'block', height: '100%' }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{
                    height: '100%',
                    p: 2,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'rgba(0,0,0,0.06)',
                    borderRadius: 3,
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                      borderColor: 'primary.light',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 32px rgba(232, 89, 12, 0.1)',
                    },
                  }}
                >
                  <Avatar
                    src={cert.image}
                    alt=""
                    variant="rounded"
                    sx={{
                      // Landscape: the two DeepLearning.AI marks are 4.45:1
                      // wordmarks and rendered 40x9 inside a square tile, which
                      // is what made those cards look broken.
                      width: 96,
                      height: 48,
                      flexShrink: 0,
                      bgcolor: 'transparent',
                      p: 0.5,
                      borderRadius: 2,
                    }}
                    imgProps={{ style: { objectFit: 'contain' } }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.primary', fontWeight: 500, lineHeight: 1.45 }}
                  >
                    {cert.title}
                  </Typography>
                </Stack>
              </Link>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Button
            href="https://www.credly.com/users/kostadin-devedzhiev.e059b079"
            target="_blank"
            rel="noopener"
            variant="outlined"
            size="small"
            endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
            sx={{
              color: 'text.secondary',
              borderColor: 'rgba(0,0,0,0.12)',
              fontWeight: 500,
              fontSize: '0.82rem',
              px: 2.5,
              '&:hover': {
                borderColor: 'primary.main',
                color: 'primary.main',
                bgcolor: 'rgba(232, 89, 12, 0.04)',
              },
            }}
          >
            View all on Credly
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
