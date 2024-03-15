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
import { useDeleteProjectPhaseMutation } from '../../../redux/apis/Project/projectApiSlice';
import UpdatePhaseDialogue from "../../dialogues/UpdatePhaseDialogue/UpdatePhaseDialogue";
import AddPhaseDialogue from "../../dialogues/AddPhaseDialogue/AddPhaseDialogue";

const initialCardPhase = [
  {
    id: 1,
    currentIndex: 0,
    previousIndex: -1,
    phaseName: "Phase 1",
    color: "#F9F9F9"
  },
  {
    id: 2,
    currentIndex: 1,
    previousIndex: 0,
    phaseName: "Phase 2",
    color: "yellow"
  },
  {
    id: 3,
    currentIndex: 1,
    previousIndex: 0,
    phaseName: "Phase 3",
    color: "blue"
  },
  {
    id: 4,
    currentIndex: 1,
    previousIndex: 0,
    phaseName: "Phase 4",
    color: "red"
  },
  {
    id: 5,
    currentIndex: 1,
    previousIndex: 0,
    phaseName: "Phase 5",
    color: "green"
  },

];

function AddPhaseView() {
  const [cardPhase, setCardPhase] = useState(initialCardPhase);
  const [selectedPhaseId, setSelectedPhaseId] = useState(null);
  const [selectedPhaseData, setSelectedPhaseData] = useState(null);
  const [deleteProjectPhase] = useDeleteProjectPhaseMutation();


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

  const [showUpdatePhaseDialogue, setShowUpdatePhaseDialogue] = useState(false);
  const [showAddPhaseDialogue, setShowAddPhaseDialogue] = useState(false);


  const handleEditPhase = () => {
    setShowUpdatePhaseDialogue(true);
  };

  const handleUpdateOpen = () => {
    setShowUpdatePhaseDialogue(true);
  };

  const handleUpdateClose = () => {
    setShowUpdatePhaseDialogue(false);
  };

  const handleAddPhase = () => {
    setShowAddPhaseDialogue(true);
  };
  const handleAddOpen = () => {
    setShowAddPhaseDialogue(true);
  };

  const handleAddClose = () => {
    setShowAddPhaseDialogue(false);
  };


  const handleSelectCard = (id) => {
    if (selectedPhaseId === id) {
      setSelectedPhaseId(null);
    } else {
      setSelectedPhaseId(id);
      const selectedPhase = cardPhase.find(phase => phase.id === id);
      setSelectedPhaseData(selectedPhase);
    }
  };

  const handleDeletePhase = () => {
    if (selectedPhaseId) {
      deleteProjectPhase(selectedPhaseId);
      const updatedCardPhase = cardPhase.filter(card => card.id !== selectedPhaseId);
      setCardPhase(updatedCardPhase);
      console.log(updatedCardPhase)
      setSelectedPhaseId(null);
      setSelectedPhaseData(null);
    }
  };


  const handleAddSubmit = (phaseName, color) => {
    const newPhase = {
      id: cardPhase.length + 1,
      currentIndex: cardPhase.length,
      previousIndex: cardPhase.length - 1,
      phaseName: phaseName,
      color: color,
    };
    const updatedCardPhase = [...cardPhase, newPhase];
    setCardPhase(updatedCardPhase);
    setSelectedPhaseData(newPhase);
    setShowAddPhaseDialogue(false);
  };

  const handleUpdateSubmit = (phaseName, color, selectedPhaseData) => {
    const updatedPhaseData = {
      ...selectedPhaseData,
      phaseName: phaseName,
      color: color,
    };

    const updatedCardPhase = cardPhase.map(phase => {
      if (phase.id === selectedPhaseData.id) {
        return updatedPhaseData;
      }
      return phase;
    });

    setCardPhase(updatedCardPhase);
    setSelectedPhaseData(updatedPhaseData);
    setShowUpdatePhaseDialogue(false);
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
          onClick={handleEditPhase}>
          Edit
        </Button>
        <Button sx={{ ...actionButton, ...displayButton }} startIcon={<DeleteOutlinedIcon />} onClick={handleDeletePhase}>
          Delete
        </Button>
        <Button sx={{ ...actionButton, background: "#FFAC00", }}
          onClick={handleAddPhase}
        >
          Add Phase
        </Button>
        <Button sx={{ ...actionButton, ...approvalButton, ...displayButton }}>
          Send Approval
        </Button>
      </Box>

      {cardPhase.map((phase, index) => (
        <div key={phase.id}
          style={{
            ...slectedCardStyle,
            backgroundColor: selectedPhaseId === phase.id ? "#000" : "#FFF"
          }}>
          <AddPhaseCard
            key={phase?.id}
            cardPhase={phase}
            length={cardPhase.length}
            onGridToggle={() => handleGridToggle(index, phase?.previousIndex)}
            handleSelectCard={handleSelectCard}
          />

        </div>
      ))}
      {showUpdatePhaseDialogue && (
        <UpdatePhaseDialogue
          handleUpdateOpen={handleUpdateOpen}
          handleUpdateClose={handleUpdateClose}
          phaseData={selectedPhaseData}
          setPhaseData={setSelectedPhaseData}
          // onSubmit={handleColorPickerSubmit}
          onSubmit={(phaseName, color) => handleUpdateSubmit(phaseName, color, selectedPhaseData)}
        />
      )}
      {showAddPhaseDialogue && (
        <AddPhaseDialogue
          handleAddOpen={handleAddOpen}
          handleAddClose={handleAddClose}
          setPhaseData={setSelectedPhaseData}
          onSubmit={handleAddSubmit}
        />
      )}

    </Grid>
  );
}



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
  overflowX: "auto",
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
const slectedCardStyle = {
  padding: "0.1rem 0rem 1rem 0rem",
  margin: "0.5rem 0rem",
  cursor: "pointer",
}

export default AddPhaseView;
