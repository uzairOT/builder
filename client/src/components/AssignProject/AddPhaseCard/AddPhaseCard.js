import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
   FormControl,
  FormLabel,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";

import {ReactComponent as ArrowDown} from "../Assets/svgs/ArrowDown.svg";
import {ReactComponent as Arrowup} from "../Assets/svgs/Arrowup.svg";
import {ReactComponent as EditIcon} from "../Assets/svgs/EditIcon.svg";
import {ReactComponent as DeleteIcon} from "../Assets/svgs/DeleteIcon.svg";
import GTWalsheimTrial from "../../../assets/fonts/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf";
import actionButton from "../../UI/actionButton";
import "./AddPhaseCard.css"

// function createData(name, calories, fat, carbs, protein, calorie, fa, carb, protei) {
//   return { name, calories, fat, carbs, protein, calorie, fa, carb, protei };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 159, 6.0, 24, 4.0),
//   createData('Eclair', 262, 16.0, 24, 6.0, 159, 6.0, 24, 4.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 159, 6.0, 24, 4.0),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 159, 6.0, 24, 4.0),
// ];



function AddPhaseCard({cardPhase,rows,lenght}) {



  return (
    <div>
            <Grid
        item
        lg={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "2rem",         
          backgroundColor:`${cardPhase.color}`,
        borderRadius: '0.5rem',

        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "1rem 6rem",
          }}
        >
          <Box
            sx={{           
            }}
          >
            <Typography
      sx={blackHeading}
    >
       Phase 1
    </Typography>
          </Box>
          <Box
           
          >
            <Typography
       sx={blackHeading}
    >
         Total Price: 
    </Typography>   
          </Box>
          <Box
            
          >
          <Typography
       sx={blackHeading}
    >
       Time: &nbsp; Days:
    </Typography>   
    
    
          </Box>
              <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap:"1rem"
              
            }}
          >
        <>
  {cardPhase.currentIndex === 0 ? (
    <ArrowDown style={{ marginRight: "1rem" }} />
  )  : cardPhase.currentIndex === lenght - 1 ? (
    <Arrowup style={{ marginRight: "1rem" }} />
  ) : (
    <>
    <ArrowDown style={{ marginRight: "1rem" }} />
      <Arrowup style={{ marginRight: "1rem" }} />
      </>
  )}
</>
           <EditIcon />
           <DeleteIcon />
           <Button sx={{...actionButton, background:"#4C8AB1", marginTop:"0.5rem", }}>Add Line Item</Button>

          </Box>
        </Box>
        <Grid
        item
        sx={{
          background:"#FBFBFB",
          borderRadius:"1rem",
      
          margin:"1rem 1rem",
          padding:"2rem 2rem"
        }}>
<Typography sx={listOfLineText}>
List of Line Items
</Typography>
     <hr style={ hrLine}
         />
<Box sx={{marginLeft:"2rem"}}>
      <Table  >
         
        <TableHead  >
          <TableRow >
            <TableCell sx={{...tableHeadings, width: '15%', }}>Line Item</TableCell>
            
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
          
            <TableRow style={hrLine}>
           
        </TableRow>

        </TableHead>
         
        <TableBody >
          
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">{row.name}</TableCell>
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
      </Grid>
    </div>
  )
}




const blackHeading = {
   fontFamily: GTWalsheimTrial,
        color:"#4B4B4B",
        fontSize: '20px',
        fontWeight: 400,
        lineHeight: '30px',
        letterSpacing: '0em',
        textAlign: 'left',
        marginTop:"1rem"
}
const listOfLineText = {
  fontFamily: GTWalsheimTrial,
  fontWeight: 400,
  fontSize: '1.25rem',
  lineHeight: '1.9rem',
  paddingLeft :"0.5rem",
  color: '#4C8AB1',
}

const tableHeadings = {
   fontFamily: 'Poppins, sans-serif',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '21px',
    letterSpacing: '-1%',
    color: '#8C8C8C',
}
const hrLine = {
                width: '100%',
                border: 0,
                 height: '1.3px',
                backgroundColor: '#DCDCDC',
                opacity:"50%"
}
export default AddPhaseCard
