import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import YellowBtn from "../../UI/button";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../../redux/apis/usersApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Password } from "@mui/icons-material";
import { Grid, Checkbox, useMediaQuery, MenuItem, Select } from "@mui/material";
import builder1 from "../../Signup/Assets/pngs/builderProYellowLogo.png";
import downloadForMob from "../../Signup/Assets/pngs/downloadForMob.png";
import googlePlay from "../../Signup/Assets/pngs/googlePlay.png";
import appStore from "../../Signup/Assets/pngs/appStore.png";

const CompanyForm = () => {
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formError, setFormError] = useState("");
  const [userData, setUserData] = useState(null);
  const password = "87872";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const isSM = useMediaQuery("(min-width: 600px) and (max-width: 900px)");
  const isMD = useMediaQuery("(min-width: 900px) and (max-width: 1279px)");
  const widthValue = isSM ? "35%" : isMD ? "40%" : "100%";

  const isMobile = useMediaQuery("(max-width:600px)");
  const lableResponsiveFont = { fontSize: isMobile ? "0.8rem" : "1rem" };
  const DoMobWidth = isSM ? "50%" : isMD ? "70%" : "100%";
  const borderRadiusResponsive = {
    borderRadius: isMobile ? "0.5rem" : "0.75rem",
  };
  const [passwordVisible, setPasswordVisible] = useState(false);
  const linkResponsiveColor = { color: isMobile ? "#FFAC00" : "#4C8AB1" };
  useEffect(() => {
    // Retrieve user data from localStorage on component mount
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);
  const handleFormSubmit = async () => {
    if (!companyName.trim() || !phoneNumber.trim()) {
      setFormError("Please fill out all fields.");
      return;
    }

    // Validate phone number (basic check)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setFormError("Please enter a valid phone number.");
      return;
    }

    // Process form submission here (e.g., API call)
    const { firstName, lastName, id, email } = userData;
    const formData = {
      data: {
        firstName,
        lastName,
        email,
        company: companyName,
        phone: phoneNumber,
        password,
      },
    };

    try {
      const res = await register(formData.data).unwrap();
      console.log("Sign up: ", res);
      dispatch(setCredentials({ ...res }));
      navigate("/assignproject");
      console.log("hi");
    } catch (err) {
      console.log("Login Error:", err);
      alert(err?.data?.message || err.error); // Display error message to the user
    }
    // Clear form and state after submission if needed
    setCompanyName("");
    setPhoneNumber("");
    setFormError("");
  };

  return (
    <>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
          fontFamily: "GT Walsheim Trial",
          backgroundColor: "#4c8ab1",
          minHeight: "100vh",
        }}
      >
        <Card
          sx={{
            maxWidth: 400,
            boxShadow: 4,
            p: 3,
            height: "fit-content",
            marginTop: "30px",
          }}
        >
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Company Details
            </Typography>
            <TextField
              fullWidth
              label="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              variant="filled"
              margin="normal"
              required
              //         InputLabelProps={{ // Optional, for label placement
              //     shrink: true, // Adjust as needed
              //   }}
            />
            <TextField
              fullWidth
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              variant="filled"
              margin="normal"
              required
            />
            {formError && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                {formError}
              </Typography>
            )}
          </CardContent>
          <CardActions sx={{ justifyContent: "center" }}>
            <Button variant="contained" onClick={handleFormSubmit}>
              Submit
            </Button>
          </CardActions>
        </Card>
      </div> */}
      <Grid container sx={{ ...firstGrid, height: "100vh" }}>
        <Grid item container lg={6} md={6} sm={12} xs={12} sx={SecondGrid}>
          <Typography sx={firstHeading}>Construction Management</Typography>

          {/* Button */}

          <Typography component="p" sx={secondHeading}>
            On schedule. On budget. On the path to building better.
          </Typography>
          <Typography sx={thirdHeading}>Log in to your account</Typography>
          <Box sx={downloadForMobBox}>
            <img src={downloadForMob} width={DoMobWidth} alt="" />
          </Box>
          <Box sx={googleAppImgsBox}>
            <img src={googlePlay} width={widthValue} alt="" />
            <img src={appStore} width={widthValue} alt="" />
          </Box>
        </Grid>
        <Grid
          justifyContent="space-between"
          xs={12}
          sm={12}
          md={6}
          lg={6}
          sx={formGridContainer}
        >
          <Grid item sx={formGrid}>
            <Box sx={logoBox}>
              <Typography sx={formHeadingStyle}>Login</Typography>
              <img src={builder1} width={"20%"} alt="" />
            </Box>
            <form style={{ marginTop: "1rem" }}>
              <Box sx={{ marginTop: "0.5rem" }}>
                <label
                  style={{
                    ...labelStyle,
                    ...lableResponsiveFont,
                  }}
                  htmlFor="email"
                >
                  Email address
                </label>
                <input
                  required
                  type="text"
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  style={{
                    ...inputStyle,
                    ...borderRadiusResponsive,
                    ...placeholderStyle,
                    ...lableResponsiveFont,
                  }}
                  placeholder="Enter Company Name"
                />
              </Box>
              <Box sx={{ marginTop: "0.5rem" }}>
                <label
                  style={{
                    ...labelStyle,
                    ...lableResponsiveFont,
                  }}
                  htmlFor="email"
                >
                  Phone Number
                </label>
                <Box sx={{ position: "relative" }}>
                  <input
                    required
                    type="text"
                    style={{
                      ...inputStyle,
                      ...borderRadiusResponsive,
                      ...placeholderStyle,
                      ...lableResponsiveFont,
                    }}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone number"
                  />
                </Box>
              </Box>
              {formError && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                {formError}
              </Typography>
            )}

              <Button
                sx={{
                  ...YellowBtn,
                  ...loginButton,
                  marginTop: "25px",
                }}
                onClick={handleFormSubmit}
                // type="submit"
              >
                {isMobile ? "Submit" : "Submit"}
              </Button>
            </form>
          </Grid>
          {/* </div> */}
          <Grid sx={bottomGrid}>
            <Box sx={selectLanguageBox}>
              {/* <Select defaultValue={1} sx={selectStyle}>
                <MenuItem value={1}>English (United States)</MenuItem>
                <MenuItem value={2}>French (French)</MenuItem>
                <MenuItem value={3}>Chinese (China)</MenuItem>
              </Select> */}
            </Box>
            <Box sx={hptLinksBox}>
              <Typography sx={hptLinksStyle}>Help</Typography>
              <Typography sx={hptLinksStyle}>Privacy & Terms</Typography>
            </Box>
          </Grid>
          <Box sx={googleAppImgsMobile}>
            <img src={googlePlay} width={widthValue} alt="" />
            <img src={appStore} width={widthValue} alt="" />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

