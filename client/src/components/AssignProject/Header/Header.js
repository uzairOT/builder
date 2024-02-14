import React, { useState, useEffect } from "react";

import {
  Box,
  Grid,
  Button,
} from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import builder1 from "../../Signup/Assets/pngs/builderProYellowLogo.png";

function Header({ gap, handlePreviousStep, }) {

  const handleStep = () => {
    handlePreviousStep();
  };

  return (
    <div>
      <Grid
        item
        lg={12}
        sx={firstGrid}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }} gap={gap}>
          <img src={builder1} width={"11%"} alt="" />
          <Button
            sx={{ height: "50%", marginTop: "2rem" }}
            startIcon={<ArrowBackIosIcon />}
            onClick={handleStep}
          >
            Back
          </Button>
        </Box>
      </Grid>
    </div>
  )
}


const firstGrid = {
  display: "flex",
  flexDirection: "column",
  padding: "0rem 6rem",
  marginTop: "1rem"
}
export default Header
