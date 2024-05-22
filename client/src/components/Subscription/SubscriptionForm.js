import Stack from '@mui/joy/Stack'
import React from 'react'
import PaymentModal from '../dialogues/PaymentModal/PaymentModal'

const SubscriptionForm = ({currentPlan,currentPakage}) => {
  return (
    <Stack p={4} mt={1} sx={themeStyle.scrollable} overflow={'hidden'}>
      <PaymentModal currentPlan={currentPlan} currentPakage={currentPakage}/>
    </Stack>
  )
}

export default SubscriptionForm

const themeStyle = {
  scrollable:{
    overflowX: 'scroll',
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
    }, }
}