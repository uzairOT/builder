import React, { useState, useEffect, useRef } from "react";
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
import CreateableSelect from 'react-select/creatable';
import { useAddUnitMutation, useGetUnitsQuery } from "../../../redux/apis/Project/userProjectApiSlice";
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
const UnitsMap = new Map([
  ["sqft", "Square Feet"],
  ["sqm", "Square Meters"],
  ["acres", "Acres"],
  ["hectares", "Hectares"],
  ["sqyds", "Square Yards"],
  ["sqmi", "Square Miles"],
]);

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
  reqWorkOrderModal
}) {
  // const { data, isLoading, isSuccess } = useGetLineItemQuery({
  //   lineItemId: LineItem,
  // });
  const [open, setOpen] = useState(false);
  const [addPhaseLine] = useAddPhaseLineMutation();
  const [updatePhaseLine] = useUpdatePhaseLineMutation();
  const [phaseName, setPhaseName] = useState(LineItem ? LineItem.title : "");
  
  const [description, setDescription] = useState(
    LineItem ? LineItem.description : ""
  );
  const [unitList, setUnitList] = useState()
  const [unit, setUnit] = useState(LineItem ? LineItem.unit.value : "");
  const [quantity, setQuantity] = useState(LineItem ? LineItem.quantity : "");
  const [unitPrice, setUnitPrice] = useState(
    LineItem ? LineItem.unit_price : ""
  );
  const [total, setTotal] = useState(LineItem ? LineItem.total : "");
  const [selectedOption, setSelectedOption] = useState(null);
  const [start, setStart] = useState(LineItem ? dayjs(LineItem.start_day) : null);
  const [end, setEnd] = useState(LineItem ? dayjs(LineItem.end_day) : null);
  const [margin, setMargin] = useState( LineItem ? LineItem.margin :'');
  const [percentage, setPercentage] = useState(  LineItem ? LineItem.percentage : '');

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
  console.log(LineItem)
  const {data, isLoading, refetch} = useGetUnitsQuery({userId: userInfo.user.id})
  const [addUnit] = useAddUnitMutation()
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
    percentage
  };

  // useEffect(()=>{
  //   if(data){
  //     setUnitList(data);
  //   }
  // },[data])
  useEffect(() => {
    const getData = setTimeout(() => {
      axios
        .get(
          `http://3.135.107.71/user/masterLine/${userInfo.user.id}?query=${formData.phaseName}`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}` // Add authorization header
            }
          }
        )
        .then((response) => {
          setAutoComplete(response.data.MasterLines);
          //console.log(response.data.MasterLines);
        });
    }, 500);
  
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

  const handlePercentageChange = (e) => {
    if(total){
      const percent = e.target.value
      const result = (total*percent)/100
      const roundedResult = Math.round(result*10)/10
      setPercentage(()=> {
        setMargin(roundedResult);
        return percent;
      })
    } else{
      //toastId added to prevent duplication
      toast.warning('Total field is empty!', {toastId: 12})
    }
  }

  const handleMarginChange = (e) => {
    if(total){
      const inputMargin = e.target.value
      const result = (inputMargin*100)/total
      const roundedResult = Math.round(result*10)/10
      setMargin(()=> {
        setPercentage(roundedResult);
        return inputMargin;
      })
    } else{
      //toastId added to prevent duplication
      toast.warning('Total field is empty!', {toastId: 12})
    }
  }
  // console.log("Line Item Element", LineItem);
  const handleSubmit = async (e) => {
    e.preventDefault();
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
    if (LineHeading === "Update Line Item") {
      //console.log("updading..")
      const lineItemId = LineItem.id;
      const data1 = {
        ...formData,
        id: lineItemId,
        projectId: reqWorkOrderModal ? id : projectId ,
      };
      // console.log("Update Alin Item",data1)

      try {
        const res = await updatePhaseLine(data1);
        if(reqWorkOrderModal){
          setPhaseItems(null);
        }
        if(InitialProposalView){
          dispatch(addInitialPhase(res.data.data));
        }else{

          dispatch(addPhase(res.data.data));
        }

        //   handleUpdateClose();
        toast.success(
          "Line Item added successfully"
        );
      } catch (error) {
        toast.error(error?.data?.message || error?.error||error?.data?.error || 'Some error' );
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
        percentage
      };
      if(!newLineItem.unit){
        toast.warning('Please enter unit');
        return;
      }
      const response = await addPhaseLine(newLineItem);
      if(InitialProposalView){
        dispatch(addInitialPhase(response?.data?.allPhases));
      }else{
        dispatch(addPhase(response?.data?.allPhases));

      }
      //console.log(newLineItem);
      //console.log(response);
      // handleAddRow(newLineItem);
      // //console.log("form submitted succesfully", formData)
      // handleAddClose();
    }
  };

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
  const selectStyles ={
    control: (styles) => ({
      ...styles,
      ...inputStyle,
     marginBottom:'0',
      height: '',
      padding: '4px'
     
    })
  }
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
const handleSetUnit = async (selectedOption) => {
  // console.log(selectedOption);
  if(selectedOption === null){
    return;
  }
  const existingUnit = data?.some(unit => unit?.value === selectedOption?.value);
  if(existingUnit){
    setUnit(selectedOption.value);
  }else{
    setUnit(selectedOption.value);
    await addUnit({...selectedOption, userId: userInfo.user.id})
    await refetch({userId: userInfo.user.id});
  } 
}


useEffect(()=>{
  console.log(unit)
},[unit])

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
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <DialogTitle sx={typoTitle}>{LineHeading}</DialogTitle>
          <IconButton style={{width: '40px', height:'40px'}} onClick={handleClickClose}>
            <Close />
          </IconButton>
          </Stack>
          <DialogContent sx={{ padding: "0rem 3rem 3rem 3rem" }}>
            <Typography sx={typoText}>Line Item</Typography>
            <>
              <Autocomplete
                freeSolo
                disableClearable
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
                onChange={(e) => setDescription(e.target.value)}
              />
              <Box sx={parallelBox}>
                <Box sx={innerBox}>
                  <Typography sx={{...typoText}}>Unit</Typography>
                  <Box mt={'8px'} mb={'8px'}>

                  <CreateableSelect
                  defaultInputValue={LineItem ? UnitsMap.get(LineItem.unit) : ''}
                  defaultOptions
                  styles={selectStyles}
                  defaultValue={selectedOption}
                  onChange={handleSetUnit}
                  options={data ? data : []}
                  isLoading={isLoading}
                  isClearable
                  >

                  </CreateableSelect>
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
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
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
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
               <Box sx={parallelBox}>
                <Box sx={innerBox}>
                  <Typography sx={typoText}>Margin</Typography>
                 
                    <TextField
                sx={{...inputStyle, marginLeft:'18px'}}
                required
                margin="dense"
                id="margin"
                name="margin"
                type="margin"
                variant="standard"
                value={formData.margin}
                onChange={handleMarginChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
                 
                </Box>
                <Box sx={innerBox}>
                  <Typography sx={typoText}>Percentage</Typography>
                  <TextField
                sx={{...inputStyle, marginLeft:'18px'}}
                required
                margin="dense"
                id="margin"
                name="margin"
                type="margin"
                variant="standard"
                value={formData.percentage}
                onChange={handlePercentageChange}
                InputProps={{
                  endAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
                
              />
                </Box>
              </Box>
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
              </Box> */}
              <Typography sx={typoText}>Notes</Typography>
              <TextField
                sx={{ ...inputStyle, height: "5rem" }}
                
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
export default AddLineElement;
