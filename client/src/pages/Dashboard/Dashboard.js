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
    <main>
      <Grid sx={themeStyle.dashboard} container pt={1} >
        {/* Profile View */}
        <Grid item xs={12} sm={4} md={4} xl={2} height={'97vh'}>
          <Paper  sx={{ borderRadius: '0 14px 14px 0', overflow:'hidden', height:'100%'}} ><ProfileView /></Paper>
        </Grid>
        {/* Weather and Progress View */}
        <Grid item xs={12} sm={8} md={8} xl={7} height={'100%'} overflow={'hidden'} >
            <Grid item margin={1} ml={2} mr={2}><Paper sx={{...themeStyle.dashboardViews, borderRadius: '14px'}}><WeatherView dailyForecast={dailyForecast} loading={loading} error={error} /></Paper></Grid>
            {/* direction={{md:'column', lg:'row'}} */}
          {/*  height:{xl:'67vh', lg:'65vh', md:'43vh', sm:'45vh', xs: '45vh'} */}
            <Grid  container sx={{...themeStyle.scrollable,}} overflow={'hidden'} height={'72vh'} width={'98%'} pt={1}  margin={'auto'}>
              <Grid item xs={12} sm={12} md={12} lg={6} mb={1} style={{paddingTop: '0px', paddingLeft:'0px ', overflow:'hidden'}}>
              <Paper sx={themeStyle.progressCard} margin={1} ><ProgressCard /></Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} mb={1} style={{paddingTop: '0px', paddingLeft:'8px',overflow:'hidden'}}>
              <Paper sx={themeStyle.progressCard} margin={1} ><ProgressCard /></Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} mb={1} style={{paddingTop: '0px', paddingLeft:'0px',overflow:'hidden'}}>
              <Paper sx={themeStyle.progressCard} margin={1} ><ProgressCard /></Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} mb={1} style={{paddingTop: '0px', paddingLeft:'8px',overflow:'hidden'}}>
              <Paper sx={themeStyle.progressCard} margin={1} ><ProgressCard /></Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} mb={1} style={{paddingTop: '0px', paddingLeft:'0px',overflow:''}}>
              <Paper sx={themeStyle.progressCard} margin={1}><ProgressCard /></Paper>
              </Grid>
            </Grid>
        </Grid>
        {/* Calender Tracker View */}
        <Grid item xs={12} sm={12} md={12} xl={3} pb={1} height={'97vh'}>
          <Paper sx={{ borderRadius: ' 14px 0 0 14px', marginBottom:'8px', height: '100%'}}>
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
    margin: '1px',
    borderRadius: '14px',
    overflow:'hidden'
  },
  scrollable:{
    overflowY: 'scroll',
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
