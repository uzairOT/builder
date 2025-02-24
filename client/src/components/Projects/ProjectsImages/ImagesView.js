import { Paper } from '@mui/material'
import React from 'react'
import Permit from '../Permit'
import { useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
const ImagesView = () => {
  const [SuperAdminId, projectOrganizationId] = useOutletContext()
  const {t} = useTranslation()
  return (
    <Paper flex={2} style={{height:'100%', borderRadius:'14px'}}>
       <Permit view={t("ProjectFiles.ProjectImages.title1")} type={'image'}  projectOrganizationId={projectOrganizationId}/>
    </Paper>
  )
}

export default ImagesView
