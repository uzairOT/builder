import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { TextField, IconButton } from "@mui/material";
import AttachFileIcon from "../../assets/Chat/attachment.png";
import SendIcon from "../../assets/Chat/send.png";

function ChatView() {
  const dummyMessages = [
    {
      type: "receiver",
      text: "Hi David, have you got the project report pdf?",
    },
    { type: "sender", text: "NO. I did not get it" },

    {
      type: "receiver",
      text: "Ok, I will just sent it here. Plz be sure to fill the details by today end of the day.",
    },
    { type: "receiver", text: "project_report.pdf" },
    {
      type: "sender",
      text: "Ok. Should I send it over email as well after filling the details.",
    },
    { type: "receiver", text: "Ya. I’ll be adding more team members to it." },
  ];

  return (
    <>
      <Box
        sx={{
          bgcolor: "#FFECC5",
          height: 58,
          display: "flex",
          alignItems: "center",
          paddingLeft: 2,
        }}
      >
        <Typography variant="h6">Chats</Typography>
      </Box>

      <Box
        sx={{
          mx: 4,
          
        }}
      >

        <Box sx={{height:"670px"}}>

    

        {/* Message Cards */}
        {dummyMessages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: message.type === "receiver" ? "flex-end" : "flex-end",
              justifyContent:
                message.type === "receiver" ? "flex-start" : "flex-end",

              my: 5,
            //   borderRadius: '10px',
             
              overflow: 'hidden',
              
            }}
          >
            {message.type === "receiver" && (
              <Avatar sx={{ width: 25, height: 25, mr: 1 }} />
            )}
            <Box
              sx={{
                bgcolor: message.type === "receiver" ? "#F2F2F2" : "#4C8AB1",
                borderRadius: "10px",
                borderBottomLeftRadius: message.type === 'sender' ? '10px' : '0px',
                borderBottomRightRadius: message.type === 'receiver' ? '10px' : '0px',
                py: 1,
                px: 2,
                color: message.type === "receiver" ? "black" : "white",
                maxWidth: "265px",
              }}
            >
              {message.text}
            </Box>
            {message.type === "sender" && (
              <Avatar sx={{ width: 25, height: 25, ml: 1 }} />
            )}
          </Box>
        ))}
    </Box>
        {/* Attachment and Input Field Row */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton color="primary" aria-label="attach file">
            <img src={AttachFileIcon} alt="" />
          </IconButton>

          <TextField
            name="email"
            placeholder="Please enter your email"
            fullWidth
            sx={InputStyle}
          />

          <IconButton color="primary" aria-label="send">
            <img src={SendIcon} alt="" />
          </IconButton>
        </Box>
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
