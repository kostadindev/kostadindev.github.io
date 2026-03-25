import { Box, Container, Typography, Card, CardContent, Stack, Chip, Grid, Avatar, Link } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { experience, teaching } from '../data/content';

export default function Experience() {
  return (
    <Box id="experience" sx={{ py: { xs: 6, md: 8 }, bgcolor: '#f5f3ef' }}>
      <Container maxWidth="md">
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ mb: 1, fontSize: { xs: '1.8rem', md: '2.4rem' } }}
        >
          Work Experience
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

        <Stack spacing={3} sx={{ mb: 6 }} className="reveal-stagger">
          {experience.map((job) => (
            <Card
              key={`${job.company}-${job.title}`}
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
                <Stack direction="row" spacing={3}>
                  <Avatar
                    src={job.logo}
                    alt={job.company}
                    variant="rounded"
                    sx={{
                      width: 160,
                      height: 160,
                      bgcolor: 'white',
                      p: 2,
                      borderRadius: 3,
                      display: { xs: 'none', sm: 'flex' },
                    }}
                    imgProps={{ style: { objectFit: 'contain' } }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      justifyContent="space-between"
                      alignItems={{ xs: 'flex-start', sm: 'center' }}
                      sx={{ mb: 2 }}
                    >
                      <Box>
                        <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1rem' }}>
                          {job.title}
                        </Typography>
                        <Typography variant="body2" color="primary.dark" fontWeight={500}>
                          {job.company}
                        </Typography>
                      </Box>
                      <Stack direction="row" spacing={1} sx={{ mt: { xs: 1, sm: 0 } }}>
                        <Chip
                          label={job.location}
                          size="small"
                          sx={{ bgcolor: 'rgba(212, 133, 31, 0.08)', color: 'primary.dark' }}
                        />
                        <Chip
                          label={job.period}
                          size="small"
                          sx={{ bgcolor: 'rgba(212, 133, 31, 0.08)', color: 'primary.dark' }}
                        />
                      </Stack>
                    </Stack>
                    <Box component="ul" sx={{ m: 0, pl: 2 }}>
                      {job.highlights.map((highlight, idx) => (
                        <Typography
                          component="li"
                          key={idx}
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 0.5, lineHeight: 1.7 }}
                        >
                          {highlight}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

        <Typography
          variant="h4"
          textAlign="center"
          sx={{ mb: 1, fontSize: { xs: '1.5rem', md: '1.8rem' } }}
        >
          Teaching Experience
        </Typography>
        <Box
          sx={{
            width: 30,
            height: 3,
            bgcolor: 'primary.main',
            mx: 'auto',
            mb: 4,
            borderRadius: 2,
          }}
        />

        <Grid container spacing={2} className="reveal-stagger">
          {teaching.map((role) => (
            <Grid size={{ xs: 12, sm: 6 }} key={`${role.institution}-${role.title}`}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'rgba(0,0,0,0.06)',
                  '&:hover': {
                    borderColor: 'primary.light',
                    boxShadow: '0 8px 32px rgba(212, 133, 31, 0.08)',
                  },
                }}
              >
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {role.title}
                  </Typography>
                  <Typography variant="body2" color="primary.dark" fontWeight={500}>
                    {role.institution}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                    {role.location} | {role.period}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {role.description}
                  </Typography>
                  {'link' in role && role.link && (
                    <Link
                      href={role.link}
                      target="_blank"
                      rel="noopener"
                      variant="body2"
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.5,
                        mt: 1,
                        color: 'primary.main',
                        textDecoration: 'none',
                        fontWeight: 500,
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      Learn more <OpenInNewIcon sx={{ fontSize: 14 }} />
                    </Link>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
