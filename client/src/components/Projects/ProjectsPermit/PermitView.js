import { Paper } from '@mui/material'
import React from 'react'
import Permit from '../Permit'
import { useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
const PermitView = () => {
  const [SuperAdminId, projectOrganizationId] = useOutletContext()
  const {t} = useTranslation()
  return (
    <Paper style={themeStyle.borders}>
      <Permit view={t("ProjectFiles.ProjectPermit.title1")} type={'permit'} projectOrganizationId={projectOrganizationId}/>
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