import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { socket } from "../../../socket";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getTokenFromLocalStorage } from "../../../redux/apis/apiSlice";
const ProgressCardHeader = ({ project }) => {
  const id = project?.id;
  let data = localStorage.getItem("userInfo");
  let userInfo = JSON.parse(data);
  const currentUser = userInfo?.user;
  const [unreadMsg, setUnreadMsg] = useState(0);
  const navigate = useNavigate();
  // Assuming you have a socket connection already established
  // useEffect(() => {
  //   socket.on("unreadMessageCount", (data) => {
  //     console.log("-............cHECKL CONSOLE.!", data);
  //   });

  //   return () => {};
  // }, []);

  const navigateToChat = () => {
    navigate(`projects/${id}/chat`);
  };
  //Api call for markMessagesAsRead
  const userId = currentUser?.id;
  // async function markMessagesAsRead(id, userId) {
  //   try {
  //     const response = await axios.post(
  //       "http://192.168.0.113:8080/projectChat/unreadMessageCount",
  //       {
  //         projectId: id,
  //         userId: userId,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     console.log("Messages marked as read successfully", response.data);
  //     setUnreadMsg(response?.data?.unreadCount);
  //   } catch (error) {
  //     console.error("Failed to mark messages as read", error);
  //   }
  // }
  useEffect(() => {
    // console.log("`````", project.Invoices.length);
    // markMessagesAsRead(id, userId);
    setUnreadMsg(project?.unreadMessages);
  }, []);

  // Listen for unread message count updates
  const unreadMessageCountListener = (data) => {
    // Update the dashboard or UI with the unread message count
    // updateUnreadMessageCountUI(data.projectId, data.unreadMessageCount);
    setUnreadMsg(data?.unreadCount);
    console.log("data.unreadMessageCount data.unreadMessageCount", data);
  };

  socket.emit(`${userId}-${id}`);
  socket.on(`unreadMessageCount-${id}-${userId}`, unreadMessageCountListener);

  return (
    <Box textAlign={"left"} p={2}>
      <Stack direction={"row"} justifyContent={"space-around"}>
        <Box width={"60%"}>
          <Typography
            p={1}
            sx={{
              ...themeStyle.colorBlue,
              fontSize: "18px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              // maxWidth: "14ch",
            }}
          >
            {project.projectName}
          </Typography>
          <Typography p={1} sx={{ fontSize: "15px", ...themeStyle.colorGray }}>
            Client Name
          </Typography>
        </Box>
        <Box width={"40%"} pr={1}>
          <Stack direction={"row"} justifyContent={"right"}>
            <Typography
              p={1}
              sx={{ ...themeStyle.colorBlue, fontSize: "12px", width: "120px" }}
            >
              Pending Invoice
            </Typography>
            <Box sx={themeStyle.badge}>
              <Typography
                p={1}
                sx={{
                  fontSize: "12px",
                  backgroundColor: "#33A6F2",
                  borderRadius: "50%",
                  width: "15px",
                  height: "15px",
                  textAlign: "center",
                }}
              >
                {project?.pendingInvoices}
              </Typography>
            </Box>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"right"}
            onClick={navigateToChat}
            sx={{ cursor: "pointer" }}
          >
            <Typography
              p={1}
              sx={{ ...themeStyle.colorBlue, fontSize: "12px", width: "120px" }}
            >
              Unread Messages
            </Typography>
            <Box sx={themeStyle.badge}>
              <Typography
                p={1}
                sx={{
                  fontSize: "12px",
                  backgroundColor: "#EC3710",
                  borderRadius: "50%",
                  width: "15px",
                  height: "15px",
                  textAlign: "center",
                }}
              >
                {unreadMsg}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default ProgressCardHeader;
const themeStyle = {
  colorBlue: {
    color: "#4C8AB1",
    fontFamily: "inherit",
  },
  colorGray: {
    color: "#535353C9",
    fontFamily: "inherit",
  },
  badge: {
    display: "flex",
    color: "#FFF",
    fontFamily: "inherit",
  },
};
