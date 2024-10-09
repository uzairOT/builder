import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  useCreateConverstaionMutation,
  useGetConversationQuery,
} from "../../../redux/apis/Chat/chatApiSlice";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { useGetProjectTeamQuery } from "../../../redux/apis/Project/projectApiSlice";
import { socket } from "../../../socket";
import ConversationCard from "./ConversationCard";
import TabList from "@mui/joy/TabList";
import TabPanel from "@mui/joy/TabPanel";
import Tabs from "@mui/joy/Tabs";
import Tab from "@mui/joy/Tab";
import BuilderProButton from "../../UI/Button/BuilderProButton";
let data = localStorage.getItem("userInfo");
let userInfo = JSON.parse(data);
const currentUser = userInfo?.user;

const ConversationList = ({
  handleSetConversationId,
  conversationId,
  value,
  setValue,
  id,
  handleValueChange,
  data,
  handleChatUserChange,
  setConversationId,
  refetchConversations,
  chatUser,
  setIsLoading,
}) => {
  const [projectName] = useOutletContext();
  const userId = currentUser?.id;
  const { data: team, isLoading: teamIsLoading } = useGetProjectTeamQuery(id);
  const [createConverstaion] = useCreateConverstaionMutation();
  const [tabValue, setTableValue] = useState(0);

  const handleTabChange = async (event, newValue) => {
    setTableValue(newValue);
  };
  const CustomTabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  };

  const handleSelectChangeEvent = async (e) => {
    const value = e.target.value;
    // console.log(value);
    setValue(value);
    setIsLoading(true);
    if (!(value === id)) {
      try {
        const res = await createConverstaion({
          userOneId: value,
          userTwoId: currentUser?.id,
        });
        setConversationId(res?.data?.conversation?.id);
        if (res?.data?.message === "Conversation created successfully!") {
          await refetchConversations();
        }
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    } else {
      handleTabChange("", 0);
      setConversationId(null);
      // setValue(value);
    }
  };
  useEffect(() => {
    const handleRefetch = async () => {
      try {
        await refetchConversations({ userId: userId });

      } catch (error) {
        console.error("Error refetching conversations:", error);
      }
    };

    // Set up the socket listener
    socket.on(`conversation${userId}`, handleRefetch);

    // Cleanup function to remove the socket listener
    return () => {
      socket.off(`conversation${userId}`, handleRefetch);
    };
  }, [userId]);
  // console.log(conversationId);
  useEffect(()=>{
    const handleRefetch = async () => {
      try {
        await refetchConversations({ userId: userId });

      } catch (error) {
        console.error("Error refetching conversations:", error);
      }
    };
    handleRefetch();
  },[tabValue])

  return (
    <Stack>
      <Typography fontFamily={"var(--main-font-family)"} variant="h6" pl={2}>
        Chat
      </Typography>
      <Stack direction={"row"} width={"100%"}>
        <Button
          sx={{
            borderRadius: 15,
            fontSize: "14px !important",
            backgroundColor: "#FFAC00",
            margin: 1,
            "&:hover": {
              backgroundColor: "#FFAC00", // Change to the color you want on hover
              cursor: "pointer", // Optional: Change cursor on hover
            },
          }}
          marginLeft={{ xl: "20px", lg: "2px" }}
        >
          <Select
            IconComponent={""}
            value={""}
            displayEmpty
            onChange={handleSelectChangeEvent}
            sx={{
              padding: 0,
              width: "100%",
              height: "18px",
              "& .Mui-focused": {
                border: "none",
                borderWidth: "0px !important",
              },
              ".MuiOutlinedInput-notchedOutline": {
                border: "none",
                borderWidth: "0px !important",
              },
            }}
          >
            <MenuItem
              style={{
                color: "black",
                fontWeight: "600px",
                fontSize: "10px !important",
              }}
              disabled
              value=""
            >
              <Typography
              textTransform={"capitalize"}
                fontFamily={ 'var(--main-font-family)'}
                fontSize={{ xl: "11px", lg: "9px" }}
                pt={0.5}
                ml={0.6}
                color={"white"}
              >
                Start New Converstion
              </Typography>
            </MenuItem>
            <MenuItem value={id} disabled={value === id}>
              <Typography fontFamily={"var(--main-font-family)"}>
                Project Chat: {projectName}
              </Typography>
            </MenuItem>
            {team?.team?.map((user, index) => {
              if (user.userId === userId) {
                return null;
              }
              return (
                <MenuItem
                  value={user.userId}
                  disabled={value === user.userId}
                  onClick={() => {
                    handleTabChange("", 1);
                    handleChatUserChange(user);
                  }}
                  sx={{ display: "flex", flexDirection: "row", gap: "8px" }}
                >
                  <Avatar
                    sx={{ width: "25px", height: "25px" }}
                    src={user.image}
                    alt={`${user.firstName}'s profile`}
                  ></Avatar>
                  <Typography fontSize={"14px"}>
                    {user.firstName} {user.lastName}
                  </Typography>
                </MenuItem>
              );
            })}
          </Select>
        </Button>
      </Stack>
      {/* <Box sx={{ width: "100%" }}> */}
      <Tabs aria-label="Basic tabs" value={tabValue} onChange={handleTabChange}>
        <TabList>
          <Tab style={{ width: "100%", padding: "0px" }}>
            <Typography
              fontSize={"14px"}
              sx={{
                fontFamily: "var(--main-font-family)",
              }}
            >
              Group Chat
            </Typography>
          </Tab>
          <Tab sx={{ width: "100%" }}>
            <Typography
              fontSize={"14px"}
              sx={{
                fontFamily: "var(--main-font-family)",
              }}
            >
              Private Chat
            </Typography>
          </Tab>
        </TabList>
        <TabPanel style={{ padding: 0 }} value={0}>
          <List
            sx={{
              width: "100%",
              maxWidth: { xl: 360 },
              bgcolor: "background.paper",
            }}
          >
            <ListItem
              alignItems="flex-start"
              style={{
                fontFamily: "var(--main-font-family)",
                cursor: "pointer",
                marginBottom: "1px",
                backgroundColor: value === id ? "#e0e0e0" : "inherit",
                transition: "background-color 0.1s ease",
                display: "flex",
                alignItems: "center",
                paddingTop: 0,
              }}
              onClick={() => handleValueChange(id)}
            >
              <ListItemAvatar>
                <Avatar alt={""} src={""} />
              </ListItemAvatar>
              <ListItemText
                fontFamily={"var(--main-font-family)"}
                // sx={{overflow:'hidden', textOverflow:'ellipsis'}}
                primaryTypographyProps={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                primary={
                  <React.Fragment>
                    <Typography
                      sx={{
                        display: "flex",
                        fontFamily: "var(--main-font-family)",
                      }}
                      component="span"
                      variant="body1"
                      color="text.primary"
                    >
                      {projectName}
                    </Typography>
                    {/* {" — I'll be in your neighborhood doing errands this…"} */}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider />
          </List>
        </TabPanel>
        <TabPanel style={{ padding: 0 }} value={1}>
          <List
            sx={{
              fontFamily: "var(--main-font-family)",
              width: "100%",
              maxWidth: { xl: 360 },
              bgcolor: "background.paper",
            }}
          >
            {/* <Typography pl={2}>Private Chats</Typography> */}
            {data?.conversations?.map((conversation, index) => {
              return (
                <React.Fragment key={conversation?.ChatConversation?.id}>
                  <ConversationCard
                    conversation={conversation}
                    conversationId={conversationId}
                    handleSetConversationId={handleSetConversationId}
                    userId={userId}
                  />
                </React.Fragment>
              );
            })}
          </List>
        </TabPanel>
      </Tabs>
      {/* </Box> */}
    </Stack>
  );
};

export default ConversationList;
