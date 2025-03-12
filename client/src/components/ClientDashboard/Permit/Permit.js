import React from 'react'
import { Paper } from '@mui/material'
import Permit from '../../Projects/Permit'


function PermitClient() {

    return (
        <Paper style={themeStyle.borders}>
        <Permit view={'Permit'} type={'permit'} client={true}/>
      </Paper>
    )
}

export default PermitClient 

const themeStyle = {
    borders: {
      borderRadius: '14px',
      height:'100%'
    }
  }