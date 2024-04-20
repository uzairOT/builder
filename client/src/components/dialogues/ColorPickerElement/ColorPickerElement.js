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
} from "@mui/material";
import actionButton from "../../UI/actionButton";
import "../../../App.css";

import "./ColorPickerElement.css";
import { yellow } from "@mui/material/colors";
import { useDispatch,useSelector  } from 'react-redux';
import { addPhase } from '../../../redux/slices/Project/projectInitialProposal'; 
import {useParams} from 'react-router-dom';

function ColorPickerElement({
  handleUpdateOpen,
  handleUpdateClose,
  handleAddClose,
  handleAddOpen,
  phaseData,
  setPhaseData,
  PhaseHeading,
  onSubmit,
  adminProjectView
}) {
  const dispatch = useDispatch();
  const local = localStorage.getItem('projectId');
  const projectId = parseInt(local);
  
  const {id} = useParams();
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(phaseData ? phaseData.color : "");
  const [colorMode, setColorMode] = useState("");
  const [phaseName, setPhaseName] = useState(
    phaseData?.phase_name ? phaseData.phase_name : ""
  );
  const [updateProjectPhase] = useUpdateProjectPhaseMutation();
  const [addProjectPhase] = useAddProjectPhaseMutation();
  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === "rgba" ? "hex" : "rgba"));
  };

  const handleClickOpen = () => {
    //console.log('handle Click open run')
    if (PhaseHeading === "Update Phase") {
      handleUpdateOpen();
    } else {
      handleAddOpen();
    }
    setOpen(true);
  };

  const handleClickClose = () => {
    if (PhaseHeading === "Update Phase") {
      handleUpdateClose();
    } else {
      handleAddClose();
    }
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (PhaseHeading === "Update Phase") {
      const updatedPhaseData = {
        phaseName,
        color,
      };
      //console.log('clicked! phaseName: ', phaseName, ' color : ', color, ' updatedPhaseData: ', updatedPhaseData)
      await updateProjectPhase({ id: phaseData?.id, updatedData: updatedPhaseData });
      setPhaseData((phaseData) => ({ ...phaseData, ...updatedPhaseData }));
      //console.log(updatedPhaseData);
      //console.log(phaseData);
      onSubmit(phaseName, color);
      setPhaseName(phaseName);
      handleUpdateClose();
    } else {
      onSubmit(phaseName, color);
      const data = {
        phaseName,
        color,
        colorMode,
        projectId: adminProjectView ? id : projectId,
      };
      //console.log(data)
      const res = await addProjectPhase(data).unwrap().then().catch(e=>{ alert(e.message)});
      //console.log('Response:', res.phase);
      setPhaseData((phaseData) => ({ ...phaseData, ...data }));
      //console.log(data);
      //console.log(phaseData);
      dispatch(addPhase(res.phase))
      handleAddClose();
    }
  };

  const handlePhaseName = (e) => {
    setPhaseName((prev) => {
      return e.target.value;
    })
  }

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
          <DialogTitle sx={typoTitle}>{PhaseHeading}</DialogTitle>
          <DialogContent sx={{ padding: "3rem" }}>
            <Typography sx={typoText}>Phase</Typography>
            <TextField
              sx={inputStyle}         
              margin="dense"
              id="phaseName"
              name="phaseName"
              // placeholder={phaseData.phaseName}
              // label="Email Address"
              type="text"
              variant="standard"
              value={phaseName}
              onChange={handlePhaseName}
            />
            <Typography sx={typoText}>Select Color</Typography>
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
              sx={{ ...actionButton, ...addPhaseButton }}
              type="submit"
              onClick={handleSubmit}
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
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
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
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  paddingLeft: "-1.5rem",
  backgroundColor: "#EDF2F6",
};

const generalBox = {
  display: "flex",
  justifyContent: "center",
  marginTop: "1rem",
};

const paperPropsStyle = {
  borderRadius: "1rem",
  width: { lg: "25%", md: "50%", sm: "100%", xs: "100%" },
  padding: "0.5rem", // Change background color here
};

const typoText = {
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
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
