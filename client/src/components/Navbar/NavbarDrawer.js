import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import i18n from "../../i18n";
import { use } from "react";
import { useTranslation } from "react-i18next";

const NavbarDrawer = ({ languageOptions, setLanguage }) => {
  const {t} = useTranslation();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <Drawer
        PaperProps={{
          style: {
            borderTopRightRadius: "16px",
          },
        }}
        open={openMenu}
        onClose={() => setOpenMenu(false)}
      >
        <List sx={{ width: "40vw" }}>
          <Link
            to="/dashboard"
            style={{ textDecoration: "none", color: "gray" }}
          >
            <ListItemButton onClick={() => setOpenMenu(false)}>
              <ListItemText>{t("Navbar.dashboard")}</ListItemText>
            </ListItemButton>
          </Link>
          <Divider variant="fullWidth"></Divider>
          <Link
            to="/projects"
            style={{ textDecoration: "none", color: "gray" }}
          >
            <ListItemButton onClick={() => setOpenMenu(false)}>
              <ListItemText>{t("Navbar.projects")}</ListItemText>
            </ListItemButton>
          </Link>
          <Divider variant="fullWidth"></Divider>
          <Link to="/reports" style={{ textDecoration: "none", color: "gray" }}>
            <ListItemButton onClick={() => setOpenMenu(false)}>
              <ListItemText>{t("Navbar.reports")}</ListItemText>
            </ListItemButton>
          </Link>
          {/* <Divider variant="fullWidth"></Divider>
          <Link to="/chat" style={{ textDecoration: "none", color: "gray" }}>
            <ListItemButton onClick={() => setOpenMenu(false)}>
              <ListItemText>Chat</ListItemText>
            </ListItemButton>
          </Link> */}
          <Divider variant="fullWidth"></Divider>
          <Link
            to="/subscription"
            style={{ textDecoration: "none", color: "gray" }}
          >
            <ListItemButton onClick={() => setOpenMenu(false)}>
              <ListItemText>{t("Navbar.subscription")}</ListItemText>
            </ListItemButton>
          </Link>
          <Divider variant="fullWidth"></Divider>
          <Link
            to="/settings"
            style={{ textDecoration: "none", color: "gray" }}
          >
            <ListItemButton onClick={() => setOpenMenu(false)}>
              <ListItemText>{t("Navbar.settings")}</ListItemText>
            </ListItemButton>
          </Link>
          <Divider variant="fullWidth"></Divider>
          
          <Select
            value={i18n.language}
            label="Select language"
            onChange={(e) => {
              setLanguage(e.target.value);
              localStorage.setItem("language", e.target.value)
            }}
            displayEmpty
            inputProps={{ "aria-label": "Select language" }}
            sx={{
              color: "#4C8AB1",
              "& .MuiSelect-icon": { color: "#4C8AB1" }, // Styles the dropdown icon
            }}
          >
            {Object.entries(languageOptions).map(([lang, label]) => (
              <MenuItem key={lang} value={lang}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenMenu(!openMenu)}>
        <MenuIcon></MenuIcon>
      </IconButton>
    </>
  );
};

export default NavbarDrawer;
