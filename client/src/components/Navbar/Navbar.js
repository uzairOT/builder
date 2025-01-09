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
  ClickAwayListener,
} from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import { ReactComponent as BuilderProNavbarLogo } from "./assets/svgs/builder-pro-logo-navbar.svg";
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
  addApprovalNotifications,
  addNotifications,
  addTeamNotifications,
  selectNotifications,
  selectNotificationsArr,
  selectTeamNotifications,
  setNotifications,
  setNotificationsArr,
  setTeamNotifications,
} from "../../redux/slices/Notifications/notificationSlice";
import {
  useGetApprovalNotificationsQuery,
  useGetNotificationsQuery,
  useGetNotificationsUnreadQuery,
  useGetTeamStatusNotificationsQuery,
  useUpdateWorkOrderReadMutation,
} from "../../redux/apis/Project/workOrderApiSlice";
import { socket } from "../../socket";
import TeamNotifications from "./TeamNotifications";
import InvoiceNotification from "./InvoiceNotification";
import { toast } from "react-toastify";
import ApprovalNotification from "./ApprovalNoifications";
import i18n from "../../i18n";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);
  const teamNotifications = useSelector(selectTeamNotifications);
  const notificationsArr = useSelector(selectNotificationsArr);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { data: data1, refetch: refetchNotifcations } =
    useGetNotificationsUnreadQuery(userId);
  const { data, refetch } = useGetNotificationsQuery(userId);
  const { data: teamStatusData, refetch: refetchTeamStatusData } =
    useGetTeamStatusNotificationsQuery(userId);
  const [expanded, setExpanded] = useState(null);
  const { data: approvalData, refetch: refetchApprovalNotifications } =
    useGetApprovalNotificationsQuery(userId);
  const [invoiceNotification, setInvoiceNotification] = useState(null);
  const [updateNotificationRead] = useUpdateWorkOrderReadMutation();
  dispatch(setNotificationsArr(data?.data));
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
  const { userInfo } = useSelector((state) => state.auth);
  let IsValidSub = userInfo?.user?.hasValidSubscription;

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
  const refetchCall = async () => {
    try {
      await refetch(userId);
    } catch (err) {
      console.log("err:", err);
    }
  };
  const approvalRefetchCall = async () => {
    try {
      await refetchApprovalNotifications(userId);
      if (Array.isArray(approvalData?.data)) {
        dispatch(addApprovalNotifications(approvalData?.data));
      } else {
        dispatch(addApprovalNotifications([]));
      }
    } catch (err) {
      dispatch(addApprovalNotifications([]));
      console.log("err:", err);
    }
  };

  useEffect(() => {
    socket.emit("join", userId);
    socket.on("newNotification", async (data) => {
      await refetchCall();
      dispatch(addNotifications(data));
    });

    socket.on("receiveNotifications", async (response) => {
      await approvalRefetchCall();
    });
    socket.on("statusDoneNotificationResponse", async (socketReponse) => {
      dispatch(addTeamNotifications(socketReponse));
    });
    socket.on(`invoiceCreated${userId}`, async (socketReponse) => {
      setInvoiceNotification(socketReponse);
    });
    return () => {
      socket.off("newNotification", async (data) => {
        await refetchCall();
        dispatch(addNotifications(data));
      });
      socket.off("statusDoneNotificationResponse", async (socketReponse) => {
        dispatch(addTeamNotifications(socketReponse));
      });
      socket.off(`invoiceCreated${userId}`, async (socketReponse) => {
        setInvoiceNotification(socketReponse);
      });
      socket.off("receiveNotifications");
    };
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    const lowercasedValue = `${event.target.textContent}`.toLowerCase();
    navigate(lowercasedValue === "dashboard" ? "/dashboard" : lowercasedValue);
  };
  const handleLogout = () => {
    localStorage.setItem("logout", Date.now());
    localStorage.clear(); // Clear the local storage after setting the logout item
    navigate("/login");
  };
  const handleClose = () => {
    setOpen(null);
  };

  const handlePopperClose = async () => {
    if (anchorEl) {
      setAnchorEl(null);
    }
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };
  const handleTeamNotificationsRefetch = async () => {
    dispatch(setTeamNotifications([]));
    await refetchTeamStatusData();
  };
  useEffect(() => {
    dispatch(setTeamNotifications(teamStatusData?.data));
  }, [teamStatusData]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "logout") {
        // Handle logout in other tabs
        toast.info("You have been logged out in another tab!");
        navigate("/login"); // Redirect to the login page or  perform other logout handling
      } else if (event.key === "login") {
        // Handle login in other tabs
        window.location.reload();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  // Navbar styles
  const themeStyle = {
    navbar: {
      background: "#FFF",
      boxShadow: "0px 1px 1.3px 0px rgba(0, 0, 0, 0.05)",
      padding: "4px 2px 4px 2px",
      height: "92px",
      fontFamily: "var(--main-font-family)",
    },
    logo: {
      fontFamily: "var(--main-font-family)",
      width: "85%",
      height: "100%",
      marginLeft: "8px",
      marginBottom: "0px",
    },
    tabs: {
      fontFamily: "var(--main-font-family)",
      // margin: "auto",
      display: { xl: "flex", lg: "flex", md: "none", sm: "none", xs: "none" },
    },
    getTabColor: (tabIndex) => ({
      fontFamily: "var(--main-font-family)",
      color: selectedTab === tabIndex ? "#FFAC00" : "#4C8AB1",
      textTransform: "capitalize",
      fontSize: "17px",
      fontWeight: "600",
    }),
    search: {
      display: { xl: "flex", lg: "flex", md: "flex" },
    },
    toolbar: {
      justifyContent: "space-between",
      height: "inherit",
      boxShadow: "0 3px 6px rgba(0, 0, 0, 0.3)",
    },
  };
  const handleClickAway = () => {
    setDropdownOpen(false);
  };
  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <>
      {IsValidSub === true && (
        <>
          <AppBar position="static" sx={themeStyle.navbar}>
            <Toolbar
              sx={themeStyle.toolbar}
              style={{ maxHeight: "64px !important" }}
            >
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
                sx={{
                  ...themeStyle.tabs,
                  "& .MuiTabs-scroller": {
                    overflow: "visible !important",
                    position: "relative !important",
                  },
                }}
                value={selectedTab}
                // onClick={handleTabChange}
                indicatorColor="#FFF"
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
                  <SearchBar selectedTab={selectedTab} />
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
              <ClickAwayListener onClickAway={handleClickAway}>
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    ml: 2,
                    cursor: "pointer",
                  }}
                >
                  <IconButton onClick={handleDropdownToggle}>
                    <TranslateIcon sx={{ color: "#4C8AB1" }} />
                  </IconButton>
                  {dropdownOpen && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "40px", // Adjust for spacing below the icon
                        right: 0,
                        backgroundColor: "white",
                        boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
                        zIndex: 9999, // High z-index to ensure it appears above
                        borderRadius: "8px",
                        overflow: "hidden",
                        animation: "fadeIn 0.3s ease-out",
                        minWidth: "150px",
                        "@keyframes fadeIn": {
                          from: {
                            opacity: 0,
                            transform: "translateY(-10px)",
                          },
                          to: { opacity: 1, transform: "translateY(0)" },
                        },
                      }}
                    >
                      {["en", "fr", "es", "zh", "de"].map((lang) => (
                        <MenuItem
                          key={lang}
                          onClick={() => i18n.changeLanguage(lang)}
                          sx={{
                            padding: "10px 20px",
                            fontSize: "14px",
                            "&:hover": {
                              backgroundColor: "rgba(0, 0, 0, 0.05)",
                            },
                          }}
                        >
                          {lang === "en"
                            ? "English"
                            : lang === "fr"
                            ? "French"
                            : lang === "es"
                            ? "Spanish"
                            : lang === "zh"
                            ? "Chinese"
                            : "German"}
                        </MenuItem>
                      ))}
                    </Box>
                  )}
                </Box>
              </ClickAwayListener>

              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={1}
              >
                <ClickAwayListener onClickAway={handlePopperClose}>
                  <Box sx={{ position: "relative" }}>
                    <IconButton
                      aria-label="bell-notifications"
                      onClick={handleClick}
                    >
                      <Badge
                        badgeContent={
                          (data1?.count ? data1.count : 0) +
                          notifications?.length +
                          (teamNotifications?.length
                            ? teamNotifications?.length
                            : 0) +
                          (invoiceNotification ? 1 : 0) +
                          (approvalData?.data?.length
                            ? approvalData?.data?.length
                            : 0)
                        }
                        color="success"
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
                      sx={{
                        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.9)",
                        width: { sm: "400px", xs: "300px" },
                        maxHeight: "610px",
                        overflowY: "auto",
                        overflowX: "hidden",
                        scrollbarWidth: "thin", // For Firefox
                        "&::-webkit-scrollbar": {
                          width: "5px", // Width of the scrollbar
                        },
                        "&::-webkit-scrollbar-thumb": {
                          backgroundColor: "rgba(0, 0, 0, 0.5)", // Color of the scrollbar thumb
                          borderRadius: "10px", // Rounded corners for the scrollbar thumb
                        },
                        "&::-webkit-scrollbar-track": {
                          backgroundColor: "transparent", // Background of the scrollbar track
                        },
                      }}
                      id={noti_id}
                      open={openNotification}
                      anchorEl={anchorEl}
                      placement="bottom-end"
                    >
                      <>
                        {Array.isArray(approvalData?.data) &&
                        approvalData.data.length > 0
                          ? approvalData.data.map((notification, index) => (
                              <ApprovalNotification
                                key={index}
                                approvalRefetchCall={approvalRefetchCall}
                                userId={userId}
                                index={index}
                                setExpanded={setExpanded}
                                notification={notification}
                                expanded={expanded}
                              />
                            ))
                          : null}

                        {invoiceNotification && (
                          <InvoiceNotification
                            data={invoiceNotification}
                            setInvoiceNotification={setInvoiceNotification}
                          />
                        )}

                        {Array.isArray(teamNotifications) &&
                        teamNotifications.length > 0
                          ? teamNotifications
                              .slice(0, 3)
                              .map((teamNotification, index) => (
                                <TeamNotifications
                                  key={index}
                                  teamNotification={teamNotification}
                                  index={index}
                                  userId={userId}
                                  refetch={handleTeamNotificationsRefetch}
                                />
                              ))
                          : null}

                        {Array.isArray(notificationsArr) &&
                        notificationsArr.length > 0
                          ? notificationsArr
                              .slice(0, 3)
                              .map((notification, index) => (
                                <Notification
                                  key={notification.workOrder_id}
                                  notification={notification}
                                  refetch={refetch}
                                  userId={userId}
                                  index={index}
                                  setExpanded={setExpanded}
                                  expanded={expanded}
                                />
                              ))
                          : null}

                        {/* Check if all notification arrays are empty and display "No Unread Notifications" */}
                        {(!Array.isArray(approvalData?.data) ||
                          approvalData.data.length === 0) &&
                        (!Array.isArray(teamNotifications) ||
                          teamNotifications.length === 0) &&
                        (!Array.isArray(notificationsArr) ||
                          notificationsArr.length === 0) &&
                        !invoiceNotification ? (
                          <div
                            style={{
                              backgroundColor: "#F2F2F2",
                              padding: 15,
                              borderRadius: "14px",
                              textAlign: "center",
                            }}
                          >
                            No new notifications
                          </div>
                        ) : null}
                      </>
                    </Popper>
                  </Box>
                </ClickAwayListener>
                <BuilderProButton
                  backgroundColor={"#4C8AB1"}
                  variant={"outlined"}
                  Icon={BuilderProNavbarLogout}
                  handleOnClick={handleLogout}
                >
                  {responsiveButton ? "Log out" : ""}
                </BuilderProButton>
              </Box>
            </Toolbar>
          </AppBar>
        </>
      )}
    </>
  );
};

export default Navbar;
