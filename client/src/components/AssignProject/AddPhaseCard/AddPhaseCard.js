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
import AddLine from "../../dialogues/AddLine/AddLine"
import { ReactComponent as ArrowDown } from "../Assets/svgs/ArrowDown.svg";
import { ReactComponent as Arrowup } from "../Assets/svgs/Arrowup.svg";
import { ReactComponent as EditIcon } from "../Assets/svgs/EditIcon.svg";
import { ReactComponent as DeleteIcon } from "../Assets/svgs/DeleteIcon.svg";
import "../../../App.css"
import actionButton from "../../UI/actionButton";
import "./AddPhaseCard.css";

const AddPhaseCard = ({ cardPhase, rows, onGridToggle, length }) => {
  const [selectAll, setSelectAll] = useState(false); // State to track the checked state of the checkbox in the table head
  const [rowCheckboxes, setRowCheckboxes] = useState(rows.map(() => false)); // State to track the checked state of each checkbox in the table rows
  const [showAddLine, setShowAddLine] = useState(false);

  const handleArrowDownClick = () => {
    onGridToggle(cardPhase.currentIndex, cardPhase.currentIndex + 1);
  };

  const handleArrowUpClick = () => {
    onGridToggle(cardPhase.currentIndex, cardPhase.currentIndex - 1);
  };

  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    setRowCheckboxes(rowCheckboxes.map(() => isChecked));
  };

  const handleRowCheckboxChange = (index) => (event) => {
    const isChecked = event.target.checked;
    const updatedCheckboxes = [...rowCheckboxes];
    updatedCheckboxes[index] = isChecked;
    setRowCheckboxes(updatedCheckboxes);
    setSelectAll(updatedCheckboxes.every((checkbox) => checkbox));
  };

  const handleAddLine = () => {
    setShowAddLine(true)
  };

  const handleOpen = () => {
    setShowAddLine(true);
  };

  const handleClose = () => {
    setShowAddLine(false);
  };

  const tableContainerStyle = {
    maxWidth: '100%', // Allow the table to take up the entire available width
    overflowX: 'auto', // Add horizontal scrollbar when needed
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
            <Box>
              <Typography sx={blackHeading}>Phase 1</Typography>
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
            <EditIcon />
            <DeleteIcon />
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
                  <TableRow key={row.name} sx={{ paddingLeft: "4rem" }}>
                    <TableCell>
                      <Checkbox checked={rowCheckboxes[index]}
                        onChange={handleRowCheckboxChange(index)} />
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell>{row.calories}</TableCell>
                    <TableCell>{row.fat}</TableCell>
                    <TableCell>{row.carbs}</TableCell>
                    <TableCell>{row.protein}</TableCell>
                    <TableCell>{row.calorie}</TableCell>
                    <TableCell>{row.fa}</TableCell>
                    <TableCell>{row.carb}</TableCell>
                    <TableCell>{row.protei}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Grid>







        {showAddLine && (
          <AddLine
            handleOpen={handleOpen}
            handleClose={handleClose}
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
