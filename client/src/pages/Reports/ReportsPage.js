import { Box, Grid, Paper } from '@mui/material'
import React from 'react'
import ProjectsSidebar from '../../components/Projects/ProjectsDashboard/ProjectsSidebar'
import ProfileReport from './ProfileReport'
import Reports from '../../components/Reports/Reports'
import ReportsSideBar from '../../components/Reports/ReportsSideBar'

const ReportsPage = () => {
  return (
   <>
   <Grid container height={{xl:"100vh",lg:"100vh",md:"100vh",sm:'', xs:''}} backgroundColor={"#eff5ff"} spacing={2} overflow={'hidden'} sx={themeStyle.scrollable}>
   <Grid item xl={2} lg={3} md={12} sm={12} xs={12} height={"99vh"}>
          <Paper sx={{ height: "100%", borderRadius: "14px" }}>
            <ProfileReport name={"Admin"} description={"SuperAdmin@gmail.com"} />
            <ProjectsSidebar />
          </Paper>
    </Grid>
    <Grid item container xl={10} lg={9} md={12} sm={12} xs={12} spacing={2}  style={{overflow:'hidden', ...themeStyle.scrollable}}>
    <Grid item xl={8} lg={12} md={12} sm={12} xs={12} height={"99vh"} overflow={'hidden'}>
        <Paper sx={{height:'100%', borderRadius: '14px', ...themeStyle.scrollable}}>
            <Reports />
        </Paper>
    </Grid>
    <Grid item xl={4} lg={12}  md={12} sm={12} xs={12}  height={"99vh"} style={{overflow:'hidden'}}>
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
  }
}