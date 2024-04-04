import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import moment from 'moment';

const CustomToolbar = ({toolbar, setEventView, dailyForecast, toolbarKey}) => {
 
  const [activeButton, setActiveButton] = useState("day");
  const [activeHeader, setActiveHeader] = useState('Work Order');
  const [matchingForecast,setMatchingForecast] = useState();

  useEffect(()=>{
    console.log('custom toolbar', dailyForecast, ' key: ', toolbarKey)
  },[dailyForecast,  toolbarKey])

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
//   const handleMonthEventTasks =() => {
//     setMonthEventView(prevState => {
//       console.log('Tasks Clicked');
//       console.log("Inside handleMonthEventTasks: ", prevState);
//       setActiveMonthHeader('tasks');
//       return true;  // or any new state based on prevState
//     });
//   }

// const handleMonthEventWeatherNotes = () => {
//   setMonthEventView(prevState => {
//     console.log('Weather/Notes Clicked');
//     console.log("Inside handleMonthEventWeatherNotes: ",prevState);
//     setActiveMonthHeader('weather/notes');
//     return false;
//   });
// }
const handleActiveHeader = (view) => {
  setEventView(() => {
    setActiveHeader(view);
    return view
  });
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
        p={1}
        pl={4}
        mt={1}
        pt={2}
        pb={2}
      >
          <Typography sx={themeStyle.toolbarTitle} pl={2}>WorkOrder</Typography>
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
        {toolbar.view === 'month' && <Stack direction={'row'} spacing={2} pr={0.5} justifyContent={'center'} alignItems={'center'}>
          <button style={themeStyle.button} onClick={()=>{ handleActiveHeader("Work Order")}}>
          <Typography fontSize={'12px'} style={{...themeStyle.monthEventHeader, color: activeHeader === 'Work Order' ? '#4C8AB1': '', textDecoration:  activeHeader === 'Work Order' ? 'underline': ''}}>Work Order</Typography>
          </button>
          <button style={themeStyle.button} onClick={()=>{ handleActiveHeader("Notes")}}>
          <Typography fontSize={'12px'} style={{...themeStyle.monthEventHeader,  color: activeHeader === 'Notes' ? '#4C8AB1': '', textDecoration:  activeHeader === 'Notes' ? 'underline': ''}}>Weather/notes</Typography>
          </button>
          
        </Stack>}
        {toolbar.view === 'day' && <Stack direction={'row'} spacing={2} pr={1} justifyContent={'center'} alignItems={'center'}>
          <button style={themeStyle.button} onClick={()=>{ handleActiveHeader("Work Order")}}>
          <Typography fontSize={'12px'} style={{...themeStyle.monthEventHeader, color: activeHeader === 'Work Order' ? '#4C8AB1': '', textDecoration:  activeHeader === 'Work Order' ? 'underline': ''}}>Work Order</Typography>
          </button>
          <button style={themeStyle.button} onClick={()=>{ handleActiveHeader("Notes")}}>
          <Typography fontSize={'12px'} style={{...themeStyle.monthEventHeader,  color: activeHeader === 'Notes' ? '#4C8AB1': '', textDecoration:  activeHeader === 'Notes' ? 'underline': ''}}>Notes</Typography>
          </button>
          
        </Stack>}
      </Stack>
            {
              

            }
    </div>

    </>
  );
};

export default CustomToolbar;
