import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Button,
} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import AddPhaseCard from "../AddPhaseCard/AddPhaseCard";
import actionButton from "../../UI/actionButton";
import ColorPickerElement from "../../dialogues/ColorPickerElement/ColorPickerElement"

const initialCardPhase = [
  {
    id: 1,
    currentIndex: 0,
    previousIndex: -1,
    color: "pink"
  },
  {
    id: 2,
    currentIndex: 1,
    previousIndex: 0,
    color: "yellow"
  },

];

function AddPhaseView() {
  const [cardPhase, setCardPhase] = useState(initialCardPhase);
  const handleGridToggle = (currentIndex, previousIndex) => {
    // Ensure indices are within the valid range
    if (
      currentIndex < 0 ||
      currentIndex >= cardPhase.length ||
      previousIndex < 0 ||
      previousIndex >= cardPhase.length
    ) {
      return;
    }

    const updatedCardPhase = [...cardPhase];

    // For the first card, handle replacement differently
    if (currentIndex === 0) {
      // Replace the position of the first card with the second card
      updatedCardPhase[currentIndex] = {
        ...cardPhase[previousIndex],
        currentIndex: currentIndex,
      };
      updatedCardPhase[previousIndex] = {
        ...cardPhase[currentIndex],
        currentIndex: previousIndex,
      };
    } else {
      // Replace the position of the clicked phase card with the add phase card
      updatedCardPhase[currentIndex] = {
        ...cardPhase[previousIndex],
        currentIndex: currentIndex,
      };
      updatedCardPhase[previousIndex] = {
        ...cardPhase[currentIndex],
        currentIndex: previousIndex,
      };
    }

    // Update the state with the modified array
    setCardPhase(updatedCardPhase);
  };

  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleAddPhase = () => {
    setShowColorPicker(true); // Set the state to true to render ColorPickerElement
  };

  const handleOpen = () => {
    setShowColorPicker(true); // Set the state to true to open the ColorPickerElement
  };

  const handleClose = () => {
    setShowColorPicker(false); // Set the state to false to close the ColorPickerElement
  };

  return (
    <Grid
      container
      sx={firstGrid}
    >
      <Box
        sx={buttonBox}
      >
        <Button sx={{ ...actionButton, ...displayButton }} startIcon={<ModeEditOutlinedIcon />}
          onClick={handleAddPhase}>
          Edit
        </Button>
        <Button sx={{ ...actionButton, ...displayButton }} startIcon={<DeleteOutlinedIcon />}>
          Delete
        </Button>
        <Button sx={{ ...actionButton, background: "#FFAC00", }}
          onClick={handleAddPhase}>
          Add Phase
        </Button>
        <Button sx={{ ...actionButton, ...approvalButton, ...displayButton }}>
          Send Approval
        </Button>
      </Box>
      {cardPhase.map((phase, index) => (
        <AddPhaseCard
          key={phase?.id}
          cardPhase={phase}
          rows={rows}
          length={cardPhase.length}
          onGridToggle={() => handleGridToggle(index, phase?.previousIndex)}
        />
      ))}
      {showColorPicker && (
        <ColorPickerElement
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      )}

    </Grid>
  );
}



function createData(name, calories, fat, carbs, protein, calorie, fa, carb, protei) {
  return { name, calories, fat, carbs, protein, calorie, fa, carb, protei };
}
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 159, 6.0, 24, 4.0),
];



const firstGrid = {
  backgroundColor: "#FFF",
  display: "flex",
  flexDirection: "column",
  padding: {
    lg: "0rem 0rem",
    md: "0.1rem 2rem",
    sm: "1rem 2rem",
    xs: "0rem 0rem",
  },
  // border: "2px solid red",
}
const buttonBox = {
  display: "flex",
  justifyContent: { lg: "flex-end", md: "flex-end", sm: "center", xs: "center" },
  gap: "0.5rem",
  marginTop: "0.5rem",
  padding: {
    lg: "0rem 5rem",
    md: "0.1rem 2rem",
    sm: "1rem 2rem",
    xs: "0rem 0rem",
  },

}
const approvalButton = {
  background: "#FFAC00", padding: "1rem 0.5rem"
}

const displayButton = {
  display: { lg: "flex", md: "flex", sm: "none", xs: "none" }
}

export default AddPhaseView;
