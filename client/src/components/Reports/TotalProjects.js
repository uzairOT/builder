import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import ReportsPieChart from './ReportsPieChart'
import CircleIcon from '@mui/icons-material/Circle';

const TotalProjects = () => {
  return (
    <Stack p={1}>
        <Typography fontSize={'15px'} fontWeight={'500'} fontFamily={'Inter, sans serif'} p={1}>Total Projects</Typography>
        <Stack direction={'row'}>
        <Stack flex={1}>
            <Typography fontSize={'27px'} fontWeight={'500'} fontFamily={'Inter, sans serif'} p={'0px 8px 8px 8px'}>15</Typography>
            <Stack direction={'row'} spacing={1} alignItems={'center'}>
                {/* <Box backgroundColor={'#45A5F6'} width={'10px'} height={'10px'} borderRadius={'50px'}></Box> */}
                <CircleIcon sx={{color:'#45A5F6', fontSize: '10px'}} />
                <Typography fontFamily={'Inter, sans serif'} fontSize={'12px'}>Done</Typography>
            </Stack>
            <Typography pl={2} fontFamily={'Inter, sans serif'} fontSize={'18px'}>3</Typography>
            <Stack direction={'row'} spacing={1} alignItems={'center'}>
                {/* <Box backgroundColor={'#45A5F6'} width={'10px'} height={'10px'} borderRadius={'50px'}></Box> */}
                <CircleIcon sx={{color:'#DDE6FE', fontSize: '10px'}} />
                <Typography fontFamily={'Inter, sans serif'} fontSize={'12px'}>Remaining</Typography>
            </Stack>
            <Typography pl={2} fontFamily={'Inter, sans serif'} fontSize={'18px'}>12</Typography>
        </Stack>
        <Stack flex={2} justifyContent={'center'}>
            <ReportsPieChart />
        </Stack>
        </Stack>
    </Stack>
  )
}

export default TotalProjects