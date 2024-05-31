import { Box, Paper } from '@mui/material'
import React from 'react'
import Permit from '../Permit'

const ImagesView = () => {
  return (
    <Paper flex={2} style={{height:'100%', borderRadius:'14px'}}>
       <Permit view={'Images'} type={'image'}/>
    </Paper>
  )
}

export default ImagesView
