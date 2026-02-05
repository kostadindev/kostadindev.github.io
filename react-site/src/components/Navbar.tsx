import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
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
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { navItems, personalInfo } from '../data/content';

interface NavbarProps {
  mode: 'light' | 'dark';
  toggleColorMode: () => void;
}

export default function Navbar({ mode, toggleColorMode }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 50 });

  return (
    <>
      <AppBar
        position="fixed"
        elevation={trigger ? 2 : 0}
        sx={{
          bgcolor: trigger ? 'background.paper' : 'transparent',
          backdropFilter: trigger ? 'blur(20px)' : 'none',
          transition: 'all 0.3s',
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, md: 4 } }}>
          <Typography
            variant="h6"
            component="a"
            href="#"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none',
            }}
          >
            {personalInfo.name.split(' ')[0]}
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                href={item.href}
                sx={{ color: 'text.primary', '&:hover': { color: 'primary.main' } }}
              >
                {item.name}
              </Button>
            ))}
            <Button
              variant="contained"
              href={personalInfo.cvUrl}
              target="_blank"
              sx={{ ml: 1 }}
            >
              Resume
            </Button>
            <IconButton onClick={toggleColorMode} sx={{ ml: 1 }}>
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
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
      >
        <Box sx={{ width: 250, pt: 2 }}>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem>
              <Button variant="contained" fullWidth href={personalInfo.cvUrl} target="_blank">
                Resume
              </Button>
            </ListItem>
            <ListItem>
              <IconButton onClick={toggleColorMode}>
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Toolbar />
    </>
  );
}
