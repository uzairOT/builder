import React, { useEffect, useState } from "react";
import {  Grid, Paper } from "@mui/material";
import ProfileView from "../../components/Dashboard/ProfileView/ProfileView.js";
import Navbar from "../../components/Navbar/Navbar.js";
import WeatherView from "../../components/Dashboard/WeatherView/WeatherView.js";
import ProgressCard from "../../components/Dashboard/ProgressCard/ProgressCard.js";
import TaskCalenderView from "../../components/Dashboard/TaskCalenderView/TaskCalenderView.js";
import { getFormattedFiveDayWeather } from '../../services/WeatherService.js'
import { useParams } from "react-router-dom";
import ProfilePage from "../../components/Settings/Profile/Profile.js"
import AdminPage from "../../components/Settings/Admin/Admin.js"
import ProjectManagerPage from "../../components/Settings/ProjectManager/ProjectManager.js"
import ClientsPage from "../../components/Settings/Client/Client.js"
import SubcontractorPage from "../../components/Settings/Subcontractor/Subcontractor.js"
import SupplierPage from "../../components/Settings/SupplierList/SupplierList.js"
import MaterlinePage from "../../components/Settings/MasterLineItem/MasterLineItem.js"
import NotFoundPage from "../NotFound/NotFound.js"

const Settings = () => {
  const [dailyForecast, setDailyForecast] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const { page } = useParams();

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
console.log(page)

let pageContent;
switch (page) {
  case 'profile':
    pageContent = <ProfilePage />;
    break;
  case 'admin':
    pageContent = <AdminPage />;
    break;
  case 'projectmanager':
    pageContent = <ProjectManagerPage />;
    break;
  case 'clients':
    pageContent = <ClientsPage />;
    break;
  case 'subcontractor':
    pageContent = <SubcontractorPage />;
    break;
  case 'supplier':
    pageContent = <SupplierPage />;
    break;
  case 'materline':
    pageContent = <MaterlinePage />;
    break;
  default:
    pageContent = <NotFoundPage />;
}


  return (
    <>
    <Navbar />
    <main>
      <Grid sx={themeStyle.dashboard} container pt={1} >
        {/* Side bar */}
        <Grid item xs={12} sm={3} md={2}>
          <Paper  sx={{ borderRadius: '0 14px 14px 0', height:'97%'}} ></Paper>
        </Grid>
        {/* Weather and Progress View */}
        {/* <Grid item xs={12} sm={9} md={7} >
        {pageContent}
        </Grid> */}
        <Grid item xs={12} sm={12} md={12} lg={6} mb={1} style={{paddingTop: '0px', paddingLeft:'0px'}}>
              <Paper sx={themeStyle.progressCard} margin={1} > {pageContent}</Paper>
              </Grid>
  
      
      </Grid>
      </main>
    </>
  );
};

export default Settings;

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