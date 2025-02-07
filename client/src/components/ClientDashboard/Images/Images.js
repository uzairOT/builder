import React from 'react'
import { Paper } from '@mui/material'
import Permit from '../../Projects/Permit'
import { useOutletContext } from 'react-router-dom'
function Images() {
  const [projectName, projectLocation, projectOrganizationId] = useOutletContext()
    return (
        <Paper flex={2} style={themeStyle.borders}>
        <Permit view={'Images'} type={'image'} projectOrganizationId={projectOrganizationId}/>
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
