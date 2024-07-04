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
import { useLocation } from "react-router-dom";
import { formatMoney } from "../../../utils/Formatters/moneyFormat";
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
  rowCheckboxes,
  authUserRole,
  changeOrder,
  view,
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
  console.log(adminProjectView);
  const dispatch = useDispatch();
  const { rowCheckbox } = useSelector(selectAddPhase);
  let totalCost = 0;
  let minStartDay = moment(phaseData?.LineItems[0]?.start_day);
  let maxEndDay = moment(phaseData?.LineItems[0]?.end_day);
  let totalHours = 0;
  console.log("changeOrder ", changeOrder);
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  console.log(path);

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
  console.log(checkedRow);
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
  const isRowSelected = (row, phaseId) => {
    console.log("Check run phaseId ", rowCheckboxes);
    const isSelected =
      rowCheckboxes[phaseId]?.rows.some((r) => r.id === row.id) || false;
    console.log("Check boolean phaseId ", isSelected);
    return isSelected;
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
              sx={{ borderTopLeftRadius: "7px", borderTopRightRadius: "7px" }}
            >
              <Typography
                sx={{
                  ...blackHeading,
                  cursor: "pointer",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                  fontWeight: "600",
                  fontSize: "26px",
                }}
              >
                {phaseData.phase_name}
              </Typography>
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
                  <Button
                    sx={{
                      ...actionButton,
                      background: "#4C8AB1",
                      marginTop: "0.7rem",
                      marginBottom: "1rem",
                      marginRight: {
                        lg: "1rem",
                        md: "1rem",
                        sm: "1rem",
                        xs: "1rem",
                      },
                    }}
                    onClick={handleAddLine}
                  >
                    Add Line Item
                  </Button>
                )
              : (userRoleAuth.userRole === "admin" ||
                  userRoleAuth.userRole === "superadmin" ||
                  userRoleAuth.userRole === "projectManager" ||
                  userRoleAuth.userRole === "") && (
                  <Button
                    sx={{
                      ...actionButton,
                      background: "#4C8AB1",
                      marginTop: "0.7rem",
                      marginBottom: "1rem",
                      marginRight: {
                        lg: "1rem",
                        md: "1rem",
                        sm: "1rem",
                        xs: "1rem",
                      },
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
                  {!InitialProposalView && (
                    <TableCell>
                     
                    </TableCell>
                  )}
                  <TableCell sx={{ ...tableHeadings }}>Line Item</TableCell>

                  {/* <TableCell sx={tableHeadings}>Description</TableCell> */}
                  <TableCell sx={tableHeadings}>Unit</TableCell>
                  {!(
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
                  <TableCell sx={tableHeadings}>Quantity</TableCell>
                  {!(path === "assignproject") && (
                    <TableCell sx={tableHeadings}>Start</TableCell>
                  )}
                  {!(path === "assignproject") && (
                    <TableCell sx={tableHeadings}>End</TableCell>
                  )}
                  {!(
                    userRoleAuth.userRole === "client" ||
                    userRoleAuth.userRole === "employee" ||
                    userRoleAuth.userRole === "subcontractor" ||
                    userRoleAuth.userRole === "supplier"
                  ) && <TableCell sx={tableHeadings}>Profit</TableCell>}
                  <TableCell sx={tableHeadings}>Total Cost</TableCell>
                  {(userRoleAuth.userRole === "superadmin" ||
                    userRoleAuth.userRole === "admin" ||
                    userRoleAuth.userRole === "projectManager") && (
                    <TableCell sx={tableHeadings}>Arrears</TableCell>
                  )}
                  <TableCell sx={tableHeadings}>Notes</TableCell>
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
                      {(userRoleAuth.userRole === "superadmin" ||
                        userRoleAuth.userRole === "admin" ||
                        userRoleAuth.userRole === "projectManager") && (
                        <TableCell sx={tableHeadings}>Team Status</TableCell>
                      )}
                    </>
                  )}
                  {(userRoleAuth.userRole === "superadmin" ||
                    userRoleAuth.userRole === "admin" ||
                    userRoleAuth.userRole === "projectManager" ||
                    userRoleAuth.userRole === "") && (
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
                    <TableRow key={index} sx={{ paddingLeft: "4rem" }}>
                      {!InitialProposalView && (
                        <TableCell>
                          {!(path === "assignproject") &&
                            !(view === "Generate Invoice") &&
                            (row.status === "Work Order Not requested" ||
                              row.status === "Work Order declined" ||
                              row.status === "Change Order declined") && (
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
                      )}
                      <TableCell component="th" scope="row">
                        {row.title}
                      </TableCell>
                      {/* <TableCell>{row.description}</TableCell> */}
                      <TableCell>{row.unit}</TableCell>
                      {!(
                        userRoleAuth.userRole === "client" ||
                        userRoleAuth.userRole === "employee" ||
                        userRoleAuth.userRole === "subcontractor" ||
                        userRoleAuth.userRole === "supplier"
                      ) && (
                        <TableCell>${formatMoney(row.unit_price)}</TableCell>
                      )}
                      {!(
                        userRoleAuth.userRole === "client" ||
                        userRoleAuth.userRole === "employee" ||
                        userRoleAuth.userRole === "subcontractor" ||
                        userRoleAuth.userRole === "supplier"
                      ) && <TableCell>${formatMoney(row.total)}</TableCell>}

                      <TableCell>{row.quantity}</TableCell>
                      {!(path === "assignproject") && (
                        <TableCell>
                          {row?.start_day
                            ? moment(row?.start_day).format(
                                "MMM, DD, YYYY HH:mm a"
                              )
                            : "-"}
                        </TableCell>
                      )}
                      {!(path === "assignproject") && (
                        <TableCell>
                          {row?.end_day
                            ? moment(row?.end_day).format(
                                "MMM, DD, YYYY HH:mm a"
                              )
                            : "-"}
                        </TableCell>
                      )}

                      {!(
                        userRoleAuth.userRole === "client" ||
                        userRoleAuth.userRole === "employee" ||
                        userRoleAuth.userRole === "subcontractor" ||
                        userRoleAuth.userRole === "supplier"
                      ) && <TableCell>${formatMoney(row?.margin)}</TableCell>}
                      <TableCell>
                        ${formatMoney(Number(row.total) + Number(row.margin))}
                      </TableCell>
                      {(userRoleAuth.userRole === "superadmin" ||
                        userRoleAuth.userRole === "admin" ||
                        userRoleAuth.userRole === "projectManager") && (
                        <TableCell>
                          ${formatMoney(row.paymentPending)}
                        </TableCell>
                      )}
                      <TableCell>{row.notes}</TableCell>
                      {adminProjectView && (
                        <>
                          {view === "Generate Invoice" ? (
                            <TableCell>
                              {row.invoiceExists
                                ? "generated"
                                : "not generated"}
                            </TableCell>
                          ) : (
                            <TableCell>{row.status}</TableCell>
                          )}
                          {(userRoleAuth.userRole === "superadmin" ||
                            userRoleAuth.userRole === "admin" ||
                            userRoleAuth.userRole === "projectManager") && (
                            <TableCell>
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
                          )}
                          {(userRoleAuth.userRole === "employee" ||
                            userRoleAuth.userRole === "subcontractor" ||
                            userRoleAuth.userRole === "supplier") && (
                            <TableCell sx={{}}>
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
                        userRoleAuth.userRole === "") && (
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
};
const tableGrid = {
  background: "#FBFBFB",
  borderTopRightRadius: "7px",
  borderBottomRightRadius: "7px",
  borderBottomLeftRadius: "7px",
  padding: "1rem 0rem",
  width: "100%",
};
const blackHeading = {
  fontFamily: "Arial Rounded MT, sans-serif",
  color: "#4B4B4B",
  fontSize: "20px",
  fontWeight: 400,
  lineHeight: "30px",
  letterSpacing: "0em",
  textAlign: "left",
  marginTop: "1rem",
};
const listOfLineText = {
  fontFamily: "Arial Rounded MT, sans-serif",
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
