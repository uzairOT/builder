import { Box, Modal, Stack, Typography } from '@mui/material'
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
import ProjectsInvoices from '../Projects/ProjectInvoices/ProjectsInvoices';


const Reports = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
    <Stack p={2} spacing={1}>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} p={1} >
        <Typography fontSize={{xl:'22px', lg:"18px",md:'22px',xs:'22px',}} fontFamily={'Poppins, sans serif'} fontWeight={'600'} color={'#4C8AB1'}>Reports</Typography>
        <Stack direction={'row'} alignItems={'center'}>
            {/* <SearchIcon  sx={{color: '#535353C9'}}/> */}
            <BuilderProButton variant={'contained'} backgroundColor={'#FFAC00'} fontSize={'13px'} fontFamily={'Inter, sans serif'} handleOnClick={handleOpen}>Invoice History</BuilderProButton>
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
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
          <ProjectsInvoices isModal={true} handleClose={handleClose}/>
          
        </Box>
      </Modal>
    </>
  )
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {md:'50%', xs:'98%'},
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 0.5,
};

export default Reports
