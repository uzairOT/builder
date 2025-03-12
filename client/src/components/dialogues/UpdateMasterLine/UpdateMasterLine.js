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
  InputAdornment,
  IconButton,
  Stack,
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
import {
  useAddUnitMutation,
  useGetUnitsQuery,
  useUpdateMasterLineItemMutation,
} from "../../../redux/apis/Project/userProjectApiSlice";
import CreateableSelect from "react-select/creatable";
import { Close } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

function UpdateMasterLine({
  handleUpdateOpen,
  handleUpdateClose,
  refetch,
  MasterLineItem,
  userId,
}) {
  const {t} = useTranslation();
  const [open, setOpen] = useState(false);
  const [addPhaseLine] = useAddPhaseLineMutation();
  const [updateMasterLine] = useUpdateMasterLineItemMutation();
  const [addUnit] = useAddUnitMutation();

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

  const [margin, setMargin] = useState(
    MasterLineItem ? MasterLineItem.margin : ""
  );
  const [percentage, setPercentage] = useState(
    MasterLineItem ? MasterLineItem.percentage : ""
  );
  const [totalCost, setTotalCost] = useState(0);
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
  const creatableRef = useRef();
  const currentProject = JSON.parse(local);
  const phases = useSelector((state) => state.projectInitialProposal.phases);
  const userInfo = useSelector((state) => state.auth.userInfo);
  //console.log(userInfo)
  const {
    data,
    isLoading,
    refetch: refetchUnits,
    isSuccess,
  } = useGetUnitsQuery({
    userId: userInfo.user.id,
  });

  const formData = {
    phaseName,
    description,
    unit,
    quantity,
    unitPrice,
    total,
    margin: margin || 0,
    percentage: percentage || 0,
    start: dayjs(start),
    end: dayjs(end),
    longDescription,
  };

  //   useEffect(() => {
  //     const getData = setTimeout(() => {
  //       axios
  //         .get(
  //           `https://builderbuilder.net/user/masterLine/${userInfo.user.id}?query=${formData.phaseName}`,
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

  // const handleTotalCostChange = () => {
  //   setTotalCost(Number(total) + Number(margin));
  // };
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
    if (!!MasterLineItem?.template) {
      toast.warning("You can't update a template");
      return;
    }
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
      toast.success(res?.data?.message || "Success");
    } catch (error) {
      toast.error(
        error?.data?.message ||
          error.error ||
          error?.data?.error ||
          "Something went wrong!"
      );
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
  const selectStyles = {
    control: (styles) => ({
      ...styles,
      ...inputStyle,
      marginLeft: "8px",
      height: "", // Keep this as it was
      padding: "4px", // Keep this as it was,
      overflow: "auto",
      width: "calc(100%)",
    }),
    menu: (provided) => ({
      ...provided,
      // height: "90px",
      // overflowY: "scroll",
      // marginTop: "0px", // Adjust the top margin of the menu
    }),
    menuList: (provided) => ({
      ...provided,
      height: "90px",
      overflowY: "scroll",
      marginTop: "0px", // Adjust the top margin of the menu
    }),
    option: (provided) => ({
      ...provided,
      padding: "5px 10px", // Adjust the padding of each option
      // overflowY: "scroll",
    }),

    indicatorsContainer: (provided) => ({
      ...provided,
      // overflow: "auto",
    }),
  };
  // const handleSetUnit = async (selectedOption, actionType) => {
  //   console.log(actionType);
  //   if (selectedOption === null || selectedOption?.value === MasterLineItem?.unit) {
  //     return;
  //   }
  //   const existingUnit = data?.some(
  //     (unit) => unit?.value === selectedOption?.value
  //   );
  //   console.log(selectedOption);
  //   console.log(existingUnit);
  //   if (existingUnit) {
  //     setUnit(selectedOption.value);
  //   } else {
  //     setUnit(selectedOption.value);
  //     await addUnit({ ...selectedOption, userId: userInfo.user.id });
  //     await refetchUnits({ userId: userInfo.user.id });
  //   }
  // };
  const handleSetUnit = async (selectedOption, actionType) => {
    // console.log(actionType);
    if (
      selectedOption === null ||
      selectedOption?.value === MasterLineItem?.unit
    ) {
      return;
    }
    const existingUnit = Array.isArray(data)
      ? data?.allUnits?.some((unit) => unit?.value === selectedOption?.value)
      : [];
    // console.log(selectedOption);
    // console.log(existingUnit);
    if (existingUnit) {
      setUnit(selectedOption.value);
    } else {
      setUnit(selectedOption.value);
      await addUnit({ ...selectedOption, userId: userInfo.user.id });
      await refetch({ userId: userInfo.user.id });
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
      toast.error(`Add actual cost`, {
        toastId: "percentageValidation",
      });
      setPercentage(0);
    }
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

  // useEffect(() => {
  //   handleTotalCostChange();
  // }, [margin]);
  // useEffect(() => {
  //   if (margin === "") {
  //   } else {
  //     handleTotalCostChange();
  //   }
  // }, [quantity, unitPrice]);
  const handleTotalCostChange = (margin, total) => {
    setTotalCost((prev) => {
      const numberMargin = Number(margin);
      const numberTotal = Number(total);
      return numberMargin + numberTotal;
    });
  };

  const handleMarginAndPercentageChange = () => {
    const margin = parseFloat(totalCost - total);
    const percentage = parseFloat((margin / total) * 100);
    // console.log(total);
    setMargin(margin);
    setPercentage(percentage);
  };
  // useEffect(()=>{
  //   if(total){
  //     handleMarginAndPercentageChange();
  //     }
  // }, [totalCost])

  useEffect(() => {
    if (MasterLineItem) {
      const margin = MasterLineItem.margin;
      const total = MasterLineItem.total;
      handleTotalCostChange(margin, total);
    }
  }, [MasterLineItem]);

  // console.log(formData);
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
            <DialogTitle sx={typoTitle} width={{sm:'20ch', xs:'17ch'}}>{t("Settings.masterTable.modal.heading")}</DialogTitle>
            
            <IconButton
              style={{ width: "30px", height: "30px" }}
              onClick={handleClickClose}
            >
              <Close />
            </IconButton>
          </Stack>
          <DialogContent sx={{ padding: "0rem", paddingTop: "1rem" }}>
            <Typography sx={typoText}>{t("Settings.masterTable.modal.heading1")}</Typography>
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
                inputProps={{ maxLength: 50 }}
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

              <Typography sx={typoText}>{t("Settings.masterTable.modal.description")}</Typography>
              <TextField
                inputProps={{ maxLength: 50 }}
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
                  <Typography sx={typoText}>{t("Settings.masterTable.modal.unit")}</Typography>
                  <Box mt={"8px"} mb={"8px"}  width={"calc(100% - 16px)"}>
                    <CreateableSelect
                      ref={creatableRef}
                      defaultInputValue={
                        MasterLineItem ? MasterLineItem?.unit : unit
                      }
                      // value={findValueInData(unit)}
                      placeholder={t("Settings.masterTable.modal.placeholder1")}
                      styles={selectStyles}
                      // defaultValue={unit}
                      onChange={handleSetUnit}
                      options={data?.allUnits ? data?.allUnits : []}
                      isLoading={isLoading}
                      isDisabled={isLoading}
                      // onCreateOption={handleCreateNewUnit}
                      isClearable
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
                  <Typography sx={typoText}>{t("Settings.masterTable.modal.quantity")}</Typography>
                  <TextField
                    sx={{ ...inputStyle, width: "calc(100% - 34px)"  }}
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
              <Typography sx={typoText}>{t("Settings.masterTable.modal.unitPrice")}</Typography>
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

              <Typography sx={typoText}>{t("Settings.masterTable.modal.actualCost")}</Typography>
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
              <Typography sx={typoText}>{t("Settings.masterTable.modal.clientCost")}</Typography>
              <TextField
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
                  <Typography sx={typoText}>{t("Settings.masterTable.modal.profit")}</Typography>

                  <TextField
                    sx={{ ...inputStyle, width: "calc(100% - 34px)" }}
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
                  <Typography sx={typoText}>{t("Settings.masterTable.modal.percentage")}</Typography>
                  <TextField
                    sx={{ ...inputStyle, width: "calc(100% - 34px)" }}
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
                      fontFamily: 'var(--main-font-family)',
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
                      fontFamily: 'var(--main-font-family)',
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

              <Typography sx={typoText}>{t("Settings.masterTable.modal.notes")}</Typography>
              <TextField
                inputProps={{ maxLength: 50 }}
                sx={{ ...inputStyle, height: "5rem" }}
                // required
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
            {t("Button.done")}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </div>
  );
}

