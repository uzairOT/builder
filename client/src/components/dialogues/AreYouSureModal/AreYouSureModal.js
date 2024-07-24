import React, { useState } from "react";
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
  MenuItem,
  Avatar,
  IconButton,
  Stack,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import YellowBtn from "../../UI/button";
import { useDispatch } from "react-redux";
import { resetUserAndRoleEmail } from "../../../redux/slices/projectFormSlice";

function AreYouSureModal({
  open,
  handleClose,
  handleConfirmDelete,
  isLoading,
  text,
}) {
  const handleClickClose = () => {
    handleClose();
  };

  return (
    <div>
      <Dialog
        PaperProps={{
          sx: { ...paperPropsStyle },
          component: "form",
        }}
        open={open}
        onClose={handleClickClose}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        {/* <Stack direction={"row-reverse"} justifyContent={"space-between"}>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton> */}
        {/* <DialogTitle sx={typoTitle}>{"Are You Sure"}</DialogTitle> */}
        {/* </Stack> */}
        <DialogContent>
          <DialogContentText sx={typoTect} id="alert-dialog-slide-description">
            Are you sure you want to delete this {text}?
          </DialogContentText>
        </DialogContent>

        <DialogActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            marginTop: "1rem",
            flexDirection: { sm: "row", xs: "column-reverse" },
          }}
        >
          <Button
            variant="outlined"
            sx={{
              ...YellowBtn,
              ...dialogueActionButton,
              padding: "0.8rem 0.8rem",
              fontSize: {
                lg: "0.9rem",
                md: "0.9rem",
                sm: "0.8rem",
                xs: "0.8rem",
              },
            }}
            onClick={() => handleConfirmDelete(false)}
          >
            Cancel
          </Button>
          <Button
            sx={{
              ...YellowBtn,
              padding: "0.8rem 0.8rem",
              fontSize: {
                lg: "0.9rem",
                md: "0.9rem",
                sm: "0.8rem",
                xs: "0.8rem",
              },
            }}
            onClick={() => handleConfirmDelete(true)}
          >
            {isLoading ? <CircularProgress size={"1.25rem"} /> : "Yes"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const paperPropsStyle = {
  borderRadius: "1rem",
  // width: { lg: "25%", md: "50%", sm: "50%", xs: "50%" },
  // width: "30%",
  maxWidth: "none",
  display: "flex",
  padding: "1rem", // Change background color here
};
const paperPropsStyleMobile = {
  borderRadius: "1rem",
  // width: { lg: "25%", md: "50%", sm: "50%", xs: "50%" },
  maxWidth: "none",
  display: "flex",
};
const crossIcon = {
  position: "absolute",
  right: 20,
  top: 8,
};
const typoTitle = {
  fontFamily: "Arial Rounded MT, sans-serif",
  fontWeight: 600,
  fontSize: "1.5rem",
  color: "#202227",
  padding: "0px",
};

const typoTect = {
  fontFamily: "Arial Rounded MT, sans-serif",
  fontWeight: 500,
  fontSize: "1rem",
  color: "#575757",
};
const dialogueActionButton = {
  border: "1px solid #FFAC00",
  background: "#FFF",
  padding: { sm: "1rem 1.5rem", xs: "0rem" },
  color: "#FFAC00",
  "&:hover": {
    background: "#FFF",
  },
};
export default AreYouSureModal;
