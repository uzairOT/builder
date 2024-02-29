import { Grid, Paper, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ProjectList from '../../components/Projects/ProjectTable/ProjectList'
import { useLoaderData, useNavigation } from 'react-router-dom'

const ProjectsTable = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData =  async () => {
      try{
        setIsLoading(true);
        const res = await fetch("https://my.api.mockaroo.com/bui.json?key=64d2dd90");
        const data = await res.json();
        setData(data);
      }catch(err){
        throw new Error(err.message);
      } finally{
        setIsLoading(false);
      }

    }

    fetchData();
  }, [])

  return (
    <main>
      <Grid sx={themeStyle.dashboard} container>
      <Grid item p={2} xl={12} lg={12} md={12} sx={12} xs={12}>
        <Paper  style={{height:'100%', borderRadius:'14px'}}>
          <ProjectList rows={data} isLoading={isLoading}/>
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

export const loader = async () => {
  const res = await fetch("https://my.api.mockaroo.com/bui.json?key=64d2dd90");
  const data = await res.json();

  return data
}