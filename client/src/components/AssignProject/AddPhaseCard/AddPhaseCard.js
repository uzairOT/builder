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
import { addPhase } from "../../../redux/slices/Project/projectInitialProposal";
import moment from "moment";

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
}) => {
  const [selectAll, setSelectAll] = useState(false); // State to track the checked state of the checkbox in the table head
  const [showAddLine, setShowAddLine] = useState(false);
  const [showUpdateLine, setShowUpdateLine] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rows, setRows] = useState(initialRows);
  const [deletePhaseLine] = useDeletePhaseLineMutation();
  const dispatch = useDispatch();
  const { rowCheckbox } = useSelector(selectAddPhase);
  let totalDays = 0;

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
    dispatch(addPhase(res.data.allPhases));
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

  const handleUpdateOpen = () => {
    setShowUpdateLine(true);
  };

  const handleUpdateClose = () => {
    setShowUpdateLine(false);
  };

  const tableContainerStyle = {
    width: "100%", // Allow the table to take up the entire available width
    overflowY: "auto",
    height: "245px",
    overflowX: { md: "hidden" },
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

      if (!updatedRows[phaseName]) {
        // If phaseName doesn't exist in selectedRows, initialize it
        updatedRows[phaseName] = { id: phaseId, rows: [] };
      }

      const rowExistsIndex = updatedRows[phaseName].rows.findIndex(
        (item) => item === row
      );
      if (rowExistsIndex !== -1) {
        // Row already exists, remove it
        updatedRows[phaseName].rows.splice(rowExistsIndex, 1);
      } else {
        // Row doesn't exist, add it
        updatedRows[phaseName].rows.push(row);
      }

      return { ...updatedRows };
    });
  };

  // Function to check if a row is selected
  const isRowSelected = (row) => {
    const phaseName = phaseData.phase_name;
    return selectedRows[phaseName]?.rows.includes(row);
  };

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
              <Typography sx={{ ...blackHeading, cursor: "pointer" }}>
                {phaseData.phase_name}
              </Typography>
            </Box>
            <Box>
              <Typography sx={blackHeading}>Total Price:</Typography>
            </Box>
            <Box>
              <Typography sx={blackHeading}>Time: &nbsp; Days: </Typography>
            </Box>
          </Box>
          <Box sx={phaseBox}>
            <>
              {phaseData?.current_position === 0 ? (
                <ArrowDown
                  style={{ marginRight: "1rem", cursor: "pointer" }}
                  onClick={handleArrowDownClick}
                />
              ) : phaseData?.current_position === length - 1 ? (
                <Arrowup
                  style={{ marginRight: "1rem", cursor: "pointer" }}
                  onClick={handleArrowUpClick}
                />
              ) : (
                <>
                  <ArrowDown
                    style={{ marginRight: "1rem", cursor: "pointer" }}
                    onClick={handleArrowDownClick}
                  />
                  <Arrowup
                    style={{ marginRight: "1rem", cursor: "pointer" }}
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
          </Box>
        </Box>

        <Grid item sx={tableGrid}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={listOfLineText}>List of Line Items</Typography>
            <Button
              sx={{ ...actionButton, ...approvalButton, ...displayButton }}
            >
              Send Approval
            </Button>
          </Box>

          <hr style={hrLine} />
          <Box
            sx={{ ...tableContainerStyle, marginLeft: "1rem", width: "100%" }}
          >
            <Table sx={{ width: "100%" }}>
              <TableHead sx={{ width: "100%" }}>
                <TableRow>
                  <TableCell>
                    {!adminProjectView && (
                      <Checkbox
                        checked={selectAll}
                        onChange={handleSelectAllChange}
                      />
                    )}
                  </TableCell>
                  <TableCell sx={{ ...tableHeadings, width: "15%" }}>
                    Line Item
                  </TableCell>

                  <TableCell sx={tableHeadings}>Description</TableCell>
                  <TableCell sx={tableHeadings}>Unit</TableCell>
                  <TableCell sx={tableHeadings}>Unit Cost</TableCell>
                  <TableCell sx={tableHeadings}>Quantity</TableCell>
                  <TableCell sx={tableHeadings}>Start</TableCell>
                  <TableCell sx={tableHeadings}>End</TableCell>
                  <TableCell sx={tableHeadings}>Total Cost</TableCell>
                  <TableCell sx={tableHeadings}>Notes</TableCell>
                  <TableCell sx={tableHeadings}>Status</TableCell>

                  <TableCell></TableCell>
                  <TableCell></TableCell>

                  <TableCell></TableCell>
                </TableRow>

                <TableRow style={hrLine}></TableRow>
              </TableHead>

              <TableBody>
                {phaseData.LineItems.map((row, index) => {
                
                  return (
                    <TableRow key={index} sx={{ paddingLeft: "4rem" }}>
                      <TableCell>
                        <Checkbox
                          // checked={checkedRow === row}
                          // onChange={() => handleCheckboxChange(row)}
                          checked={isRowSelected(row)}
                          onChange={() => handleCheckboxChange(row)}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.title}
                      </TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.unit}</TableCell>
                      <TableCell>{row.unit_price}</TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>
                        {moment(row.start_day).format("YYYY-MM-DD HH A")}
                      </TableCell>
                      <TableCell>
                        {moment(row.end_day).format("YYYY-MM-DD HH A")}
                      </TableCell>

                      <TableCell>{row.total}</TableCell>

                      <TableCell>{row.notes}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>
                        <EditIcon onClick={() => handleUpdateLine(row)} />
                        <DeleteIcon
                          onClick={() => handleDeleteSelectedRows(row.id)}
                          disabled={selectedRows.length === 0}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Grid>

        {showAddLine && (
          <AddLineDialogue
            phaseData={phaseData}
            handleAddOpen={handleAddOpen}
            handleAddClose={handleAddClose}
            handleAddRow={handleAddRow}
            projectId={projectId}
          />
        )}
        {showUpdateLine && (
          <UpdateLineDialogue
            handleUpdateOpen={handleUpdateOpen}
            handleUpdateClose={handleUpdateClose}
            handleUpdateRow={handleUpdateRow} // Pass the update function
            selectedRowIndex={selectedRows[0]}
            rowData={
              selectedRows[0] !== undefined ? rows[selectedRows[0]] : null
            }
            LineItem={checkedRow}
            adminProjectView={adminProjectView}
          />
        )}
      </Grid>
    </div>
  );
};
const approvalButton = {
  background: "#FFAC00",
  padding: "1rem 0.5rem",
};
const displayButton = {
  display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
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
  margin: { md: "0.2rem 4rem 0rem" },
  width: "100%",
};

const headingInnerBox = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  whiteSpace: "nowrap",
  gap: { lg: "9rem", md: "2rem", sm: "auto", xs: "auto" },
  width: "100%",
};
const phaseBox = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  marginTop: "1rem",
  marginRight: { lg: "4rem", md: "4rem", sm: "0rem", xs: "0rem" },
  width: "100%",
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
  paddingLeft: "0rem",
};
const hrLine = {
  width: "100%",
  border: 0,
  height: "1.3px",
  backgroundColor: "#DCDCDC",
  opacity: "50%",
};

export default AddPhaseCard;
