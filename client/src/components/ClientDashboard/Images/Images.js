import React from 'react'
import { Paper } from '@mui/material'
import Permit from '../../Projects/Permit'
function Images() {
    return (
        <Paper flex={2} style={themeStyle.borders}>
        <Permit view={'Images'} type={'image'}/>
        </Paper>
    )
}

export default Images


const themeStyle = {
    borders: {
      borderRadius: '14px',
      height:'100%'
    }
  }
