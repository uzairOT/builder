import { Box, Paper } from '@mui/material'
import React from 'react'
import Permit from '../Permit'

const DrawingFilesView = () => {
  return (
    <Paper flex={2}>
      <Permit view={"Drawing Files"}/>
    </Paper>
  )
}

export default DrawingFilesView