import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid, Typography, Checkbox, TextField, FormControl, InputLabel, NativeSelect, useMediaQuery, Button, MenuItem, Select } from '@mui/material';
import builder1 from "../SignupComp/Assets/pngs/builderPro1.png";
import builder2 from "../SignupComp/Assets/pngs/builderpro22.png";
import builder2Tab from "../SignupComp/Assets/pngs/builderpro2Tab.png";
import builder2Mob from "../SignupComp/Assets/pngs/builderpro2Mob.png";
import downloadForMob from "../SignupComp/Assets/pngs/downloadForMob.png";
import googlePlay from "../SignupComp/Assets/pngs/googlePlay.png";
import appStore from "../SignupComp/Assets/pngs/appStore.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ReactComponent as GoogleLogo } from "../SignupComp/Assets/svgs/GoogleLogo.svg"

import YellowBtn from '../Ui/button';
import GTWalsheimTrial from "../../assets/fonts/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf"


const LoginComp = () => {

    const isLG = useMediaQuery("(min-width: 1280px)");
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









    const [phone, setPhone] = useState('');
    const [showImage, setShowImage] = useState(false);
    const [showNewImage, setShowNewImage] = useState(false);
    const [showSignupScreen, setShowSignupScreen] = useState(false);


    const [passwordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState('');
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const getBuilderImage = () => {
        // Get the current window width
        const windowWidth = window.innerWidth;

        // Choose the appropriate image based on the window width
        if (windowWidth >= 900) {
            return builder2; // Large screen view
        } else if (windowWidth >= 600) {
            return builder2Tab; // Tablet view
        } else {
            return builder2Mob; // Mobile view
        }
    };

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setShowImage(true);
        }, 2000);
        const timer2 = setTimeout(() => {
            setShowNewImage(true);
        }, 3000);
        const timer3 = setTimeout(() => {
            setShowSignupScreen(true);
        }, 4500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);





    return (
        <div className='Boxx'>
            <Box
                sx={{
                    display: 'flex',
                    // contain: "content",
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: { lg: '100vh', md: "100vh", sm: "100vh", xs: "100vh" },
                    // height: "100%",
                    width: '100wh',
                    backgroundColor: showNewImage ? '#4C8AB1' : '#FFF',
                    transition: 'background-color 1s ease-in-out',

                    overflow: 'hidden',

                    // border: "2px solid black"
                }}
            >
                <Box
                    sx={{
                        transition: 'transform 1s ease-in-out, opacity 1s ease-in-out',
                        transform: showImage ? 'scale(0.2)' : 'scale(1)',
                        opacity: showNewImage ? 0 : 1,
                        display: showNewImage ? 'none' : 'block',
                    }}
                >
                    {showImage && (
                        <img
                            src={builder1}
                            alt="Your Image"
                            style={{ width: '100%', height: '100%' }}
                        />
                    )}
                </Box>

                <Box
                    sx={{
                        transition: 'transform 1s ease-in-out, opacity 1s ease-in-out',
                        transform: showNewImage ? 'scale(1)' : 'scale(0.2)',
                        opacity: showSignupScreen ? 0 : 1,
                        display: showSignupScreen ? 'none' : 'block',

                    }}
                >
                    {showNewImage && (
                        <img
                            src={getBuilderImage()}
                            alt="Your New Image"
                            style={{ width: '100%', height: '100%', overflow: "hidden" }}
                        />
                    )}
                </Box>

                {showSignupScreen && (
                    <Grid
                        container
                        sx={{
                            padding: {
                                lg: "0rem 3rem",
                                md: "0rem 2rem",
                                sm: "1rem 2rem",
                                xs: "0rem 0rem 0rem 0rem",
                            },
                            // paddingTop: { xs: "-10rem" }
                            // border: "2px solid red",


                        }}
                    >
                        <Grid
                            item
                            container
                            lg={6}
                            md={6}
                            sm={6}
                            xs={12}
                            sx={{
                                gap: { lg: "1.1rem", sm: "1rem", xs: "1rem" },
                                alignItems: { lg: "start", md: "start", sm: "start", xs: "center" },
                                justifyContent: {
                                    lg: "start",
                                    md: "start",
                                    sm: "start",
                                    xs: "center",
                                },
                                display: { lg: "flex", md: "flex", sm: "flex", xs: "none" },
                                flexDirection: "column",

                            }}
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
                            <Box sx={{
                                marginTop: "10rem",
                                marginLeft: { lg: "2.5rem", md: "-1rem", sm: "-3rem" },
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }} >
                                <img src={downloadForMob} width={DoMobWidth} alt="" />
                            </Box>
                            <Box sx={{

                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "1rem",
                                marginLeft: { lg: "0rem", md: "-3rem", sm: "-3rem" },
                                gap: "1rem"
                            }}>
                                <img src={googlePlay} width={widthValue} alt="" />
                                <img src={appStore} width={widthValue} alt="" />
                            </Box>
                        </Grid>
                        <Grid

                            justifyContent="space-between"
                            xs={12}
                            sm={6}
                            md={6}
                            lg={6}
                            sx={{
                                display: "flex",
                                flexDirection: "column",





                                // border: "2px solid blue",
                                justifyContent: { xs: "center", },
                                alignItems: { xs: "center", }

                            }}
                        >

                    
                            <Grid item sx={{
                                backgroundColor: '#fff',
                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                                flexDirection: 'column',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '20px',
                                paddingRight: "2rem",
                                

                                marginLeft: { lg: "1rem", md: "1rem", sm: "0rem", xs: "0rem" },

                                borderRadius: {lg:'1.5rem',md:"1.5rem",sm:"1.5rem",xs:"0rem"},
                                width: { lg: '80%', md: "90%", sm: "100%", xs: "100%" }
                            }}>
                                <Box  sx={{                  
                                    gap: "7rem",
                                    marginBottom: "8rem",
                                    justifyContent: "space-evenly",
                                    marginTop: "1rem",
                                    display: { lg: "none", md: "none", sm: "none", xs: "flex" },

                                }}>
                                    <Typography sx={formHeadingStyle}>
                                        Login
                                    </Typography>
                                    <img src={builder1} width={"20%"} alt="" />

                                </Box >
                                <form style={{ marginTop: "1rem" }}>
                            

                                    <Box sx={{marginTop:"0.5rem"}}>
                                        <label style={{...labelStyle, fontSize: isMobile ? "0.8rem" : "1rem"}} htmlFor="email">Email address</label>
                                        <input type="email" id="email" style={{...inputStyle, ...placeholderStyle, fontSize: isMobile ? "0.8rem" : "1rem" }} placeholder="workemail@gmail.com" />
                                    </Box>




                                    <Box sx={{marginTop:"0.5rem",width:"100%"}}>
                                        <label style={{...labelStyle, fontSize: isMobile ? "0.8rem" : "1rem", width:"100%"}} htmlFor="password">Password</label>


                                        <Box sx={{ position: 'relative',  }}>
                                            <input
                                            style={{...inputStyle, height:"2.2rem", width:"100%"}}
                                                type={passwordVisible ? 'text' : 'password'}
                                                id="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />

                                            <Box
                                                style={{
                                                    position: 'absolute',
                                                    top: '45%',
                                                    right: '10px',
                                                    transform: 'translateY(-50%)',
                                                    cursor: 'pointer',
                                                    opacity: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                                onClick={togglePasswordVisibility}
                                            >
                                                {passwordVisible ? <VisibilityOff /> : <Visibility />}
                                                {!isMobile && (
                                                    <span style={{ marginLeft: '5px',  marginBottom:"3px" }}>
                                                        {passwordVisible ? 'Hide' : 'Show'}
                                                    </span>
                                                )}
                                            </Box>
                                        </Box>

                                     
                                    </Box>

                                          <Box  sx={{
                                        display: "flex",
                                        gap: { lg: "10rem", md: "5rem", sm: "3.5rem", xs: "5rem" },
                                        marginBottom: {lg:"2rem",md:"2rem",sm:"2rem",xs:"3rem"}}}>
                                        <Box  sx={{ display: 'flex' }}>
                                            <Checkbox id="agreeTerms" sx={{'&.Mui-checked': {
                                            color: '#4C8AB1',
                                                   },}} />
                                            <label htmlFor="agreeTerms" style={{ marginTop: "0.7rem", fontFamily: GTWalsheimTrial, fontSize: isMobile || isSM ? "0.8rem" : "1rem" }}>
                                                Remember Me

                                            </label>
                                        </Box>
                                        <Box>
                                            <Typography sx={{
                                                color: isMobile ? '#FFAC00' : '#4C8AB1',
                                                fontFamily: GTWalsheimTrial,
                                                fontSize: { lg: "1rem", md: "1rem", sm: "0.8rem", xs: "0.8rem" },
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                lineHeight: 'normal',
                                                textDecoration: 'underline',
                                                marginTop: "1rem"
                                            }}>
                                                Forget Password ?
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Button sx={{...YellowBtn, width: { lg: '75%', md: "auto", sm: "auto", xs: "100%" },}}
                                     type="submit">{isMobile ? 'Login' : 'Log in with Email'}</Button>
                                    <Typography sx={{
                                        color: '#202227',
                                        marginBottom:{ lg: '1rem', md: "1rem", sm: "1rem", xs: "2rem" },
                                        fontFamily: GTWalsheimTrial,
                                        fontSize: { lg: "1rem", md: "1rem", sm: "0.9rem", xs: "0.8rem" },
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal',
                                        display: "flex",
                                        justifyContent: { lg: "start", md: "start", sm: "start", xs: "center" },
                                        marginTop: "1rem"
                                    }}>
                                        Don’t have an account?{'\u00a0'} <span style={{
                                           color: isMobile ? '#FFAC00' : '#4C8AB1',
                                            fontFamily: GTWalsheimTrial,
                                            fontSize: isMobile ? "0.8rem" : "1rem",
                                            fontStyle: 'normal',
                                            fontWeight: 600,
                                            lineHeight: 'normal',
                                            textDecorationLine: 'underline',
                                        }}>

                                            Sign up</span>

                                    </Typography>
                                    <Box sx={{ position: 'relative', marginTop: { lg: '2rem', md: "2rem", sm: "2rem", xs: "3rem" },  }}>
                                        <hr
                                            style={{
                                                width: '100%',
                                                border: 0,
                                                height: '2px',
                                                backgroundColor: 'rgba(32, 34, 39, 0.12)',
                                            }}
                                        />
                                        <Typography
                                            sx={ContinuewithTextStyle}
                                        >
                                            {isMobile ? 'Or' : 'Or Continue with'}
                                        </Typography>
                                    </Box>

                                    <Button sx={googleBtnStyle} type="button"><GoogleLogo style={{ marginRight: "1rem" }} /> {isMobile ? 'Google' : 'Continue with Google'}</Button>
                                </form>
                            </Grid>
                            {/* </div> */}
                         <Grid sx={{
                                display: { lg: "flex", md: "flex", sm: "flex", xs: "none" },
                                flexDirection: "row",
                                // border: "2px solid red",
                                justifyContent: "space-between",
                                 marginLeft: { lg: "6rem", md: "2rem", sm: "0rem", xs: "0rem" },
                                // marginRight: "2rem",
                               width: { lg: '80%', md: "100%", sm: "100%", xs: "100%" },
                                gap: { lg: '1rem', md: "4rem", sm:"3rem" },

                            }}>


                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                 
                                    // border: "2px solid red",

                                    backgroundColor: "#4C8AB1",

                                    
                                }}>

                             
                                    <Select
        defaultValue={1}
        sx={{
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
          border:"none",
          fontFamily: 'GT Walsheim Trial',
          fontSize: '1rem',
          fontStyle: 'normal',
          fontWeight: '400',
          lineHeight: 'normal',
        }}
      >
        <MenuItem value={1}>English (United States)</MenuItem>
        <MenuItem value={2}>French (French)</MenuItem>
        <MenuItem value={3}>Chinese (China)</MenuItem>
      </Select>

                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "center",

                                    marginTop: "1rem",
                                    gap: "1.5rem",
                                    // border: "2px solid red",
                                }}>
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


                        </Grid>
                    </Grid>
                )}
            </Box>
        </div >
    );
};
   





