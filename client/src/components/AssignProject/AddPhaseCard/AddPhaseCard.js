import React, { useState } from "react";
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
  Checkbox
} from "@mui/material";
import { ReactComponent as ArrowDown } from "../Assets/svgs/ArrowDown.svg";
import { ReactComponent as Arrowup } from "../Assets/svgs/Arrowup.svg";
import { ReactComponent as EditIcon } from "../Assets/svgs/EditIcon.svg";
import { ReactComponent as DeleteIcon } from "../Assets/svgs/DeleteIcon.svg";
import "../../../App.css"
import actionButton from "../../UI/actionButton";
import "./AddPhaseCard.css";
import AddLineDialogue from "../../dialogues/AddLineDialogue/AddLineDialogue";
import UpdateLineDialogue from "../../dialogues/UpdateLineDialogue/UpdateLineDialogue";
import { useDeletePhaseLineMutation } from "../../../redux/apis/Project/projectApiSlice";


const initialRows = [
  { phaseName: 'Item 1', description: 'Description 1', unit: 'Unit 1', margin: '10%', quantity: 5, unitPrice: 20, total: 100, start: '2024-03-01', end: '2024-03-05', longDescription: 'Note 1' },
  { phaseName: 'Item 2', description: 'Description 2', unit: 'Unit 2', margin: '15%', quantity: 3, unitPrice: 30, total: 90, start: '2024-03-03', end: '2024-03-08', longDescription: 'Note 2' },
  { phaseName: 'Item 3', description: 'Description 3', unit: 'Unit 3', margin: '20%', quantity: 2, unitPrice: 25, total: 50, start: '2024-03-02', end: '2024-03-06', longDescription: 'Note 3' },
  // Add more rows as needed
];


