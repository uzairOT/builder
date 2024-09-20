import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { socket } from "../../../socket";

const ConversationCard = ({
  conversation,
  conversationId,
  handleSetConversationId,
  userId,
}) => {
  const [lastMessage, setLastMessage] = useState();
  // console.log(conversation);
  useEffect(() => {
    socket.on(
      `lastMessage${conversation?.ChatConversation?.id}`,
      (lastMessage) => {
        // console.log(lastMessage);
        setLastMessage(lastMessage);
      }
    );

    return () => {
      socket.off(
        `lastMessage${conversation?.ChatConversation?.id}`,
        (lastMessage) => {
          setLastMessage(lastMessage);
        }
      );
    };
  }, []);

  useEffect(() => {
    setLastMessage(conversation?.lastMessage);
  }, [conversation]);

  return (
    <React.Fragment key={conversation?.ChatConversation.id}>
      <ListItem
        alignItems="flex-start"
        style={{
          fontFamily: "var(--main-font-family)",
          cursor: "pointer",
          marginBottom: "1px",
          backgroundColor:
            parseInt(conversation?.ChatConversation.id) ===
            parseInt(conversationId)
              ? "#e0e0e0"
              : "inherit",
          transition: "background-color 0.1s ease",
          paddingTop: 0,
        }}
        onClick={() =>
          handleSetConversationId(
            conversation?.ChatConversation.id,
            conversation
          )
        }
      >
        <ListItemAvatar>
          <Avatar alt={conversation?.id} src={conversation?.image} />
        </ListItemAvatar>
        <ListItemText
          secondaryTypographyProps={{
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          secondary={
            <React.Fragment>
              <Typography
                sx={{
                  display: "inline",
                  fontFamily: "var(--main-font-family)",
                }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {conversation?.firstName}
              </Typography>{" "}
              <Typography
                fontFamily={"var(--main-font-family)"}
                component="p"
                variant="body2"
                color="text.primary"
              >
                {lastMessage?.content ? (
                  lastMessage?.content?.length > 50 ? (
                    `${lastMessage?.content?.substring(0, 50)}...`
                  ) : (
                    ` ${lastMessage?.content}`
                  )
                ) : lastMessage?.fileUrl ? (
                  <em>file sent</em>
                ) : (
                  ""
                )}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </React.Fragment>
  );
};

export default ConversationCard;
