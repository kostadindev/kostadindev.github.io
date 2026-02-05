import { Box, Container, Typography, Card, CardContent, Chip, Stack, Button } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import { publications } from '../data/content';

export default function Publications() {
  return (
    <Box id="publications" sx={{ py: 12, bgcolor: 'action.hover' }}>
      <Container maxWidth="md">
        <Typography variant="h3" gutterBottom textAlign="center" sx={{ mb: 6 }}>
          Publications
        </Typography>

        <Stack spacing={3}>
          {publications.map((pub) => (
            <Card
              key={pub.title}
              elevation={0}
              sx={{
                bgcolor: 'background.paper',
                border: 1,
                borderColor: 'divider',
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  {pub.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{ bgcolor: 'primary.main', color: 'white' }}
                    />
                  ))}
                </Stack>

                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  {pub.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>
                  {pub.description}
                </Typography>

                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                  {pub.authors}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 3 }}>
                  {pub.journal} ({pub.year})
                </Typography>

                <Button
                  variant="outlined"
                  startIcon={<ArticleIcon />}
                  href={pub.doi}
                  target="_blank"
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
