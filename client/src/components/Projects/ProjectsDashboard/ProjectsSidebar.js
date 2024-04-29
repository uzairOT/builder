import { Box, Divider, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BuilderProButton from '../../UI/Button/BuilderProButton'
import { Link, useParams } from 'react-router-dom'
import ProjectCard from '../../UI/Card/ProjectCard'
import projects from './assets/data/projects.json'
import { useGetUserProjectsQuery } from "../../../redux/apis/Project/userProjectApiSlice";
import {useDispatch} from 'react-redux';
import {addProjects} from '../../../redux/slices/Project/userProjectsSlice'

const ProjectsSidebar = () => {
    const [activeBtn, setActiveBtn] = useState('remodel')
    const dispatch = useDispatch();
    const local = localStorage.getItem('userInfo');
    const currentUser = JSON.parse(local);
    const currentUserId = currentUser.user.id
    const handleListedProjectsButton = (btn)=>{
        setActiveBtn(btn);
    }
    const {id} = useParams();
    //console.log(id);
    const {data, isLoading, error} = useGetUserProjectsQuery({userId: currentUserId});
    useEffect(() => {
      //console.log(data)
      if(data){
        dispatch(addProjects(data))
      }
    },[data, dispatch])
    if(isLoading){
      return <>Loading...</>
    }
  return (
    <>
        <Stack p={2}>
            {/* PROJECT DASHBOARD */}
            <Typography sx={themeStyle.subtile} pb={1.5}>User Projects</Typography>
            <Divider  variant='fullWidth'sx={{marginLeft:'2px',marginRight:'2px'}}/>

            {/* LIST OF PROJECTS */}
            <Typography sx={themeStyle.listTitle} pt={1.5} pb={4}>All listed Projects</Typography>

            {/* BUTTON STACK */}
            <Stack direction={'row'}  ml={'-16px'} mr={'-16px'} justifyContent={'center'} >
            <BuilderProButton variant={'contained'} marginLeft={'4px'} padding={'8px 8px'} backgroundColor={activeBtn === 'remodel' ? '#FFCA5B' : '#F2F2F2'} handleOnClick={() => {handleListedProjectsButton('remodel')}}>
                <Typography fontSize={'11px'} fontWeight={'500'} color={'black'} fontFamily={ 'Inter, sans-serif'} width={'100%'}>
                Remodel
                </Typography>
                </BuilderProButton>
            <BuilderProButton variant={'contained'} marginLeft={'4px'} padding={'8px 8px'} backgroundColor={activeBtn === 'newbuild' ? '#FFCA5B' : '#F2F2F2'} handleOnClick={() => {handleListedProjectsButton('newbuild')}}>
            <Typography fontSize={'11px'} fontWeight={'500'}color={'black'} fontFamily={ 'Inter, sans-serif'} width={'100%'}>

             New build
            </Typography>
                </BuilderProButton>
            <BuilderProButton variant={'contained'} marginLeft={'4px'} padding={'8px 8px'} backgroundColor={activeBtn === 'commercial' ? '#FFCA5B' : '#F2F2F2'} handleOnClick={() => {handleListedProjectsButton('commercial')}}>
            <Typography fontSize={'11px'} fontWeight={'500'} color={'black'} fontFamily={ 'Inter, sans-serif'}>
                Commercial
                </Typography>
                </BuilderProButton>
            </Stack>
        <Box sx={{...themeStyle.scrollable,height:{xl:'70vh',lg:'70vh',md:"70vh",sm:"50vh",xs:"48vh"} }} >
        <Stack spacing={1} pl={2} pr={2} pt={1} >
          <>
          {data?.projects?.map((projectProfileCard) => {
            const selected = projectProfileCard.id == id;
            if(projectProfileCard.buildType === activeBtn){
            return (
              <Link key={projectProfileCard.id} to={`/projects/${projectProfileCard.id}`} style={{textDecoration:'none'}}>
              <ProjectCard
              projectProfileCard={projectProfileCard}
              selected={selected}
              />
              </Link>
              );} else {
                return <></>
              }
            })}
            </>
        </Stack>
            </Box>
        </Stack>
    </>
  )
}

export default ProjectsSidebar

const themeStyle = {
    title: {
        fontSize: '22px',
        fontWeight: '500',
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        color: '#000000'
    },
    subtile:{
        fontSize: '16px',
        fontWeight: '500',
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        color: '#4C8AB1'
    },
    listTitle:{
        fontSize: '12px',
        fontWeight: '500',
        fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
        color: '#535353C9'
    },
  scrollable: {
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
