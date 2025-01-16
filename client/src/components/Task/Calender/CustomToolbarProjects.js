import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMonth } from "../../../redux/slices/Project/projectWeather";
import { GanttChartSection } from "../../UI/Charts/GanttChartSection";

const CustomToolbarProjects = ({
  toolbar,
  setEventView,
  bgColorClient,
  handleMonthRange,
  projectWeather,
}) => {
  const [activeButton, setActiveButton] = useState("day");
  const [activeHeader, setActiveHeader] = useState("Work Order");
  const [showGanttChart, setShowGanttChart] = useState(false);

  const dispatch = useDispatch();
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
    // Get the current date from the toolbar label or a reference
    toolbar.onNavigate(action);
  };
  useEffect(() => {
    if (toolbar.view === "month") {
      const currentDate = new Date(toolbar.date);
      dispatch(setMonth(toolbar.label));
      const startOfMonth = toolbar.localizer.startOf(currentDate, "month");
      const endOfMonth = toolbar.localizer.endOf(currentDate, "month");
      handleMonthRange(startOfMonth, endOfMonth);
    }
  }, [toolbar.date, toolbar.view]);
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
      setShowGanttChart(view === "Chart");
      return view;
    });
  };

  const location = useLocation();
  const pathCheck = location.pathname;

  // Styles
  const themeStyle = {
    toolbarTitle: {
      color: bgColorClient ? "black" : "white",
      fontFamily: "var(--main-font-family)",
      fontSize: { xl: "20px", lg: "16px", md: "20px", xs: "16px" },
      fontStyle: "normal",
      fontWeight: 500,
    },
    toolbarButton: {
      textAlign: "center",
      fontFamily: "var(--main-font-family)",
      fontSize: { xl: "12px", lg: "12px", md: "12px", xs: "11px" },
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
      fontFamily: "var(--main-font-family)",
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
      fontFamily: "var(--main-font-family)",
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
          backgroundColor={bgColorClient ? "#FFE09F" : "#4C8AB1"}
        >
          {" "}
          <Stack direction={"row"} alignItems={"center"}>
            {pathCheck.includes("/change-order") ? (
              <Typography sx={themeStyle.toolbarTitle} pl={2}>
                Change Order
              </Typography>
            ) : (
              <Typography sx={themeStyle.toolbarTitle} pl={2}>
                Work Order
              </Typography>
            )}
            {toolbar.view === "month" && (
              <Stack
                direction={{ sm: "row", xs: "column" }}
                spacing={2}
                pr={0.5}
                pl={5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Button
                  sx={{
                    fontSize: "0.7rem",
                  }}
                  style={{
                    textTransform: "capitalize",
                    ...themeStyle.toolbarButton,
                    backgroundColor:
                      activeHeader === "Work Order" ? "white" : "",
                    color: bgColorClient
                      ? activeHeader === "Work Order"
                        ? "#4C8AB1"
                        : "black"
                      : activeHeader === "Work Order"
                      ? "#4C8AB1"
                      : "white",
                  }}
                  onClick={() => {
                    handleActiveHeader("Work Order");
                  }}
                >
                  Work Order
                </Button>
                <Button
                  sx={{
                    fontSize: "0.7rem",
                  }}
                  style={{
                    textTransform: "capitalize",
                    ...themeStyle.toolbarButton,
                    backgroundColor: activeHeader === "Notes" ? "white" : "",
                    color: activeHeader === "Notes" ? "#4C8AB1" : "white",
                  }}
                  onClick={() => {
                    handleActiveHeader("Notes");
                  }}
                >
                  Weather/notes
                </Button>
                <Button
                  sx={{
                    fontSize: "0.7rem",
                  }}
                  style={{
                    textTransform: "capitalize",
                    ...themeStyle.toolbarButton,
                    backgroundColor: activeHeader === "Chart" ? "white" : "",
                    color: activeHeader === "Chart" ? "#4C8AB1" : "white",
                  }}
                  onClick={() => {
                    handleActiveHeader("Chart");
                  }}
                >
                  Gantt chart
                </Button>
              </Stack>
            )}
            {toolbar.view === "day" && (
              <Stack
                direction={{ sm: "row", xs: "column" }}
                spacing={2}
                pr={0.5}
                pl={5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Button
                  sx={{
                    fontSize: "0.7rem",
                  }}
                  style={{
                    textTransform: "capitalize",
                    ...themeStyle.toolbarButton,
                    backgroundColor:
                      activeHeader === "Work Order" ? "white" : "",
                    color: activeHeader === "Work Order" ? "#4C8AB1" : "white",
                  }}
                  onClick={() => {
                    handleActiveHeader("Work Order");
                  }}
                >
                  Work Order
                </Button>
                <Button
                  sx={{
                    fontSize: "0.7rem",
                  }}
                  style={{
                    textTransform: "capitalize",
                    ...themeStyle.toolbarButton,
                    backgroundColor: activeHeader === "Notes" ? "white" : "",
                    color: activeHeader === "Notes" ? "#4C8AB1" : "white",
                  }}
                  onClick={() => {
                    handleActiveHeader("Notes");
                  }}
                >
                  Weather/ Notes
                </Button>
                <Button
                  sx={{
                    fontSize: "0.7rem",
                  }}
                  style={{
                    textTransform: "capitalize",
                    ...themeStyle.toolbarButton,
                    backgroundColor: activeHeader === "Chart" ? "white" : "",
                    color: activeHeader === "Chart" ? "#4C8AB1" : "white",
                  }}
                  onClick={() => {
                    handleActiveHeader("Chart");
                  }}
                >
                  Gantt chart
                </Button>
              </Stack>
            )}
          </Stack>
          {/* {!showGanttChart && ( */}
          <Box element="div" style={themeStyle.toolbarButtonGroup}>
            <Button
              sx={{
                fontSize: "0.7rem",
              }}
              style={{
                textTransform: "capitalize",
                ...themeStyle.toolbarButton,
                backgroundColor: activeButton === "day" ? "#FFF" : "",
                color: activeButton === "day" ? "black" : "#FFF",
              }}
              onClick={() => goToDayView("day")}
            >
              Day
            </Button>
            <Button
              sx={{
                fontSize: "0.7rem",
              }}
              style={{
                textTransform: "capitalize",
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
              sx={{
                fontSize: "0.7rem",
              }}
              style={{
                textTransform: "capitalize",
                ...themeStyle.toolbarButton,
                backgroundColor: activeButton === "month" ? "#FFF" : "",
                color: activeButton === "month" ? "#000000" : "#FFF",
              }}
              onClick={() => goToMonthView("month")}
            >
              Month
            </Button>
          </Box>
          {/* )} */}
        </Stack>
        {!showGanttChart && (
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
                onClick={() => handleNavigate("NEXT")}
              >
                <ArrowRightIcon style={{ color: "#797979" }} />
              </IconButton>
            </Stack>
          </Stack>
        )}
      </div>
      {showGanttChart && <GanttChartSection />}
    </>
  );
};

export default CustomToolbarProjects;
