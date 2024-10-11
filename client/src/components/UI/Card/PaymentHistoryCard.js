import { Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import moment from 'moment-timezone';
const PaymentHistoryCard = ({data, handleOpenModal}) => {
   // Format the date as MM/DD/YYYY using moment
   const dateString = moment(data.date).format('MM/DD/YYYY');

   // Get the current date in the same timezone
   const currentDate = moment();
 
   // Calculate the difference in days between the current date and payment date
   const daysDifference = currentDate.diff(moment(data.date), 'days');
 
   // Check if the payment is within the refundable window (within 3 days)
   const isRefundable = data.status === 'success' && daysDifference <= 3;

  return (
    <Paper style={{borderRadius: '14px', padding:'8px', paddingLeft:'24px'}}>
        <Typography sx={themeStyle.title} >{dateString}</Typography>
        <Typography sx={themeStyle.subtitle} >{data.payment}</Typography>
        <Typography sx={themeStyle.footer} >Plan: {data.plan}</Typography>
        {(!isRefundable && (data.status !== 'success')) && <Typography sx={themeStyle.footer} >Status: {data.status}</Typography>}
        {(isRefundable && data.plan !== 'Free Trial') && <Typography sx={themeStyle.refund} onClick={()=>handleOpenModal({id: data.id, payment:data.amount, paymentIntentId: data.paymentIntentId})}>Request a Refund</Typography>}
    </Paper>
  )
}

export default PaymentHistoryCard
const themeStyle = {
    title: {
      fontSize: {xl:'22px',lg:'18px',md:'22px',xs:'22px',},
      fontWeight: '500',
      fontFamily: 'var(--main-font-family)',
      color: '#000000'
  },
    subtitle: {
      fontSize: {xl:'28px',lg:'24px',md:'28px',xs:'28px',},
      fontWeight: '400',
      fontFamily: 'var(--main-font-family)',
      color: '#4C8AB1'
  },
    footer: {
      fontSize: {xl:'16px',lg:'15px',md:'16px',xs:'16px',},
      fontWeight: '400',
      fontFamily: 'var(--main-font-family)',
      color: '#000000'
  },
    refund: {
      fontSize: {xl:'13px',lg:'13px',md:'12px',xs:'13px',},
      fontWeight: '400',
      fontFamily: 'var(--main-font-family)',
      color: '#4C8AB18D',
      textAlign:'right',
      fontStyle:'italic',
      cursor:'pointer',
      "& :hover":{
        textDecoration:'underline'
      }
  },
  }