import { useState } from 'react';
import { Box, Container, Typography, Stack, Link, Pagination } from '@mui/material';
import { news } from '../data/content';

const PAGE_SIZE = 5;

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
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(news.length / PAGE_SIZE);
  const paginatedNews = news.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <Box id="news" sx={{ py: { xs: 5, md: 6 } }}>
      <Container maxWidth="lg">
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
            mb: 3,
            borderRadius: 2,
          }}
        />

        <Stack spacing={0} divider={<Box sx={{ borderBottom: '1px solid', borderColor: 'rgba(0,0,0,0.05)' }} />} className="reveal">
          {paginatedNews.map((item) => (
            <Stack
              key={item.title}
              direction="row"
              spacing={2}
              alignItems="baseline"
              sx={{ py: 1.5 }}
            >
              <Stack sx={{ minWidth: 110, flexShrink: 0 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'primary.dark',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    fontSize: '0.75rem',
                  }}
                >
                  {item.date}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    whiteSpace: 'nowrap',
                    fontSize: '0.7rem',
                  }}
                >
                  {item.location}
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener"
                  sx={{
                    color: 'text.primary',
                    textDecoration: 'none',
                    fontWeight: 600,
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  {item.title}
                </Link>
                {' — '}
                {renderDescription(item.description)}
              </Typography>
            </Stack>
          ))}
        </Stack>

        {pageCount > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="standard"
              sx={{
                '& .Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' },
                },
              }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}
