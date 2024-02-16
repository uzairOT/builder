import { Grid, Paper, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import ProjectsSidebar from '../Projects/ProjectsDashboard/ProjectsSidebar'
import { Outlet, useParams } from 'react-router-dom'
import ProjectsNavbar from '../Projects/ProjectsNavbar'
import projects from './assets/data/projects'


const Layout2 = () => {
useEffect(()=>{
  console.log("layout 2")
})
    const params = useParams();
    const {id: currentProjectId} = params;
    const selectedProjectId = projects.find(project => toString(project.id) === toString(currentProjectId));
    console.log(selectedProjectId, params);
    console.log("cascasc");

  return (
    <>
    <Grid container height={"100vh"} backgroundColor={"#eff5ff"} spacing={1}>
    <Grid item xl={2} height={"99vh"}>
          <Paper sx={{ height: "100%", borderRadius: "14px" }}>
            <ProjectsSidebar />
          </Paper>
        </Grid>
        <Grid item  xl={10} pr={1}>
        <Stack><Paper sx={{height:'100%', borderRadius: '14px'}}><ProjectsNavbar project={selectedProjectId} /></Paper></Stack>
        <Outlet/>
        </Grid>
    </Grid>

    </>
  )
}

export default Layout2
