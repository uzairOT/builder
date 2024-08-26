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

function SkipInvite({
  handleOpen,
  handleClose,
  handleNextStep,
  isMobile,
  isLoading,
}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleSkip = () => {
    handleNextStep();
    // handleClose();
  };

  const handleClickOpen = () => {
    handleOpen();
    setOpen(true);
  };

  const handleClickClose = () => {
    handleClose();
    setOpen(false);
  };

  return (
    <div>
      {isMobile ? (
        <>
          <Dialog
            PaperProps={{
              sx: { ...paperPropsStyleMobile },
              component: "form",
            }}
            open={handleClickOpen}
            onClose={handleClickClose}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
          >
            {/* <Stack justifyContent={"center"} alignItems={"center"} gap={1}>
              <Stack>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={crossIcon}
                >
                  <CloseIcon />
                </IconButton>
              </Stack>
              <Stack>
                <DialogTitle sx={{...typoTitle,fontSize: "1rem",}}>
                  {"Skip without inviting?"}
                </DialogTitle>
              </Stack>
            </Stack> */}
            <DialogContent>
              <DialogContentText
                sx={typoTect}
                id="alert-dialog-slide-description"
              >
                Are you sure you want to skip this step without inviting ?
              </DialogContentText>
            </DialogContent>
            <DialogActions
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "8px",
                flexDirection: { sm: "row-reverse", xs: "column-reverse" },
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  ...YellowBtn,
                  ...dialogueActionButton,
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                sx={{ ...YellowBtn, padding: "1rem 1rem" }}
                onClick={handleSkip}
              >
                {isLoading ? (
                  <CircularProgress size={"1.25rem"} />
                ) : (
                  "Yes"
                )}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <Dialog
          PaperProps={{
            sx: { ...paperPropsStyle },
            component: "form",
          }}
          open={handleClickOpen}
          onClose={handleClickClose}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
        >
          {/* <Stack direction={'row-reverse'} justifyContent={'space-between'}>

          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <DialogTitle sx={typoTitle}>{"Skip without inviting?"}</DialogTitle>
        </Stack> */}
          <DialogContent>
            <DialogContentText
              sx={typoTect}
              id="alert-dialog-slide-description"
              pt={1}
            >
              Are you sure you want to skip this step without inviting ?
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "3rem",
              marginBottom: "8px",
              flexDirection: { sm: "row-reverse", xs: "column-reverse" },
            }}
          >
            <Button
              variant="outlined"
              sx={{
                ...YellowBtn,
                ...dialogueActionButton,
                fontSize: {
                  lg: "0.9rem",
                  md: "0.9rem",
                  sm: "0.8rem",
                  xs: "0.8rem",
                },
              }}
              onClick={handleClose}
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
              onClick={handleSkip}
              // disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={"1.25rem"} /> : "Yes"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
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
  fontFamily: 'var(--main-font-family)',
  fontWeight: 600,
  fontSize: "1.5rem",
  color: "#202227",
  padding: "0px",
};

const typoTect = {
  fontFamily: 'var(--main-font-family)',
  fontWeight: 500,
  fontSize: "1rem",
  color: "#575757",
};
const dialogueActionButton = {
  border: "1px solid #FFAC00",
  background: "#FFF",
  padding: "0.7rem 0.8rem",
  color: "#FFAC00",
  "&:hover": {
    background: "#FFF",
  },
};
export default SkipInvite;
