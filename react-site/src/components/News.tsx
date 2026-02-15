import { Box, Container, Typography, Stack, Link } from '@mui/material';
import { news } from '../data/content';

function renderDescription(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (match) {
      return (
        <Link
          key={i}
          href={match[2]}
          target="_blank"
          rel="noopener"
          sx={{
            color: 'primary.main',
            textDecoration: 'none',
            fontWeight: 600,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          {match[1]}
        </Link>
      );
    }
    return part;
  });
}

export default function News() {
  return (
    <Box id="news" sx={{ py: 8, bgcolor: '#fafaf8' }}>
      <Container maxWidth="md">
        <Typography variant="h3" gutterBottom textAlign="center" sx={{ mb: 3 }}>
          News
        </Typography>

        <Stack spacing={1.5}>
          {news.map((item) => (
            <Stack
              key={item.title}
              direction="row"
              spacing={2}
              alignItems="baseline"
              sx={{
                py: 1.5,
                px: 2,
                borderRadius: 2,
                '&:hover': { bgcolor: 'rgba(232, 154, 60, 0.04)' },
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: '#b37326', fontWeight: 600, whiteSpace: 'nowrap', minWidth: 70 }}
              >
                {item.date}
              </Typography>
              <Typography variant="body2" color="text.primary">
                <strong>{item.title}</strong>
                {' — '}
                {renderDescription(item.description)}
                {' '}
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener"
                  sx={{
                    color: 'primary.main',
                    textDecoration: 'none',
                    fontWeight: 500,
                    '&:hover': { textDecoration: 'underline' },
                    whiteSpace: 'nowrap',
                  }}
                >
                  Learn more ↗
                </Link>
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