const AddPhaseCard = ({ cardPhase, onGridToggle, length, handleSelectCard }) => {


  const [selectAll, setSelectAll] = useState(false); // State to track the checked state of the checkbox in the table head
  const [showAddLine, setShowAddLine] = useState(false);
  const [showUpdateLine, setShowUpdateLine] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rows, setRows] = useState(initialRows)
  const [rowCheckboxes, setRowCheckboxes] = useState(rows.map(() => false)); // State to track the checked state of each checkbox in the table rows
  const [deletePhaseLine] = useDeletePhaseLineMutation();



  const handleArrowDownClick = () => {
    onGridToggle(cardPhase.currentIndex, cardPhase.currentIndex + 1);
  };

  const handleArrowUpClick = () => {
    onGridToggle(cardPhase.currentIndex, cardPhase.currentIndex - 1);
  };

  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    const updatedSelectedRows = isChecked ? rows.map((_, index) => index) : [];
    setSelectedRows(updatedSelectedRows);
  };

  const handleRowCheckboxChange = (index) => (event) => {
    const isChecked = event.target.checked;
    const updatedRowCheckboxes = [...rowCheckboxes];
    updatedRowCheckboxes[index] = isChecked;
    setRowCheckboxes(updatedRowCheckboxes);

    const updatedSelectedRows = isChecked
      ? [...selectedRows, index]
      : selectedRows.filter((rowIndex) => rowIndex !== index);
    setSelectedRows(updatedSelectedRows);
    setSelectAll(updatedSelectedRows.length === rows.length);
  };
  const handleDeleteSelectedRows = () => {
    const updatedRows = rows.filter((_, index) => !selectedRows.includes(index));
    // Handle the updated rows according to your application logic
    deletePhaseLine(selectedRows);
    console.log("Deleted rows:", selectedRows);
    console.log("Remaining rows:", updatedRows);

    // Clear the selectedRows state after deletion
    setSelectedRows([]);
  };





  const handleAddLine = () => {
    setShowAddLine(true)
  };

  const handleAddOpen = () => {
    setShowAddLine(true);
  };

  const handleAddClose = () => {
    setShowAddLine(false);
  };
  const handleUpdateLine = () => {
    setShowUpdateLine(true)
  };

  const handleUpdateOpen = () => {
    setShowUpdateLine(true);
  };

  const handleUpdateClose = () => {
    setShowUpdateLine(false);
  };

  const tableContainerStyle = {
    maxWidth: '100%', // Allow the table to take up the entire available width
    overflowX: 'auto', // Add horizontal scrollbar when needed
  };


  const handleUpdateRow = (index, newData) => {
    const updatedRows = [...rows];
    updatedRows[index] = { ...updatedRows[index], ...newData };
    setRows(updatedRows);
    console.log(updatedRows)
  };
  const handleAddRow = (newData) => {
    const updatedRows = [...rows, newData];
    setRows(updatedRows);
    console.log(updatedRows);
  };


  return (
    <div>
      <Grid
        item
        lg={12}
        sx={{ ...firstGrid, backgroundColor: `${cardPhase?.color}` }}
      >
        <Box
          sx={headingsBox}
        >
          <Box sx={headingInnerBox}>
            <Box >
              <Typography sx={{ ...blackHeading, cursor: "pointer" }} onClick={() => handleSelectCard(cardPhase.id)}>{cardPhase.phaseName}</Typography>
            </Box>
            <Box>
              <Typography sx={blackHeading}>Total Price:</Typography>
            </Box>
            <Box>
              <Typography sx={blackHeading}>Time: &nbsp; Days:</Typography>
            </Box>
          </Box>
          <Box
            sx={phaseBox}
          >
            <>
              {cardPhase?.currentIndex === 0 ? (
                <ArrowDown
                  style={{ marginRight: "1rem", cursor: "pointer" }}
                  onClick={handleArrowDownClick}
                />
              ) : cardPhase?.currentIndex === length - 1 ? (
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
            <EditIcon
              // onClick={handleUpdateLine}
              onClick={handleUpdateLine}
            />
            <DeleteIcon
              onClick={handleDeleteSelectedRows}
              disabled={selectedRows.length === 0} />
            <Button
              sx={{ ...actionButton, background: "#4C8AB1", marginTop: "0.7rem" }}
              onClick={handleAddLine}
            >
              Add Line Item
            </Button>
          </Box>
        </Box>


        <Grid
          item
          sx={tableGrid}
        >
          <Typography sx={listOfLineText}>List of Line Items</Typography>
          <hr style={hrLine} />
          <Box sx={{ ...tableContainerStyle, marginLeft: "1rem", }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox checked={selectAll}
                      onChange={handleSelectAllChange} />
                  </TableCell>
                  <TableCell
                    sx={{ ...tableHeadings, width: "15%", }}
                  >
                    Line Item
                  </TableCell>

                  <TableCell sx={tableHeadings}>Description</TableCell>
                  <TableCell sx={tableHeadings}>Unit</TableCell>
                  <TableCell sx={tableHeadings}>Margin</TableCell>
                  <TableCell sx={tableHeadings}>Quantity</TableCell>
                  <TableCell sx={tableHeadings}>Unit Price</TableCell>
                  <TableCell sx={tableHeadings}>Total</TableCell>
                  <TableCell sx={tableHeadings}>Start</TableCell>
                  <TableCell sx={tableHeadings}>End</TableCell>
                  <TableCell sx={tableHeadings}>Notes</TableCell>
                </TableRow>

                <TableRow style={hrLine}></TableRow>
              </TableHead>

              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index} sx={{ paddingLeft: "4rem" }}>
                    <TableCell>
                      <Checkbox
                        checked={rowCheckboxes[index]}
                        onChange={handleRowCheckboxChange(index)}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.phaseName}
                    </TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.unit}</TableCell>
                    <TableCell>{row.margin}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>{row.unitPrice}</TableCell>
                    <TableCell>{row.total}</TableCell>
                    <TableCell>{row.start}</TableCell>
                    <TableCell>{row.end}</TableCell>
                    <TableCell>{row.longDescription}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Grid>



        {showAddLine && (
          <AddLineDialogue
            handleAddOpen={handleAddOpen}
            handleAddClose={handleAddClose}
            handleAddRow={handleAddRow}
          />
        )}
        {showUpdateLine && (
          <UpdateLineDialogue
            handleUpdateOpen={handleUpdateOpen}
            handleUpdateClose={handleUpdateClose}
            handleUpdateRow={handleUpdateRow} // Pass the update function
            selectedRowIndex={selectedRows[0]}
            rowData={selectedRows[0] !== undefined ? rows[selectedRows[0]] : null} // Pass the selected row's index
          />
        )}

      </Grid>
    </div>
  );
};
const firstGrid = {
  display: "flex",
  flexDirection: "column",
  marginTop: "1rem",
  borderRadius: "0.5rem",
}
const headingsBox = {
  display: "flex",
  flexDirection: { lg: "row", md: "row", sm: "column", xs: "column" },
  justifyContent: "space-between",
  margin: "0.2rem 4rem 0rem",
}

const headingInnerBox = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  whiteSpace: "nowrap",
  gap: { lg: "9rem", md: "2rem", sm: "auto", xs: "auto" }
}
const phaseBox = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  marginTop: "1rem",
  marginRight: { lg: "4rem", md: "4rem", sm: "0rem", xs: "0rem" }
}
const tableGrid = {
  background: "#FBFBFB",
  borderRadius: "1rem",
  margin: "0.7rem 1rem",
  padding: "1rem 2rem",
}
const blackHeading = {
  fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
  color: "#4B4B4B",
  fontSize: "20px",
  fontWeight: 400,
  lineHeight: "30px",
  letterSpacing: "0em",
  textAlign: "left",
  marginTop: "1rem",
};
const listOfLineText = {
  fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',
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
  paddingLeft: "0rem"
};
const hrLine = {
  width: "100%",
  border: 0,
  height: "1.3px",
  backgroundColor: "#DCDCDC",
  opacity: "50%",
};

export default AddPhaseCard;
