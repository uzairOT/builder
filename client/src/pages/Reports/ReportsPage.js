import { Box, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import ProjectsSidebar from '../../components/Projects/ProjectsDashboard/ProjectsSidebar'
import Profile from '../../components/Dashboard/ProfileView/Profile'
import ProfileReport from './ProfileReport'
import Reports from '../../components/Reports/Reports'
import ReportsSideBar from '../../components/Reports/ReportsSideBar'

const ReportsPage = () => {
  return (
   <>
   <Grid container mt={'0.0000001px'} height={{xl:"93vh",lg:"93vh",md:"93vh",sm:'', xs:''}} backgroundColor={"#eff5ff"} spacing={2} overflow={'hidden'} >
   <Grid item xl={2} lg={3} md={12} sm={12} xs={12} height={"92vh"}>
          <Paper sx={{ height: "100%", borderRadius: "14px" }}>
          <Typography variant='h6' sx={themeStyle.title}>Reports</Typography>
            <Profile />
            <ProjectsSidebar />
          </Paper>
    </Grid>
    <Grid item container xl={10} lg={9} md={12} sm={12} xs={12} spacing={2}  style={{overflow:'hidden', ...themeStyle.scrollable}}>
    <Grid item xl={8} lg={12} md={12} sm={12} xs={12} height={"92vh"} overflow={'hidden'}>
        <Paper sx={{height:'100%', borderRadius: '14px', ...themeStyle.scrollable}}>
            <Reports />
        </Paper>
    </Grid>
    <Grid item xl={4} lg={12}  md={12} sm={12} xs={12}  height={"92vh"} style={{overflow:'hidden'}}>
        <Box sx={{height:'100%', borderRadius: '14px', ...themeStyle.scrollable}}>
          <ReportsSideBar />
        </Box>
    </Grid>
    </Grid>
   </Grid>
   </>
  )
}

export default ReportsPage
const themeStyle = {
  scrollable: {
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
    title: {
      fontWeight: "400",
      fontSize: "25px",
      lineHeight: "normal",
      padding: '8px',
      fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
      textAlign: "left",
    }
  }
}