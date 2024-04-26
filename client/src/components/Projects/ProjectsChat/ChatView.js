import { Stack } from '@mui/material'
import React from 'react'
import Chat from './Chat'
import TaskCalender from './TaskCalender'

const ChatView = ({project}) => {
  //console.log(project)
  return (
    <Stack direction={{xl:'row',lg:'row',md:'column',sm:'column',xs:'column'}} pt={1} spacing={1} >
      <Stack flex={{xl:3, lg:2}} height={{xl:'92vh', lg:'90vh'}}>
      <Chat project={project} />
      </Stack>
      <Stack flex={{xl:1, lg:2}} height={{xl:'92vh', lg:'90vh'}}>
      <TaskCalender />
      </Stack>
    </Stack>
  )
}

export default ChatView