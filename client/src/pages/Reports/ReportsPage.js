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
   <Grid container mt={'0.0000001px'} height={{xl:"94vh",lg:"100%",md:"100%",sm:'100%', xs:'100%'}} backgroundColor={"#eff5ff"} spacing={1.5} >
   <Grid item xl={2} lg={2.5} md={12} sm={12} xs={12} height={"93vh"}>
          <Paper sx={{ height: "100%", borderRadius: "14px" }}>
          <Typography  style={themeStyle.title} fontSize={'22px'} fontWeight={'500'} p={2} pb={1.5}>Reports</Typography>
            <Profile reports={true} />
            <ProjectsSidebar reports={true} />
          </Paper>
    </Grid>
    <Grid item container xl={10} lg={9.5} md={12} sm={12} xs={12} spacing={2}  style={{overflow:'hidden', ...themeStyle.scrollable}}>
    <Grid item xl={8} lg={8} md={12} sm={12} xs={12} height={"93vh"} overflow={'hidden'} >
        <Paper sx={{ height: {xl:'calc(93vh - 22px)', lg:`calc(93vh - 22px)`, md:`calc(93vh - 22px)`, sm:`calc(93vh - 22px)`, xs:`calc(93vh - 22px)`}, borderRadius: '14px', ...themeStyle.scrollable}} style={{paddingBottom:'4px'}}>
            <Reports />
        </Paper>
    </Grid>
    <Grid item xl={4} lg={4}  md={12} sm={12} xs={12}  height={"93vh"} style={{overflow:'hidden'}}>
        <Box sx={{height: {xl:'calc(93vh - 10px)', lg:`calc(93vh - 10px)`, md:`calc(93vh - 10px)`, sm:`calc(93vh - 10px)`, xs:`calc(93vh - 10px)`}, borderRadius: '14px', ...themeStyle.scrollable}}>
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
      fontSize: '22px',
      fontWeight: '500',
      fontFamily: 'var(--main-font-family)',
      color: '#000000'
  }
  }
}