const firstHeading = {
    color: '#FFF',
    fontFamily: GTWalsheimTrial,
    marginTop: "4rem",
    fontSize: { lg: '2.9375rem', md: "2rem", sm: "1.5rem" },
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '4.25rem', 
}

const secondHeading = {
     color: 'rgba(255, 255, 255, 0.80)',
     width: { lg: "31.125rem", md: "28rem", sm: "auto" },
    fontFamily: GTWalsheimTrial,
    fontSize: { lg: '2rem', md: "1.5rem", sm: "1.2rem" },
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
}

const thirdHeading = {
       color: '#FFF',
     fontFamily: GTWalsheimTrial,
    fontSize: { lg: '2rem', md: "1.5rem", sm: "1.2rem" },
     fontStyle: 'normal',
     fontWeight: 400,
    lineHeight: 'normal',
}



const formHeadingStyle = {
      color: '#4C8AB1',
    textAlign: 'center',
    fontFamily: GTWalsheimTrial,
    fontSize: '2.1875rem',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
}


const inputStyle = {
    width: '100%',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    height: '1.5rem',
    marginBottom: { lg: '0.7rem', md: "0.7rem", sm: "0.7rem", xs: "1rem" },
  };

  const placeholderStyle = {
    color: '#B8B8B8',
    padding: '8px',
    fontFamily: GTWalsheimTrial,
     fontSize: "1rem",
    fontStyle: 'normal',
    fontWeight: 400,
  };

  const labelStyle ={
     display: 'block',
     marginBottom: '5px',
    color: '#202227',
     fontFamily: GTWalsheimTrial,
    fontSize: { lg: '1rem', md: "1rem", sm: "0.9rem", xs: "0.75rem" },
     fontStyle: 'normal',
        fontWeight: 400,
          lineHeight: 'normal',
  }

 const  hptLinksStyle = {
     color: '#FFF',
     fontFamily: GTWalsheimTrial,
    fontSize: '1rem',
     fontStyle: 'normal',
    fontWeight: 400,
     lineHeight: 'normal',
  }

  const googleBtnStyle = {
    marginBottom:{ lg: '2rem', md: "1rem", sm: "1rem", xs: "2rem" },
   display: 'flex',
 flexDirection: 'row',
 border: 'none',
 gap: '0.3rem',
  marginTop: { lg: '2rem', md: "1rem", sm: "1rem", xs: "3rem" },
  borderRadius: '2.5rem',
 border: '1px solid rgba(6, 32, 72, 0.11)',
 background: '#FFF',
  color: '#333',
  fontFamily: GTWalsheimTrial,
  fontSize: { lg: '1.25rem', md: "1.25rem", sm: "1.1rem", xs: "1rem" },
  fontStyle: 'normal',
 fontWeight: 400,
 lineHeight: 'normal',
  cursor: 'pointer',
  width: { lg: 'auto', md: "auto", sm: "auto", xs: "100%" },

 padding: {lg:'0.96875rem 2rem',md:'0.96875rem 1rem',sm:'0.8rem 1rem',xs:'0.96875rem 2rem'},
  justifyContent: 'center',
  alignItems: 'center',
  flexShrink: 0,
  textTransform: 'none',
  }




  const ContinuewithTextStyle ={
color: '#202227',

fontFamily: GTWalsheimTrial,
 fontSize: { lg: "1rem", md: "1rem", sm: "0.9rem", xs: "0.8rem" },
fontStyle: 'normal',
fontWeight: 400,
lineHeight: 'normal',
display: "flex",
 justifyContent: "start",
marginTop: "-1.2rem",
position: 'absolute',
left: { lg: '30%', md: "30%", sm: "30%", xs: "50%" },
transform: 'translateX(-50%)',
backgroundColor: '#FFFFFF',
padding: '0 10px',
  }







export default LoginComp;

