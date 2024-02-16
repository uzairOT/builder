import { Paper, Stack } from '@mui/material'
import React from 'react'

const ProjectsDefault = () => {
  return (
    <>
      <Stack direction={'row'} pt={1} spacing={1}>
        <Stack flex={2}><Paper>Projects accounts</Paper></Stack>
        <Stack flex={8}><Paper>Project </Paper></Stack>
        </Stack>
        <Stack direction={'row'} pt={1} spacing={1}>
        <Stack flex={1}><Paper>yoo</Paper></Stack>
        <Stack flex={1}><Paper>yoo</Paper></Stack>
        </Stack>
    </>
  )
}

export default ProjectsDefault
