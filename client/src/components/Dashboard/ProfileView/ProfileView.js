import { Box } from '@mui/material'
import React from 'react'
import Profile from './Profile'
import GTWalsheimTrial from './assets/fonts/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf';

const ProfileView = () => {
  return (
    <Box fontFamily={`${GTWalsheimTrial}, sans-serif`}>
      <Profile />
    </Box>
  )
}

export default ProfileView