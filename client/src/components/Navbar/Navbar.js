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
  Badge,
  Popper,
} from "@mui/material";
import { ReactComponent as BuilderProNavbarLogo } from "./assets/svgs/builder-pro-logo-navbar.svg";
// import { ReactComponent as BuilderProNavbarShare } from "./assets/svgs/builder-pro-navbar-share.svg";
import { ReactComponent as BuilderProNavbarLogout } from "./assets/svgs/builder-pro-navbar-logout.svg";
import React, { useEffect, useState } from "react";
import SearchBar from "../UI/SearchBar/SearchBar";
import BuilderProButton from "../UI/Button/BuilderProButton";
import NavbarDrawer from "./NavbarDrawer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import users from "./assets/data/users.json";
import LinkIcon from "@mui/icons-material/Link";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./Notifications";
import {
  addNotifications,
  selectNotifications,
  selectNotificationsArr,
  setNotifications,
  setNotificationsArr,
} from "../../redux/slices/Notifications/notificationSlice";
import {
  useGetNotificationsQuery,
  useGetNotificationsUnreadQuery,
  useUpdateWorkOrderReadMutation,
} from "../../redux/apis/Project/workOrderApiSlice";
import { socket } from "../../socket";
const local = localStorage.getItem("userInfo");
const currentUser = JSON.parse(local);
// const socket = io("http://3.135.107.71", {
//   query: { userId: currentUser?.user?.id },
// });

