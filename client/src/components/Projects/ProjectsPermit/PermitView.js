import { Box, Paper } from '@mui/material'
import React from 'react'
import Permit from '../Permit'


const PermitView = () => {
  return (
    <Paper flex={2}>
      <Permit view={'Permit'}/>
    </Paper>
  )
}

export default PermitView
