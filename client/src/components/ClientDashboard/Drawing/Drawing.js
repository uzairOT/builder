import React, { useState } from 'react'
import FileBox from '../FileBox/FileBox'
import { Paper } from '@mui/material'
import Permit from '../../Projects/Permit'
import { Height } from '@mui/icons-material'

function Drawing() {


    return (
        // <div style={{ width: "100%", marginBottom: "1rem" }}>
        //     <FileBox titleHeading={"Drawing"} buttonName={"Add Drawing"} modalHeading={"Drawing Files"} />
        // </div>
        <Paper style={themeStyle.borders}>
        <Permit view={'Permit'} type={'permit'} client={true}/>
      </Paper>
    )
}

export default Drawing
const themeStyle = {
    borders: {
      borderRadius: '14px',
      height:'100%'
    }
  }