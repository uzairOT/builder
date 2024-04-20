import React, { useState } from "react";
import {
  useMediaQuery,
  Button,
  Box,
  Typography,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";
import "../StepFormField/StepFormField.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setProjectName,
  setLocation,
  selectProjectForm,
} from "../../../redux/slices/projectFormSlice";
import "../../../App.css";
import ColorPicker from "../../dialogues/ColorPickerProject/ColorPicker";

function ProjectFormFields() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTab = useMediaQuery("(max-width:900px)");
  const labelResponsiveFont = { fontSize: isMobile ? "0.8rem" : "1rem" };
  const formWidth = { width: isMobile ? "85%" : isTab ? "65%" : "45%" };
  const labelDisplay = { display: isMobile ? "none" : "block" };
  const borderRadiusResponsive = {
    borderRadius: isMobile ? "0.5rem" : "0.75rem",
  };
const [project, setProject]=useState();
  const { projectName, location, projectColor } =
    useSelector(selectProjectForm);
  const dispatch = useDispatch();

  // Event handler to update the projectName state
  const handleProjectNameChange = (event) => {
    setProject(event.target.value)
    dispatch(setProjectName(event.target.value));
  };

  // Event handler to update the location state
  const handleLocationChange = (event) => {
    dispatch(setLocation(event.target.value));
  };

  return (
    <div>
      <Box sx={formBox}>
        <form style={{ ...formStyle, ...formWidth }}>
          <Box sx={{ marginTop: "0.5rem" }}>
            <label
              style={{ ...labelStyle, ...labelDisplay, ...labelResponsiveFont }}
              htmlFor="email"
            >
              Project Name
            </label>
            <input
              className="placeholder"
              type="email"
              id="email"
              style={{
                ...inputStyle,
                ...borderRadiusResponsive,
                ...labelResponsiveFont,
              }}
              placeholder="e.g. Project name"
              value={project}
              onChange={handleProjectNameChange}
              required
            />
          </Box>
          <Box sx={{ marginTop: "0.2rem" }}>
            <label
              style={{ ...labelStyle, ...labelDisplay, ...labelResponsiveFont }}
              htmlFor="email"
            >
              Location
            </label>
            <TextField
              className="placeholder"
              sx={{
                ...inputStyle,
                ...borderRadiusResponsive,
                borderButtom: "none",
              }}
              id="standard-select-currency"
              type="text"
              variant="standard"
              value={location}
              onChange={handleLocationChange}
              placeholder="Enter your location..."
            >
              {/* <MenuItem value={""}  disabled sx={{ ...menuItem, color: 'gray', }}>
                                Select Location
                            </MenuItem>
                            <MenuItem sx={menuItem} value={"Islamabad"}>Islamabad</MenuItem>
                            <MenuItem sx={menuItem} value={"Lahore"}>Lahore</MenuItem>
                            <MenuItem sx={menuItem} value={"Karachi"}>Karachi</MenuItem> */}
            </TextField>
          </Box>
          <Stack direction={"column"}>
            <Box sx={{ marginTop: "0.2rem" }}>
              <label
                style={{
                  ...labelStyle,
                  ...labelDisplay,
                  ...labelResponsiveFont,
                }}
                htmlFor="email"
              >
                Select Color
              </label>
              <Stack direction={"row"} alignItems={"center"} gap={2} p={1}>
                <Box
                  width={"40px"}
                  height={"40px"}
                  bgcolor={projectColor}
                  borderRadius={"999999px"}
                ></Box>

                <ColorPicker />
              </Stack>
            </Box>
          </Stack>
        </form>
      </Box>
    </div>
  );
}

const labelStyle = {
  marginBottom: "5px",
  color: "#202227",
  fontFamily: "Inter",
  fontSize: "1rem",
  fontWeight: 500,
};

const inputStyle = {
  width: "100%", // Set width to 100% for responsiveness
  height: "2rem",
  marginBottom: "0.5rem",
  alignSelf: "center",
  padding: "0.5rem 0.5rem",
  fontSize: "14px",
  border: "1px solid #ccc",
  borderRadius: "12px",
  color: "#202227",
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  paddingLeft: "-1.5rem",
};
const formBox = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "0rem",
  gap: "1.5rem",
};
const formStyle = {
  marginTop: "0.1rem",
  marginLeft: "-1.2rem",
};
const menuItem = {
  fontSize: { lg: "1rem", md: "0.9rem", sm: "0.8rem", xs: "0.7rem" },
};
export default ProjectFormFields;
