import React, { useEffect, useState } from "react";
import { Grid, Paper } from "@mui/material";
import ProfileView from "../../components/Dashboard/ProfileView/ProfileView.js";
import Navbar from "../../components/Navbar/Navbar.js";
import WeatherView from "../../components/Dashboard/WeatherView/WeatherView.js";
import ProgressCard from "../../components/Dashboard/ProgressCard/ProgressCard.js";
import TaskCalenderView from "../../components/Dashboard/TaskCalenderView/TaskCalenderView.js";
import { getFormattedFiveDayWeather } from "../../services/WeatherService.js";
import { useGetUserEventsMutation } from "../../redux/apis/usersApiSlice.js";
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { addEvents, setIsLoading, allEvents } from "../../redux/slices/Events/eventsSlice.js";
import { getForecast } from "../../redux/slices/DailyForecast/dailyForecastSlice.js";
import { allUserProjects } from "../../redux/slices/Project/userProjectsSlice.js";


const Dashboard = () => {
  const allEvent = useSelector(allEvents);
  const forecast = useSelector(getForecast);
  const userProjects = useSelector(allUserProjects);
  
  const local = localStorage.getItem('userInfo');
  const currentUser = JSON.parse(local);
  const { id } = currentUser.user;
  
  const loading = allEvent.isLoading;
  const error = allEvent.error;
  const events = allEvent.events;
  const dailyForecast = forecast.dailyForecast;
  const forecastIsLoading = forecast.isLoading;
  const forecastError = forecast.error;




  return (
    <>
      <main>
        <Grid sx={themeStyle.dashboard} container pt={1}>
          {/* Profile View */}
          <Grid item xs={12} sm={4} md={3.5} xl={2}>
            <Paper
              sx={{
                borderRadius: "0 14px 14px 0",
                overflow: "hidden",
                height: "100%",
              }}
            >
              <ProfileView />
            </Paper>
          </Grid>
          {/* Weather and Progress View */}
          <Grid
            item
            xs={12}
            sm={8}
            md={8.5}
            xl={7}
            height={"100%"}
            overflow={"hidden"}
          >
            <Grid item margin={1} ml={2} mr={2}>
              <Paper
                sx={{ ...themeStyle.dashboardViews, borderRadius: "14px" }}
              >
                <WeatherView
                  dailyForecast={dailyForecast}
                  loading={forecastIsLoading}
                  error={forecastError}
                />
              </Paper>
            </Grid>
            {/* direction={{md:'column', lg:'row'}} */}
            {/*  height:{xl:'67vh', lg:'65vh', md:'43vh', sm:'45vh', xs: '45vh'} */}
            <Grid
              container
              sx={{ ...themeStyle.scrollable }}
              overflow={"hidden"}
              height={"calc(92vh - 240px)"}
              width={"98%"}
              pt={1}
              margin={"auto"}
            >
              {Array.isArray(userProjects[0]) ? userProjects[0]?.map((project) => (<Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={6}
                mb={1}
                style={{
                  paddingTop: "0px",
                  paddingLeft: "0px ",
                  overflow: "hidden",
                }}
                
              >
                <Paper sx={themeStyle.progressCard} margin={1}>
                  <ProgressCard project={project} />
                </Paper>
              </Grid>) ) : <>Loading..</>}
              {/* <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={6}
                mb={1}
                style={{
                  paddingTop: "0px",
                  paddingLeft: "8px",
                  overflow: "hidden",
                }}
              >
                <Paper sx={themeStyle.progressCard} margin={1}>
                  <ProgressCard />
                </Paper>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={6}
                mb={1}
                style={{
                  paddingTop: "0px",
                  paddingLeft: "0px",
                  overflow: "hidden",
                }}
              >
                <Paper sx={themeStyle.progressCard} margin={1}>
                  <ProgressCard />
                </Paper>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={6}
                mb={1}
                style={{
                  paddingTop: "0px",
                  paddingLeft: "8px",
                  overflow: "hidden",
                }}
              >
                <Paper sx={themeStyle.progressCard} margin={1}>
                  <ProgressCard />
                </Paper>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={6}
                mb={1}
                style={{ paddingTop: "0px", paddingLeft: "0px", overflow: "" }}
              >
                <Paper sx={themeStyle.progressCard} margin={1}>
                  <ProgressCard />
                </Paper>
              </Grid> */}
            </Grid>
          </Grid>
          {/* Calender Tracker View */}
          <Grid item xs={12} sm={12} md={12} xl={3} pb={1} height={"91vh"}>
            <Paper
              sx={{
                borderRadius: " 14px 0 0 14px",
                marginBottom: "8px",
                height: "100%",
                marginTop:"10px"
              }}
            >
              {loading ? (
                <>Loading</>
              ) : (
                <TaskCalenderView dailyForecast={dailyForecast} eventsArr={events} />
              )}
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
    height: {xl:"93vh",lg:"100%",md:"100%"},
  },
  dashboardViews: {
    height: "100%",
  },
  progressCard: {
    height: "98%",
    width: "97%",
    margin: "8px",
    borderRadius: "14px",
    overflow: "hidden",
  },
  scrollable: {
    overflowY: "scroll",
    scrollbarWidth: "none", // For Firefox
    "-ms-overflow-style": "none", // For IE and Edge
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "transparent",
      transition: "background-color 0.3s",
    },
    "&:hover::-webkit-scrollbar-thumb": {
      backgroundColor: "#ddd",
    },
  },
};
