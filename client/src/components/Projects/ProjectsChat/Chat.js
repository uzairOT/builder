import { Divider, Grid, Paper } from "@mui/material";
import React, { useState } from "react";
import ChatView from "../../Chat/ChatView";
import ConversationList from "./ConversationList";
import { useParams } from "react-router-dom";
import { useGetConversationQuery } from "../../../redux/apis/Chat/chatApiSlice";
import { useSelector } from "react-redux";
import { retry } from "@reduxjs/toolkit/query";

const Chat = () => {
  const user = useSelector((state) => state.auth.userInfo);
  const [conversationId, setConversationId] = useState();
  const [chatUser, setChatUser] = useState(null);
  const { id } = useParams();
  const [value, setValue] = useState(id);
  const [isLoading, setIsLoading] = useState(false);
  const { data, refetch: refetchConverstations } = useGetConversationQuery({ userId: user.user.id });

  const handleValueChange = (id) => {
    setValue(id);
    setConversationId(null);
  } 

  const handleSetConversationId = (id, user) => {
    if(id=== conversationId)
      return;
    
    setIsLoading(true)
    setValue(user.id)
    setConversationId(id);
    setChatUser(user);
  };
  const handleChatUserChange = (user) => {
    setChatUser(user);
  };
  console.log(value);
  return (
    <Paper
      sx={{
        height: { xl: "100%", lg: "100%", md: "100%", sm: "100%", xs: "100%" },
        borderRadius: "14px",
      }}
    >
      <Grid container>
        <Grid item xl={2.995} lg={2.995} md={2.995} sm={2.995} xs={2.995}>
          <ConversationList
            conversationId={conversationId}
            handleSetConversationId={handleSetConversationId}
            setConversationId={setConversationId}
            value={value}
            setValue={setValue}
            id={id}
            handleValueChange={handleValueChange}
            data={data}
            handleChatUserChange={handleChatUserChange}
            refetchConverstations={refetchConverstations}
            chatUser={chatUser}
            setIsLoading={setIsLoading}
          />
        </Grid>
        <Grid item xl={0.01} lg={0.01} md={0.01} sm={0.01} xs={0.01}>
        <Divider orientation="vertical" variant={"fullWidth"} />
        </Grid>
        <Grid item xl={8.995} lg={8.995} md={8.995} sm={8.995} xs={8.995}>
          <ChatView
            conversationId={conversationId}
            chatUser={chatUser}
            handleChatUserChange={handleChatUserChange}
            setConversationId={setConversationId}
            isAdminPage={true}
            value={value}
            setValue={setValue}
            id={id}
            refetchConverstations={refetchConverstations}
            isLoadingChat={isLoading}
            setIsLoadingChat={setIsLoading}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Chat;
