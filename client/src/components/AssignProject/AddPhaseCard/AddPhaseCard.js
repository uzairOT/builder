import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  IconButton,
  Tooltip,
  Chip,
} from "@mui/material";
import { ReactComponent as ArrowDown } from "../Assets/svgs/ArrowDown.svg";
import { ReactComponent as Arrowup } from "../Assets/svgs/Arrowup.svg";
import { ReactComponent as EditIcon } from "../Assets/svgs/EditIcon.svg";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { ReactComponent as DeleteIcon } from "../Assets/svgs/DeleteIcon.svg";
import "../../../App.css";
import actionButton from "../../UI/actionButton";
import "./AddPhaseCard.css";
import AddLineDialogue from "../../dialogues/AddLineDialogue/AddLineDialogue";
import UpdateLineDialogue from "../../dialogues/UpdateLineDialogue/UpdateLineDialogue";
import { useDeletePhaseLineMutation } from "../../../redux/apis/Project/projectApiSlice";
import {
  selectAddPhase,
  setRowCheckbox,
} from "../../../redux/slices/addPhaseSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addInitialPhase,
  addPhase,
  updateCheckedItems,
} from "../../../redux/slices/Project/projectInitialProposal";
import moment from "moment";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import { toast } from "react-toastify";
import { getUserRoleFromRedux } from "../../../redux/slices/auth/userRoleSlice";
import UpdateLineItemUserStatus from "../../dialogues/UpdateLineItemUserStatus/UpdateLineItemUserStatus";
import LineItemDetailModal from "../../dialogues/LineItemDetailModal/LineItemDetailModal";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BuilderProButton from "../../UI/Button/BuilderProButton";
import LineItemTeamStatus from "../../dialogues/LineItemTeamStatus/LineItemTeamStatus";
import { useLocation } from "react-router-dom";
import { formatMoney } from "../../../utils/Formatters/moneyFormat";
import AreYouSureModal from "../../dialogues/AreYouSureModal/AreYouSureModal";
//import "react-toastify/dist/ReactToastify.css";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import { socket } from "../../../socket";
import InfoIcon from "@mui/icons-material/Info";
import { toggleWorkOrderDeclineRecall } from "../../../redux/slices/Notifications/notificationSlice";
import { CoEditChip } from "../../LandingPageComponents/assets/svg";
import { ChipDelete } from "@mui/joy";
import { useProjectPermissionCheck } from "../../Projects/ProjectPermissions/ProjectsPermissionCheck";

const initialRows = [
  {
    phaseName: "Item 1",
    description: "Description 1",
    unit: "Unit 1",
    margin: "10%",
    quantity: 5,
    unitPrice: 20,
    total: 100,
    start: "2024-03-01",
    end: "2024-03-05",
    longDescription: "Note 1",
  },
  {
    phaseName: "Item 2",
    description: "Description 2",
    unit: "Unit 2",
    margin: "15%",
    quantity: 3,
    unitPrice: 30,
    total: 90,
    start: "2024-03-03",
    end: "2024-03-08",
    longDescription: "Note 2",
  },
  {
    phaseName: "Item 3",
    description: "Description 3",
    unit: "Unit 3",
    margin: "20%",
    quantity: 2,
    unitPrice: 25,
    total: 50,
    start: "2024-03-02",
    end: "2024-03-06",
    longDescription: "Note 3",
  },
  // Add more rows as needed
];

