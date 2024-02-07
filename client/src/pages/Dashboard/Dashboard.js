import React, { useEffect, useState } from "react";
import { Grid, Paper, Stack } from "@mui/material";
import ProfileView from "../../components/Dashboard/ProfileView/ProfileView.js";
import Navbar from "../../components/Navbar/Navbar.js";
import WeatherView from "../../components/Dashboard/WeatherView/WeatherView.js";
import ProgressCard from "../../components/Dashboard/ProgressCard/ProgressCard.js";
import TaskCalenderView from "../../components/Dashboard/TaskCalenderView/TaskCalenderView.js";
import { getFormattedFiveDayWeather } from '../../services/WeatherService.js'

const Dashboard = () => {
  const [dailyForecast, setDailyForecast] = useState();

  useEffect(()=>{

    const fetchWeather = async () => {
      try {
        const data = await  getFormattedFiveDayWeather({lat: "33.6844", lon: "73.0479", units: 'Metric'});
        setDailyForecast(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchWeather();

  }, []);

  return (
    <>
    <Navbar />
    <main>
      <Grid sx={themeStyle.dashboard} container spacing={1}>
        {/* Profile View */}
        <Grid item xs={12} sm={3} md={2}>
          <Paper sx={themeStyle.dashboardViews}><ProfileView /></Paper>
        </Grid>
        {/* Weather and Progress View */}
        <Grid item xs={12} sm={9} md={7}>
            <Grid item margin={1}><Paper><WeatherView dailyForecast={dailyForecast} /></Paper></Grid>
            <Stack direction={{md:'column', lg:'row'}} margin={1}>
              <Paper sx={themeStyle.progressCard} margin={1}><ProgressCard /></Paper>
              <Paper sx={themeStyle.progressCard} margin={1}><ProgressCard /></Paper>
            </Stack>
        </Grid>
        {/* Calender Tracker View */}
        <Grid item xs={12} sm={12} md={3}>
          <Paper sx={themeStyle.dashboardViews}>
            <TaskCalenderView dailyForecast={dailyForecast} />
          </Paper>
        </Grid>
      </Grid>
      </main>
    </>
  );
};

export default Dashboard;

const themeStyle = {
  dashboard: {
    backgroundColor: "#eff5ff",
    height: "100vh",
  },
  dashboardViews:{
    height: '100vh',
  },
  progressCard: {
    height: "100%",
    width: "100%",
    margin: '1px'
  }
};
