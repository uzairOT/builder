import React from 'react'
import FileBox from '../FileBox/FileBox'
import { Paper } from '@mui/material'
import Permit from '../../Projects/Permit'
import { Height } from '@mui/icons-material'


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