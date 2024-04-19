import { Paper, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import MonitoringFinances from './MonitoringFinances'
import ProjectInfoAndTeam from './ProjectInfoAndTeam'
import TaskCalender from '../../Task/Calender/TaskCalender'
import ChangeOrder from './ChangeOrder'
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab,  { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { styled } from '@mui/material/styles';
import {useSelector} from 'react-redux';
import { userApiSlice } from '../../../redux/apis/usersApiSlice'
import { allEvents } from '../../../redux/slices/Events/eventsSlice'
import { getForecast } from '../../../redux/slices/DailyForecast/dailyForecastSlice'


const ProjectsDefault = () => {
  const allEvent = useSelector(allEvents);
  const forecast = useSelector(getForecast);
  const local = localStorage.getItem('userInfo');
  const currentUser = JSON.parse(local);
  const { id} = currentUser.user;
  const loading = allEvent.isLoading;
  const error = allEvent.error;
  const events = allEvent.events;
  const dailyForecast = forecast.dailyForecast;
  const forecastIsLoading = forecast.isLoading;
  const forecastError = forecast.error;
  //console.log( "IN DASHBOARD EVENTS: ", events)
  useEffect(()=>{
    //console.log(events);
  },[events]);

  return (
    <>
        
        {loading ? <Stack flex={2} ><Paper style={{...themeStyle.border, height:'91%'}} >
         <>Loading..</>
          </Paper></Stack> : <Stack flex={2} ><Paper style={{...themeStyle.border, height:'91%'}} >
          <TaskCalender dailyForecast={dailyForecast} eventsArr={events} isProjectPage={true} isDrawerOpen={true}/>
          </Paper></Stack>}
       
    </>
  )
}

export default ProjectsDefault
 const themeStyle = {
  border: {
    borderRadius: '14px'
  }
 }