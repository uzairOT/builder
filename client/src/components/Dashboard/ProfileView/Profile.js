import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import ProfileImage from "../../UI/ProfilePic/ProfilePic";
import DataAndTime from "../../UI/DataAndTime/DataAndTime";
import { useSelector } from "react-redux";

const Profile = ({reports}) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const firstName = userInfo?.user?.firstName;
  const lastName = userInfo?.user?.lastName;
  const email = userInfo?.user?.email;
  return (
    <>
    <Grid sx={{  paddingLeft:4, display:"flex", flexDirection:"column"}}>

      <Box sx={themeStyle.container}>
        <Box padding={0.4} >
          <ProfileImage UserImage={userInfo.user.image} border={true} />
        </Box>
        <Box padding={1}>
          <Typography color="primary" sx={themeStyle.containerTitle}>
            {firstName}
          </Typography>
          <Typography sx={themeStyle.containerSubtitle}>{email}</Typography>
        </Box>
      </Box>
      {!reports && <DataAndTime />}

    </Grid>
    </>
  );
};

export default Profile;

const themeStyle = {
  container: {
    display: "flex",
    alignItems: "center",
  },
  containerTitle: {
    fontSize: { xs: "14px", md: "13px", lg:'11px',  xl: "13px" },
    fontWeight: "600",
    fontFamily: 'var(--main-font-family)',
    textTransform: "uppercase",
  },
  containerSubtitle: {
    fontSize: { xs: "12px", sm:'11px', md: "11px", lg:'11px', xl: "11px" },
    fontWeight: "400",
    fontFamily: 'var(--main-font-family)',
    fontStyle: "normal",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
};
