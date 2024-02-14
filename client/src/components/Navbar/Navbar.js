import {
  AppBar,
  Box,
  Tab,
  Tabs,
  Toolbar,
  useTheme,
  useMediaQuery,
  Typography,
  Popover,
  Stack,
  Divider,
  IconButton,
  Autocomplete,
  TextField,
} from "@mui/material";
import { ReactComponent as BuilderProNavbarLogo } from "./assets/svgs/builder-pro-logo-navbar.svg";
import { ReactComponent as BuilderProNavbarShare } from "./assets/svgs/builder-pro-navbar-share.svg";
import { ReactComponent as BuilderProNavbarLogout } from "./assets/svgs/builder-pro-navbar-logout.svg";
import React, { useState } from "react";
import SearchBar from "../UI/SearchBar/SearchBar";
import BuilderProButton from "../UI/Button/BuilderProButton";
import NavbarDrawer from "./NavbarDrawer";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import users from "./assets/data/users.json";

const Navbar = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [open, setOpen] = useState(null);
  const theme = useTheme();
  const showHamburger = useMediaQuery(theme.breakpoints.down("lg"));
  const responsiveButton = useMediaQuery(theme.breakpoints.up("sm"));
  const navigate = useNavigate();
  const openShare = Boolean(open);
  const id = openShare ? "simple-popover" : undefined;

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const handleShare = (e) => {
    setOpen(e.currentTarget);
  };
  const handleClose = () => {
    setOpen(null);
  };
  const getOptionLabel = (option) => option.name;

  // Navbar styles
  const themeStyle = {
    navbar: {
      background: "#FFF",
      boxShadow: "0px 1px 1.3px 0px rgba(0, 0, 0, 0.05)",
      padding: "16px 16px 16px 16px",
    },
    logo: {
      width: "130px",
      height: "69px",
      marginLeft: "28px",
    },
    tabs: {
      margin: "auto",
      display: { xl: "flex", lg: "flex", md: "none", sm: "none", xs: "none" },
    },
    getTabColor: (tabIndex) => ({
      fontFamily: "inherit",
      color: selectedTab === tabIndex ? "#FFAC00" : "",
      textTransform: "capitalize",
      fontSize: "15px",
    }),
    search: {
      display: { xl: "flex", lg: "none", md: "flex" },
    },
    toolbar: {
      justifyContent: "space-between",
    },
  };

  return (
    <>
      <AppBar position="static" sx={themeStyle.navbar}>
        <Toolbar sx={themeStyle.toolbar}>
          {showHamburger && <NavbarDrawer />}
          <BuilderProNavbarLogo
            aria-label="Builder Pro Logo"
            style={themeStyle.logo}
          />
          <Tabs
            sx={themeStyle.tabs}
            value={selectedTab}
            onChange={handleTabChange}
            indicatorColor=""
            centered
          >
            <Tab label="Dashboard" style={themeStyle.getTabColor(0)} />
            <Tab label="Projects" style={themeStyle.getTabColor(1)} />
            <Tab label="Reports" style={themeStyle.getTabColor(2)} />
            <Tab label="Chat" style={themeStyle.getTabColor(3)} />
            <Box sx={themeStyle.search}>
              <SearchBar />
            </Box>
            <Tab label="Subscription" style={themeStyle.getTabColor(5)} />
            <Tab label="Settings" style={themeStyle.getTabColor(6)} />
          </Tabs>
          <Box display={"flex"}>
            <BuilderProButton
              backgroundColor={"#FFAC00"}
              variant={"contained"}
              Icon={BuilderProNavbarShare}
              handleOnClick={handleShare}
            >
              {responsiveButton ? "Share" : ""}
            </BuilderProButton>
            <BuilderProButton
              backgroundColor={"#4C8AB1"}
              variant={"outlined"}
              Icon={BuilderProNavbarLogout}
              handleOnClick={handleLogout}
            >
              {responsiveButton ? "Logout" : ""}
            </BuilderProButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Popover
        id={id}
        open={openShare}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              marginTop: "30px",
            },
          },
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography sx={{ p: 2 }} color={"#4C8AB1"}>
            Index
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ p: 2, color: "#535353", fontSize: "19px" }} />
          </IconButton>
        </Stack>
        <Divider variant="fullWidth" />
        <Stack direction={'row'} pl={4} pr={4} pt={2} pb={2} spacing={3}>
          <Stack>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={users}
            getOptionLabel={getOptionLabel}
            sx={{ width: 200, borderWidth: 'none' }}
            renderInput={(params) => (
              <TextField {...params} label="Select Role" />
            )}
          />
          </Stack>
          <BuilderProButton
            backgroundColor={"#FFAC00"}
            variant={"contained"}
          >
            <Typography>Invite</Typography>
          </BuilderProButton>
        </Stack>

        {users.map((user, index) => (
          <Stack p={1}>
            <Stack
              id={user.img}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <img
                  src={user.img}
                  alt="User Profile Pic"
                  width={"32px"}
                  height={"32px"}
                  style={{ borderRadius: "50px" }}
                ></img>
                <Typography color={"#202227"} fontSize={"14px"}>
                  {user.name}
                </Typography>
              </Stack>
              <Typography>{user.userType}</Typography>
            </Stack>
            {users.length - 1 === index ? <></> : <Divider />}
          </Stack>
        ))}
        <Divider />
        <Typography>Copy Link</Typography>
      </Popover>
    </>
  );
};

export default Navbar;
