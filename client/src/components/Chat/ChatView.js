import React, { useEffect, useState } from "react";
import { Box, Avatar } from "@mui/material";
import { TextField, IconButton } from "@mui/material";
import AttachFileIcon from "../../assets/Chat/attachment.png";
import SendIcon from "../../assets/Chat/send.png";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const socket = io("http://192.168.0.106:8080");

function ChatView({ isAdminPage, project }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { id } = useParams();
  let data = localStorage.getItem("userInfo");
  let userInfo = JSON.parse(data);
  const currentUser = userInfo.user; // Replace this with actual user identifier

  const handleSend = () => {
    socket.emit("clientMessage", { message, sender: currentUser });
    setMessage(""); // Clear message input after sending
  };

  useEffect(() => {
    console.log("-=-=-=-", currentUser);
    socket.emit("joinchat", {
      projectId: id,
    });

    const messageListener = (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    };

    socket.on("message", messageListener);

    return () => {
      socket.off("message", messageListener);
    };
  }, [id]);

  return (
    <>
      <Box sx={{ height: "90%", overflowY: "scroll" }}>
        {messages?.map((msg, index) => {
          const isSender = msg.sender.id === currentUser.id;
          const activeName = msg.sender.lastName
            ? msg.sender.lastName
            : msg.sender.firstName;
          const messageBoxStyles = {
            bgcolor: isSender ? "#FF5858" : "green",
            borderRadius: "10px",
            py: 1,
            px: 2,
            color: "white",
            maxWidth: "265px",
            alignSelf: isSender ? " flex-start" : "flex-end",
          };

          const avatarStyles = {
            width: 25,
            height: 25,
            mr: isSender ? 0 : 1,
            ml: isSender ? 1 : 0,
          };

          return (
            <>
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: isSender ? "flex-start" : " flex-end",
                  my: 2,
                  overflow: "hidden",
                }}
              >
                {isSender && <Avatar sx={avatarStyles} />}

                <Box sx={messageBoxStyles}>{msg.message}</Box>
                {!isSender && <Avatar sx={avatarStyles} />}
              </Box>
              <Box
                sx={{
                  marginLeft: isSender ? "10px" : "0px",
                  marginRight: !isSender ? "10px" : "0px",
                  justifyContent: isSender ? "flex-start" : " flex-end",
                  display: "flex",
                  alignItems: "flex-end",
                  fontSize: "8px",
                }}
              >
                {activeName}
              </Box>
            </>
          );
        })}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton color="primary" aria-label="attach file">
          <img src={AttachFileIcon} alt="" />
        </IconButton>

        <TextField
          name="message"
          placeholder="Please enter message"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={InputStyle}
        />

        <IconButton color="primary" aria-label="send" onClick={handleSend}>
          <img src={SendIcon} alt="" />
        </IconButton>
      </Box>
    </>
  );
}

export default ChatView;

const InputStyle = {
  backgroundColor: "#EDF2F6",
  borderRadius: "8px",
  fontFamily: "Manrope, sans-serif",
  "& input": {
    border: "1px solid #E0E4EC",
    borderRadius: "8px",
    padding: "10px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
  },
};
