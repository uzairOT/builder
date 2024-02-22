import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';

const ProfitMarginStackedBarChart = () => {

   
  return (
    <>
      <BarChart
      colors={['#2D9CDB', '#90BE6D']}
      width={250}
      height={230}
      axisHighlight={
       {     x: 'band',
            y:'none'}
      }
      series={[
        {data: [25166.8], stack: 'A'},
        {data: [5834], stack: 'A'},
      ]}
      xAxis={[{ data: ['Line Item'], scaleType: 'band' }]}
      > </BarChart>
    </>
  )
}

export default ProfitMarginStackedBarChart
