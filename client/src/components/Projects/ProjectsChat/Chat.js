import {
  Divider,
  Grid,
  Paper,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import ChatView from "../../Chat/ChatView";
import ConversationList from "./ConversationList";
import { useParams } from "react-router-dom";
import { useGetConversationQuery } from "../../../redux/apis/Chat/chatApiSlice";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const Chat = () => {
  const theme = useTheme();
  const matchesMdDown = useMediaQuery(theme.breakpoints.down("lg"));

  const user = useSelector((state) => state.auth.userInfo);
  const [conversationId, setConversationId] = useState();
  const [chatUser, setChatUser] = useState(null);
  const { id } = useParams();
  const [value, setValue] = useState(id);
  const [isLoading, setIsLoading] = useState(false);
  const { data, refetch: refetchConversations } = useGetConversationQuery({
    userId: user.user.id,
  });

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleValueChange = (id) => {
    setValue(id);
    setConversationId(null);
  };

  const handleSetConversationId = (id, user) => {
    if (id === conversationId) return;

    setIsLoading(true);
    setValue(user.id);
    setConversationId(id);
    setChatUser(user);
    if (matchesMdDown) {
      setDrawerOpen(false);
    }
  };

  const handleChatUserChange = (user) => {
    setChatUser(user);
  };

  return (
    <Paper
      sx={{
        height: "100%",
        borderRadius: "14px",
      }}
    >
      <Grid container>
        {matchesMdDown && (
          <Grid item xs={1}>
            <IconButton
              sx={{ ml: 1 }}
              color="inherit"
              aria-label={drawerOpen ? "close drawer" : "open drawer"}
              onClick={handleToggleDrawer}
            >
              {drawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
          </Grid>
        )}

        <Drawer
          variant="temporary"
          anchor="left"
          open={drawerOpen}
          onClose={handleToggleDrawer}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            width: "300px",
            flexShrink: 0,
            display: { xs: matchesMdDown ? "block" : "none", sm: "block" },
          }}
          PaperProps={{
            style: {
              top: "168px",
              height: "calc(100% - 150px)",
              borderTopRightRadius: "16px",
              width: "84%",
              overflow: "auto",
            },
          }}
        >
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
            refetchConversations={refetchConversations}
            chatUser={chatUser}
            setIsLoading={setIsLoading}
          />
        </Drawer>

        {!matchesMdDown && (
          <Grid item xl={2.995} lg={2.995} xs={3}>
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
              refetchConversations={refetchConversations}
              chatUser={chatUser}
              setIsLoading={setIsLoading}
            />
          </Grid>
        )}

        {!matchesMdDown && (
          <Grid item xl={0.01} lg={0.01} xs={1}>
            <Divider orientation="vertical" variant="fullWidth" />
          </Grid>
        )}

        <Grid item xl={8.995} lg={8.995} xs={!matchesMdDown ? 8 : 12}>
          <ChatView
            conversationId={conversationId}
            chatUser={chatUser}
            handleChatUserChange={handleChatUserChange}
            setConversationId={setConversationId}
            isAdminPage={true}
            value={value}
            setValue={setValue}
            id={id}
            refetchConversations={refetchConversations}
            isLoadingChat={isLoading}
            setIsLoadingChat={setIsLoading}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Chat;
