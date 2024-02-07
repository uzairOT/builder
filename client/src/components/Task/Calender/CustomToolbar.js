import React, { useState } from "react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const CustomToolbar = ({toolbar, setMonthEventView}) => {
  const [activeButton, setActiveButton] = useState("day");
  const [activeMonthHeader, setActiveMonthHeader] = useState('');
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
  const handleMonthEventView = (monthEventView) =>{
    console.log(monthEventView);
    setMonthEventView(monthEventView)
    setActiveMonthHeader(monthEventView); 
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
    },
    button:{
      fontFamily: "inherit",
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: 500,
      border: "none",
      backgroundColor: '#fff',
      cursor: 'pointer',
      padding: '0',
      "&:hover": {
        color: "#4C8AB1",
      }
    },
    monthEventHeader:{
      
    }
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
        p={2}
        pl={3}
        mt={1}
      >
          <Typography sx={themeStyle.toolbarTitle} pl={1}>WorkOrder</Typography>
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
      <Stack width={"100%"} direction={'row'} justifyContent={'space-between'}>
        <Stack direction={"row"} alignItems={"center"} spacing={2} pl={1}>
          <IconButton style={themeStyle.toolbarIcon} aria-label="Left Arrow Icon" onClick={()=>handleNavigate('PREV')}>
            <ArrowLeftIcon style={{ color: "#797979" }} />
          </IconButton>
          <p style={themeStyle.toolbarLabel}>{toolbar.label}</p>
          <IconButton style={themeStyle.toolbarIcon} aria-label="Left Arrow Icon" onClick={()=> toolbar.onNavigate("NEXT")}>
            <ArrowRightIcon style={{ color: "#797979" }} />
          </IconButton>
        </Stack>
        {toolbar.view === 'month' && <Stack direction={'row'} spacing={2} pr={1} justifyContent={'center'} alignItems={'center'}>
          <button style={themeStyle.button} onClick={()=> {handleMonthEventView('tasks')}}>
          <Typography fontSize={'10px'} style={{...themeStyle.monthEventHeader, color: activeMonthHeader === 'tasks' ? '#4C8AB1': '', textDecoration:  activeMonthHeader === 'tasks' ? 'underline': ''}}>Tasks</Typography>
          </button>
          <button style={themeStyle.button} onClick={()=> {handleMonthEventView('weather/notes')}}>
          <Typography fontSize={'10px'} style={{...themeStyle.monthEventHeader,  color: activeMonthHeader === 'weather/notes' ? '#4C8AB1': '', textDecoration:  activeMonthHeader === 'weather/notes' ? 'underline': ''}}>Weather/notes</Typography>
          </button>
          
        </Stack>}
      </Stack>
    </div>

    </>
  );
};

export default CustomToolbar;
