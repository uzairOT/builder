import { Box, Typography } from '@mui/material'
import React from 'react'
import CircularGauge from '../../UI/Charts/CircularGauge'

const ProjectProgress = () => {
  return (
    <Box width={'100%'} pl={4} pt={2}>
      <Typography textAlign={'left'} sx={themeStyle.title}>Project Progress</Typography>
      <CircularGauge value={30}/>
    </Box>
  )
}

export default ProjectProgress

const themeStyle = {
    title: {
        fontFamily: 'inherit',
        color: '#202224',
        opacity: '0.7'
    }
}