import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useAssignProjectMutation } from "../../../redux/slices/usersApiSlice";

import { Box, Grid, Typography, Button } from "@mui/material";
import { selectProjectForm } from "../../../redux/slices/projectFormSlice";
import YellowBtn from "../../UI/button";
import GTWalsheimTrial from "../../../assets/fonts/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf";
import FooterCircles from "../FooterCircles/FooterCircles";
import SaveAsProject from "../SaveAsProject/SaveAsProject";

function Footer({ onNextStep }) {
  const navigate = useNavigate()

  
  const handleSaveAs = () => {

    onNextStep();
  };

  const [assignProject, { isLoading }] = useAssignProjectMutation();

  const Data = useSelector(selectProjectForm);
  const handleDoneClick = async () => {
   const userdata =  JSON.parse(localStorage.getItem('userInfo'))
   const userId = userdata.id
    const FormData = { ...Data,userId  };
    console.log(userdata.id);

    const res = await assignProject(FormData).unwrap();
    console.log(res);
  };

  return (
    <div>
      <Grid
        item
        lg={12}
        sx={firstGrid}
      >
        <Box
          sx={buttonBox}
        >
          <Button
            onClick={handleDoneClick}
            sx={{ ...YellowBtn, padding: "1rem 3.5rem" }}
          >
            Done
          </Button>
          <Button
            variant="outlined"
            sx={{
              ...YellowBtn,
              ...saveButton
            }}
            onClick={handleSaveAs}
          >
            Save as
          </Button>
        </Box>
        <Typography sx={{ ...redText }}>
          Save as to start the Duplicate the Project with same line Item and
          Phases.
        </Typography>
        <FooterCircles width3="4rem" background3="#4C8AB1" />
        <FooterCircles width3="4rem" background3="#4C8AB1" />
      </Grid>
    </div>
  );
}







const firstGrid = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "4rem",
}
const buttonBox = {
  display: "flex",
  justifyContent: "space-between",
  gap: "2.3rem",
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
const saveButton = {
  border: "1px solid #FFAC00",
  background: "#FFF",
  color: "#FFAC00",
  "&:hover": {
    background: "#FFF",
  },
}
export default Footer;
