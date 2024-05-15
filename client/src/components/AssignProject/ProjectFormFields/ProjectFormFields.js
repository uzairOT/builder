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
  setProjectColor,
  setStartTime,
  setEndTime,
} from "../../../redux/slices/projectFormSlice";
import "../../../App.css";
import ColorPicker from "../../dialogues/ColorPickerProject/ColorPicker";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs'

const colors = [
  "#93D0EC",
  "#9BDFEB",
  "#9FF2CA",
  "#E5F29F",
  "#F3DE9E",
  "#F5C79F",
  "#F9B4A1",
  "#FBA8A4",
  "#F9A0CB",
  "#FCA8F1",
  "#DA9CF0",
  "#ADA1F5",
];

function ProjectFormFields() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTab = useMediaQuery("(max-width:900px)");
  const labelResponsiveFont = { fontSize: isMobile ? "0.8rem" : "1rem" };
  const formWidth = { width: isMobile ? "85%" : isTab ? "65%" : "45%" };
  const labelDisplay = { display: isMobile ? "none" : "block" };
  const borderRadiusResponsive = {
    borderRadius: isMobile ? "0.5rem" : "0.75rem",
  };
  const [project, setProject] = useState("");
  const { projectName, location, projectColor, start_time, end_time } =
    useSelector(selectProjectForm);
  const dispatch = useDispatch();

  // Event handler to update the projectName state
  const handleProjectNameChange = (event) => {
    setProject(event.target.value);
    dispatch(setProjectName(event.target.value));
  };

  // Event handler to update the location state
  const handleLocationChange = (event) => {
    dispatch(setLocation(event.target.value));
  };
  const handleProjectColorChange = (color) => {
    dispatch(setProjectColor(color));
  };
  const handleStartDateChange = (newValue) => {
    dispatch(setStartTime(newValue.format('YYYY/MM/DD')));
  };
  const handleEndDateChange = (newValue) => {
    dispatch(setEndTime(newValue.format('YYYY/MM/DD')));
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
                "& input": {
                  borderBottom: "none", // Remove bottom border of the input
                },
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
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Box sx={{ marginTop: "0.5rem", width: "45%" }}>
              <label
                style={{
                  ...labelStyle,
                  ...labelDisplay,
                  ...labelResponsiveFont,
                }}
                htmlFor="start_time"
              >
                Start Time
              </label>
              <Box
                sx={{
                  width: "100%", // Set width to 100% for responsiveness
                  alignSelf: "center",
                  fontSize: "14px",
                  border: "1px solid #ccc",
                  borderRadius: "12px",
                  color: "#202227",
                  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker
                    value={dayjs(start_time)}
                    onChange={handleStartDateChange}
                    format="YYYY/MM/DD"
                  />
                </LocalizationProvider>
              </Box>
            </Box>
            <Box sx={{ marginTop: "0.5rem", width: "45%" }}>
              <label
                style={{
                  ...labelStyle,
                  ...labelDisplay,
                  ...labelResponsiveFont,
                }}
                htmlFor="end_time"
              >
                End time
              </label>
              <Box
                sx={{
                  width: "100%", // Set width to 100% for responsiveness
                  alignSelf: "center",
                  fontSize: "14px",
                  border: "1px solid #ccc",
                  borderRadius: "12px",
                  color: "#202227",
                  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker
                    value={dayjs(end_time)}
                    onChange={handleEndDateChange}
                    format="YYYY/MM/DD"
                  />
                </LocalizationProvider>
              </Box>
            </Box>
          </Stack>
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
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={2}
                p={1}
              >
                {colors.map((color) => {
                  return (
                    <>
                      <Box
                        width={"40px"}
                        height={"60px"}
                        bgcolor={color}
                        boxShadow={projectColor === color ? 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;' :''}
                        borderRadius={"7px"}
                        onClick={() => {
                          handleProjectColorChange(color);
                        }}
                        border={
                          projectColor === color ? "2px solid #ADADAD" : ""
                        }
                      ></Box>
                    </>
                  );
                })}
                {/* Req change to display an array of 12 colors */}
                {/* <ColorPicker /> */}
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
