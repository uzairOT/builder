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
  MenuItem,
  ClickAwayListener,
} from "@mui/material";
import i18n from "i18next";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { Buildericn } from "../assets/svg";
import { useNavigate } from "react-router-dom";
import TranslateIcon from "@mui/icons-material/Translate";
import { useTranslation } from "react-i18next";
import { setLanguage } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
const Navbar = () => {
  const {t} = useTranslation()
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch()
  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };
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
  const userParsedInfo = JSON.parse(userInfo);
  // Define the function separately
  const handleNavigateToDashboard = () => {
    // console.log("navigate", userInfo);
    if (userParsedInfo?.user?.hasValidSubscription) {
      window.location.href ="/dashboard"
    } else {
      navigate("/subscription");
    }
  };
  const drawer = (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      sx={{ textAlign: "center", justifyContent: "center", width:'60vw' }}
    >
      <List>
        {[
          { text: t("landingPage.navbar.home"), path: "/" },
          { text: t("landingPage.navbar.about"), path: "/#about" },
          { text: t("landingPage.navbar.features"), path: "/#features" },
          { text: t("landingPage.navbar.contact"), path: "/#contact" },
          { text: t("landingPage.navbar.faqs"), path: "/#faqs" },
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
              onClick={handleNavigateToDashboard}
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
  const handleClickAway = () => {
    setDropdownOpen(false);
  };
  return (
    <AppBar
      position="static"
      color="transparent"
      component={'nav'}
      elevation={0}
      sx={{ backgroundColor: "transparent", padding: "10px 0px" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Box
          component={'header'}
          sx={{
            display: "flex",
            alignItems: "center",
            ml: { xl: 12, lg: 6, sm: 8, xs: 0 },
          }}
        >
          <Buildericn />
        </Box>

        {/* Desktop Menu */}
        <Box
          component={'ul'}
          sx={{
            display: { xs: "none", lg: "flex" },
            alignItems: "center",
            gap: 10,
            listStyle: "none",
          }}
        >
          <li>
          <Typography
            variant="body1"
            component="a"
            href="/"
            sx={styles.navItemFont}
            >
            {t("landingPage.navbar.home")}
          </Typography>
          </li>
          <li>
          <Typography
            variant="body1"
            component="a"
            href="/#about"
            sx={styles.navItemFont}
          >
           {t("landingPage.navbar.about")}
          </Typography>
          </li>
          <li>
          <Typography
            variant="body1"
            component="a"
            href="/#features"
            sx={styles.navItemFont}
            >
            {t("landingPage.navbar.features")}
          </Typography>
          </li>
          <li>
          <Typography
            variant="body1"
            component="a"
            href="/#contact"
            sx={styles.navItemFont}
            >
            {t("landingPage.navbar.contact")}
          </Typography>
          </li>
          <li>
          <Typography
            variant="body1"
            component="a"
            href="/#faqs"
            sx={styles.navItemFont}
          >
            {t("landingPage.navbar.faqs")}
          </Typography>
          </li>
          <ClickAwayListener onClickAway={handleClickAway}>
          <Typography
            variant="body1"
            component="div"
            sx={{
              ...styles.navItemFont,
              position: "relative",
              display: "inline-block",
              alignItems: "center",
              cursor: "pointer",
              "&:hover": {
                color: "primary.main", // Adds hover effect for the dropdown toggle
              },
            }}
            onClick={handleDropdownToggle}
          >
            <IconButton><TranslateIcon /></IconButton>
            
            {dropdownOpen && (
              <Box
                sx={{
                  position: "absolute",
                  backgroundColor: "white",
                  boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
                  zIndex: 1,
                  mt: 1,
                  borderRadius: "8px", // Adds rounded corners
                  overflow: "hidden", // Ensures content stays within rounded edges
                  animation: "fadeIn 0.3s ease-out", // Smooth animation on dropdown open
                  "@keyframes fadeIn": {
                    from: { opacity: 0, transform: "translateY(-10px)" },
                    to: { opacity: 1, transform: "translateY(0)" },
                  },
                }}
              >
                <MenuItem
                  onClick={() => {
                    dispatch(setLanguage("en"))
                  }}
                  sx={{
                    padding: "10px 20px",
                    fontSize: "14px",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.1)", // Adds hover effect for menu items
                    },
                  }}
                >
                  English
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(setLanguage("fr"))
                  }}
                  sx={{
                    padding: "10px 20px",
                    fontSize: "14px",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  French
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(setLanguage("es"))
                  }}
                  sx={{
                    padding: "10px 20px",
                    fontSize: "14px",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  Spanish
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(setLanguage("zh"))
                  }}
                  sx={{
                    padding: "10px 20px",
                    fontSize: "14px",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  Mandarin
                </MenuItem>
                <MenuItem
                  onClick={() => i18n.changeLanguage("de")}
                  sx={{
                    padding: "10px 20px",
                    fontSize: "14px",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  German
                </MenuItem>
              </Box>
            )}
          </Typography>
          </ClickAwayListener>
        </Box>
          
        <Box
          component={'section'}
          sx={{
            display: { xs: "none", lg: "flex" },
            alignItems: "center",
            gap: 2,
            mr: { xl: 12, lg: 6, sm: 8, xs: 0 },
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
            <Button sx={styles.navLoginBtn} onClick={handleNavigateToDashboard}>
              Dashboard
            </Button>
          )}
        </Box>

        {/* Mobile Menu */}
        <Box  component={'aside'} sx={{ display: { xs: "flex", lg: "none" }, alignItems: "center" }}>
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