const AddPhaseCard = ({
  lineItemsData,
  handleAddRow,
  phaseData,
  onGridToggle,
  length,
  handleSelectCard,
  adminProjectView,
  setRowCheckboxes,
  projectId,
  InitialProposalView,
  rowCheckboxes,
  authUserRole,
  changeOrder,
  view,
  isLineItems,
  changeOrderView,
  changeOrderSelectedView,
  hanldeEditChangeLineItem,
  handleAddChangeLineItem,
  handleDeleteChangeLineItem
}) => {
  const [selectAll, setSelectAll] = useState(false); // State to track the checked state of the checkbox in the table head
  const [showAddLine, setShowAddLine] = useState(false);
  const [showUpdateLine, setShowUpdateLine] = useState(false);
  const [showUpdateUserStatus, setShowUpdateUserStatus] = useState(false);
  const [showTeamStatus, setShowTeamStatus] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [lineItemId, setLineItemId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [rows, setRows] = useState(initialRows);
  const user = useSelector((state) => state.auth.userInfo);
  const userId = user.user.id;
  const userRoleAuth = useSelector(getUserRoleFromRedux);
  //console.log(userRoleAuth);
  const [deletePhaseLine, { isLoading }] = useDeletePhaseLineMutation();
  //console.log(adminProjectView);
  const dispatch = useDispatch();
  const { rowCheckbox } = useSelector(selectAddPhase);
  let totalCost = 0;
  let minStartDay = moment(phaseData?.LineItems[0]?.start_day);
  let maxEndDay = moment(phaseData?.LineItems[0]?.end_day);
  let totalHours = 0;
  //console.log("changeOrder ", changeOrder);
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const pathCheck = location.pathname;

  //console.log("", phaseData);

  phaseData.LineItems.forEach((row) => {
    totalCost += parseFloat(row.total) + parseFloat(row.margin); // Accumulate the total cost
    const startDay = moment(row.start_day);
    const endDay = moment(row.end_day);

    if (startDay.isBefore(minStartDay)) {
      minStartDay = startDay;
    }

    if (endDay.isAfter(maxEndDay)) {
      maxEndDay = endDay;
    }
  });
  const duration = moment.duration(maxEndDay.diff(minStartDay));
  const totalDays = duration.days();
  if (minStartDay.isSame(maxEndDay, "day")) {
    totalHours = 0;
  } else {
    totalHours = duration.asHours();
  }
  const handleArrowDownClick = () => {
    onGridToggle(phaseData.current_position, phaseData.current_position + 1);
  };

  const handleArrowUpClick = () => {
    onGridToggle(phaseData.current_position, phaseData.current_position - 1);
  };

  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    const updatedSelectedRows = isChecked ? rows.map((_, index) => index) : [];
    setSelectedRows(updatedSelectedRows);
  };
  const handleOpenModalClose = () => {
    setOpenModal(false);
  };

  const handleDeleteLineItem = (lineItemId) => {
    setLineItemId(lineItemId);
    setOpenModal(true);
  };
  const handleConfirmDelete = async (confirm) => {
    if (confirm) {
      await handleDeleteSelectedRows(lineItemId);
      handleOpenModalClose();
    } else {
      setLineItemId(null);
      handleOpenModalClose();
    }
  };
  const handleDeleteSelectedRows = async (lineItemId) => {
    // const updatedRows = rows.filter((_, index) => !selectedRows.includes(index));
    // // Handle the updated rows according to your application logic
    // deletePhaseLine(selectedRows);
    // //console.log("Deleted rows:", selectedRows);
    // //console.log("Remaining rows:", updatedRows);

    // // Clear the selectedRows state after deletion
    // setSelectedRows([]);

    const data = {
      lineItemId: lineItemId,
      projectId: projectId,
    };
    try {
      const res = await deletePhaseLine(data);
      setRowCheckboxes({});
      if (InitialProposalView) {
        dispatch(addInitialPhase(res.data.allPhases));
      } else {
        dispatch(addPhase(res.data.allPhases));
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...");
    }
  };

  const handleAddLine = () => {
    setShowAddLine(true);
  };

  // const handleSendApproval = () => {
  //   const projectId = projectId;
  //   const userId = userId;

  //   socket.emit('sendApprovalNotification', { projectId, userId });
  // };

  const handleAddOpen = () => {
    setShowAddLine(true);
  };

  const handleAddClose = () => {
    setShowAddLine(false);
  };
  const handleUpdateLine = (row) => {
    setCheckedRow(row);
    setShowUpdateLine(true);
  };
  const handleUpdateUserStatus = (row) => {
    setCheckedRow(row);
    setShowUpdateUserStatus(true);
  };

  const handleUpdateUserStatusClose = () => {
    setShowUpdateUserStatus(false);
  };
  const handleUpdateOpen = () => {
    setShowUpdateLine(true);
  };

  const handleUpdateClose = () => {
    setShowUpdateLine(false);
  };

  const handleShowTeamStatus = (row) => {
    setCheckedRow(row);
    setShowTeamStatus(true);
  };

  const tableContainerStyle = {
    width: "100%", // Allow the table to take up the entire available width
    overflowY: "auto",
    height: "245px",
    // Add horizontal scrollbar when needed
  };

  const handleSendApprove = () => {
    //console.log("run");
    socket.emit(
      "sendPhaseApprovalNotification",
      {
        projectId: projectId,
        phaseId: phaseData?.id,
        sentBy: userId,
      },
      (data) => {
        toast(data?.message, {
          className:
            data?.success === true
              ? "toast-success"
              : data?.success === false
              ? "toast-error"
              : "toast-default",
        });
        dispatch(toggleWorkOrderDeclineRecall());
      }
    );
  };

  const handleUpdateRow = (index, newData) => {
    const updatedRows = [...rows];
    updatedRows[index] = { ...updatedRows[index], ...newData };
    setRows(updatedRows);
    //console.log(updatedRows)
  };
  const handleAddRow1 = (newData) => {
    const updatedRows = [...rows, newData];
    setRows(updatedRows);
    //console.log("handle add row:",updatedRows);
  };

  const [checkedRow, setCheckedRow] = useState(null);

  const handleCheckboxChange = (row) => {
    const { id: phaseId, phase_name: phaseName,LineItems ,...otherProps } = phaseData;
    setRowCheckboxes((prevSelectedRows) => {
      const updatedRows = { ...prevSelectedRows };
  
      if (!updatedRows[phaseId]) {
        // Initialize the phase with an empty array if it doesn't exist
        updatedRows[phaseId] = { phaseName, rows: [] };
      } else {
        // Create a shallow copy of the existing rows array to avoid mutating the state directly
        updatedRows[phaseId] = { 
          ...updatedRows[phaseId], 
          rows: [...updatedRows[phaseId].rows]
        };
      }
  
      const rowExistsIndex = updatedRows[phaseId].rows.indexOf(row);
      if (rowExistsIndex !== -1) {
        // Remove the row if it already exists
        updatedRows[phaseId].rows.splice(rowExistsIndex, 1);
      } else {
        // Add the row if it doesn't exist
        updatedRows[phaseId].rows.push(row);
      }
  
      if (updatedRows[phaseId].rows.length === 0) {
        // Remove the phase if there are no rows left
        delete updatedRows[phaseId];
      }
  
      const updatedLineItems = updatedRows[phaseId]?.rows || [];
  
      dispatch(
        updateCheckedItems({
          phaseId,
          phaseName,
          lineItems: updatedLineItems,
          ...otherProps, // Include other properties from phaseData
        })
      );
  
      return updatedRows;
    });
  };
  
  

  // Function to check if a row is selected
  const isRowSelected = (row, phaseId) => {
    //console.log("Check run phaseId ", rowCheckboxes);
    const isSelected =
      rowCheckboxes[phaseId]?.rows.some((r) => r.id === row.id) || false;
    //console.log("Check boolean phaseId ", isSelected);
    return isSelected;
  };
  // console.log('PHASE :', phaseData)

  const permissionsState = useSelector(
    (state) => state?.permissions?.permissions
  );
  const ProjectApprovalSendPermission = useProjectPermissionCheck(
    "project-approval",
    permissionsState
  );

  const projectManagementPermission = useProjectPermissionCheck(
    "project-management",
    permissionsState
  );

  return (
    <div style={{ width: "100%", display:'flex' }}>
      <Grid
        item
        lg={12}
        sx={{
          ...firstGrid,
          backgroundColor: `${phaseData?.color}`,
          width: "95%",
          padding: "16px",
        }}
      >
        <Box sx={headingsBox} onClick={() => handleSelectCard(phaseData.id)}>
          <Box
            sx={headingInnerBox}
            mb={
              !(
                userRoleAuth.userRole === "superadmin" ||
                userRoleAuth.userRole === "admin" ||
                userRoleAuth.userRole === "projectManager" ||
                userRoleAuth.userRole === ""
              )
                ? "0px"
                : ""
            }
          >
            <Box
              backgroundColor="#FBFBFB"
              sx={{
                borderTopLeftRadius: "7px",
                borderTopRightRadius: "7px",
                display: "flex",
                flexDirection: { sm: "row", xs: "column" },
              }}
            >
              <Typography
                sx={{
                  ...blackHeading,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: { lg: "50ch", xs: "8ch" },
                  cursor: "pointer",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                  fontWeight: "600",
                  fontSize: { xl: "26px", lg: 18, md: 26, xs: 16 },
                }}
              >
                {phaseData.phase_name}
              </Typography>

              <Chip
                sx={{
                  maxWidth: "10rem",
                  fontFamily: "var(--main-font-family)",
                  textTransform: "capitalize",
                  cursor: "pointer",
                  fontWeight: "600",
                  marginTop: 1.5,
                  marginRight: 2,
                }}
                label={phaseData?.status}
                color={
                  phaseData?.status === "approved" ||
                  phaseData?.status === "change approved"
                    ? "success"
                    : phaseData?.status === "pending" ||
                      phaseData?.status === "change pending"
                    ? "warning"
                    : "error"
                }
              />
            </Box>

            {/* <Box>
              <Typography sx={blackHeading}>
                Duration: {totalHours} hours  Days: {totalDays}
              </Typography>
            </Box> */}
          </Box>
          <Box sx={phaseBox}>
            <>
              {phaseData?.current_position === 0 ? (
                <ArrowDown
                  style={{
                    marginRight: "1rem",
                    cursor: "pointer",
                    display: "none",
                  }}
                  onClick={handleArrowDownClick}
                />
              ) : phaseData?.current_position === length - 1 ? (
                <Arrowup
                  style={{
                    marginRight: "1rem",
                    cursor: "pointer",
                    display: "none",
                  }}
                  onClick={handleArrowUpClick}
                />
              ) : (
                <>
                  <ArrowDown
                    style={{
                      marginRight: "1rem",
                      cursor: "pointer",
                      display: "none",
                    }}
                    onClick={handleArrowDownClick}
                  />
                  <Arrowup
                    style={{
                      marginRight: "1rem",
                      cursor: "pointer",
                      display: "none",
                    }}
                    onClick={handleArrowUpClick}
                  />
                </>
              )}
            </>

            {/* <EditIcon
              // onClick={handleUpdateLine}
              onClick={handleUpdateLine}
            />
            <DeleteIcon
              onClick={handleDeleteSelectedRows}
              disabled={selectedRows.length === 0} /> */}
            {/* ADDED CHECK TO SEE IF USER ROLE BEFORE SHOWING ADD LINE ITEM BUTTON */}
            {InitialProposalView
              ? (userRoleAuth.userRole === "superadmin" ||
                  userRoleAuth.userRole === "admin" ||
                  userRoleAuth.userRole === "projectManager" ||
                  userRoleAuth.userRole === "") && (
                  <>
                    {phaseData?.status === "not approved" ||
                    phaseData?.status === "declined" ||
                    phaseData?.status === "pending" ? (
                      <>
                        {phaseData?.declinedReason &&
                          (phaseData?.status === "declined" ||
                            phaseData?.status === "change declined") && (
                            <>
                              <Tooltip
                                title={
                                  phaseData?.declinedReason
                                    ? phaseData?.declinedReason
                                    : ""
                                }
                                arrow
                              >
                                <IconButton>
                                  <InfoIcon />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}

                        {(phaseData?.status === "not approved" ||
                          phaseData?.status === "declined") && (
                          <Tooltip
                            title={
                              projectManagementPermission
                                ? ""
                                : "You Currently don't have permission to access this feature"
                            }
                            arrow
                          >
                            <Button
                              disabled={!projectManagementPermission}
                              sx={{
                                ...actionButton,
                                background: "#4C8AB1",
                                marginTop: "0.7rem",
                                marginBottom: "1rem",
                                marginRight: "1.2rem",
                                "@media (max-width: 600px)": {
                                  minWidth: 0,
                                  width: "2.5rem",
                                  height: "2.5rem",
                                  borderRadius: "50%",
                                  padding: 0,
                                  fontSize: "0.75rem",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontFamily: "var(--main-font-family)",
                                },
                              }}
                              onClick={handleAddLine}
                            >
                              <AddIcon
                                sx={{
                                  "@media (min-width: 601px)": {
                                    display: "none",
                                  },
                                }}
                              />
                              <Typography
                                sx={{
                                  fontFamily: "var(--main-font-family)",
                                  "@media (min-width: 601px)": {
                                    display: "inline",
                                  },
                                  "@media (max-width: 600px)": {
                                    display: "none",
                                  },
                                }}
                              >
                                Add Line Item
                              </Typography>
                            </Button>
                          </Tooltip>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )
              : changeOrderSelectedView ? (
                <>
                  <Button
                      sx={{
                        ...actionButton,
                        background: "#4C8AB1",
                        marginTop: "0.7rem",
                        marginBottom: "1rem",
                        marginRight: "1.2rem",
                        marginLeft: "1rem",
                        "@media (max-width: 600px)": {
                          fontFamily: "var(--main-font-family)",
                          minWidth: 0,
                          width: "2.5rem",
                          height: "2.5rem",
                          borderRadius: "50%",
                          padding: 0,
                          fontSize: "0.75rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        },
                      }}
                      onClick={() => handleAddChangeLineItem(phaseData.id)}
                    >
                      <AddIcon
                        sx={{
                          "@media (min-width: 601px)": { display: "none" },
                        }}
                      />
                      <Typography
                        sx={{
                          fontFamily: "var(--main-font-family)",
                          "@media (min-width: 601px)": { display: "inline" },
                          "@media (max-width: 600px)": { display: "none" },
                        }}
                      >
                        Add Line Item
                      </Typography>
                    </Button>
                </>
              ) : (userRoleAuth.userRole === "admin" ||
                  userRoleAuth.userRole === "superadmin" ||
                  userRoleAuth.userRole === "projectManager" ||
                  userRoleAuth.userRole === "") && (
                  <Box sx={{ display: "flex" }}>
                    {phaseData?.declinedReason &&
                      (phaseData?.status === "declined" ||
                        phaseData?.status === "change declined") && (
                        <>
                          <Tooltip
                            title={
                              phaseData?.declinedReason
                                ? phaseData?.declinedReason
                                : ""
                            }
                            arrow
                          >
                            <IconButton>
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}

                    {view === "Change Order" &&
                    pathCheck?.includes("initial-proposal") ? (
                      <></>
                    ) : (
                      <Tooltip
                        title={
                          projectManagementPermission
                            ? ""
                            : "You Currently don't have permission to access this feature"
                        }
                        arrow
                      >
                        <Button
                          disabled={!projectManagementPermission}
                          sx={{
                            ...actionButton,
                            background: "#4C8AB1",
                            marginTop: "0.7rem",
                            marginBottom: "1rem",
                            marginRight: "1.2rem",
                            marginLeft: "1rem",
                            "@media (max-width: 600px)": {
                              fontFamily: "var(--main-font-family)",
                              minWidth: 0,
                              width: "2.5rem",
                              height: "2.5rem",
                              borderRadius: "50%",
                              padding: 0,
                              fontSize: "0.75rem",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            },
                          }}
                          onClick={handleAddLine}
                        >
                          <AddIcon
                            sx={{
                              "@media (min-width: 601px)": {
                                display: "none",
                              },
                            }}
                          />
                          <Typography
                            sx={{
                              fontFamily: "var(--main-font-family)",
                              "@media (min-width: 601px)": {
                                display: "inline",
                              },
                              "@media (max-width: 600px)": {
                                display: "none",
                              },
                            }}
                          >
                            Add Line Item
                          </Typography>
                        </Button>
                      </Tooltip>
                    )}

                    <Tooltip
                      title={
                        ProjectApprovalSendPermission
                          ? ""
                          : "You don't have permission to access this feature"
                      }
                      arrow
                    >
                      <span>
                        <>
                          {changeOrderView &&
                          !pathCheck?.includes("initial-proposal") ? (
                            phaseData?.initial === false && (
                              <Button
                                onClick={handleSendApprove}
                                sx={{
                                  ...actionButton,
                                  background: "#4C8AB1",
                                  marginTop: "0.7rem",
                                  marginBottom: "1rem",
                                  // marginRight: { sm: "7rem", xs: "2rem" },
                                  width: "80%",
                                  whiteSpace:'nowrap',
                                  // width: "2.5rem",
                                  "@media (max-width: 600px)": {
                                    minWidth: 0,
                                    width: "2.5rem",
                                    height: "2.5rem",
                                    borderRadius: "50%",
                                    padding: 0,
                                    fontSize: "0.75rem",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontFamily: "var(--main-font-family)",
                                  },
                                }}
                                disabled={phaseData?.status === "pending"}
                              >
                                <SendIcon
                                  sx={{
                                    "@media (min-width: 601px)": {
                                      display: "none",
                                    },
                                  }}
                                />
                                <Typography
                                  sx={{
                                    fontFamily: "var(--main-font-family)",
                                    "@media (min-width: 601px)": {
                                      display: "inline",
                                    },
                                    "@media (max-width: 600px)": {
                                      display: "none",
                                    },
                                  }}
                                >
                                  {phaseData?.status === "pending"
                                    ? "Pending"
                                    : "Send Approval"}
                                </Typography>
                              </Button>
                            )
                          ) : (
                            <></>
                          )}
                        </>
                      </span>
                    </Tooltip>

                    <></>
                  </Box>
                )}
          </Box>
        </Box>

        <Grid item sx={tableGrid}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={listOfLineText}>List of Line Items </Typography>

            <Box>
              {(userRoleAuth.userRole === "superadmin" ||
                userRoleAuth.userRole === "admin" ||
                userRoleAuth.userRole === "projectManager") && (
                <Typography
                  sx={{
                    ...blackHeading,
                    paddingRight: "1rem",
                    fontSize: "20px",
                    marginTop: "0",
                    width: { sm: "100%", xs: "14ch" },
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Price: ${formatMoney(totalCost)}
                </Typography>
              )}
            </Box>
          </Box>

          <hr style={hrLine} />
          <Box
            sx={{
              ...tableContainerStyle,
              marginLeft: "0rem",
              width: "100%",
              ...scrollable,
            }}
          >
            <Table sx={{ width: "100%" }}>
              <TableHead sx={{ width: "100%" }}>
                <TableRow>
                  <>
                    <TableCell
                      sx={{
                        ...tableHeadings,
                        maxWidth: "",
                        minWidth: "",
                        width: "10px",
                         display: changeOrderSelectedView ? 'none': ''
                      }}
                    ></TableCell>
                  </>

                  <TableCell sx={{ ...tableHeadings }}>Line Item</TableCell>

                  {/* <TableCell sx={tableHeadings}>Description</TableCell> */}
                  <TableCell sx={{...tableHeadings, display: changeOrderSelectedView ? 'none' : ''}}>Unit</TableCell>
                  {/* {!(
                    userRoleAuth.userRole === "client" ||
                    userRoleAuth.userRole === "employee" ||
                    userRoleAuth.userRole === "subcontractor" ||
                    userRoleAuth.userRole === "supplier"
                  ) && <TableCell sx={tableHeadings}>Unit Cost</TableCell>}
                  {!(
                    userRoleAuth.userRole === "client" ||
                    userRoleAuth.userRole === "employee" ||
                    userRoleAuth.userRole === "subcontractor" ||
                    userRoleAuth.userRole === "supplier"
                  ) && <TableCell sx={tableHeadings}>Cost</TableCell>}
                  <TableCell sx={tableHeadings}>Quantity</TableCell> */}
                  {!(path === "assignproject" || changeOrderSelectedView) && (
                    <TableCell
                      sx={{
                        ...tableHeadings,
                        maxWidth: "",
                        minWidth: "",
                        width: "60px",
                      }}
                    >
                      Start
                    </TableCell>
                  )}
                  {!(path === "assignproject" || changeOrderSelectedView) && (
                    <TableCell
                      sx={{
                        ...tableHeadings,
                        maxWidth: "",
                        minWidth: "",
                        width: "60px",
                      }}
                    >
                      End
                    </TableCell>
                  )}
                  {!(
                    userRoleAuth.userRole === "client" ||
                    userRoleAuth.userRole === "employee" ||
                    userRoleAuth.userRole === "subcontractor" ||
                    userRoleAuth.userRole === "supplier"
                  ) && <TableCell sx={{...tableHeadings, display: changeOrderSelectedView ? 'none' : ''}}>Profit</TableCell>}
                  <TableCell  sx={{...tableHeadings, display: changeOrderSelectedView ? 'none' : ''}}>Total Cost</TableCell>
                  {/* {(userRoleAuth.userRole === "superadmin" ||
                    userRoleAuth.userRole === "admin" ||
                    userRoleAuth.userRole === "projectManager") && (
                    <TableCell sx={tableHeadings}>Arrears</TableCell>
                  )} */}
                  <TableCell  sx={{...tableHeadings, display: changeOrderSelectedView ? 'none' : ''}}>Notes</TableCell>
                  {adminProjectView && (
                    <>
                      <TableCell sx={tableHeadings}>
                        {view === "Generate Invoice" ? "Invoice" : "Status"}
                      </TableCell>

                      {(userRoleAuth.userRole === "employee" ||
                        userRoleAuth.userRole === "subcontractor" ||
                        userRoleAuth.userRole === "supplier") && (
                        <TableCell sx={tableHeadings}>Update Status</TableCell>
                      )}
                      {/* {(userRoleAuth.userRole === "superadmin" ||
                        userRoleAuth.userRole === "admin" ||
                        userRoleAuth.userRole === "projectManager") && (
                        <TableCell sx={tableHeadings}>Team Status</TableCell>
                      )} */}
                    </>
                  )}
                  {(userRoleAuth.userRole === "superadmin" ||
                    userRoleAuth.userRole === "admin" ||
                    userRoleAuth.userRole === "projectManager" ||
                    userRoleAuth.userRole === "") &&
                    phaseData?.status === "not approved" &&
                    !InitialProposalView &&
                    view === "Change Order" &&
                    !pathCheck.includes("initial-proposal") && (
                      <TableCell sx={tableHeadings}>Action</TableCell>
                    )}
                </TableRow>

                <TableRow style={hrLine}></TableRow>
              </TableHead>

              <TableBody>
                {phaseData.LineItems.map((row, index) => {
                  if (
                    userRoleAuth.userRole === "employee" ||
                    userRoleAuth.userRole === "subcontractor" ||
                    userRoleAuth.userRole === "supplier"
                  ) {
                    const userLineItem = row?.UserLineItemStatuses?.find(
                      (user) => user.userId === userId
                    );
                    if (Boolean(userLineItem)) {
                    } else {
                      return <></>;
                    }
                  }
                  if (changeOrder && !(row.status === "Work Order approved")) {
                    return <></>;
                  }
                  return (
                    <TableRow
                      key={index}
                      sx={{
                        paddingLeft: "4rem",
                        maxHeight: "50px",
                        backgroundColor:
                          row.status === "Change Order Requested" ||
                          row.status === "Change Order approved" ||
                          row.status === "Change Order declined"
                            ? "#F4F4F4"
                            : "",
                          textDecoration: row.shouldDelete ? 'line-through' : ''
                      }}
                    >
                      <TableCell
                        sx={{
                          ...tableCell,
                          maxWidth: "",
                          minWidth: "",
                          width: "10px",
                          display: changeOrderSelectedView ? 'none': ''
                        }}
                      >
                        {(row.status === "Change Order Requested" ||
                          row.status === "Change Order approved" ||
                          row.status === "Change Order declined") && (
                          <>
                            <IconButton
                            // onClick={() => handleCheckboxChange(row)}
                            >
                              <>
                                <Chip
                                  style={{
                                    border: isRowSelected(row, row.phase_id)
                                      ? "1px solid black"
                                      : "none",
                                  }}
                                  color={"warning"}
                                  label={
                                    <span
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      CO
                                      <ModeEditIcon
                                        sx={{ fontSize: "0.980rem" }}
                                      />
                                    </span>
                                  }
                                />
                              </>
                            </IconButton>
                          </>
                        )}
                        {!InitialProposalView && (
                          <>
                            {!(path === "assignproject") &&
                              !(view === "Generate Invoice") &&
                              (row.status === "Work Order Not requested" ||
                                row.status === "Work Order declined" ||
                                row.status === "Change Order declined") &&
                              view === "Change Order" &&
                              !pathCheck.includes("initial-proposal") && (
                                <Checkbox
                                  // checked={checkedRow === row}
                                  sx={{
                                    "& .MuiSvgIcon-root": { fontSize: 20 },
                                  }}
                                  checked={
                                    isRowSelected(row, row.phase_id)
                                      ? isRowSelected(row, row.phase_id)
                                      : false
                                  }
                                  onChange={() => handleCheckboxChange(row)}
                                />
                              )}
                          </>
                        )}
                        {view === "Generate Invoice" &&
                          !(row.paymentPending === "0") && (
                            <Checkbox
                              // checked={checkedRow === row}
                              sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                              checked={
                                isRowSelected(row, row.phase_id)
                                  ? isRowSelected(row, row.phase_id)
                                  : false
                              }
                              onChange={() => handleCheckboxChange(row)}
                            />
                          )}
                      </TableCell>

                      <TableCell sx={tableCell} component="th" scope="row">
                        {row.title}
                      </TableCell>
                      {/* <TableCell>{row.description}</TableCell> */}
                      <TableCell sx={{...tableCell, display: changeOrderSelectedView ? 'none' : ''}}>{row.unit}</TableCell>
                      {/* {!(
                        userRoleAuth.userRole === "client" ||
                        userRoleAuth.userRole === "employee" ||
                        userRoleAuth.userRole === "subcontractor" ||
                        userRoleAuth.userRole === "supplier"
                      ) && (
                        <TableCell sx={tableCell}>
                          ${formatMoney(row.unit_price)}
                        </TableCell>
                      )}
                      {!(
                        userRoleAuth.userRole === "client" ||
                        userRoleAuth.userRole === "employee" ||
                        userRoleAuth.userRole === "subcontractor" ||
                        userRoleAuth.userRole === "supplier"
                      ) && (
                        <TableCell sx={tableCell}>
                          ${formatMoney(row.total)}
                        </TableCell>
                      )}

                      <TableCell sx={tableCell}>{row.quantity}</TableCell> */}
                      {!(path === "assignproject" || changeOrderSelectedView) && (
                        <TableCell
                          sx={{
                            ...tableCell,
                            maxWidth: "",
                            minWidth: "",
                            width: "60px",
                          }}
                        >
                          {row?.start_day
                            ? moment(row?.start_day).format(
                                "MM/DD/YYYY HH:mm a"
                              )
                            : "-"}
                        </TableCell>
                      )}
                      {!(path === "assignproject" || changeOrderSelectedView) && (
                        <TableCell
                          sx={{
                            ...tableCell,
                            maxWidth: "",
                            minWidth: "",
                            width: "60px",
                          }}
                        >
                          {row?.end_day
                            ? moment(row?.end_day).format("MM/DD/YYYY HH:mm a")
                            : "-"}
                        </TableCell>
                      )}

                      {!(
                        userRoleAuth.userRole === "client" ||
                        userRoleAuth.userRole === "employee" ||
                        userRoleAuth.userRole === "subcontractor" ||
                        userRoleAuth.userRole === "supplier"
                      ) && (
                        <TableCell sx={{...tableCell, display: changeOrderSelectedView ? 'none' : ''}}>
                          ${formatMoney(row?.margin)}
                        </TableCell>
                      )}
                      <TableCell sx={{...tableCell, display: changeOrderSelectedView ? 'none' : ''}}>
                        ${formatMoney(Number(row.total) + Number(row.margin))}
                      </TableCell>
                      {/* {(userRoleAuth.userRole === "superadmin" ||
                        userRoleAuth.userRole === "admin" ||
                        userRoleAuth.userRole === "projectManager") && (
                        <TableCell sx={tableCell}>
                          ${formatMoney(row.paymentPending)}
                        </TableCell>
                      )} */}
                      <TableCell sx={{ ...tableCell, display: changeOrderSelectedView ? 'none' : '' }}>
                        <Typography
                          maxHeight={"90px"}
                          sx={{
                            fontWeight: 500,
                            fontSize: "0.9rem",
                            overflowY: "auto",
                            textAlign: "left",
                            
                          }}
                        >
                          {row.notes}
                        </Typography>
                      </TableCell>
                      {adminProjectView && (
                        <>
                          {view === "Generate Invoice" ? (
                            <TableCell sx={tableCell}>
                              {row.invoiceExists
                                ? "generated"
                                : "not generated"}
                            </TableCell>
                          ) : (
                            <TableCell sx={{...tableCell, textTransform:'capitalize'}}>{row.status}</TableCell>
                          )}
                          {/* {(userRoleAuth.userRole === "superadmin" ||
                            userRoleAuth.userRole === "admin" ||
                            userRoleAuth.userRole === "projectManager") && (
                            <TableCell sx={tableCell}>
                              <Button
                                sx={{
                                  height: "2rem",
                                  padding: { lg: "0.75rem 1.5rem" },
                                  justifyContent: "center",
                                  alignItems: "center",
                                  flexShrink: 0,
                                  alignSelf: "stretch",
                                  borderRadius: "2.8125rem",
                                  background:
                                    row?.UserLineItemStatuses?.length < 1
                                      ? "lightgray"
                                      : "#4C8AB1",
                                  color: "#FFF",
                                  textTransform: "none",
                                  "&:hover": {
                                    background: "#357899",
                                  },
                                  marginTop: "0.3rem",
                                }}
                                onClick={() => {
                                  handleShowTeamStatus(row);
                                }}
                                disabled={row?.UserLineItemStatuses?.length < 1}
                              >
                                Details
                              </Button>
                            </TableCell>
                          )} */}
                          {(userRoleAuth.userRole === "employee" ||
                            userRoleAuth.userRole === "subcontractor" ||
                            userRoleAuth.userRole === "supplier") && (
                            <TableCell sx={tableCell}>
                              {row.status === "Work Order approved" && (
                                <IconButton
                                  onClick={() => {
                                    handleUpdateUserStatus(row);
                                  }}
                                >
                                  <AssignmentTurnedInRoundedIcon fontSize="large" />
                                </IconButton>
                              )}
                            </TableCell>
                          )}
                        </>
                      )}
                      {(userRoleAuth.userRole === "superadmin" ||
                        userRoleAuth.userRole === "admin" ||
                        userRoleAuth.userRole === "projectManager" ||
                        userRoleAuth.userRole === "") &&
                        phaseData?.status === "not approved" &&
                        !InitialProposalView &&
                        view === "Change Order" &&
                        !pathCheck.includes("initial-proposal") && (
                          <TableCell sx={tableCell}>
                            <EditIcon onClick={changeOrderSelectedView ? () => hanldeEditChangeLineItem(row,index) : () => handleUpdateLine(row)} />
                            {(row.status === "Work Order Not requested" ||
                              row.status === "Work Order declined" ||
                              row.status === "Change Order declined" || 
                              row.status === "Not Requested") && (
                              <DeleteIcon
                                onClick={changeOrderSelectedView ? ()=> handleDeleteChangeLineItem(row,index) : () => handleDeleteLineItem(row.id)}
                                disabled={selectedRows.length === 0}
                              />
                            )}
                          </TableCell>
                        )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Grid>

        {showTeamStatus && (
          <LineItemTeamStatus
            modalOpen={showTeamStatus}
            setModalOpen={setShowTeamStatus}
            UserLineItemStatuses={checkedRow?.UserLineItemStatuses}
          />
        )}

        {showUpdateUserStatus && (
          <LineItemDetailModal
            userId={userId}
            lineItem={checkedRow}
            modalOpen={showUpdateUserStatus}
            setModalOpen={setShowUpdateUserStatus}
            userRole={userRoleAuth.userRole}
          />
        )}

        {showAddLine && (
          <AddLineDialogue
            phaseData={phaseData}
            handleAddOpen={handleAddOpen}
            handleAddClose={handleAddClose}
            handleAddRow={handleAddRow}
            projectId={projectId}
            InitialProposalView={InitialProposalView}
            setRowCheckboxes={setRowCheckboxes}
            showAddLine={showAddLine}
          />
        )}
        {showUpdateLine && (
          <UpdateLineDialogue
            handleUpdateOpen={handleUpdateOpen}
            handleUpdateClose={handleUpdateClose}
            handleUpdateRow={handleUpdateRow} // Pass the update functio
            LineItem={checkedRow}
            projectId={projectId}
            InitialProposalView={InitialProposalView}
            setRowCheckboxes={setRowCheckboxes}
            showUpdateLine={showUpdateLine}
          />
        )}
        {openModal && (
          <AreYouSureModal
            open={openModal}
            handleClose={handleOpenModalClose}
            handleConfirmDelete={handleConfirmDelete}
            isLoading={isLoading}
            text={"Line Item"}
          />
        )}
      </Grid>
    </div>
  );
};
const scrollable = {
  scrollbarWidth: "thin", // For Firefox
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
  overflowY: "auto",
};
const firstGrid = {
  display: "flex",
  flexDirection: "column",
  marginTop: "0rem",
  borderRadius: "0.5rem",
  gap: 0,
  padding: 1,
};
const headingsBox = {
  display: "flex",
  flexDirection: { lg: "row", md: "row", sm: "row", xs: "row" },
  justifyContent: "space-between",
  width: "90%",
};

const headingInnerBox = {
  display: "flex",
  flexDirection: "row",
  whiteSpace: "nowrap",
  gap: { xl: "9rem", lg: "6rem", md: "2rem", sm: "auto", xs: "auto" },
  width: "90%",
};
const phaseBox = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  marginTop: "0rem",
};
const tableGrid = {
  background: "#FBFBFB",
  borderTopRightRadius: "7px",
  borderBottomRightRadius: "7px",
  borderBottomLeftRadius: "7px",
  padding: "1rem 0rem",
  width: "100%",
  fontSize: { lg: "10px" },
};
const blackHeading = {
  fontFamily: "var(--main-font-family)",
  color: "#4B4B4B",
  fontSize: "20px",
  fontWeight: 400,
  lineHeight: "30px",
  letterSpacing: "0em",
  textAlign: "left",
  marginTop: "1rem",
};
const listOfLineText = {
  fontSize: { xl: "1.25rem", lg: 16, md: "1.25rem", xs: "1.25rem" },
  fontFamily: "var(--main-font-family)",
  fontWeight: 400,
  paddingLeft: "2rem",
  color: "#4C8AB1",
};

const tableHeadings = {
  maxWidth: { xl: "80px", lg: "100px", md: "100px", xs: "100%" },
  minWidth: { xl: "20px", lg: "40px", md: "40px", xs: "20px" },
  fontFamily: "var(--main-font-family)",
  whiteSpace: "nowrap",
  fontWeight: 500,
  fontSize: "0.9rem",
  color: "#8C8C8C",
  padding: "8px !important",
  textAlign: "left",
  // paddingLeft: "0rem",
};
const tableCell = {
  // fontFamily: 'var(--main-font-family)',
  maxWidth: { xl: "40px", lg: "80px", md: "70px", xs: "100%" },
  minWidth: { xl: "20px", lg: "40px", md: "40px", xs: "20px" },
  whiteSpace: "nowrap",
  fontWeight: 500,
  fontSize: "0.9rem",
  // color: "#8C8C8C",
  padding: "8px !important",
  // paddingLeft: "0rem",
  textAlign: "left",
  overflow: "hidden",
  textOverflow: "ellipsis",
};
const hrLine = {
  width: "100%",
  border: 0,
  height: "1.3px",
  backgroundColor: "#DCDCDC",
  opacity: "50%",
};

export default AddPhaseCard;
