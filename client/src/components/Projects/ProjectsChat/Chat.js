import { Paper } from '@mui/material'
import React from 'react'
import ChatView from '../../Chat/ChatView'

const Chat = ({project}) => {
  return (
    <Paper style={{height: '92%', borderRadius:'14px'}}>
      <ChatView project={project} isAdminPage={true}/>
    </Paper>
  )
}

export default Chat
