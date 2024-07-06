import { Paper, Typography } from '@mui/material'
import React from 'react'

const PaymentHistoryCard = ({data}) => {
  return (
    <Paper style={{borderRadius: '14px', padding:'8px', paddingLeft:'24px'}}>
        <Typography sx={themeStyle.title} >{data.date}</Typography>
        <Typography sx={themeStyle.subtitle} >{data.payment}</Typography>
        <Typography sx={themeStyle.footer} >Plan: {data.plan}</Typography>
    </Paper>
  )
}

export default PaymentHistoryCard
const themeStyle = {
    title: {
      fontSize: {xl:'22px',lg:'18px',md:'22px',xs:'22px',},
      fontWeight: '500',
      fontFamily: 'Arial Rounded MT, sans-serif',
      color: '#000000'
  },
    subtitle: {
      fontSize: {xl:'28px',lg:'24px',md:'28px',xs:'28px',},
      fontWeight: '400',
      fontFamily: 'Arial Rounded MT, sans-serif',
      color: '#4C8AB1'
  },
    footer: {
      fontSize: {xl:'16px',lg:'15px',md:'16px',xs:'16px',},
      fontWeight: '400',
      fontFamily: 'Arial Rounded MT, sans-serif',
      color: '#000000'
  },
  }