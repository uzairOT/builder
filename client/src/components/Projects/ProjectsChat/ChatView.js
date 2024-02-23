import { Stack } from '@mui/material'
import React from 'react'
import Chat from './Chat'
import TaskCalender from './TaskCalender'

const ChatView = ({project}) => {
  console.log(project)
  return (
    <Stack direction={'row'} pt={1} spacing={1} height={'100%'}>
      <Stack flex={3} height={"100%"}>
      <Chat project={project} />
      </Stack>
      <Stack flex={1} height={'100%'}>
      <TaskCalender />
      </Stack>
    </Stack>
  )
}

export default ChatView