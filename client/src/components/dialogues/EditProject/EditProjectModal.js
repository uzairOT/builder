import {
  Box,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import Button from "../../UI/CustomButton";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useGetUserProjectsQuery } from "../../../redux/apis/Project/userProjectApiSlice";
import {
  useAddAssignRoleMutation,
  useGetAssignedRolesQuery,
} from "../../../redux/apis/Admin/assignRoleApiSlice";
import { useFormik } from "formik";
import {
  projectSchema,
  settingsSchema,
} from "../../../utils/Validation/settingsPageSchema";
import axios from "axios";
import { uploadToS3 } from "../../../utils/S3";
import { useProjectUpdateMutation } from "../../../redux/apis/Project/projectApiSlice";
import { getTokenFromLocalStorage } from "../../../redux/apis/apiSlice";
import UploadIcon from "../../../assets/settings/uploadimg.svg";
import { useDispatch } from "react-redux";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  addProjects,
  setError,
  setIsLoading,
  setLimit,
  setTotalCount,
  setTotalPages,
} from "../../../redux/slices/Project/userProjectsSlice";
import CloseIcon from "@mui/icons-material/Close";
import ColorPicker from "../ColorPickerProject/ColorPicker";

function EditProjectModal({ title, open, onClose, project, page }) {
  const [image, setImage] = useState(null);
  const [phone, setPhone] = useState("");
  const local = localStorage.getItem("userInfo");
  const currentUser = JSON.parse(local);
  const currentUserId = currentUser.user.id;
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const userRole = pathSegments[pathSegments.length - 1];
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState("");
  const [projectUpdate] = useProjectUpdateMutation();
  const { refetch, data, isLoading, error } = useGetUserProjectsQuery({
    userId: currentUserId,
    q: "",
    filter: "",
    page: page,
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const colors = [
    "#FFF",
    "#93D0EC",
    "#9BDFEB",
    "#9FF2CA",
    "#E5F29F",
    "#F3DE9E",
    "#F5C79F",
    "#F9B4A1",
    "#FBA8A4",
    "#F9A0CB",
    "#FCA8F1",
    "#DA9CF0",
    "#ADA1F5",
  ];
  const handleNavigation = () => {
    navigate(`${project.id}/initial-proposal`);
  };
  // console.log(project);

  const uploadFileToServer = async (selectedFile) => {
    if (selectedFile) {
      try {
        const res = await axios.post(
          "https://builderbuilder.net/project/file",
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
      dispatch(setIsLoading(isLoading));
      const fileUrl = await uploadFileToServer(selectedFile);
      const uploadedFileUrl = await uploadToS3(fileUrl, selectedFile);
      const put = {
        ...values,
        image: uploadedFileUrl,
      };
      const res = await projectUpdate({ body: put, projectId: project.id });
      await refetch({ userId: currentUserId, q: "", filter: "", page: 1 });
      if (data) {
        dispatch(addProjects(data?.projects));
        dispatch(setTotalCount(data?.totalCount));
        dispatch(setTotalPages(data?.totalPages));
        dispatch(setLimit(data?.limit));
        toast.success("Project updated successfully!");
      } else {
        dispatch(setError(error));
      }
      setImage(null);
      action.resetForm();
      onClose();
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
    setValues,
  } = useFormik({
    initialValues: {
      location: project ? project.clientName : "",
      project: project ? project.projectName : "",
      start_time: "",
      end_time: "",
      projectColor: "#FFF",
    },
    validationSchema: projectSchema,
    onSubmit,
  });

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFileName(file.name);
    setFileType(file.type);
    setSelectedFile(file);
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
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleStartDateChange = (newValue) => {
    setValues({
      ...values,
      start_time: newValue,
    });
  };
  const handleEndDateChange = (newValue) => {
    setValues({
      ...values,
      end_time: newValue,
    });
  };
  const handleProjectColorChange = (color) => {
    setValues({
      ...values,
      projectColor: color,
    });
  };
  useEffect(() => {
    // This will run whenever the project prop changes
    // console.log('Project has changed:', project);

    // Update form values if needed
    setValues({
      location: project ? project.location : "",
      project: project ? project.projectName : "",
      start_time: project ? project.start_time : "",
      end_time: project ? project.end_time : "",
      projectColor: project ? project.projectColor : "",
    });
    setImage((prev) => {
      if (project) {
        return project.image;
      }
    });
  }, [project]); // Dependency array
  // console.log(errors);
  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer />
      <Dialog open={open} onClose={onClose} maxWidth="md" sx={{}}>
        <DialogTitle sx={headingStyle}>
          <Typography sx={headingStyleText}>Edit Project</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
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
                height: "180px",
              }}
            >
              <div
                style={{ textAlign: "center", width: "100%", height: "100%" }}
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
                    src={image ? image : UploadIcon}
                    alt=""
                    width={isMobile?"80px":"120px"}
                    height={isMobile?"80px":"120px"}
                  />

                  {/* Text */}
                  <Typography variant="body1" sx={labelStyle}>
                    {image ? <></> : "Upload your photo"}
                  </Typography>
                </label>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} xl={6} lg={6}>
              {/* Projects input */}
              <Typography variant="body1">Project Name</Typography>
              <TextField
                error={Boolean(errors.project)} // Simplified error handling
                placeholder="Skyscraper"
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
                  maxLength: 50,
                }}
                onBlur={handleBlur}
                FormHelperTextProps={{ color: "error" }}
                helperText={
                  errors.project && touched.project ? errors.project : ""
                }
              ></TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              {/* Name input */}
              <Typography variant="body1">Location</Typography>
              <TextField
                error={errors.location ? true : false}
                placeholder="San Francisco"
                name={"location"}
                value={values.location}
                fullWidth
                inputProps={{
                  style: {
                    ...InputStyle,
                    border:
                      errors.location && touched.location
                        ? "1px solid #d32f2f"
                        : "1px solid #E0E4EC",
                  },
                  maxLength: 50,
                }}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.location && touched.location ? errors.location : ""
                }
              />
            </Grid>

            <Grid item xs={12} sm={6} xl={6} lg={6}>
              <Typography variant="body1">Start Time</Typography>
              <Box
                sx={{
                  width: "100%", // Set width to 100% for responsiveness
                  alignSelf: "center",
                  fontSize: "14px",
                  // border: "1px solid #ccc",
                  // borderRadius: "12px",
                  color: "#202227",
                  fontFamily: 'var(--main-font-family)',
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker
                    sx={{
                      width: "100%",
                      ".MuiOutlinedInput-notchedOutline ": {
                        border: "1px solid #ccc !important",
                        borderRadius: "12px",
                        // paddingRight: "0px"
                      },
                    }}
                    value={dayjs(values.start_time)}
                    onChange={handleStartDateChange}
                    format="MM/DD/YYYY"
                  />
                </LocalizationProvider>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} xl={6} lg={6}>
              <Typography variant="body1">End Time</Typography>
              <Box
                sx={{
                  width: "100%", // Set width to 100% for responsiveness
                  alignSelf: "center",
                  fontSize: "14px",
                  // border: "1px solid #ccc",
                  // borderRadius: "12px",
                  color: "#202227",
                  fontFamily: 'var(--main-font-family)',
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker
                    sx={{
                      width: "100%",
                      ".MuiOutlinedInput-notchedOutline ": {
                        border: "1px solid #ccc !important",
                        borderRadius: "12px",
                        paddingRight: "0px",
                      },
                    }}
                    value={dayjs(values.end_time)}
                    onChange={handleEndDateChange}
                    format="MM/DD/YYYY"
                    minDate={
                      values.start_time
                        ? dayjs(values.start_time).add(1, "day")
                        : dayjs(Date.now()).add(1, "day")
                    }
                  />
                </LocalizationProvider>
              </Box>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              
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
            </Grid> */}
            <Grid item xs={12} sm={12}>
              {/* <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={1}
                p={0}
              >
                {colors.map((color) => {
                  return (
                    <>
                      <Box
                        width={"40px"}
                        height={"60px"}
                        bgcolor={color}
                        sx={{cursor:'pointer'}}
                        boxShadow={
                          (values.projectColor ? values.projectColor === color : '#FFF' === color)
                            ? "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;"
                            : ""
                        }
                        borderRadius={"7px"}
                        onClick={() => {
                          handleProjectColorChange(color);
                        }}
                        border={
                          (values.projectColor ? values.projectColor === color : '#FFF' === color)
                          ? "3px solid #ADADAD" : "1px solid #ADADAD"
                        }
                      ></Box>
                    </>
                  );
                })}
                Req change to display an array of 12 colors
                <ColorPicker />
              </Stack> */}
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                p={1}
              >
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  gap={2}
                >
                  {/* {colors.map((color) => {
                  return (
                    <>
                      <Box
                        width={"40px"}
                        height={"60px"}
                        bgcolor={color}
                        sx={{cursor:'pointer'}}
                        boxShadow={
                          (projectColor ? projectColor === color : '#FFF' === color)
                            ? "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;"
                            : ""
                        }
                        borderRadius={"7px"}
                        onClick={() => {
                          handleProjectColorChange(color);
                        }}
                        border={
                          (projectColor ? projectColor === color : '#FFF' === color)
                          ? "3px solid #ADADAD" : "1px solid #ADADAD"
                        }
                      ></Box>
                    </>
                  );
                })} */}
                  <Box
                    width={"40px"}
                    height={"40px"}
                    bgcolor={values.projectColor}
                    sx={{ cursor: "pointer" }}
                    // boxShadow={
                    //   (projectColor ? projectColor === color : '#FFF' === color)
                    //     ? "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;"
                    //     : ""
                    // }
                    borderRadius={"99999px"}
                    border={"1px dashed gray"}
                    // onClick={() => {
                    //   handleProjectColorChange(color);
                    // }}
                    // border={
                    //   (projectColor ? projectColor === color : '#FFF' === color)
                    //   ? "3px solid #ADADAD" : "1px solid #ADADAD"
                    // }
                  ></Box>
                  {/* Req change to display an array of 12 colors */}
                  <ColorPicker
                    editModal={true}
                    handleProjectColorChange={handleProjectColorChange}
                  />
                </Stack>
                <Stack>
                  <Typography
                    onClick={handleNavigation}
                    color={"#4C8AB1"}
                    sx={styles.link}
                  >
                    Edit phases
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "center", mb: 2 }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            sx={{ textAlign: "center" }}
          >
            <Button
              type={"submit"}
              buttonText="Update Project"
              color="#ffffff"
              backgroundColor={isSubmitting ? "gray" : "#4C8AB1"}
              width="150px"
              height="44px"
              borderRadius="50px"
              onClick={handleSubmit}
              disabled={isSubmitting}
            />
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
  fontFamily: 'var(--main-font-family)',
  border: "1px solid #E0E4EC",
  padding: "10px",

  "& .MuiOutlinedInputRoot": {
    "& fieldset": {
      border: "none",
    },
  },
};
const styles = {
  link: {
    cursor: "pointer",
    // textDecoration: "underline",
    "&:hover": {
      color: "#326273", // Change color on hover
    },
    "&:focus": {
      outline: "none", // Remove outline on focus
      color: "#326273", // Change color on focus
    },
    fontSize: "14px",
  },
};

const headingStyle = {
  marginTop: "20px",
  // marginBottom: "10px",
  marginLeft: "25px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};
const headingStyleText = {
  fontFamily: 'var(--main-font-family)',
  fontWeight: "500",
  fontSize: "22px",
  color: "#4C8AB1",
};
const labelStyle = {
  marginTop: "10px",
  fontFamily: 'var(--main-font-family)',
  fontWeight: "400",
  fontSize: "13px",
  color: "#535353C9",
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
