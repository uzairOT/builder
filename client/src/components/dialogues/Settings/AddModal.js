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
  FormControl,
  FormHelperText,
} from "@mui/material";
import UploadIcon from "../../../assets/settings/uploadimg.png";
import Button from "../../UI/CustomButton";
import { useFormik } from "formik";
import { settingsSchema } from "../../../utils/Validation/settingsPageSchema";
import { useLocation } from "react-router-dom";
import {
  useAddAssignRoleMutation,
  useGetAssignedRolesQuery,
} from "../../../redux/apis/Admin/assignRoleApiSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { allUserProjects } from "../../../redux/slices/Project/userProjectsSlice";
import { useSelector } from "react-redux";
import { useGetUserProjectsQuery } from "../../../redux/apis/Project/userProjectApiSlice";
import { createFilterOptions } from "@mui/material/Autocomplete";
import axios from "axios";
import { uploadToS3 } from "../../../utils/S3";

function AddModal({ title, open, onClose }) {
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

  const filter = createFilterOptions();

  const { data, isLoading, error } = useGetUserProjectsQuery({
    userId: currentUserId,
  });

  const projectNames = data
    ? data.projects.map((project) => ({
        id: project.id,
        projectName: project.projectName,
      }))
    : [];

  const [assignRolePost] = useAddAssignRoleMutation();
  const { refetch } = useGetAssignedRolesQuery({
    userRole: userRole,
    userId: currentUserId,
  });

  const uploadFileToServer = async (selectedFile) => {
    if (selectedFile) {
      try {
        const res = await axios.post("http://192.168.0.104:8080/project/file", {
          fileName,
          fileType,
        });
        return res.data.data.url;
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const onSubmit = async (values, action) => {
    try {
      const fileUrl = await uploadFileToServer(selectedFile);
      const uploadedFileUrl = await uploadToS3(fileUrl, selectedFile);
      const post = {
        ...values,
        image: uploadedFileUrl,
        userRole: userRole,
        userId: currentUserId,
      };

      const res = await assignRolePost(post);
      refetch();

      if (res.error) {
        toast.error(res?.error.data.error);
      }

      action.resetForm();
      setImage(null);
    } catch (err) {
      console.log(err);
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
  } = useFormik({
    initialValues: {
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

  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer />
      <Dialog open={open} onClose={onClose} maxWidth="md" sx={{}}>
        <DialogTitle>Add {title}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {/* ... (rest of the component remains unchanged) ... */}
          </Grid>
        </DialogContent>
        <DialogActions>
          {/* ... (rest of the component remains unchanged) ... */}
        </DialogActions>
      </Dialog>
    </form>
  );
}

export default AddModal;

// Styling constants
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