import React, { useEffect, useState } from "react";
import {  Grid, Paper } from "@mui/material";
import ProfileView from "../../components/Dashboard/ProfileView/ProfileView.js";
import Navbar from "../../components/Navbar/Navbar.js";
import WeatherView from "../../components/Dashboard/WeatherView/WeatherView.js";
import ProgressCard from "../../components/Dashboard/ProgressCard/ProgressCard.js";
import TaskCalenderView from "../../components/Dashboard/TaskCalenderView/TaskCalenderView.js";
import { getFormattedFiveDayWeather } from '../../services/WeatherService.js'

const Dashboard = () => {
  const [dailyForecast, setDailyForecast] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(()=>{

    const fetchWeather = async () => {
      try {
        const data = await  getFormattedFiveDayWeather({lat: "33.6844", lon: "73.0479", units: 'Metric'});
        setDailyForecast(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false)
      }
    }
    fetchWeather();

  }, []);

  return (
    <>
    <Navbar />
    <main>
      <Grid sx={themeStyle.dashboard} container pt={1} >
        {/* Profile View */}
        <Grid item xs={12} sm={3} md={2} height={themeStyle.dashboardViews}>
          <Paper  sx={themeStyle.dashboardViews}><ProfileView /></Paper>
        </Grid>
        {/* Weather and Progress View */}
        <Grid item xs={12} sm={9} md={7} height={themeStyle.dashboardViews}>
            <Grid item margin={1}><Paper height={themeStyle.dashboardViews}><WeatherView dailyForecast={dailyForecast} loading={loading} error={error} /></Paper></Grid>
            {/* direction={{md:'column', lg:'row'}} */}
            <Grid  container sx={themeStyle.scrollable} height={'69.4vh'}   margin={'auto'}>
              <Grid item xs={12} sm={12} md={12} lg={6} style={{paddingTop: '0px', paddingLeft:'0px'}}>
              <Paper sx={themeStyle.progressCard} margin={1} ><ProgressCard /></Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} style={{paddingTop: '0px', paddingLeft:'8px'}}>
              <Paper sx={themeStyle.progressCard} margin={1} ><ProgressCard /></Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} style={{paddingTop: '0px', paddingLeft:'0px'}}>
              <Paper sx={themeStyle.progressCard} margin={1} ><ProgressCard /></Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} style={{paddingTop: '0px', paddingLeft:'8px'}}>
              <Paper sx={themeStyle.progressCard} margin={1} ><ProgressCard /></Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} style={{paddingTop: '0px', paddingLeft:'0px'}}>
              <Paper sx={themeStyle.progressCard} margin={1}><ProgressCard /></Paper>
              </Grid>
            </Grid>
        </Grid>
        {/* Calender Tracker View */}
        <Grid item xs={12} sm={12} md={3} height={themeStyle.dashboardViews}>
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
    height: '100%',
  },
  progressCard: {
    height: "100%",
    width: "100%",
    margin: '1px'
  },
  scrollable:{
    overflow: 'scroll',
    scrollbarWidth: 'none',  // For Firefox
    '-ms-overflow-style': 'none',  // For IE and Edge
    '&::-webkit-scrollbar': {
      width: '6px'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'transparent',
      transition: 'background-color 0.3s',
    },
    '&:hover::-webkit-scrollbar-thumb': {
      backgroundColor: '#ddd',
    },
  }
};
