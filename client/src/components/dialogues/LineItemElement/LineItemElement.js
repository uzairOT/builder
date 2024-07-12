import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  updateFormData,
  resetFormData,
} from "../../../redux/slices/addLineSlice";
import {
  useAddPhaseLineMutation,
  useGetLineItemQuery,
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
  Stack,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import actionButton from "../../UI/actionButton";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "../../../App.css";
import "./LineItemElement.css";
import {
  addInitialPhase,
  addPhase,
  updateLineItem,
} from "../../../redux/slices/Project/projectInitialProposal";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc"; // Optional if you need UTC handling
import Close from "@mui/icons-material/Close";
import CreateableSelect from "react-select/creatable";
import {
  useAddUnitMutation,
  useGetUnitsQuery,
} from "../../../redux/apis/Project/userProjectApiSlice";
import { isPlainObject } from "@reduxjs/toolkit";
import { getTokenFromLocalStorage } from "../../../redux/apis/apiSlice";
import { authUserRole } from "../../../redux/slices/auth/userRoleSlice";
import { toggleWorkOrderDeclineRecall } from "../../../redux/slices/Notifications/notificationSlice";

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
  LineItem,
  assignPageview,
  projectId,
  setPhaseItems,
  InitialProposalView,
  reqWorkOrderModal,
  setRowCheckboxes,
}) {
  // const { data, isLoading, isSuccess } = useGetLineItemQuery({
  //   lineItemId: LineItem,
  // });
  const [open, setOpen] = useState(false);
  const [addPhaseLine, { isLoading: addIsLoading }] = useAddPhaseLineMutation();
  const [updatePhaseLine, { isLoading: updateIsLoading }] =
    useUpdatePhaseLineMutation();
  const [phaseName, setPhaseName] = useState(LineItem ? LineItem.title : "");

  const [description, setDescription] = useState(
    LineItem ? LineItem.description : ""
  );
  const [autoCompleteUnit, setAutoCompleteUnit] = useState("");
  const [unit, setUnit] = useState(LineItem ? LineItem.unit : "");
  const [quantity, setQuantity] = useState(LineItem ? LineItem.quantity : "");
  const [unitPrice, setUnitPrice] = useState(
    LineItem ? LineItem.unit_price : ""
  );
  const [total, setTotal] = useState(LineItem ? LineItem.total : "");
  const [selectedOption, setSelectedOption] = useState(null);
  const [start, setStart] = useState(
    LineItem ? dayjs(LineItem.start_day) : null
  );
  const [end, setEnd] = useState(LineItem ? dayjs(LineItem.end_day) : null);
  const [margin, setMargin] = useState(LineItem ? LineItem.margin : "");
  const [percentage, setPercentage] = useState(
    LineItem ? LineItem.percentage : ""
  );
  const [currentPayment, setCurrentPayment] = useState(
    LineItem ? LineItem?.currentPayment : 0
  );
  const [totalCost, setTotalCost] = useState(0);
  const [autoCompleteEvent, setAutoCompleteEvent] = useState(null);
  const creatableRef = useRef();

  const handleStartDateChange = (newValue) => {
    setStart(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEnd(newValue);
  };
  const [longDescription, setLongDescription] = useState(
    LineItem ? LineItem.notes : ""
  );
  const [autoComplete, setAutoComplete] = useState();
  const dispatch = useDispatch();
  const { id } = useParams();
  const local = localStorage.getItem("projectId");

  const currentProject = JSON.parse(local);
  const phases = useSelector((state) => state.projectInitialProposal.phases);
  const userInfo = useSelector((state) => state.auth.userInfo);
  // console.log(autoComplete)
  const { data, isLoading, refetch, isSuccess } = useGetUnitsQuery({
    userId: userInfo.user.id,
    q: "",
  });
  const [addUnit] = useAddUnitMutation();
  //console.log(userInfo)

  const formData = {
    phaseName,
    description,
    unit,
    quantity,
    unitPrice,
    total,
    longDescription,
    margin,
    percentage,
  };

  useEffect(() => {
    const getData = setTimeout(() => {
      axios
        .get(
          `http://3.135.107.71/user/masterLine/${userInfo.user.id}?query=${formData.phaseName}`,
          {
            headers: {
              Authorization: `Bearer ${getTokenFromLocalStorage()}`,
            },
          }
        )
        .then((response) => {
          setAutoComplete(response.data.MasterLines);
          //console.log(response.data.MasterLines);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 300);

    return () => clearTimeout(getData);
  }, [formData.phaseName]);

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

  useEffect(() => {
    if (
      totalCost !== 0 &&
      margin !== 0 &&
      percentage !== 0 &&
      !autoCompleteEvent
    ) {
      setTotalCost(0);
      setMargin(0);
      setPercentage(0);
    } else if (autoCompleteEvent) {
      setAutoCompleteEvent(null);
    }
  }, [quantity, unitPrice]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setRowCheckboxes({});
    // if (start === null) {
    //   toast.warning("Please enter a date");
    //   return;
    // }
    // if (end === null) {
    //   toast.warning("Please enter a date");
    //   return;
    // }
    // if (start.isAfter(end)) {
    //   toast.warning("Start date cannot be after end date");
    //   return;
    // }
    // if (end.isBefore(start)) {
    //   toast.warning("End date cannot be after start date");
    //   return;
    // }
    if (quantity <= 0 || unitPrice <= 0) {
      toast.warning("Enter value greater than 0");
      return;
    }

    if (LineHeading === "Update Line Item") {
      //console.log("updading..")
      const lineItemId = LineItem.id;
      const data1 = {
        ...formData,
        currentPayment: currentPayment,
        id: lineItemId,
        projectId: reqWorkOrderModal ? id : projectId,
      };
      // console.log("Update Alin Item",data1)

      try {
        const res = await updatePhaseLine(data1);
        setRowCheckboxes({});
        if (reqWorkOrderModal) {
          setPhaseItems(null);
        }
        if (InitialProposalView) {
          dispatch(addInitialPhase(res.data.data));
        } else {
          dispatch(toggleWorkOrderDeclineRecall());
        }

        //   handleUpdateClose();
        toast.success("Line Item Edited successfully");
        handleUpdateClose();
      } catch (error) {
        toast.error(
          error?.data?.message ||
            error?.error ||
            error?.data?.error ||
            "Some error"
        );
        return;
      }
    } else {
      const {
        phaseName,
        description,
        unit,
        quantity,
        unitPrice,
        total,
        longDescription,
        margin,
        percentage,
      } = formData;
      const newLineItem = {
        projectId: projectId,
        phaseId: phaseData.id,
        phaseName,
        description,
        unit: unit,
        quantity,
        unitPrice,
        total,
        longDescription,
        userId: userInfo.user.id,
        margin,
        percentage,
      };
      if (!newLineItem.unit) {
        toast.warning("Please enter unit");
        return;
      }
      try {
        const response = await addPhaseLine(newLineItem);
        console.log(response);
        if (
          response?.error?.data?.message ===
          "LineItem already exists against this phase!"
        ) {
          toast.error(response?.error?.data?.message);
          handleAddClose();
          return;
        }
        toast.success("Line Item Added successfully");
        if (InitialProposalView) {
          dispatch(addInitialPhase(response?.data?.allPhases));
        } else {
          dispatch(addPhase(response?.data?.allPhases));
        }
        toast.success("Line Item added successfully");
        handleAddClose();
      } catch (error) {
        // if(error?.data?.message === 'LineItem already exists against this phase!'){
        //   error?.data?
        // }
        console.log("Something went wrong!", error, error?.data?.message);
      }
      //console.log(newLineItem);
      //console.log(response);
      // handleAddRow(newLineItem);
      // //console.log("form submitted succesfully", formData)
      // handleAddClose();
    }
  };
  const handleTotalCostChange1 = (e) => {
    const value = e.target.value;
    setTotalCost(() => {
      if (total) {
        handleMarginAndPercentageChange(value);
      }
      return value;
    });
  };

  const handleTotalCostChange = (margin, total) => {
    setTotalCost((prev) => {
      const numberMargin = Number(margin);
      const numberTotal = Number(total);
      return numberMargin + numberTotal;
    });
  };

  const handleMarginAndPercentageChange = (value) => {
    console.log("run");
    const margin = parseFloat(value - total);
    const percentage = parseFloat((margin / total) * 100);
    console.log(total);
    setMargin(margin);
    setPercentage(percentage);
  };

  // useEffect(() => {
  //   if (total) {
  //     handleMarginAndPercentageChange();
  //   }
  // }, [totalCost]);

  useEffect(() => {
    // console.log('run')
    if (LineItem) {
      const margin = LineItem.margin;
      const total = LineItem.total;
      handleTotalCostChange(margin, total);
    }
  }, [LineItem]);

  // const Units = [
  //   { value: "sqft", label: "Square Feet"},
  //   {
  //     value: "sqm",
  //     label: "Square Meters",

  //   },
  //   { value: "acres", label: "Acres"},
  //   { value: "hectares", label: "Hectares" },
  //   {
  //     value: "sqyds",
  //     label: "Square Yards",

  //   },
  //   {
  //     value: "sqmi",
  //     label: "Square Miles",

  //   },
  // ];
  // const selectStyles = {
  //   control: (styles) => ({
  //     ...styles,
  //     ...inputStyle,
  //     marginBottom: "0",
  //     height: "",
  //     padding: "4px",
  //   }),
  // };

  const selectStyles = {
    control: (styles) => ({
      ...styles,
      ...inputStyle,
      marginBottom: "0",
      height: "", // Keep this as it was
      padding: "4px", // Keep this as it was
    }),
    menu: (provided) => ({
      ...provided,
      height: "90px",
      overflow: "auto",
      marginTop: "0px", // Adjust the top margin of the menu
    }),
    option: (provided) => ({
      ...provided,
      padding: "5px 10px", // Adjust the padding of each option
    }),
 
    indicatorsContainer: (provided) => ({
      ...provided,
      // overflow: "auto",
    }),
  };

  // useEffect(() => {
  //   // console.log(isSuccess);

  //   if (LineItem) {
  //     setPhaseName(LineItem.title);
  //     setUnit(data.ineItem.unit);
  //     setDescription(data.lineItem.description);
  //     setQuantity(data.lineItem.quantity);
  //     setUnitPrice(data.lineItem.unit_price);
  //     setTotal(data.lineItem.total);
  //     setStart(dayjs(data.lineItem.start_day));
  //     setEnd(dayjs(data.lineItem.end_day));
  //     setLongDescription(data.lineItem.notes);
  //   }
  // }, [isSuccess, data]);
  const handleSetUnit = async (selectedOption, actionType) => {
    console.log(actionType);
    console.log(selectedOption);
    if (selectedOption === null || selectedOption?.value === LineItem?.unit) {
      return;
    }
    const existingUnit = Array.isArray(data?.allUnits)
      ? data?.allUnits?.some((unit) => unit?.value === selectedOption?.value)
      : null;
    console.log(existingUnit);
    console.log(selectedOption);
    console.log(data);
    if (existingUnit) {
      setUnit(selectedOption.value);
    } else if (selectedOption.value) {
      setUnit(selectedOption.value);
      await addUnit({ ...selectedOption, userId: userInfo.user.id });
      await refetch({ userId: userInfo.user.id });
    } else {
      setUnit(selectedOption);
    }
  };
  const findValueInData = (value) => {
    const dataObject = data?.allUnits.find((obj) => obj.value === value);
    // console.log(dataObject)
    return dataObject;
  };

  // const handleCreateNewUnit = async (inputValue) => {
  //   setUnit(inputValue);
  //   await addUnit({value: inputValue, label: inputValue, userId: userInfo.user.id})
  //   await refetch({userId: userInfo.user.id});
  // }
  const setUnitOnAutoComplete = (unit) => {
    const obj = findValueInData(unit);
    console.log(obj);
    console.log(creatableRef);
    creatableRef.current.setValue(obj);
  };

  const setUnitOnLineItemEdit = () => {
    if (LineItem) {
      const obj = findValueInData(LineItem.unit);
      const unit = creatableRef.current?.props.value;
      console.log(obj);
      console.log(unit);
      console.log(LineItem?.unit);
      if (unit?.value === LineItem?.unit) {
        return;
      } else if (obj) {
        creatableRef.current?.setValue(obj);
        console.log(creatableRef.current);
      } else {
        creatableRef.current?.setValue(LineItem.unit);
      }
    }
  };

  const handleMarginChange = (e) => {
    if (total) {
      const value = parseFloat(e.target.value);

      setMargin(() => {
        return value ? value : 0;
      });
      setTotalCost(value + parseFloat(total));
      setPercentage(() => {
        const percentage = parseFloat((value / total) * 100);
        return percentage ? percentage : 0;
      });
    } else {
      toast.error(`Add Client Cost`);
      setMargin(0);
    }
  };

  const handlePercentageChange = (e) => {
    if (total) {
      const value = parseFloat(e.target.value);
      const actualCost = parseFloat(total);
      const margin = parseFloat(actualCost * (value / 100));
      setPercentage(() => {
        return value ? value : 0;
      });
      setMargin(() => {
        return margin ? margin : 0;
      });
      setTotalCost(actualCost + margin);
    } else {
      toast.error(`Add Actual Cost`, {
        toastId: "percentageValidation",
      });
      setPercentage(0);
    }
  };

  useEffect(() => {
    if (data) {
      // setUnitOnLineItemEdit();
    }
  }, [LineItem, data]);
  // useEffect(() => {

  //   handleTotalCostChange();
  // }, [margin]);

  useEffect(() => {
    console.log(margin);
  }, [margin]);
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
            <DialogTitle sx={typoTitle}>{LineHeading}</DialogTitle>
            <IconButton
              style={{ width: "40px", height: "40px" }}
              onClick={handleClickClose}
            >
              <Close />
            </IconButton>
          </Stack>
          <DialogContent sx={{ padding: "0rem 3rem 0rem 3rem" }}>
            <Typography sx={typoText}>Line Item</Typography>
            <>
              <Autocomplete
                disabled={isLoading}
                freeSolo
                disableClearable
                id="phaseName"
                // openOnFocus
                options={
                  autoComplete ? autoComplete.map((option) => option.title) : []
                } // Add your options here
                value={phaseName}
                name="phaseName"
                onChange={(event, newValue) => {
                  const selectedOption = autoComplete?.find(
                    (option) => option.title === newValue
                  );
                  if (selectedOption) {
                    setAutoCompleteEvent(event);
                    setUnitOnAutoComplete(selectedOption.unit);
                    setDescription(selectedOption.description);
                    // handleSetUnit({value: selectedOption.unit});
                    setQuantity(selectedOption.quantity);
                    setUnitPrice(selectedOption.unit_price);
                    setTotal(selectedOption.total);
                    setStart(dayjs(selectedOption.start_day));
                    setEnd(dayjs(selectedOption.end_day));
                    setLongDescription(selectedOption.notes);

                    setTotalCost(() => {
                      const total = parseFloat(selectedOption.total);
                      const margin = parseFloat(selectedOption.margin);
                      const totalCost = total + margin;
                      return totalCost;
                    });
                    setMargin(selectedOption.margin);
                    setPercentage(selectedOption.percentage);
                    // handleTotalCostChange(selectedOption.margin, selectedOption.percentage)
                  } else {
                    // Handle case where newValue is not found in autoComplete
                  }
                  setPhaseName(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    sx={{ ...inputStyle }}
                    {...params}
                    // label="Line Item Name"
                    margin="dense"
                    variant="standard"
                    placeholder="e.g: Demolition"
                    // value={formData.phaseName}
                    onFocus={() => {}}
                    onChange={(event) => setPhaseName(event.target.value)} // Assuming setPhaseName is your state updater function
                    required
                    InputLabelProps={{ display: "none" }}
                    // InputProps={{
                    //   inputProps: {
                    //     maxLength: 10
                    //   }
                    // }}
                  />
                )}
              />
              {/* <TextField
                sx={inputStyle}
                required
                margin="dense"
                id="phaseName"
                name="phaseName"
                type="text"
                variant="standard"
                value={formData.phaseName}
                onChange={(e) => setPhaseName(e.target.value)}
              /> */}

              <Typography sx={typoText}>Description</Typography>
              <TextField
                sx={{ ...inputStyle }}
                margin="dense"
                id="description"
                name="description"
                type="text"
                variant="standard"
                value={formData.description}
                placeholder="Enter description"
                onChange={(e) => setDescription(e.target.value)}
                inputProps={{ maxLength: 50 }}
              />
              <Box sx={parallelBox}>
                <Box sx={innerBox}>
                  <Typography sx={{ ...typoText }}>Unit</Typography>
                  <Box mt={"8px"} mb={"8px"}>
                    <CreateableSelect
                      ref={creatableRef}
                      defaultInputValue={LineItem ? LineItem?.unit : unit}
                      // value={findValueInData(unit)}
                      placeholder={"Select Unit"}
                      styles={selectStyles}
                      // defaultValue={unit}
                      onChange={handleSetUnit}
                      options={data?.allUnits ? data?.allUnits : []}
                      isLoading={isLoading}
                      isDisabled={isLoading}
                      // onCreateOption={handleCreateNewUnit}
                      // isClearable
                    ></CreateableSelect>
                  </Box>

                  {/* <TextField
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
                  </TextField> */}
                </Box>
                <Box sx={innerBox}>
                  <Typography sx={typoText}>Quantity</Typography>
                  <TextField
                    inputProps={{
                      maxLength: 50,
                      min: 0,
                      onWheel: (event) => event.target.blur(),
                    }}
                    sx={{ ...inputStyle, ...leftSpace }}
                    placeholder="20"
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
                inputProps={{
                  maxLength: 50,
                  onWheel: (event) => event.target.blur(),
                }}
                sx={inputStyle}
                placeholder="10"
                required
                margin="dense"
                id="unitPrice"
                name="unitPrice"
                type="number"
                variant="standard"
                value={formData.unitPrice}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                onChange={(e) =>
                  setUnitPrice((prev) => {
                    setTotal(e.target.value * quantity);
                    return e.target.value;
                  })
                }
              />

              <Typography sx={typoText}>Actual Cost</Typography>
              <TextField
               inputProps={{
                onWheel: (event) => event.target.blur(),
              }}
                sx={inputStyle}
                placeholder="200"
                required
                margin="dense"
                id="total"
                name="total"
                type="number"
                variant="standard"
                value={formData.total}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
              <Typography sx={typoText}>Client Cost</Typography>
              <TextField
               inputProps={{
                onWheel: (event) => event.target.blur(),
              }}
                sx={inputStyle}
                placeholder="200"
                required
                margin="dense"
                id="total"
                name="total"
                type="number"
                variant="standard"
                value={totalCost}
                onChange={handleTotalCostChange1}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
              <Box sx={parallelBox}>
                <Box sx={innerBox}>
                  <Typography sx={typoText}>Profit</Typography>

                  <TextField
                    sx={{ ...inputStyle, marginLeft: "18px" }}
                    placeholder="4"
                    required
                    margin="dense"
                    id="margin"
                    name="margin"
                    type="margin"
                    variant="standard"
                    value={Math.round(formData.margin * 100) / 100}
                    onChange={handleMarginChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box sx={innerBox}>
                  <Typography sx={typoText}>Percentage</Typography>
                  <TextField
                    sx={{ ...inputStyle, marginLeft: "18px" }}
                    placeholder="2"
                    required
                    margin="dense"
                    id="margin"
                    name="margin"
                    type="margin"
                    variant="standard"
                    value={Math.round(formData.percentage * 100) / 100}
                    onChange={handlePercentageChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">%</InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Box>
              {/* {LineHeading === "Update Line Item" && <><Typography sx={typoText}>Payment to Recieve</Typography>
              <TextField
                sx={inputStyle}
                placeholder="200"
                required
                margin="dense"
                id="total"
                name="total"
                type="number"
                variant="standard"
                value={currentPayment}
                onChange={(e)=> setCurrentPayment(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              /></>} */}
              {/* <Box sx={parallelBox}>
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
                      fontFamily: "Arial Rounded MT, sans-serif",
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
                      fontFamily: "Arial Rounded MT, sans-serif",
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
              </Box> */}

              <Typography sx={typoText}>Notes</Typography>
              <TextField
                inputProps={{ maxLength: 1000 }}
                sx={{ ...inputStyle, height: "5rem" }}
                placeholder="Enter your Notes"
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
            <Button
              sx={{ ...actionButton, ...doneButton }}
              type="submit"
              disabled={addIsLoading || updateIsLoading}
            >
              {addIsLoading || updateIsLoading ? (
                <CircularProgress
                  size={"18px"}
                  sx={{ fontSize: "14px", color: "white" }}
                />
              ) : (
                "Done"
              )}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </div>
  );
}

const typoTitle = {
  fontFamily: "Arial Rounded MT, sans-serif",
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
  fontFamily: "Arial Rounded MT, sans-serif",
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
  marginTop: "3rem",
};

const paperPropsStyle = {
  borderRadius: "1rem",
  width: { lg: "35%", md: "50%", sm: "100%", xs: "100%" },
  padding: "0.5rem", // Change background color here
};

const typoText = {
  fontFamily: "Arial Rounded MT, sans-serif",
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
