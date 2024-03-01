import { Divider, Drawer, IconButton, List, ListItemButton, ListItemText } from '@mui/material'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import {Link } from 'react-router-dom';

const NavbarDrawer = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} >
        <List sx={{width:'40vw'}}>
            <Link to='/' style={{textDecoration:'none', color:'gray'}}>
          <ListItemButton>
            <ListItemText>Dashboard</ListItemText>
            </ListItemButton>
            </Link>
            <Divider variant='fullWidth'></Divider>
            <Link to='/projects' style={{textDecoration:'none', color:'gray'}}>
            <ListItemButton>
            <ListItemText>Projects</ListItemText>
            </ListItemButton>
            </Link>
            <Divider variant='fullWidth'></Divider>
            <Link to='/reports' style={{textDecoration:'none', color:'gray'}}>
            <ListItemButton>
            <ListItemText>Reports</ListItemText>
            </ListItemButton>
            </Link>
            <Divider variant='fullWidth'></Divider>
            <Link to='/chat' style={{textDecoration:'none', color:'gray'}}>
            <ListItemButton>   
            <ListItemText>Chat</ListItemText>
            </ListItemButton>
            </Link>
            <Divider variant='fullWidth'></Divider>
            <Link to='/subscription' style={{textDecoration:'none', color:'gray'}}>
            <ListItemButton>
            <ListItemText>Subscription</ListItemText>
            </ListItemButton>
            </Link>
            <Divider variant='fullWidth'></Divider>
            <Link to='/settings' style={{textDecoration:'none', color:'gray'}}>
            <ListItemButton>
            <ListItemText>Settings</ListItemText>
          </ListItemButton>
          </Link>
          <Divider variant='fullWidth'></Divider>
        </List>
      </Drawer>
      <IconButton onClick={()=> setOpenMenu(!openMenu)}>
      <MenuIcon></MenuIcon>
      </IconButton>
    </>
  )
}

export default NavbarDrawer
