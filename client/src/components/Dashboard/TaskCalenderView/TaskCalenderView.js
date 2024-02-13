import React, { useState } from 'react'
import TaskCalender from '../../Task/Calender/TaskCalender'
import { Box, Drawer, IconButton } from '@mui/material'
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import './styles/drawer.css'

const TaskCalenderView = ({dailyForecast}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
const toggleDrawer = () => {
  setIsDrawerOpen(!isDrawerOpen);
};
  return (
    <Box height={"100vh"} overflow='auto' display={'flex'} flexDirection={'column'} style={{scrollbarWidth: 'none'}}>
      <Box display={''} sx={{ alignSelf: 'flex-start', marginBottom: '-64px', marginTop:'18px', marginLeft:'5px'}}>
      <IconButton onClick={toggleDrawer} >
          <ExpandCircleDownOutlinedIcon
            style={{ transform: "rotate(90deg)", color: "#4C8AB1" }}
            fontSize="small"
          />
          </IconButton>
      </Box>
        <TaskCalender dailyForecast={dailyForecast} sx={{flexGrow: 1}} isDrawerOpen={isDrawerOpen} />
        <Drawer open={isDrawerOpen} onClose={toggleDrawer} anchor="right">
        <Box display={''}  sx={{ alignSelf: 'flex-start', marginBottom: '-64px', marginTop:'18px', marginLeft:'5px'}}>
      <IconButton onClick={toggleDrawer} >
          <ExpandCircleDownOutlinedIcon
            style={{ transform: "rotate(-90deg)", color: "#4C8AB1" }}
            fontSize="small"
          />
          </IconButton>
      </Box>
           <TaskCalender dailyForecast={dailyForecast} isDrawerOpen={isDrawerOpen} />
    </Drawer>
    </Box>
  )
}

export default TaskCalenderView