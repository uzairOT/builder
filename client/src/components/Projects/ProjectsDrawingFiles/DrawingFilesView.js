import { Box, Paper } from '@mui/material'
import React from 'react'
import Permit from '../Permit'


const DrawingFilesView = () => {
  return (
    <Paper flex={2} style={{height:'100%', borderRadius:'14px'}}>
      <Permit view={"Drawing & Files"} type={'drawing'}/>
    </Paper>
  )
}

export default DrawingFilesView