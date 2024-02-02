import React from 'react'
import BottomCircle from "../../UI/bottomCircle";
import {
  Box,
} from "@mui/material";
function FooterCircles() {
  return (
    <div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "4rem",
            gap: "1rem",
          }}
        >
          <Box
            sx={{
              ...BottomCircle,

              marginTop: "1.5rem",
            }}
          />
          <Box
            sx={{
              ...BottomCircle,
              marginTop: "1.5rem",
            }}
          />
          <Box
            sx={{
              ...BottomCircle,
              width: "4rem",
              backgroundColor: "#4C8AB1",
              marginTop: "1.5rem",
            }}
          />
        </Box>
    </div>
  )
}

export default FooterCircles
