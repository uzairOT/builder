import React from 'react';
import { Box } from '@mui/material';

const ProfileImage = ({ UserImage, border }) => {
    if(!border){
        return (
            <Box
                component="img"
                src={UserImage}
                alt="Profile Pic"
                sx={{
                    width: { xs:"30px", md: "40px", lg: "48px", xl: "54px" },
                    height: { xs:"30px", md: "40px", lg: "48px", xl: "54px" },
                    borderRadius: { xs:"30px", md: "40px", lg: "48px", xl: "54px" },
                }}
            />
        );
    } else{
    return (
        <Box
            component="img"
            src={UserImage}
            alt="Profile Pic"
            sx={{
                width: { xs:"30px", md: "40px", lg: "48px", xl: "54px" },
                height: { xs:"30px", md: "40px", lg: "48px", xl: "54px" },
                borderRadius: { xs:"30px", md: "40px", lg: "48px", xl: "54px" },
                border: "1.2px solid rgba(43, 35, 83, 0.57)",
            }}
        />
    );}
};

export default ProfileImage;