import { Grid, Paper, Stack } from '@mui/material'
import React from 'react'
import ProjectList from '../../components/Projects/ProjectTable/ProjectList'

const ProjectsTable = () => {
  return (
    <main>
      <Grid sx={themeStyle.dashboard} container>
      <Grid item p={2} xl={12}>
        <Paper style={{height:'100%', borderRadius:'14px'}}>
          <ProjectList />
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
    height: "100vh",
  },
}