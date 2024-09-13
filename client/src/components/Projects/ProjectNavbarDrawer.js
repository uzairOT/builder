import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const ProjectNavbarDrawer = ({ navLinks, userRole }) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <Drawer
        anchor="right"
        PaperProps={{
          style: {
            top: "100px",
            height: "calc(100% - 100px)",
            borderTopLeftRadius: "16px",
          },
        }}
        open={openMenu}
        onClose={() => setOpenMenu(false)}
      >
        <List sx={{ width: "40vw" }}>
          {navLinks.map((navlink) => {
            if (
              navlink.disabled || // Disable item if it should be disabled
              (userRole?.userRole === "client" &&
                (navlink.title === "Notes" ||
                  navlink.title === "Project Report"))
            ) {
              return (
                <Tooltip
                  title="You can't access this while the initial phases are not approved"
                  key={navlink.title}
                >
                  <ListItem>
                    <ListItemText
                      primary={navlink.title}
                      style={{ color: "#A0A0A0", cursor: "not-allowed" }}
                    />
                  </ListItem>
                </Tooltip>
              );
            } else {
              return (
                <Link
                  to={`${navlink.path}`}
                  style={{ textDecoration: "none", color: "#4C8AB1" }}
                  key={navlink.title}
                >
                  <ListItemButton onClick={() => setOpenMenu(false)}>
                    <ListItemText>{navlink.title}</ListItemText>
                  </ListItemButton>
                </Link>
              );
            }
          })}
        </List>
      </Drawer>

      <IconButton onClick={() => setOpenMenu(!openMenu)}>
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default ProjectNavbarDrawer;
