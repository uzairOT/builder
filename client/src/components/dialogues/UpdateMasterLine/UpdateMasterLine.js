import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  updateFormData,
  resetFormData,
} from "../../../redux/slices/addLineSlice";
import {
  useAddPhaseLineMutation,
  useGetMasterLineItemQuery,
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
  Autocomplete,
} from "@mui/material";
import actionButton from "../../UI/actionButton";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "../../../App.css";
import "../LineItemElement/LineItemElement.css";
import {
  addInitialPhase,
  addPhase,
  updateMasterLineItem,
} from "../../../redux/slices/Project/projectInitialProposal";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc"; // Optional if you need UTC handling
import { useUpdateMasterLineItemMutation } from "../../../redux/apis/Project/userProjectApiSlice";

function UpdateMasterLine({

  handleUpdateOpen,
  handleUpdateClose,
  refetch,
  MasterLineItem,
  userId
}) {
  // const { data, isLoading, isSuccess } = useGetMasterLineItemQuery({
  //   MasterLineItemId: MasterLineItem,
  // });
  const [open, setOpen] = useState(false);
  const [addPhaseLine] = useAddPhaseLineMutation();
  const [updateMasterLine] = useUpdateMasterLineItemMutation();
  const [phaseName, setPhaseName] = useState(
    MasterLineItem ? MasterLineItem.title : ""
  );
  const [description, setDescription] = useState(
    MasterLineItem ? MasterLineItem.description : ""
  );
  const [unit, setUnit] = useState(MasterLineItem ? MasterLineItem.unit : "");
  const [quantity, setQuantity] = useState(
    MasterLineItem ? MasterLineItem.quantity : ""
  );
  const [unitPrice, setUnitPrice] = useState(
    MasterLineItem ? MasterLineItem.unit_price : ""
  );
  const [total, setTotal] = useState(
    MasterLineItem ? MasterLineItem.total : ""
  );

  const [start, setStart] = useState(
    MasterLineItem ? dayjs(MasterLineItem.start_day) : null
  );
  const [end, setEnd] = useState(
    MasterLineItem ? dayjs(MasterLineItem.end_day) : null
  );

  const handleStartDateChange = (newValue) => {
    setStart(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEnd(newValue);
  };
  const [longDescription, setLongDescription] = useState(
    MasterLineItem ? MasterLineItem.notes : ""
  );
  const [autoComplete, setAutoComplete] = useState();
  const dispatch = useDispatch();
  const { id } = useParams();
  const local = localStorage.getItem("projectId");

  const currentProject = JSON.parse(local);
  const phases = useSelector((state) => state.projectInitialProposal.phases);
  const userInfo = useSelector((state) => state.auth.userInfo);
  //console.log(userInfo)

  const formData = {
    phaseName,
    description,
    unit,
    quantity,
    unitPrice,
    total,
    start: dayjs(start),
    end: dayjs(end),
    longDescription,
  };

//   useEffect(() => {
//     const getData = setTimeout(() => {
//       axios
//         .get(
//           `http://3.135.107.71/user/masterLine/${userInfo.user.id}?query=${formData.phaseName}`,
//           {
//             headers: {
//               Authorization: `Bearer ${userInfo.token}`, // Add authorization header
//             },
//           }
//         )
//         .then((response) => {
//           setAutoComplete(response.data.MasterLines);
//           //console.log(response.data.MasterLines);
//         });
//     }, 500);

//     return () => clearTimeout(getData);
//   }, [formData.phaseName]);

  const handleClickOpen = () => {
    handleUpdateOpen();

    setOpen(true);
  };

  const handleClickClose = () => {
    handleUpdateClose();

    setOpen(false);
  };

  // console.log("Line Item Element", MasterLineItem);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (start === null) {
      toast.warning("Please enter a valid date");
      return;
    }
    if (end === null) {
      toast.warning("Please enter a valid date");
      return;
    }
    // if (LineHeading === "Update Line Item") {
      //console.log("updading..")
      const MasterLineItemId = MasterLineItem.id;
      const data1 = {
        ...formData,
        id: MasterLineItemId,
        projectId: id,
      };
      // console.log("Update Alin Item",data1)

      try {
        const res = await updateMasterLine(data1);
        refetch(userId);
        toast.success(
            res?.data?.message || 'Success'
        );
      } catch (error) {
        toast.error(error?.data?.message || error.error || error?.data?.error || 'Something went wrong!');
        return;
      }
    // } else {
    //   const {
    //     phaseName,
    //     description,
    //     unit,
    //     quantity,
    //     unitPrice,
    //     total,
    //     start,
    //     end,
    //     longDescription,
    //   } = formData;
    //   const newMasterLineItem = {
    //     projectId: projectId,
    //     phaseId: phaseData.id,
    //     phaseName,
    //     description,
    //     unit,
    //     quantity,
    //     unitPrice,
    //     total,
    //     start,
    //     end,
    //     longDescription,
    //   };
    //   const response = await addPhaseLine(newMasterLineItem);
    //   if (InitialProposalView) {
    //     dispatch(addInitialPhase(response?.data?.allPhases));
    //   } else {
    //     dispatch(addPhase(response?.data?.allPhases));
    //   }
    //   //console.log(newMasterLineItem);
    //   //console.log(response);
    //   // handleAddRow(newMasterLineItem);
    //   // //console.log("form submitted succesfully", formData)
    //   // handleAddClose();
    // }
  };

  const Units = [
    { value: "sqft", label: "Square Feet", formula: (q, p) => q * p },
    {
      value: "sqm",
      label: "Square Meters",
      formula: (q, p) => q * p * 0.092903,
    },
    { value: "acres", label: "Acres", formula: (q, p) => q * p * 4048.54 },
    { value: "hectares", label: "Hectares", formula: (q, p) => q * p * 10000 },
    {
      value: "sqyds",
      label: "Square Yards",
      formula: (q, p) => q * p * 0.836127,
    },
    {
      value: "sqmi",
      label: "Square Miles",
      formula: (q, p) => q * p * 2.58999e6,
    },
  ];
  // useEffect(() => {
  //   // console.log(isSuccess);

  //   if (MasterLineItem) {
  //     setPhaseName(MasterLineItem.title);
  //     setUnit(data.ineItem.unit);
  //     setDescription(data.MasterLineItem.description);
  //     setQuantity(data.MasterLineItem.quantity);
  //     setUnitPrice(data.MasterLineItem.unit_price);
  //     setTotal(data.MasterLineItem.total);
  //     setStart(dayjs(data.MasterLineItem.start_day));
  //     setEnd(dayjs(data.MasterLineItem.end_day));
  //     setLongDescription(data.MasterLineItem.notes);
  //   }
  // }, [isSuccess, data]);
  console.log(formData);
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
          <DialogTitle sx={typoTitle}>Update Master Line Item</DialogTitle>
          <DialogContent sx={{ padding: "3rem" }}>
            <Typography sx={typoText}>Master Line Item</Typography>
            <>
              {/* <Autocomplete
                freeSolo
                id="phaseName"
                options={
                  autoComplete ? autoComplete.map((option) => option.title) : []
                } // Add your options here
                value={formData?.phaseName}
                name="phaseName"
                onChange={(event, newValue) => {
                  const selectedOption = autoComplete?.find(
                    (option) => option.title === newValue
                  );
                  if (selectedOption) {
                    setDescription(selectedOption.description);
                    setUnit(selectedOption.unit);
                    setQuantity(selectedOption.quantity);
                    setUnitPrice(selectedOption.unit_price);
                    setTotal(selectedOption.total);
                    setStart(dayjs(selectedOption.start_day));
                    setEnd(dayjs(selectedOption.end_day));
                    setLongDescription(selectedOption.notes);
                  } else {
                    // Handle case where newValue is not found in autoComplete
                  }
                  setPhaseName(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Line Item Name"
                    margin="dense"
                    variant="standard"
                    value={formData?.phaseName}
                    onChange={(event) => setPhaseName(event.target.value)} // Assuming setPhaseName is your state updater function
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              /> */}
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
                sx={{ ...inputStyle }}
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
                    value={`${formData?.unit}`}
                    onChange={(e) => setUnit(e.target.value)}
                  >
                    {Units.map((option, index) => (
                      <MenuItem key={index} value={option.value}>
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
                    onChange={(e) =>
                      setQuantity((prev) => {
                        setTotal(e.target.value * unitPrice);
                        return e.target.value;
                      })
                    }
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
                onChange={(e) =>
                  setUnitPrice((prev) => {
                    setTotal(e.target.value * quantity);
                    return e.target.value;
                  })
                }
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
              />
              <Box sx={parallelBox}>
                <Box sx={innerBox}>
                  <Typography sx={typoText}>Start</Typography>
                  <Box
                    sx={{
                      width: "100%", // Set width to 100% for responsiveness
                      alignSelf: "center",
                      fontSize: "14px",
                      border: "1px solid #ccc",
                      borderRadius: "12px",
                      color: "#202227",
                      fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
                      backgroundColor: "#EDF2F6",
                      ...leftSpace,
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <MobileDatePicker
                        value={start}
                        onChange={handleStartDateChange}
                        format="YYYY/MM/DD"
                      />
                    </LocalizationProvider>
                  </Box>
                </Box>
                <Box sx={innerBox}>
                  <Typography sx={typoText}>End</Typography>
                  <Box
                    sx={{
                      width: "100%", // Set width to 100% for responsiveness
                      alignSelf: "center",
                      fontSize: "14px",
                      border: "1px solid #ccc",
                      borderRadius: "12px",
                      color: "#202227",
                      fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
                      backgroundColor: "#EDF2F6",
                      ...leftSpace,
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <MobileDatePicker
                        value={end} // Apply format
                        placeholder="dede"
                        format="YYYY/MM/DD"
                        onChange={handleEndDateChange}
                      />
                    </LocalizationProvider>
                  </Box>
                </Box>
              </Box>
              <Typography sx={typoText}>Notes</Typography>
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
            </>
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
  outline: "none !important",
  "& input": {
    borderBottom: "none", // Remove bottom border of the input
  },
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
export default UpdateMasterLine;
