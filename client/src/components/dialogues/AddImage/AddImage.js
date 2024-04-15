import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Typography,
} from "@mui/material";
import actionButton from "../../UI/actionButton";
import upload from "./assets/upload.png";
import "../../../App.css";
import { getPresignedUrl, uploadToS3 } from "../../../utils/S3";
import axios from "axios";
function AddImage({ handleOpen, handleClose, heading ,type}) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const objectFit = { objectFit: image ? "cover" : "none" };
  const dotBorder = { border: image ? "none" : "2px dashed #D9D9D9" };
const [fileName,setFileName] = useState("")
const [fileType,setFileType] = useState("")
const [selectedFile,setSelectedFile] = useState("")
  const uploadFileToServer = async (selectedFile) => {
    if (selectedFile) {
      try {
        const res = await axios.post("http://192.168.0.107:8080/project/file",{fileName,fileType});
        console.log(res);
        return res.data.data.url;
      } catch (error) {
        console.error("Error uploading file:", error);
        // Handle error
      }
    }
  };
console.log(type)
    //   const res = await getPresignedUrl({
    //     fileName: file.name,
    //     fileType: file.type,
    //   });
    //   const fileUrl = await uploadFileToServer(selectedFile);
  const handleClickOpen = () => {
    handleOpen();
    setOpen(true);
    setImage(null);
  };
  const handleClickClose = () => {
    handleClose();
    setOpen(false);
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log(file)
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
  const handleSubmit = async (event) => {
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      console.log(selectedFile);
      // Upload file to server and get the file URL
      const fileUrl = await uploadFileToServer(selectedFile);
      // Upload file to S3 and get the uploaded file URL
      const uploadedFileUrl = await uploadToS3(fileUrl, selectedFile);
      console.log(uploadedFileUrl);
      // Make POST API call to save file URL
      const fileType = getFileType(heading);
      const projectId = 204; // Replace with the actual projectId
      const apiUrl = `http://192.168.0.107:8080/project/files/${projectId}`;
      const requestBody = {
        fileUrl: uploadedFileUrl,
        fileType: fileType // Assuming heading is defined somewhere
      };
      const response = await axios.post(apiUrl, requestBody);
      if (response.status !== 200) {
        throw new Error('Failed to save file URL');
      }
      console.log(heading);
    } catch (error) {
      console.error('Error:', error.message);
      // Handle error, such as displaying an error message to the user
    }
  };
  const getFileType = (heading) => {
    // Convert heading to lowercase for case-insensitive comparison
    const lowerCaseHeading = heading.toLowerCase();
    // Check if the heading contains specific keywords
    if (lowerCaseHeading.includes('images')) {
      return 'image';
    } else if (lowerCaseHeading.includes('drawing')) {
      return 'drawing';
    } else if (lowerCaseHeading.includes('permit')) {
      return 'permit';
    }
    // Default to null if none of the keywords match
    return null;
  };
  return (
    <div className="App">
      <>
        <Dialog
          open={handleClickOpen}
          onClose={handleClickClose}
          PaperProps={{
            sx: { ...themeStyle.paperPropsStyle },
            component: "form",
            onSubmit: handleSubmit,
          }}
        >
          <DialogTitle sx={themeStyle.typoTitle}>{heading}</DialogTitle>
          <DialogContent>
            <div
              style={{ textAlign: "center" }}
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
                <div style={{ ...themeStyle.avatarBox, ...dotBorder }}>
                  <img
                    src={image ? image : upload}
                    alt={image ? "Uploaded Avatar" : "Placeholder Avatar"}
                    style={{
                      ...themeStyle.avatarImg,
                      ...objectFit,
                    }}
                  />
                  <Typography sx={themeStyle.avatarText}>
                    {image ? "" : "Drag your file here"}
                  </Typography>
                </div>
              </label>
            </div>
            <Box sx={{ textAlign: "center" }}>
              <TextField
                sx={themeStyle.inputStyle}
                required
                placeholder="Type Note Here ....."
                margin="dense"
                id="name"
                name="name"
                type="name"
                variant="standard"
              />
            </Box>
          </DialogContent>
          <DialogActions sx={themeStyle.generalBox}>
            <Button
              sx={{ ...actionButton, ...themeStyle.sendButton }}
              type="submit"
            >
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </div>
  );
}
const themeStyle = {
  typoTitle: {
    fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
    fontSize: "1.5rem",
    color: "#4C8AB1",
    marginLeft: "-1rem",
  },
  inputStyle: {
    // width: "100%", // Set width to 100% for responsiveness
    width: "90%",
    height: "3rem",
    marginBottom: "2rem",
    padding: "0.5rem",
    fontSize: "14px",
    border: "1px solid #D8D8D8",
    borderRadius: "0.5rem",
    color: "#202227",
    fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
    backgroundColor: "#FAFAFA",
  },
  generalBox: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "1rem",
  },
  paperPropsStyle: {
    borderRadius: "1rem",
    width: { lg: "50%", md: "60%", sm: "60%", xs: "70%" },
    padding: "1rem 2rem", // Change background color here
  },
  typoText: {
    fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
    fontSize: "1rem",
    color: "#202227",
  },
  sendButton: {
    width: { lg: "20%", md: "20%", sm: "30%", xs: "40%" },
    marginTop: "-2rem",
  },
  avatarImg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  avatarBox: {
    width: "90%",
    height: 150,
    borderRadius: "0.5rem",
    // border: "2px dashed #D9D9D9",
    overflow: "hidden",
    display: "inline-block",
    position: "relative",
  },
  avatarText: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "0.8rem",
    color: "#121212",
    marginTop: "6rem",
  },
};
export default AddImage;