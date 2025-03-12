import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import builder1 from "../Signup/Assets/pngs/builderProYellowLogo.png";
import builder2 from "../Signup/Assets/pngs/builderProWhiteLogo.png";
import builder2Tab from "../Signup/Assets/pngs/builderProWhiteLogoTab.png";
import builder2Mob from "../Signup/Assets/pngs/builderProWhiteLogoMob.png";

function Splash() {
    const [showImage, setShowImage] = useState(false);
    const [showNewImage, setShowNewImage] = useState(false);
    const [showSignupScreen, setShowSignupScreen] = useState(false);
    const [builderImage, setBuilderImage] = useState(getBuilderImage());

    const timeoutRef = useRef([]);

    function getBuilderImage() {
        const windowWidth = window.innerWidth;
        if (windowWidth >= 900) return builder2;
        if (windowWidth >= 600) return builder2Tab;
        return builder2Mob;
    }

    useEffect(() => {
        function handleResize() {
            setBuilderImage(getBuilderImage());
        }

        window.addEventListener("resize", handleResize);
        
        timeoutRef.current.push(
            setTimeout(() => setShowImage(true), 2000),
            setTimeout(() => setShowNewImage(true), 3000),
            setTimeout(() => setShowSignupScreen(true), 4500)
        );

        return () => {
            window.removeEventListener("resize", handleResize);
            timeoutRef.current.forEach(clearTimeout);
        };
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: "100vh",
                width: '100vw',
                backgroundColor: showNewImage ? '#4C8AB1' : '#FFF',
                transition: 'background-color 1s ease-in-out',
                overflow: 'hidden',
            }}
        >
            {/* First Image */}
            <Box
                sx={{
                    transition: 'transform 1s ease-in-out, opacity 1s ease-in-out',
                    transform: showImage ? 'scale(0.2)' : 'scale(1)',
                    opacity: showNewImage ? 0 : 1,
                    visibility: showNewImage ? 'hidden' : 'visible',
                    position: "absolute"
                }}
            >
                {showImage && (
                    <img
                        src={builder1}
                        alt="Builder Logo"
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                )}
            </Box>

            {/* Second Image */}
            <Box
                sx={{
                    transition: 'transform 1s ease-in-out, opacity 1s ease-in-out',
                    transform: showNewImage ? 'scale(1)' : 'scale(0.2)',
                    opacity: showSignupScreen ? 0 : 1,
                    visibility: showSignupScreen ? 'hidden' : 'visible',
                }}
            >
                {showNewImage && (
                    <img
                        src={builderImage}
                        alt="Builder Logo"
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                )}
            </Box>
        </Box>
    );
}

export default Splash;
