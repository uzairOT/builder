import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Button,
} from "@mui/material";

import YellowBtn from "../../UI/button";
import BottomCircle from "../../UI/bottomCircle";
import GTWalsheimTrial from "../../../assets/fonts/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf";

function Footer() {
  return (
    <div>
         <Grid
        item
        lg={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "4rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "2.3rem",
          }}
        >
          <Button sx={{ ...YellowBtn, padding: "1rem 3.5rem" }}>Done</Button>
          <Button
            variant="outlined"
            sx={{
              ...YellowBtn,
              border: "1px solid #FFAC00",
              background: "#FFF",
              color: "#FFAC00",
              "&:hover": {
                background: "#FFF",
              },
            }}
          >
            Save as
          </Button>
        </Box>
        <Typography sx={{ ...redText }}>
          Save as to start the Duplicate the Project with same line Item and
          Phases.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
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
      </Grid>
    </div>
  )
}
const redText = {
  color: "#BE1D1D",
  marginTop: "1.25rem",
  fontFamily: GTWalsheimTrial,
  fontSize: "0.875rem",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "150%", // 1.3125rem
  letterSpacing: "-0.00875rem",
};
export default Footer
