import React, { useState, useEffect } from "react";

import { Box, Grid, Button, useMediaQuery } from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import builder1 from "../../Signup/Assets/pngs/builderProYellowLogo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetUserAndRoleEmail } from "../../../redux/slices/projectFormSlice";

function Header({ step, gap, handlePreviousStep }) {
  //console.log("Header step: ", step);
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTab = useMediaQuery("(max-width:900px)");
  const isMd = useMediaQuery("(max-width:1200px)");
  const imgWidth = isMd ? "18%" : "12%";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buttonStyle = {
    height: "50%",
    marginTop: { lg: "2rem", sm: "2rem", xs: "0rem" },
    fontFamily: "Inter",
    color: step === 1 ? "gray" : "",
  };

  const handleStep = () => {
    if (step === 1) {
      return;
    } else {
      handlePreviousStep();
    }
  };
  const handleLogoClcik = () => {
    dispatch(resetUserAndRoleEmail());
    navigate("/");
  };
  return (
    <div>
      <Grid item lg={12} sx={firstGrid}>
        {isMobile ? (
          <>
            <Box
              display={"flex"}
              flexDirection={"row"}
              onClick={handleLogoClcik}
            >
              <Box sx={mobileImageBox}>
                <img src={builder1} width={"45%"} alt="" />
              </Box>
              {/* <Box sx={mobileButtonBox}>
                <Button
                  sx={buttonStyle}
                  startIcon={<ArrowBackIosIcon />}
                  onClick={handleStep}
                 
                >
                  Back
                </Button>
              </Box> */}
            </Box>
          </>
        ) : (
          <Box
            sx={{ ...headerBox, cursor: "pointer" }}
            gap={gap}
            onClick={handleLogoClcik}
          >
            <img src={builder1} width={imgWidth} alt="" />
            {/* <Button
              sx={buttonStyle}
              startIcon={<ArrowBackIosIcon />}
              onClick={handleStep}
              disabled
            >
              Back
            </Button> */}
          </Box>
        )}
      </Grid>
    </div>
  );
}

const firstGrid = {
  display: "flex",
  flexDirection: "column",
  padding: {
    lg: "0rem 6rem",
    md: "0rem 5rem",
    sm: "0rem 4rem",
    xs: "0rem 1rem",
  },
  marginTop: "1rem",
};

const mobileButtonBox = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "flex-end",
  marginBottom: "1rem",
};
const mobileImageBox = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const headerBox = {
  display: "flex",
  justifyContent: "space-between",
};

export default Header;
