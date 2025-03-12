import React from "react";
import {
  useMediaQuery,
  Box,
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
  setLatLng
} from "../../../redux/slices/projectFormSlice";
import "../../../App.css";
import ColorPicker from "../../dialogues/ColorPickerProject/ColorPicker";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import LocationPicker from "../../UI/LocationPicker/LocationPicker";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { useTranslation } from "react-i18next";
const colors = [
  "#FFF",
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

// const iconMap = {
//   locality: <LocationOnIcon />,
//   airport: <LocalAirportIcon />,
//   point_of_interest: <PinDropIcon />,
//   establishment: <StoreMallDirectoryIcon />,
// };
const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));
function ProjectFormFields({ showLocationWarning }) {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTab = useMediaQuery("(max-width:900px)");
  const labelResponsiveFont = { fontSize: isMobile ? "0.8rem" : "1rem" };
  const formWidth = { width: isMobile ? "85%" : isTab ? "65%" : "45%" };
  const labelDisplay = { display: isMobile ? "none" : "block" };
  const borderRadiusResponsive = {
    borderRadius: isMobile ? "0.5rem" : "0.75rem",
  };
  // const [project, setProject] = useState("");
  const { projectName, location, projectColor, start_time, end_time } =
    useSelector(selectProjectForm);
  const dispatch = useDispatch();

  // Event handler to update the projectName state
  const handleProjectNameChange = (event) => {
    // setProject(event.target.value);
    dispatch(setProjectName(event.target.value));
  };

  const handleLocationChange = (value, points) => {
    dispatch(setLatLng(points))
    dispatch(setLocation(value));
  };
  const handleSelect = async (value) => {
    dispatch(setLocation(value));
  };
  const handleProjectColorChange = (color) => {
    dispatch(setProjectColor(color));
  };
  const handleStartDateChange = (newValue) => {
    dispatch(setStartTime(newValue.format("YYYY/MM/DD")));
  };
  const handleEndDateChange = (newValue) => {
    dispatch(setEndTime(newValue.format("YYYY/MM/DD")));
  };


  return (
    <div>
      <Box sx={formBox}>
        <form style={{ ...formStyle, ...formWidth }} autoComplete="off">
          <Box sx={{ marginTop: "0.5rem" }}>
            <label
              style={{ ...labelStyle, ...labelDisplay, ...labelResponsiveFont }}
              htmlFor="projectName"
            >
              {t("AssignProject.ProjectFormFields.title1")}
            </label>
            <input
              className="placeholder"
              type="text"
              id="projectName"
              maxLength={50}
              style={{
                ...inputStyle,
                ...borderRadiusResponsive,
                ...labelResponsiveFont,
              }}
              placeholder={t("AssignProject.ProjectFormFields.placeholder")}
              value={projectName}
              onChange={handleProjectNameChange}
              required
            />
          </Box>
          <Box sx={{ marginTop: "0.2rem" }} spacing={1}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <label
                style={{ ...labelStyle, ...labelDisplay, ...labelResponsiveFont }}
                htmlFor="location"
              >
                {t("AssignProject.ProjectFormFields.title2")}
              </label>
              {showLocationWarning && <Stack>
                <LightTooltip title={t("AssignProject.ProjectFormFields.locationWarning")} placement="top">
                  <WarningRoundedIcon sx={{ color: '#EC3710' }} />
                </LightTooltip>
              </Stack>}
            </Stack>
            {/* <PlacesAutocomplete
              value={location}
              onChange={handleLocationChange}
              onSelect={handleSelect}
              googleCallbackName="myCallbackFunc"
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <TextField
                    {...getInputProps({
                      placeholder: "Enter your location...",
                      id: "location",
                      inputProps: { maxLength: 50, className: "placeholder" },
                    })}
                    sx={{
                      ...inputStyle,
                      ...borderRadiusResponsive,
                      "& input": {
                        borderBottom: "none", // Remove bottom border of the input
                      },
                    }}
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      className: 'placeholder',
                    }}
                  />
                  <Paper elevation={3} style={{ position: 'absolute', zIndex: 1 }}>
                    {loading && (
                      <Box display="flex" alignItems="center" justifyContent="space-between" style={{ minWidth: '300px', backgroundColor: '#ffffff', borderRadius: '4px', padding: '8px' }}>
                        <span style={{ marginLeft: '8px' }}>Loading...</span>
                        <CircularProgress size={18} />
                      </Box>
                    )}
                    <List>
                      {console.log(suggestions)}
                      {suggestions.map((suggestion) => {
                        const icon = suggestion.types.map(type => iconMap[type]).find(Boolean) || <LocationOnIcon />; // Default icon
                        return (
                          <ListItem
                            {...getSuggestionItemProps(suggestion)}
                            key={suggestion.placeId}
                            button
                          >
                            {icon}
                            {suggestion.description}
                          </ListItem>
                        )
                      })}
                    </List>
                  </Paper>
                </div>
              )}
            </PlacesAutocomplete> */}
            <LocationPicker isMobile={isMobile} handleLocationChange={handleLocationChange} />
          </Box>
          <Stack direction={"row"} justifyContent={"space-between"} width={'100%'}>
            <Box sx={{ marginTop: "0.5rem", width: "45%", marginBottom: '1rem' }}>
              <label
                style={{
                  ...labelStyle,
                  ...labelDisplay,
                  ...labelResponsiveFont,
                }}
                htmlFor="start_time"
              >
                {t("AssignProject.ProjectFormFields.title3")}
              </label>
              <Box
                sx={{
                  width: 'calc(100% + 16px)', // Set width to 100% for responsiveness
                  alignSelf: "center",
                  fontSize: "14px",
                  // border: "1px solid #ccc",
                  // borderRadius: "12px",
                  color: "#202227",
                  fontFamily: "var(--main-font-family)",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker
                    sx={{
                      width: "100%",
                      ".MuiOutlinedInput-notchedOutline ": {
                        border: "1px solid #ccc !important",
                        borderRadius: "12px",
                      }
                    }}
                    value={dayjs(start_time)}
                    onChange={handleStartDateChange}
                    format="MM/DD/YYYY"
                    disablePast
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
                {t("AssignProject.ProjectFormFields.title4")}
              </label>
              <Box
                sx={{
                  width: 'calc(100% + 16px)', // Set width to 100% for responsiveness
                  alignSelf: "center",
                  fontSize: "14px",
                  // border: "1px solid #ccc",
                  // borderRadius: "12px",
                  color: "#202227",
                  fontFamily: "var(--main-font-family)",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker
                    sx={{
                      width: "100%",
                      ".MuiOutlinedInput-notchedOutline ": {
                        border: "1px solid #ccc !important",
                        borderRadius: "12px",
                        paddingRight: "0px"
                      }
                    }}
                    value={dayjs(end_time)}
                    onChange={handleEndDateChange}
                    format="MM/DD/YYYY"
                    minDate={start_time ? dayjs(start_time).add(1, 'day') : dayjs(Date.now()).add(1, 'day')}
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
                {t("AssignProject.ProjectFormFields.title5")}
              </label>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"flex-start"}
                gap={2}
                p={1}
                pt={0.5}
              >
                {/* {colors.map((color) => {
                  return (
                    <>
                      <Box
                        width={"40px"}
                        height={"60px"}
                        bgcolor={color}
                        sx={{cursor:'pointer'}}
                        boxShadow={
                          (projectColor ? projectColor === color : '#FFF' === color)
                            ? "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;"
                            : ""
                        }
                        borderRadius={"7px"}
                        onClick={() => {
                          handleProjectColorChange(color);
                        }}
                        border={
                          (projectColor ? projectColor === color : '#FFF' === color)
                          ? "3px solid #ADADAD" : "1px solid #ADADAD"
                        }
                      ></Box>
                    </>
                  );
                })} */}
                <Box
                  width={"40px"}
                  height={"40px"}
                  bgcolor={projectColor}
                  sx={{ cursor: 'pointer' }}
                  // boxShadow={
                  //   (projectColor ? projectColor === color : '#FFF' === color)
                  //     ? "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;"
                  //     : ""
                  // }
                  borderRadius={"99999px"}
                  border={'1px dashed gray'}
                // onClick={() => {
                //   handleProjectColorChange(color);
                // }}
                // border={
                //   (projectColor ? projectColor === color : '#FFF' === color)
                //   ? "3px solid #ADADAD" : "1px solid #ADADAD"
                // }
                ></Box>
                {/* Req change to display an array of 12 colors */}
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
  fontFamily: "var(--main-font-family)",
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
  fontFamily: "var(--main-font-family)",
  "::placeholder":{
    fontFamily:'inherit'
  }
  // paddingLeft: "-.5rem",
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
