import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import builder1 from "../Signup/Assets/pngs/builderProYellowLogo.png";
import builder2 from "../Signup/Assets/pngs/builderProWhiteLogo.png";
import builder2Tab from "../Signup/Assets/pngs/builderProWhiteLogoTab.png";
import builder2Mob from "../Signup/Assets/pngs/builderProWhiteLogoMob.png";




function Splash() {
const [showImage, setShowImage] = useState(false);
    const [showNewImage, setShowNewImage] = useState(false);
    const [showSignupScreen, setShowSignupScreen] = useState(false);


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
            setShowSignupScreen();
        }, 4500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);





    return (
      
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
                </Box>
                )}

export default Splash
