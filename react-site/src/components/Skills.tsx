import { Box, Container, Typography, Card, CardContent, Chip, Stack, Grid } from '@mui/material';
import { skills } from '../data/content';

export default function Skills() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#f5f3ef' }}>
      <Container maxWidth="md">
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ mb: 1, fontSize: { xs: '1.8rem', md: '2.4rem' } }}
        >
          Technical Skills
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

        <Grid container spacing={2} className="reveal-stagger">
          {Object.entries(skills).map(([category, skillList]) => (
            <Grid size={{ xs: 12, sm: 6 }} key={category}>
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
                <CardContent sx={{ p: 2.5 }}>
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    sx={{
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      fontSize: '0.75rem',
                      color: 'text.secondary',
                    }}
                  >
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main' }} />
                    {category}
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {skillList.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(212, 133, 31, 0.06)',
                          color: 'text.primary',
                          fontWeight: 500,
                          transition: 'all 0.2s',
                          '&:hover': {
                            bgcolor: 'rgba(212, 133, 31, 0.15)',
                            transform: 'translateY(-1px)',
                          },
                        }}
                      />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
