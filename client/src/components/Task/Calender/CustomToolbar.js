import React, { useState } from "react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const CustomToolbar = (toolbar) => {
  const [activeButton, setActiveButton] = useState("day");
  console.log(toolbar);

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

  }

  // Styles
  const themeStyle = {
    toolbarTitle: {
      color: "#707070",
      fontFamily: "inherit",
      fontSize: "18px",
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
      borderRadius: "37px",
      backgroundColor: "#EDEDED",
      color: "#202227",
      padding: "5px",
    },
    toolbarLabel: {
      fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
      color: "#484848",
      fontWeight: "500",
    },
    toolbarIcon: {
        padding:3,
        border: 'none',
        display: 'flex',
        borderRadius: '32px',
        justifyContent: 'center',
        alignItems: 'center',
        lineHeight: '32px',
    }
  };
  //

  return (
    <div className="rbc-toolbar">
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"100%"}
        p={2}
      >
        <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
          <ExpandCircleDownOutlinedIcon
            style={{ transform: "rotate(90deg)", color: "#4C8AB1" }}
            fontSize="small"
          />
          <Typography sx={themeStyle.toolbarTitle}>WorkOrder</Typography>
        </Stack>
        <Box element="div" style={themeStyle.toolbarButtonGroup}>
          <Button
            style={{
              ...themeStyle.toolbarButton,
              backgroundColor: activeButton === "day" ? "#4C8AB1" : "",
              color: activeButton === "day" ? "#FFF" : "",
            }}
            onClick={() => goToDayView("day")}
          >
            Day
          </Button>
          <Button
            style={{
              ...themeStyle.toolbarButton,
              backgroundColor: activeButton === "week" ? "#4C8AB1" : "",
              color: activeButton === "week" ? "#FFF" : "",
            }}
            onClick={() => goToWeekView("week")}
          >
            Week
          </Button>
          <Button
            style={{
              ...themeStyle.toolbarButton,
              backgroundColor: activeButton === "month" ? "#4C8AB1" : "",
              color: activeButton === "month" ? "#FFF" : "",
            }}
            onClick={() => goToMonthView("month")}
          >
            Month
          </Button>
        </Box>
      </Stack>
      <Stack width={"100%"}>
        <Stack direction={"row"} alignItems={"center"} spacing={2} pl={1}>
          <IconButton style={themeStyle.toolbarIcon} aria-label="Left Arrow Icon" onClick={()=>handleNavigate('PREV')}>
            <ArrowLeftIcon style={{ color: "#797979" }} />
          </IconButton>
          <p style={themeStyle.toolbarLabel}>{toolbar.label}</p>
          <IconButton style={themeStyle.toolbarIcon} aria-label="Left Arrow Icon" onClick={()=> toolbar.onNavigate("NEXT")}>
            <ArrowRightIcon style={{ color: "#797979" }} />
          </IconButton>
        </Stack>
      </Stack>
    </div>
  );
};

export default CustomToolbar;
