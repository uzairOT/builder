import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Grid, Paper, Stack } from '@mui/material'
import projects from './assets/data/projects.json'
import { useLocation } from 'react-router-dom'
import ProjectsNavbar from '../../components/Projects/ProjectsNavbar'
import ProjectsDashboard from '../../components/Projects/ProjectsDashboard/ProjectsDashboard'
import ProjectsDefault from '../../components/Projects/ProjectsDefault/ProjectsDefault'



const Projects = () => {
    const location = useLocation();
    const currentUrl = location.pathname;
    const currentProjectId = (currentUrl.match(/\/projects\/([^/]+)\/default/) || [])[1];

    const selectedProjectId = projects.find(project => toString(project.id) === toString(currentProjectId));
  return (
    <>
      <Navbar />
      <Grid container  height={'100vh'} backgroundColor={'#eff5ff'} spacing={1}>
      
        <Grid item xl={2} height={'99vh'}>
            <Paper sx={{height:'100%', borderRadius: '14px'}}><ProjectsDashboard /></Paper>
            </Grid>
        <Grid item  xl={10} pr={1}>
        <Stack ><Paper sx={{height:'100%', borderRadius: '14px'}}><ProjectsNavbar project={selectedProjectId} /></Paper></Stack>
        <>
        <ProjectsDefault />
        </>
        </Grid>
      
      </Grid>
    </>
  )
}

export default Projects
