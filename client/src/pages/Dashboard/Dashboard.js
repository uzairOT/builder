import React from "react";
import { Grid, Paper } from "@mui/material";
import ProfileView from "../../components/Dashboard/ProfileView/ProfileView.js";

const Dashboard = () => {
  return (
    <>
    <main>
      <Grid sx={themeStyle.dashboard} container spacing={1}>
        {/* Profile View */}
        <Grid item xs={12} sm={3} md={2}>
          <Paper sx={themeStyle.dashboardViews}><ProfileView /></Paper>
        </Grid>
        {/* Weather and Progress View */}
        <Grid item xs={12} sm={9} md={7}>
          <Paper sx={themeStyle.dashboardViews}>Weather and Progress View</Paper>
        </Grid>
        {/* Calender Tracker View */}
        <Grid item xs={12} sm={12} md={3}>
          <Paper sx={themeStyle.dashboardViews}>Calender Tracker View</Paper>
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
    width: "100%",  
  },
  dashboardViews:{
    height: '100vh',
  }
};
