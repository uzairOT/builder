import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid, Typography, Checkbox, TextField, FormControl, InputLabel, NativeSelect, useMediaQuery, Button, MenuItem, Select } from '@mui/material';
import builder1 from "../Signup/Assets/pngs/builderProYellowLogo.png";
import builder2 from "../Signup/Assets/pngs/builderProWhiteLogo.png";
import builder2Tab from "../Signup/Assets/pngs/builderProWhiteLogoTab.png";
import builder2Mob from "../Signup/Assets/pngs/builderProWhiteLogoMob.png";
import downloadForMob from "../Signup/Assets/pngs/downloadForMob.png";
import googlePlay from "../Signup/Assets/pngs/googlePlay.png";
import appStore from "../Signup/Assets/pngs/appStore.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ReactComponent as GoogleLogo } from "../Signup/Assets/svgs/GoogleIcon.svg";

import YellowBtn from '../UI/button';
import GTWalsheimTrial from "../../assets/fonts/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf"


const Login = () => {

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

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState('');
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
      
                        <Grid
                        container
                        sx={{
                            padding: {
                                lg: "4.5rem 3rem",
                                md: "4.5rem 2rem",
                                sm: "1rem 2rem",
                                xs: "0rem 0rem",
                            },
                            backgroundColor:'#4C8AB1',
                            marginTop: { lg: "-1rem", sm: "-4rem", xs: "0rem" },
                            // border: "2px solid red",


                        }}
                    >
                        <Grid
                            item
                            container
                            lg={6}
                            md={6}
                            sm={12}
                            xs={12}
                            sx={{
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
                                paddingLeft:"4rem"

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
                              Log in to your account
                            </Typography>
                            <Box sx={{
                                marginTop: "15rem",
                                 display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
                                marginLeft: { lg: "2.5rem", md: "-1rem", sm: "-3rem" },
                                
                                justifyContent: "center",
                                alignItems: "center"
                            }} >
                                <img src={downloadForMob} width={DoMobWidth} alt="" />
                            </Box>
                                <Box sx={{

                               
                                 display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "3rem",
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
                            sm={12}
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
                                // justifyContent: 'center',
                                // alignItems: 'center',
                                padding: '20px',
                                paddingLeft:"3.5rem",
                                 paddingRight: { lg: "7rem", md: "2rem", sm: "2rem", xs: "2rem" },

                                marginLeft: { lg: "3rem", md: "2rem", sm: "0rem", xs: "0rem" },

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
                                    <Box sx={{marginTop:"0.5rem"}}>
                                        <label style={{...labelStyle, fontSize: isMobile ? "0.8rem" : "1rem"}} htmlFor="email">Password</label>
  <Box sx={{ position: 'relative',  }}>
                                        <input type="email" id="email" style={{...inputStyle, ...placeholderStyle, fontSize: isMobile ? "0.8rem" : "1rem" }}  type={passwordVisible ? 'text' : 'password'}
                                                id="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}  placeholder="" />
                                                   <Box
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',
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
                                                    <span style={{ marginLeft: '5px', }}>
                                                        {passwordVisible ? 'Hide' : 'Show'}
                                                    </span>
                                                )}
                                            </Box>
                                            </Box>
                                    </Box>



                       

                                          <Box  sx={{
                                    
                                        display: "flex",
                                        justifyContent:"space-between",
                                        gap: { lg: "8rem", md: "5rem", sm: "3.5rem", xs: "5rem" },
                                        marginTop:{lg:"2rem",md:"2rem",sm:"2rem",xs:"0.5rem"},
                                        marginBottom: {lg:"2rem",md:"2rem",sm:"2rem",xs:"3rem"}}}>
                                        <Box  sx={{ display: 'flex' }}>
                                            <Checkbox id="agreeTerms" sx={{'&.Mui-checked': {
                                            color: '#4C8AB1',
                                                   },}} />
                                            <label htmlFor="agreeTerms" style={{whiteSpace: 'nowrap', marginTop: isMobile ? "1rem" : "0.9rem", fontFamily: GTWalsheimTrial, fontSize: isMobile || isSM ? "0.8rem" : "1rem" }}>
                                                Remember Me

                                            </label>
                                        </Box>
                                        <Box>
                                            <Typography sx={{
                                                whiteSpace: 'nowrap',
                                                color: isMobile ? '#FFAC00' : '#4C8AB1',
                                                fontFamily: GTWalsheimTrial,
                                                fontSize: { lg: "1rem", md: "1rem", sm: "0.8rem", xs: "0.8rem" },
                                                fontStyle: 'normal',
                                                fontWeight: 400,
                                                lineHeight: 'normal',
                                                textDecoration: 'underline',
                                                marginTop: "0.9rem"
                                            }}>
                                                Forget Password ?
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Button sx={{...YellowBtn, width: { lg: '19rem', md: "auto", sm: "auto", xs: "100%" }, }}
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
                                        marginTop: "1.5rem"
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
                                    <Box sx={{ position: 'relative', marginTop: { lg: '2.5rem', md: "2.5rem", sm: "2.5rem", xs: "3rem" },  }}>
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
                                            {isMobile ? 'Or' : 'or continue with'}
                                        </Typography>
                                    </Box>

                                    <Button sx={{...googleBtnStyle, marginTop:"2.5rem",  marginBottom:"6.5rem"}} type="button"><GoogleLogo style={{ marginRight: "1rem",  }} /> {isMobile ? 'Google' : 'Continue with Google'}</Button>
                                </form>
                            </Grid>
                            {/* </div> */}
                         <Grid sx={{
                                display: { lg: "flex", md: "flex", sm: "flex", xs: "none" },
                                flexDirection: "row",
                                // border: "2px solid red",
                                justifyContent: "space-between",
                                marginLeft: { lg: "3rem", md: "2rem", sm: "0rem", xs: "0rem" },

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
               <Box sx={{
                                display: { lg: "none", md: "none", sm: "flex", xs: "none" },
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "1rem",
                                marginLeft: { lg: "0rem", md: "-3rem", sm: "0rem" },
                                gap: "1rem"
                            }}>
                                <img src={googlePlay} width={widthValue} alt="" />
                                <img src={appStore} width={widthValue} alt="" />
                            </Box>

                        </Grid>
                    </Grid>
  
      
    );
};
   





const firstHeading = {
    color: '#FFF',
    fontFamily: `${GTWalsheimTrial}, sans-serif`,
    marginTop: "4rem",
    fontSize: { lg: '2.9375rem', md: "2rem", sm: "1.5rem" },
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '4.25rem', 
}

const secondHeading = {
     color: 'rgba(255, 255, 255, 0.80)',
     width: { lg: "31.125rem", md: "28rem", sm: "auto" },
     display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
    fontFamily: GTWalsheimTrial,
    fontSize: { lg: '2rem', md: "1.5rem", sm: "1.2rem" },
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
}

const thirdHeading = {
       color: '#FFF',
       marginTop:"2rem",
     fontFamily: GTWalsheimTrial,
    fontSize: { lg: '2rem', md: "1.5rem", sm: "1.2rem" },
    display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
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
    height: "2.5rem",
    alignSelf: "stretch",
    width: '100%',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '0.75rem',
    marginBottom: { lg: '1rem', md: "1rem", sm: "1rem", xs: "1rem" },
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
     marginBottom: '1rem',
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
    fontSize: { lg: '1rem', md: "0.9rem", sm: "0.8rem", },
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
 fontSize: { lg: "0.875rem", md: "0.875rem", sm: "0.875rem", xs: "0.875rem" },
fontStyle: 'normal',
fontWeight: 400,
lineHeight: 'normal',
display: "flex",
 justifyContent: "start",
marginTop: "-1.2rem",
position: 'absolute',
left: { lg: '17%', md: "20%", sm: "30%", xs: "50%" },
transform: 'translateX(-50%)',
backgroundColor: '#FFFFFF',
padding: '0 10px',
  }







export default Login;

