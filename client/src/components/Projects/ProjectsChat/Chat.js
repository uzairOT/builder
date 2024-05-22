import { Paper } from '@mui/material'
import React from 'react'
import ChatView from '../../Chat/ChatView'

const Chat = () => {
  return (
    <Paper sx={{height: {xl:'100%',lg:'100%',md:"100%",sm:"100%",xs:"100%"}, borderRadius:'14px'}}>
      <ChatView  isAdminPage={true}/>
    </Paper>
  )
}

export default Chat