const firstGrid = {
  padding: {
    lg: "0rem 3rem",
    md: "4rem 2rem 2rem 2rem",
    sm: "1rem 2rem",
    xs: "0rem 0rem",
  },
  backgroundColor: "#4C8AB1",
  marginTop: { lg: "0rem", sm: "-1rem", xs: "0rem" },
  // border: "2px solid red",
};

const SecondGrid = {
  gap: { lg: "1.1rem", sm: "1rem", xs: "1rem" },
  alignItems: { lg: "start", md: "start", sm: "center", xs: "center" },
  justifyContent: {
    lg: "start",
    md: "start",
    sm: "center",
    xs: "center",
  },
  display: { lg: "flex", md: "flex", sm: "flex", xs: "none" },
  flexDirection: "column",
  paddingLeft: "4rem",
};

const downloadForMobBox = {
  marginTop: "11rem",
  display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
  marginLeft: { lg: "2.5rem", md: "-1rem", sm: "-3rem" },
  justifyContent: "center",
  alignItems: "center",
};
const googleAppImgsBox = {
  display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
  justifyContent: "center",
  alignItems: "center",
  marginTop: "3rem",
  marginLeft: { lg: "0rem", md: "-3rem", sm: "-3rem" },
  gap: "1rem",
};
const googleAppImgsMobile = {
  display: { lg: "none", md: "none", sm: "flex", xs: "none" },
  justifyContent: "center",
  alignItems: "center",
  marginTop: "1rem",
  gap: "1rem",
};

