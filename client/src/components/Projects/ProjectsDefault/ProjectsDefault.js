import { Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import MonitoringFinances from './MonitoringFinances'
import ProjectInfoAndTeam from './ProjectInfoAndTeam'
import TaskCalender from '../../Task/Calender/TaskCalender'
import ChangeOrder from './ChangeOrder'
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab,  { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { styled } from '@mui/material/styles';


const ProjectsDefault = () => {


  return (
    <>
        
        <Stack flex={2} ><Paper style={{...themeStyle.border, height:'91%'}} >
          <TaskCalender isProjectPage={true} isDrawerOpen={true}/>
          </Paper></Stack>
       
    </>
  )
}

export default ProjectsDefault
 const themeStyle = {
  border: {
    borderRadius: '14px'
  }
 }