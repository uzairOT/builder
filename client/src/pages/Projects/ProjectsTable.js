import { Grid, Paper, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ProjectList from '../../components/Projects/ProjectTable/ProjectList'
import { useGetUserProjectsQuery } from '../../redux/apis/Project/userProjectApiSlice'

const ProjectsTable = () => {

  // const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const fetchData =  async () => {
  //     try{
  //       setIsLoading(true);
  //       const res = await fetch("https://my.api.mockaroo.com/bui.json?key=64d2dd90");
  //       const data = await res.json();
  //       setData(data);
  //     }catch(err){
  //       throw new Error(err.message);
  //     } finally{
  //       setIsLoading(false);
  //     }

  //   }

  //   fetchData();
  // }, [])
  // const dispatch = useDispatch();
  const local = localStorage.getItem('userInfo');
  const currentUser = JSON.parse(local);
  const currentUserId = currentUser.user.id
  //console.log('LIST PROJECTS:', currentUserId)
  const {data, isLoading, error} = useGetUserProjectsQuery({userId: currentUserId});
  //console.log(data);

  return (
    <main>
      <Grid sx={themeStyle.dashboard} container>
      <Grid item p={2} xl={12} lg={12} md={12} sx={12} xs={12}>
        <Paper  style={{height:'100%', borderRadius:'14px'}}>
          {error ?  <Stack justifyContent={'center'} alignItems={'center'}>{error.data.message}</Stack> : <ProjectList rows={data?.projects} isLoading={isLoading}/>}
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
  // const res = await fetch("https://my.api.mockaroo.com/bui.json?key=64d2dd90");
  // const data = await res.json();

  return 
}