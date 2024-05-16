import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Avatar,
  Stack,
  Typography,
  CircularProgress,
  Modal,
} from "@mui/material";
import { TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { useGetChatMessagesMutation } from "../../redux/apis/Chat/chatApiSlice";
import moment from "moment";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import axios from "axios";
import { uploadToS3 } from "../../utils/S3";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {socket} from "../../socket";
let data = localStorage.getItem("userInfo");
let userInfo = JSON.parse(data);
const currentUser = userInfo?.user;
// const socket = io("http://3.135.107.71", {
//   query: { userId: currentUser?.id },
// });

function ChatView({ isAdminPage, project }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleCloseModal = () => {
    setSelectedImage(null);
    setOpenModal(false);
  };
  const [getChatMessages] = useGetChatMessagesMutation();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState("");
  const [s3Url, setS3Url] = useState("");
  const { id } = useParams();
  const messageBoxRef = useRef(null);
  const [usersOnline, setUsersOnline] = useState({}); // State to store online status of users
  const [recipientType, setRecipentType] = useState("team");

  const handleOpenModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenModal(true);
  };
  const handleTeamClientClick = () => {
    setRecipentType("team+client");
  };
  const handleTeamClick = () => {
    setRecipentType("team");
  };

  useEffect(() => {
    // Scroll to the bottom when msg updates
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = () => {
    if (message === "") {
      return;
    }
    socket.emit("message", {
      content: message,
      userId: currentUser?.id,
      recipientType: recipientType,
      fileUrl: s3Url,
      fileName: fileName,
      fileType: fileType,
    });
    setMessage("");
    setFileName("");
    setFileType("");
    setSelectedFile("");
    setImage(null);
    setS3Url(""); // Clear message input after sending
  };

  const fetchProjectChat = async () => {
    try {
      const res = await getChatMessages({ projectId: id }).unwrap();
      setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('================================', id)
    // if (messages.length < 1) {
      fetchProjectChat();
    // }
    socket.emit("joinchat", {
      pId: id,
      userId: currentUser?.id,
    });

    const messageListener = (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    };

    socket.on("message", messageListener);
    // Listen for user status changes
    const userStatusListener = (data) => {
      setUsersOnline((prevUsersOnline) => ({
        ...prevUsersOnline,
        [data?.userId]: data.status === "online",
      }));
    };
    socket.on("userStatusChanged", userStatusListener);
    return () => {
      socket.off("message", messageListener);
      socket.off("userStatusChanged", userStatusListener);
    };
  }, [id]);
  // Function to get user status class
  // useEffect(() => {
  //   console.log(messages);
  // }, [messages]);
  const handleImageUpload = (e) => {
    const file = e.target?.files[0];
    setFileName(file?.name);
    setFileType(file?.type);
    setSelectedFile(file);
    if (selectedFile) {
      handleAtachmentSubmit();
    }
    // handleAtachmentSubmit();
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    setImage(file);
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  // Attachment function
  useEffect(() => {
    if (selectedFile) {
      handleAtachmentSubmit();
    }
  }, [selectedFile, id]);

  const handleAtachmentSubmit = async () => {
    setLoading(true);
    try {
      const fileUrl = await uploadFileToServer(selectedFile);
      const uploadedFileUrl = await uploadToS3(fileUrl, selectedFile);
      setS3Url(uploadedFileUrl);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  const uploadFileToServer = async (selectedFile) => {
    if (selectedFile) {
      try {
        const res = await axios.post("http://3.135.107.71/project/file", {
          fileName,
          fileType,
        });
        return res.data.data.url;
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };
  const handleClearImageState = () => {
    setFileName("");
    setFileType("");
    setSelectedFile("");
    setImage(null);
    setS3Url("");
  };
  return (
    <>
      <Stack direction={"column"} justifyContent={"flex-start"} height={"100%"}>
        <Box sx={{ ...headerStyle }}>
          <Avatar
            src={currentUser?.image}
            sx={{ marginRight: "1rem" }}
          ></Avatar>
          <Typography sx={{ fontSize: "15px", fontWeight: 600 }}>
            {usersOnline ? "Online" : "Ofline"}
          </Typography>
          <IconButton>
            <FiberManualRecordIcon sx={{ fontSize: 15, color: "#3B9434" }} />
          </IconButton>
        </Box>
        <Box
          sx={{
            height: {
              xl: "72.5vh",
              lg: "75vh",
              md: "75vh",
              sm: "75vh",
              xs: "75vh",
            },
            overflowY: "scroll",
            ...scrollable,
          }}
        >
          {image ? (
            <Box
              height={"95%"}
              style={{
                backgroundColor: "#FAFAFA",
                borderRadius: "8px",
                margin: "8px",
              }}
            >
              <Stack alignItems={"flex-end"} justifyContent={"flex-end"}>
                <IconButton onClick={handleClearImageState}>
                  <CloseRoundedIcon />
                </IconButton>
              </Stack>
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                height={"95%"}
              >
                {selectedFile.type.split("/")[0] === "image" ? (
                  <img
                    src={image}
                    alt="file"
                    style={{
                      width: "400px",
                      height: "400px",
                      objectFit: "contain",
                      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                      filter: loading ? "blur(5px)" : "",
                    }}
                  />
                ) : (
                  <IconButton
                    href={image}
                    download="document"
                    aria-label="download"
                  >
                    <Typography variant="body2" component="span">
                      <Box sx={{ color: "primary.main" }}>
                        {loading ? (
                          <CircularProgress />
                        ) : (
                          <InsertDriveFileIcon />
                        )}
                      </Box>
                      {selectedFile.name}
                    </Typography>
                  </IconButton>
                )}
              </Stack>
            </Box>
          ) : (
            <>
              {!messages || !Array?.isArray(messages) ? (
                <div
                  style={{
                    marginLeft: "1rem",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  No chat available...
                </div>
              ) : (
                messages?.map((msg, index) => {
                  const isSender = msg?.User?.id === currentUser?.id;
                  const activeName = msg?.User?.lastName
                    ? msg?.User?.lastName
                    : msg?.User?.firstName;
                  const messageBoxStyles = {
                    bgcolor: isSender ? "#F2F2F2" : "#B8E0FA",
                    borderRadius: isSender
                      ? "10px 0 30px 10px" // Border radius for sender's messages
                      : "0 10px 10px 30px", // Border radius for receiver's messages
                    py: 2,
                    px: "7px",
                    color: "black",
                    maxWidth: "35%",
                    wordWrap: "break-word",
                    alignSelf: isSender ? "flex-start" : "flex-end",
                  };

                  const avatarStyles = {
                    width: 25,
                    height: 25,
                    mr: isSender ? 1 : 0,
                    ml: isSender ? 0 : 1,
                  };

                  return (
                    <>
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: isSender
                            ? "flex-end"
                            : "  flex-start",
                          overflow: "hidden",
                        }}
                      >
                        {!isSender && (
                          <Avatar src={msg?.User?.image} sx={avatarStyles} />
                        )}
                        <Box
                          sx={messageBoxStyles}
                          borderRadius={{
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 10,
                            borderBottomRightRadius: 10,
                            borderBottomLeftRadius: 30,
                          }}
                          ref={messageBoxRef}
                        >
                          <>
                            {[
                              ".png",
                              ".jpg",
                              ".jpeg",
                              ".gif",
                              ".webp",
                              ".bmp",
                              ".tiff",
                            ].some((ext) => msg?.fileUrl?.endsWith(ext)) ? (
                              <>
                                <img
                                  src={msg.fileUrl}
                                  onClick={() => handleOpenModal(msg.fileUrl)}
                                  download="image"
                                  alt="file"
                                  style={{
                                    width: "220px",
                                    height: "220px",
                                    objectFit: "contain",
                                    wordWrap: "break-word",
                                  }}
                                />
                                <br />
                              </>
                            ) : msg?.fileUrl?.endsWith(".pdf") ||
                              msg?.fileUrl?.endsWith(".docx") ||
                              msg?.fileUrl?.endsWith(".doc") ||
                              msg?.fileUrl?.endsWith(".zip") ? (
                              <>
                                <IconButton
                                  href={msg.fileUrl}
                                  download="document"
                                  aria-label="download"
                                >
                                  <Typography variant="body2" component="span">
                                    <Box sx={{ color: "primary.main" }}>
                                      <InsertDriveFileIcon />
                                    </Box>
                                    {msg.ChatFiles &&
                                    msg.ChatFiles.length > 0 ? (
                                      msg.ChatFiles.map((file, index) => (
                                        <span key={index}>
                                          {file.fileName}{" "}
                                          {/* Display each file's name */}
                                        </span>
                                      ))
                                    ) : (
                                      <span>File</span>
                                    )}
                                  </Typography>
                                </IconButton>
                                <br />
                              </>
                            ) : (
                              <></>
                            )}
                          </>

                          {msg.content}
                          {/* <div ref={messageBoxRef} /> */}
                        </Box>
                        {isSender && (
                          <Avatar src={currentUser?.image} sx={avatarStyles} />
                        )}
                      </Box>
                      <Box
                        sx={{
                          marginLeft: isSender ? "0px" : "2rem",
                          marginRight: !isSender ? "0px" : "2rem",
                          justifyContent: isSender ? "flex-end" : "flex-start",
                          display: "flex",
                          alignItems: "flex-end",
                          fontSize: "12px",
                          marginTop: "10px",
                          marginBottom: 2,
                        }}
                      >
                        {activeName}{" "}
                        {moment
                          .utc(msg.createdAt)
                          .tz(moment.tz.guess())
                          .format("HH:mm A")}
                      </Box>
                    </>
                  );
                })
              )}
            </>
          )}
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", mb: 2, ml: 2, mr: 2 }}
        >
          <label htmlFor="file-input">
            <AttachFileIcon
              color="#6A6A6A"
              sx={{ transform: "rotate(35deg)" }}
            />
          </label>
          <input
            id="file-input"
            onChange={handleImageUpload}
            type="file"
            style={{ display: "none" }}
          />
          <TextField
            name="message"
            placeholder="Please enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={InputStyle}
          />
          <Box sx={{ display: "flex", columnGap: 1, margin: "0 8px 0 10px" }}>
            <button
              onClick={handleTeamClick}
              style={{
                ...buttonStyle,
                backgroundColor:
                  recipientType === "team" ? "#4C8AB1" : "#FFFFFF",
                color: recipientType === "team" ? "#FFF" : "#4C8AB1",
              }}
            >
              Team
            </button>
            <button
              onClick={handleTeamClientClick}
              style={{
                ...buttonStyle,
                backgroundColor:
                  recipientType === "team+client" ? "#4C8AB1" : "#FFFFFF",
                color: recipientType === "team+client" ? "#FFF" : "#4C8AB1",
              }}
            >
              Team + Client
            </button>
          </Box>
          <IconButton
            color="primary"
            aria-label="send"
            onClick={handleSend}
            disabled={loading}
          >
            <SendIcon sx={{ transform: "rotate(-35deg)" }} />
          </IconButton>
        </Box>
      </Stack>

      {/* Image Show Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="image-preview-modal"
        aria-describedby="image-preview-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: "90vw",
            maxHeight: "90vh",
          }}
        >
          <img
            src={selectedImage}
            alt="Preview"
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
      </Modal>
    </>
  );
}

export default ChatView;

const InputStyle = {
  width: "100%",
  backgroundColor: "#EDF2F6",
  borderRadius: "8px",
  fontFamily: "Manrope, sans-serif",
  "& input": {
    border: "1px solid #E0E4EC",
    borderRadius: "8px",
    padding: "8px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
  },
};

const headerStyle = {
  padding: "8px",
  color: "#3B9434",
  display: "flex",
  alignItems: "center",
};
const buttonStyle = {
  border: "1px solid #4C8AB1",

  borderRadius: "5px",
  whiteSpace: "nowrap",
  padding: "8px",
  cursor: "pointer",
};

const scrollable = {
  scrollbarWidth: "6px", // For Firefox
  "-ms-overflow-style": "none", // For IE and Edge
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#ddd",
    transition: "background-color 0.3s",
  },
  "&:hover::-webkit-scrollbar-thumb": {
    backgroundColor: "#ddd",
    width: "6px",
  },
  overflowY: "scroll",
};
