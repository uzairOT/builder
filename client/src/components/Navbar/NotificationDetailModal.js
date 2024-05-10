import React, { useEffect, useState } from "react";
import { json, useLocation, useParams } from "react-router-dom";
import moment from "moment";
import { useGetTeamMembersQuery, useGetWorkOrderDetailsMutation } from "../../redux/apis/Project/projectApiSlice";
import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Modal,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import BuilderProButton from "../UI/Button/BuilderProButton";
import {
  DateTimePicker,
  LocalizationProvider,
  renderTimeViewClock,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import AssignTeamMembers from "../dialogues/RequestWorkOrder/AssignTeamMembers";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import GenerateInvoiceDone from "../dialogues/GenerateInvoice/GenerateInvoiceDone";
import WorkOrder from "../Projects/ProjectsWorkOrder/WorkOrder";
import LineItemDetailModal from "../dialogues/LineItemDetailModal/LineItemDetailModal";
import { projectUserRoleAuth } from "../Projects/ProjectsInitialProposal/InitialProposalView";
import axios from "axios";
import { getTokenFromLocalStorage } from "../../redux/apis/apiSlice";
import { useUpdateRequestWorkOrderMutation } from "../../redux/apis/Project/workOrderApiSlice";
import { toast } from "react-toastify";

const NotificationDetailModal = ({
  rowCheckboxes,
  checkedRow,
  changeOrder,
  notification,
  isEvent,
  open,
  setOpen,
  handleOnClick,
}) => {
  const { data } = useGetTeamMembersQuery(notification.WorkOrderReq.projectId);

  const [done, setDone] = useState(false);
  const [disable, setDisable] = useState(true)
  const [updateWorkOrder] = useUpdateRequestWorkOrderMutation();
  const [authUserRole, setAuthUserRole] = useState();
  const [selectedLineItem, setSelectedLineItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const user = localStorage.getItem('userInfo')
  const currentUser = JSON.parse(user);
    const userId = currentUser.user.id;
    console.log(notification)
  const [assignedCheckboxes, setAssignedCheckboxes] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  // console.log(notification.WorkOrderReq)
  const handleListItemClick = (lineItem) => {
    setSelectedLineItem(lineItem);
    setModalOpen(true);
  };
  const handleCompleteWorkOrder = async () => {
    try {
     const res = await updateWorkOrder({
        workOrder_id: notification.WorkOrderReq.id,
        status: "complete",
      }).unwrap();
      toast.success('Work Order Completed!') 
      handleClose(); 
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    const authUserRole = async () => {
      setDisable(true);
      try {
        const response = await axios.post('http://3.135.107.71/project/getUserProjectRole', 
        {
          projectId: notification.WorkOrderReq.projectId,
          userId: userId
        }
        ,{
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`
          }
        })
        if(response.data.role === 'superadmin' || response.data.role ==='client' || response.data.role ==='projectManager' ){
          setDisable(false)
        }
        console.log(response)
      } catch (error){
        console.log(error)
      }
    }

    if(isEvent) authUserRole();
  },[])
  return (
    <>
      <Stack alignItems={"flex-end"} justifyContent={"flex-end"} pr={2}>
        {/* {!isEvent ? (
          <BuilderProButton
            variant={"contained"}
            backgroundColor={"#4C8AB1"}
            fontSize={"11px"}
            fontFamily={"Inter, sans serif"}
            marginLeft={"5px"}
            handleOnClick={handleOnClick}
          >
            Detail
          </BuilderProButton>
        ) : (
          <></>
        )} */}
      </Stack>
      <Modal open={open} onClose={handleClose}>
        <Stack
          sx={{
            ...style,
            ...themeStyle.scrollable,
          }}
          overflow={"scroll"}
        >
          <Typography
            p={2}
            color={"#4C8AB1"}
            fontFamily={"inherit"}
            fontSize={"22px"}
            fontWeight={"600"}
          >
            Work Order Details
          </Typography>
          <Divider />
          <Stack
            direction={{
              xl: "row",
              lg: "row",
              md: "row",
              sm: "column",
              xs: "column",
            }}
            height={"100%"}
          >
            <Stack p={3} spacing={1} width={"100%"}>
              <Typography fontFamily={"inherit"}>
                <strong>Subject: </strong>{" "}
                <label>{notification.WorkOrderReq.subject}</label>
              </Typography>
              <Typography pb={1} fontFamily={"inherit"} fontWeight={"200"}>
                <strong>Description: </strong>{" "}
                <label>{notification.WorkOrderReq.description}</label>
              </Typography>
              <Divider />

              <Typography pt={1} sx={themeStyle.headingText}>
                Total
              </Typography>
              <Stack pb={1} direction={"row"} justifyContent={"space-between"}>
                <Typography
                  sx={{ ...themeStyle.typoTitle, ...themeStyle.costText }}
                >
                  ${notification.WorkOrderReq.total}
                </Typography>
              </Stack>
              <Divider />
              <Stack
                direction={{ xl: "row", lg: "row", md: "column" }}
                justifyContent={"space-around"}
                spacing={8}
                p={2}
              >
                <Stack>
                  <Typography sx={themeStyle.headingText}>
                    Phases
                    <Typography
                      sx={{
                        ...themeStyle.headingText,
                        color: "#9E9E9E",
                        marginTop: "0rem",
                      }}
                    >
                      {/* Content for the second Typography (optional) */}
                    </Typography>
                  </Typography>

                  <FormControl>
                    {notification?.WorkOrderReq?.phaseItems?.map(
                      (phaseItem) => (
                        <React.Fragment key={phaseItem.Phase.id}>
                          <ListItem
                            key={phaseItem.Phase.id}
                            style={{ padding: "4px" }}
                          >
                            <label>{phaseItem.Phase.phase_name}</label>
                          </ListItem>
                        </React.Fragment>
                      )
                    )}
                  </FormControl>
                </Stack>
                <Stack>
                  <Typography sx={themeStyle.headingText}>
                    Line Item
                    <Typography
                      sx={{
                        ...themeStyle.headingText,
                        color: "#9E9E9E",
                        marginTop: "0rem",
                      }}
                    ></Typography>
                  </Typography>
                  <List
                    sx={{
                      maxHeight: "150px",
                      overflow: "auto",
                      ...themeStyle.scrollable,
                    }}
                  >
                    {notification?.WorkOrderReq?.phaseItems?.map(
                      (phaseItem) => (
                        <React.Fragment key={phaseItem.phaseId}>
                          {phaseItem?.LineItems?.map((lineItem) => (
                            <ListItem
                              key={lineItem?.id}
                              sx={{
                                padding: 1,
                                cursor: "pointer", // Change cursor to pointer to indicate clickable
                                backgroundColor: "#f0f0f0", // Add background color on hover
                                transition: "background-color 0.3s ease", // Add transition effect
                                borderRadius: "8px",
                                marginBottom: "4px",
                                "&:hover": {
                                  backgroundColor: "#e0e0e0", // Change background color on hover
                                },
                              }}
                              onClick={() => handleListItemClick(lineItem)}
                            >
                              <label>{lineItem?.title}</label>
                            </ListItem>
                          ))}
                        </React.Fragment>
                      )
                    )}
                  </List>
                </Stack>
              </Stack>
              <Divider />
              <Stack spacing={1}>
                <Typography pt={1} sx={themeStyle.headingText}>
                  Date Started
                </Typography>
                <Typography
                  sx={{ ...themeStyle.typoTitle, ...themeStyle.costText }}
                >
                  <Box sx={themeStyle.dateBox}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <DateTimePicker
                          disabled
                          value={moment(
                            notification.WorkOrderReq.start_day
                          ).utc()}
                          format="MMM D, YYYY, h:mm a"
                          viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                          }}
                          // defaultValue={moment("2024-04-17T15:30")}
                          slotProps={{
                            // Targets the `IconButton` component.
                            openPickerButton: {
                              color: "#5B5B5B",
                            },
                            // Targets the `InputAdornment` component.
                            inputAdornment: {
                              position: "start",
                            },
                          }}
                          sx={{
                            input: {
                              fontFamily:
                                "GT-Walsheim-Regular-Trial, sans serif",
                            },
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Box>
                </Typography>
              </Stack>
              <Stack spacing={1} pt={2}>
                <Typography pt={1} sx={themeStyle.headingText}>
                  Date Ended
                </Typography>
                <Typography
                  sx={{ ...themeStyle.typoTitle, ...themeStyle.costText }}
                >
                  <Box sx={themeStyle.dateBox}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <DateTimePicker
                          disabled
                          value={moment(
                            notification.WorkOrderReq.end_day
                          ).utc()}
                          format="MMM D, YYYY, h:mm a"
                          viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                          }}
                          // defaultValue={moment("2024-04-17T15:30")}
                          slotProps={{
                            // Targets the `IconButton` component.
                            openPickerButton: {
                              color: "#5B5B5B",
                            },
                            // Targets the `InputAdornment` component.
                            inputAdornment: {
                              position: "start",
                            },
                          }}
                          sx={{
                            input: {
                              fontFamily:
                                "GT-Walsheim-Regular-Trial, sans serif",
                            },
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Box>
                </Typography>
                <Stack width={"80%"} pt={4}>
                  {/* <BuilderProButton
                    backgroundColor={"#4C8AB1"}
                    variant={"contained"}
                    fontFamily={"Inter, sans serif"}
                    fontSize={"16px"}
                    fontWeight={"600"}
                    padding={"6px 32px 6px 32px"}
                    marginLeft={"0px"}
                    
                  >
                    Close
                  </BuilderProButton> */}
                </Stack>
              </Stack>
            </Stack>
            <Stack backgroundColor={"#EFF5FF"} width={"100%"}>
              <Box>
                <Typography
                  sx={{
                    ...themeStyle.headingText,
                    ...themeStyle.rightheadings,
                  }}
                >
                  Created By
                </Typography>
                <Box sx={themeStyle.avatarBox}>
                  <Avatar
                    sx={themeStyle.AvatarStyle}
                    // src={user.user.image ? user?.user?.image : Avatarimg}
                    src={notification.WorkOrderReq.User.image}
                  />

                  <Typography fontFamily={"inherit"} alignSelf={"end"} pl={1}>
                    {notification.WorkOrderReq.User.firstName}
                  </Typography>
                </Box>
                {/* Divider  */}
                <hr style={themeStyle.hrLine} />

                <Typography
                  sx={{
                    ...themeStyle.headingText,
                    ...themeStyle.rightheadings,
                  }}
                >
                  Assigned
                </Typography>
                <Box sx={themeStyle.avatarBox}>
                  <Stack direction={"row"} pr={1}>
                    {data?.team?.map((user, idx) => {
                      if (user.userId !== notification.WorkOrderReq.createdBy) {
                        return (
                          <Avatar
                            key={idx}
                            sx={themeStyle.AvatarStyle}
                            src={user.image}
                          />
                        );
                      }
                      return null; // or <></>
                    })}
                  </Stack>
                  <AssignTeamMembers
                    assignedCheckboxes={assignedCheckboxes}
                    setAssignedCheckboxes={setAssignedCheckboxes}
                    data={data}
                  />
                </Box>
                {/* Divider  */}
                <hr style={themeStyle.hrLine} />

                <Typography
                  sx={{
                    ...themeStyle.headingText,
                    ...themeStyle.rightheadings,
                  }}
                >
                  Notes
                </Typography>
                <Typography fontFamily={"inherit"} pb={4} pl={2}>
                  {notification.WorkOrderReq.notes}
                </Typography>

                <hr style={themeStyle.hrLine} />
                <Typography
                  sx={{
                    ...themeStyle.headingText,
                    ...themeStyle.rightheadings,
                  }}
                >
                  Status
                </Typography>
                <Typography fontFamily={"inherit"} pb={4} pl={2}>
                  {notification.WorkOrderReq.status}
                </Typography>

                <hr style={themeStyle.hrLine} />
                {isEvent && (
                  <BuilderProButton
                    backgroundColor={"#4C8AB1"}
                    variant={"contained"}
                    fontFamily={"Inter, sans serif"}
                    fontSize={"16px"}
                    fontWeight={"600"}
                    padding={"6px 32px 6px 32px"}
                    disabled={disable}
                    handleOnClick={handleCompleteWorkOrder}
                  >
                    Complete Work Order
                  </BuilderProButton>
                )}
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Modal>
      {modalOpen && (
        <LineItemDetailModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          lineItem={selectedLineItem}
        />
      )}
      {done && <GenerateInvoiceDone setDone={setDone} />}
    </>
  );
};

export default NotificationDetailModal;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 0,
  borderRadius: "14px",
  width: "700px",
};
const themeStyle = {
  scrollable: {
    scrollbarWidth: "none", // For Firefox
    "-ms-overflow-style": "none", // For IE and Edge
    "&::-webkit-scrollbar": {
      width: "0px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "transparent",
      transition: "background-color 0.3s",
    },
    "&:hover::-webkit-scrollbar-thumb": {
      backgroundColor: "#ddd",
    },
    overflowY: "scroll",
  },
  inputFields: {
    border: "0px solid #FFF",
    outline: "none",
    width: "100%",
    padding: 4,
  },
  typoTitle: {
    fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
    fontSize: "1.5rem",
    fontWeight: 500,
    color: "#4C8AB1",
    marginLeft: "-1rem",
  },
  buttonBox: {
    display: "flex",
    flexDirection: { lg: "row", sm: "row", xs: "column" },
    justifyContent: "flex-start",
    marginTop: "3rem",
    marginBottom: "2rem",
    gap: "1rem",
  },
  dialogcontentBox: {
    display: "flex",
    flexDirection: { lg: "row", sm: "column", xs: "column" },
    padding: "0rem",
    margin: "-0.5rem -1rem -1rem 0rem",
  },
  leftBox: {
    width: { lg: "55%", md: "100%", xs: "100%" },
    display: "flex",
    flexDirection: "column",
    paddingLeft: "1.5rem",
  },
  rightBox: {
    width: { lg: "45%", md: "100%", xs: "100%" },
    background: "#EFF5FF",
    display: "flex",
    flexDirection: "column",
  },
  paperPropsStyle: {
    borderRadius: "1rem",
    width: { lg: "90%", md: "60%", sm: "60%", xs: "70%" },
    maxWidth: { lg: "50%", md: "60%", sm: "60%", xs: "70%" },
    padding: "1rem 1rem", // Change background color here
  },

  typoText: {
    fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
    fontSize: "1rem",
    color: "#202227",
  },
  sendButton: {
    width: { lg: "35%", md: "35%", sm: "40%", xs: "60%" },
    fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  },
  declineButton: {
    background: "#FFF",
    color: "#4C8AB1",
    border: "1px solid #4C8AB1",
    ":hover": {
      background: "#FAF9F6",
    },
  },
  time: {
    fontFamily: "inherit",
    fontSize: "1rem",
    fontStyle: "italic",
    color: "#484848",
    marginTop: "1.5rem",
    whiteSpace: "nowrap",
  },
  hrLine: {
    border: "1px solid #CCCCCC",
    width: "98%",
    marginTop: "-0.7rem",
  },
  radioText: {
    color: "#3D3D3D",
    fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  },
  radioChecked: {
    "&, &.Mui-checked": {
      color: "#000",
    },
  },
  headingText: {
    fontFamily: "inherit",
    color: "#000000",
    fontWeight: 600,
    marginTop: "0.5rem",
    fontSize: "1.1rem",
    display: "flex",
    gap: "1rem",
  },
  rightheadings: {
    fontSize: "0.9rem",
    color: "#636363",
    margin: "1rem 0rem 0rem 1rem",
  },
  linkButton: {
    fontFamily: "Inter",
    fontWeight: 500,
    textTransform: "none",
    color: "#858585",
    fontSize: { lg: "0.9rem", md: "0.9rem", sm: "0.8rem", xs: "0.6rem" },
    justifyContent: "flex-start",
    marginLeft: "-0.3rem",
    marginBottom: "1rem",
  },
  costText: {
    marginLeft: "0rem",
    fontSize: "1.2rem",
    fontWeight: 700,
  },
  pendingbutton: {
    margin: "0rem 0rem 1rem 1.5rem",
    color: "#D92525",
  },
  priorityButton: {
    margin: "0rem 0rem 1rem 1.5rem",
    color: "#636363",
  },
  avatarBox: {
    display: "flex",
    margin: "0.2rem 0rem 1rem 1.5rem",
    justifyContent: "flex-start",
  },
  AvatarStyle: {
    width: 30,
    height: 30,
    ml: "-5px",
    mt: 1,
  },
  dateBox: {
    display: "flex",
    paddingLeft: "1.5rem",
    marginTop: "-1rem",
  },
};
