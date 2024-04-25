import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Button from "../../UI/CustomButton";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useGetUserProjectsQuery } from "../../../redux/apis/Project/userProjectApiSlice";
import { useAddAssignRoleMutation, useGetAssignedRolesQuery } from "../../../redux/apis/Admin/assignRoleApiSlice";
import { useFormik } from "formik";
import { settingsSchema } from "../../../utils/Validation/settingsPageSchema";
import axios from "axios";
import { uploadToS3 } from "../../../utils/S3";
import { useProjectUpdateMutation } from "../../../redux/apis/Project/projectApiSlice";

function EditProjectModal({ title, open, onClose, project }) {
    const [image, setImage] = useState(null);
    const local = localStorage.getItem("userInfo");
    const currentUser = JSON.parse(local);
    const currentUserId = currentUser.user.id;
    const location = useLocation();
    const pathSegments = location.pathname.split("/");
    const userRole = pathSegments[pathSegments.length - 1];
    const [fileName, setFileName] = useState("");
    const [fileType, setFileType] = useState("");
    const [selectedFile, setSelectedFile] = useState("");
    const [projectUpdate] = useProjectUpdateMutation();
    const {refetch} = useGetUserProjectsQuery({userId: currentUserId})

    console.log(project)

    const uploadFileToServer = async (selectedFile) => {
      if (selectedFile) {
        try {
          const res = await axios.post("http://3.135.107.71//project/file",{fileName,fileType});
          // //console.log(res);
          return res.data.data.url;
        } catch (error) {
          console.error("Error uploading file:", error);
          // Handle error
        }
      }
    };
  
    const onSubmit = async (values, action) => {
      try {
        const fileUrl = await uploadFileToServer(selectedFile);
        const uploadedFileUrl = await uploadToS3(fileUrl, selectedFile);
        const put = {
          clientName: values.name,
          projectName: values.project,
          image: uploadedFileUrl,
        };
        const res = await projectUpdate({body: put, projectId: project.id})
        await refetch();
        setImage(null);
        action.resetForm();
      } catch (err) {
        //console.log(err);
      }
    };
  


    const {
      values,
      handleChange,
      handleBlur,
      errors,
      touched,
      handleSubmit,
      isSubmitting,
      handleReset,
      setFieldValue,
      setValues
    } = useFormik({
      initialValues: {
        name: project ? project.clientName : '',
        project: project ? project.projectName : '',
        phoneNumber: "",
        status: "",
      },
      onSubmit,
    });

  
    const handleDrop = (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      setFileName(file.name);
      setFileType(file.type);
      setSelectedFile(file)
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
      //console.log(file)
      setFileName(file.name);
      setFileType(file.type);
      setSelectedFile(file)
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    };
    useEffect(() => {
      // This will run whenever the project prop changes
      console.log('Project has changed:', project);
      
      // Update form values if needed
      setValues({
        name: project ? project.clientName : '',
        project: project ? project.projectName : '',
        phoneNumber: "",
        status: "",
      });
      setImage( prev => {
        if(project){
          return project.image
        }
      })
    
    }, [project]);  // Dependency array
  
    return (
      <form onSubmit={handleSubmit}>
        <ToastContainer />
        <Dialog open={open} onClose={onClose} maxWidth="md" sx={{}}>
          <DialogTitle sx={headingStyle}>Edit Project</DialogTitle>
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
                  style={{ textAlign: "center", width: '100%', height: '100%'}}
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
                    <img
                      src={image ? image : 'UploadIcon'}
                      alt=""
                      width={"120px"}
                      height={"120px"}
                    />
  
                    {/* Text */}
                    <Typography variant="body1" sx={labelStyle}>
                    {image ? <></> : 'Upload your photo'}
                    </Typography>
                  </label>
                </div>
              </Grid>
  
              <Grid item xs={12} sm={6}>
                {/* Name input */}
                <Typography variant="body1">Client Name</Typography>
                <TextField
                  error={errors.name ? true : false}
                  placeholder="Name"
                  name={"name"}
                  value={values.name}
                  fullWidth
                  inputProps={{
                    style: {
                      ...InputStyle,
                      border:
                        errors.name && touched.name
                          ? "1px solid #d32f2f"
                          : "1px solid #E0E4EC",
                    },
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.name && touched.name ? errors.name : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* Phone Number input */}
                <Typography variant="body1">Phone Number</Typography>
                <TextField
                  error={errors.phoneNumber ? true : false}
                  placeholder="Enter your phone number"
                  fullWidth
                  value={values.phoneNumber}
                  onChange={handleChange}
                  inputProps={{
                    style: {
                      ...InputStyle,
                      border:
                        errors.phoneNumber && touched.phoneNumber
                          ? "1px solid #d32f2f"
                          : "1px solid #E0E4EC",
                    },
                  }}
                  name={"phoneNumber"}
                  onBlur={handleBlur}
                  helperText={
                    errors.phoneNumber && touched.phoneNumber
                      ? errors.phoneNumber
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* Projects input */}
                <Typography variant="body1">Project Name</Typography>
                <TextField 
                  error={Boolean(errors.project)} // Simplified error handling
                  placeholder="Project"
                  name="project"
                  value={values.project}
                  onChange={handleChange}
                  fullWidth
                  inputProps={{
                    style: {
                      ...InputStyle,
                      border:
                        errors.project && touched.project
                          ? "1px solid #d32f2f"
                          : "1px solid #E0E4EC",
                    },
                  }}
                  onBlur={handleBlur}
                  FormHelperTextProps={{ color: "error" }}
                  helperText={
                    errors.project && touched.project ? errors.project : ""
                  }
                >
                </TextField>
                {/* <FormControl fullWidth>
                  <Select
                    error={errors.project ? true : false}
                    displayEmpty
                    labelId="demo-simple-select-label"
                    value={values.project}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                  name="project"
                    fullWidth
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return (
                          <Typography
                            style={{ fontSize: "1rem", color: "#969a9c" }}
                          >
                            Project
                          </Typography>
                        );
                      }
                      const selectedProject = projectNames.find(project => project.id === selected);
                      return selectedProject.projectName;
                    }}
                    sx={{
                      ...InputStyle,
                      height: "45px",
                      border:
                        errors.project && touched.project
                          ? "1px solid #d32f2f"
                          : "1px solid #E0E4EC",
                      placeholder: "Project",
                    }}
                  >
                    {projectNames?.map((projectName) => (
                    <MenuItem key={projectName.id} value={projectName.id}>
                      {projectName.projectName}
                    </MenuItem>
                  ))}
                  </Select>
                  {errors.project && touched.project ? (
                    <FormHelperText error>{errors.project}</FormHelperText>
                  ) : (
                    <></>
                  )}
                </FormControl> */}
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* Country input */}
                <Typography variant="body1">Status</Typography>
                <FormControl fullWidth>
                  <Select
                    error={errors.status ? true : false}
                    displayEmpty
                    labelId="demo-simple-select-label"
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
                      border:
                        errors.status && touched.status
                          ? "1px solid #d32f2f"
                          : "1px solid #E0E4EC",
                      placeholder: "Unselected",
                    }}
                  >
                    <MenuItem value={"done"}>Done</MenuItem>
                    <MenuItem value={"pending"}>Pending</MenuItem>
                  </Select>
                  {errors.status && touched.status ? (
                    <FormHelperText error>{errors.status}</FormHelperText>
                  ) : (
                    <></>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* Email input */}
                {/* <Typography variant="body1">Email</Typography>
                <TextField
                  error={errors.email ? true : false}
                  placeholder="Email"
                  name={"email"}
                  value={values.email}
                  onChange={handleChange}
                  fullWidth
                  inputProps={{
                    style: {
                      ...InputStyle,
                      border:
                        errors.email && touched.email
                          ? "1px solid #d32f2f"
                          : "1px solid #E0E4EC",
                    },
                  }}
                  onBlur={handleBlur}
                  helperText={errors.email && touched.email ? errors.email : ""}
                /> */}
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* Status input */}
                {/* <Typography variant="body1">Status</Typography>
                <FormControl fullWidth>
                  <Select
                    error={errors.status ? true : false}
                    displayEmpty
                    labelId="demo-simple-select-label"
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
                      border:
                        errors.status && touched.status
                          ? "1px solid #d32f2f"
                          : "1px solid #E0E4EC",
                      placeholder: "Unselected",
                    }}
                  >
                    <MenuItem value={"done"}>Done</MenuItem>
                    <MenuItem value={"pending"}>Pending</MenuItem>
                  </Select>
                  {errors.status && touched.status ? (
                    <FormHelperText error>{errors.status}</FormHelperText>
                  ) : (
                    <></>
                  )}
                </FormControl> */}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions
            sx={{ display: "flex", justifyContent: "center", mb: 2 }}
          >
            <Grid item xs={8} sm={4} md={3} lg={2} sx={{ textAlign: "center" }}>
              <Button
                type={"submit"}
                buttonText="Update"
                color="#ffffff"
                backgroundColor={isSubmitting ? "gray" : "#4C8AB1"}
                width="150px"
                height="44px"
                borderRadius="50px"
                onClick={handleSubmit}
                disabled={isSubmitting}
              />
            </Grid>
            <Grid item xs={8} sm={4} md={3} lg={2} sx={{ textAlign: "center" }}>
              {/* <Button
                buttonText="Reset"
                color="#4C8AB1"
                border={"1px solid #4C8AB1"}
                width="150px"
                height="44px"
                borderRadius="50px"
                fontSize={"13px"}
                onClick={handleReset}
              /> */}
            </Grid>
          </DialogActions>
        </Dialog>
      </form>
    );
  }
  
  export default EditProjectModal;
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
  