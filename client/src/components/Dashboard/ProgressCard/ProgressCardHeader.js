import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

const ProgressCardHeader = () => {
  return (
    <Box textAlign={'left'} p={2}>
          <Stack direction={'row'} justifyContent={'space-around'}>
        <Box width={'60%'}>
            <Typography p={1} sx={{...themeStyle.colorBlue, fontSize: '18px'}}>Burrow - Home Build</Typography>
            <Typography p={1} sx={{fontSize: '15px', ...themeStyle.colorGray}}>Client Name</Typography>
        </Box>
        <Box width={'40%'} pr={1}>
            <Stack direction={'row'} justifyContent={'right'}>
        <Typography p={1} sx={{...themeStyle.colorBlue, fontSize: '12px', width:'120px'}}>Pending Invoice</Typography>
        <Box sx={themeStyle.badge}>
        <Typography p={1} sx={{fontSize: '12px', backgroundColor: '#33A6F2', borderRadius: '50%',width: '15px', height: '15px', textAlign: 'center'}}>03</Typography>
        </Box>
            </Stack>
            <Stack direction={'row'} justifyContent={'right'}>
            <Typography p={1} sx={{...themeStyle.colorBlue, fontSize: '12px', width:'120px'}}>Unread Messages</Typography>
            <Box sx={themeStyle.badge}>
            <Typography p={1} sx={{fontSize: '12px', backgroundColor: '#EC3710',borderRadius: '50%', width: '15px', height: '15px', textAlign: 'center'}}>05</Typography>
            </Box>
            </Stack>
        </Box>
      </Stack>
    </Box>
  )
}

export default ProgressCardHeader
const themeStyle  = {
    colorBlue: {
        color: '#4C8AB1',
        fontFamily: 'inherit',
    },
    colorGray: {
        color: '#535353C9',
        fontFamily: 'inherit',
    },
    badge: {
        display: 'flex',
        color: '#FFF',
        fontFamily: 'inherit',
    }
}