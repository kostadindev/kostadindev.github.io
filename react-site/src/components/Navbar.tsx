import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useScrollTrigger,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { navItems, personalInfo } from '../data/content';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 50 });

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: trigger ? 'rgba(255, 253, 251, 0.82)' : 'transparent',
          backdropFilter: trigger ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: trigger ? '1px solid #DBD8CF' : '1px solid transparent',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, md: 4 } }}>
          {/* wordmark */}
          <Box
            component="a"
            href="#about"
            sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none' }}
          >
            <Box sx={{ width: 11, height: 11, borderRadius: '50%', bgcolor: '#E8590C' }} />
            <Box
              className="mono"
              sx={{ fontSize: '1.18rem', fontWeight: 600, letterSpacing: '0.01em', color: '#17181C' }}
            >
              kostadin<Box component="span" sx={{ color: '#9A998F' }}>.dev</Box>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.25 }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                href={item.href}
                sx={{
                  color: 'text.primary',
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  px: 1.75,
                  borderRadius: 2,
                  '&:hover': { color: 'primary.main', bgcolor: 'rgba(232, 89, 12, 0.06)' },
                }}
              >
                {item.name}
              </Button>
            ))}
            <Button
              href={personalInfo.cvUrl}
              target="_blank"
              sx={{
                ml: 1.5,
                bgcolor: '#E8590C',
                color: '#fff',
                borderRadius: 2,
                px: 2.5,
                py: 0.8,
                fontSize: '0.82rem',
                '&:hover': { bgcolor: '#C4470A' },
              }}
            >
              Resume
            </Button>
          </Box>

          <IconButton
            sx={{ display: { md: 'none' } }}
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: { borderRadius: '16px 0 0 16px' },
        }}
      >
        <Box sx={{ width: 260, pt: 3, px: 1 }}>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  sx={{ borderRadius: 2, mb: 0.5 }}
                >
                  <ListItemText primary={item.name} primaryTypographyProps={{ fontWeight: 500 }} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem sx={{ mt: 1 }}>
              <Button
                variant="contained"
                fullWidth
                href={personalInfo.cvUrl}
                target="_blank"
                sx={{ bgcolor: '#17181C', '&:hover': { bgcolor: '#2C2D33' } }}
              >
                Resume
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Toolbar />
    </>
  );
}
