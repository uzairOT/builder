import { Divider, Drawer, IconButton, List, ListItemButton, ListItemText } from '@mui/material'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';

const NavbarDrawer = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} >
        <List sx={{width:'40vw'}}>
          <ListItemButton>
            <ListItemText>Dashboard</ListItemText>
            </ListItemButton>
            <Divider variant='fullWidth'></Divider>
            <ListItemButton>
            <ListItemText>Projects</ListItemText>
            </ListItemButton>
            <Divider variant='fullWidth'></Divider>
            <ListItemButton>
            <ListItemText>Reports</ListItemText>
            </ListItemButton>
            <Divider variant='fullWidth'></Divider>
            <ListItemButton>   
            <ListItemText>Chat</ListItemText>
            </ListItemButton>
            <Divider variant='fullWidth'></Divider>
            <ListItemButton>
            <ListItemText>Subscription</ListItemText>
            </ListItemButton>
            <Divider variant='fullWidth'></Divider>
            <ListItemButton>
            <ListItemText>Settings</ListItemText>
          </ListItemButton>
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
