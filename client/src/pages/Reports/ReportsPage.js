import { Box, Grid, Paper } from '@mui/material'
import React from 'react'
import ProjectsSidebar from '../../components/Projects/ProjectsDashboard/ProjectsSidebar'
import ProfileReport from './ProfileReport'
import Reports from '../../components/Reports/Reports'

const ReportsPage = () => {
  return (
   <>
   <Grid container height={"100vh"} backgroundColor={"#eff5ff"} spacing={1}>
   <Grid item xl={2} height={"99vh"}>
          <Paper sx={{ height: "100%", borderRadius: "14px" }}>
            <ProfileReport />
            <ProjectsSidebar />
          </Paper>
    </Grid>
    <Grid item xl={7}>
        <Paper>
            <Reports />
        </Paper>
    </Grid>
    <Grid item xl={3}>
        <Box>yoo</Box>
    </Grid>
   </Grid>
   </>
  )
}

export default ReportsPage