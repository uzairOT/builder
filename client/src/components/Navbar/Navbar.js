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
  FormControl,
  Input,
  InputLabel,
  Select,
  MenuItem,
  Button,
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
import LinkIcon from '@mui/icons-material/Link';

const Navbar = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [open, setOpen] = useState(null);
  const [userType, setUserType] = useState('');
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
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

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
            <Tab label="Dashboard" to={'/dashboard'} style={themeStyle.getTabColor(0)} />
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
              borderRadius: '15px'
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
            Invite
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ p: 2, color: "#535353", fontSize: "19px" }} />
          </IconButton>
        </Stack>
        <Divider variant="fullWidth" />
        <Stack direction={"row"} pl={4} pr={4} pt={2} pb={2} spacing={3}>
          <Stack direction={'row'} border={'2px solid #FFAC00'} borderRadius={'30px'} pl={2}>
            <Input
              placeholder="Enter an Email to invite"
              aria-describedby="my-helper-text"
              sx={{
                "&::after": {
                  borderBottom: "none",
                },
                "&:before": {
                  borderBottom: "none",
                },
                "&.MuiInput-root:hover:not(.Mui-disabled, Mui-error):before": {
                  borderBottom: "none",
                },
              }}
            />
          <FormControl style={{marginLeft:'5px', width:'120px'}} size="small">
          <InputLabel id="demo-simple-select-label" style={{fontSize: '12px', top:'3px', fontFamily:'GT-Walsheim-Regular-Trial, sans-serif', color: '#202227'}} sx={{
            "&.Mui-focused":{
              transform: "translate(14px, -1px) scale(0.75)",
            }
          }}>Select Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userType}
            label="Age"
            onChange={handleUserTypeChange}
            placeholder="Select Role"
            sx={{
              '.css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
                border: 'none'
              }
            }}
            >
            <MenuItem value={'user'}>User</MenuItem>
            <MenuItem value={'admin'}>Admin</MenuItem>
            <MenuItem value={'super admin'}>Super admin</MenuItem>
          </Select>
          </FormControl>
            </Stack>
          <BuilderProButton backgroundColor={"#FFAC00"} variant={"contained"}>
            <Typography>Invite</Typography>
          </BuilderProButton>
        </Stack>

        {users.map((user, index) => (
          <Stack p={0.5} pl={2.5} pr={2.5}>
            <Stack
              id={user.img}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              pb={1}
            >
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                pl={2}
              >
                <img
                  src={user.img}
                  alt="User Profile Pic"
                  width={"32px"}
                  height={"32px"}
                  style={{ borderRadius: "50px",}}
                ></img>
                <Typography color={"#202227"} fontSize={"14px"} pl={2} fontFamily={'GT-Walsheim-Regular-Trial, sans-serif'}>
                  {user.name}
                </Typography>
              </Stack>
              <Typography fontFamily={'GT-Walsheim-Regular-Trial, sans-serif'} fontSize={'14px'}>{user.userType}</Typography>
            </Stack>
            {users.length - 1 === index ? <></> : <Divider />}
          </Stack>
        ))}
        <Divider />
        <Stack direction={'row'} p={2} pl={3}>
          <BuilderProButton Icon={LinkIcon} iconProps={{transform:'rotate(135deg)'}} variant={'text'}>Copy Link</BuilderProButton>
        </Stack>
      </Popover>
    </>
  );
};

export default Navbar;
