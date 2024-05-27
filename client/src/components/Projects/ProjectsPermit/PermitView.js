import { Box, Paper } from '@mui/material'
import React from 'react'
import Permit from '../Permit'
import { Height } from '@mui/icons-material'


const PermitView = () => {
  return (
    <Paper style={themeStyle.borders}>
      <Permit view={'Permit'} type={'permit'}/>
    </Paper>
  )
}

export default PermitView
const themeStyle = {
  borders: {
    borderRadius: '14px',
    height: '100%'
  }
}