const typoTitle = {
  fontFamily: "var(--main-font-family)",
  fontSize: {md:"1.5rem", xs:"1.2rem"},
  color: "#4C8AB1",
};
const inputStyle = {
  width: "calc(100% - 20px)", // Set width to 100% for responsiveness
  height: "1.8rem",
  marginBottom: "0.5rem",
  alignSelf: "center",
  padding: "8px",
  fontSize: "14px",
  border: "1px solid #ccc",
  borderRadius: "12px",
  color: "#202227",
  fontFamily: "var(--main-font-family)",
  // paddingLeft: "-1.5rem",
  backgroundColor: "#EDF2F6",
  outline: "none !important",
  "& input": {
    borderBottom: "none", // Remove bottom border of the input
  },
};

const generalBox = {
  display: "flex",
  justifyContent: "center",
  marginTop: "0.1rem",
};

const paperPropsStyle = {
  borderRadius: "1rem",
  width: { lg: "30%", md: "50%", sm: "100%", xs: "100%" },
  padding: "1rem", // Change background color here
};

const typoText = {
  fontFamily: "var(--main-font-family)",
  fontSize: "0.8rem",
  color: "#202227",
};
const doneButton = {
  height: "70%",
  width: "7rem",
  // marginTop: "0.1srem",
  marginBottom: "1.5rem",
};

const parallelBox = {
  display: "flex",
  gap: "1rem",
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