const formGridContainer = {
  display: "flex",
  flexDirection: "column",
  // border: "2px solid blue",
  justifyContent: { xs: "center" },
  alignItems: { xs: "center" },
};

const formGrid = {
  backgroundColor: "#fff",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  flexDirection: "column",
  display: "flex",
  padding: "20px",
  paddingLeft: { lg: "2.5rem", md: "1rem", sm: "2rem", xs: "1rem" },
  paddingRight: { lg: "5rem", md: "2rem", sm: "2rem", xs: "2rem" },
  marginLeft: { lg: "3rem", md: "2rem", sm: "0rem", xs: "0rem" },
  borderRadius: {
    lg: "1.5rem",
    md: "1.5rem",
    sm: "1.5rem",
    xs: "0rem",
  },
  width: { lg: "80%", md: "90%", sm: "100%", xs: "100%" },
};

const logoBox = {
  gap: "7rem",
  marginBottom: "8rem",
  justifyContent: "space-evenly",
  marginTop: "2rem",
  display: { lg: "none", md: "none", sm: "none", xs: "flex" },
};

const passwordEyeBox = {
  position: "absolute",
  top: "50%",
  right: "10px",
  transform: "translateY(-50%)",
  cursor: "pointer",
  opacity: "50%",
  display: "flex",
  alignItems: "center",
};
const linkBox = {
  display: "flex",
  justifyContent: "space-between",
  gap: { lg: "1rem", md: "5rem", sm: "3.5rem", xs: "5rem" },
  marginTop: { lg: "2rem", md: "2rem", sm: "2rem", xs: "0.5rem" },
  marginBottom: {
    lg: "2rem",
    md: "2rem",
    sm: "2rem",
    xs: "3rem",
  },
};
const checkBox = {
  whiteSpace: "nowrap",
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  marginTop: "1rem",
};
const forgetPassTypo = {
  whiteSpace: "nowrap",
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  fontWeight: 600,
  paddingTop: "1rem",
};

const accountLinkText = {
  color: "#202227",
  marginBottom: {
    lg: "1rem",
    md: "1rem",
    sm: "1rem",
    xs: "2rem",
  },
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  fontSize: {
    lg: "1rem",
    md: "1rem",
    sm: "0.9rem",
    xs: "0.8rem",
  },
  fontWeight: 400,
  lineHeight: "normal",
  display: "flex",
  justifyContent: {
    lg: "start",
    md: "start",
    sm: "start",
    xs: "center",
  },
  marginTop: "1.5rem",
};
const signupLink = {
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  fontWeight: 600,
};

const continueWithBox = {
  position: "relative",
  marginTop: {
    lg: "2.5rem",
    md: "2.5rem",
    sm: "2.5rem",
    xs: "3rem",
  },
};
const hrLine = {
  width: "100%",
  border: 0,
  height: "2px",
  backgroundColor: "rgba(32, 34, 39, 0.12)",
};

const bottomGrid = {
  display: { lg: "flex", md: "flex", sm: "flex", xs: "none" },
  flexDirection: "row",
  justifyContent: "space-between",
  marginLeft: { lg: "3rem", md: "2rem", sm: "0rem", xs: "0rem" },

  width: { lg: "80%", md: "100%", sm: "100%", xs: "100%" },
  gap: { lg: "1rem", md: "4rem", sm: "3rem" },
};
const selectLanguageBox = {
  display: "flex",
  justifyContent: "flex-start",
  backgroundColor: "#4C8AB1",
};
const selectStyle = {
  "&.MuiSelect-selectMenu": {
    paddingY: "12px", // Adjust padding to center text vertically
  },
  "& .MuiSelect-icon": {
    color: "white", // Set the arrow color to white
  },
  "&:before": {
    border: "none", // Hide the before border
  },
  "&:after": {
    border: "none", // Hide the after border
  },
  "&:hover:not(.Mui-disabled):before": {
    border: "none", // Hide the hover border
  },
  boxShadow: "none",
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  color: "white",
  border: "none",
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  fontSize: "1rem",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
};

