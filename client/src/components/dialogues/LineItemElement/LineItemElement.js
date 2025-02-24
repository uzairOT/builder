import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
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
  DialogTitle,
  Box,
  Typography,
  Autocomplete,
  Stack,
  IconButton,
  InputAdornment,
  CircularProgress,
  Chip,
} from "@mui/material";
import actionButton from "../../UI/actionButton";
import "../../../App.css";
import "./LineItemElement.css";
import {
  addInitialPhase,
  addPhase,
  updateCheckedItems,
} from "../../../redux/slices/Project/projectInitialProposal";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Close from "@mui/icons-material/Close";
import CreateableSelect from "react-select/creatable";
import { components } from "react-select";
import {
  useAddUnitMutation,
  useGetUnitsQuery,
} from "../../../redux/apis/Project/userProjectApiSlice";
import { getTokenFromLocalStorage } from "../../../redux/apis/apiSlice";
import { toggleWorkOrderDeclineRecall } from "../../../redux/slices/Notifications/notificationSlice";
import { useTranslation } from "react-i18next";
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
  showUpdateLine,
  showAddLine,
  updateRow,
  setUpdateRow,
  lineItemIndex,
  addPhaseId,
  changeOrderView,
}) {
  // const { data, isLoading, isSuccess } = useGetLineItemQuery({
  //   lineItemId: LineItem,
  // });
  const {t} = useTranslation()
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
  const existingPhases = useSelector(
    (state) => state.projectInitialProposal.phases[0]
  );
  const changeOrderSelected = useSelector(
    (state) => state.projectInitialProposal.changeOrderLineItems
  );
  // console.log("Change Order Selected", changeOrderSelected);

  const formData = {
    phaseName,
    description,
    unit,
    quantity,
    unitPrice,
    total,
    longDescription,
    margin: margin || 0,
    percentage: percentage || 0,
  };

  useEffect(() => {
    const getData = setTimeout(() => {
      axios
        .get(
          `https://builderbuilder.net/user/masterLine/${userInfo.user.id}?query=${formData.phaseName}`,
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
    if (LineHeading === t("LineItem.updateLineItem")) {
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
  const updateLineItem = useCallback(
    (phaseId, lineItemIndex, formData) => {
      setUpdateRow((prevState) => {
        if (lineItemIndex !== -1) {
          const updatedRows = [...prevState[phaseId].rows];
          updatedRows[lineItemIndex] = {
            ...prevState[phaseId].rows[lineItemIndex],
            title: formData.phaseName,
            unit_price: formData.unitPrice,
            ...formData, // Add other fields from formData
          };
          // // Check for existing line items with the same name but different id
          // const phase = existingPhases.find((phase) => phase.id === phaseId);
          // if (phase) {
          //   const itemExists = phase.LineItems.some(
          //     (item) =>
          //       item.title === formData.phaseName && // Same name
          //       item.id !== formData.id // Different id
          //   );
          // if (itemExists) {
          //   // Show a toast if the line item with the same name already exists
          //   toast.error("Line item with the same name already exists!");
          //   return prevState; // Exit without setting the state
          // }
          // }

          // // Check for existing line items with the same name but different id
          // const selectedPhase = changeOrderSelected.find(
          //   (phase) => phase.id === phaseId
          // );
          // if (selectedPhase) {
          //   const itemExists = selectedPhase.LineItems.some(
          //     (item) => item.title === formData.phaseName
          //   );
          //   if (itemExists) {
          //     // Show a toast if the line item with the same name already exists
          //     toast.error("Line item with the same name already exists!");
          //     return prevState; // Exit without setting the state
          //   }
          // }

          // Dispatch to Redux
          dispatch(
            updateCheckedItems({
              phaseId,
              phaseName: formData.phaseName, // Or use existing phaseName if unchanged
              lineItems: updatedRows, // Assuming you want to update the entire list of lineItems
            })
          );

          return {
            ...prevState,
            [phaseId]: {
              ...prevState[phaseId],
              rows: updatedRows,
            },
          };
        }
        return prevState;
      });
    },
    [setUpdateRow, dispatch]
  );
  const addLineItem = useCallback(
    (phaseId, formData, margin, percentage) => {
      const newLineItem = {
        phase_id: phaseId,
        title: formData.phaseName, // Using phaseName as title
        description: formData.description,
        unit: formData.unit,
        quantity: formData.quantity,
        unit_price: formData.unitPrice,
        total: formData.total,
        notes: formData.longDescription,
        margin: margin || 0,
        percentage: percentage || 0,
        status: "Not Requested",
        shouldAdd: true, // Flag to indicate this is a new item to be added
        // Add other default fields as needed
      };

      // // Check if a line item with the same name already exists for the given phase
      // const phase = existingPhases.find((phase) => phase.id === phaseId);
      // if (phase) {
      //   const itemExists = phase.LineItems.some(
      //     (item) => item.title === formData.phaseName
      //   );
      //   if (itemExists) {
      //     // Show a toast if the line item already exists
      //     toast.error("Line item with the same name already exists!");
      //     return; // Exit without setting the state
      //   }
      // }

      // // Check if a line item with the same name already exists for the given phase
      // const selectedPhase = changeOrderSelected.find(
      //   (phase) => phase.id === phaseId
      // );
      // if (selectedPhase) {
      //   const itemExists = selectedPhase.LineItems.some(
      //     (item) => item.title === formData.phaseName
      //   );
      //   if (itemExists) {
      //     // Show a toast if the line item already exists
      //     toast.error("Line item with the same name already exists!");
      //     return; // Exit without setting the state
      //   }
      // }

      setUpdateRow((prevState) => {
        const updatedPhase = prevState[phaseId] || {
          rows: [],
          phaseName: "New Phase",
        };
        const updatedRows = [...updatedPhase.rows, newLineItem];

        // Dispatch to Redux
        dispatch(
          updateCheckedItems({
            phaseId,
            phaseName: updatedPhase.phaseName,
            lineItems: updatedRows,
          })
        );

        return {
          ...prevState,
          [phaseId]: {
            ...updatedPhase,
            rows: updatedRows,
          },
        };
      });
    },
    [dispatch]
  );

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
    if (reqWorkOrderModal) {
      if (LineItem) {
        const phaseId = LineItem.phase_id;
        // const lineItemId = LineItem.id;

        updateLineItem(phaseId, lineItemIndex, formData);
      } else {
        addLineItem(addPhaseId, formData, margin, percentage);
      }
      handleClickClose();
      return;
    }
    setRowCheckboxes({});
    if (quantity <= 0 || unitPrice <= 0) {
      toast.warning("Enter value greater than 0");
      return;
    }

    if (LineHeading === t("LineItem.updateLineItem")) {
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
        toast.success("Line item updated successfully!");
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
        margin: margin || 0,
        percentage: percentage || 0,
        changeFlag: changeOrderView ? true : false,
      };
      if (!newLineItem.unit) {
        toast.warning("Please enter unit");
        return;
      }
      try {
        const response = await addPhaseLine(newLineItem);
        // console.log(response);s
        if (
          response?.error?.data?.message ===
          "LineItem already exists against this phase!"
        ) {
          toast.error(response?.error?.data?.message);
          handleAddClose();
          return;
        }
        // toast.success("Line Item added successfully");
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
    if (value < 0) {
      toast.error("Negative values are not allowed.", { toastId: "no" });
      return;
    }
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
    // console.log("run");
    const margin = parseFloat(value - total);
    const percentage = parseFloat((margin / total) * 100);
    // console.log(total);
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
      padding: "4px", // Keep this as it was,
      overflow: "auto",
      width: "calc(100% + 16px)",
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
    // console.log(actionType);
    // console.log(selectedOption);
    if (selectedOption === null || selectedOption?.value === LineItem?.unit) {
      return;
    }
    const existingUnit = Array.isArray(data?.allUnits)
      ? data?.allUnits?.some((unit) => unit?.value === selectedOption?.value)
      : null;
    // console.log(existingUnit);
    // console.log(selectedOption);
    // console.log(data);
    if (existingUnit) {
      setUnit(selectedOption.value);
    } else if (selectedOption.value) {
      // const slicedValue = selectedOption?.value?.slice(0,10);
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
    // console.log(obj);
    // console.log(creatableRef);
    creatableRef.current.setValue(obj);
  };

  const setUnitOnLineItemEdit = () => {
    if (LineItem) {
      const obj = findValueInData(LineItem.unit);
      const unit = creatableRef.current?.props.value;
      // console.log(obj);
      // console.log(unit);
      // console.log(LineItem?.unit);
      if (unit?.value === LineItem?.unit) {
        return;
      } else if (obj) {
        creatableRef.current?.setValue(obj);
        // console.log(creatableRef.current);
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
      toast.error(`Add client cost`);
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

  useEffect(() => {
    if (data) {
      // setUnitOnLineItemEdit();
    }
  }, [LineItem, data]);
  // useEffect(() => {

  //   handleTotalCostChange();
  // }, [margin]);
  const CustomInput = (props) => {
    const { value, ...rest } = props;

    // Limit input value to 10 characters
    const newValue = value;

    return <components.Input {...rest} value={newValue} maxLength={50} />;
  };
  // const CustomOption = ({ innerRef, innerProps, isDisabled, children, isSelected, isFocused }) => {
  //   // Ensure children is a string to safely check its length
  //   const text = typeof children === 'string' ? children : '';
  //   const limitedText = text.length > 18 ? text.slice(0, 18) + '"' : text;

  //   // Conditional styles for selected and focused states
  //   const optionStyles = {
  //     padding: '4px',
  //     backgroundColor: isSelected ? '#f0f0f0' : 'transparent', // Example selected background color
  //     fontWeight: isSelected ? 'bold' : 'normal', // Example selected font weight
  //     color: isFocused ? '#007bff' : 'inherit' // Example focused text color
  //   };

  //   return !isDisabled ? (
  //     <div ref={innerRef} {...innerProps} style={optionStyles}>
  //       {limitedText}
  //     </div>
  //   ) : null;
  // };

  useEffect(() => {
    const recallUnits = async () => {
      await refetch();
    };
    recallUnits();
  }, [showAddLine, showUpdateLine]);
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
            <DialogTitle sx={typoTitle}>
              {reqWorkOrderModal
                ? addPhaseId
                  ? "Add Line Item"
                  : LineHeading
                : LineHeading}
            </DialogTitle>
            <IconButton
              style={{ width: "40px", height: "40px" }}
              onClick={handleClickClose}
            >
              <Close />
            </IconButton>
          </Stack>
          <DialogContent sx={{ padding: "0rem 3rem 0rem 3rem" }}>
            <Typography sx={typoText}>{t("LineItem.lineItem")}</Typography>
            <>
              <Autocomplete
                disabled={isLoading}
                freeSolo
                disableClearable
                id="phaseName"
                // maxLength={}
                // openOnFocus
                  getOptionLabel={(option) =>
                    typeof option === "string"
                      ? option
                      : option?.template
                      ? `${option.title}`
                      : option.title
                  }
                options={
                  autoComplete ? autoComplete.map((option) => option) : []
                } // Add your options here
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    {...props}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      paddingY: 0.5,
                    }}
                  >
                    <span>{option.title}</span>
                    {option.template && (
                      <Chip
                        label="Template"
                        color="primary"
                        size="small"
                        variant="outlined"
                        sx={{ marginLeft: 1 }}
                      />
                    )}
                  </Box>
                )}
                value={phaseName}
                name="phaseName"
                onChange={(event, newValue) => {
                  const selectedOption = autoComplete?.find(
                    (option) => option.title === newValue.title
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
                  setPhaseName(newValue.title);
                }}
                renderInput={(params) => (
                  <TextField
                    sx={{ ...inputStyle }}
                    {...params}
                    // label="Line Item Name"
                    margin="dense"
                    variant="standard"
                    placeholder="ex: Demolition"
                    // value={formData.phaseName}
                    // onFocus={() => {}}
                    onChange={(event) => setPhaseName(event.target.value)} // Assuming setPhaseName is your state updater function
                    required
                    InputLabelProps={{ display: "none" }}
                    inputProps={{
                      ...params.inputProps,
                      maxLength: 50,
                    }}
                    // InputProps={{
                    //   maxLength:50
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

              <Typography sx={typoText}>{t("LineItem.description")}</Typography>
              <TextField
                sx={{ ...inputStyle }}
                margin="dense"
                id="description"
                name="description"
                type="text"
                variant="standard"
                value={formData.description}
                placeholder={t("LineItem.placeholder")}
                onChange={(e) => setDescription(e.target.value)}
                inputProps={{ maxLength: 50 }}
              />
              <Box sx={parallelBox}>
                <Box sx={innerBox}>
                  <Typography sx={{ ...typoText }}>{t("LineItem.unit")}</Typography>
                  <Box mt={"8px"} mb={"8px"}>
                    <CreateableSelect
                      ref={creatableRef}
                      defaultInputValue={LineItem ? LineItem?.unit : unit}
                      // value={findValueInData(unit)}
                      inputProps={{ maxLength: 10 }}
                      placeholder={t("LineItem.placeholder1")}
                      styles={selectStyles}
                      // defaultValue={unit}
                      onChange={handleSetUnit}
                      options={
                        data?.allUnits?.filter((option) => option.label) || []
                      }
                      isLoading={isLoading}
                      isDisabled={isLoading}
                      components={{ Input: CustomInput }}
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
                  <Typography sx={typoText}>{t("LineItem.quantity")}</Typography>
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
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value < 0) {
                        toast.error("Negative values are not allowed.");
                        return;
                      }
                      setQuantity((prev) => {
                        setTotal(value * unitPrice);
                        return value;
                      });
                    }}
                  />
                </Box>
              </Box>
              <Typography sx={typoText}>{t("LineItem.unitPrice")}</Typography>
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
                onChange={(e) => {
                  const value = e.target.value;
                  if (value < 0) {
                    toast.error("Negative values are not allowed.");
                    return;
                  }
                  setUnitPrice((prev) => {
                    setTotal(value * quantity);
                    return value;
                  });
                }}
              />

              <Typography sx={typoText}>{t("LineItem.actualCost")}</Typography>
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
              <Typography sx={typoText}>{t("LineItem.clientCost")}</Typography>
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
                  <Typography sx={typoText}>{t("LineItem.profit")}</Typography>

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
                  <Typography sx={typoText}>{t("LineItem.percentage")}</Typography>
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
                       fontFamily: "var(--main-font-family)",
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
                       fontFamily: "var(--main-font-family)",
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

              <Typography sx={typoText}>{t("LineItem.notes")}</Typography>
              <TextField
                inputProps={{ maxLength: 150 }}
                sx={{ ...inputStyle, height: "3.5rem" }}
                placeholder={t("LineItem.placeholder2")}
                margin="dense"
                id="longDescription"
                name="longDescription"
                type="text"
                multiline
                rows={2}
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
                t("Button.done")
              )}
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
  height: "1.8rem",
  marginBottom: "0.5rem",
  alignSelf: "center",
  padding: "8px",
  fontSize: "14px",
  border: "1px solid #ccc",
  borderRadius: "12px",
  color: "#202227",
  fontFamily: "var(--main-font-family)",
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
  fontFamily: "var(--main-font-family)",
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
  gap: { md: "2rem", xs: "0.5rem" },
  justifyContent: "center",
  alignItems: "center",
  flexDirection: { md: "row", xs: "column" },
};
const innerBox = {
  display: "flex",
  flexDirection: "column",
  width: { md: "50%", xs: "100%" },
};
const leftSpace = {
  marginLeft: "1rem",
};

export default AddLineElement;
