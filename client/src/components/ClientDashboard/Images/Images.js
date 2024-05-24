import React from 'react'
import FileBox from '../FileBox/FileBox'
import { Paper } from '@mui/material'
import Permit from '../../Projects/Permit'
function Images() {
    return (
        // <div style={{ width: "100%", marginBottom: "1rem" }}>
        //     <FileBox titleHeading={"Images"} buttonName={"Add Images"} modalHeading={"Images"} />
        // </div>
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
