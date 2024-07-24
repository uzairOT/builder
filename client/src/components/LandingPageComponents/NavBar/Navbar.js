import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { Buildericn } from '../assets/svg';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate=useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawer = (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['About Us', 'Features', 'Contact', 'FAQs'].map((text) => (
          <ListItem button key={text} component="a" href={`#${text.toLowerCase().replace(/\s+/g, '-')}`}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        <ListItem button>
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
        </ListItem>
        <ListItem button>
          <Button variant="outlined" sx={{ borderColor: '#2E728E', color: '#2E728E' }}>
            Video Demo • See now
          </Button>
        </ListItem>
        <ListItem button>
          <Button sx={{ backgroundColor: '#2E728E', color: 'white' }}>
            Login
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ padding: '10px 0px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Buildericn />
        </Box>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 10 }}>
          <Typography variant="body1" component="a" href="#about" sx={{ color: '#000', textDecoration: 'none' }}>
            About Us
          </Typography>
          <Typography variant="body1" component="a" href="#features" sx={{ color: '#000', textDecoration: 'none' }}>
            Features
          </Typography>
          <Typography variant="body1" component="a" href="#contact" sx={{ color: '#000', textDecoration: 'none' }}>
            Contact
          </Typography>
          <Typography variant="body1" component="a" href="#faqs" sx={{ color: '#000', textDecoration: 'none' }}>
            FAQs
          </Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <Button variant="outlined" sx={{ borderColor: '#2E728E', color: '#2E728E' }}>
            Video Demo • See now
          </Button>
          <Button sx={{ backgroundColor: '#2E728E', color: 'white' }} onClick={()=>navigate("/login")}>
            Login
          </Button>
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Box>

        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          {drawer}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
