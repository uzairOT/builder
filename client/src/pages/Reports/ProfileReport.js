import { Box, Typography } from "@mui/material";
import React from "react";
import ProfileImage from "../../components/UI/ProfilePic/ProfilePic";
import UserImage from "./assests/images/user-image.jpg"

const ProfileReport = ({ name, description }) => {
  return (
    <>
      <Box sx={themeStyle.container}>
        <Box padding={1}>
          <ProfileImage UserImage={UserImage} border={true} />
        </Box>
        <Box padding={1}>
          <Typography color="primary" sx={themeStyle.containerTitle}>
            {name}
          </Typography>
          <Typography sx={themeStyle.containerSubtitle}>
            {description}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ProfileReport;

const themeStyle = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  containerTitle: {
    fontSize: { xs: "10px", md: "10px", lg: "1.2rem", xl: "1.2rem" },
    color: "#FFAC00",
    fontWeight: "400",
    fontFamily: "inherit",

  },
  containerSubtitle: {
    fontSize: { xs: "13px", md: "10px", xl: "13px" },
    fontWeight: "400",
    fontFamily: "inherit",
    fontStyle: "normal",
  },
};
