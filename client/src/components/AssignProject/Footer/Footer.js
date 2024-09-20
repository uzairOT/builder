import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useAssignProjectMutation } from "../../../redux/apis/usersApiSlice";

import {
  Box,
  Grid,
  Typography,
  Button,
  Stack,
  LinearProgress,
} from "@mui/material";
import {
  resetUserAndRoleEmail,
  selectProjectForm,
} from "../../../redux/slices/projectFormSlice";
import YellowBtn from "../../UI/button";
import FooterCircles from "../FooterCircles/FooterCircles";
import "../../../App.css";
import { addPhase } from "../../../redux/slices/Project/projectInitialProposal";
import { useSetProjectToIncompleteMutation } from "../../../redux/apis/Project/userProjectApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../../../redux/slices/authSlice";
import {
  setBackButtonProjectId,
  setIsSaveAs,
} from "../../../redux/slices/Project/handlingProjectFlowSlice";

function Footer({ onNextStep, projectId }) {
  const phases = useSelector((state) => state.projectInitialProposal.phases);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSaveAs = () => {
    if (phases[0]?.length < 1) {
      toast.error("Please add at least one phase");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      dispatch(setIsSaveAs(true));
      dispatch(setBackButtonProjectId(null));
      dispatch(resetUserAndRoleEmail());
      onNextStep();
      setLoading(false);
    }, 300);
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
    if (phases[0]?.length < 1) {
      toast.error("Please add at least one phase");
      return;
    }
    try {
      const res = await setProjectToIncomplete({
        userId: userId,
        projectId: projectId,
        update: true,
      });
      dispatch(
        setCredentials({ ...userdata, incompleteProject: res?.data.data })
      );
      toast.success("Project added successfully!");
      dispatch(setIsSaveAs(false));
      dispatch(setBackButtonProjectId(null));
      dispatch(resetUserAndRoleEmail());
      setTimeout(()=>{
        window.location.href ="/dashboard";
      }, 100)
      // dispatch(addPhase([]));
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
      // dispatch(
      //   setCredentials({ ...userdata, incompleteProject: res?.data.data })
      // );
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
        {loading && <LinearProgress />}
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
        <Stack mt={1} justifyContent={"center"} alignItems={"center"}>
          <Typography sx={{ ...redText }}>
            Save to return back to edit your project.
          </Typography>
          <Typography sx={{ ...redText }}>
            Save as to start a duplicate project with the same line items and
            phases.
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
  flexDirection: { xl: "row", lg: "row", md: "row", sm: "row", xs: "column" },
  justifyContent: "space-between",
  gap: "2.3rem",
};
const redText = {
  color: "#BE1D1D",
  marginTop: "0rem",
  fontFamily: "var(--main-font-family)",
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
