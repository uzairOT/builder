import { Box, Typography } from '@mui/material'
import React from 'react'
import Profile from './Profile'
import ListProjects from './ListProjects';

const ProfileView = () => {
  return (
    <Box fontStyle={'var(--main-font-family)'} height={'100%'}>
      <Typography variant='h6' sx={themeStyle.title}></Typography>
      {/* <hr/> */}
      <Profile />
      <ListProjects />
    </Box>
  )
}

export default ProfileView

const themeStyle = {
  title: {
    fontWeight: "400",
    fontSize: {xs:'20px', sm:'21px',md:"21px", lg:'21px', xl:'25px'},
    lineHeight: "normal",
    padding: 2,
    fontFamily: 'var(--main-font-family)',
    textAlign: "left",
    color:'#4C8AB1'
  }
}
