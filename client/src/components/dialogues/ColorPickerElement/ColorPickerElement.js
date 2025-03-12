import React, { useState } from "react";
import {
  HexColorPicker,
  RgbaColorPicker,
  RgbaStringColorPicker,
  HexColorInput,
} from "react-colorful";
import {
  useUpdateProjectPhaseMutation,
  useAddPhaseLineMutation,
  useAddProjectPhaseMutation,
} from "../../../redux/apis/Project/projectApiSlice";

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
  Stack,
  IconButton,
} from "@mui/material";
import actionButton from "../../UI/actionButton";
import "../../../App.css";

import "./ColorPickerElement.css";
import { yellow } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  addInitialPhase,
  addPhase,
} from "../../../redux/slices/Project/projectInitialProposal";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Close from "@mui/icons-material/Close";
import { useTranslation } from 'react-i18next'


function ColorPickerElement({
  handleUpdateOpen,
  handleUpdateClose,
  handleAddClose,
  handleAddOpen,
  phaseData,
  setPhaseData,
  PhaseHeading,
  onSubmit,
  adminProjectView,
  InitialProposalView,
  formattedView,
}) {
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const localUser = localStorage.getItem("userInfo");
  const currentUser = JSON.parse(localUser);
  const local = localStorage.getItem("projectId");
  const projectId = currentUser?.incompleteProject?.incomplete
    ? currentUser?.incompleteProject?.projectId
    : parseInt(local);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(phaseData ? phaseData.color : "#FFF");
  const [colorMode, setColorMode] = useState("");
  const [phaseName, setPhaseName] = useState(
    phaseData?.phase_name ? phaseData.phase_name : ""
  );
  const [updateProjectPhase, { isLoading: updateLoading }] =
    useUpdateProjectPhaseMutation();
  const [addProjectPhase, { isLoading }] = useAddProjectPhaseMutation();
  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === "rgba" ? "hex" : "rgba"));
  };

  // const handleClickOpen = () => {
  //   //console.log('handle Click open run')
  //   if (PhaseHeading === "Update Phase") {
  //     handleUpdateOpen();
  //   } else {
  //     handleAddOpen();
  //   }
  //   setOpen(true);
  // };

  const handleClickClose = () => {
    if (PhaseHeading === t("PhaseModal.updatePhase")) {
      handleUpdateClose();
    } else {
      handleAddClose();
    }
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (phaseName === "") {
      toast.warning("Please enter a phase name");
      return;
    }

    const updatedPhaseData = {};
    const lowerCasePhaseName = phaseName.toLowerCase();

    if (PhaseHeading === t("PhaseModal.updatePhase")) {
      if (phaseData.phaseName !== lowerCasePhaseName) {
        updatedPhaseData.phaseName = lowerCasePhaseName;
      }
      if (phaseData.color !== color) {
        updatedPhaseData.color = color;
      }

      if (Object.keys(updatedPhaseData).length === 0) {
        toast.info("Same phase data.");
        return;
      }

      try {
        const res = await updateProjectPhase({
          id: phaseData?.id,
          updatedData: updatedPhaseData,
        });

        if (res?.data?.success === true) {
          setPhaseData((prevPhaseData) => ({
            ...prevPhaseData,
            ...updatedPhaseData,
          }));
          onSubmit(phaseName, color);
          setPhaseName(phaseName);
          toast.success("Phase updated successfully!");
          handleUpdateClose();
        } else {
          toast.error(res?.error?.data?.error || "Failed to update phase.");
        }
      } catch (e) {
        console.log("New Error", e);
        toast.error(e?.error?.data?.error || "Something went wrong!");
      }
    } else {
      const data = {
        phaseName: lowerCasePhaseName,
        color,
        colorMode,
        projectId: adminProjectView ? id : projectId,
        initial: InitialProposalView ? true : adminProjectView ? false : true,
      };

      try {
        const res = await addProjectPhase(data, formattedView).unwrap();
        toast.success("Phase added successfully!");
        if (InitialProposalView) {
          dispatch(addInitialPhase(res.phase));
        } else {
          dispatch(addPhase(res.phase));
        }
        setPhaseData((prevPhaseData) => ({ ...prevPhaseData, ...data }));
        handleAddClose();
      } catch (e) {
        toast.error(
          e.message || e.data.message || e.error || "Something went wrong!"
        );
      }
    }
  };

  const handlePhaseName = (e) => {
    setPhaseName((prev) => {
      return e.target.value;
    });
  };

  return (
    <div className="App">
      <>
        <Dialog
          open={true}
          onClose={handleClickClose}
          PaperProps={{
            sx: { ...paperPropsStyle },
            component: "form",
            onSubmit: handleSubmit,
          }}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <DialogTitle sx={typoTitle}>{PhaseHeading}</DialogTitle>
            <IconButton
              style={{ width: "40px", height: "40px" }}
              onClick={handleClickClose}
            >
              <Close />
            </IconButton>
          </Stack>
          <DialogContent sx={{ padding: "0rem 1.5rem 3rem 1.5rem" }}>
            <Typography sx={typoText}>{t("PhaseModal.phase")}</Typography>
            <TextField
              inputProps={{ maxLength: 50 }}
              sx={{
                ...inputStyle,
                "& .MuiInputBase-input::placeholder": {
                  fontFamily: "var(--main-font-family)",
                },
              }}
              margin="dense"
              id="phaseName"
              name="phaseName"
              placeholder={"ex: Site Preparation"}
              // label="Email Address"
              type="text"
              variant="standard"
              value={phaseName}
              onChange={handlePhaseName}
            />
            <Typography sx={typoText}>{t("PhaseModal.selectColor")}</Typography>
            {/* Req change to display an array of 12 colors */}
            {/* <Stack direction={"row"} alignItems={"center"} flexWrap={'wrap'} justifyContent={'center'} gap={2} p={1}>
                {colors.map((color1) => {
                  return (
                    <>
                      <Box
                         width={"40px"}
                         height={"60px"}
                         bgcolor={color1}
                         boxShadow={color === color1 ? 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;' :''}
                         borderRadius={"7px"}
                        onClick={()=>{ setColor(color1)}}
                        border={color === color1 ? '3px solid #ADADAD' : '1px solid #ADADAD'}
                      ></Box>
                    </>
                  );
                })}
               
              </Stack> */}
            <div className="custom-pointers example">
              {colorMode === "rgba" ? ( // Render RGBA color picker if colorMode is 'rgba'
                <Box sx={generalBox}>
                  <RgbaStringColorPicker
                    sx={{ gap: "0.5rem", ...generalBox }}
                    color={color}
                    onChange={setColor}
                  />
                </Box>
              ) : (
                <Box sx={generalBox}>
                  <HexColorPicker color={color} onChange={setColor} />
                </Box>
              )}

              <Box sx={{ ...generalBox, ...inputColorBox }}>
                <HexColorInput
                  style={{ width: "60%" }}
                  color={color}
                  onChange={setColor}
                />
                <Box sx={{ ...colorBox, background: color }} />
              </Box>
              <Box sx={generalBox} onClick={toggleColorMode}>
                <Typography sx={{ ...typoText, cursor: "pointer" }}>
                  {colorMode === "rgba" ? "RGBA" : "HEX"}
                </Typography>
              </Box>
            </div>
          </DialogContent>
          <DialogActions sx={generalBox}>
            <Button
              sx={{
                ...actionButton,
                ...addPhaseButton,
                minWidth: "10rem !important",
              }}
              type="submit"
              onClick={handleSubmit}
              disabled={
                PhaseHeading === t("PhaseModal.updatePhase") ? updateLoading : isLoading
              }
            >
              {PhaseHeading}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </div>
  );
}

