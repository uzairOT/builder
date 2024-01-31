import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';

const CustomToolbar = (toolbar) => {
const [activeButton, setActiveButton] = useState('day');
    
      const goToDayView = (view) => {
        console.log(toolbar);
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
      padding: '5px',
      border: 'none',
      borderRadius: '37px'
    },
    toolbarButtonGroup: {
      borderRadius: "37px",
      backgroundColor: "#EDEDED",
      color: '#202227',
      padding: '5px'
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
        pl={2}
        pr={2}
        pt={2}
      >
        <Stack direction={'row'} spacing={.5} alignItems={'center'}>
        <ExpandCircleDownOutlinedIcon style={{ transform: "rotate(90deg)", color: "#4C8AB1" }} fontSize="small" />
        <Typography sx={themeStyle.toolbarTitle}>WorkOrder</Typography>
        </Stack>
        <Box element='div' style={themeStyle.toolbarButtonGroup}>
          <Button style={{...themeStyle.toolbarButton, backgroundColor: activeButton === 'day' ? '#4C8AB1' : '', color: activeButton === 'day' ? '#FFF' : ''}} onClick={()=>goToDayView('day')}>Day</Button>
          <Button style={{...themeStyle.toolbarButton, backgroundColor: activeButton === 'week' ? '#4C8AB1' : '', color: activeButton === 'week' ? '#FFF' : ''}} onClick={()=>goToWeekView('week')}>Week</Button>
          <Button style={{...themeStyle.toolbarButton, backgroundColor: activeButton === 'month' ? '#4C8AB1' : '', color: activeButton === 'month' ? '#FFF' : ''}} onClick={()=>goToMonthView('month')}>Month</Button>
        </Box>
      </Stack>
    </div>
  );
};

export default CustomToolbar;


