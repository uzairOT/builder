import React from 'react'
import TaskCalender from '../../Task/Calender/TaskCalender'
import { TroubleshootRounded } from '@mui/icons-material'

function DailyLog({ bgColor }) {
    return (
        <div style={{ width: "100%" }}>

            <TaskCalender bgColorClient={true} isProjectPage={true} isDrawerOpen={true} />
        </div>
    )
}

export default DailyLog
