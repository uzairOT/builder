import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProjectForm,
  setBuildType,
} from "../../../redux/slices/projectFormSlice";

function StepBoxes() {
  const [selectedBox, setSelectedBox] = useState(0);
  const dispatch = useDispatch();

  const handleBoxClick = (index) => {
    setSelectedBox(index);
    const value = boxes[index].name;
    dispatch(setBuildType(value));
  };
  const boxes = [
    { label: "Remodel", background: "#4C8AB1", name: "remodel" },
    { label: "New build", background: "#4C8AB1", name: "newbuild" },
    { label: "Commercial", background: "#4C8AB1", name: "commercial" },
  ];

  return (
    <Box
      sx={firstBox}
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
          <Typography sx={boxText}>{box.label}</Typography>
        </Box>
      ))}
    </Box>
  );
}
const firstBox = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "1rem",
  gap: "1.5rem"
}
const boxStyles = {
  width: "9.1875rem",
  height: "7.7rem",
  borderRadius: "1rem",
  border: "1px solid #F9F9F9",
  background: "#F9F9F9",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  cursor: "pointer",
};

const boxText = {
  fontFamily: "Inter",
  fontWeight: 500,
  fontSize: "1.1rem",
};

export default StepBoxes;
