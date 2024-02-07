import React from 'react'
import BottomCircle from "../../UI/bottomCircle";
import {
  Box,
} from "@mui/material";
function FooterCircles({ width1, background1, width3, background3, width2, background2 }) {
  return (
    <div>
      <Box
        sx={circlesBox}
      >
        <Box
          sx={{
            ...BottomCircle,
            width: width1 || BottomCircle.width,
            background: background1 || BottomCircle.background,
            marginTop: "1.5rem",
          }}
        />
        <Box
          sx={{
            ...BottomCircle,
            width: width2 || BottomCircle.width,
            background: background2 || BottomCircle.background,
            marginTop: "1.5rem",
          }}
        />
        <Box
          sx={{
            ...BottomCircle,
            width: width3 || BottomCircle.width,
            background: background3 || BottomCircle.background,
            marginTop: "1.5rem",
          }}
        />
      </Box>
    </div>
  )
}

const circlesBox = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "0.5rem",
  marginBottom: "2rem",
  gap: "1rem",
}

export default FooterCircles
