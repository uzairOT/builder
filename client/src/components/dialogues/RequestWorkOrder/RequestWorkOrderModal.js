import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  Select,
  MenuItem,
  TextField,
  Checkbox,
  FormGroup,
  ListItem,
  ListItemText,
  List,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BuilderProButton from "../../UI/Button/BuilderProButton";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AddIcon from "@mui/icons-material/Add";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Avatarimg from "../Assets/pngs/woman.png";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { selectAddPhase } from "../../../redux/slices/addPhaseSlice";
import GenerateInvoiceDone from "../GenerateInvoice/GenerateInvoiceDone";
import { useRequestWorkOrderMutation } from "../../../redux/apis/Project/workOrderApiSlice";
import AssignTeamMembers from "./AssignTeamMembers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetUserEventsMutation } from "../../../redux/apis/usersApiSlice";
import { getForecast } from "../../../redux/slices/DailyForecast/dailyForecastSlice";
import {
  addEvents,
  setIsLoading,
} from "../../../redux/slices/Events/eventsSlice";
import { useGetTeamMembersQuery } from "../../../redux/apis/Project/projectApiSlice";
import { useLocation } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { setNotifications } from "../../../redux/slices/Notifications/notificationSlice";
import useSocket from "../../../utils/useSocket";

const RequestWorkOrderModal = ({ rowCheckboxes, checkedRow, changeOrder }) => {

  const location = useLocation();
  const projectId = location.pathname.split("/")[2];
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [showLineItems, setShowLineItems] = useState(false);
  const { addPhase } = useSelector(selectAddPhase);
  const [priority, setPriority] = useState("urgent");
  const [status, setStatus] = useState("pending");
  const [subject, setSubject] = useState(
    changeOrder ? checkedRow?.subject : ""
  );
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [description, setDescription] = useState(
    changeOrder ? checkedRow?.description : ""
  );
  const [phase, setPhase] = useState("");
  const [lineItems, setLineItems] = useState("");
  const { data } = useGetTeamMembersQuery(projectId);
  const [assignedCheckboxes, setAssignedCheckboxes] = useState([]);
  const userInfo = localStorage.getItem("userInfo");
  const user = JSON.parse(userInfo);
  const userId = user?.user.id;
  const [notes, setNotes] = useState();
  const forecast = useSelector(getForecast);
  const dailyForecast = forecast.dailyForecast || [];
  const [getEvents] = useGetUserEventsMutation();
  const dispatch = useDispatch();
  const { emit } = useSocket();
  const [selectedItems, setSelectedItems] = useState([]);
  const phaseId = rowCheckboxes[0]?.rows[0]?.phase_id;
  let counter = 0;
  let lineItemIds = [];
  let lineItemCounter = 0;
  let totalWorkOrder = 0;

  if(changeOrder){

    checkedRow?.phaseItems?.forEach((phase) => {
      lineItemCounter += phase.lineItemId.length;
      console.log('lineItemCounter: ',lineItemCounter);
      console.log('phase.lineItemId.length: ',phase.lineItemId.length);
    })
  } else{

    
    Object?.keys(rowCheckboxes)?.forEach((phaseData) => {
      lineItemCounter += rowCheckboxes[phaseData].rows.length;
      const lineItemGroup = {
        phaseId: phaseData,
        lineItemId: rowCheckboxes[phaseData].rows.map((row) => row.id),
      };
      lineItemIds.push(lineItemGroup);
      rowCheckboxes[phaseData].rows.forEach((lineItem)=>{
        totalWorkOrder += parseInt(lineItem.total);
      })
      
    });
  }
  
  console.log('final lineItemCount: ', lineItemCounter)
  // });
  const ENDPOINT = "http://192.168.0.106:8080";
  //test new workd order

  // Object?.values(rowCheckboxes)?.forEach((phaseData) => {
  //   const lineItemGroup = {
  //     phaseId: phaseData.id,
  //     lineItemId: phaseData.rows.map((row) => row.id),
  //   };
  //   lineItemIds.push(lineItemGroup);
  // });
  //tes end..
  //console.log(assignedCheckboxes);
  const [requestWorkOrderPut] = useRequestWorkOrderMutation();

  console.log("checkedRow--------------->", checkedRow);
  console.log("selectedItems--------------->", selectedItems);
  const isButtonDisabled = Object?.keys(rowCheckboxes)?.length === 0;
  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };
  const handleClose = () => {
    setOpen(false);
    setShowLineItems(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handlePhaseRadioChange = (event) => {
    setPhase(event.target.value);
  };
  const handleLineItemRadioChange = (event) => {
    setLineItems(event.target.value);
  };

  const handlePhaseChange = (phaseId) => {
    const existingPhase = selectedItems.find(item => item.phaseId === phaseId);

    if (existingPhase) {
      const updatedItems = selectedItems.filter(item => item.phaseId !== phaseId);
      setSelectedItems(updatedItems);
    } else {
      const phaseItems = checkedRow.phaseItems.find(item => item.phaseId === phaseId);
      const updatedItems = [...selectedItems, { phaseId, lineItemId: phaseItems.lineItemId }];
      setSelectedItems(updatedItems);
    }
  };

  const handleLineItemChange = (phaseId, lineItemId) => {
    const existingPhaseIndex = selectedItems.findIndex(item => item.phaseId === phaseId);
    
    if (existingPhaseIndex !== -1) {
      const existingLineItemIndex = selectedItems[existingPhaseIndex].lineItemId.indexOf(lineItemId);
  
      if (existingLineItemIndex !== -1) {
        // Remove the line item
        const updatedItems = [...selectedItems];
        updatedItems[existingPhaseIndex] = {
          ...updatedItems[existingPhaseIndex],
          lineItemId: updatedItems[existingPhaseIndex].lineItemId.filter(id => id !== lineItemId),
        };
  
        // If no line items are selected for the phase, remove the phase
        if (updatedItems[existingPhaseIndex].lineItemId.length === 0) {
          updatedItems.splice(existingPhaseIndex, 1);
        }
  
        setSelectedItems(updatedItems);
      } else {
        // Add the line item
        const updatedItems = [...selectedItems];
        updatedItems[existingPhaseIndex] = {
          ...updatedItems[existingPhaseIndex],
          lineItemId: [...updatedItems[existingPhaseIndex].lineItemId, lineItemId],
        };
  
        setSelectedItems(updatedItems);
      }
    } else {
      // Add new phase and line item
      const updatedItems = [
        ...selectedItems,
        {
          phaseId,
          lineItemId: [lineItemId],
        },
      ];
  
      setSelectedItems(updatedItems);
    }
  };
  

  const handleRequest = async () => {
    const formattedStartDate = startDate.format("MMM D, YYYY, h:mm a");
    const formattedEndDate = endDate.format("MMM D, YYYY, h:mm a");
    console.log("CHEHCEH: ", selectedItems);

    const requestForm = {
      workOrder_id: changeOrder ? checkedRow.id : "",
      subject: subject,
      description: description,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      priority: priority,
      status: status,
      phase: phaseId,
      lineItem: changeOrder
        ? checkedRow.LineItem_id
        : lineItemIds[0].lineItemId[0],
      phaseItems: changeOrder ? selectedItems : lineItemIds,
      createdby: userId,
      teamIds: [...assignedCheckboxes, userId],
      notes: notes,
      projectId: projectId,
      total: changeOrder ? checkedRow?.total : totalWorkOrder
    };
    console.log("--------------------------------------", requestForm);
    if (requestForm.teamIds.length === 0) {
      toast.error("Team member must be assigned");
    } else {
      //await requestWorkOrderPut(requestForm);
      emit("join", userId);
      if (changeOrder) {
        await emit("updateWorkOrder", requestForm);
      } else {
        await emit("notification", requestForm);
      }
      dispatch(setIsLoading(true));
      console.log("sockect test");
      //emit('getNotifications', userId);
      const res = await getEvents({ userId, dailyForecast });
      const data = res?.data?.formattedWorkOrders;
      // const eventArr = data.map((item)=>{
      //     return{
      //       ...item,
      //       start: moment(item.start).toDate(),
      //       end: moment(item.end).toDate(),
      //     }
      // })
      //console.log("EVENT ARR", data);
      // setEvents(eventArr);
      dispatch(addEvents(data));
      dispatch(setIsLoading(false));
      setDone(true);
    }
  };

  return (
    <>
      <Stack alignItems={"flex-end"} justifyContent={"flex-end"} pr={2}>
        <BuilderProButton
          backgroundColor={"#4C8AB1"}
          variant={"contained"}
          fontFamily={"Inter, sans serif"}
          fontSize={"16px"}
          fontWeight={"600"}
          padding={"6px 32px 6px 32px"}
          handleOnClick={handleOpen}
          disabled={isButtonDisabled}
        >
          {changeOrder ? "Request Change Order" : "Request Work Order"}
        </BuilderProButton>
      </Stack>
      <Modal open={open} onClose={handleClose}>
        <Stack
          sx={{ ...style, ...themeStyle.scrollable }}
          height={"90%"}
          overflow={"scroll"}
        >
          <Typography
            p={2}
            color={"#4C8AB1"}
            fontFamily={"inherit"}
            fontSize={"22px"}
            fontWeight={"600"}
          >
            {changeOrder ? "Request Change Order" : "Request Work Order"}
          </Typography>
          <Divider />
          <Stack
            direction={{
              xl: "row",
              lg: "row",
              md: "column",
              sm: "column",
              xs: "column",
            }}
            height={"100%"}
          >
            <Stack p={3} spacing={1} width={"100%"}>
              <Typography fontFamily={"inherit"}>
                <strong>Subject: </strong>{" "}
                <input
                  value={subject}
                  placeholder="Type your subject..."
                  type="text"
                  style={themeStyle.inputFields}
                  onChange={handleSubjectChange}
                ></input>
              </Typography>
              <Typography pb={1} fontFamily={"inherit"} fontWeight={"200"}>
                <strong>Description: </strong>{" "}
                <input
                  value={description}
                  placeholder="Type your description..."
                  type="text"
                  multiple
                  style={themeStyle.inputFields}
                  onChange={handleDescriptionChange}
                ></input>
              </Typography>
              <Divider />

              <Typography pt={1} sx={themeStyle.headingText}>
                Total
              </Typography>
              <Stack pb={1} direction={"row"} justifyContent={"space-between"}>
                <Typography
                  sx={{ ...themeStyle.typoTitle, ...themeStyle.costText }}
                >
                  ${changeOrder? checkedRow?.total : totalWorkOrder}
                </Typography>
                {/* <BorderColorIcon style={{ color: "#484848" }} /> */}
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
                      {changeOrder ? checkedRow?.phaseItems?.length : Object?.keys(rowCheckboxes)?.length}
                    </Typography>
                  </Typography>
                  {/*
                  PREV CODE OF THAT WAS USING RADIO BUTTONS
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue={
                        Object?.values(rowCheckboxes)[0]?.rows[0]?.phase_id
                      }
                      name="radio-buttons-group"
                      onChange={handlePhaseRadioChange}
                    >
                      {checkedRow
                        ? checkedRow?.phaseItems.map((phase) => (
                            <Typography>{phase.phase_name}</Typography>
                          ))
                        : Object?.keys(rowCheckboxes)?.map((key, index) => {
                            const phaseId =
                              rowCheckboxes[key]?.rows[0]?.phase_id;
                            const isFirstItem = index === 0;

                            return (
                              <FormControlLabel
                                sx={themeStyle.radioText}
                                value={phaseId}
                                control={
                                  <Radio
                                    sx={themeStyle.radioChecked}
                                    disabled={isFirstItem}
                                  />
                                }
                                label={key}
                              />
                            );
                          })}
                    </RadioGroup>
                  </FormControl> */}
                  {/* <FormControl>
                    {checkedRow
                      ? checkedRow.phaseItems.map((phase) => (
                          <FormControlLabel
                            key={phase.phase_id}
                            control={<Checkbox checked disabled />}
                            label={phase.phase_name}
                          />
                        ))
                      : Object.keys(rowCheckboxes).map((key, index) => {
                          const phaseId = rowCheckboxes[key]?.rows[0]?.phase_id;

                          return (
                            <FormControlLabel
                              key={phaseId}
                              sx={themeStyle.radioText}
                              control={
                                <Checkbox
                                  sx={themeStyle.radioChecked}
                                  checked
                                />
                              }
                              label={key}
                            />
                          );
                        })}
                  </FormControl> */}
                  <FormControl>
                    {checkedRow
                      ? checkedRow.phaseItems.map((phase) => (
                        <ListItem key={phase.phaseId}>
                        <Checkbox
                          checked={selectedItems.some(item => item.phaseId === phase.phaseId)}
                          onChange={() => handlePhaseChange(phase.phaseId)}
                        />
                        <ListItemText secondary={phase.phase_name} />
                        </ListItem>
                        ))
                      : Object.keys(rowCheckboxes).map((key, index) => {
                          const phaseId = rowCheckboxes[key]?.rows[0]?.phase_id;
                          return (
                            <ListItem key={phaseId}>
                              <ListItemText secondary={rowCheckboxes[key].phaseName} />
                            </ListItem>
                          );
                        })}
                  </FormControl>

                  {/* <Button
                    sx={themeStyle.linkButton}
                    startIcon={<AddIcon sx={{ color: "#000" }} />}
                  >
                    Add Phase
                  </Button> */}
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
                    >
                      {lineItemCounter}
                    </Typography>
                  </Typography>
                  <List>
                    {changeOrder
                      ?checkedRow?.phaseItems.map((phase, phaseIndex) => {
                        return phase.lineItem_names.map((lineItem, index) => {
                          counter++;
                          console.log(lineItem);
                          console.log(counter);
                          if (counter <= 2) {
                            return (
                              <ListItem key={counter}>
                                <Checkbox
                                  checked={selectedItems.some(item => item.phaseId === phase.phaseId && item.lineItemId.includes(phase.lineItemId[index]))}
                                  onChange={() => handleLineItemChange(phase.phaseId, phase.lineItemId[index])}
                                />
                                <ListItemText secondary={lineItem} />
                              </ListItem>
                            );
                          }
                          if (counter > 2 && showLineItems) {
                            return (
                              <ListItem key={counter}>
                                <Checkbox
                                  checked={selectedItems.some(item => item.phaseId === phase.phaseId && item.lineItemId.includes(phase.lineItemId[index]))}
                                  onChange={() => handleLineItemChange(phase.phaseId, phase.lineItemId[index])}
                                />
                                <ListItemText secondary={lineItem} />
                              </ListItem>
                            );
                          }
                          return null;
                        });
                      })
                      : Object?.keys(rowCheckboxes)?.map((phase) => {
                          const phaseData = rowCheckboxes[phase];
                        console.log(phase)
                          return phaseData.rows.map((row, index) => {
                            counter++;
                            console.log("counter: ", counter);
                            if (counter <= 2) {
                             return( <ListItem key={counter}>
                              <ListItemText secondary={row.title} />
                            </ListItem>)
                            } 
                            if(counter >2 && showLineItems){
                              return (
                                <ListItem key={counter}>
                                  <ListItemText secondary={row.title} />
                                </ListItem>
                              );
                            }else {
                              return<></>
                            }
                          });
                        })}
                         <ListItem style={{padding:0, justifyContent:'end'}}>
                              <Button
                                style={{padding:0, textTransform: 'lowercase'}}
                                variant="text"
                                color="primary"
                                onClick={() => {
                                  setShowLineItems(!showLineItems);
                                }}
                                >
                                View more...
                              </Button>
                            </ListItem>
                  </List>
                  {/* <Button
                    sx={themeStyle.linkButton}
                    startIcon={<AddIcon sx={{ color: "#000" }} />}
                  >
                    Add Line Item
                  </Button> */}
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
                          value={startDate}
                          onChange={(newValue) => setStartDate(newValue)}
                          format="MMM D, YYYY,h:mm a"
                          viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                          }}
                          defaultValue={moment("2024-04-17T15:30")}
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
                          value={endDate}
                          onChange={(newValue) => setEndDate(newValue)}
                          format="MMM D, YYYY,h:mm a"
                          viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                          }}
                          defaultValue={moment("2024-04-17T15:30")}
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
                <Stack width={"80%"} pt={8}>
                  <BuilderProButton
                    backgroundColor={"#4C8AB1"}
                    variant={"contained"}
                    fontFamily={"Inter, sans serif"}
                    fontSize={"16px"}
                    fontWeight={"600"}
                    padding={"6px 32px 6px 32px"}
                    handleOnClick={handleRequest}
                    marginLeft={"0px"}
                  >
                    {changeOrder ? "Request Change" : "Request Work Order"}
                  </BuilderProButton>
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
                  {changeOrder ? (
                    checkedRow?.team.map((user) => {
                      if (checkedRow?.createdby == user?.userId) {
                        return (
                          <Avatar
                            sx={themeStyle.AvatarStyle}
                            src={user.image}
                          />
                        );
                      }
                    })
                  ) : (
                    <Avatar
                      sx={themeStyle.AvatarStyle}
                      src={user.user.image ? user?.user?.image : Avatarimg}
                    />
                  )}
                  <Typography fontFamily={"inherit"} alignSelf={"end"} pl={1}>
                    {changeOrder
                      ? checkedRow?.team.map((user) => {
                          if (checkedRow?.createdby == user?.userId) {
                            return <>{user?.firstName}</>;
                          }
                          return null; // Return null for users that don't match
                        })
                      : user?.user?.firstName}
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
                    {assignedCheckboxes.length === 0
                      ? checkedRow?.team?.map((user) => {
                          if (checkedRow?.createdby != user?.userId) {
                            return (
                              <Avatar
                                sx={themeStyle.AvatarStyle}
                                src={user.image}
                              />
                            );
                          }
                        })
                      : assignedCheckboxes?.map((id) => {
                          return (
                            <>
                              {data?.team?.map((user, idx) => {
                                if (user.userId === id) {
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
                            </>
                          );
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
                  <input
                    value={notes}
                    placeholder="Type your description..."
                    type="text"
                    multiple
                    style={{
                      ...themeStyle.inputFields,
                      backgroundColor: "#EFF5FF",
                    }}
                    onChange={handleNotesChange}
                  ></input>
                </Typography>
                {/* <Box sx={themeStyle.dateBox}>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DemoContainer components={["DateTimePicker"]}>
                      <DateTimePicker
                      value={dueDate}
                      onChange={(newValue) => setDueDate(newValue)}
                        format="MMM D, YYYY,h:mm a"
                        viewRenderers={{
                          hours: renderTimeViewClock,
                          minutes: renderTimeViewClock,
                          seconds: renderTimeViewClock,
                        }}
                        defaultValue={moment("2024-04-17T15:30")}
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
                            fontFamily: "GT-Walsheim-Regular-Trial, sans serif",
                          },
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Box> */}
                {/* Divider  */}
                <hr style={themeStyle.hrLine} />
                <Typography
                  sx={{
                    ...themeStyle.headingText,
                    ...themeStyle.rightheadings,
                  }}
                >
                  Set Priority
                </Typography>
                <Select
                  displayEmpty
                  renderValue={(value) => {
                    return (
                      <Stack direction={"row"} gap={1}>
                        <FlagOutlinedIcon sx={{ color: "#EB1717" }} />
                        <Typography
                          color={"#EB1717"}
                          textTransform={"capitalize"}
                          fontFamily={"Inter"}
                          fontWeight={"500"}
                          fontSize={{
                            lg: "0.9rem",
                            md: "0.9rem",
                            sm: "0.8rem",
                            xs: "0.6rem",
                          }}
                        >
                          {value}
                        </Typography>
                      </Stack>
                    );
                  }}
                  value={priority}
                  onChange={handlePriorityChange}
                  IconComponent={KeyboardArrowDownIcon}
                  sx={{
                    ...themeStyle.linkButton,
                    ...themeStyle.priorityButton,
                  }}
                  startIcon={<FlagOutlinedIcon sx={{ color: "#EB1717" }} />}
                >
                  <MenuItem value={"urgent"}>Urgent</MenuItem>
                  <MenuItem value={"normal"}>Normal</MenuItem>
                </Select>
                <hr style={themeStyle.hrLine} />
                {/* <Typography
                  sx={{
                    ...themeStyle.headingText,
                    ...themeStyle.rightheadings,
                  }}
                >
                  Status
                </Typography>
                <Select
                  displayEmpty
                  renderValue={(value) => {
                    return (
                      <Stack direction={"row"} gap={1}>
                        <FlagOutlinedIcon sx={{ color: "#EB1717" }} />
                        <Typography
                          color={"#EB1717"}
                          textTransform={"capitalize"}
                          fontFamily={"Inter"}
                          fontWeight={"500"}
                          fontSize={{
                            lg: "0.9rem",
                            md: "0.9rem",
                            sm: "0.8rem",
                            xs: "0.6rem",
                          }}
                        >
                          {value}
                        </Typography>
                      </Stack>
                    );
                  }}
                  value={status}
                  onChange={handleStatusChange}
                  IconComponent={KeyboardArrowDownIcon}
                  sx={{
                    ...themeStyle.linkButton,
                    ...themeStyle.priorityButton,
                  }}
                  startIcon={<FlagOutlinedIcon sx={{ color: "#EB1717" }} />}
                >
                  <MenuItem value={"pending"}>Pending</MenuItem>
                  <MenuItem value={"done"}>Done</MenuItem>
                </Select> */}
              </Box>
              <Stack spacing={0.5} p={1} px={3}>
                <Typography
                  fontSize={"13px"}
                  style={{
                    fontFamily: "GT-Walsheim-Regular-Trial, sans serif",
                  }}
                >
                  Created
                </Typography>
                <Typography
                  fontSize={"14px"}
                  color={"black"}
                  fontWeight={"600"}
                  style={{
                    fontFamily: "GT-Walsheim-Regular-Trial, sans serif",
                  }}
                >
                  Feb 6,2023,10:30 AM
                </Typography>
                <Typography
                  fontSize={"13px"}
                  style={{
                    fontFamily: "GT-Walsheim-Regular-Trial, sans serif",
                  }}
                >
                  Updated
                </Typography>
                <Typography
                  fontSize={"14px"}
                  color={"black"}
                  fontWeight={"600"}
                  style={{
                    fontFamily: "GT-Walsheim-Regular-Trial, sans serif",
                  }}
                >
                  CreatFeb 6,2023,10:30 AM
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Modal>
      {done && <GenerateInvoiceDone setDone={setDone} />}
    </>
  );
};

export default RequestWorkOrderModal;

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

  scrollable: {
    scrollbarWidth: "none", // For Firefox
    "-ms-overflow-style": "none", // For IE and Edge
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "transparent",
      transition: "background-color 0.3s",
    },
    "&:hover::-webkit-scrollbar-thumb": {
      backgroundColor: "#ddd",
    },
  },
};
