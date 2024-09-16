import { Paper } from '@mui/material'
import React from 'react'
import ProjectsChangeOrder from '../../components/Projects/ProjectsChangeOrder/ProjectsChangeOrder'

const ChangeOrder = () => {
  return (
    <Paper style={{ ...themeStyle.borders, width: "99%", marginBottom:'4px', height: '100%', marginTop:'8px'}}>
      <ProjectsChangeOrder />
    </Paper>
  )
}

export default ChangeOrder

const themeStyle = {
    borders: {
      borderRadius: "14px",
      padding: "8px",
    },
    border: {
      borderRadius: '14px'
    }
  };
  
  
  
  