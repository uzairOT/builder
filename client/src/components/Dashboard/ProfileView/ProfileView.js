import { Box, Typography } from '@mui/material'
import React from 'react'
import Profile from './Profile'
import ListProjects from './ListProjects';

const ProfileView = () => {
  return (
    <Box fontStyle={'GT-Walsheim-Regular-Trial, sans-serif'} height={'100%'}>
      <Typography variant='h6' sx={themeStyle.title}>Dashboard</Typography>
      <Profile />
      <ListProjects />
    </Box>
  )
}

export default ProfileView

const themeStyle = {
  title: {
    fontWeight: "400",
    fontSize: "25px",
    lineHeight: "normal",
    padding: 2,
    fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
    textAlign: "left",
  }
}