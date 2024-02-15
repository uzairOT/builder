import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { Box, Grid, Typography, Checkbox, useMediaQuery, Button, MenuItem, Select } from '@mui/material';
import builder1 from "./Assets/pngs/builderProYellowLogo.png";
import downloadForMob from "./Assets/pngs/downloadForMob.png";
import googlePlay from "./Assets/pngs/googlePlay.png";
import appStore from "./Assets/pngs/appStore.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ReactComponent as GoogleLogo } from "./Assets/svgs/GoogleIcon.svg"
import { PhoneInput } from 'react-international-phone';
import "react-international-phone/style.css";
import YellowBtn from '../UI/button';
import GTWalsheimTrial from "../../assets/fonts/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf"
import "./Signup.css"


const SignupComp = () => {



    const Navigate = useNavigate()
    const signUpHandler = () => {
        Navigate("./assignproject")
    }
    // const isLG = useMediaQuery("(min-width: 1280px)");
    const isMD = useMediaQuery("(min-width: 900px) and (max-width: 1279px)");
    const isSM = useMediaQuery("(min-width: 600px) and (max-width: 900px)");
    const isMobile = useMediaQuery('(max-width:600px)');

    const DoMobWidth = isSM
        ? "50%"
        : isMD
            ? "70%"
            : "100%"
    const widthValue = isSM
        ? "35%"
        : isMD
            ? "40%"
            : "100%"


    const lableResponsiveFont = { fontSize: isMobile ? "0.7rem" : "1rem" }
    const linkResponsiveColor = { color: isMobile ? '#FFAC00' : '#4C8AB1' }
    const borderRadiusResponsive = { borderRadius: isMobile ? "0.5rem" : "0.75rem" }
    const [phone, setPhone] = useState('');


    const [passwordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState('');
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };



    return (
        <Grid
            container

            sx={firstGrid}
        >
            <Grid
                item
                container
                lg={6}
                md={6}
                sm={12}
                xs={12}
                sx={SecondGrid}
            >
                <Typography
                    sx={firstHeading}
                >
                    Construction Management
                </Typography>

                {/* Button */}

                <Typography
                    component="p"
                    sx={secondHeading}
                >
                    On schedule. On budget. On the path to building better.
                </Typography>
                <Typography
                    sx={thirdHeading}
                >
                    Create an account
                </Typography>
                <Box sx={downloadForMobBox} >
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
                        <Typography sx={formHeadingStyle}>
                            Signup
                        </Typography>
                        <img src={builder1} width={"20%"} alt="" />

                    </Box >
                    <form style={{ marginTop: "0.1rem" }}>
                        <Box sx={namesFieldBox}>
                            <Box sx={topSpace}>
                                <label style={{ ...labelStyle, ...lableResponsiveFont }}
                                    htmlFor="firstName">First name</label>
                                <input type="text" id="firstName" style={{ ...inputStyle, ...borderRadiusResponsive }} />
                            </Box>
                            <Box sx={topSpace}>
                                <label style={{ ...labelStyle, ...lableResponsiveFont }} htmlFor="lastName">Last name</label>
                                <input type="text" id="lastName" style={{ ...inputStyle, ...borderRadiusResponsive }} />
                            </Box>
                        </Box>

                        <Box sx={topSpace}>
                            <label style={{ ...labelStyle, ...lableResponsiveFont }} htmlFor="email">Email address</label>
                            <input type="email" id="email" style={{ ...inputStyle, ...placeholderStyle, ...lableResponsiveFont, ...borderRadiusResponsive }} placeholder="workemail@gmail.com" />
                        </Box>

                        <Box sx={topSpace}>
                            <label style={{ ...labelStyle, ...lableResponsiveFont }} htmlFor="phone">Phone number</label>


                            <PhoneInput
                                style={{ ...customPhoneStyles, ...borderRadiusResponsive }}
                                defaultCountry="pk"
                                value={phone}
                                onChange={(phone) => setPhone(phone)}
                                inputStyle={{ ...customeInputStyles }}

                                inputProps={{
                                    border: 'none'

                                }}
                                required
                            />
                        </Box>
                        <Box sx={{ marginTop: "0.5rem" }}>
                            <label style={{ ...labelStyle, ...lableResponsiveFont }} htmlFor="company">Company Name</label>
                            <input type="text" id="company" style={{ ...inputStyle, ...borderRadiusResponsive }} />
                        </Box>
                        <Box sx={topSpace}>
                            <label style={{ ...labelStyle, ...lableResponsiveFont }} htmlFor="password">Password</label>

                            {!isMobile && (
                                <Box sx={subtitleStyle}>
                                    Use 8 or more characters with a mix of letters, numbers & symbols
                                </Box>
                            )}

                            <Box style={{ position: 'relative' }}>
                                <input
                                    style={{ ...inputStyle, ...borderRadiusResponsive }}
                                    type={passwordVisible ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <Box
                                    style={passwordEyeBox}
                                    onClick={togglePasswordVisibility}
                                >
                                    {passwordVisible ? <VisibilityOff /> : <Visibility />}
                                    {!isMobile && (
                                        <span style={{ marginLeft: '5px', }}>
                                            {passwordVisible ? 'Hide' : 'Show'}
                                        </span>
                                    )}
                                </Box>
                            </Box>

                            {isMobile && (
                                <Box sx={subtitleStyle}>
                                    Use 8 or more characters with a mix of letters, numbers & symbols
                                </Box>
                            )}
                        </Box>

                        <Box sx={linkBox}>
                            <Checkbox id="agreeTerms" sx={checkBox} />
                            <Typography htmlFor="agreeTerms" sx={checkBoxText}>
                                By creating an account, I agree to our <Link style={{ ...linkStyle, ...lableResponsiveFont }}>Terms of use</Link> and <Link style={{ ...linkStyle, ...lableResponsiveFont }} >Privacy Policy</Link>
                            </Typography>
                        </Box>
                        <Box sx={buttonBox}>
                            <Button sx={{ ...YellowBtn, marginBottom: "1rem" }}
                                type="submit" onClick={signUpHandler}>Sign up</Button>
                        </Box>
                        <Typography sx={alreadyHaveAccountTypo}>
                            Already have an account?{'\u00a0'} <Link to="./login" style={{
                                ...loginLink,
                                ...linkResponsiveColor,
                                ...lableResponsiveFont
                            }}>

                                Log in</Link>

                        </Typography>
                        <Box sx={continueWithBox}>
                            <hr
                                style={hrLine}
                            />
                            <Typography
                                sx={ContinuewithTextStyle}
                            >
                                {isMobile ? 'Or' : 'or continue with'}
                            </Typography>
                        </Box>
                        <Box sx={buttonBox}>
                            <Button sx={{ ...googleBtnStyle, marginBottom: "3.4rem", marginTop: "2rem" }} type="button"><GoogleLogo style={{ marginRight: "1rem" }} /> {isMobile ? 'Google' : 'Continue with Google'}</Button>
                        </Box>
                    </form>
                </Grid>
                <Grid sx={bottomGrid}>
                    <Box sx={selectLanguageBox}>
                        <Select
                            defaultValue={1}
                            sx={selectStyle}
                        >
                            <MenuItem value={1}>English (United States)</MenuItem>
                            <MenuItem value={2}>French (French)</MenuItem>
                            <MenuItem value={3}>Chinese (China)</MenuItem>
                        </Select>

                    </Box>
                    <Box sx={hptLinksBox}>
                        <Typography sx={hptLinksStyle}>
                            Help
                        </Typography>
                        <Typography sx={hptLinksStyle}>
                            Privacy
                        </Typography>
                        <Typography sx={hptLinksStyle}>
                            Terms
                        </Typography>

                    </Box>

                </Grid>

                <Box sx={googleAppImgsMobile}>
                    <img src={googlePlay} width={widthValue} alt="" />
                    <img src={appStore} width={widthValue} alt="" />
                </Box>
            </Grid>
        </Grid >


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
    backgroundColor: '#4C8AB1',
    marginTop: { lg: "0rem", sm: "-1rem", xs: "-1rem" },

    // paddingTop: { xs: "-10rem" }
    // border: "2px solid red",
}

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
}

const downloadForMobBox = {
    marginTop: "14rem",
    marginLeft: { lg: "2.5rem", md: "-1rem", sm: "-3rem" },
    display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
    justifyContent: "center",
    alignItems: "center"
}
const googleAppImgsBox = {
    display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2rem",
    marginLeft: { lg: "0rem", md: "-3rem", sm: "-3rem" },
    gap: "1rem"
}
const googleAppImgsMobile = {
    display: { lg: "none", md: "none", sm: "flex", xs: "none" },
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1rem",
    marginLeft: { lg: "0rem", md: "-3rem", sm: "0rem" },
    gap: "1rem"
}


const formGridContainer = {
    display: "flex",
    flexDirection: "column",
    // border: "2px solid blue",
    justifyContent: { xs: "center" },
    alignItems: { xs: "center" },

}

const formGrid = {
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    marginTop: "1rem",
    paddingLeft: { lg: "2rem", md: "2rem", sm: "1rem", xs: "1rem" },
    paddingRight: { lg: "6rem", md: "3rem", sm: "2rem", xs: "2rem" },

    marginLeft: { lg: "6rem", md: "2rem", sm: "0rem", xs: "0rem" },

    borderRadius: { lg: '1.5rem', md: "1.5rem", sm: "1.5rem", xs: "0rem" },
    width: { lg: '80%', md: "90%", sm: "85%", xs: "100%" }
}

const logoBox = {
    gap: "7rem",
    marginBottom: "0.3rem",
    justifyContent: "space-evenly",
    marginTop: "1rem",
    display: { lg: "none", md: "none", sm: "none", xs: "flex" },
}
const namesFieldBox = {
    display: "flex",
    justifyContent: "space-between",
    gap: "2rem",
    marginBottom: "0.3rem",
}

const subtitleStyle = {
    color: '#202227',
    fontFamily: GTWalsheimTrial,
    fontSize: '0.75rem',
    fontWeight: 400,
    marginBottom: '0.2rem',
    marginTop: "0.2rem"

}
const passwordEyeBox = {
    position: 'absolute',
    top: '40%',
    right: '10px',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    opacity: '50%',
    display: 'flex',
    alignItems: 'center',
}
const linkBox = {
    display: 'flex',
    paddingBottom: '1rem',
    marginLeft: '-0.5rem',
    color: '#202227',
    fontFamily: 'Poppins',
    fontSize: '1rem',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
}
const linkStyle = {
    color: '#4C8AB1',
    fontFamily: 'Poppins',
    fontWeight: 600,
    lineHeight: 'normal',
    width: "100%",
}
const checkBox = {
    '&.Mui-checked': {
        color: '#4C8AB1',
    },
}

const checkBoxText = {
    marginTop: "0.5rem",
    fontSize: { lg: "1rem", md: "0.9rem", sm: "0.8rem", xs: "0.75rem" },
}
const alreadyHaveAccountTypo = {
    color: '#202227',
    fontFamily: GTWalsheimTrial,
    fontSize: { lg: "1rem", md: "1rem", sm: "0.9rem", xs: "0.8rem" },
    fontWeight: 400,
    lineHeight: 'normal',
    display: "flex",
    justifyContent: { lg: "start", md: "start", sm: "start", xs: "center" },
    marginTop: "1rem",
}


const loginLink = {
    fontWeight: 600,
    fontFamily: GTWalsheimTrial,
}


const continueWithBox = {
    position: "relative",
    marginTop: {
        lg: "2.5rem",
        md: "2.5rem",
        sm: "2.5rem",
        xs: "3rem",
    },
}
const hrLine = {
    width: '100%',
    border: 0,
    height: '2px',
    backgroundColor: 'rgba(32, 34, 39, 0.12)',
}

const bottomGrid = {
    display: { lg: "flex", md: "flex", sm: "flex", xs: "none" },
    flexDirection: "row",
    // border: "2px solid red",
    justifyContent: "space-between",
    marginLeft: { lg: "6rem", md: "2rem", sm: "0rem", xs: "0rem" },
    marginRight: { lg: "0rem", md: "4rem", sm: "0rem", xs: "0rem" },
    // marginRight: "2rem",
    width: { lg: '80%', md: "70%", sm: "100%", xs: "100%" },
    gap: { lg: '1rem', md: "3rem", sm: "3rem" },
}
const selectLanguageBox = {
    display: "flex",
    justifyContent: "flex-start",
    // border: "2px solid red",
    backgroundColor: "#4C8AB1",

}
const selectStyle = {
    '&.MuiSelect-selectMenu': {
        paddingY: '12px', // Adjust padding to center text vertically
    },
    '& .MuiSelect-icon': {
        color: 'white', // Set the arrow color to white
    },
    '&:before': {
        border: 'none', // Hide the before border
    },
    '&:after': {
        border: 'none', // Hide the after border
    },
    '&:hover:not(.Mui-disabled):before': {
        border: 'none', // Hide the hover border
    },
    boxShadow: 'none',
    '.MuiOutlinedInput-notchedOutline': { border: 0 },
    color: 'white',
    border: "none",
    fontFamily: 'GT Walsheim Trial',
    fontSize: '1rem',
    fontWeight: '400',
    lineHeight: 'normal',
}

const hptLinksBox = {
    display: "flex",
    justifyContent: "center",

    marginTop: "1rem",
    gap: "1.5rem",
    // border: "2px solid red",
}

const firstHeading = {
    color: '#FFF',
    fontFamily: GTWalsheimTrial,
    display: { lg: "flex", md: "flex", sm: "flex", xs: "none" },
    marginTop: "1rem",
    fontSize: { lg: '2.9375rem', md: "2rem", sm: "1.5rem" },
    fontWeight: 400,
    lineHeight: '4.25rem',
}

const secondHeading = {
    color: 'rgba(255, 255, 255, 0.80)',
    width: { lg: "31.125rem", md: "28rem", sm: "auto" },
    marginTop: "0.5rem",
    display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
    fontFamily: GTWalsheimTrial,
    fontSize: { lg: '2rem', md: "1.5rem", sm: "1.2rem" },
    fontWeight: 400,

}

const thirdHeading = {
    color: '#FFF',
    fontFamily: GTWalsheimTrial,
    marginTop: "1rem",
    display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
    fontSize: { lg: '2rem', md: "1.5rem", sm: "1.2rem" },
    fontWeight: 400,
}



const formHeadingStyle = {
    color: '#4C8AB1',
    textAlign: 'center',
    fontFamily: GTWalsheimTrial,
    fontSize: '2.1875rem',
    fontWeight: 700,
    lineHeight: 'normal',
}

const customeInputStyles = {
    width: "100%", border: "none", padding: '8px',
}
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
    width: '100%',
    height: "2rem",
    marginBottom: '0.5rem',
    alignSelf: "stretch",
    padding: '8px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '12px',
    fontFamily: GTWalsheimTrial,
    paddingLeft: "-1.5rem",
};

