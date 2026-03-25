import { Box, Container, Typography, Card, CardContent, Chip, Stack, Button } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import { publications } from '../data/content';

export default function Publications() {
  return (
    <Box id="publications" sx={{ py: { xs: 6, md: 8 }, bgcolor: '#f5f3ef' }}>
      <Container maxWidth="md">
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ mb: 1, fontSize: { xs: '1.8rem', md: '2.4rem' } }}
        >
          Publications
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

        <Stack spacing={3} className="reveal-stagger">
          {publications.map((pub) => (
            <Card
              key={pub.title}
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
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  {pub.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(212, 133, 31, 0.08)',
                        color: 'primary.dark',
                      }}
                    />
                  ))}
                </Stack>

                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  {pub.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>
                  {pub.description}
                </Typography>

                <Typography variant="caption" color="text.secondary" display="block">
                  {pub.authors}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" fontStyle="italic" sx={{ mb: 1 }}>
                  * All authors contributed equally
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 3 }}>
                  {pub.journal} ({pub.year})
                </Typography>

                <Button
                  variant="outlined"
                  startIcon={<ArticleIcon />}
                  href={pub.doi}
                  target="_blank"
                  sx={{
                    borderColor: 'rgba(0,0,0,0.15)',
                    color: 'text.primary',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'rgba(212, 133, 31, 0.04)',
                    },
                  }}
                >
                  View Publication
                </Button>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
