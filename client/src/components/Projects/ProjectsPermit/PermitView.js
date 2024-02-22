import { Box, Paper } from '@mui/material'
import React from 'react'
import Permit from '../Permit'


const PermitView = () => {
  return (
    <Paper style={themeStyle.borders}>
      <Permit view={'Permit'}/>
    </Paper>
  )
}

export default PermitView
const themeStyle = {
  borders: {
    borderRadius: '14px'
  }
}