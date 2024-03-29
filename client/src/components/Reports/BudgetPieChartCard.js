import { Box, Button, Divider, Modal, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BudgetPieChart from './BudgetPieChart'
import CircleIcon from '@mui/icons-material/Circle';
import SelectMenuBarChart from './SelectMenuBarChart';
import BuilderProButton from '../UI/Button/BuilderProButton';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GenerateInvoiceTable from '../dialogues/GenerateInvoice/GenerateInvoiceTable';
import GenerateInvoicePopup from '../dialogues/GenerateInvoice/GenerateInvoicePopup';
import ShareModal from '../dialogues/ShareModal/ShareModal';
import GenerateInvoiceDone from '../dialogues/GenerateInvoice/GenerateInvoiceDone';

const BudgetPieChartCard = () => {
  const [open,setOpen] = useState(false);
  const [generateInvoice,setGenerateInvoice] = useState(false);
  const [shareToClient,setShareToClient] = useState(false);
  const [done,setDone] = useState(false);

  const listItems = [
    {"listItem": "List Item #1"},
    {"listItem": "List Item #1"},
    {"listItem": "List Item #1"},
  ]

  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  const handleGenerateInvoice = () => {
    setGenerateInvoice(true);
  }

  useEffect(()=> {
    console.log("Open: ", open)
    console.log("Generate Invoice: ", generateInvoice)
    console.log("shareToClient: ", shareToClient)
  },[generateInvoice, open, shareToClient])
  return (
    <>
    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} p={1} pl={2} pr={2}>
       <Typography fontSize={'20px'} fontFamily={'Inter, sans serif'} fontWeight={'500'} color={'#4C8AB1'}>Phase Name</Typography>
       <Typography color={'#606060'} fontFamily={'Inter, sans serif'} fontWeight={'500'} fontSize={'13px'}>Total Amount</Typography>
    </Stack>
    <Divider variant='fullWidth'/>
    <Stack>
       <SelectMenuBarChart  listItems={listItems}/>
       <BudgetPieChart />
       <Typography pl={3} fontFamily={'Inter, sans serif'} fontWeight={'500'} fontSize={'24px'}>$ 31000.8</Typography>
       <Typography pl={3} fontFamily={"Inter, sans serif"} fontSize={'12px'} color={'#4F4F4F'}>Total</Typography>
       <Stack direction={'row'} justifyContent={'space-around'} spacing={1} pt={2} pb={4}>
            <Stack direction={'row'} spacing={1}>
            <CircleIcon sx={{color:'#F8961E', fontSize: '10px', paddingTop: '4px'}} />
            <Stack direction={'column'} >
            <Typography fontFamily={'Inter, sans serif'} fontSize={'12px'}>Used</Typography>
            <Typography textAlign={'right'} fontFamily={'Inter, sans serif'} fontWeight={'500'}>$ 25,834</Typography>
            </Stack>
            </Stack>
            <Stack direction={'row'} spacing={1}>
            <CircleIcon sx={{color:'#F94144', fontSize: '10px', paddingTop:'4px'}} />
            <Stack direction={'column'}>
            <Typography fontFamily={'Inter, sans serif'} fontSize={'12px'}>Remaining</Typography>
            <Typography textAlign={'center'} fontFamily={'Inter, sans serif'} fontWeight={'500'}>$ 5166.8</Typography>
            </Stack>
            </Stack>
           </Stack>
        <Divider variant='fullWidth' />
        <Stack p={1.5}>
          <Button onClick={handleOpen}>
          <Typography textAlign={'center'} fontSize={'15px'} fontFamily={'Inter, sans serif'} fontWeight={'500'} color={'#4C8AB1'}>Generate Invoice</Typography>
          </Button>
        </Stack>
    </Stack>
{  open &&  <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
  sx={{...scrollable, height:'100%', width:{xs:'80%'}}}
>
  <Box sx={style} >
  <Stack direction={{xl:'row', lg:'row', md:'row', sm:'row', xs:'column'}} justifyContent={'space-between'} alignItems={'center'} p={2} >
        <Typography fontSize={'24px'} fontFamily={'inherit'} fontWeight={'600'} color={'#4C8AB1'}>Generate Invoice</Typography>
        <Stack direction={'row'} alignItems={'center'}>
            <BuilderProButton variant={'contained'} backgroundColor={'#4C8AB1'} fontSize={'16px'} fontFamily={'Inter, sans serif'}>Download Invoice</BuilderProButton>
        </Stack>
      </Stack>
      <Stack direction={{xl:'row',lg:'row',md:'row',sm:'row', xs:'column'}} justifyContent={'space-between'} alignItems={'center'} p={1} pl={2} pr={2}>
        <Stack spacing={1} >
          <Typography sx={modalStyle}>Your Company</Typography>
          <Typography sx={modalStyle}>Your Name</Typography>
          <Typography sx={modalStyle}>Company Address</Typography>
          <Typography sx={modalStyle}>City,State Zip</Typography>
          <Typography sx={modalStyle}>USA</Typography>
        </Stack>
        <Stack direction={'row'} spacing={4}>
          <Stack spacing={1}>
          <Typography sx={modalStyle} fontWeight={'bold'}>Invoice#</Typography>
          <Typography sx={modalStyle} fontWeight={'bold'}>Invoice Date</Typography>
          <Typography sx={modalStyle} fontWeight={'bold'}>Due Date</Typography>
          </Stack>
          <Stack spacing={1}>
          <Typography sx={modalStyle}>INV -12#</Typography>
          <Stack direction={'row'} spacing={0.5}>
            <CalendarTodayIcon fontSize='small'  style={{color:'lightgray'}}/>
          <Typography sx={modalStyle}>05 Feb 2024</Typography>
          </Stack>
          <Stack direction={'row'} spacing={0.5}>
            <CalendarTodayIcon fontSize='small'  style={{color:'lightgray'}}/>
          <Typography sx={modalStyle}>05 Feb 2024</Typography>
          </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack justifyContent={'center'} alignItems={'center'} width={{xl:'100%', lg:'100%', md:'100%', sm:'100%', xs:'80%'}} >
          <GenerateInvoiceTable />
      </Stack>
      <Stack direction={{xl:'row', lg:'row', md:'column'}} justifyContent={'space-between'} p={4} spacing={1}>
      <Stack>
      <Typography sx={modalStyle} fontWeight={'bold'}>Notes</Typography>
      <Typography sx={modalStyle}>It was great doing business with you</Typography>
      </Stack>
      <Stack>
      <Typography sx={modalStyle} fontWeight={'bold'}>Terms and Condition</Typography>
      <Typography sx={modalStyle}>Please make payments before the due date</Typography> 
      </Stack>
      </Stack>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        p={2}
      >
        <Button
          variant={"contained"}
          sx={{backgroundColor:'#4C8AB1', borderRadius:'28px', fontFamily:'Inter, sans serif', textTransform:'capitalize', fontSize:'16px'}}
          fontSize={"16px"}
          fontFamily={"Inter, sans serif"}
          onClick={()=> {
            handleClose();
            handleGenerateInvoice()
          }}
        >
          Generate Invoice
        </Button>
      </Stack>

  </Box>
  </Modal>}
    { generateInvoice && <GenerateInvoicePopup setGenerateInvoice={setGenerateInvoice} setShareToClient={setShareToClient}/>}
    { shareToClient && <ShareModal setShareToClient={setShareToClient} setDone={setDone}/>}
    { done && <GenerateInvoiceDone setDone={setDone} />}
    </>
  )
}

export default BudgetPieChartCard

const style = {
  position: 'absolute',
  top: {xl:'50%', lg:'50%', md:'50%', sm:'50%', xs:'80%'},
  left: {xl:'50%', lg:'50%', md:'50%', sm:'50%', xs:'55%'},
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '14px',
};

const modalStyle = {
  color: 'gray',
  fontSize: '15px'
}
const scrollable = {
    overflow: 'scroll',
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
    }
}