import { Box, Paper } from '@mui/material'
import React from 'react'
import Permit from '../Permit'

const ImagesView = () => {
  return (
    <Paper flex={2}>
       <Permit view={'Images'} type={'image'}/>
    </Paper>
  )
}

export default ImagesView
