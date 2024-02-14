import React, { useState, useEffect } from "react";

import {
  Box,
  Grid,
  Button,
  useMediaQuery
} from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import builder1 from "../../Signup/Assets/pngs/builderProYellowLogo.png";

function Header({ gap, handlePreviousStep, }) {


  const isMobile = useMediaQuery('(max-width:600px)');
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
        {isMobile ?
          <>
            <Box sx={mobileButtonBox}>
              <Button
                sx={buttonStyle}
                startIcon={<ArrowBackIosIcon />}
                onClick={handleStep}
              >

                Back
              </Button>
            </Box>
            <Box sx={mobileImageBox}>
              <img src={builder1} width={"40%"} alt="" />
            </Box>
          </>
          :
          <Box sx={headerBox} gap={gap}>
            <img src={builder1} width={"11%"} alt="" />
            <Button
              sx={buttonStyle}
              startIcon={<ArrowBackIosIcon />}
              onClick={handleStep}
            >
              Back
            </Button>
          </Box>

        }

      </Grid>
    </div>
  )
}


const firstGrid = {
  display: "flex",
  flexDirection: "column",
  padding: { lg: "0rem 6rem", md: "0rem 5rem", sm: "0rem 4rem", xs: "0rem 1rem" },
  marginTop: "1rem"
}

const mobileButtonBox = {
  display: "flex", justifyContent: "flex-end", alignItems: "flex-end",
}
const mobileImageBox = {
  display: "flex", justifyContent: "center", alignItems: "center",
}
const headerBox = {
  display: "flex", justifyContent: "space-between"
}
const buttonStyle = {
  height: "50%", marginTop: "2rem", fontFamily: "Inter"
}


export default Header
