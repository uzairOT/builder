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
  CircularProgress,
  Stack,
  IconButton,
  TextareaAutosize,
  ToggleButton,
  Switch,
} from "@mui/material";
import actionButton from "../../UI/actionButton";
import upload from "./assets/upload.png";
import "../../../App.css";
import { getPresignedUrl, uploadToS3 } from "../../../utils/S3";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fileTypeIcons } from "./assets/fileTypes";
import filePlaceHolder from "../../../assets/FileSvg/file.svg";
import CloseIcon from "@mui/icons-material/Close";
import { getTokenFromLocalStorage } from "../../../redux/apis/apiSlice";
import CheckIcon from '@mui/icons-material/Check';

function AddImage({ handleOpen, handleClose, heading, type, fetchData }) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [primary, setPrimary] = useState(null);
  const objectFit = { objectFit: image ? "cover" : "none" };
  const dotBorder = { border: image ? "none" : "2px dashed #D9D9D9" };
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const { id } = useParams();
  const [notes, setNotes] = useState("");
  const uploadFileToServer = async (selectedFile) => {
    if (selectedFile) {
      try {
        const res = await axios.post(
          "http://3.135.107.71/project/file",
          {
            fileName,
            fileType,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return res.data.data.url;
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  // const handleClickOpen = () => {
  //   handleOpen();
  //   setOpen(true);
  // };

  const handleClickClose = () => {
    handleClose();
    setImage(null);
    setOpen(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const fileSizeLimit = 25 * 1024 * 1024;
    if (file?.size > fileSizeLimit) {
      toast.warning("Please upload file size less than 25mb.");
      return;
    }
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

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const fileSizeLimit = 25 * 1024 * 1024;
    if (file.size > fileSizeLimit) {
      toast.warning("Please upload file size less than 25mb.");
      return;
    }
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      toast.warning("Please select a file");
      return false;
    }
    try {
      setLoading(true);
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      const fileUrl = await uploadFileToServer(selectedFile);
      console.log(fileUrl);
      const uploadedFileUrl = await uploadToS3(fileUrl, selectedFile);
      const fileType = getFileType(heading);
      const apiUrl = `http://3.135.107.71/project/files/${id}`;
      if(!uploadedFileUrl){
        toast.error('Error uploading Image.')
        return
      }
      const requestBody = {
        fileUrl: uploadedFileUrl,
        fileType: fileType,
        notes: notes,
        primary: primary,
      };
      const response = await axios
        .post(apiUrl, requestBody, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then()
        .finally(() => {
          setLoading(false);
          handleClickClose();
          fetchData();
        });
      if (response.status !== 201) {
        throw new Error("Failed to save file URL");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const getFileType = (heading) => {
    const lowerCaseHeading = heading.toLowerCase();
    if (lowerCaseHeading.includes("image")) {
      return "image";
    } else if (lowerCaseHeading.includes("drawing")) {
      return "drawing";
    } else if (lowerCaseHeading.includes("permit")) {
      return "permit";
    }
    return null;
  };
  console.log(heading);
  console.log(fileTypeIcons);
  console.log(fileTypeIcons.get(selectedFile?.name?.split(".").pop()));
  return (
    <div className="App">
      <Dialog
        open={true}
        onClose={handleClickClose}
        PaperProps={{
          sx: { ...themeStyle.paperPropsStyle },
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <DialogTitle sx={themeStyle.typoTitle}>{heading}</DialogTitle>
          <IconButton onClick={handleClickClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <DialogContent>
          <div
            style={{ textAlign: "center" }}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <input
              type="file"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              id="avatarInput"
            />
            <label htmlFor="avatarInput">
              <div style={{ ...themeStyle.avatarBox, ...dotBorder }}>
                {selectedFile?.type?.split("/")[0] === "image" ? (
                  <img
                    src={image ? image : upload}
                    alt={image ? "Uploaded Avatar" : "Placeholder Avatar"}
                    style={{
                      ...themeStyle.uploadedImg,
                    }}
                  />
                ) : selectedFile?.name?.split(".").pop() ? (
                  <img
                    src={filePlaceHolder}
                    alt={`Uploaded ${selectedFile?.name
                      ?.split(".")
                      .pop()
                      .toUpperCase()} File`}
                    style={{
                      ...themeStyle.uploadedImg,
                    }}
                  />
                ) : (
                  <>
                    <img
                      src={upload}
                      alt={"Placeholder Avatar"}
                      style={{
                        ...themeStyle.avatarImg,
                        ...objectFit,
                      }}
                    />
                  </>
                )}
                <Typography sx={themeStyle.avatarText}>
                  {image ? "" : "Drag your file here"}
                </Typography>
              </div>
            </label>
          </div>
          <Box sx={{ textAlign: "center" }}>
            <TextareaAutosize
              multiline
              minRows={5}
              maxLength={1000}
              style={themeStyle.inputStyle}
              required
              placeholder="Type Note Here ....."
              margin="dense"
              id="notes"
              name="notes"
              type="notes"
              variant="standard"
              onChange={(e) => setNotes(e.target.value)}
            />
          </Box>
              <Stack direction={'row'} justifyContent={'start'} alignItems={'center'} gap={4}>
                <Stack direction={'row'} justifyContent={'start'} alignItems={'center'}>

              <Typography textAlign={"left"} fontFamily={"inherit"} fontSize={'12px'} pl={primary ? '':'13px'}>
                {primary ? 'Unset' : 'Set'} Primary
              </Typography>
              
          <Switch
            value="primary"
            selected={primary}
            onChange={()=>{
              setPrimary(prev => !prev);
            }}
  
            >
          </Switch>
            </Stack>
            <Stack>{primary ? <CheckIcon sx={{color:'green'}}/> : <CloseIcon sx={{color:'red'}} />}</Stack>
            </Stack>
        </DialogContent>
        <DialogActions sx={themeStyle.generalBox}>
          <Button
            sx={{ ...actionButton, ...themeStyle.sendButton }}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={"20px"} sx={{ color: "white" }} />
            ) : (
              "Send"
            )}
          </Button>
        </DialogActions>
      </Dialog>
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
    width: "90%",

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
    padding: "1rem 2rem",
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
    top: "-25px",
    left: 0,
    width: "100%",
    height: "100%",
  },
  uploadedImg: {
    width: "200px",
    height: "200px",
    objectFit: "scale-down",
  },
  avatarBox: {
    width: "90%",
    height: 200,
    borderRadius: "0.5rem",
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
