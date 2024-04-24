import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Checkbox,
  useMediaQuery,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import builder1 from "../../components/Signup/Assets/pngs/builderProYellowLogo.png";
import downloadForMob from "../../components/Signup/Assets/pngs/downloadForMob.png";
import googlePlay from "../../components/Signup/Assets/pngs/googlePlay.png";
import appStore from "../../components/Signup/Assets/pngs/appStore.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ReactComponent as GoogleLogo } from "../../components/Signup/Assets/svgs/GoogleIcon.svg";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import YellowBtn from "../../components/UI/button";
import "../../App.css";
// import "./Signup.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Bounce } from "react-toastify"; // Assuming you're using react-toastify
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../redux/apis/usersApiSlice";
import { setCredentials } from "../../redux/slices/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Invitation = () => {
  const isLG = useMediaQuery("(min-width: 1280px)");
  const isMD = useMediaQuery("(min-width: 900px) and (max-width: 1279px)");
  const isSM = useMediaQuery("(min-width: 600px) and (max-width: 900px)");
  const isMobile = useMediaQuery("(max-width:600px)");
  const { projectId, email, userRole, companyName } = useParams();
  console.log(projectId, email, userRole);

  const DoMobWidth = isSM ? "50%" : isMD ? "70%" : "100%";
  const widthValue = isSM ? "35%" : isMD ? "40%" : "100%";

  const [phone, setPhone] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: email,
    password: "",
    conformPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target || e;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to be sent in the request body
    const data = {
      ...formData,
      phone,
      userRole,
      email,
      projectId,
      companyName,
    };
    console.log(data);

    try {
      // Make POST request using Axios
      await axios.post("http://192.168.0.106:8080/project/addme", data);

      // Navigate to the desired location upon successful request
      navigate("/login");
    } catch (err) {
      // Handle errors
      console.log("ERORR: ", err);
      toast.error(`${err.response.data.error}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const lableResponsiveFont = { fontSize: isMobile ? "0.7rem" : "1rem" };
  const linkResponsiveColor = { color: isMobile ? "#FFAC00" : "#4C8AB1" };
  const borderRadiusResponsive = {
    borderRadius: isMobile ? "0.5rem" : "0.75rem",
  };

  return (
    <Grid container sx={firstGrid}>
      <Grid item container lg={6} md={6} sm={12} xs={12} sx={SecondGrid}>
        <Typography sx={firstHeading}>Construction Management</Typography>

        {/* Button */}

        <Typography component="p" sx={secondHeading}>
          On schedule. On budget. On the path to building better.
        </Typography>
        <Typography sx={thirdHeading}>Create an account</Typography>
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
            <Typography sx={formHeadingStyle}>Signup</Typography>
            <img src={builder1} width={"20%"} alt="" />
          </Box>
          <form style={{ marginTop: "0.1rem" }} onSubmit={handleSubmit}>
            <Box sx={namesFieldBox}>
              <Box sx={topSpace}>
                <label
                  style={{ ...labelStyle, ...lableResponsiveFont }}
                  htmlFor="firstName"
                >
                  First name
                </label>

                <input
                  type="text"
                  name="firstName"
                  style={inputStyle}
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Box>
              <Box sx={{ marginTop: "0.2rem" }}>
                <label
                  style={{
                    ...labelStyle,
                    fontSize: isMobile ? "0.8rem" : "1rem",
                  }}
                  htmlFor="lastName"
                >
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  style={inputStyle}
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Box>
            </Box>

            <Box sx={{ marginTop: "0.5rem" }}>
              <label
                style={{
                  ...labelStyle,
                  fontSize: isMobile ? "0.8rem" : "1rem",
                }}
                htmlFor="company"
              >
                Email
              </label>
              <input
                readOnly
                type="text"
                name="email"
                style={inputStyle}
                value={formData.email}
                onChange={handleChange}
              />
            </Box>

            <Box sx={{ marginTop: "0.5rem" }}>
              <label
                style={{
                  ...labelStyle,
                  fontSize: isMobile ? "0.8rem" : "1rem",
                }}
                htmlFor="phone"
              >
                Phone number
              </label>

              <PhoneInput
                style={{ ...customPhoneStyles }}
                defaultCountry="pk"
                value={formData.phone}
                onChange={(phone) => setPhone(phone)}
                inputStyle={{ ...customeInputStyles }}
                inputProps={{
                  border: "none",
                }}
                required
                name="phone"
              />
            </Box>

            <Box sx={{ marginTop: "0.5rem" }}>
              <label
                style={{
                  ...labelStyle,
                  fontSize: isMobile ? "0.8rem" : "1rem",
                }}
                htmlFor="password"
              >
                Password
              </label>

              {!isMobile && (
                <Box sx={subtitleStyle}>
                  Use 8 or more characters with a mix of letters, numbers &
                  symbols
                </Box>
              )}

              <Box style={{ position: "relative" }}>
                <input
                  style={inputStyle}
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <Box style={passwordEyeBox} onClick={togglePasswordVisibility}>
                  {passwordVisible ? <VisibilityOff /> : <Visibility />}
                  {!isMobile && (
                    <span style={{ marginLeft: "5px" }}>
                      {passwordVisible ? "Hide" : "Show"}
                    </span>
                  )}
                </Box>
              </Box>

              {isMobile && (
                <Box sx={subtitleStyle}>
                  Use 8 or more characters with a mix of letters, numbers &
                  symbols
                </Box>
              )}
            </Box>

            <Box sx={{ marginTop: "0.5rem" }}>
              <label
                style={{
                  ...labelStyle,
                  fontSize: isMobile ? "0.8rem" : "1rem",
                }}
                htmlFor="password"
              >
                Confirm Password
              </label>

              <Box style={{ position: "relative" }}>
                <input
                  style={inputStyle}
                  type={passwordVisible ? "text" : "password"}
                  name="conformPassword"
                  value={formData.conformPassword}
                  onChange={handleChange}
                />

                <Box style={passwordEyeBox} onClick={togglePasswordVisibility}>
                  {passwordVisible ? <VisibilityOff /> : <Visibility />}
                  {!isMobile && (
                    <span style={{ marginLeft: "5px" }}>
                      {passwordVisible ? "Hide" : "Show"}
                    </span>
                  )}
                </Box>
              </Box>

              {isMobile && (
                <Box sx={subtitleStyle}>
                  Use 8 or more characters with a mix of letters, numbers &
                  symbols
                </Box>
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: "2rem 0rem 1rem",
              }}
            >
              <Button
                sx={{ ...YellowBtn }}
                type="submit"
                onClick={handleSubmit}
              >
                Done
              </Button>
            </Box>
          </form>
        </Grid>
        <Grid sx={bottomGrid}>
          <Box sx={selectLanguageBox}>
            <Select defaultValue={1} sx={selectStyle}>
              <MenuItem value={1}>English (United States)</MenuItem>
              <MenuItem value={2}>French (French)</MenuItem>
              <MenuItem value={3}>Chinese (China)</MenuItem>
            </Select>
          </Box>
          <Box sx={hptLinksBox}>
            <Typography sx={hptLinksStyle}>Help</Typography>
            <Typography sx={hptLinksStyle}>Privacy</Typography>
            <Typography sx={hptLinksStyle}>Terms</Typography>
          </Box>
        </Grid>
        <Box
          sx={{
            display: { lg: "none", md: "none", sm: "flex", xs: "none" },
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1rem",
            marginLeft: { lg: "0rem", md: "-3rem", sm: "0rem" },
            gap: "1rem",
          }}
        >
          <img src={googlePlay} width={widthValue} alt="" />
          <img src={appStore} width={widthValue} alt="" />
        </Box>
      </Grid>
      <ToastContainer />
    </Grid>
  );
};

const firstGrid = {
  padding: {
    lg: "1.19rem 3rem 0rem 3rem",
    md: "0.5rem 2rem",
    sm: "1rem 2rem",
    xs: "0rem 0rem 0rem 0rem",
  },
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#4C8AB1",
  marginTop: { lg: "-0.3rem", sm: "-1rem", xs: "-2rem" },
  height: "100.5vh",
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
  display: { sm: "flex", xs: "none" },
  flexDirection: "column",
  paddingLeft: "4rem",
};

const downloadForMobBox = {
  marginTop: "14rem",
  marginLeft: { lg: "2.5rem", md: "-1rem", sm: "-3rem" },
  display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
  justifyContent: "center",
  alignItems: "center",
};
const googleAppImgsBox = {
  display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
  justifyContent: "center",
  alignItems: "center",
  marginTop: "2rem",
  marginLeft: { lg: "0rem", md: "-3rem", sm: "-3rem" },
  gap: "1rem",
};

const formGridContainer = {
  display: "flex",
  flexDirection: "column",
  // border: "2px solid blue",
  justifyContent: { lg: "center", xs: "center" },
  alignItems: { lg: "center", xs: "center" },
};

const formGrid = {
  backgroundColor: "#fff",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  flexDirection: "column",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "3rem 2rem 3rem 1rem",
  marginTop: "1rem",
  // paddingLeft: { lg: "0rem", md: "0rem", sm: "1rem", xs: "1rem" },
  // paddingRight: { lg: "0rem", md: "0rem", sm: "2rem", xs: "2rem" },
  marginLeft: { lg: "6rem", md: "2rem", sm: "0rem", xs: "0rem" },
  borderRadius: { lg: "1.5rem", md: "1.5rem", sm: "1.5rem", xs: "0rem" },
  width: { lg: "70%", md: "90%", sm: "85%", xs: "100%" },
};

const logoBox = {
  gap: "7rem",
  marginBottom: "0.3rem",
  justifyContent: "space-evenly",
  marginTop: "1rem",
  display: { lg: "none", md: "none", sm: "none", xs: "flex" },
};
const namesFieldBox = {
  display: "flex",
  justifyContent: "space-between",
  gap: "2rem",
  marginBottom: "0.3rem",
};

const subtitleStyle = {
  color: "#202227",
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  fontSize: "0.75rem",
  fontWeight: 400,
  marginBottom: "0.2rem",
  marginTop: "0.2rem",
};
const passwordEyeBox = {
  position: "absolute",
  top: "40%",
  right: "10px",
  transform: "translateY(-50%)",
  cursor: "pointer",
  opacity: "50%",
  display: "flex",
  alignItems: "center",
};

const bottomGrid = {
  display: { lg: "flex", md: "flex", sm: "flex", xs: "none" },
  flexDirection: "row",
  // border: "2px solid red",
  justifyContent: "space-between",
  marginLeft: { lg: "6rem", md: "2rem", sm: "0rem", xs: "0rem" },
  marginRight: { lg: "0rem", md: "4rem", sm: "0rem", xs: "0rem" },
  // marginRight: "2rem",
  width: { lg: "80%", md: "70%", sm: "100%", xs: "100%" },
  gap: { lg: "1rem", md: "3rem", sm: "3rem" },
};
const selectLanguageBox = {
  display: "flex",
  justifyContent: "flex-start",
  // border: "2px solid red",
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
  display: { lg: "flex", md: "flex", sm: "flex", xs: "none" },
  marginTop: "1rem",
  fontSize: { lg: "2.9375rem", md: "2rem", sm: "1.5rem" },
  fontWeight: 400,
  lineHeight: "4.25rem",
};

const secondHeading = {
  color: "rgba(255, 255, 255, 0.80)",
  width: { lg: "31.125rem", md: "28rem", sm: "auto" },
  marginTop: "0.5rem",
  display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  fontSize: { lg: "2rem", md: "1.5rem", sm: "1.2rem" },
  fontWeight: 400,
};

const thirdHeading = {
  color: "#FFF",
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  marginTop: "1rem",
  display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
  fontSize: { lg: "2rem", md: "1.5rem", sm: "1.2rem" },
  fontWeight: 400,
};

const formHeadingStyle = {
  color: "#4C8AB1",
  textAlign: "center",
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  fontSize: "2.1875rem",
  fontWeight: 700,
  lineHeight: "normal",
};

const customeInputStyles = {
  width: "100%",
  border: "none",
  padding: "8px",
};
const customPhoneStyles = {
  borderRadius: "12px",
  border: "1px solid #D8D8D8",
  background: "#FFF",
  width: "100%",
  height: "2rem",
  alignSelf: "stretch",
  paddingTop: "0.5rem",
  padding: "0.5rem",
};

const inputStyle = {
  width: "100%",
  height: "2rem",
  marginBottom: "1rem",
  alignSelf: "stretch",
  padding: "8px",
  fontSize: "14px",
  border: "1px solid #ccc",
  borderRadius: "12px",
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  paddingLeft: "-1.5rem",
};

const labelStyle = {
  display: "block",
  marginBottom: "0.5rem",
  color: "#202227",
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  fontSize: "1rem",
  fontWeight: 400,
  lineHeight: "normal",
};

const hptLinksStyle = {
  color: "#FFF",
  fontSize: { lg: "1rem", md: "0.9rem", sm: "0.8rem" },
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  fontWeight: 400,
  lineHeight: "normal",
};

const topSpace = {
  marginTop: "0.2rem",
};

export default Invitation;

//
