import { Box, Container, Typography, Card, CardContent, Stack, Chip, Grid, Avatar } from '@mui/material';
import { experience, teaching } from '../data/content';

export default function Experience() {
  return (
    <Box id="experience" sx={{ py: 12, bgcolor: 'action.hover' }}>
      <Container maxWidth="md">
        {/* Work Experience */}
        <Typography variant="h3" gutterBottom textAlign="center" sx={{ mb: 4 }}>
          Work Experience
        </Typography>

        <Stack spacing={3} sx={{ mb: 8 }}>
          {experience.map((job) => (
            <Card
              key={`${job.company}-${job.title}`}
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
                <Stack direction="row" spacing={3}>
                  <Avatar
                    src={job.logo}
                    alt={job.company}
                    variant="rounded"
                    sx={{
                      width: 120,
                      height: 120,
                      bgcolor: 'white',
                      p: 2,
                      display: { xs: 'none', sm: 'flex' }
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
                        <Typography variant="h6" fontWeight={600}>
                          {job.title}
                        </Typography>
                        <Typography variant="body2" color="primary" fontWeight={500}>
                          {job.company}
                        </Typography>
                      </Box>
                      <Stack direction="row" spacing={1} sx={{ mt: { xs: 1, sm: 0 } }}>
                        <Chip label={job.location} size="small" sx={{ bgcolor: 'rgba(232, 154, 60, 0.10)', color: '#b37326' }} />
                        <Chip label={job.period} size="small" sx={{ bgcolor: 'rgba(232, 154, 60, 0.10)', color: '#b37326' }} />
                      </Stack>
                    </Stack>
                    <Box component="ul" sx={{ m: 0, pl: 2 }}>
                      {job.highlights.map((highlight, idx) => (
                        <Typography
                          component="li"
                          key={idx}
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 0.5 }}
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

        {/* Teaching Experience */}
        <Typography variant="h4" gutterBottom textAlign="center" sx={{ mb: 4 }}>
          Teaching Experience
        </Typography>

        <Grid container spacing={2}>
          {teaching.map((role) => (
            <Grid size={{ xs: 12, sm: 6 }} key={`${role.institution}-${role.title}`}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  bgcolor: 'background.paper',
                  border: 1,
                  borderColor: 'divider',
                  transition: 'border-color 0.3s',
                  '&:hover': { borderColor: 'primary.main' },
                }}
              >
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {role.title}
                  </Typography>
                  <Typography variant="body2" color="primary" fontWeight={500}>
                    {role.institution}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                    {role.location} | {role.period}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {role.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
