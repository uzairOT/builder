import { Grid, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import ProjectsSidebar from '../Projects/ProjectsDashboard/ProjectsSidebar'
import { Outlet, useParams } from 'react-router-dom'
import ProjectsNavbar from '../Projects/ProjectsNavbar'
import projects from './assets/data/projects'
import {useGetProjectDataQuery} from '../../redux/apis/Project/projectApiSlice';


const Layout2 = () => {
useEffect(()=>{
  console.log("layout 2")
})
    const params = useParams();
    const {id: currentProjectId} = params;
    const {data} = useGetProjectDataQuery({projectId: currentProjectId});
    // projects.find(project => project.id === parseInt(currentProjectId));
    const selectedProjectId = data?.data;
    console.log(selectedProjectId, params);
    console.log("cascasc");

  return (
    <>
    <Grid container height={"100vh"} backgroundColor={"#eff5ff"} spacing={1}>
    <Grid item xl={2} lg={3} md={4} sm={12} xs={12} height={{xl:"99vh" ,lg:'99vh', md:'99vh', sm:'80vh', xs:'80vh' }}>
          <Paper sx={{ height: "100%", borderRadius: "14px" }}>
            <Typography sx={themeStyle.title} p={2} pb={1.5}>Projects Dashboard</Typography>
            <ProjectsSidebar />
          </Paper>
        </Grid>
        <Grid item  xl={10} lg={9} md={8} sm={12} xs={12}  pr={1} height={{xl:"99vh" ,lg:'99vh',md:'100vh', sm: '100%', xs:'100%'}} sx={{ ...themeStyle.scrollable}} overflow={'hidden'}>
        <Stack><Paper sx={{ borderRadius: '14px', }}><ProjectsNavbar project={selectedProjectId} /></Paper></Stack>
        <Outlet  />
        </Grid>
    </Grid>

    </>
  )
}

export default Layout2

const themeStyle = {
  title: {
    fontSize: '22px',
    fontWeight: '500',
    fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
    color: '#000000'
},scrollable: {
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
  overflowY: 'scroll'
}
}