import React, { useState } from 'react'
import TaskCalender from '../../Task/Calender/TaskCalender'
import { Box, Drawer, IconButton } from '@mui/material'
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import './styles/drawer.css'

const TaskCalenderView = ({ dailyForecast, events }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  console.log("In Task Calender View: ", dailyForecast);
  

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <Box height={"100%"} width={"100%"} overflow='auto' display={'flex'} flexDirection={'column'} style={{ scrollbarWidth: 'none' }}>
      <Box display={''} sx={{ alignSelf: 'flex-start', marginBottom: '-64px', marginTop: '18px', marginLeft: '5px' }}>
        <IconButton onClick={toggleDrawer} >
          <ExpandCircleDownOutlinedIcon
            style={{ transform: "rotate(90deg)", color: "#4C8AB1" }}
            fontSize="small"
          />
        </IconButton>
      </Box>
      <TaskCalender events={events} dailyForecast={dailyForecast} sx={{ flexGrow: 1 }} isDrawerOpen={isDrawerOpen} />
      <Drawer open={isDrawerOpen} onClose={toggleDrawer} anchor="right">
        <Box display={''} sx={{ alignSelf: 'flex-start', marginBottom: '-64px', marginTop: '18px', marginLeft: '5px' }}>
          <IconButton onClick={toggleDrawer} >
            <ExpandCircleDownOutlinedIcon
              style={{ transform: "rotate(-90deg)", color: "#4C8AB1" }}
              fontSize="small"
            />
          </IconButton>
        </Box>
        <TaskCalender events={events} dailyForecast={dailyForecast} isDrawerOpen={isDrawerOpen} />
      </Drawer>
    </Box>
  )
}

export default TaskCalenderView