const typoTitle = {
  fontFamily: "var(--main-font-family)",
  fontSize: "1.5rem",
  color: "#4C8AB1",
};
const inputStyle = {
  width: "100%", // Set width to 100% for responsiveness
  height: "2rem",
  marginBottom: "1rem",
  alignSelf: "center",
  padding: "8px",
  fontSize: "14px",
  border: "1px solid #ccc",
  borderRadius: "12px",
  color: "#202227",
  fontFamily: "var(--main-font-family)",
  paddingLeft: "-1.5rem",
  backgroundColor: "#EDF2F6",
};

const generalBox = {
  display: "flex",
  justifyContent: "center",
  marginTop: "2rem",
};

const paperPropsStyle = {
  borderRadius: "1rem",
  width: { lg: "25%", md: "50%", sm: "100%", xs: "100%" },
  padding: "0.5rem", // Change background color here
};

const typoText = {
  fontFamily: "var(--main-font-family)",
  fontSize: "1rem",
  color: "#202227",
};
const colorBox = {
  height: "2rem",
  width: "2rem",
};
const inputColorBox = {
  gap: "0.3rem",
  marginTop: "0.2rem",
};
const addPhaseButton = {
  height: "70%",
  width: "9rem",
  marginTop: "-2rem",
};
export default ColorPickerElement;
