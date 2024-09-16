import React from "react";
import { Avatar, Box } from "@mui/material";

const ProfileImage = ({ UserImage, border }) => {
  if (!border) {
    return (
      <Avatar
        src={UserImage}
        alt="Profile Pic"
        sx={{
          width: { xs: "27px", md: "32px", lg: "40px", xl: "50px" },
          height: { xs: "27px", md: "32px", lg: "40px", xl: "50px" },
          borderRadius: { xs: "30px", md: "40px", lg: "48px", xl: "54px" },
        }}
      />
    );
  } else {
    return (
      <Avatar
        src={UserImage}
        alt="Profile Pic"
        sx={{
          width: { xs: "27px", md: "32px", lg: "40px", xl: "40px" },
          height: { xs: "27px", md: "32px", lg: "40px", xl: "40px" },
          borderRadius: { xs: "30px", md: "40px", lg: "48px", xl: "54px" },
          border: "1.2px solid rgba(43, 35, 83, 0.57)",
        }}
      />
    );
  }
};

export default ProfileImage;
