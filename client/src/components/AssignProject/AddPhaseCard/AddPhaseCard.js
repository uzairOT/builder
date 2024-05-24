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
} from "@mui/material";
import { ReactComponent as ArrowDown } from "../Assets/svgs/ArrowDown.svg";
import { ReactComponent as Arrowup } from "../Assets/svgs/Arrowup.svg";
import { ReactComponent as EditIcon } from "../Assets/svgs/EditIcon.svg";
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
//import "react-toastify/dist/ReactToastify.css";

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
  handleAddRow,
  phaseData,
  onGridToggle,
  length,
  handleSelectCard,
  adminProjectView,
  setRowCheckboxes,
  projectId,
  InitialProposalView,
  authUserRole,
}) => {
  const [selectAll, setSelectAll] = useState(false); // State to track the checked state of the checkbox in the table head
  const [showAddLine, setShowAddLine] = useState(false);
  const [showUpdateLine, setShowUpdateLine] = useState(false);
  const [showUpdateUserStatus, setShowUpdateUserStatus] = useState(false);
  const [showTeamStatus, setShowTeamStatus] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rows, setRows] = useState(initialRows);
  const user = useSelector((state) => state.auth.userInfo);
  const userId = user.user.id;
  const userRoleAuth = useSelector(getUserRoleFromRedux);
  console.log(userRoleAuth);
  const [deletePhaseLine] = useDeletePhaseLineMutation();
