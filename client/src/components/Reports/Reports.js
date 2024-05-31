import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import BuilderProButton from '../UI/Button/BuilderProButton';
import Card from '@mui/material/Card';
import TotalProjects from './TotalProjects';
import BudgetPieChartCard from './BudgetPieChartCard';
import ProfitMarginBarChartCard from './ProfitMarginBarChartCard';
import PaidTransactionsCard from './PaidTransactionsCard';
import TotalDaysAllotted from './TotalDaysAllottedView';
import TotalDaysAllottedView from './TotalDaysAllottedView';


const Reports = () => {
  return (
    <Stack p={2} spacing={1}>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} p={1} >
        <Typography fontSize={'22px'} fontFamily={'Poppins, sans serif'} fontWeight={'600'} color={'#4C8AB1'}>Reports</Typography>
        <Stack direction={'row'} alignItems={'center'}>
            {/* <SearchIcon  sx={{color: '#535353C9'}}/> */}
            <BuilderProButton variant={'contained'} backgroundColor={'#FFAC00'} fontSize={'13px'} fontFamily={'Inter, sans serif'}>Invoice History</BuilderProButton>
        </Stack>
      </Stack>
      <Stack flex={1} direction={{xl:'row', lg:'row', md:'column', sm:'column', xs:'column'}} spacing={1}>
        {/* Total Projects */}
        <Box flex={2}  sx={{border: '1px solid #D3D3D3', borderRadius: '10px'}}>
            <TotalProjects />
        </Box>
        <Box flex={3}  sx={{border: '1px solid #D3D3D3', borderRadius: '10px'}}>
          <TotalDaysAllottedView />
        </Box>
      </Stack>
      <Stack flex={1} direction={{xl:'row', lg:'row', md:'column', sm:'column', xs:'column'}} spacing={1}>
        {/* Total Projects */}
        <Box flex={1} sx={{border: '1px solid #D3D3D3', borderRadius: '10px'}}>
          <BudgetPieChartCard />
        </Box>
        <Box flex={1}  sx={{border: '1px solid #D3D3D3', borderRadius: '10px'}}>
          <ProfitMarginBarChartCard />
        </Box>
        <Box flex={1}  sx={{border: '1px solid #D3D3D3', borderRadius: '10px'}}>
            <PaidTransactionsCard />
        </Box>
      </Stack>
    </Stack>
  )
}

export default Reports
