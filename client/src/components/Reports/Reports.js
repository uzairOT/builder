import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import BuilderProButton from '../UI/Button/BuilderProButton';
import Card from '@mui/material/Card';
import TotalProjects from './TotalProjects';


const Reports = () => {
  return (
    <Stack p={2}>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} p={1}>
        <Typography fontSize={'22px'} fontFamily={'Poppins, sans serif'} fontWeight={'600'} color={'#4C8AB1'}>Reports</Typography>
        <Stack direction={'row'} alignItems={'center'}>
            <SearchIcon  sx={{color: '#535353C9'}}/>
            <BuilderProButton variant={'contained'} backgroundColor={'#FFAC00'} fontSize={'13px'} fontFamily={'Inter, sans serif'}>Invoice History</BuilderProButton>
        </Stack>
      </Stack>
      <Stack direction={'row'} spacing={1}>
        <Box flex={1}  sx={{border: '1px solid #D3D3D3', borderRadius: '10px'}}>
            <TotalProjects />
        </Box>
        <Box flex={2}  sx={{border: '1px solid #D3D3D3', borderRadius: '10px'}}>
       
        </Box>
      </Stack>
    </Stack>
  )
}

export default Reports
