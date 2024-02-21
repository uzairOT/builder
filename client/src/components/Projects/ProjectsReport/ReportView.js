import React from 'react'
import Reports from '../../Reports/Reports'
import { Box, Grid, Paper, Stack } from '@mui/material'
import ReportsSideBar from '../../Reports/ReportsSideBar'

const ReportView = () => {
  return (
    <Stack direction={'row'} spacing={1}>
    <Grid item xl={8} pt={1} height={'91vh'}>
      <Paper sx={{height:'92vh', borderRadius: '14px',...themeStyle.scrollable}}>
    <Reports />
      </Paper>
    </Grid>
    <Grid item xl={4} pt={1} height={'91vh'}>
    <Box sx={{height:'92vh', ...themeStyle.scrollable}} >
      <ReportsSideBar />
    </Box>
    </Grid>
    </Stack>
  )
}

export default ReportView

const themeStyle = {
  scrollable:{
    overflowY: 'scroll',
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
}}