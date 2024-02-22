import { Box, Grid, Paper } from '@mui/material'
import React from 'react'
import ProjectsSidebar from '../../components/Projects/ProjectsDashboard/ProjectsSidebar'
import ProfileReport from './ProfileReport'
import Reports from '../../components/Reports/Reports'
import ReportsSideBar from '../../components/Reports/ReportsSideBar'

const ReportsPage = () => {
  return (
    <>
      <Grid container height={"100vh"} backgroundColor={"#eff5ff"} spacing={1}>
        <Grid item xl={2} height={"99vh"}>
          <Paper sx={{ height: "100%", borderRadius: "14px" }}>
            <ProfileReport name={"Admin"} description={"SuperAdmin@gmail.com"} />
            <ProjectsSidebar />
          </Paper>
        </Grid>
        <Grid item xl={7} height={"99vh"}>
          <Paper sx={{ height: '100%', borderRadius: '14px' }}>
            <Reports />
          </Paper>
        </Grid>
        <Grid item xl={3} height={"99vh"}>
          <Box sx={{ height: '100%', borderRadius: '14px', ...themeStyle.scrollable }}>
            <ReportsSideBar />
          </Box>
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