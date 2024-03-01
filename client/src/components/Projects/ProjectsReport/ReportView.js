import React from 'react'
import Reports from '../../Reports/Reports'
import { Box, Grid, Paper, Stack } from '@mui/material'
import ReportsSideBar from '../../Reports/ReportsSideBar'

const ReportView = () => {
  return (
    <Stack direction={{xl:'row', lg:'column', md:'column', sm:'column', xs:'column'}} overflow={'hidden'} spacing={1}>
    <Grid item xl={8} lg={12} md={12} sm={12} xs={12} pt={1} overflow={'hidden'} >
      <Paper sx={{height:'100%', borderRadius: '14px',}}>
    <Reports />
      </Paper>
    </Grid>
    <Grid item xl={4} lg={12} md={12} sm={12} xs={12} pt={1} overflow={'hidden'}>
    <Box>
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