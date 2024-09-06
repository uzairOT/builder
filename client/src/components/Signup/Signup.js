import React, { useState, useEffect } from "react";
import GoogleLogin from "react-google-login";
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
  CircularProgress,
  Stack,
} from "@mui/material";
import builder1 from "./Assets/pngs/builderProYellowLogo.png";
import downloadForMob from "./Assets/pngs/downloadForMob.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ReactComponent as GoogleLogo } from "./Assets/svgs/GoogleIcon.svg";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import YellowBtn from "../UI/button";
import "../../App.css";
import "./Signup.css";
import axios from "axios";
//import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  useGoogleLoginMutation,
  useRegisterMutation,
} from "../../redux/apis/usersApiSlice";
import {
  setCredentials,
  setForgetPasswordEmail,
} from "../../redux/slices/authSlice";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import { signupSchemea } from "../../utils/Validation/settingsPageSchema";
import builderproicon from "../../assets/FileSvg/builderProWhite.png";
import { PhoneNumberUtil } from "google-libphonenumber";
import googlePlay from "../../assets/FileSvg/googlePlay.svg";
import appStore from "../../assets/FileSvg/appStore.svg";

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

const SignupComp = () => {
  const isLG = useMediaQuery("(min-width: 1280px)");
  const isMD = useMediaQuery("(min-width: 900px) and (max-width: 1279px)");
  const isSM = useMediaQuery("(min-width: 600px) and (max-width: 900px)");
  const isMobile = useMediaQuery("(max-width:600px)");
  const [phoneIsValid, setPhoneIsValid] = useState(true);

  const DoMobWidth = isSM ? "50%" : isMD ? "70%" : "100%";
  const widthValue = isSM ? "35%" : isMD ? "40%" : "100%";

  let heightValue;
  if (isMobile) {
    heightValue = "1rem";
  } else if (isSM) {
    heightValue = "1.2rem";
  } else if (isMD) {
    heightValue = "1.2rem";
  } else {
    heightValue = "1.8rem";
  }
  const inputStyle = {
    width: "calc(100% - 16px)",
    height: heightValue,
    marginBottom: "0.5rem",
    alignSelf: "stretch",
    padding: "8px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "12px",
    fontFamily: "var(--main-font-family)",
    paddingLeft: "-1.5rem",
  };
  const customPhoneStyles = {
    borderRadius: "12px",
    border: "1px solid #D8D8D8",
    background: "#FFF",
    width: "calc(100% - 8px)",
    // height: heightValue,
    alignSelf: "stretch",
    paddingLeft: "8px",
    height: "2.8rem",
    display: "flex",
    alignItems: "center",
    // paddingTop: "0.5rem",
    // padding: "0.5rem",
  };

  const [phone, setPhone] = useState("");
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    password: "",
  });
  const [googleLogin] = useGoogleLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);


  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };


  // const handleChange = (e) => {
  //   const { name, value } = e.target || e;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };

  const handleChecked = (e) => {
    setChecked(e.target.checked);
  };
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

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
          dispatch(setCredentials({ ...res.data }));
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1000);
        } else if (res.message === "notFound!") {
          toast.warning("User not found");
          navigate("/signup");
        } else {
          toast.warning("Something went wrong");
          navigate("/signup");
        }
      } catch (err) {
        if (err?.data?.message === "notFound!") {
          toast.warning("Please enter following information");
          navigate("/userinfo");
        } else {
          toast.warning("Something went wrong");
          //navigate("/signup");
        }

        console.log("+(+(+++", err);
        // alert("---",err?.data?.message || "---",err.error);
      }
      //
      // console.log("User data stored in localStorage:", userData);
    } else {
      console.log("Google login failed");
    }
  };
  const handleEmailChange = (e) => {
    const email = e.target.value;
    handleChange(e); // Call the original handleChange function from useFormik
    dispatch(setForgetPasswordEmail(email)); // Dispatch the action with the email value
  };
  const onSubmit = async (e) => {
    // e.preventDefault();
    if (!validate()) {
      toast.error("Your phone number is not valid");
      return;
    }
    if (checked) {
      const data = { ...values, phoneNumber: phone };
      try {
        const res = await register(data).unwrap();
        console.log("Sign up: ", res);
        // dispatch(setCredentials({ ...res }));
        // navigate("/assignproject");
        if (res.redirectTo === "verifyOtp") {
          toast.success(res.message || "Success!");
          navigate("/verifycode", { state: { data: "signup" } });
          return;
        } else if (res.success || "Success!") {
          toast.success(res.message);
          navigate("/verifycode", { state: { data: "signup" } });
        } else {
          toast.error(res.message || "Something went wrong!");
          return;
        }
        console.log("hi");
      } catch (err) {
        console.log(err);
        if (err.status === "FETCH_ERROR") {
          toast.error("Network Issues");
          return;
        }
        toast.error(err?.data?.error || err.error || "Something went wrong!");
      }
    } else {
      toast("Please agree to our terms of use and privacy policy to continue");
    }
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
      },
      validationSchema: signupSchemea,
      onSubmit,
    });

  const validate = () => {
    const newErrors = {};

    const isValid = isPhoneValid(phone);
    // Add more validation rules as needed
    setPhoneIsValid(isValid);
    // if(!isValid){
    //   newErrors.phoneNumber = 'notValid';
    // }
    // Return true if no errors
    return Object.keys(newErrors).length === 0 && isValid;
  };

  const lableResponsiveFont = { fontSize: isMobile ? "0.7rem" : "1rem" };
  const linkResponsiveColor = { color: isMobile ? "#FFAC00" : "#4C8AB1" };
  const borderRadiusResponsive = {
    borderRadius: isMobile ? "0.5rem" : "0.75rem",
  };

  useEffect(() => {
    console.log(values);
  }, [values]);
  return (
    <Grid container sx={{ ...firstGrid }}>
      <ToastContainer />
      <Grid
        item
        container
        lg={6}
        md={6}
        sm={12}
        xs={12}
        sx={{ ...SecondGrid, mt: "1rem" }}
      >
        <img
          style={{ height: "236px", width: "435px", paddingLeft: "8px" }}
          src={builderproicon}
          alt="Builder Pro"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: { xl: "0rem", lg: "0rem", md: "0rem", sm: "0rem" },
          }}
        >
          {/* <Typography sx={firstHeading}>BuilderBUILDER PRO</Typography> */}
          <Box>
            <Typography component="p" sx={secondHeading}>
              On schedule.
            </Typography>
            <Typography component="p" sx={secondHeading}>
              {" "}
              On budget.{" "}
            </Typography>

            <Typography component="p" sx={secondHeading}>
              {" "}
              On the path to building better.
            </Typography>
          </Box>
        </Box>
        {/* <Typography sx={firstHeading}>BuilderBUILDER PRO</Typography> */}

        {/* Button */}

        <Box sx={downloadForMobBox} pl={"4px"}>
          <img
            src={downloadForMob}
            width={"100%"}
            alt=""
            style={{ height: "120px" }}
          />
        </Box>
        <Box sx={googleAppImgsBox}>
          <a
            href="https://play.google.com/store/apps/details?id=com.octathorn.builder_builder_pro&pcampaignid=web_share"
            target="blank"
          >
            <img src={googlePlay} style={{ cursor: "pointer" }} alt="" />
          </a>

          <a href="https://testflight.apple.com/join/Fejy1iQ6" target="blank">
            <img src={appStore} style={{ cursor: "pointer" }} alt="" />
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
          <form
            style={{ marginTop: "0.1rem", width: "85%" }}
            onSubmit={handleSubmit}
          >
            <Box sx={logoBox}>
              <Typography sx={formHeadingStyle}>Sign up</Typography>
              <img src={builder1} width={"25%"} alt="" />
            </Box>
            <Box sx={namesFieldBox}>
              <Box sx={{ ...topSpace, width: "100%" }}>
                <label
                  style={{ ...labelStyle, ...lableResponsiveFont }}
                  htmlFor="firstName"
                >
                  First name
                </label>

                <input
                  type="text"
                  name="firstName"
                  placeholder="John"
                  style={{
                    ...inputStyle,
                    border:
                      errors.firstName && touched.firstName
                        ? "1px solid #d32f2f"
                        : "1px solid #E0E4EC",
                  }}
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Typography fontSize={"10px"} color={"#d32f2f"} mt={"-0.5rem"}>
                  {errors.firstName && touched.firstName
                    ? errors.firstName
                    : ""}
                </Typography>
              </Box>
              <Box sx={{ ...topSpace, width: "100%" }}>
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
                  placeholder="Doe"
                  style={{
                    ...inputStyle,
                    border:
                      errors.lastName && touched.lastName
                        ? "1px solid #d32f2f"
                        : "1px solid #E0E4EC",
                  }}
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Typography fontSize={"10px"} color={"#d32f2f"} mt={"-0.5rem"}>
                  {errors.lastName && touched.lastName ? errors.lastName : ""}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ marginTop: "0.5rem" }}>
              <label
                style={{
                  ...labelStyle,
                  fontSize: isMobile ? "0.8rem" : "1rem",
                }}
                htmlFor="email"
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                style={{
                  ...inputStyle,
                  fontFamily: "var(--main-font-family)",
                  paddingLeft: "-1.5rem",
                  fontSize: isMobile ? "0.8rem" : "1rem",
                  border:
                    errors.email && touched.email
                      ? "1px solid #d32f2f"
                      : "1px solid #E0E4EC",
                }}
                placeholder="JohnDoe@gmail.com"
                value={values.email}
                // onChange={handleChange}
                onChange={handleEmailChange}
                onBlur={handleBlur}
              />
              <Typography fontSize={"10px"} color={"#d32f2f"} mt={"-0.5rem"}>
                {errors.email && touched.email ? errors.email : ""}
              </Typography>
            </Box>

            <Box sx={{ marginTop: "0.5rem" }}>
              <label
                style={{
                  ...labelStyle,
                  fontSize: isMobile ? "0.8rem" : "1rem",
                  paddingTop: "5px",
                }}
                htmlFor="phone"
              >
                Phone number
              </label>

              <PhoneInput
                disableDialCodePrefill
                style={{ ...customPhoneStyles }}
                defaultCountry=""
                name={"phoneNumber"}
                value={phone}
                onBlur={(e) => {
                  handleBlur(e);
                  validate(phone);
                }}
                onChange={(phone) => setPhone(phone)}
                countrySelectorStyleProps={{
                  style: {
                    "--react-international-phone-country-selector-background-color":
                      "#EDF2F6",
                    "--react-international-phone-country-selector-background-color-hover":
                      "#EDF2F6",
                  },
                  buttonStyle: {
                    filter: "none",
                  },
                }}
                inputStyle={{ ...customeInputStyles }}
                inputProps={{
                  border: "none",
                  placeholder: "+1 (123) 456-7890",
                }}
                required
              />

              {!phoneIsValid && (
                <Box>
                  <Typography
                    sx={{
                      color: "#d32f2f",
                      fontSize: "12px",
                      marginLeft: "14px",
                      marginRight: "14px",
                      marginTop: "3px",
                      fontFamily: "var(--main-font-family)",
                    }}
                  >
                    Phone is not valid
                  </Typography>
                </Box>
              )}
            </Box>

            <Box sx={{ marginTop: "0.5rem" }}>
              <label
                style={{
                  ...labelStyle,
                  fontSize: isMobile ? "0.8rem" : "1rem",
                }}
                htmlFor="company"
              >
                Company name
              </label>
              <input
                type="text"
                name="company"
                placeholder="BuilderBUILDER PRO"
                style={{
                  ...inputStyle,
                  border:
                    errors.company && touched.company
                      ? "1px solid #d32f2f"
                      : "1px solid #E0E4EC",
                }}
                value={values.company}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Typography fontSize={"10px"} color={"#d32f2f"} mt={"-0.5rem"}>
                {errors.company && touched.company ? errors.company : ""}
              </Typography>
            </Box>

            <Box sx={{ marginTop: "0.5rem" }}>
              <label
                style={{
                  ...labelStyle,
                  fontSize: isMobile ? "0.8rem" : "1rem",
                  paddingTop: "5px",
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
                  placeholder="Enter your password"
                  style={{
                    ...inputStyle,
                    border:
                      errors.password && touched.password
                        ? "1px solid #d32f2f"
                        : "1px solid #E0E4EC",
                  }}
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Typography fontSize={"10px"} color={"#d32f2f"} mt={"-0.5rem"}>
                  {errors.password && touched.password ? errors.password : ""}
                </Typography>
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
                  paddingTop: "5px",
                }}
                htmlFor="confirmPassword"
              >
                Confirm password
              </label>
              <Box style={{ position: "relative" }}>
                <input
                  placeholder="Confirm your password"
                  style={{
                    ...inputStyle,
                    border:
                      errors.confirmPassword && touched.confirmPassword
                        ? "1px solid #d32f2f"
                        : "1px solid #E0E4EC",
                  }}
                  type={passwordVisible ? "text" : "password"}
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Typography fontSize={"10px"} color={"#d32f2f"} mt={"-0.5rem"}>
                  {errors.confirmPassword && touched.confirmPassword
                    ? errors.confirmPassword
                    : ""}
                </Typography>
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

            <Box sx={linkBox}>
              <Checkbox
                id="agreeTerms"
                sx={{
                  "&.Mui-checked": {
                    color: "#4C8AB1",
                  },
                }}
                value={checked}
                onChange={handleChecked}
              />

              <label htmlFor="agreeTerms" style={checkBoxText}>
                <label style={{ fontSize: "11px" }}>
                  By creating an account, I agree to{" "}
                  <Link
                    onClick={() => {
                      openInNewTab("/terms");
                    }}
                    style={{
                      ...linkStyle,
                      ...lableResponsiveFont,
                      fontSize: "11px",
                      textDecoration: "none",
                    }}
                  >
                    Terms of use
                  </Link>{" "}
                  and{" "}
                  <Link
                    onClick={() => {
                      openInNewTab("/privacypolicy");
                    }}
                    style={{
                      ...linkStyle,
                      ...lableResponsiveFont,
                      fontSize: "11px",
                      textDecoration: "none",
                    }}
                  >
                    Privacy Policy
                  </Link>
                </label>
              </label>
            </Box>
            <Stack alignItems={"center"} justifyContent={"center"}>
              <Button
                sx={{
                  ...YellowBtn,
                  marginBottom: "1rem",
                  width: { lg: "19rem", md: "19rem", sm: "19rem", xs: "100%" },
                }}
                type="submit"
                onClick={handleSubmit}
              >
                {isLoading ? <CircularProgress size="18px" /> : "Sign up"}
              </Button>
              <Typography sx={alreadyHaveAccountTypo}>
                Already have an account?{"\u00a0"}{" "}
                <Link
                  to="/login"
                  style={{
                    ...loginLink,
                    ...linkResponsiveColor,
                    ...lableResponsiveFont,
                    textDecoration: "none",
                  }}
                >
                  Log in
                </Link>
              </Typography>
            </Stack>

            <Box sx={continueWithBox}>
              <hr style={hrLine} />
              <Typography sx={ContinuewithTextStyle}>
                {/* {isMobile ? "Or" : "or continue with"} */}
                or
              </Typography>
              <hr style={hrLine} />
            </Box>
            <Stack alignItems={"center"} justifyContent={"center"}>
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
            </Stack>
          </form>
        </Grid>
        <Grid sx={bottomGrid}>
          <Box sx={selectLanguageBox}>
            {/* <Select defaultValue={1} sx={selectStyle}>
              <MenuItem value={1}>English (United States)</MenuItem>
              <MenuItem value={2}>French (French)</MenuItem>
              <MenuItem value={3}>Chinese (China)</MenuItem>
            </Select> */}
          </Box>
          <Box sx={{ ...hptLinksBox, cursor: "pointer", paddingBottom: "8px" }}>
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
                openInNewTab("/privacypolicy");
              }}
            >
              Privacy & Terms
            </Typography>
            {/* <Typography sx={hptLinksStyle}>Terms</Typography> */}
          </Box>
        </Grid>
        {/* <Box
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
        </Box> */}
      </Grid>
    </Grid>
  );
};
export default SignupComp;

