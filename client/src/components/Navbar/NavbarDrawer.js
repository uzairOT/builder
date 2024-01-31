import { Drawer, IconButton, List, ListItemButton, ListItemText } from '@mui/material'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';

const NavbarDrawer = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)}>
        <List>
          <ListItemButton>
            <ListItemText>Dashboard</ListItemText>
            </ListItemButton>
            <ListItemButton>
            <ListItemText>Projects</ListItemText>
            </ListItemButton>
            <ListItemButton>
            <ListItemText>Reports</ListItemText>
            </ListItemButton>
            <ListItemButton>   
            <ListItemText>Chat</ListItemText>
            </ListItemButton>
            <ListItemButton>
            <ListItemText>Subscription</ListItemText>
            </ListItemButton>
            <ListItemButton>
            <ListItemText>Settings</ListItemText>
          </ListItemButton>
        </List>
      </Drawer>
      <IconButton onClick={()=> setOpenMenu(!openMenu)}>
      <MenuIcon></MenuIcon>
      </IconButton>
    </>
  )
}

export default NavbarDrawer
