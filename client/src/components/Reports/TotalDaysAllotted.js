import { Box, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import CircleIcon from '@mui/icons-material/Circle';




const TotalDaysAllotted = () => {
    const data = {
        "totalDays": 14,
        "daysSpent": 14,
        "daysRemaining": 2,
        
    }

  return (
    <Stack>
      <Typography fontSize={'15px'} fontWeight={'500'} fontFamily={'Inter, sans serif'} p={1} pl={2}>Total Projects</Typography>
      <Typography fontSize={'27px'} fontWeight={'500'} fontFamily={'Inter, sans serif'} p={'0px 8px 8px 16px'}>15</Typography>
      <Divider variant='fullWidth' />
        <Stack width={250} direction={'row'} p={2} py={3}>
            <Box backgroundColor={'#2D9CDB'} width={((250*10)/14)} height={'20px'} borderRadius={'14px'}>
            </Box>
            <Box backgroundColor={'#90BE6D'} width={(250*4)/14} height={'20px'} borderRadius={'14px'}>
            </Box>
        </Stack>
        <Stack direction={'column'} spacing={1} width={'70%'} pb={2} pl={3} >
            <Stack direction={'row'} justifyContent={'space-between'}>
            <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <CircleIcon sx={{color:'#2D9CDB', fontSize: '10px'}} />
            <Typography fontFamily={'Inter, sans serif'} fontSize={'12px'}>Work Days spent</Typography>
            </Stack>
            <Typography textAlign={'right'}>10</Typography>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'}>
            <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <CircleIcon sx={{color:'#90BE6D', fontSize: '10px'}} />
            <Typography fontFamily={'Inter, sans serif'} fontSize={'12px'}>Work Days Remaining</Typography>
            </Stack>
            <Typography textAlign={'center'}>4</Typography>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'}>
            <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <CircleIcon sx={{color:'#F94144', fontSize: '10px'}} />
            <Typography fontFamily={'Inter, sans serif'} fontSize={'12px'}>Work Days Overdue</Typography>
            </Stack>
            <Typography textAlign={'center'}>0</Typography>
            </Stack>
           </Stack>
    </Stack>
  )
}

export default TotalDaysAllotted
