import {Divider, Stack } from '@mui/material'
import React from 'react'
import ProgressCardHeader from './ProgressCardHeader'
import ProjectProgress from './ProjectProgress'
import PaymentDetails from './PaymentDetails'
import ProfitDetails from './ProfitDetails'

const ProgressCard = () => {
  return (
    <>
        <ProgressCardHeader />
        <Divider variant='fullWidth'></Divider>
        <Stack direction={'row'} pt={2}>
        <ProjectProgress />
        <Divider orientation='vertical' variant='fullWidth' flexItem></Divider>
        <PaymentDetails />
        </Stack>
        <Divider variant='fullWidth'></Divider>
        <ProfitDetails />
    </>
  )
}

export default ProgressCard
