import { Paper } from '@mui/material'
import React from 'react'
import ProjectsPermissionAccess from './ProjectPermissions'


const ProjectPermissionsView = () => {
  return (
    <Paper  style={{ ...themeStyle.borders, ...themeStyle.scrollable,  width: "100%", marginBottom:'4px', marginTop:'8px'}}>
        <ProjectsPermissionAccess/>
    </Paper>
  )
}

export default ProjectPermissionsView


const themeStyle = {
  borders: {
    borderRadius: "14px",
  },
  scrollable: {
    scrollbarWidth: 'none',  // For Firefox
    '-ms-overflow-style': 'none',  // For IE and Edge
    '&::-webkit-scrollbar': {
      width: '6px'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'transparent',
      transition: 'background-color 0.3s',
    },
    '&:hover::-webkit-scrollbar-thumb': {
      backgroundColor: '#ddd',
    },
    overflowY: 'scroll'
  }
}