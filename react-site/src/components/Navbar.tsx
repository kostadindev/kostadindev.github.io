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
          bgcolor: trigger ? 'rgba(250, 249, 247, 0.85)' : 'transparent',
          backdropFilter: trigger ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: trigger ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, md: 4 } }}>
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                href={item.href}
                sx={{
                  color: 'text.primary',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  px: 2,
                  borderRadius: 2,
                  '&:hover': { color: 'primary.main', bgcolor: 'rgba(212, 133, 31, 0.06)' },
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
                bgcolor: '#1a1a1a',
                color: '#fff',
                borderRadius: 2,
                px: 2.5,
                py: 0.8,
                fontSize: '0.85rem',
                '&:hover': { bgcolor: '#333' },
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
                sx={{ bgcolor: '#1a1a1a', '&:hover': { bgcolor: '#333' } }}
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
