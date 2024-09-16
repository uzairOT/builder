import { Paper } from '@mui/material'
import React from 'react'
import ChatView from '../../Chat/ChatView'

const Chat = ({project}) => {
  return (
    <Paper sx={{height: {xl:'92%',lg:'92%',md:"100%",sm:"100%",xs:"100%"}, borderRadius:'14px'}}>
      <ChatView project={project} isAdminPage={true}/>
    </Paper>
  )
}

export default Chat
