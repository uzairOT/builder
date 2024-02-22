import { Divider, Stack } from '@mui/material'
import React from 'react'
import ProjectInfo from './ProjectInfo'
import ProjectTeam from './ProjectTeam'

const ProjectInfoAndTeam = () => {
  return (
    <Stack direction={'row'}>
        <Stack width={'100%'}  p={1} pl={3} pr={3} ><ProjectInfo /></Stack>
        <Divider sx={{borderWidth:'0.8px', color:'#E4E4E4'}} />
        <Stack width={'100%'}  p={1} pl={3} pr={3} ><ProjectTeam /></Stack>
    </Stack>
  )
}

export default ProjectInfoAndTeam