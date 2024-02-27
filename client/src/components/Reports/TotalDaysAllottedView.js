import { Stack } from '@mui/material'
import React from 'react'
import TotalDaysAllotted from './TotalDaysAllotted'
import DaysAllottedCalendar from './DaysAllottedCalendar'

const TotalDaysAllottedView = () => {
  return (
    <Stack direction={'row'} justifyContent={'space-evenly'} pb={2} pt={2}>
      <TotalDaysAllotted />
      <Stack pr={1}>
      <DaysAllottedCalendar />
      </Stack>
    </Stack>
  )
}

export default TotalDaysAllottedView
