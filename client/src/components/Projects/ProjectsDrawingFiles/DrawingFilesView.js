import { Paper } from '@mui/material'
import React from 'react'
import Permit from '../Permit'
import { useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const DrawingFilesView = () => {
  const [SuperAdminId, projectOrganizationId] = useOutletContext()
  const {t} = useTranslation()
  return (
    <Paper style={{height:'100%', borderRadius:'14px', display:"flex", flexDirection:"column"}}>
      <Permit view={t("ProjectFiles.ProjectDrawingFiles.title1")} type={'drawing'} projectOrganizationId={projectOrganizationId}/>
    </Paper>
  )
}

export default DrawingFilesView