import { CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import ProjectsSidebar from '../Projects/ProjectsDashboard/ProjectsSidebar'
import { Outlet, useParams } from 'react-router-dom'
import ProjectsNavbar from '../Projects/ProjectsNavbar'
import projects from './assets/data/projects'
import {useGetProjectDataQuery} from '../../redux/apis/Project/projectApiSlice';
import { useDispatch, useSelector } from 'react-redux'
import { useGetProjectUserRoleMutation } from '../../redux/apis/Project/userProjectApiSlice'
import { authUserRole, getUserRoleFromRedux, setUserRoleError, setUserRoleIsLoading } from '../../redux/slices/auth/userRoleSlice'


const Layout2 = () => {
useEffect(()=>{
  //console.log("layout 2")
})
    const params = useParams();
    const {id: currentProjectId} = params;
    const {data} = useGetProjectDataQuery({projectId: currentProjectId});
    const isAuthenticated = useSelector((state) => state.auth.userInfo);
    const userId = isAuthenticated ? isAuthenticated.user.id : null;
    const [getUserRole, {isLoading}] = useGetProjectUserRoleMutation();
    const userRole = useSelector(getUserRoleFromRedux);
    const dispatch = useDispatch();
    // projects.find(project => project.id === parseInt(currentProjectId));
    const selectedProjectId = data?.data;
    const projectName = selectedProjectId?.projectName;
    //console.log(selectedProjectId, params);
    //console.log("cascasc");
    // console.log('APP.JS: ',id)

    const getUserRoleAuth = async () => {
      if(currentProjectId){
        try{
          dispatch(setUserRoleIsLoading(true));
          const res = await getUserRole({projectId: currentProjectId, userId: userId});
          dispatch(authUserRole(res.data.role));
        } catch(error){
          console.log(error)
          dispatch(setUserRoleError(error));
        } finally{
          dispatch(setUserRoleIsLoading(false));
        }
      }
      // if(res.data.role === 'client'){
      //   navigate(`/projects/${projectId}/client`);
      // } else{
        
      //   navigate(`/projects/${projectId}/${path}`);
      // }
      
    };
    
  useEffect(() => {
    getUserRoleAuth();
  }, [currentProjectId]);

  return (
    <>
    <Grid container height={{xl:'calc(93vh + 8px)', lg:'100%', md:'100%', sm:'100%', xs:'100%'} }  backgroundColor={"#eff5ff"} spacing={1}>
    <Grid item xl={2} lg={3} md={4} sm={12} xs={12} height={"93vh"} sx={{display:{xs:"none",sm:"block"}, }}>
          <Paper sx={{ height: "100%", borderRadius: "14px" }}>
            <Typography sx={themeStyle.title} p={2} pb={1.5}>Projects Dashboard</Typography>
            <ProjectsSidebar />
          </Paper>
        </Grid>
        <Grid item  xl={10} lg={9} md={8} sm={12} xs={12}  pr={1}  height={{xl:"93vh" ,lg:'93vh', md:'99vh', sm:'93vh', xs:'93vh' }} sx={themeStyle.scrollable} overflow={'hidden'}>
        <Stack><Paper sx={{ borderRadius: '14px', }}><ProjectsNavbar project={selectedProjectId} /></Paper></Stack>
        {userRole.isLoading ?<Stack m={'auto'} width={'100%'} height={'100%'} justifyContent={'center'} alignItems={'center'}><CircularProgress /></Stack> : <Outlet context={[projectName]}  />}
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