console.log(adminProjectView)
  const dispatch = useDispatch();
  const { rowCheckbox } = useSelector(selectAddPhase);
  let totalCost = 0;
  let minStartDay = moment(phaseData?.LineItems[0]?.start_day);
  let maxEndDay = moment(phaseData?.LineItems[0]?.end_day);
  let totalHours = 0;
  // console.log(maxEndDay);

  phaseData.LineItems.forEach((row) => {
    totalCost += (parseInt(row.total) + parseInt(row.margin)); // Accumulate the total cost
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

    const res = await deletePhaseLine(data);
    if (InitialProposalView) {
      dispatch(addInitialPhase(res.data.allPhases));
    } else {
      dispatch(addPhase(res.data.allPhases));
    }
  };

  const handleAddLine = () => {
    setShowAddLine(true);
  };

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
    const phaseName = phaseData.phase_name;
    const phaseId = phaseData.id;

    setRowCheckboxes((prevSelectedRows) => {
      const updatedRows = { ...prevSelectedRows };

      if (!updatedRows[phaseId]) {
        // If phaseName doesn't exist in selectedRows, initialize it
        updatedRows[phaseId] = { phaseName: phaseName, rows: [] };
      }

      const rowExistsIndex = updatedRows[phaseId].rows.findIndex(
        (item) => item === row
      );
      if (rowExistsIndex !== -1) {
        // Row already exists, remove it
        updatedRows[phaseId].rows.splice(rowExistsIndex, 1);
      } else {
        // Row doesn't exist, add it
        updatedRows[phaseId].rows.push(row);
      }
      if (updatedRows[phaseId].rows.length === 0) {
        delete updatedRows[phaseId];
      }
      return { ...updatedRows };
    });
  };

  // Function to check if a row is selected
  const isRowSelected = (row) => {
    const phaseId = phaseData.id;
    return selectedRows[phaseId]?.rows.includes(row);
  };
  // console.log('PHASE :', phaseData)

  return (
    <div style={{ width: "100%" }}>
      <Grid
        item
        lg={12}
        sx={{
          ...firstGrid,
          backgroundColor: `${phaseData?.color}`,
          width: "100%",
        }}
      >
        <Box sx={headingsBox} onClick={() => handleSelectCard(phaseData.id)}>
          <Box sx={headingInnerBox}>
            <Box>
              <Typography
                sx={{ ...blackHeading, cursor: "pointer", paddingLeft: "1rem" }}
              >
                {phaseData.phase_name}
              </Typography>
            </Box>
            <Box>
              {(userRoleAuth.userRole === "superadmin" ||
                    userRoleAuth.userRole === "admin" ||
                    userRoleAuth.userRole === "projectManager") && <Typography sx={blackHeading}>Price: ${totalCost}</Typography>}
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
            {InitialProposalView ? (
              (authUserRole === "superadmin" ||
                authUserRole === "projectManager") && (
                <Button
                  sx={{
                    ...actionButton,
                    background: "#4C8AB1",
                    marginTop: "0.7rem",
                  }}
                  onClick={handleAddLine}
                >
                  Add Line Item
                </Button>
              )
            ) : (
              <Button
                sx={{
                  ...actionButton,
                  background: "#4C8AB1",
                  marginTop: "0.7rem",
                }}
                onClick={handleAddLine}
              >
                Add Line Item
              </Button>
            )}
          </Box>
        </Box>

        <Grid item sx={tableGrid}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={listOfLineText}>List of Line Items</Typography>
            {/* <Button
              sx={{ ...actionButton, ...approvalButton, ...displayButton }}
            >
              Send Approval
            </Button> */}
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
                  {!InitialProposalView && (
                    <TableCell>
                      {/* {!adminProjectView && (
                      <Checkbox
                        checked={selectAll}
                        onChange={handleSelectAllChange}
                      />
                    )} */}
                    </TableCell>
                  )}
                  <TableCell sx={{ ...tableHeadings }}>Line Item</TableCell>

                  {/* <TableCell sx={tableHeadings}>Description</TableCell> */}
                  <TableCell sx={tableHeadings}>Unit</TableCell>
                  <TableCell sx={tableHeadings}>Unit Cost</TableCell>
                  <TableCell sx={tableHeadings}>Cost</TableCell>
                  <TableCell sx={tableHeadings}>Quantity</TableCell>
                  <TableCell sx={tableHeadings}>Start</TableCell>
                  <TableCell sx={tableHeadings}>End</TableCell>
                  <TableCell sx={tableHeadings}>Margin</TableCell>
                  <TableCell sx={tableHeadings}>Total Cost</TableCell>
                  <TableCell sx={tableHeadings}>Notes</TableCell>
                  {adminProjectView && <>
                  <TableCell sx={tableHeadings}>Status</TableCell>

                  {(userRoleAuth.userRole === "employee" ||
                    userRoleAuth.userRole === "subcontractor" ||
                    userRoleAuth.userRole === "supplier") && (
                    <TableCell sx={tableHeadings}>Update Status</TableCell>
                  )}
                  {(userRoleAuth.userRole === "superadmin" ||
                    userRoleAuth.userRole === "admin" ||
                    userRoleAuth.userRole === "projectManager") && (
                    <TableCell sx={tableHeadings}>Team Status</TableCell>
                  )}
                  </>}
                  <TableCell></TableCell>
                </TableRow>

                <TableRow style={hrLine}></TableRow>
              </TableHead>

              <TableBody>
                {phaseData.LineItems.map((row, index) => {
                  if(userRoleAuth.userRole === "employee" ||
                  userRoleAuth.userRole === "subcontractor" ||
                  userRoleAuth.userRole === "supplier"){
                    const userLineItem = row?.UserLineItemStatuses?.find(user => user.userId === userId);
                    if(Boolean(userLineItem)){
                      
                    }else{
                      return <></>
                    }
                  }
                  return (
                    <TableRow key={index} sx={{ paddingLeft: "4rem" }}>
                      {!InitialProposalView && (
                        <TableCell>
                          {(row.status === "Work Order Not requested" ||
                            row.status === "Work Order declined" ||
                            row.status === "Change Order declined") && (
                            <Checkbox
                              // checked={checkedRow === row}
                              sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                              checked={isRowSelected(row)}
                              onChange={() => handleCheckboxChange(row)}
                            />
                          )}
                        </TableCell>
                      )}
                      <TableCell component="th" scope="row">
                        {row.title}
                      </TableCell>
                      {/* <TableCell>{row.description}</TableCell> */}
                      <TableCell>{row.unit}</TableCell>
                      <TableCell>${row.unit_price}</TableCell>
                      <TableCell>${row.total}</TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>
                        {row?.WorkOrderReqs
                          ? moment(row?.WorkOrderReqs[0]?.start_day).format(
                              "MMM, DD, YYYY HH:mm a"
                            )
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {row?.WorkOrderReqs
                          ? moment(row?.WorkOrderReqs[0]?.end_day).format(
                              "MMM, DD, YYYY HH:mm a"
                            )
                          : "-"}
                      </TableCell>

                     
                      <TableCell>${row?.margin}</TableCell>
                      <TableCell>${Number(row.total) + Number(row.margin)}</TableCell>

                      <TableCell>{row.notes}</TableCell>
                     {adminProjectView && <>
                      <TableCell>{row.status}</TableCell>
                      {(userRoleAuth.userRole === "superadmin" ||
                        userRoleAuth.userRole === "admin" ||
                        userRoleAuth.userRole === "projectManager") && (
                        <TableCell >
                          <Button
                            sx={{
                              height: "2rem",
                              padding: { lg: "0.75rem 1.5rem" },
                              justifyContent: "center",
                              alignItems: "center",
                              flexShrink: 0,
                              alignSelf: "stretch",
                              borderRadius: "2.8125rem",
                              background: row?.UserLineItemStatuses?.length < 1 ? 'lightgray' : "#4C8AB1",
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
                      )}
                      {(userRoleAuth.userRole === "employee" ||
                        userRoleAuth.userRole === "subcontractor" ||
                        userRoleAuth.userRole === "supplier") &&  (
                        <TableCell sx={{}}>
                          {(row.status === 'Work Order approved')&& <IconButton
                            onClick={() => {
                              handleUpdateUserStatus(row);
                            }}
                          >
                            <AssignmentTurnedInRoundedIcon fontSize="large" />
                          </IconButton>}
                        </TableCell>
                      )}
                      </>}
                      <TableCell>
                        <EditIcon onClick={() => handleUpdateLine(row)} />
                        {(row.status === "Work Order Not requested" ||
                          row.status === "Work Order declined" ||
                          row.status === "Change Order declined") && (
                          <DeleteIcon
                            onClick={() => handleDeleteSelectedRows(row.id)}
                            disabled={selectedRows.length === 0}
                          />
                        )}
                      </TableCell>
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
          />
        )}
      </Grid>
    </div>
  );
};
const scrollable = {
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
  flexDirection: { lg: "row", md: "row", sm: "column", xs: "column" },
  justifyContent: "space-between",
  width: "100%",
};

const headingInnerBox = {
  display: "flex",
  flexDirection: "row",
  whiteSpace: "nowrap",
  gap: { xl: "9rem", lg: "6rem", md: "2rem", sm: "auto", xs: "auto" },
  width: "100%",
};
const phaseBox = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  marginTop: "0rem",
  marginBottom: "1rem",
  marginRight: { lg: "1rem", md: "1rem", sm: "1rem", xs: "1rem" },
};
const tableGrid = {
  background: "#FBFBFB",
  borderRadius: "1rem",
  padding: "1rem 2rem",
  width: "100%",
};
const blackHeading = {
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  color: "#4B4B4B",
  fontSize: "20px",
  fontWeight: 400,
  lineHeight: "30px",
  letterSpacing: "0em",
  textAlign: "left",
  marginTop: "1rem",
};
const listOfLineText = {
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  fontWeight: 400,
  fontSize: "1.25rem",
  paddingLeft: "2rem",
  color: "#4C8AB1",
};

const tableHeadings = {
  fontFamily: "Poppins, sans-serif",
  whiteSpace: "nowrap",
  fontWeight: 500,
  fontSize: "0.9rem",
  color: "#8C8C8C",
  padding: "8px !important",
  // paddingLeft: "0rem",
};
const hrLine = {
  width: "100%",
  border: 0,
  height: "1.3px",
  backgroundColor: "#DCDCDC",
  opacity: "50%",
};

export default AddPhaseCard;
