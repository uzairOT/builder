import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Avatar,
  Stack,
  Typography,
  CircularProgress,
  Modal,
  Button,
  LinearProgress,
  Divider,
} from "@mui/material";
import { TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useOutletContext } from "react-router-dom";
import {
  useGetChatMessagesMutation,
} from "../../redux/apis/Chat/chatApiSlice";
import moment from "moment-timezone";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import axios from "axios";
import { uploadToS3 } from "../../utils/S3";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { socket } from "../../socket";
import { getUserRoleFromRedux } from "../../redux/slices/auth/userRoleSlice";
import { useDispatch, useSelector } from "react-redux";
import { getTokenFromLocalStorage } from "../../redux/apis/apiSlice";
import { useGetUserProjectsQuery } from "../../redux/apis/Project/userProjectApiSlice";
import {
  addProjects,
  setError,
  setIsLoading,
  setLimit,
  setTotalCount,
  setTotalPages,
} from "../../redux/slices/Project/userProjectsSlice";
let data = localStorage.getItem("userInfo");
let userInfo = JSON.parse(data);
const currentUser = userInfo?.user;
// const socket = io("http://3.135.107.71", {
//   query: { userId: currentUser?.id },
// });
function ChatView({
  isAdminPage,
  setConversationId,
  conversationId,
  chatUser,
  handleChatUserChange,
  setValue,
  value,
  id,
  refetchConverstations,
  isLoadingChat,
  setIsLoadingChat,
}) {
  const userRoleProject = useSelector(getUserRoleFromRedux);
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
  const [msgLoading, setMsgLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState("");
  const [s3Url, setS3Url] = useState("");
  const [usersOnline, setUsersOnline] = useState({}); // State to store online status of users
  const [recipientType, setRecipentType] = useState("team+client");
  const [projectName] = useOutletContext();
  const [offset, setOffset] = useState(0);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const boxRef = useRef(null);
  const [scrollingUp, setScrollingUp] = useState(false);
  const userId = currentUser?.id;
  const dispatch = useDispatch();
  const { refetch, data, isLoading, error } = useGetUserProjectsQuery({
    userId: userId,
    q: "",
    filter: "",
    page: 1,
  });
  // const { data: team, isLoading: teamIsLoading } = useGetProjectTeamQuery(id);
  // console.log(team);
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

  const handleSend = async (e) => {
    e.preventDefault();
    if (message === "" && s3Url === "") {
      return;
    }
    setScrollingUp(false);
    if (value === id) {
      await socket.emit("message", {
        content: message,
        userId: currentUser?.id,
        recipientType: recipientType,
        fileUrl: s3Url,
        fileName: fileName,
        fileType: fileType,
      });
    } else {
      // console.log(chatUser);
      if (messages?.length < 1) {
        await socket.emit("conversation", {
          userId: chatUser?.userId,
        });
      }

      await socket.emit("privateMessage", {
        content: message,
        userId: currentUser?.id,
        recipientType: recipientType,
        fileUrl: s3Url,
        fileName: fileName,
        fileType: fileType,
      });
    }
    setMessage("");
    setFileName("");
    setFileType("");
    setSelectedFile("");
    setImage(null);
    setS3Url(""); // Clear message input after sending
    // if (boxRef.current) {
    //   boxRef.current.scrollTop = boxRef.current.scrollHeight;
    // }
  };

  //Api call for markMessagesAsRead
  // console.log("value: ", value);

  async function markMessagesAsRead(id, userId) {
    try {
      const response = await axios.post(
        "https://builderbuilder.net/projectChat/markMessagesAsRead",
        {
          projectId: id,
          userId: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
        }
      );
      // console.log("Messages marked as read successfully", response.data);
      dispatch(setIsLoading(isLoading));
      await refetch({ userId: userId, q: "", filter: "", page: 1 });
      if (data) {
        dispatch(addProjects(data?.projects));
        dispatch(setTotalCount(data?.totalCount));
        dispatch(setTotalPages(data?.totalPages));
        dispatch(setLimit(data?.limit));
      } else {
        dispatch(setError(error));
      }
    } catch (error) {
      console.error("Failed to mark messages as read", error);
    }
  }
  useEffect(() => {
    markMessagesAsRead(id, userId);
  }, []);

  //
  const projectRole = userRoleProject.userRole;
  const fetchProjectChat = async (newOffset, direction, project) => {
    // console.log("conversation Id: ", conversationId);
    try {
      const res = await getChatMessages({
        projectId: project === "project" ? id : null,
        conversationId: conversationId ? conversationId : null,
        offset: newOffset,
        recipientType: recipientType,
      }).unwrap();
      // console.log("messages length: ", res);
      // console.log("has more messages: ", hasMoreMessages);
      if (res.data.length === 0 && direction === "up") {
        setHasMoreMessages(false);
        setMsgLoading(false);
        return;
      } else {
        if (!hasMoreMessages) setHasMoreMessages(true);
        // setMsgLoading(false);
      }
      if (direction === "up") {
        setMessages((prevMessages) => {
          const revArray = [...res.data].reverse();
          const newMessages = [...revArray, ...prevMessages];
          const uniqueMessages = Array.from(
            new Set(newMessages.map((msg) => msg.id))
          ).map((id) => newMessages.find((msg) => msg.id === id));
          return uniqueMessages;
        });
        if (boxRef.current) {
          boxRef.current.scrollTop += 200; // Add some space for user to scroll up again
        }
        // if (boxRef.current) {
        //   boxRef.current.scrollTop +=
        //     boxRef.current.scrollHeight - boxRef.current.clientHeight;
        // }
        return;
      } else {
        setMessages([...res.data].reverse());
        setIsLoadingChat(false);
        if (boxRef.current) {
          boxRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
    } catch (error) {
      console.log(error);
    }
    setMsgLoading(false);
  };
  //
  useEffect(() => {
    // console.log("run");
    // console.log("scrollHeight : ", boxRef.current.scrollHeight);
    // console.log("scrollTop: ", boxRef.current.scrollTop);
    boxRef.current.scrollTop = boxRef.current.scrollHeight;

    setScrollingUp(false);
    setOffset(0);
    if (!(value === id)) {
      //replaced offset with 0 so that every time we click on a new
      //conversation we get the offset value as 0.
      fetchProjectChat(0, "down");
      socket.emit("joinchat", {
        conversationId: conversationId,
        userId: currentUser?.id,
        pId: null,
      });
    } else {
      fetchProjectChat(0, "down", "project");
      socket.emit("joinchat", {
        pId: id,
        userId: currentUser?.id,
        conversationId: null,
      });
    }
    // console.log("joinChat run");
    const messageListener = (msg) => {
      // console.log("run");
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, msg];

        // const uniqueMessages = Array.from(new Set(newMessages.map(m => m.id)))
        //   .map(id => newMessages.find(m => m.id === id));
        // scroll.scrollToBottom({
        //   containerId: "chatBox",
        //   duration: 300,
        //   smooth: true,
        // });

        return newMessages;
      });
    };
    if (value === id) {
      socket.on("message", messageListener);
    } else {
      socket.on("privateMessage", messageListener);
    }

    const userStatusListener = (data) => {
      setUsersOnline((prevUsersOnline) => ({
        ...prevUsersOnline,
        [data?.userId]: data.status === "online",
      }));
    };
    socket.on("userStatusChanged", userStatusListener);

    return () => {
      socket.off("message", messageListener);
      socket.off("privateMessage", messageListener);
      socket.off("userStatusChanged", userStatusListener);
    };
  }, [id, conversationId, recipientType]);

  const handleImageUpload = (e) => {
    const file = e.target?.files[0];
    setFileName(file?.name);
    setFileType(file?.type);
    setSelectedFile(file);
    if (selectedFile) {
      handleAtachmentSubmit();
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    setImage(file);
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const isToday = (date) => {
    const today = moment().startOf("day");
    return moment(date).isSame(today, "day");
  };
  const formatDate = (date) => {
    // console.log(date);
    if (isToday(date)) {
      return moment.utc(date).tz(moment.tz.guess()).format("HH:mm A");
    } else {
      return moment.utc(date).tz(moment.tz.guess()).format("MMM DD, YYYY");
    }
  };

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
        const res = await axios.post(
          "https://builderbuilder.net/project/file",
          {
            fileName,
            fileType,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getTokenFromLocalStorage()}`,
            },
          }
        );
        return res.data.data.url;
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };
  // const handleSelectChangeEvent = async (e) => {
  //   const value = e.target.value;
  //   console.log(value);
  //   setValue(value);
  //   if (!(value === id)) {
  //     try {
  //       const res = await createConverstaion({
  //         userOneId: value,
  //         userTwoId: currentUser?.id,
  //       });
  //       setConversationId(res?.data?.conversation?.id);
  //       if(res?.data?.message === 'Conversation created successfully!'){
  //         await refetchConverstations();
  //       }
  //       console.log(res);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     setConversationId(null);
  //     setValue(value);
  //   }
  // };
  useEffect(() => {
    // console.log(messages);
    // console.log("scrollHeight : ",boxRef.current.scrollHeight);
    // console.log("scrollTop: ",boxRef.current.scrollTop);
    if (boxRef.current && !scrollingUp) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
      // console.log("scrollTop2: ", boxRef.current.scrollTop);
    }
  }, [messages, id, conversationId]);

  const handleClearImageState = () => {
    setFileName("");
    setFileType("");
    setSelectedFile("");
    setImage(null);
    setS3Url("");
  };
  // console.log("conversationId: ", conversationId, "value: ", value);

  useEffect(() => {
    const boxElement = boxRef.current;
    // console.log(
    //   "Inside useEffect conversationId: ",
    //   conversationId,
    //   "value: ",
    //   value
    // );
    const handleLoadOld = () => {
      // console.log(
      //   "Inside handleLoadOld conversationId: ",
      //   conversationId,
      //   "value: ",
      //   value
      // );
      // const newOffset = offset + 10;
      // setOffset(newOffset);
      // fetchProjectChat(newOffset, "up");
      // setScrollingUp(true);
      // console.log("scroll up!", value);
      setOffset((prev) => {
        const newOffset = offset + 10;
        if (!(value === id)) {
          fetchProjectChat(newOffset, "up");
        } else {
          fetchProjectChat(newOffset, "up", "project");
        }
        setScrollingUp(true);
        return newOffset;
      });
    };

    const handleScroll = () => {
      if (!boxRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = boxRef.current;
      // console.log("scrolling up", scrollTop, hasMoreMessages);
      if (scrollTop === 0 && hasMoreMessages) {
        handleLoadOld();
      }
    };
    if (boxElement) {
      boxElement.addEventListener("scroll", handleScroll);
      return () => {
        boxElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, [offset, hasMoreMessages, conversationId, value]);
  // console.log(boxRef.current)

  return (
    <>
      <Stack direction={"column"} justifyContent={"flex-start"} height={"100%"}>
        <Stack justifyContent={"space-between"} direction={"row"}>
          <Box sx={{ ...headerStyle }}>
            <Avatar
              src={!(value === id) ? chatUser?.image : currentUser?.image}
              sx={{ marginRight: "1rem" }}
            ></Avatar>
            <Typography
              sx={{
                fontFamily: "var(--main-font-family)",
                fontSize: { xl: "15px", lg: "12px", md: "15px", xs: "15px" },
                fontWeight: 600,
              }}
            >
              {/* This value greater than 0 checks whether it's a group chat or a one-on-one chat */}
              {!(value === id)
                ? `${chatUser?.firstName} ${chatUser?.lastName}`
                : projectName}
            </Typography>
            <IconButton>
              <FiberManualRecordIcon sx={{ fontSize: 15, color: "#3B9434" }} />
            </IconButton>
          </Box>
          {/* <Select value={""} onChange={handleSelectChangeEvent}>
            <MenuItem value={id}>
              <Typography>Project Chat: {projectName}</Typography>
            </MenuItem>
            {team?.team?.map((user, index) => {
              if (user.userId === userId) {
                return null;
              }
              return (
                <MenuItem
                  value={user.userId}
                  onClick={() => handleChatUserChange(user)}
                >
                  <Typography>
                    {user.firstName} {user.lastName}
                  </Typography>
                </MenuItem>
              );
            })}
          </Select> */}
        </Stack>
        <Divider sx={{ marginBottom: "1px" }} />
        <Box
          ref={boxRef}
          sx={{
            height: {
              xl: "calc(72vh)",
              lg: "600px",
              md: "600px",
              sm: "600px",
              xs: "600px",
            },
            overflowY: "scroll",
            ...scrollable,
          }}
        >
          <Box sx={{ color: "primary.main" }}>
            {msgLoading ? (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            ) : (
              <></>
            )}
          </Box>
          {/* <Button onClick={handleLoadMore}>Load More</Button> */}
          {isLoadingChat ? (
            <Stack
              height={"90%"}
              justifyContent={"flex-end"}
              alignItems={"center"}
            >
              <CircularProgress />
            </Stack>
          ) : image ? (
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
                    <Typography
                      sx={{
                        fontFamily: "var(--main-font-family)",
                        fontSize: {
                          xl: "15px",
                          lg: "12px",
                          md: "15px",
                          xs: "15px",
                        },
                      }}
                      variant="body2"
                      component="span"
                    >
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
                    fontFamily: "var(--main-font-family)",
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
                  const activeName = msg?.User?.firstName
                    ? msg?.User?.firstName
                    : msg?.User?.lastName;
                  const messageBoxStyles = {
                    bgcolor: isSender ? "#F2F2F2" : "#B8E0FA",
                    borderRadius: isSender
                      ? "10px 10px 0px 10px" // Border radius for sender's messages
                      : "10px 10px 10px 0px", // Border radius for receiver's messages
                    py: 2,
                    px: "7px",
                    color: "black",
                    maxWidth: "35%",
                    wordWrap: "break-word",
                    // alignItems: isSender ? "flex-end" : "flex-end",
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
                        key={msg?.id}
                        sx={{
                          display: "flex",
                          alignItems: "flex-end",
                          justifyContent: isSender
                            ? "flex-end"
                            : "  flex-start",
                          overflow: "hidden",
                          gap: "4px",
                        }}
                      >
                        {!isSender && (
                          <Avatar src={msg?.User?.image} sx={avatarStyles} />
                        )}
                        <Box
                          sx={messageBoxStyles}
                          borderRadius={{
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            borderBottomRightRadius: 10,
                            borderBottomLeftRadius: 0,
                          }}
                          // ref={messageBoxRef}
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
                            ].some((ext) => {
                              const lowercaseFileUrl =
                                msg?.fileUrl?.toLowerCase();
                              return lowercaseFileUrl?.endsWith(ext);
                            }) ? (
                              <>
                                <img
                                  src={msg.fileUrl}
                                  onClick={() => handleOpenModal(msg.fileUrl)}
                                  download="image"
                                  alt="file"
                                  style={{
                                    width: "100%",
                                    objectFit: "contain",
                                    wordWrap: "break-word",
                                  }}
                                />
                                <br />
                              </>
                            ) : msg?.fileUrl?.endsWith(".pdf") ||
                              msg?.fileUrl?.endsWith(".txt") ||
                              msg?.fileUrl?.endsWith(".docx") ||
                              msg?.fileUrl?.endsWith(".doc") ||
                              msg?.fileUrl?.endsWith(".zip") ? (
                              <>
                                <IconButton
                                  href={msg.fileUrl}
                                  download="document"
                                  aria-label="download"
                                >
                                  <Typography
                                    sx={{
                                      fontSize: {
                                        xl: "12px",
                                        lg: "10px",
                                        md: "12px",
                                        xs: "12px",
                                      },
                                    }}
                                    variant="body2"
                                    component="span"
                                  >
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

                          {/* Time:{moment
                          .utc(msg.createdAt).tz(moment.tz.guess())
                          .format("MMM, D, YYYY HH:mm A")} || mesg:   */}
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
                          fontSize: "10px",
                          marginTop: "4px",
                          marginBottom: 2,
                        }}
                      >
                        {activeName} {formatDate(msg.createdAt)}
                      </Box>
                    </>
                  );
                })
              )}
            </>
          )}
          {/* <Button onClick={handleLoadOld}>Load Below</Button> */}
        </Box>
        <Box
          component={"form"}
          onSubmit={handleSend}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
            ml: 2,
            mr: 2,
            gap: "4px",
          }}
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
          {projectRole !== "client" && value === id && (
            <Box
              sx={{
                display: "flex",
                flexDirection: { sm: "row", xs: "column" },
                columnGap: 1.5,
                gap: { md: "12px", xs: "2px" },
                margin: "0 4px 0 4px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                type="button"
                onClick={handleTeamClick}
                style={{
                  ...buttonStyle,
                  backgroundColor:
                    recipientType === "team" ? "#4C8AB1" : "#FFFFFF",
                  color: recipientType === "team" ? "#FFF" : "#4C8AB1",
                  margin: 0,
                  textTransform: "capitalize",
                }}
                sx={{
                  paddingY: { sm: "12px", xs: "4px" },
                  fontSize: { sm: "11px", xs: "8px" },
                  paddingX: { sm: "18px", xs: "10px" },
                }}
              >
                Team
              </Button>
              <Button
                type="button"
                onClick={handleTeamClientClick}
                style={{
                  ...buttonStyle,
                  backgroundColor:
                    recipientType === "team+client" ? "#4C8AB1" : "#FFFFFF",
                  color: recipientType === "team+client" ? "#FFF" : "#4C8AB1",
                  margin: 0,
                  textTransform: "capitalize",
                }}
                sx={{
                  paddingY: { sm: "12px", xs: "4px" },
                  fontSize: { sm: "11px", xs: "8px" },
                  paddingX: { sm: "18px", xs: "10px" },
                }}
              >
                All
              </Button>
            </Box>
          )}

          <IconButton
            color="primary"
            aria-label="send"
            type="submit"
            disabled={loading}
            sx={{
              paddingBottom: "16px",
            }}
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
            // bgcolor: "background.paper",
            boxShadow: 24,
            // p: 4,
            // maxWidth: "90vw",
            // maxHeight: "90vh",
          }}
        >
          <img
            src={selectedImage}
            alt="Preview"
            style={{ maxWidth: "90vw", maxHeight: "90vh" }}
          />
        </Box>
      </Modal>
    </>
  );
}

export default ChatView;

const InputStyle = {
  "& .MuiInputBase-input::placeholder": {
    fontFamily: "var(--main-font-family)",
  },
  width: "60%",
  backgroundColor: "#EDF2F6",
  borderRadius: "8px",
  fontFamily: "var(--main-font-family)",
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
  fontFamily: "var(--main-font-family)",
  border: "1px solid #4C8AB1",
  borderRadius: "10px",
  whiteSpace: "nowrap",
  // padding: "13.2px",
  cursor: "pointer",
  width: "100%",
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
