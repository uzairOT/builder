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
      fontSize: '22px',
      fontWeight: '500',
      fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
      color: '#000000'
  },
    subtitle: {
      fontSize: '28px',
      fontWeight: '400',
      fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
      color: '#4C8AB1'
  },
    footer: {
      fontSize: '16px',
      fontWeight: '400',
      fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
      color: '#000000'
  },
  }