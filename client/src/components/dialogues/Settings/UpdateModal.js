import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl
} from "@mui/material";
import UploadIcon from "../../../assets/settings/uploadimg.png";
import Button from "../../UI/CustomButton";
import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import FormHelperText from '@mui/material/FormHelperText';
import { settingsSchema } from "../../../utils/Validation/settingsPageSchema";
import { useGetAssignedRolesQuery, useUpdateAssignRoleMutation } from "../../../redux/apis/Admin/assignRoleApiSlice";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateModal({
  title,
  open,
  onClose,
  userId
}) {
  const [image, setImage] = useState(null);
  const local = localStorage.getItem('userInfo');
  const currentUser = JSON.parse(local);
  const currentUserId = currentUser.user.id;
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const userRole =pathSegments[pathSegments.length -1];
  const [assignRolePut] = useUpdateAssignRoleMutation();
  const { refetch} = useGetAssignedRolesQuery({
    userRole: userRole,
    userId: currentUserId,
  });

  const onSubmit = async (values, action) => {
      const put = {
          ...values,
          image: image,
          userRole: userRole,
          userId: userId,
          superAdminId: currentUserId,
      }
      const res = await assignRolePut(put);
      refetch();
      action.resetForm();
      setImage(null);
  };

  const { handleBlur, handleChange, values, errors, touched, handleSubmit, isSubmitting, handleReset } = useFormik({
    initialValues: {
      userId: '',
      userRole: "",
      image: "",
      name: "",
      project: "",
      email: "",
      phoneNumber: "",
      country: "",
      status: "",
    },
    validationSchema: settingsSchema,
    onSubmit,

  });
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    previewImage(file);
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
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };


  useEffect(() => {
    //console.log("values", values);
  }, [values]);
  return (
    <form onSubmit={handleSubmit}>
      <Dialog open={open} onClose={onClose} maxWidth="md" sx={{}}>
        <DialogTitle sx={headingStyle}>Update {title}</DialogTitle>
        <DialogContent
          sx={{ display: "flex", justifyContent: "center", margin: "30px" }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "1px dashed #000",
                borderRadius: "18px",
                justifyContent: "center",
                margin: "20px",
                height: "147px",
              }}
            >
              <div
                style={{ textAlign: "center" }}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                {/* Upload image icon */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                  id="avatarInput"
                  name="image"
                />
                <label htmlFor="avatarInput">
                  <img src={image ? image : UploadIcon} alt=""  width={'120px'} height={'80px'}/>

                  {/* Text */}
                  <Typography variant="body1" sx={labelStyle}>
                    Upload your photo
                  </Typography>
                </label>
              </div>
            </Grid>

            <Grid item xs={12}  sm={6}>
              {/* Name input */}
              <Typography variant="body1">Name</Typography>
              <TextField
                error={errors.name ? true : false}
                value={values.name}
                placeholder="Name"
                fullWidth
                name={"name"}
                inputProps={{
                  style:{
                    ...InputStyle,
                     border: errors.name && touched.name ? '1px solid #d32f2f' : '1px solid #E0E4EC'
                  }
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.name && touched.name  ? errors.name : ''}
              />
            </Grid>
            <Grid item xs={12}  sm={6}>
              {/* Phone Number input */}
              <Typography variant="body1">Phone Number</Typography>
              <TextField
                error={errors.phoneNumber ?  true : false}
                value={values.phoneNumber}
                placeholder="Enter your phone number"
                fullWidth
                name={"phoneNumber"}
                inputProps={{
                  style:{
                    ...InputStyle,
                     border: errors.phoneNumber && touched.phoneNumber ? '1px solid #d32f2f' : '1px solid #E0E4EC'
                  }
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : ''}
              />
            </Grid>
            <Grid item xs={12}  sm={6}>
              {/* Projects input */}
              <Typography variant="body1">Project</Typography>
              <TextField
                error={errors.project ? true : false}
                value={values.project}
                placeholder="Project"
                fullWidth
                name={"project"}
                inputProps={{
                  style:{
                    ...InputStyle,
                     border: errors.project && touched.project ? '1px solid #d32f2f' : '1px solid #E0E4EC'
                  }
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.project && touched.project ? errors.project : ''}
              />
            </Grid>
            <Grid item xs={12}  sm={6}>
              {/* Country input */}
              <Typography variant="body1">Country</Typography>
              <TextField
                error={errors.country ? true : false}
                value={values.country}
                placeholder="Country"
                fullWidth
                inputProps={{
                  style:{
                    ...InputStyle,
                     border: errors.name && touched.country ? '1px solid #d32f2f' : '1px solid #E0E4EC'
                  }
                }}
                name={"country"}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.country && touched.country ? errors.country : ''}
              />
            </Grid>
            <Grid item xs={12}  sm={6}>
              {/* Email input */}
              <Typography variant="body1">Email</Typography>
              <TextField
                error={errors.email ? true : false}
                value={values.email}
                placeholder="Email"
                fullWidth
                name={"email"}
                inputProps={{
                  style:{
                    ...InputStyle,
                     border: errors.email && touched.email ? '1px solid #d32f2f' : '1px solid #E0E4EC'
                  }
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.email && touched.email ? errors.email : ''}
              />
            </Grid>
            <Grid item xs={12}  sm={6}>
              {/* Status input */}
              <Typography variant="body1">Status</Typography>
              <FormControl fullWidth>
              <Select
                error={errors.status?  true : false}
                displayEmpty
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="unselected"
                value={values.status}
                onChange={handleChange}
                onBlur={handleBlur}
                name={"status"}
                fullWidth
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return (
                      <Typography
                        style={{ fontSize: "1rem", color: "#969a9c" }}
                      >
                        Unselected
                      </Typography>
                    );
                  }
                  return selected;
                }}
                sx={{
                  ...InputStyle,
                  height: "45px",
                  border: errors.status && touched.status ? '1px solid #d32f2f' : "1px solid #E0E4EC"
                }}
                placeholder="unselected"
              >
                <MenuItem value={"done"}>Done</MenuItem>
                <MenuItem value={"pending"}>Pending</MenuItem>
              </Select>
             {errors.status && touched.status ? <FormHelperText error>{errors.status}</FormHelperText> : <></>}
             </FormControl>
              {/* <TextField placeholder="Status" fullWidth sx={InputStyle} name={'status'} /> */}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "center", mb: 2 }}
        >
          <Grid item xs={8} sm={4} md={3} lg={2} sx={{ textAlign: "center" }}>
            <Button
              buttonText={isSubmitting ? "Submitting" : "Update Profile"}
              color="#ffffff"
              backgroundColor={isSubmitting ? "gray" :"#4C8AB1"}
              width="150px"
              height="44px"
              borderRadius="50px"
              type={"submit"}
              onClick={handleSubmit}
             
            />
          </Grid>
          <Grid item xs={8} sm={4} md={3} lg={2} sx={{ textAlign: "center" }}>
            <Button
              buttonText="Reset"
              color="#4C8AB1"
              border={"1px solid #4C8AB1"}
              width="150px"
              height="44px"
              borderRadius="50px"
              fontSize={"13px"}
              onClick={handleReset}
            />
          </Grid>
        </DialogActions>
      </Dialog>
    </form>
  );
}

export default UpdateModal;
const InputStyle = {
  backgroundColor: "#EDF2F6",
  borderRadius: "8px",
  fontFamily: "Manrope, sans-serif",
    border: "1px solid #E0E4EC",
    padding: "10px",

  "& .MuiOutlinedInputRoot": {
    "& fieldset": {
      border: "none",
    },
  },
};

const headingStyle = {
  marginTop: "20px",
  // marginBottom: "10px",
  marginLeft: "25px",
  fontFamily: "Poppins",
  fontWeight: "500",
  fontSize: "22px",
  color: "#4C8AB1",
};
const labelStyle = {
  marginTop: "10px",
  fontFamily: "Poppins",
  fontWeight: "400",
  fontSize: "13px",
  color: "#535353C9",
};
