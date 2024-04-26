import { Box, Typography } from "@mui/material";
import React from "react";
import ProfileImage from "../../UI/ProfilePic/ProfilePic";
import UserImage from './assets/images/user-image.jpg'
import DataAndTime from "../../UI/DataAndTime/DataAndTime";
import {useSelector} from 'react-redux';

const Profile = () => {

  const userInfo = useSelector(state => state.auth.userInfo)
  const firstName = userInfo?.user?.firstName;
  const lastName = userInfo?.user?.lastName;
  const email = userInfo?.user?.email;
  return (
    <>
      <Box sx={themeStyle.container}>
        <Box padding={1}>
          <ProfileImage UserImage={userInfo.user.image} border={true}/>
        </Box>
        <Box padding={1}>
          <Typography color="primary" sx={themeStyle.containerTitle}>
            {firstName} 
          </Typography>
          <Typography sx={themeStyle.containerSubtitle}>
            {email}
          </Typography>
        </Box>
      </Box>
     <DataAndTime />
    </>
  );
};

export default Profile;

const themeStyle = {
  container: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },
  containerTitle: {
    fontSize: { xs: "10px", md: "10px", xl: "13px" },
    fontWeight: "400",
    fontFamily: "inherit",
    textTransform: 'uppercase'
  },
  containerSubtitle: {
    fontSize: { xs: "13px", md: "10px", xl: "13px" },
    fontWeight: "400",
    fontFamily: "inherit",
    fontStyle: "normal",
  },
};
