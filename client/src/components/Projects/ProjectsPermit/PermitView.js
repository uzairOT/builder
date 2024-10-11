import { Paper } from '@mui/material'
import React from 'react'
import Permit from '../Permit'
import { useOutletContext } from 'react-router-dom'

const PermitView = () => {
  const [SuperAdminId, projectOrganizationId] = useOutletContext()
  return (
    <Paper style={themeStyle.borders}>
      <Permit view={'Permit'} type={'permit'} projectOrganizationId={projectOrganizationId}/>
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