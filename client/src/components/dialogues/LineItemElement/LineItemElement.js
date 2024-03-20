import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFormData,
  resetFormData,
} from "../../../redux/slices/addLineSlice";
import {
  useAddPhaseLineMutation,
  useUpdatePhaseLineMutation,
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
  MenuItem,
} from "@mui/material";
import actionButton from "../../UI/actionButton";
import "../../../App.css";
import "./LineItemElement.css";
import {updateLineItem} from "../../../redux/slices/Project/projectInitialProposal"


function AddLineElement({
  phaseData,
  handleAddOpen,
  handleAddClose,
  handleUpdateOpen,
  handleUpdateClose,
  LineHeading,
  handleUpdateRow,
  selectedRowIndex,
  handleAddRow,
  rowData,
  LineItem
}) {
  const [open, setOpen] = useState(false);
  const [addPhaseLine] = useAddPhaseLineMutation();
  const [updatePhaseLine] = useUpdatePhaseLineMutation();
  const [phaseName, setPhaseName] = useState(LineItem ? LineItem.title : "");
  const [description, setDescription] = useState(LineItem ? LineItem.description : "");
  const [unit, setUnit] = useState(LineItem ? LineItem.unit : "");
  const [quantity, setQuantity] = useState(LineItem ? LineItem.quantity : "");
  const [unitPrice, setUnitPrice] = useState(LineItem ? LineItem.unit_price : "");
  const [total, setTotal] = useState(LineItem ? LineItem.total : "");
  const [start, setStart] = useState(LineItem ? LineItem.start_day : "");
  const [end, setEnd] = useState(LineItem ? LineItem.end_day : "");
  const [longDescription, setLongDescription] = useState(
    LineItem ? LineItem.notes : ""
  );
  const dispatch = useDispatch();
  
  const phases = useSelector((state) => state.projectInitialProposal.phases);
console.log(phases)

  const formData = {
    phaseName,
    description,
    unit,
    quantity,
    unitPrice,
    total,
    start,
    end,
    longDescription,
  };

  const handleClickOpen = () => {
    if (LineHeading === "Update Line Item") {
      handleUpdateOpen();
    } else {
      handleAddOpen();
    }
    setOpen(true);
  };

  const handleClickClose = () => {
    if (LineHeading === "Update Line Item") {
      handleUpdateClose();
    } else {
      handleAddClose();
    }
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (LineHeading === "Update Line Item") {
        console.log("updading..")
        const lineItemId =LineItem.id
        const data = {
            ...formData,id:lineItemId
        }
        console.log(LineItem.phase_id)
   
     updatePhaseLine(data,lineItemId);
     dispatch(updateLineItem({ phaseId:LineItem.phase_id,lineItemId:LineItem.id, updatedLineItem:formData }));
      console.log("form submitted succesfully", formData);
      console.log(LineItem.id)
    //   handleUpdateClose();
    } else {
      const {
        phaseName,
        description,
        unit,
        quantity,
        unitPrice,
        total,
        start,
        end,
        longDescription,
      } = formData;
      const newLineItem = {
        phaseId: phaseData.id,
        phaseName,
        description,
        unit,
        quantity,
        unitPrice,
        total,
        start,
        end,
        longDescription,
      };

      const response = await addPhaseLine(newLineItem);
      console.log(newLineItem);
      console.log(response);
      // handleAddRow(newLineItem);
      // console.log("form submitted succesfully", formData)
      // handleAddClose();
    }
  };

  const Units = [
    {
      value: "sqft",
      label: "Square Feet",
    },
    {
      value: "sqm",
      label: "Square Meters",
    },
    {
      value: "acres",
      label: "Acres",
    },
    {
      value: "hectares",
      label: "Hectares",
    },
    {
      value: "sqyds",
      label: "Square Yards",
    },
    {
      value: "sqmi",
      label: "Square Miles",
    },
  ];
  return (
    <div className="App">
      <>
        <Dialog
          open={handleClickOpen}
          onClose={handleClickClose}
          PaperProps={{
            sx: { ...paperPropsStyle },
            component: "form",
            onSubmit: handleSubmit,
          }}
        >
          <DialogTitle sx={typoTitle}>{LineHeading}</DialogTitle>
          <DialogContent sx={{ padding: "3rem" }}>
            <Typography sx={typoText}>Phase</Typography>
            <form>
              <TextField
                sx={inputStyle}
                required
                margin="dense"
                id="phaseName"
                name="phaseName"
                type="text"
                variant="standard"
                value={formData.phaseName}
                onChange={(e) => setPhaseName(e.target.value)}
              />

              <Typography sx={typoText}>Description</Typography>
              <TextField
                sx={inputStyle}
                required
                margin="dense"
                id="description"
                name="description"
                type="text"
                variant="standard"
                value={formData.description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Box sx={parallelBox}>
                <Box sx={innerBox}>
                  <Typography sx={typoText}>Unit</Typography>

                  <TextField
                    sx={{ ...inputStyle, ...leftSpace }}
                    required
                    margin="dense"
                    id="unit"
                    name="unit"
                    type="text"
                    select
                    variant="standard"
                    value={formData.unit}
                    onChange={(e) => setUnit(e.target.value)}
                  >
                    {Units.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box sx={innerBox}>
                  <Typography sx={typoText}>Quantity</Typography>
                  <TextField
                    sx={{ ...inputStyle, ...leftSpace }}
                    required
                    margin="dense"
                    id="quantity"
                    name="quantity"
                    type="number"
                    variant="standard"
                    value={formData.quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </Box>
              </Box>
              <Typography sx={typoText}>Unit Price</Typography>
              <TextField
                sx={inputStyle}
                required
                margin="dense"
                id="unitPrice"
                name="unitPrice"
                type="price"
                variant="standard"
                value={formData.unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
              />

              <Typography sx={typoText}>Total</Typography>
              <TextField
                sx={inputStyle}
                required
                margin="dense"
                id="total"
                name="total"
                type="number"
                variant="standard"
                value={formData.total}
                onChange={(e) => setTotal(e.target.value)}
              />
              <Box sx={parallelBox}>
                <Box sx={innerBox}>
                  <Typography sx={typoText}>Start</Typography>
                  <TextField
                    sx={{ ...inputStyle, ...leftSpace }}
                    required
                    margin="dense"
                    id="start"
                    name="start"
                    type="text"
                    variant="standard"
                    value={formData.start}
                    onChange={(e) => setStart(e.target.value)}
                  />
                </Box>
                <Box sx={innerBox}>
                  <Typography sx={typoText}>End</Typography>
                  <TextField
                    sx={{ ...inputStyle, ...leftSpace }}
                    required
                    margin="dense"
                    id="end"
                    name="end"
                    type="text"
                    variant="standard"
                    value={formData.end}
                    onChange={(e) => setEnd(e.target.value)}
                  />
                </Box>
              </Box>
              <Typography sx={typoText}>Description</Typography>
              <TextField
                sx={{ ...inputStyle, height: "5rem" }}
                required
                margin="dense"
                id="longDescription"
                name="longDescription"
                type="text"
                multiline
                rows={3}
                variant="standard"
                value={formData.longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
              />
            </form>
          </DialogContent>
          <DialogActions sx={generalBox}>
            <Button sx={{ ...actionButton, ...doneButton }} type="submit">
              Done
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
  height: "1.8rem",
  marginBottom: "0.5rem",
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
  width: { lg: "25%", md: "50%", sm: "50%", xs: "50%" },
  padding: "0.5rem", // Change background color here
};

const typoText = {
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  fontSize: "0.8rem",
  color: "#202227",
};
const doneButton = {
  height: "70%",
  width: "7rem",
  marginTop: "-3rem",
  marginBottom: "1.5rem",
};

const parallelBox = {
  display: "flex",
  gap: "2rem",
  justifyContent: "center",
  alignItems: "center",
};
const innerBox = {
  display: "flex",
  flexDirection: "column",
  width: "50%",
};
const leftSpace = {
  marginLeft: "1rem",
};
export default AddLineElement;
