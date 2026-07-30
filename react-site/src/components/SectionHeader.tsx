import { Box, Typography, Stack } from '@mui/material';

interface Props {
  index: string;        // e.g. "02"
  label: string;        // mono eyebrow, e.g. "WORK"
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ index, label, title, subtitle }: Props) {
  return (
    <Box sx={{ mb: { xs: 3, md: 3.5 } }}>
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
        <Typography className="mono" sx={{ fontSize: '0.72rem', fontWeight: 600, color: '#E8590C', letterSpacing: '0.08em' }}>
          [{index}]
        </Typography>
        <Typography className="mono" sx={{ fontSize: '0.72rem', fontWeight: 500, color: 'var(--ink-soft)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
          {label}
        </Typography>
        <Box sx={{ flex: 1, height: '1px', bgcolor: '#DBD8CF' }} />
      </Stack>
      <Typography variant="h3" sx={{ color: '#17181C', fontSize: { xs: '1.9rem', md: '2.4rem' } }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" sx={{ color: 'var(--ink-soft)', mt: 1, maxWidth: 620 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
