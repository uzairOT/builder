import React, { useState, useEffect } from "react";

import { Box, Grid, Button, useMediaQuery } from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import builder1 from "../../Signup/Assets/pngs/builderProYellowLogo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetUserAndRoleEmail,
  setProjectIdOnBackBtn,
} from "../../../redux/slices/projectFormSlice";
import { toast } from "react-toastify";
import {
  setBackButtonProjectId,
  setIsSaveAs,
} from "../../../redux/slices/Project/handlingProjectFlowSlice";
import { addPhase } from "../../../redux/slices/Project/projectInitialProposal";
import { setCredentials } from "../../../redux/slices/authSlice";

function Header({ step, gap, handlePreviousStep, step2, step3 }) {
  //console.log("Header step: ", step);
  const phases = useSelector((state) => state.projectInitialProposal.phases);
  const userdata = JSON.parse(localStorage.getItem("userInfo"));
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTab = useMediaQuery("(max-width:900px)");
  const isMd = useMediaQuery("(max-width:1200px)");
  const imgWidth = isMd ? "18%" : "12%";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buttonStyle = {
    height: "50%",
    marginTop: { lg: "2rem", sm: "2rem", xs: "0rem" },
    fontFamily: "var(--main-font-family)",
    color: step === 1 ? "gray" : "",
  };

  const handleStep = (e) => {
    // if (step === 1) {
    //   return;
    // } else {
    //   handlePreviousStep();
    // }

    e.preventDefault();
    handlePreviousStep();
  };
  const handleLogoClcik = () => {
    if (phases[0]?.length < 1 || phases?.length < 1) {
      toast.error("Please add at least one phase against a project");
      return;
    }
    dispatch(addPhase([]));
    dispatch(setIsSaveAs(false));
    dispatch(setBackButtonProjectId(null));
    // dispatch(resetUserAndRoleEmail());
    dispatch(
      setCredentials({ ...userdata, incompleteProject: null })
    );
    dispatch(resetUserAndRoleEmail());
    navigate("/dashboard");
  };
  return (
    <div>
      <Grid item lg={12} sx={firstGrid}>
        {isMobile ? (
          <>
            <Box display={"flex"} flexDirection={"row"}>
              <Box sx={mobileImageBox} onClick={handleLogoClcik}>
                <img src={builder1} width={"45%"} alt="" />
              </Box>
              {(step2 || step3) && (
                <Box sx={mobileButtonBox}>
                  <Button
                    sx={buttonStyle}
                    startIcon={<ArrowBackIosIcon />}
                    onClick={(e) => handleStep(e)}
                  >
                    Back
                  </Button>
                </Box>
              )}
            </Box>
          </>
        ) : (
          <Box sx={{ ...headerBox, cursor: "pointer" }} gap={gap}>
            <img
              src={builder1}
              width={imgWidth}
              alt=""
              onClick={handleLogoClcik}
            />
            {(step2 || step3) && (
              <Button
                sx={buttonStyle}
                startIcon={<ArrowBackIosIcon />}
                onClick={(e) => handleStep(e)}
              >
                Back
              </Button>
            )}
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