const firstGrid = {
  padding: {
    lg: "1rem 3rem 0rem 3rem",
    md: "0.5rem 2rem",
    sm: "1rem 2rem",
    xs: "0rem 0rem 0rem 0rem",
  },
  justifyContent: "center",
  alignItems: "start",
  backgroundColor: "#4C8AB1",
  // marginTop: { lg: "0rem", sm: "0rem", xs: "0rem" },
};

const SecondGrid = {
  // marginTop:{xl:-28,lg:-28,sm:0, xs:0,md:0},
  gap: { xl: "4.5rem", lg: "3.5rem", md: "3.5rem", sm: "1rem", xs: "1rem" },
  alignItems: { lg: "center", md: "center", sm: "center", xs: "center" },
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
  // marginTop: "3rem",
  display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
  // marginLeft: { lg: "2.5rem", md: "-1rem", sm: "-3rem" },
  justifyContent: "center",
  alignItems: "center",
};
const googleAppImgsBox = {
  display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
  justifyContent: "center",
  alignItems: "center",
  marginTop: "1rem",
  marginLeft: { lg: "0rem", md: "-3rem", sm: "-3rem" },
  gap: "1rem",
};
const googleAppImgsMobile = {
  display: { lg: "none", md: "none", sm: "flex", xs: "none" },
  justifyContent: "center",
  alignItems: "center",
  marginTop: "1rem",
  marginLeft: { lg: "0rem", md: "-3rem", sm: "0rem" },
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
  justifyContent: "center",
  alignItems: "center",
  // padding: "25px 0 0 0",
  // marginTop: { sm: "0", md: "0", lg: "0rem", xl: "1rem" },
  // paddingLeft: { lg: "1rem", md: "2rem", sm: "1rem", xs: "1rem" },
  // paddingRight: { lg: "1rem", md: "2rem", sm: "2rem", xs: "2rem" },
  // marginLeft: { lg: "1rem", md: "2rem", sm: "0rem", xs: "0rem" },
  borderRadius: { lg: "1.5rem", md: "1.5rem", sm: "1.5rem", xs: "0rem" },
  width: { lg: "80%", md: "90%", sm: "85%", xs: "100%" },
};

