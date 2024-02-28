import { Paper } from '@mui/material'
import React from 'react'
import TaskCalenderView from '../../Dashboard/TaskCalenderView/TaskCalenderView'
const TaskCalender = () => {
  return (
    <Paper style={{height:'91.9%', borderRadius:'14px'}}>
        <TaskCalenderView />
    </Paper>
  )
}

export default TaskCalender