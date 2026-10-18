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
          bgcolor: 'rgba(255, 253, 251, 0.9)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid',
          borderColor: trigger ? '#DBD8CF' : 'transparent',
          transition: 'border-color 0.2s',
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, md: 4 } }}>
          {/* wordmark */}
          <Box
            component="a"
            href="#about"
            sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none' }}
          >
            <Box
              sx={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '0', color: '#17181C' }}
            >
              Kostadin Devedzhiev
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
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  px: 1.75,
                  borderRadius: 2,
                  '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
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
                color: '#17181C',
                border: '1px solid #DBD8CF',
                borderRadius: 2,
                px: 2,
                py: 0.6,
                fontSize: '0.85rem',
                '&:hover': { borderColor: '#17181C', bgcolor: 'transparent' },
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
