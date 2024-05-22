import { Stack } from '@mui/material'
import React from 'react'
import Chat from './Chat'
import TaskCalender from './TaskCalender'

const ChatViewMain = () => {
  //console.log(project)
  return (
    <Stack direction={{xl:'row',lg:'row',md:'column',sm:'column',xs:'column'}} pt={1} spacing={1} >
      <Stack flex={{xl:3, lg:2}} width={{xl:"50%",lg:"50%"}} >
      <Chat  />
      </Stack>
      <Stack flex={{xl:1, lg:2}} width={{xl:"50%",lg:"50%"}}>
      <TaskCalender />
      </Stack>
    </Stack>
  )
}

export default ChatViewMain