const hptLinksBox = {
  display: "flex",
  justifyContent: "center",

  marginTop: "1rem",
  gap: "1.5rem",
  // border: "2px solid red",
};
const firstHeading = {
  color: "#FFF",
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  marginTop: { lg: "6rem", md: "5rem", sm: "1rem" },
  fontSize: { lg: "2.7rem", md: "2rem", sm: "1.5rem" },
  fontWeight: 400,
  lineHeight: "4.25rem",
};

const secondHeading = {
  color: "rgba(255, 255, 255, 0.80)",
  width: { lg: "31.125rem", md: "28rem", sm: "auto" },
  display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  fontSize: { lg: "2rem", md: "1.5rem", sm: "1.2rem" },
  fontWeight: 400,
};

const thirdHeading = {
  color: "#FFF",
  marginTop: "2rem",
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  fontSize: { lg: "2rem", md: "1.5rem", sm: "1.2rem" },
  display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
  fontWeight: 400,
};

const formHeadingStyle = {
  color: "#4C8AB1",
  textAlign: "center",
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  fontSize: "2.1875rem",
  fontWeight: 700,
};

const inputStyle = {
  height: "2.5rem",
  alignSelf: "stretch",
  width: "100%",
  fontSize: "14px",
  border: "1px solid #ccc",
  borderRadius: "0.75rem",
  marginBottom: { lg: "1rem", md: "1rem", sm: "1rem", xs: "1rem" },
};

const placeholderStyle = {
  color: "#B8B8B8",
  padding: "8px",
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  fontSize: "1rem",
  fontWeight: 400,
};

const labelStyle = {
  display: "block",
  marginBottom: "1rem",
  color: "#202227",
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  fontSize: { lg: "1rem", md: "1rem", sm: "0.9rem", xs: "0.75rem" },
  fontWeight: 400,
};

const hptLinksStyle = {
  color: "#FFF",
  fontSize: { lg: "1rem", md: "0.9rem", sm: "0.8rem" },
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  fontWeight: 400,
  lineHeight: "normal",
  cursor: "pointer", // Ensure cursor changes on hover

  // Hover effect
  transition: "color 0.3s ease", // Smooth color transition
  '&:hover': {
    color: "#ffac00", // Change color on hover
  },

  // Click effect
  '&:active': {
    transform: "scale(0.95)", // Add slight scale effect on click
  },
};

const googleBtnStyle = {
  marginBottom: { lg: "6rem", md: "5rem", sm: "4rem", xs: "2rem" },
  display: "flex",
  flexDirection: "row",
  gap: "0.3rem",
  marginTop: { lg: "2.5rem", md: "2rem", sm: "2rem", xs: "3rem" },
  borderRadius: "2.5rem",
  border: "1px solid rgba(6, 32, 72, 0.11)",
  background: "#FFF",
  color: "#333",
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  fontSize: { lg: "1.25rem", md: "1.25rem", sm: "1.1rem", xs: "1rem" },
  fontWeight: 400,
  cursor: "pointer",
  width: { lg: "auto", md: "auto", sm: "auto", xs: "100%" },
  minWidht: "15rem",
  padding: {
    lg: "0.96875rem 2rem",
    md: "0.96875rem 1rem",
    sm: "0.8rem 1rem",
    xs: "0.96875rem 2rem",
  },
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
  textTransform: "none",
};

const ContinuewithTextStyle = {
  color: "#202227",
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  fontSize: { lg: "0.875rem", md: "0.875rem", sm: "0.875rem", xs: "0.875rem" },
  fontWeight: 400,
  display: "flex",
  justifyContent: "start",
  marginTop: "-1.2rem",
  position: "absolute",
  left: { lg: "17%", md: "20%", sm: "30%", xs: "50%" },
  transform: "translateX(-50%)",
  backgroundColor: "#FFFFFF",
  padding: "0 10px",
};

const loginButton = {
  width: { lg: "19rem", md: "auto", sm: "auto", xs: "100%" },
};

export default CompanyForm;
