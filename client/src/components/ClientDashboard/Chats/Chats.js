import React from "react";
import { Box, Avatar, Typography, Paper } from "@mui/material";
import { TextField, IconButton } from "@mui/material";
import AttachFileIcon from "./assets/attachment.png";
import SendIcon from "./assets/send.png";
import ChatView from "../../Chat/ChatView";
import { useOutletContext } from "react-router-dom";
function Chats() {
  const [projectName] = useOutletContext();
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
      <Paper
        sx={{
          height: {
            xl: "100%",
            lg: "100%",
            md: "100%",
            sm: "100%",
            xs: "100%",
          },
          borderRadius: "14px",
        }}
      >
        <ChatView project={projectName} isAdminPage={true} />
      </Paper>
    </>
  );
}

export default Chats;

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
