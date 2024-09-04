import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  capitalize,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { Buildericn } from "../assets/svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const userInfo = localStorage.getItem("userInfo");

  const drawer = (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      sx={{ textAlign: "center", justifyContent: "center" }}
    >
      <List>
        {[
          { text: "About Us", path: "/#about" },
          { text: "Features", path: "/#features" },
          { text: "Contact", path: "/#contact" },
          { text: "FAQs", path: "/#faqs" },
        ].map(({ text, path }) => (
          <ListItem button key={text} component="a" href={path}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        {/* <ListItem button>
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
        </ListItem> */}
        {/* <ListItem button>
          <Button
            variant="outlined"
            sx={{ borderColor: "#2E728E", color: "#2E728E" }}
          >
            Video Demo • See now
          </Button>
        </ListItem> */}
        <ListItem button>
          {!userInfo && (
            <Button
              onClick={() => navigate("/login")}
              fullWidth
              sx={{
                fontFamily: "var(--main-font-family)",
                fontWeight: 500,
                fontSize: "16px",

                borderRadius: 8,
                padding: "10px 16px 10px 16px",
                backgroundColor: "#2E728E",
                "&:hover": {
                  backgroundColor: "grey",
                  color: "white",
                },
                color: "white",
              }}
            >
              Login
            </Button>
          )}
           {userInfo && (
            <Button
              onClick={() => navigate("/dashboard")}
              fullWidth
              sx={{
                fontFamily: "var(--main-font-family)",
                fontWeight: 500,
                fontSize: "16px",

                borderRadius: 8,
                padding: "10px 16px 10px 16px",
                backgroundColor: "#2E728E",
                "&:hover": {
                  backgroundColor: "grey",
                  color: "white",
                },
                color: "white",
              }}
            >
              Dashboard
            </Button>
          )}
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ backgroundColor: "transparent", padding: "10px 0px" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", ml:{sm:5, xs:0} }}>
          <Buildericn />
        </Box>

        {/* Desktop Menu */}
        <Box
          sx={{
            display: { xs: "none", lg: "flex" },
            alignItems: "center",
            gap: 10,
          }}
        >
          <Typography
            variant="body1"
            component="a"
            href="/"
            sx={styles.navItemFont}
          >
            Home
          </Typography>
          <Typography
            variant="body1"
            component="a"
            href="/#about"
            sx={styles.navItemFont}
          >
            About Us
          </Typography>
          <Typography
            variant="body1"
            component="a"
            href="/#features"
            sx={styles.navItemFont}
          >
            Features
          </Typography>
          <Typography
            variant="body1"
            component="a"
            href="/#contact"
            sx={styles.navItemFont}
          >
            Contact
          </Typography>
          <Typography
            variant="body1"
            component="a"
            href="/#faqs"
            sx={styles.navItemFont}
          >
            FAQs
          </Typography>
        </Box>

        <Box
          sx={{
            display: { xs: "none", lg: "flex" },
            alignItems: "center",
            gap: 2,
            mr:{sm:5, xs:0}
          }}
        >
          {/* <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <Button variant="outlined" sx={styles.navBtns}>
            Video Demo • See now
          </Button> */}
          {!userInfo && (
            <Button sx={styles.navLoginBtn} onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
          {userInfo && (
            <Button sx={styles.navLoginBtn} onClick={() => navigate("/dashboard")}>
              Dashboard
            </Button>
          )}
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: "flex", lg: "none" }, alignItems: "center" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
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

const styles = {
  navItemFont: {
    color: "#454245",
    textDecoration: "none",
    fontFamily: "var(--main-font-family)",
    fontWeight: 400,
    fontSize: "16px",
  },

  navBtns: {
    borderColor: "#2E728E",
    color: "#2E728E",
    fontFamily: "var(--main-font-family)",
    fontWeight: 500,
    fontSize: "16px",
  },

  navLoginBtn: {
    backgroundColor: "#2E728E",
    color: "white",
    "&:hover": {
      backgroundColor: "grey",
      color: "white",
    },
    fontFamily: "var(--main-font-family)",
    fontWeight: 500,
    fontSize: "16px",
    height: "44px",
    borderRadius: "8px",
    textTransform: "capitalize",
  },
};
