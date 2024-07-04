import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useAssignProjectMutation } from "../../../redux/apis/usersApiSlice";

import { Box, Grid, Typography, Button, Stack } from "@mui/material";
import { selectProjectForm } from "../../../redux/slices/projectFormSlice";
import YellowBtn from "../../UI/button";
import FooterCircles from "../FooterCircles/FooterCircles";
import "../../../App.css";
import { addPhase } from "../../../redux/slices/Project/projectInitialProposal";
import { useSetProjectToIncompleteMutation } from "../../../redux/apis/Project/userProjectApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../../../redux/slices/authSlice";

function Footer({ onNextStep, projectId }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSaveAs = () => {
    onNextStep();
  };

  const [assignProject, { isLoading }] = useAssignProjectMutation();
  const [setProjectToIncomplete] = useSetProjectToIncompleteMutation();
  const Data = useSelector(selectProjectForm);
  const userdata = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userdata.user.id;
  const handleDoneClick = async () => {
    const FormData = { ...Data, userId };
    //console.log(userdata.id);

    const res = await assignProject(FormData).unwrap();
    //console.log(res);
  };
  const handleDone = async () => {
    try {
      const res = await setProjectToIncomplete({
        userId: userId,
        projectId: projectId,
        update: true,
      });
      dispatch(setCredentials({...userdata, incompleteProject: res?.data.data}));
      dispatch(addPhase([]));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    try {
      const res = await setProjectToIncomplete({
        userId: userId,
        projectId: projectId,
      });
      dispatch(setCredentials({...userdata, incompleteProject: res?.data.data}));
      toast.info(
        "Your project has been saved. You will return back here after you log in again."
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Grid item lg={12} sx={firstGrid}>
        <Box sx={buttonBox}>
          <Button
            sx={{ ...YellowBtn, padding: "1rem 3.5rem" }}
            onClick={handleDone}
          >
            Done
          </Button>

          <Button
            variant="outlined"
            sx={{
              ...YellowBtn,
              ...saveButton,
            }}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            sx={{
              ...YellowBtn,
              ...saveButton,
            }}
            onClick={handleSaveAs}
          >
            Save as
          </Button>
        </Box>
        <Stack mt={1} justifyContent={'center'} alignItems={'center'}>

        <Typography sx={{ ...redText }}>
          Save to return back to editing your Project.
        </Typography>
        <Typography sx={{ ...redText }}>
          Save as to start the Duplicate the Project with same line Item and
          Phases.
        </Typography>
        </Stack>
        <div>
          <FooterCircles width3="4rem" background3="#4C8AB1" />
        </div>
      </Grid>
    </div>
  );
}

const firstGrid = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "1rem",
};
const buttonBox = {
  display: "flex",
  justifyContent: "space-between",
  gap: "2.3rem",
};
const redText = {
  color: "#BE1D1D",
  marginTop: "0rem",
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  fontSize: "0.875rem",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "150%", // 1.3125rem
  letterSpacing: "-0.00875rem",
  display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
};
const saveButton = {
  border: "1px solid #FFAC00",
  background: "#FFF",
  color: "#FFAC00",
  "&:hover": {
    background: "#FFF",
  },
};
export default Footer;