const placeholderStyle = {
    color: '#B8B8B8',
    fontFamily: GTWalsheimTrial,
    fontSize: "1rem",
    paddingLeft: "0.5rem",
    fontWeight: 400,

};

const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    color: '#202227',
    fontFamily: GTWalsheimTrial,
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 'normal',
}

const hptLinksStyle = {
    color: '#FFF',
    fontSize: { lg: '1rem', md: "0.9rem", sm: "0.8rem" },
    fontFamily: GTWalsheimTrial,
    fontWeight: 400,
    lineHeight: 'normal',
}

const googleBtnStyle = {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '0.5rem',
    marginTop: '1.5rem',
    borderRadius: '2.5rem',
    border: '1px solid rgba(6, 32, 72, 0.11)',
    background: '#FFF',
    color: '#333',
    fontFamily: GTWalsheimTrial,
    fontSize: { lg: '1.25rem', md: "1.25rem", sm: "1.1rem", xs: "1rem" },
    fontWeight: 400,
    lineHeight: 'normal',
    cursor: 'pointer',
    width: { lg: 'auto', md: "auto", sm: "auto", xs: "100%" },
    padding: { lg: '0.96875rem 2rem', md: '0.96875rem 1rem', sm: '0.8rem 1rem', xs: '0.96875rem 2rem' },
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'none',
}

const ContinuewithTextStyle = {
    color: '#202227',
    fontFamily: GTWalsheimTrial,
    fontSize: { lg: "0.875rem", md: "0.875rem", sm: "0.875rem", xs: "0.875rem" },
    fontWeight: 400,
    display: "flex",
    justifyContent: "start",
    marginTop: "-1.2rem",
    position: 'absolute',
    left: { lg: '17%', md: "20%", sm: "30%", xs: "50%" },
    transform: 'translateX(-50%)',
    backgroundColor: '#FFFFFF',
    padding: '0 10px',
}


const buttonBox = {
    display: "flex",
    justifyContent: { lg: "start", md: "start", sm: "start", xs: "center" },
    alignItems: { lg: "start", md: "start", sm: "start", xs: "center" },
    width: { lg: 'auto', md: 'auto', sm: 'auto', xs: '100%' },
    // border: "2px solid red"
}
const topSpace = {
    marginTop: "0.2rem"
}




export default SignupComp;

