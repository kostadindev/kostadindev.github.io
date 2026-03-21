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
    <Box id="news" sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="md">
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ mb: 1, fontSize: { xs: '1.8rem', md: '2.4rem' } }}
        >
          News
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

        <Stack spacing={0} className="reveal-stagger">
          {news.map((item, index) => (
            <Stack
              key={item.title}
              direction="row"
              spacing={2.5}
              alignItems="baseline"
              sx={{
                py: 2,
                px: 2.5,
                borderRadius: 2,
                borderLeft: '2px solid',
                borderColor: index === 0 ? 'primary.main' : 'transparent',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'rgba(212, 133, 31, 0.03)',
                  borderColor: 'primary.light',
                },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: 'primary.dark',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  minWidth: 75,
                  fontSize: '0.78rem',
                  letterSpacing: '0.03em',
                }}
              >
                {item.date}
              </Typography>
              <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.7 }}>
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
