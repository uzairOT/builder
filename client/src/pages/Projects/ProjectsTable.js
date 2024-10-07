import { Grid, Paper, Stack } from '@mui/material'
import React from 'react'
import ProjectList from '../../components/Projects/ProjectTable/ProjectList'
import { useSelector } from 'react-redux'
import { projectsPackage } from '../../redux/slices/Project/userProjectsSlice'

const ProjectsTable = () => {
  const local = localStorage.getItem('userInfo');
  const currentUser = JSON.parse(local);
  const currentUserId = currentUser.user.id;
  const projects = useSelector(projectsPackage)

  return (
    <main>
      <Grid sx={themeStyle.dashboard} container>
      <Grid item p={2} xl={12} lg={12} md={12} sx={12} xs={12}>
        <Paper  style={{height:'100%', borderRadius:'14px'}}>
          {projects?.error ?  <Stack justifyContent={'center'} alignItems={'center'}>{projects?.error?.data?.message}</Stack> : <ProjectList currentUserId={currentUserId} totalPages={projects?.totalPages} limit={projects?.limit} totalCount={projects?.totalCount} rows={projects.projects[0]} isLoading={projects?.isLoading}/>}
        </Paper>
      </Grid>
      </Grid>
    </main>
  )
}

export default ProjectsTable

const themeStyle = {
  dashboard: {
    backgroundColor: "#eff5ff",
    height: "93vh",
  },
}

export const loader = async () => {
  // const res = await fetch("https://my.api.mockaroo.com/bui.json?key=64d2dd90");
  // const data = await res.json();

  return 
}