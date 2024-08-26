import { Paper, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import MonitoringFinances from './MonitoringFinances';
import ProjectInfoAndTeam from './ProjectInfoAndTeam';
import TaskCalender from '../../Task/Calender/TaskCalender';
import ChangeOrder from './ChangeOrder';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { userApiSlice } from '../../../redux/apis/usersApiSlice';
import { allEvents } from '../../../redux/slices/Events/eventsSlice';
import { getForecast } from '../../../redux/slices/DailyForecast/dailyForecastSlice';
import { useOutletContext } from 'react-router-dom';

const themeStyle = {
  border: {
    borderRadius: '14px'
  },
  scrollable: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    height: "100%",

    scrollbarWidth: 'none',  // For Firefox
    '-ms-overflow-style': 'none',  // For IE and Edge
    '&::-webkit-scrollbar': {
        width: '6px'
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#FFF',
        height: "100%",
        transition: 'background-color 0.3s',
    },
    '&:hover::-webkit-scrollbar-thumb': {
        background: "#FFF",
        height: "100%",
    },
}

};

const ProjectsDefault = () => {
  const allEvent = useSelector(allEvents);
  const forecast = useSelector(getForecast);
  const local = localStorage.getItem('userInfo');
  const currentUser = JSON.parse(local);
  const { id } = currentUser.user;
  const loading = allEvent.isLoading;
  const error = allEvent.error;
  const events = allEvent.events;
  const dailyForecast = forecast.dailyForecast;
  const forecastIsLoading = forecast.isLoading;
  const forecastError = forecast.error;

  useEffect(() => {
    //console.log(events);
  }, [events]);

  return (
    <>
      {loading ? (
        <Stack flex={2}>  
          <Paper style={{ ...themeStyle.border }}>
            <>Loading..</>
          </Paper>
        </Stack>
      ) : (
        <Stack flex={2} height={'100%'}>
          <Paper style={{ ...themeStyle.border, height:'inherit', overflow:'hidden', ...themeStyle.scrollable}}>
            <TaskCalender dailyForecast={dailyForecast} eventsArr={events} isProjectPage={true} isDrawerOpen={true} />
          </Paper>
        </Stack>
      )}
    </>
  );
};

export default ProjectsDefault;

