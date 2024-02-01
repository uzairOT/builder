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


function AddPhaseView() {





  return (
    <Grid
      container
      sx={{
        padding: {
          lg: "2rem 0rem",
          md: "4.5rem 2rem",
          sm: "1rem 2rem",
          xs: "0rem 0rem",
        },
        backgroundColor: "#FFF",
        
        display: "flex",
        flexDirection: "column",
        // border: "2px solid red",
      }}
    >
            <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "0.5rem",
            marginTop: "1.5rem",
             padding: {
          lg: "0rem 5rem",
          md: "4.5rem 2rem",
          sm: "1rem 2rem",
          xs: "0rem 0rem",
        },
          }}
        >
          <Button sx={{ ...actionButton }} startIcon={<ModeEditOutlinedIcon />}>
            Edit
          </Button>
          <Button sx={{ ...actionButton }} startIcon={<DeleteOutlinedIcon />}>
            Delete
          </Button>
          <Button sx={{ ...actionButton, background: "#FFAC00", left: "2rem" }}>
            Add Phase
          </Button>
        </Box>


    
{cardPhase.map((phase) => (


        <AddPhaseCard key={phase.id} cardPhase={phase} rows={rows} lenght={cardPhase.length} />
      ))}
     

    </Grid>
  );
}

const dummyData = [
  {
    id: 1,
    lineItem: 'Item 1',
    description: 'Description 1',
    unit: 'Unit 1',
    margin: 'Margin 1',
    quantity: 10,
    unitPrice: 5.99,
    total: 59.9,
    start: 'Start 1',
    end: 'End 1',
    notes: 'Notes 1',
  },
  // Add more dummy data as needed
];

function createData(name, calories, fat, carbs, protein, calorie, fa, carb, protei) {
  return { name, calories, fat, carbs, protein, calorie, fa, carb, protei };
}
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 159, 6.0, 24, 4.0),
  createData('Eclair', 262, 16.0, 24, 6.0, 159, 6.0, 24, 4.0),
  createData('Cupcake', 305, 3.7, 67, 4.3, 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 159, 6.0, 24, 4.0),
];



const cardPhase = [
  {
    id: 1,
    currentIndex: 0,
    priousIndex:-1,
    color:"#C0E0C2"
  
  },
    {
    id: 2,
    currentIndex: 1,
    priousIndex:0,
     color:"#FFE3E3"
  
  },
    {
    id: 3,
    currentIndex: 2,
    priousIndex:1,
     color:"#C0E0C2"
  
  },
   {
    id: 4,
    currentIndex: 3,
    priousIndex:2,
     color:"#C0E0C2"
  
  },
  

];

export default AddPhaseView;