const logoBox = {
  marginBottom: "1rem",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "1rem",
  display: "flex",
};
const namesFieldBox = {
  display: "flex",
  justifyContent: "space-between",
  gap: "2rem",
  marginBottom: "0.3rem",
};

const subtitleStyle = {
  color: "#202227",
  fontFamily: "var(--main-font-family)",
  fontSize: "0.75rem",
  fontWeight: 400,
  marginBottom: "0.2rem",
  marginTop: "0.2rem",
};
const passwordEyeBox = {
  position: "absolute",
  top: "45%",
  right: "10px",
  transform: "translateY(-50%)",
  cursor: "pointer",
  opacity: "50%",
  display: "flex",
  alignItems: "center",
};
const linkBox = {
  display: "flex",
  paddingBottom: "1rem",
  marginLeft: "-0.5rem",
  color: "#202227",
  fontFamily: "var(--main-font-family)",
  fontSize: "1rem",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
};
const linkStyle = {
  color: "#4C8AB1",
  fontFamily: "var(--main-font-family)",
  fontWeight: 600,
  lineHeight: "normal",
  width: "100%",
};
const checkBox = {
  "&.Mui-checked": {
    color: "#4C8AB1",
  },
};

const checkBoxText = {
  gap: 3,
  display: "flex",
  marginTop: "0.8rem",
  fontSize: { lg: "11px", md: "11px", sm: "0.8rem", xs: "0.75rem" },
};
const alreadyHaveAccountTypo = {
  color: "#202227",
  fontFamily: "var(--main-font-family)",
  fontSize: { lg: "1rem", md: "1rem", sm: "0.9rem", xs: "0.8rem" },
  fontWeight: 400,
  lineHeight: "normal",
  display: "flex",
  justifyContent: { lg: "start", md: "start", sm: "start", xs: "center" },
  marginTop: "1rem",
};

