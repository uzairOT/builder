import { Box, Stack } from '@mui/material'
import React from 'react'
import TotalCostPieChart from './TotalCostPieChart'
import OverBudgetPieChart from './OverBudgetPieChart'

const ReportsSideBar = () => {
  return (
    <Stack spacing={1}>
      <TotalCostPieChart />
      <OverBudgetPieChart />
    </Stack>
  )
}

export default ReportsSideBar
