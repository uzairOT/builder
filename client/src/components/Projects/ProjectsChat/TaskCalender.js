import { Paper } from '@mui/material'
import React from 'react'
import TaskCalenderView from '../../Dashboard/TaskCalenderView/TaskCalenderView'
import { useSelector } from 'react-redux';
import { allEvents } from '../../../redux/slices/Events/eventsSlice';
import { getForecast } from '../../../redux/slices/DailyForecast/dailyForecastSlice';
const TaskCalender = () => {
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
  return (
    <Paper style={{height:'100%', borderRadius:'14px'}}>
          {loading ? (
                <>Loading...</>
              ) : (
                <TaskCalenderView dailyForecast={dailyForecast} eventsArr={events} />
              )}
    </Paper>
  )
}

export default TaskCalender