const Navbar = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [open, setOpen] = useState(null);
  const [userType, setUserType] = useState("");
  const theme = useTheme();
  const showHamburger = useMediaQuery(theme.breakpoints.down("lg"));
  const responsiveButton = useMediaQuery(theme.breakpoints.up("sm"));
  const navigate = useNavigate();
  const openShare = Boolean(open);
  const id = openShare ? "simple-popover" : undefined;
  const user = useSelector((state) => state.auth.userInfo);
  const userId = user.user.id;
  //console.log(user);
  const dispatch = useDispatch();
  // const { emit, on } = useSocket();
  const notifications = useSelector(selectNotifications);
  const notificationsArr = useSelector(selectNotificationsArr);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { data: data1, refetch: refetchNotifcations } =
    useGetNotificationsUnreadQuery(userId);
  const { data, refetch } = useGetNotificationsQuery(userId);
  const [expanded, setExpanded] = useState(null);

  const [updateNotificationRead] = useUpdateWorkOrderReadMutation();
  dispatch(setNotificationsArr(data?.data));
  // console.log("JOHN NOTIFICATION TEST",anchorEl)
  const handleClick = async (event) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
      await updateNotificationRead({ userId });
      await refetchNotifcations(userId);
      dispatch(setNotifications([]));
    }
  };

  const openNotification = Boolean(anchorEl);
  const noti_id = open ? "simple-popper" : undefined;

  const location = useLocation();
  const path = location.pathname.split("/")[1];

  useEffect(() => {
    switch (path) {
      case "":
        setSelectedTab(0);
        break;
      case "projects":
        setSelectedTab(1);
        break;
      case "reports":
        setSelectedTab(2);
        break;
      case "subscription":
        setSelectedTab(4);
        break;
      case "settings":
        setSelectedTab(5);
        break;
      default:
        return;
    }
  }, [path]);
  // useEffect(() => {
  //   const socket = socketIOClient(ENDPOINT);

  //   // Join room with user ID
  //   socket.emit('join', userId);

  //   socket.emit('getNotifications', userId);

  //   socket.on('notifications', (data) => {
  //     console.log("------------->", data);
  //     dispatch(setNotifications(data))
  //   });

  //   socket.on('newNotification', (newNotification) => {
  //     console.log("New Notification:", newNotification);
  //     dispatch(setNotifications(prevNotifications => [...prevNotifications, newNotification]));
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);
  const refetchCall = async () => {
    try {
      await refetch(userId);
    } catch (err) {
      console.log("err:", err);
    }
  };

  useEffect(() => {
    //listen for notifications
    // console.log('=-------------------> notifications on')

    socket.emit("join", userId);
    socket.on("newNotification", async (data) => {
      await refetchCall();
      dispatch(setNotifications(data));
    });
    return () => {
      socket.off("newNotification", async (data) => {
        await refetchCall();
        dispatch(setNotifications(data));
      });
    };
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    console.log(newValue, " navbar click");
    const lowercasedValue = `${event.target.textContent}`.toLowerCase();
    navigate(lowercasedValue === "dashboard" ? "/" : lowercasedValue);
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  // const handleShare = (e) => {
  //   setOpen(e.currentTarget);
  // };
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
      padding: "4px 16px 4px 16px",
      height: "65px",
    },
    logo: {
      width: "110px",
      height: "50px",
      marginLeft: "28px",
      marginBottom: "2px",
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
          <Link to="/">
            <BuilderProNavbarLogo
              aria-label="Builder Pro Logo"
              style={themeStyle.logo}
              onClick={() => {
                setSelectedTab(0);
              }}
            />
          </Link>
          <Tabs
            sx={themeStyle.tabs}
            value={selectedTab}
            // onClick={handleTabChange}
            indicatorColor=""
            centered
          >
            <Tab
              label="Dashboard"
              style={themeStyle.getTabColor(0)}
              onClick={(e) => handleTabChange(e, 0)}
            />
            <Tab
              label="Projects"
              style={themeStyle.getTabColor(1)}
              onClick={(e) => handleTabChange(e, 1)}
            />
            <Tab
              label="Reports"
              style={themeStyle.getTabColor(2)}
              onClick={(e) => handleTabChange(e, 2)}
            />
            <Box sx={themeStyle.search}>
              <SearchBar />
            </Box>
            <Tab
              label="Subscription"
              style={themeStyle.getTabColor(4)}
              onClick={(e) => handleTabChange(e, 4)}
            />
            <Tab
              label="Settings"
              style={themeStyle.getTabColor(5)}
              onClick={(e) => handleTabChange(e, 5)}
            />
          </Tabs>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={1}
          >
            <IconButton aria-label="bell-notifications" onClick={handleClick}>
              <Badge
                badgeContent={
                  notifications?.length === 0
                    ? data1?.count
                    : notifications?.length
                }
                color="error"
              >
                <NotificationsIcon sx={{ color: "#4C8AB1" }} />
              </Badge>
            </IconButton>
            <Popper
              style={{
                zIndex: "100",
                backgroundColor: "white",
                borderRadius: "14px",
              }}
              id={noti_id}
              open={openNotification}
              anchorEl={anchorEl}
              placement="bottom-end"
            >
              {Array.isArray(notificationsArr) ? (
                notificationsArr?.map((notification, index) => {
                  if (index < 6) {
                    return (
                      <Notification
                        key={notification.workOrder_id}
                        notification={notification}
                        refetch={refetch}
                        userId={userId}
                        index={index}
                        setExpanded={setExpanded}
                        expanded={expanded}
                      ></Notification>
                    );
                  } else {
                    return index === 6 ? (
                      <Stack textAlign={"right"}>
                        +{notificationsArr.length - 6} more
                      </Stack>
                    ) : (
                      <> </>
                    );
                  }
                })
              ) : (
                <div
                  style={{
                    backgroundColor: "lightgray",
                    padding: 20,
                    borderRadius: "14px",
                  }}
                >
                  No new notifications available
                </div>
              )}
            </Popper>

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
              borderRadius: "15px",
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
          <Stack
            direction={"row"}
            border={"2px solid #FFAC00"}
            borderRadius={"30px"}
            pl={2}
          >
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
            <FormControl
              style={{ marginLeft: "5px", width: "120px" }}
              size="small"
            >
              <InputLabel
                id="demo-simple-select-label"
                style={{
                  fontSize: "12px",
                  top: "3px",
                  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
                  color: "#202227",
                }}
                sx={{
                  "&.Mui-focused": {
                    transform: "translate(14px, -1px) scale(0.75)",
                  },
                }}
              >
                Select Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userType}
                label="Age"
                onChange={handleUserTypeChange}
                placeholder="Select Role"
                sx={{
                  "& .notchedOutline": {
                    border: "none",
                  },
                }}
              >
                <MenuItem value={"user"}>User</MenuItem>
                <MenuItem value={"admin"}>Admin</MenuItem>
                <MenuItem value={"super admin"}>Super admin</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <BuilderProButton backgroundColor={"#FFAC00"} variant={"contained"}>
            <Typography>Invite</Typography>
          </BuilderProButton>
        </Stack>

        {users.map((user, index) => (
          <Stack key={index} p={0.5} pl={2.5} pr={2.5}>
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
                  style={{ borderRadius: "50px" }}
                ></img>
                <Typography
                  color={"#202227"}
                  fontSize={"14px"}
                  pl={2}
                  fontFamily={"GT-Walsheim-Regular-Trial, sans-serif"}
                >
                  {user.name}
                </Typography>
              </Stack>
              <Typography
                fontFamily={"GT-Walsheim-Regular-Trial, sans-serif"}
                fontSize={"14px"}
              >
                {user.userType}
              </Typography>
            </Stack>
            {users.length - 1 === index ? <></> : <Divider />}
          </Stack>
        ))}
        <Divider />
        <Stack direction={"row"} p={2} pl={3}>
          <BuilderProButton
            Icon={LinkIcon}
            iconProps={{ transform: "rotate(135deg)" }}
            variant={"text"}
          >
            Copy Link
          </BuilderProButton>
        </Stack>
      </Popover>
    </>
  );
};

export default Navbar;
