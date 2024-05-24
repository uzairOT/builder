import React, { useState, useEffect } from "react";
import { Link, useFetcher, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useGoogleLoginMutation,
  useLoginMutation,
} from "../../redux/apis/usersApiSlice";
import { setCredentials } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import {
  Box,
  Grid,
  Typography,
  Checkbox,
  useMediaQuery,
  Button,
  MenuItem,
  Select,
  CircularProgress,
} from "@mui/material";
import builder1 from "../Signup/Assets/pngs/builderProYellowLogo.png";
import downloadForMob from "../Signup/Assets/pngs/downloadForMob.png";
import googlePlay from "../Signup/Assets/pngs/googlePlay.png";
import appStore from "../Signup/Assets/pngs/appStore.png";
import { Circle, Visibility, VisibilityOff } from "@mui/icons-material";
import { ReactComponent as GoogleLogo } from "../Signup/Assets/svgs/GoogleIcon.svg";

import YellowBtn from "../UI/button";
import "../../App.css";
import { useFormik } from "formik";
import { loginSchemea } from "../../utils/Validation/settingsPageSchema";
//import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const isMD = useMediaQuery("(min-width: 900px) and (max-width: 1279px)");
  const isSM = useMediaQuery("(min-width: 600px) and (max-width: 900px)");
  const isMobile = useMediaQuery("(max-width:600px)");

  const DoMobWidth = isSM ? "50%" : isMD ? "70%" : "100%";
  const widthValue = isSM ? "35%" : isMD ? "70%" : "100%";

  const lableResponsiveFont = { fontSize: isMobile ? "0.8rem" : "1rem" };
  const linkResponsiveColor = { color: isMobile ? "#FFAC00" : "#4C8AB1" };
  const borderRadiusResponsive = {
    borderRadius: isMobile ? "0.5rem" : "0.75rem",
  };
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading, error }] = useLoginMutation();
  const [googleLogin] = useGoogleLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (userInfo) {
  //     //console.log("hi")
  //     navigate('/profile');
  //   }
  // }, [navigate, userInfo]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  useEffect(() => {
    gapi.load("auth2", () => {
      gapi.auth2.getAuthInstance({
        client_id:
          "960267013158-g1avbe0m8oe44tcflp4urhe4gkh5olb1.apps.googleusercontent.com",
      });
    });
  }, []);

  const responseGoogle = async (response) => {
    // const auth2 = gapi.auth2.getAuthInstance();
    if (response?.profileObj) {
      const { givenName, googleId, email, familyName } = response.profileObj;

      // Use Google profile info to authenticate the user
      const userData = {
        firstName: givenName,
        lastName: familyName,
        id: googleId,
        email: email,
      };
      // Stringify user data object before storing in localStorage
      const userDataString = JSON.stringify(userData);

      // Store user data in localStorage
      localStorage.setItem("userData", userDataString);
      //
      try {
        const res = await googleLogin({ email }).unwrap();

        if (res.message === "Login Successful!") {
          dispatch(setCredentials({ ...res }));
          navigate("/");
        } else if (res.message === "notFound!") {
          toast.warning("User not found");
          navigate("/signup");
        } else {
          toast.warning("Something went wrong");
          navigate("/signup");
        }
      } catch (err) {
        if (err.data.message === "notFound!") {
          toast.warning("Profile doesn't exist");
          navigate("/signup");
        } else {
          // console.log("+(+(+++2", err);
          //navigate("/signup");
        }

        // console.log("+(+(+++1", err);
        // alert("---",err?.data?.message || "---",err.error);
      }
      //
      // console.log("User data stored in localStorage:", userData);
    } else {
      // console.log("Google login failed");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({
        email: values.email,
        password: values.password,
      }).unwrap();
      // console.log("login :", res);
      // localStorage.setItem('userInfo', JSON.stringify({...res}));
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      console.log(err);
      if(err.status === 'FETCH_ERROR'){
        toast.error('Network Issues');
        return;
      }
      toast.error(err?.data?.error || err.error || err?.data?.message);
    }
  };
  const { values, handleBlur, handleChange, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchemea,
    onSubmit: submitHandler,
  });
  useEffect(() => {
    console.log(values);
  }, [values]);

  return (
    <Grid container sx={firstGrid}>
      <Grid item container lg={6} md={6} sm={12} xs={12} sx={SecondGrid}>
        <Typography sx={firstHeading}>Builder Builder Pro</Typography>

        {/* Button */}

        <Typography component="p" sx={secondHeading}>
          On schedule. On budget. On the path to building better.
        </Typography>
        {/* <Typography sx={thirdHeading}>Log in to your account</Typography> */}
        <Box sx={downloadForMobBox}>
          <img src={downloadForMob} width={DoMobWidth} alt="" />
        </Box>
        <Box sx={googleAppImgsBox}>
          <a
            href="https://play.google.com/store/apps?hl=en&gl=US&pli=1"
            target="blank"
          >
            {" "}
            <img
              src={googlePlay}
              width={widthValue}
              style={{ cursor: "pointer" }}
              alt=""
            />
          </a>

          <a href="https://www.apple.com/store" target="blank">
            <img
              src={appStore}
              width={widthValue}
              style={{ cursor: "pointer" }}
              alt=""
            />
          </a>
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
          <form style={{ marginTop: "1rem" }} onSubmit={submitHandler}>
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
                type="email"
                id="email"
                
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  ...inputStyle,
                  ...borderRadiusResponsive,
                  ...placeholderStyle,
                  ...lableResponsiveFont,
                  border:
                    errors.email && errors.email
                      ? "1px solid #d32f2f"
                      : "1px solid #E0E4EC",
                }}
                placeholder="JohnDoe@gmail.com"
              />
               <Typography fontSize={'10px'} color={'#d32f2f'} mt={'-0.5rem'} >{errors.email && touched.email ? errors.email : ""}</Typography>
            </Box>
            <Box sx={{ marginTop: "0.5rem" }}>
              <label
                style={{
                  ...labelStyle,
                  ...lableResponsiveFont,
                  paddingTop:'10px'
                }}
                htmlFor="password"
              >
                Password
              </label>
              <Box sx={{ position: "relative" }}>
                <input
                  required
                  name="password"
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  style={{
                    ...inputStyle,
                    ...borderRadiusResponsive,
                    ...placeholderStyle,
                    ...lableResponsiveFont,
                    border:
                    errors.password && errors.password
                      ? "1px solid #d32f2f"
                      : "1px solid #E0E4EC",
                  }}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your password"
                />
                <Box style={passwordEyeBox} onClick={togglePasswordVisibility}>
                  {passwordVisible ? <VisibilityOff /> : <Visibility />}
                  {!isMobile && (
                    <span style={{ marginLeft: "5px" }}>
                      {passwordVisible ? "Hide" : "Show"}
                    </span>
                  )}
                </Box>
                     <Typography fontSize={'10px'} color={'#d32f2f'} mt={'-0.5rem'} >{errors.password && touched.password ? errors.password : ""}</Typography>
              </Box>
            </Box>

            <Box sx={linkBox}>
              <Box sx={{ display: "flex" }}>
                <Checkbox
                  id="agreeTerms"
                  sx={{
                    "&.Mui-checked": {
                      color: "#4C8AB1",
                    },
                  }}
                />
                <label
                  htmlFor="agreeTerms"
                  style={{
                    ...checkBox,
                    ...lableResponsiveFont,
                  }}
                >
                  Remember Me
                </label>
              </Box>
              <Box
                sx={{
                  ...forgetPassTypo,
                  ...lableResponsiveFont,
                  ...linkResponsiveColor,
                }}
                onClick={() => {
                  navigate("/forgetpassword");
                }}
              >
                <Link
                  style={{
                    ...signupLink,
                    ...lableResponsiveFont,
                    ...linkResponsiveColor,
                  }}
                >
                  Forget Password ?
                </Link>
              </Box>
            </Box>

            <Button
              sx={{
                ...YellowBtn,
                ...loginButton,
              }}
              onClick={submitHandler}
              type="submit"
            >
              {isLoading ? (
                <CircularProgress size={"1.25rem"} />
              ) : isMobile ? (
                "Login"
              ) : (
                "Log in with Email"
              )}
            </Button>
            <Typography sx={accountLinkText}>
              Don’t have an account?{"\u00a0"}{" "}
              <Link
                to="/signup"
                style={{
                  ...signupLink,
                  ...lableResponsiveFont,
                  ...linkResponsiveColor,
                }}
              >
                Sign up
              </Link>
            </Typography>
            <Box sx={continueWithBox}>
              <hr style={hrLine} />
              <Typography sx={ContinuewithTextStyle}>
                {isMobile ? "Or" : "or continue with"}
              </Typography>
            </Box>

            <GoogleLogin
              clientId="960267013158-g1avbe0m8oe44tcflp4urhe4gkh5olb1.apps.googleusercontent.com"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              render={(renderProps) => (
                <Button
                  sx={googleBtnStyle}
                  type="button"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <GoogleLogo style={{ marginRight: "1rem" }} />{" "}
                  {isMobile ? "Google" : "Continue with Google"}
                </Button>
              )}
            />
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
            <Typography
              sx={hptLinksStyle}
              onClick={() => {
                navigate("/help");
              }}
            >
              Help
            </Typography>
            <Typography
              sx={hptLinksStyle}
              onClick={() => {
                navigate("/privacyandterms");
              }}
            >
              Privacy & Terms
            </Typography>
          </Box>
        </Grid>
        <Box sx={googleAppImgsMobile}>
          <img
            src={googlePlay}
            width={widthValue}
            style={{ cursor: "pointer" }}
            alt=""
          />
          <img
            src={appStore}
            width={widthValue}
            style={{ cursor: "pointer" }}
            alt=""
          />
        </Box>
      </Grid>
    </Grid>
  );
};

