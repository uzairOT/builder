import React, { useState } from "react";
import { Box, Grid, Typography, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AvatarImg from "../../../assets/settings/UploadProfileIcon.png";
import Button from "../../UI/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { uploadToS3 } from "../../../utils/S3";
import { useUpdateProfileMutation } from "../../../redux/apis/usersApiSlice";
import { setCredentials } from "../../../redux/slices/authSlice";
import { Textarea } from "@mui/joy";


function ProfileView() {
  const user = useSelector((state) => state.auth.userInfo);
  const [fileName,setFileName] = useState("")
const [fileType,setFileType] = useState("")
const [selectedFile,setSelectedFile] = useState("")
const [image, setImage] = useState(user ?  user.user.image : null);
const [updateProfile] = useUpdateProfileMutation()
const dispatch = useDispatch();

  const uploadFileToServer = async (selectedFile) => {
    if (selectedFile) {
      try {
        const res = await axios.post("http://192.168.0.106:8080/project/file",{fileName,fileType});
        //console.log(res);
        return res.data.data.url;
      } catch (error) {
        console.error("Error uploading file:", error);
        // Handle error
      }
    }
  };
  const [formData, setFormData] = useState({
    fullName: `${user.user.firstName}`,
    username: "uzair00",
    email: user.user.email,
    phoneNumber: user.user.phoneNumber,
    address: "your address here",
    userId: user.user.id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const previewImage = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFileName(file.name);
    setFileType(file.type);
    setSelectedFile(file)
    previewImage(file);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    //console.log(file)
    setFileName(file.name);
    setFileType(file.type);
    setSelectedFile(file)
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    setImage(file)
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async () => {
    try {
      const fileUrl = await uploadFileToServer(selectedFile);
      const uploadedFileUrl = await uploadToS3(fileUrl, selectedFile);
      const put = {
      ...formData,
      image: uploadedFileUrl
    }
    const res = await updateProfile(put);
    localStorage.setItem('userInfo', JSON.stringify(res.data))
    dispatch(setCredentials(res.data))
   
  } catch (err) {
    //console.log(err);
  }
  }
  return (
    <Box sx={{ mb: 2 }}>
      <Grid container spacing={2}>
        <Grid item md={8} xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={Profile}>
                Profile
              </Typography>
            </Grid>
  
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
                rows={4}
                fullWidth
                sx={textAreaStyle}
              />
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", gap: 1, my: 6.1 }}>
              <Button
                buttonText="Update Profile"
                color="#ffffff"
                backgroundColor="#4C8AB1"
                width="112px"
                height="38px"
                borderRadius="50px"
                onClick={handleSubmit}
              />
              <Button
                buttonText="Reset"
                color="#4C8AB1"
                border={"1px solid #4C8AB1"}
                width="112px"
                height="38px"
                borderRadius="50px"
                fontSize={"13px"}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box textAlign="center">
            <Typography variant="subtitle1" sx={changeProfile}>
              Your Profile Picture
            </Typography>
            <div 
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
                id="avatarInput"
                multiple
              />
              <label htmlFor="avatarInput">
                <Avatar
                  src={image ? image : AvatarImg}
                  alt={image ? "Uploaded Avatar" : "Placeholder Avatar"}
                  sx={{ width: 180, height: 182, mx: "auto" }}
                />
              </label>
            </div>
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
              <Typography variant="body1" sx={TextStyle}>
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
  
            <Box sx={{ textAlign: "center", mt: 15 }}>
              <Button
                buttonText="Delete Profile"
                color="#E03535"
                border={"1px solid #E03535"}
                width="112px"
                height="38px"
                borderRadius="50px"
                fontSize={"13px"}
              />
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
  fontFamily: "Manrope, sans-serif",
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
  height: "135px",
  height: "135px",
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
  fontFamily: "Manrope, sans-serif",
  fontWeight: "500",
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
const Profile = {
  marginTop: "20px",
  marginBottom: "30px",
  fontFamily: "Manrope, sans-serif",
  fontWeight: "700",
  color: "#4C8AB1",
};

const changeProfile = {
  ...Profile,
  color: "#202227",
  fontWeight: "500",
};
