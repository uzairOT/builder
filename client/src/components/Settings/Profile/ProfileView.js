import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PhoneInput } from "react-international-phone";
import { getTokenFromLocalStorage } from "../../../redux/apis/apiSlice";
//import "react-toastify/dist/ReactToastify.css";

function ProfileView() {
  const user = useSelector((state) => state.auth.userInfo);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [image, setImage] = useState(user ? user.user.image : null);
  const [phone, setPhone] = useState(user ? user.user.phoneNumber : "");
  const navigate = useNavigate();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const dispatch = useDispatch();
  const uploadFileToServer = async (selectedFile) => {
    if (selectedFile) {
      try {
        const res = await axios.post(
          "http://192.168.0.113:8080/project/file",
          {
            fileName,
            fileType,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getTokenFromLocalStorage()}`,
            },
          }
        );
        //console.log(res);
        return res.data.data.url;
      } catch (error) {
        console.error("Error uploading file:", error);
        // Handle error
      }
    }
  };
  const [formData, setFormData] = useState({
    firstName: `${user.user.firstName}`,
    lastName: `${user.user?.lastName}`,
    email: user.user.email,
    address: "your address here",
    userId: user.user.id,
  });

  console.log(formData);
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
    setSelectedFile(file);
    previewImage(file);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    //console.log(file)
    setFileName(file.name);
    setFileType(file.type);
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    setImage(file);
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async () => {
    try {
      const fileUrl = await uploadFileToServer(selectedFile);
      const uploadedFileUrl = await uploadToS3(fileUrl, selectedFile);
      if (uploadedFileUrl) {
        const put = {
          ...formData,
          phoneNumber: phone,
          image: uploadedFileUrl,
        };
        const res = await updateProfile(put);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        dispatch(setCredentials(res.data));
        toast.success("Profile updated successfully");
      } else {
        const put = {
          ...formData,
          phoneNumber: phone,
          image: user.user.image,
        };
        const res = await updateProfile(put);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        dispatch(setCredentials(res.data));
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error(
        error?.data?.message ||
          error.error ||
          error?.data?.error ||
          "Something went wrong!"
      );
    }
  };
  const handleReset = () => {
    setFormData({
      firstName: `${user.user.firstName}`,
      lastName: `${user.user?.lastName}`,
      email: user.user.email,
      phoneNumber: user.user.phoneNumber,
      address: "your address here",
      userId: user.user.id,
    });
  };
  useEffect(() => {
    if (selectedFile !== "") {
      handleSubmit();
    }
  }, [selectedFile]);
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
              <Typography>First Name</Typography>
              <TextField
                inputProps={{ maxLength: 50 }}
                name="firstName"
                placeholder="Please enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                sx={InputStyle}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Last name</Typography>
              <TextField
                inputProps={{ maxLength: 50 }}
                name="lastName"
                placeholder="Please enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                sx={InputStyle}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Email</Typography>
              <TextField
                inputProps={{ maxLength: 50 }}
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
              {/* <TextField
                name="phoneNumber"
                placeholder="Please enter your phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                fullWidth
                sx={InputStyle}
              /> */}
              <PhoneInput
                disableDialCodePrefill
                style={{ ...customPhoneStyles }}
                defaultCountry=""
                name={"phoneNumber"}
                value={phone}
                onChange={(phone) => setPhone(phone)}
                countrySelectorStyleProps={{
                  style: {
                    "--react-international-phone-country-selector-background-color":
                      "#EDF2F6",
                    "--react-international-phone-country-selector-background-color-hover":
                      "#EDF2F6",
                  },
                  buttonStyle: {
                    filter: "none",
                  },
                }}
                inputStyle={{ ...customeInputStyles }}
                inputProps={{
                  border: "none",
                  placeholder: "+1 (123) 456-7890",
                }}
                required
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
                isLoading={isLoading}
              />
              <Button
                buttonText="Reset"
                color="#4C8AB1"
                border={"1px solid #4C8AB1"}
                width="112px"
                height="38px"
                borderRadius="50px"
                fontSize={"13px"}
                onClick={handleReset}
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
                First Name:
              </Typography>
              <Typography variant="body1" sx={ValueStyle}>
                {formData.firstName}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" sx={TextStyle}>
                Last Name:
              </Typography>
              <Typography variant="body1" sx={ValueStyle}>
                {formData.lastName}
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
                {phone}
              </Typography>
            </Box>
            {/* <Box>
              <Typography variant="body1" sx={TextStyle}>
                Address:
              </Typography>
              <Typography variant="body1" sx={ValueStyle}>
                {formData.address}
              </Typography>
            </Box> */}

            {/* <Box sx={{ textAlign: "center", mt: 15 }}>
              <Button
                buttonText="Delete Profile"
                color="#E03535"
                border={"1px solid #E03535"}
                width="112px"
                height="38px"
                borderRadius="50px"
                fontSize={"13px"}
              />
            </Box> */}
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
  fontSize: "1.2rem",
};
const ValueStyle = {
  whiteSpace: "nowrap",
  color: "#535353C9",
  display: "flex",
  fontFamily: "GT Walsheim Trial",
  fontWeight: 400,
  marginBottom: "8px",
  overflow: "hidden",
  textOverflow: "ellipsis",
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

const customPhoneStyles = {
  borderRadius: "12px",
  border: "1px solid #D8D8D8",
  background: "#EDF2F6",
  width: "101.5%",
  // height: heightValue,
  alignSelf: "stretch",
  paddingLeft: "8px",
  height: "2.8rem",
  display: "flex",
  alignItems: "center",
  // backgroundColor: "#EDF2F6",
  // paddingTop: "0.5rem",
  // padding: "0.5rem",
};
const customeInputStyles = {
  width: "85%",
  border: "none",
  padding: "0px 10px 0px 0px",
  backgroundColor: "#EDF2F6",
};