const firstGrid = {
  padding: {
    xl: "3rem 3rem 0rem 3rem",
    lg: "1.19rem 3rem 0rem 3rem",
    md: "2rem 2rem",
    sm: "0rem 2rem",
    xs: "0rem 0rem 0rem 0rem",
  },
  backgroundColor: "#4C8AB1",
  // marginTop: { lg: "0rem", sm: "-1rem", xs: "0rem" },
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
};

const downloadForMobBox = {
  marginTop: "3rem",
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
  marginLeft: { lg: "3rem", md: "3rem", sm: "3rem" },
  gap: "1rem",
};
const googleAppImgsMobile = {
  display: { lg: "none", md: "none", sm: "flex", xs: "none" },
  justifyContent: "center",
  alignItems: "center",
  marginTop: "1rem",
  gap: "1rem",
  cursor: "pointer",
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
  gap: "1rem",
  marginBottom: "1rem",
  justifyContent: "space-between",
  alignItems:'center',
  marginTop: "2rem",
  display: "flex",
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
  marginLeft: { lg: "3rem", md: "0rem", sm: "0rem", xs: "0rem" },

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
  marginTop: { xl: "5rem", lg: "3rem", md: "2rem", sm: "0rem" },
  fontSize: { xl: "2rem", lg: "2rem", md: "1.9rem", sm: "1rem" },
  fontWeight: 400,
  lineHeight: "4.25rem",
};

const secondHeading = {
  color: "rgba(255, 255, 255, 0.80)",
  width: { lg: "31.125rem", md: "28rem", sm: "auto" },
  display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  fontSize: { xl: "2rem", lg: "1.5rem", md: "1rem", sm: "1rem" },
  fontWeight: 400,
};

const thirdHeading = {
  color: "#FFF",
  marginTop: "2rem",
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  fontSize: { xl: "2rem", lg: "1.5rem", md: "1rem", sm: "1rem" },
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
  "&:hover": {
    color: "#ffac00", // Change color on hover
  },

  // Click effect
  "&:active": {
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

export default Login;
