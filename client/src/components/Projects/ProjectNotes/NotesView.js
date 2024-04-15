import { Paper, Stack } from "@mui/material";
import React from "react";
import TaskCalenderView from "../../Dashboard/TaskCalenderView/TaskCalenderView";
import Notes from "./Notes";
import { useSelector } from "react-redux";
import { allEvents } from "../../../redux/slices/Events/eventsSlice";
import { getForecast } from "../../../redux/slices/DailyForecast/dailyForecastSlice";

const NotesView = () => {
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
  console.log( "IN DASHBOARD EVENTS: ", events)
  return (
    <Stack direction={{xl: 'row', lg:'column'}} pt={1} spacing={1} height={'100%'}>
        <Stack flex={3}>
          <Notes />
        </Stack>
        <Stack  flex={1}>
      <Paper sx={{height: {xl:'94.5%', lg:'98%', borderRadius:'14px'}}}>
      {loading ? (
                <>Loading</>
              ) : (
                <TaskCalenderView dailyForecast={dailyForecast} eventsArr={events} />
              )}
      </Paper>
          </Stack>
    </Stack>
  );
};

export default NotesView;
