import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';

function StepBoxes() {
  const [selectedBox, setSelectedBox] = useState(0); // Initialize with 0 (index of "Remodel")

  const handleBoxClick = (index) => {
    setSelectedBox(index);
  };

  const boxes = [
    { label: 'Remodel', background: '#4C8AB1' },
    { label: 'New build', background: '#4C8AB1' },
    { label: 'Commercial', background: '#4C8AB1' }
  ];

  return (
    <Box
      sx={containerBox}
    >
      {boxes.map((box, index) => (
        <Box
          key={index}
          sx={{
            ...boxStyles,
            background: selectedBox === index ? box.background : "#F9F9F9",
            color: selectedBox === index ? "#FFF" : "#000000",
          }}
          onClick={() => handleBoxClick(index)}
        >
          <Typography sx={boxText}>
            {box.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
const containerBox = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "1rem",
  gap: { lg: "1.5rem", md: "1.5rem", sm: "1.2rem", xs: "0.5rem" },
}
const boxStyles = {
  width: { lg: "9.1875rem", md: "9rem", sm: "8rem", xs: "6rem" },
  height: { lg: "7.7rem", md: "7rem", sm: "6rem", xs: "4rem" },
  borderRadius: { lg: "1rem", md: "1rem", sm: "0.9rem", xs: "0.4rem" },
  border: "1px solid #F9F9F9",
  background: "#F9F9F9",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  cursor: "pointer"
};

const boxText = {
  fontFamily: 'Inter',
  fontWeight: 500,
  fontSize: { lg: '1.1rem', md: "1rem", sm: "1rem", xs: "0.8rem" }
};

export default StepBoxes;
