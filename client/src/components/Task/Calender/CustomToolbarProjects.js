import React, { useState } from "react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const CustomToolbarProjects = ({ toolbar, setEventView, bgColor }) => {
  const [activeButton, setActiveButton] = useState("day");
  const [activeHeader, setActiveHeader] = useState("Work Order");
  const goToDayView = (view) => {
    toolbar.onView(view);
    setActiveButton(view);
  };
  const goToWeekView = (view) => {
    toolbar.onView(view);
    setActiveButton(view);
  };
  const goToMonthView = (view) => {
    toolbar.onView(view);
    setActiveButton(view);
  };
  const handleNavigate = (action) => {
    toolbar.onNavigate(action);
  };
  //   const handleMonthEventTasks =() => {
  //     setMonthEventView(prevState => {
  //       //console.log('Tasks Clicked');
  //       //console.log("Inside handleMonthEventTasks: ", prevState);
  //       setActiveMonthHeader('tasks');
  //       return true;  // or any new state based on prevState
  //     });
  //   }

  // const handleMonthEventWeatherNotes = () => {
  //   setMonthEventView(prevState => {
  //     //console.log('Weather/Notes Clicked');
  //     //console.log("Inside handleMonthEventWeatherNotes: ",prevState);
  //     setActiveMonthHeader('weather/notes');
  //     return false;
  //   });
  // }
  const handleActiveHeader = (view) => {
    setEventView(() => {
      setActiveHeader(view);
      return view;
    });
  };

  // Styles
  const themeStyle = {
    toolbarTitle: {
      color: "white",
      fontFamily: "inherit",
      fontSize: "20px",
      fontStyle: "normal",
      fontWeight: 500,
    },
    toolbarButton: {
      textAlign: "center",
      fontFamily: "inherit",
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: 500,
      padding: "10px",
      border: "none",
      borderRadius: "37px",
    },
    toolbarButtonGroup: {
      color: "#202227",
      padding: "5px",
    },
    toolbarLabel: {
      fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
      color: "#484848",
      fontWeight: "500",
    },
    toolbarIcon: {
      padding: 3,
      border: "none",
      display: "flex",
      borderRadius: "32px",
      justifyContent: "center",
      alignItems: "center",
      lineHeight: "32px",
    },
    button: {
      fontFamily: "inherit",
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: 500,
      border: "none",
      backgroundColor: "#fff",
      cursor: "pointer",
      padding: "0",
      "&:hover": {
        color: "#4C8AB1",
      },
    },
    monthEventHeader: {},
  };
  //

  return (
    <>
      <div className="rbc-toolbar">
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
          pr={1}
          borderRadius={" 10px 10px 0 0"}
          backgroundColor={"#4C8AB1"}
        >
          {" "}
          <Stack direction={"row"}>
            <Typography sx={themeStyle.toolbarTitle} pl={2}>
              Work Order
            </Typography>
            {toolbar.view === "month" && (
              <Stack
                direction={"row"}
                spacing={2}
                pr={0.5}
                pl={5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <button
                  style={{
                    ...themeStyle.toolbarButton,
                    backgroundColor:
                      activeHeader === "Work Order" ? "white" : "",
                    color: activeHeader === "Work Order" ? "#4C8AB1" : "white",
                  }}
                  onClick={() => {
                    handleActiveHeader("Work Order");
                  }}
                >
                  <Typography
                    fontSize={"12px"}
                    style={{
                      ...themeStyle.monthEventHeader,
                      textDecoration:
                        activeHeader === "Work Order" ? "underline" : "",
                    }}
                  >
                    Work Order
                  </Typography>
                </button>
                <button
                  style={{
                    ...themeStyle.toolbarButton,
                    backgroundColor: activeHeader === "Notes" ? "white" : "",
                  }}
                  onClick={() => {
                    handleActiveHeader("Notes");
                  }}
                >
                  <Typography
                    fontSize={"12px"}
                    style={{
                      ...themeStyle.monthEventHeader,
                      color: activeHeader === "Notes" ? "#4C8AB1" : "white",
                      textDecoration:
                        activeHeader === "Notes" ? "underline" : "",
                    }}
                  >
                    Weather/notes
                  </Typography>
                </button>
              </Stack>
            )}
            {toolbar.view === "day" && (
              <Stack
                direction={"row"}
                spacing={2}
                pr={1}
                pl={5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <button
                  style={{
                    ...themeStyle.toolbarButton,
                    backgroundColor:
                      activeHeader === "Work Order" ? "white" : "",
                    color: activeHeader === "Work Order" ? "#4C8AB1" : "white",
                  }}
                  onClick={() => {
                    handleActiveHeader("Work Order");
                  }}
                >
                  <Typography
                    fontSize={"12px"}
                    style={{
                      ...themeStyle.monthEventHeader,
                      color: activeHeader === "Work Order" ? "#4C8AB1" : "",
                      textDecoration:
                        activeHeader === "Work Order" ? "underline" : "",
                    }}
                  >
                    Work Order
                  </Typography>
                </button>
                <button
                  style={{
                    ...themeStyle.toolbarButton,
                    backgroundColor: activeHeader === "Notes" ? "white" : "",
                  }}
                  onClick={() => {
                    handleActiveHeader("Notes");
                  }}
                >
                  <Typography
                    fontSize={"12px"}
                    style={{
                      ...themeStyle.monthEventHeader,
                      color: activeHeader === "Notes" ? "#4C8AB1" : "white",
                      textDecoration:
                        activeHeader === "Notes" ? "underline" : "",
                    }}
                  >
                    Weather/ Notes
                  </Typography>
                </button>
              </Stack>
            )}
          </Stack>
          <Box element="div" style={themeStyle.toolbarButtonGroup}>
            <Button
              style={{
                ...themeStyle.toolbarButton,
                backgroundColor: activeButton === "day" ? "#FFF" : "",
                color: activeButton === "day" ? "black" : "#FFF",
              }}
              onClick={() => goToDayView("day")}
            >
              Day
            </Button>
            <Button
              style={{
                ...themeStyle.toolbarButton,
                backgroundColor: activeButton === "week" ? "#FFF" : "",
                color: activeButton === "week" ? "#000000" : "#FFF",
                "&:hover": {
                  backgroundColor: "none",
                },
              }}
              onClick={() => goToWeekView("week")}
            >
              Week
            </Button>
            <Button
              style={{
                ...themeStyle.toolbarButton,
                backgroundColor: activeButton === "month" ? "#FFF" : "",
                color: activeButton === "month" ? "#000000" : "#FFF",
              }}
              onClick={() => goToMonthView("month")}
            >
              Month
            </Button>
          </Box>
        </Stack>
        <Stack
          width={"100%"}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={2} pl={1}>
            <IconButton
              style={themeStyle.toolbarIcon}
              aria-label="Left Arrow Icon"
              onClick={() => handleNavigate("PREV")}
            >
              <ArrowLeftIcon style={{ color: "#797979" }} />
            </IconButton>
            <p style={themeStyle.toolbarLabel}>{toolbar.label}</p>
            <IconButton
              style={themeStyle.toolbarIcon}
              aria-label="Left Arrow Icon"
              onClick={() => toolbar.onNavigate("NEXT")}
            >
              <ArrowRightIcon style={{ color: "#797979" }} />
            </IconButton>
          </Stack>
        </Stack>
      </div>
    </>
  );
};

export default CustomToolbarProjects;
