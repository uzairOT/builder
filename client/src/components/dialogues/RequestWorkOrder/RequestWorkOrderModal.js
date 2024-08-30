import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  Modal,
  Stack,
  Typography,
  Select,
  MenuItem,
  Checkbox,
  ListItem,
  ListItemText,
  List,
  IconButton,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BuilderProButton from "../../UI/Button/BuilderProButton";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Avatarimg from "../Assets/pngs/woman.png";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { selectAddPhase } from "../../../redux/slices/addPhaseSlice";
import GenerateInvoiceDone from "../GenerateInvoice/GenerateInvoiceDone";
import { useRequestWorkOrderMutation } from "../../../redux/apis/Project/workOrderApiSlice";
import AssignTeamMembers from "./AssignTeamMembers";
import { toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
import { useGetUserEventsMutation } from "../../../redux/apis/usersApiSlice";
import { getForecast } from "../../../redux/slices/DailyForecast/dailyForecastSlice";
import {
  addEvents,
  setIsLoading,
} from "../../../redux/slices/Events/eventsSlice";
import {
  useGetPhasesAndLineItemsByIdMutation,
  useGetTeamMembersQuery,
} from "../../../redux/apis/Project/projectApiSlice";
import { useLocation } from "react-router-dom";
import useSocket from "../../../utils/useSocket";
import {
  ArrowDropDownIcon,
  MobileDatePicker,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import UpdateLineDialogue from "../UpdateLineDialogue/UpdateLineDialogue";
import { io } from "socket.io-client";
import CloseIcon from "@mui/icons-material/Close";
import { socket } from "../../../socket";
import AddPhaseView from "../../AssignProject/AddPhaseView/AddPhaseView";
import { useProjectPermissionCheck } from "../../Projects/ProjectPermissions/ProjectsPermissionCheck";

const local = localStorage.getItem("userInfo");
const currentUser = JSON.parse(local);
// const socket = io("http://3.135.107.71", {
//   query: { userId: currentUser?.user?.id },
// });

const RequestWorkOrderModal = ({
  rowCheckboxes,
  checkedRow,
  changeOrder,
  refetch,
  phaseItems,
  setPhaseItems,
  fetchData,
  refetchChangeOrder,
  setRowCheckboxes,
  changeOrderView,
}) => {
  const location = useLocation();
  const projectId = location.pathname.split("/")[2];
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [showLineItems, setShowLineItems] = useState(false);
  const { addPhase } = useSelector(selectAddPhase);
  const [updateRow, setUpdateRow] = useState(rowCheckboxes);
  const [priority, setPriority] = useState("normal");
  const [status, setStatus] = useState("pending");
  const [subject, setSubject] = useState(
    changeOrder ? checkedRow?.subject : ""
  );

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [description, setDescription] = useState(
    changeOrder ? checkedRow?.description : ""
  );
  const { data, refetch: refetchProjectTeam } =
    useGetTeamMembersQuery(projectId);
  const [assignedCheckboxes, setAssignedCheckboxes] = useState([]);
  const [superAdminId, setSuperAdminId] = useState();
  const userInfo = localStorage.getItem("userInfo");
  const user = JSON.parse(userInfo);
  const userId = user?.user.id;
  const [notes, setNotes] = useState("");
  const forecast = useSelector(getForecast);
  const dailyForecast = forecast.dailyForecast || [];
  const [getEvents] = useGetUserEventsMutation();
  const dispatch = useDispatch();
  const { emit } = useSocket();
  const [selectedItems, setSelectedItems] = useState([]);
  const [showUpdateLine, setShowUpdateLine] = useState(false);
  const phaseId = rowCheckboxes[0]?.rows[0]?.phase_id;
  const [getPhasesAndLineItems] = useGetPhasesAndLineItemsByIdMutation();
  const [lineItemIndex, setLineItemIndex] = useState();
  const [lineItem, setLineItem] = useState();
  const [loading, setLoading] = useState(false);
  const pathCheck = location.pathname;

  const lineItemsData = useSelector(
    (state) => state.projectInitialProposal.changeOrderLineItems
  );

  let counter = 0;
  let lineItemIds = [];
  let lineItemCounter = 0;
  let totalWorkOrder = 0;

  console.log("sokect: ", socket);
  // console.log("START DATE", endDate);
  // const fetchPhasesAndLineItems = async (data) => {
  //   try{

  //     const res = await getPhasesAndLineItems(data).unwrap();
  //     const response = await res;
  //     console.log(response)
  //     return response;
  //   } catch (error){
  //     console.log(error);
  //   }
  // }

  if (changeOrder) {
    checkedRow?.phaseItems?.forEach((phase) => {
      lineItemCounter += phase.lineItemId.length;
    });
  } else {
    Object?.keys(rowCheckboxes)?.forEach((phaseData) => {
      lineItemCounter += rowCheckboxes[phaseData].rows.length;
      const lineItemGroup = {
        phaseId: phaseData,
        lineItemId: rowCheckboxes[phaseData].rows.map((row) => row.id),
      };
      lineItemIds.push(lineItemGroup);
      rowCheckboxes[phaseData].rows.forEach((lineItem) => {
        totalWorkOrder += parseInt(lineItem.total);
      });
    });
  }

  // });
  const ENDPOINT = "http://3.135.107.71/";
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

  const isButtonDisabled = changeOrder
    ? checkedRow === null
    : Object?.keys(rowCheckboxes)?.length === 0;
  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };
  const handleClose = () => {
    setShowLineItems(false);
    setSelectedItems([]);
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };
  // const handleStatusChange = (event) => {
  //   setStatus(event.target.value);
  // };
  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  // const handlePhaseRadioChange = (event) => {
  //   setPhase(event.target.value);
  // };
  // const handleLineItemRadioChange = (event) => {
  //   setLineItems(event.target.value);
  // };

  const handlePhaseChange = (phaseId) => {
    const existingPhase = selectedItems.find(
      (item) => item.phaseId === phaseId
    );

    if (existingPhase) {
      const updatedItems = selectedItems.filter(
        (item) => item.phaseId !== phaseId
      );
      setSelectedItems(updatedItems);
    } else {
      const phaseItems = checkedRow.phaseItems.find(
        (item) => item.phaseId === phaseId
      );
      const updatedItems = [
        ...selectedItems,
        { phaseId, lineItemId: phaseItems.lineItemId },
      ];
      setSelectedItems(updatedItems);
    }
  };

  const handleLineItemChange = (phaseId, lineItemId) => {
    const existingPhaseIndex = selectedItems.findIndex(
      (item) => item.phaseId === phaseId
    );

    if (existingPhaseIndex !== -1) {
      const existingLineItemIndex =
        selectedItems[existingPhaseIndex].lineItemId.indexOf(lineItemId);

      if (existingLineItemIndex !== -1) {
        // Remove the line item
        const updatedItems = [...selectedItems];
        updatedItems[existingPhaseIndex] = {
          ...updatedItems[existingPhaseIndex],
          lineItemId: updatedItems[existingPhaseIndex].lineItemId.filter(
            (id) => id !== lineItemId
          ),
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
          lineItemId: [
            ...updatedItems[existingPhaseIndex].lineItemId,
            lineItemId,
          ],
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

  const handleUpdateOpen = (lineItem, index) => {
    // setUpdateRow(() => rowCheckboxes);
    setLineItemIndex(index);
    setLineItem(lineItem);
    setShowUpdateLine(true);
  };

  const handleUpdateClose = () => {
    setShowUpdateLine(false);
  };
  const handleLineItemClick = (e, row) => {
    e.preventDefault();
    console.log(row);
  };
  useEffect(() => {
    const fetchData = async () => {
      console.log("in useEffect changerOrder: ", changeOrder);
      console.log("in useEffect checkRow.phaseItems: ", checkedRow?.phaseItems);
      if (changeOrder && checkedRow?.phaseItems && phaseItems === null) {
        try {
          console.log(phaseItems, " in useEffect rerender");
          const res = await getPhasesAndLineItems(
            checkedRow?.phaseItems
          ).unwrap();
          setPhaseItems(res); // Set phaseItems after the async operation is complete
        } catch (error) {
          console.log(error);
        }
      }
    };
    if (changeOrder) {
      setSubject(checkedRow?.subject);
      setDescription(checkedRow?.description);
      setStartDate(moment(checkedRow?.start_day));
      setEndDate(moment(checkedRow?.end_day));
    }

    fetchData(); // Call the fetchData function
  }, [changeOrder, checkedRow, phaseItems]);

  const handleRequest = async () => {
    if (subject === "") {
      toast.warning("Please complete the Request work order form");
      return;
    }
    if (!startDate || !endDate) {
      toast.warning("Please enter a date");
      return;
    }
    setLoading(true);
    const formattedStartDate = startDate?.utc()?.format("MMM D, YYYY, h:mm a");
    const formattedEndDate = endDate?.utc()?.format("MMM D, YYYY, h:mm a");
    //added superadmin id to the workorder
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
      teamIds: [...assignedCheckboxes, userId, superAdminId],
      notes: notes,
      projectId: projectId,
      total: changeOrder ? checkedRow?.total : totalWorkOrder,
      changeOrder: changeOrderView ? true : false,
      changeOrderItems: updateRow,
    };
    console.log(requestForm);
    if (requestForm.teamIds.length === 0) {
      toast.error("Team member must be assigned");
    } else {
      //await requestWorkOrderPut(requestForm);
      socket.emit("join", userId);
      if (changeOrder) {
        if (selectedItems?.length < 1) {
          toast.warning("Please select a line item");
          setLoading(false);
          return;
        }
        console.log("update");
        //Changes implemented
        await socket.emit("updateWorkOrder", requestForm, (response) => {
          console.log("update", response);
          if (response.success) {
            setDone(true);
            toast.success("Change Order request sent!");
            refetch({ projectId, userId: userId });
          } else {
            toast.error(
              response?.data?.message ||
                response.error ||
                response?.data?.error ||
                response.message ||
                "Something went wrong!"
            );
          }
        });
      } else {
        console.log("work");
        const socketRes = await socket.emit(
          "notification",
          requestForm,
          async (response) => {
            if (response.success) {
              // console.log("work order",response);
              setDone(true);
              toast.success("Work Order request sent!");
              if (refetchChangeOrder) {
                await refetchChangeOrder({ projectId, userId: userId });
              }
              await fetchData();
              return response;
            } else {
              console.log(response);
              toast.error(
                response?.data?.message ||
                  response.error ||
                  response?.data?.error ||
                  response.message ||
                  "Something went wrong!"
              );
              return response;
            }
          }
        );

        // console.log(socketRes)
        setRowCheckboxes({});
      }
      setLoading(false);
      dispatch(setIsLoading(true));
      const res = await getEvents({ userId, dailyForecast });
      const data = res?.data?.formattedWorkOrders;
      dispatch(addEvents(data));
      dispatch(setIsLoading(false));
      // setDone(true);
      setSubject("");
      setDescription("");
      setNotes("");
    }
    handleClose();
  };
  const refetchTeam = async () => {
    const res = await refetchProjectTeam();
  };
  const showToast = () => {
    toast.warning("Please select a line item to request a work order.");
  };

  useEffect(() => {
    if (changeOrderView) {
      setUpdateRow(rowCheckboxes);
    }
  }, [rowCheckboxes]);

  useEffect(() => {
    if (open) {
      refetchTeam();
    }
  }, [open]);
  console.log(rowCheckboxes);


  const permissionsState = useSelector(
    (state) => state?.permissions?.permissions
  );

  const projectManagementPermission = useProjectPermissionCheck(
    "project-management",
    permissionsState
  );

  const   changeOrderPermission
  = useProjectPermissionCheck(
    "change-order",
    permissionsState
  );

  const   workOrderPermission
  = useProjectPermissionCheck(
    "work-order",
    permissionsState
  );



  return (
    <>
      {pathCheck.includes("initial-proposal") ? (
        <></>
      ) : (
        <>
    <Tooltip
  title={
    !projectManagementPermission
      ? "You Currently don't have permission to access this feature"
      : changeOrderView
      ? !changeOrderPermission
        ? "You currently don't have permission to submit a change order"
        : ""
      : !workOrderPermission
      ? "You currently don't have permission to submit a work order"
      : ""
  }
  arrow
>
  <span>
    <Stack
      alignItems={"flex-end"}
      justifyContent={{ xs: "flex-end" }}
      pr={2}
      ml={0}
    >
      <BuilderProButton
        disabled={
          // !projectManagementPermission ||
          (changeOrderView && !changeOrderPermission) ||
          (!changeOrderView && !workOrderPermission)
        }
        backgroundColor={"#FFAC00"}
        variant={"contained"}
        fontFamily={"var(--main-font-family)"}
        fontSize={{ lg: "16px", xs: "11px" }}
        fontWeight={"600"}
        padding={{ sm: "6px 32px 6px 32px", xs: "5px 20px 5px 20px" }}
        handleOnClick={isButtonDisabled ? showToast : handleOpen}
      >
        {changeOrderView ? "Submit Change Order" : "Submit Work Order"}
      </BuilderProButton>
    </Stack>
  </span>
</Tooltip>

        </>

      
      )}
      <Modal open={open} onClose={handleClose}>
        <Stack
          sx={{
            ...style,
            ...themeStyle.scrollable,
            height: { xl: "90%", lg: "90%", md: "90%", sm: "90%", xs: "90%" },
            width: "80%",
          }}
          overflow={"scroll"}
        >
          <Stack
            direction={"row"}
            p={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              color={"#4C8AB1"}
              fontFamily={"var(--main-font-family)"}
              fontSize={"22px"}
              fontWeight={"600"}
            >
              {changeOrderView ? "Submit Change Order" : "Submit Work Order"}
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
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
            <Stack p={3} spacing={1} width={"calc(100% - 48px)"}>
              <Typography fontFamily={"var(--main-font-family)"}>
                <strong>Subject: </strong>{" "}
                <input
                  maxlength="50"
                  required
                  value={subject}
                  placeholder="Type your subject..."
                  type="text"
                  style={themeStyle.inputFields}
                  onChange={handleSubjectChange}
                ></input>
              </Typography>
              <Typography
                pb={1}
                fontFamily={"var(--main-font-family)"}
                fontWeight={"200"}
              >
                <strong>Description: </strong>{" "}
                <input
                  maxlength="50"
                  value={description}
                  placeholder="Type your description..."
                  type="text"
                  multiple
                  style={themeStyle.inputFields}
                  onChange={handleDescriptionChange}
                ></input>
              </Typography>
              {/* <Divider />

              <Typography pt={1} sx={themeStyle.headingText}>
                Total
              </Typography>
              <Stack pb={1} direction={"row"} justifyContent={"space-between"}>
                <Typography
                  sx={{ ...themeStyle.typoTitle, ...themeStyle.costText }}
                >
                  ${changeOrder ? checkedRow?.total : totalWorkOrder}
                </Typography>
             
              </Stack> */}
              <Divider />
              <Stack
                direction={{ xl: "row", lg: "row", md: "row", xs: "row" }}
                justifyContent={"space-around"}
                spacing={1}
                p={1}
              >
                {/* <Stack>
                  <Typography sx={themeStyle.headingText}>
                    Phases
                    <Typography
                      sx={{
                        ...themeStyle.headingText,
                        color: "#9E9E9E",
                        marginTop: "0rem",
                      }}
                    >
                      {changeOrder
                        ? checkedRow?.phaseItems?.length
                        : Object?.keys(rowCheckboxes)?.length}
                    </Typography>
                  </Typography>

                  <FormControl>
                    {checkedRow
                      ? phaseItems?.map((phase) => (
                          <ListItem sx={{ padding: 0 }} key={phase.phaseId}>
                            <Checkbox
                              checked={selectedItems.some(
                                (item) => item.phaseId === phase.phaseId
                              )}
                              onChange={() => handlePhaseChange(phase.phaseId)}
                            />
                            <ListItemText
                              secondaryTypographyProps={{
                                sx: {
                                  width: "11ch",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                },
                              }}
                              secondary={phase.phase_name}
                            />
                          </ListItem>
                        ))
                      : Object.keys(rowCheckboxes).map((key, index) => {
                          const phaseId = rowCheckboxes[key]?.rows[0]?.phase_id;
                          return (
                            <ListItem sx={{ padding: 0 }} key={phaseId}>
                              <ListItemText
                                secondaryTypographyProps={{
                                  sx: {
                                    width: "11ch",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  },
                                }}
                                secondary={rowCheckboxes[key].phaseName}
                              />
                            </ListItem>
                          );
                        })}
                  </FormControl>
                </Stack> */}
                <Stack maxWidth={"80%"} maxHeight={"30%"}>
                  <Typography sx={themeStyle.headingText}>
                    Phases
                    <Typography
                      sx={{
                        ...themeStyle.headingText,
                        color: "#9E9E9E",
                        marginTop: "0rem",
                      }}
                    >
                      {/* {lineItemCounter} */}
                    </Typography>
                  </Typography>
                  {/* <List
                    sx={{
                      ...themeStyle.scrollable,
                      maxHeight: "150px",
                      overflow: "auto",
                      padding: 0,
                    }}
                  > */}
                  {/* {changeOrder
                      ? phaseItems?.map((phase, phaseIndex) => {
                          return phase.lineItems?.map((lineItem, index) => {
                            counter++;
                            if (counter <= 2) {
                              return (
                                <>
                                  <ListItem
                                    sx={{ padding: 0 }}
                                    key={counter}
                                    alignItems="center"
                                    justifyContent="center"
                                  >
                                    <Checkbox
                                      checked={selectedItems.some(
                                        (item) =>
                                          item.phaseId === phase.phaseId &&
                                          item.lineItemId.includes(
                                            phase.lineItems[index].id
                                          )
                                      )}
                                      onChange={() =>
                                        handleLineItemChange(
                                          phase.phaseId,
                                          phase.lineItems[index].id
                                        )
                                      }
                                    />
                                    <ListItemText
                                      secondaryTypographyProps={{
                                        sx: {
                                          width: "11ch",
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                        },
                                      }}
                                      sx={{ padding: 0 }}
                                      secondary={lineItem.title}
                                    />
                                    <Typography
                                      color={"#4C8AB1"}
                                      fontSize={"11px"}
                                      textAlign={"right"}
                                      pl={0.5}
                                      onClick={() =>
                                        handleUpdateOpen(phase.lineItems[index])
                                      }
                                    >
                                      edit
                                    </Typography>
                                  </ListItem>
                                </>
                              );
                            }
                            if (counter > 2 && showLineItems) {
                              return (
                                <>
                                  <ListItem sx={{ padding: 0 }} key={counter}>
                                    <Checkbox
                                      checked={selectedItems.some(
                                        (item) =>
                                          item.phaseId === phase.phaseId &&
                                          item.lineItemId.includes(
                                            phase.lineItems[index].id
                                          )
                                      )}
                                      onChange={() =>
                                        handleLineItemChange(
                                          phase.phaseId,
                                          phase.lineItems[index].id
                                        )
                                      }
                                    />
                                    <ListItemText
                                      secondaryTypographyProps={{
                                        sx: {
                                          width: "11ch",
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                        },
                                      }}
                                      sx={{ padding: 0 }}
                                      secondary={lineItem.title}
                                    />
                                    <Typography
                                      color={"#4C8AB1"}
                                      fontSize={"11px"}
                                      pl={0.5}
                                      onClick={() =>
                                        handleUpdateOpen(phase.lineItems[index])
                                      }
                                    >
                                      edit
                                    </Typography>
                                  </ListItem>
                                </>
                              );
                            }
                            return null;
                          });
                        })
                      : Object?.keys(rowCheckboxes)?.map((phase) => {
                          const phaseData = rowCheckboxes[phase];
                          return phaseData.rows.map((row, index) => {
                            counter++;
                            if (counter <= 2) {
                              return (
                                <ListItem
                                  sx={{ padding: 0 }}
                                  key={counter}
                                  onClick={(e) => {
                                    handleLineItemClick(e, row);
                                  }}
                                >
                                  <ListItemText
                                    secondaryTypographyProps={{
                                      sx: {
                                        width: "11ch",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                      },
                                    }}
                                    sx={{ padding: 0 }}
                                    secondary={row.title}
                                  />
                                  {changeOrderView && <Typography
                                      color={"#4C8AB1"}
                                      fontSize={"11px"}
                                      pl={0.5}
                                      onClick={() =>
                                        handleUpdateOpen(row.id)
                                      }
                                    >
                                      edit
                                    </Typography>}
                                </ListItem>
                              );
                            }
                            if (counter > 2 && showLineItems) {
                              return (
                                <ListItem
                                  sx={{ padding: 0 }}
                                  key={counter}
                                  onClick={(e) => {
                                    handleLineItemClick(e, row);
                                  }}
                                >
                                  <ListItemText
                                    secondaryTypographyProps={{
                                      sx: {
                                        width: "11ch",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                      },
                                    }}
                                    sx={{ padding: 0 }}
                                    secondary={row.title}
                                  />
                                  {changeOrderView && <Typography
                                      color={"#4C8AB1"}
                                      fontSize={"11px"}
                                      pl={0.5}
                                      onClick={() =>
                                        handleUpdateOpen(row.id)
                                      }
                                    >
                                      edit
                                    </Typography>}
                                </ListItem>
                              );
                            } else {
                              return <></>;
                            }
                          });
                        })} */}
                  {/* {Object?.keys(
                      changeOrderView ? updateRow : rowCheckboxes
                    )?.map((phase) => {
                      const phaseData = changeOrderView
                        ? updateRow[phase]
                        : rowCheckboxes[phase];
                      return phaseData.rows.map((row, index) => {
                        counter++;
                        if (counter <= 2) {
                          return (
                            <ListItem
                              sx={{ padding: 0 }}
                              key={counter}
                              onClick={(e) => {
                                handleLineItemClick(e, row);
                              }}
                            >
                              <ListItemText
                                secondaryTypographyProps={{
                                  sx: {
                                    width: "11ch",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  },
                                }}
                                sx={{ padding: 0 }}
                                secondary={row.title}
                              />
                              {changeOrderView && (
                                <Typography
                                  color={"#4C8AB1"}
                                  fontSize={"11px"}
                                  pl={0.5}
                                  onClick={() => handleUpdateOpen(row, index)}
                                  sx={{
                                    cursor: "pointer",
                                  }}
                                >
                                  edit
                                </Typography>
                              )}
                            </ListItem>
                          );
                        }
                        if (counter > 2 && showLineItems) {
                          return (
                            <ListItem
                              sx={{ padding: 0 }}
                              key={counter}
                              onClick={(e) => {
                                handleLineItemClick(e, row);
                              }}
                            >
                              <ListItemText
                                secondaryTypographyProps={{
                                  sx: {
                                    width: "11ch",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  },
                                }}
                                sx={{ padding: 0 }}
                                secondary={row.title}
                              />
                              {changeOrderView && (
                                <Typography
                                  color={"#4C8AB1"}
                                  fontSize={"11px"}
                                  pl={0.5}
                                  onClick={() => handleUpdateOpen(row, index)}
                                  sx={{
                                    cursor: "pointer",
                                  }}
                                >
                                  edit
                                </Typography>
                              )}
                            </ListItem>
                          );
                        } else {
                          return <></>;
                        }
                      });
                    })}

                    {counter > 2 && (
                      <ListItem sx={{ padding: 0 }} style={{ padding: 0 }}>
                        <Button
                          style={{ padding: 0, textTransform: "lowercase" }}
                          variant="text"
                          color="primary"
                          onClick={() => {
                            setShowLineItems(!showLineItems);
                          }}
                        >
                          {showLineItems ? "Hide" : "View more"}
                        </Button>
                      </ListItem>
                    )}
                  </List> */}
                  <Stack maxHeight={"50%"}>
                    <AddPhaseView
                      lineItemsData={lineItemsData}
                      refetchChangeOrder={refetch}
                      adminProjectView={true}
                      view="Change Order Request"
                      changeOrderView={true}
                    />
                  </Stack>
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
                        <MobileDateTimePicker
                          value={startDate}
                          onChange={(newValue) => setStartDate(newValue)}
                          format="MMM D, YYYY,h:mm a"
                          viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                          }}
                          minDate={moment()}
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
                              fontFamily: "var(--main-font-family)",
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
                        <MobileDateTimePicker
                          minDate={
                            startDate
                              ? moment(startDate).add(1, "day")
                              : moment().add(1, "day")
                          }
                          value={endDate}
                          onChange={(newValue) => setEndDate(newValue)}
                          format="MMM D, YYYY,h:mm a"
                          viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                          }}
                          defaultValue={moment(startDate).add(1, "day")}
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
                              fontFamily: "var(--main-font-family)",
                            },
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Box>
                </Typography>

                {/* <Stack>
                  <AddPhaseView
                    setRowCheckboxes={setRowCheckboxes}
                    rowCheckboxes={rowCheckboxes}
                  />
                </Stack> */}
                <Stack
                  width={"80%"}
                  pt={4}
                  display={{ md: "flex", xs: "none" }}
                >
                  <BuilderProButton
                    backgroundColor={"#4C8AB1"}
                    variant={"contained"}
                    fontFamily={"var(--main-font-family)"}
                    fontSize={"16px"}
                    fontWeight={"600"}
                    padding={"6px 32px 6px 32px"}
                    handleOnClick={handleRequest}
                    marginLeft={"0px"}
                    disabled={loading}
                  >
                    {changeOrder ? "Submit Change Order" : "Submit Work Order"}
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
                  <Typography
                    fontFamily={"var(--main-font-family)"}
                    alignSelf={"end"}
                    pl={1}
                  >
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
                    setSuperAdminId={setSuperAdminId}
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
                <Typography
                  fontFamily={"var(--main-font-family)"}
                  pb={4}
                  pl={2}
                >
                  <input
                    maxlength="50"
                    value={notes}
                    placeholder="Type your notes..."
                    type="text"
                    multiple
                    style={{
                      ...themeStyle.inputFields,
                      backgroundColor: "#EFF5FF",
                    }}
                    onChange={handleNotesChange}
                  ></input>
                </Typography>

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
                        <FlagOutlinedIcon
                          sx={{
                            color:
                              priority === "urgent" ? "#EB1717" : "#4C8AB1",
                          }}
                        />
                        <Typography
                          color={priority === "urgent" ? "#EB1717" : "#4C8AB1"}
                          textTransform={"capitalize"}
                          fontFamily={"var(--main-font-family)"}
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
                  startIcon={
                    <FlagOutlinedIcon
                      sx={{
                        color: priority === "urgent" ? "#EB1717" : "#4C8AB1",
                      }}
                    />
                  }
                >
                  <MenuItem value={"urgent"}>Urgent</MenuItem>
                  <MenuItem value={"normal"}>Normal</MenuItem>
                </Select>
                <hr style={themeStyle.hrLine} />
              </Box>
              <Stack spacing={0.5} p={1} px={3}>
                <Typography
                  fontSize={"13px"}
                  style={{
                    fontFamily: "var(--main-font-family)",
                  }}
                >
                  Created
                </Typography>
                <Typography
                  fontSize={"14px"}
                  color={"black"}
                  fontWeight={"600"}
                  style={{
                    fontFamily: "var(--main-font-family)",
                  }}
                >
                  {changeOrder
                    ? moment(checkedRow?.createdAt).format(
                        "MMM D,YYYY, HH:MM a"
                      )
                    : "Feb 6,2023,10:30 AM"}
                </Typography>
                <Typography
                  fontSize={"13px"}
                  style={{
                    fontFamily: "var(--main-font-family)",
                  }}
                >
                  Updated
                </Typography>
                <Typography
                  fontSize={"14px"}
                  color={"black"}
                  fontWeight={"600"}
                  style={{
                    fontFamily: "var(--main-font-family)",
                  }}
                >
                  {changeOrder
                    ? moment(checkedRow?.updatedAt).format(
                        "MMM D,YYYY, HH:MM a"
                      )
                    : ""}
                </Typography>
              </Stack>
              <Stack
                width={"100%"}
                pt={4}
                pb={4}
                display={{ md: "none", xs: "flex" }}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <BuilderProButton
                  backgroundColor={"#4C8AB1"}
                  variant={"contained"}
                  fontFamily={"var(--main-font-family)"}
                  fontSize={"16px"}
                  fontWeight={"600"}
                  padding={"6px 32px 6px 32px"}
                  handleOnClick={handleRequest}
                  marginLeft={"0px"}
                  disabled={loading}
                >
                  {changeOrder ? "Submit Change Order" : "Submit Work Order"}
                </BuilderProButton>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Modal>
      {showUpdateLine && (
        <UpdateLineDialogue
          handleUpdateOpen={handleUpdateOpen}
          setPhaseItems={setPhaseItems}
          handleUpdateClose={handleUpdateClose}
          LineItem={lineItem}
          lineItemIndex={lineItemIndex}
          reqWorkOrderModal={true}
          updateRow={updateRow}
          setUpdateRow={setUpdateRow}
        />
      )}
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
  width: { md: "700px", xs: "80%" },
};
const themeStyle = {
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
    overflowY: "scroll",
  },
  inputFields: {
    border: "0px solid #FFF",
    outline: "none",
    width: "calc(100% - 8px)",
    padding: 4,
  },
  typoTitle: {
    fontFamily: "var(--main-font-family)",
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
    fontFamily: "var(--main-font-family)",
    fontSize: "1rem",
    color: "#202227",
  },
  sendButton: {
    width: { lg: "35%", md: "35%", sm: "40%", xs: "60%" },
    fontFamily: "var(--main-font-family)",
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
    fontFamily: "var(--main-font-family)",
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
    fontFamily: "var(--main-font-family)",
  },
  radioChecked: {
    "&, &.Mui-checked": {
      color: "#000",
    },
  },
  headingText: {
    fontFamily: "var(--main-font-family)",
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
    fontFamily: "var(--main-font-family)",
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
