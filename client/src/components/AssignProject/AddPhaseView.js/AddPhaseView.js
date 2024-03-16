import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import AddPhaseCard from "../AddPhaseCard/AddPhaseCard";
import actionButton from "../../UI/actionButton";
import ColorPickerElement from "../../dialogues/ColorPickerElement/ColorPickerElement"
import { setOpen } from '../../../redux/slices/addPhaseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectAddPhase } from '../../../redux/slices/addPhaseSlice';
import { useGetProjectInitialProposalQuery } from "../../../redux/apis/Project/projectApiSlice";

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

function AddPhaseView({adminProjectView, view}) {
  const {data} = useGetProjectInitialProposalQuery({projectId:1})
  const [cardPhase, setCardPhase] = useState(initialCardPhase);
  const { open } = useSelector(selectAddPhase);
  const dispatch = useDispatch();



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
    dispatch(setOpen(true))
  };

  const handleOpen = () => {
   
    dispatch(setOpen(true))
  };

  const handleClose = () => {
    setShowColorPicker(false);
  };

  return (
    <Grid
      container
      sx={firstGrid}
    >
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Stack>
            {adminProjectView && <Typography pl={3} pt={1} color={'#4C8AB1'} fontFamily={'Poppins, san serif'} fontSize={'22px'} fontWeight={'600'}>
                    {view}
                </Typography>} 
        </Stack>
       {view === 'Work Order' ? <></> : <Stack direction={'row'} sx={buttonBox}>
        <Button sx={{ ...actionButton }} startIcon={<ModeEditOutlinedIcon />}
          onClick={handleAddPhase}>
          Edit
        </Button>
        <Button sx={{ ...actionButton }} startIcon={<DeleteOutlinedIcon />}>
          Delete
        </Button>
        <Button sx={{ ...actionButton, background: "#FFAC00", }}
          onClick={handleAddPhase}>
          Add Phase
        </Button>
       { adminProjectView ? <></> : <Button sx={{ ...actionButton, ...approvalButton }}>
          Send Approval
        </Button>}
        </Stack>}
      </Stack>




      {cardPhase.map((phase, index) => (
        <AddPhaseCard
          key={phase?.id}
          cardPhase={phase}
          rows={rows}
          length={cardPhase.length}
          onGridToggle={() => handleGridToggle(index, phase?.previousIndex)}
          adminProjectView={adminProjectView}
        />
      ))}
      {open && (
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
    md: "4.5rem 2rem",
    sm: "1rem 2rem",
    xs: "0rem 0rem",
  },
  // border: "2px solid red",
}
const buttonBox = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "0.5rem",
  marginTop: "0.5rem",
  padding: {
    lg: "0rem 5rem",
    md: "4.5rem 2rem",
    sm: "1rem 2rem",
    xs: "0rem 0rem",
  },

}
const approvalButton = {
  background: "#FFAC00", padding: "1rem 0.5rem"
}

export default AddPhaseView;