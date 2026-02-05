import { Box, Container, Typography, Card, CardContent, Chip, Stack, Grid } from '@mui/material';
import { skills } from '../data/content';

export default function Skills() {
  return (
    <Box sx={{ py: 12, bgcolor: 'action.hover' }}>
      <Container maxWidth="md">
        <Typography variant="h3" gutterBottom textAlign="center" sx={{ mb: 6 }}>
          Technical Skills
        </Typography>

        <Grid container spacing={2}>
          {Object.entries(skills).map(([category, skillList]) => (
            <Grid size={{ xs: 12, sm: 6 }} key={category}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  bgcolor: 'background.paper',
                  border: 1,
                  borderColor: 'divider',
                }}
              >
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
                    {category}
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {skillList.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        sx={{
                          bgcolor: 'action.hover',
                          transition: 'all 0.2s',
                          '&:hover': { bgcolor: 'primary.main', color: 'white' },
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
