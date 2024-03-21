import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const ProjectNavbarDrawer = ({ navLinks }) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <Drawer  open={openMenu} onClose={() => setOpenMenu(false)}>
        <List sx={{ width: '40vw'}}>
          {navLinks.map((navlink) => {
            return (
              <Link to={`${navlink.path}`} style={{ textDecoration: "none", color: '#4C8AB1' }}>
                <ListItemButton onClick={() => setOpenMenu(false)}>
                  <ListItemText>{navlink.title}</ListItemText>
                </ListItemButton>
              </Link>
            );
          })}
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenMenu(!openMenu)}>
        <MenuIcon></MenuIcon>
      </IconButton>
    </>
  );
};

export default ProjectNavbarDrawer;
