import { Box, Typography } from '@mui/material'
import React from 'react'
import Profile from './Profile'
import GTWalsheimTrial from './assets/fonts/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf';
import ListProjects from './ListProjects';

const ProfileView = () => {
  return (
    <Box fontFamily={`${GTWalsheimTrial}, sans-serif`}>
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
    fontFamily: 'inherit',
    textAlign: "left",
  }
}