const loginLink = {
  fontWeight: 600,
  fontFamily: "var(--main-font-family)",
};

const continueWithBox = {
  // position: "relative",
  display: "flex",
  flexDirection: "row",
  marginTop: {
    lg: "1.5rem",
    md: "1.5rem",
    sm: "1.5rem",
    xs: "2rem",
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
  fontFamily: "var(--main-font-family)",
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
  fontFamily: "var(--main-font-family)",
  display: { lg: "flex", md: "flex", sm: "flex", xs: "none" },
  // marginTop: "1rem",
  fontSize: { xl: "2rem", lg: "2rem", md: "1.9rem", sm: "1rem" },
  fontWeight: 400,
  lineHeight: "4.25rem",
};

const secondHeading = {
  ml: 10,
  textAlign: "left",
  color: "rgba(255, 255, 255, 0.80)",
  // width: { lg: "31.125rem", md: "28rem", sm: "auto" },
  display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
  fontFamily: "var(--main-font-family)",
  fontSize: { xl: "1.5rem", lg: "1.5rem", md: "1.5rem", sm: "1rem" },
  fontWeight: 400,
};

const thirdHeading = {
  color: "#FFF",
  fontFamily: "var(--main-font-family)",
  marginTop: "1rem",
  display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
  fontSize: { xl: "2rem", lg: "1.5rem", md: "1rem", sm: "1rem" },
  fontWeight: 400,
};

const formHeadingStyle = {
  color: "#4C8AB1",
  textAlign: "center",
  fontFamily: "var(--main-font-family)",
  fontSize: "2.1875rem",
  fontWeight: 700,
  lineHeight: "normal",
  alignSelf: "center",
};

const customeInputStyles = {
  width: "85%",
  border: "none",
  padding: "0px 10px 0px 0px",
};

const placeholderStyle = {
  color: "#B8B8B8",
  fontFamily: "var(--main-font-family)",
  fontSize: "1rem",
  paddingLeft: "0.5rem",
  fontWeight: 400,
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  color: "#202227",
  fontFamily: "var(--main-font-family)",
  fontSize: "1rem",
  fontWeight: 400,
  lineHeight: "normal",
};

const hptLinksStyle = {
  color: "#FFF",
  fontSize: { lg: "1rem", md: "0.9rem", sm: "0.8rem" },
  fontFamily: "var(--main-font-family)",
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
  display: "flex",
  flexDirection: "row",
  marginBottom: { lg: "3rem", sm: "3rem", xs: "1rem" },
  marginTop: "1.5rem",
  borderRadius: { lg: "2.5rem", md: "2.5rem", sm: "2.5rem", xs: "0.5rem" },
  border: "1px solid rgba(6, 32, 72, 0.11)",
  background: "#FFF",
  color: "#333",
  fontFamily: "var(--main-font-family)",
  width: { lg: "19rem", md: "19rem", sm: "19rem", xs: "100%" },
  fontSize: { lg: "1.1rem", md: "1.1rem", sm: "1rem", xs: "0.9rem" },
  fontWeight: 400,
  lineHeight: "normal",
  cursor: "pointer",
  padding: {
    lg: "0.96875rem 2rem",
    md: "0.96875rem 1rem",
    sm: "0.8rem 1rem",
    xs: "0.96875rem 2rem",
  },
  justifyContent: "center",
  alignItems: "center",
  textTransform: "none",
};

const ContinuewithTextStyle = {
  color: "#202227",
  fontFamily: "var(--main-font-family)",
  fontSize: { lg: "0.875rem", md: "0.875rem", sm: "0.875rem", xs: "0.875rem" },
  fontWeight: 400,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  whiteSpace: "nowrap",
  // marginTop: "-1.2rem",
  // position: "absolute",
  // left: { lg: "17%", md: "20%", sm: "30%", xs: "50%" },
  // transform: "translateX(-50%)",
  backgroundColor: "#FFFFFF",
  padding: "0 10px",
  // textAlign:'center'
};

const buttonBox = {
  display: "flex",
  justifyContent: { lg: "start", md: "start", sm: "start", xs: "center" },
  alignItems: { lg: "start", md: "start", sm: "start", xs: "center" },
  width: { lg: "auto", md: "auto", sm: "auto", xs: "100%" },
  // border: "2px solid red"
};
const topSpace = {
  marginTop: "0.2rem",
};
