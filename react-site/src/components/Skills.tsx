import { Box, Container, Typography, Chip, Stack, Grid } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import WebIcon from '@mui/icons-material/Web';
import DnsIcon from '@mui/icons-material/Dns';
import StorageIcon from '@mui/icons-material/Storage';
import BarChartIcon from '@mui/icons-material/BarChart';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloudIcon from '@mui/icons-material/Cloud';
import { skills } from '../data/content';

const categoryIcons: Record<string, React.ReactNode> = {
  'Programming Languages': <CodeIcon sx={{ fontSize: 18 }} />,
  'Frontend': <WebIcon sx={{ fontSize: 18 }} />,
  'Backend & APIs': <DnsIcon sx={{ fontSize: 18 }} />,
  'Databases': <StorageIcon sx={{ fontSize: 18 }} />,
  'Data Science & ML': <BarChartIcon sx={{ fontSize: 18 }} />,
  'Deep Learning': <PsychologyIcon sx={{ fontSize: 18 }} />,
  'AI Frameworks': <SmartToyIcon sx={{ fontSize: 18 }} />,
  'DevOps': <CloudIcon sx={{ fontSize: 18 }} />,
};

export default function Skills() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#f5f3ef' }}>
      <Container maxWidth="lg">
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
              <Box
                sx={{
                  height: '100%',
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'rgba(0,0,0,0.06)',
                  borderRadius: 4,
                  p: 2.5,
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  '&:hover': {
                    borderColor: 'primary.light',
                    boxShadow: '0 8px 32px rgba(212, 133, 31, 0.08)',
                  },
                }}
              >
                <Stack spacing={1.5}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Box sx={{ color: 'primary.main', display: 'flex' }}>
                      {categoryIcons[category]}
                    </Box>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      sx={{
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        fontSize: '0.73rem',
                        color: 'text.secondary',
                      }}
                    >
                      {category}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
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
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
