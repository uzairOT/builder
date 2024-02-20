import React, { useState } from "react";
import { Box, Grid, Typography, TextField } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import Avatar from "@mui/material/Avatar";
import AvatarImg from "../../../assets/settings/UploadProfileIcon.png";

function ProfileView() {
  const [formData, setFormData] = useState({
    fullName: "uzair",
    username: "uzair00",
    email: "zuzair00@gmail.com",
    phoneNumber: "03015995784",
    address: "your address here",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Grid item xs={12}>
          <Typography variant="h5" sx={Profile}>Profile</Typography>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>Full Name</Typography>
              <TextField
                name="fullName"
                placeholder="Please enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                fullWidth
                sx={InputStyle}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Username</Typography>
              <TextField
                name="username"
                placeholder="Please enter your username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
                sx={InputStyle}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Email</Typography>
              <TextField
                name="email"
                placeholder="Please enter your email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                sx={InputStyle}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Phone Number</Typography>
              <TextField
                name="phoneNumber"
                placeholder="Please enter your phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                fullWidth
                sx={InputStyle}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Address</Typography>
              <Textarea
                name="address"
                placeholder="Write your address here"
                value={formData.address}
                onChange={handleChange}
                multiline
                fullWidth
                sx={textAreaStyle}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Box textAlign="center">
            <Typography variant="subtitle1" sx={changeProfile}>
              Your Profile Picture
            </Typography>
            <Avatar
              alt="Profile Picture"
              src={AvatarImg}
              sx={{ width: 180, height: 182, mx: "auto" }}
            />
            <Typography variant="subtitle1" sx={changeProfile}>
              Change Profile
            </Typography>
          </Box>
          <Box sx={{ display: "grid", justifyContent: "center" }}>
            <Box>
              <Typography variant="body1" sx={TextStyle}>
                Name:
              </Typography>
              <Typography variant="body1" sx={ValueStyle}>
                {formData.fullName}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="body1"
                sx={TextStyle}
              >
                User:
              </Typography>
              <Typography variant="body1" sx={ValueStyle}>
                {formData.username}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" sx={TextStyle}>
                Email:
              </Typography>
              <Typography variant="body1" sx={ValueStyle}>
                {formData.email}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" sx={TextStyle}>
                Phone No:
              </Typography>
              <Typography variant="body1" sx={ValueStyle}>
                {formData.phoneNumber}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" sx={TextStyle}>
                Address:
              </Typography>
              <Typography variant="body1" sx={ValueStyle}>
                {formData.address}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProfileView;

const InputStyle = {
  backgroundColor: "#EDF2F6",
  borderRadius: "8px",
  fontFamily: 'Manrope, sans-serif',
  "& input": {
    border: "1px solid #E0E4EC",
    borderRadius: "8px",
    padding: "10px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
  },
};

const textAreaStyle = {
  backgroundColor: "#EDF2F6",
  borderRadius: "8px",
  border: "1px solid #E0E4EC",
  padding: "10px",
  "&:focus": {
    outline: "none", // Remove the default focus outline
    borderColor: "#1a73e8", // Example color for focused state
  },
};
const TextStyle = {
  color: "#202227",
  display: "inline-block",
  width: 100,
  fontFamily: "GT Walsheim Trial",
  fontWeight: 400,
  marginBottom: "8px",
  fontFamily: 'Manrope, sans-serif',
  fontWeight:"500"
};
const ValueStyle = {
  whiteSpace: "nowrape",
  color: "#535353C9",
  display: "inline-block",
  width: 100,
  fontFamily: "GT Walsheim Trial",
  fontWeight: 400,
  marginBottom: "8px",
};
const Profile = { marginTop: '20px', marginBottom: '30px',fontFamily: 'Manrope, sans-serif',fontWeight:"700",  color: '#4C8AB1' }

const changeProfile ={
  ...Profile,
  color:"#202227",
  fontWeight:"500"
}