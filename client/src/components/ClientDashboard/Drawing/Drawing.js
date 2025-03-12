import React from 'react'
import { Paper } from '@mui/material'
import Permit from '../../Projects/Permit'

function Drawing() {


    return (
        // <div style={{ width: "100%", marginBottom: "1rem" }}>
        //     <FileBox titleHeading={"Drawing"} buttonName={"Add Drawing"} modalHeading={"Drawing Files"} />
        // </div>
        <Paper style={themeStyle.borders}>
        <Permit view={'Drawing & Files'} type={'drawing'} client={true}/>
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