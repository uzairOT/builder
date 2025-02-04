import {
  Avatar,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Tooltip,
  Container,
} from "@mui/material";
import * as yup from "yup";
import React, { useMemo, useState } from "react";
import BuilderProButton from "../../UI/Button/BuilderProButton";
import CloseIcon from "@mui/icons-material/Close";
import users from "./assets/data/users.json";
import { Box, Modal } from "@mui/material";
import {
  useGetProjectTeamQuery,
  useUpdatePhaseLineMutation,
} from "../../../redux/apis/Project/projectApiSlice";
import { useLocation } from "react-router-dom";
import { useClientInvoiceMutation } from "../../../redux/apis/Invoices/ClientInvoiceApiSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { toggleWorkOrderDeclineRecall } from "../../../redux/slices/Notifications/notificationSlice";
import { formatMoney } from "../../../utils/Formatters/moneyFormat";
import { getUserRoleFromRedux } from "../../../redux/slices/auth/userRoleSlice";
import { useFormik } from "formik";

const ShareModal = ({
  setShareToClient,
  setDone,
  rowCheckboxes,
  setInvoiceData,
  setRowCheckboxes,
}) => {
  let lineItemData = [];
  let loggedInUser = localStorage.getItem("userInfo");
  let userInfo = JSON.parse(loggedInUser);
  const dispatch = useDispatch();
  const userRoleAuth = useSelector(getUserRoleFromRedux);
  const currentUser = userInfo?.user;
  const [currentPayment, setCurrentPayment] = useState([[]]);
  const [percentage, setPercentage] = useState([[]]);

  const location = useLocation();
  const [errorState, setErrorState] = useState([]);
  const pathSegments = location.pathname.split("/");
  const [selectedUser, setSelectedUser] = useState("");
  const projectId = pathSegments[2];
  const userAuth = userRoleAuth.userRole === "supplier";
  const { data } = useGetProjectTeamQuery(projectId);
  const [isLoading, setIsLoading] = useState(false);
  const [clientInvoice] = useClientInvoiceMutation();
  const [updatePhaseLine] = useUpdatePhaseLineMutation();
  const rowsArray = Object.values(rowCheckboxes).flatMap(({ rows }) => rows);
  const invoiceDataCall = async () => {
    try {
      const lineItemIds = rowsArray.flatMap((lineItem) => lineItem.id);
      const result = await clientInvoice({
        rowsArray: lineItemIds,
        selectedUser,
        adminId: currentUser.id,
        projectId,
        supplier: userAuth,
        enteredEmail: formik?.values?.email,
        notes: formik?.values?.notes,
      }).unwrap();
      setInvoiceData(result);
      setRowCheckboxes({});
      dispatch(toggleWorkOrderDeclineRecall());
      return true;
    } catch (err) {
      console.error("Failed to fetch reports stats:", err);
      toast.error(err?.data?.message || "Something went wrong!");
      return false;
    }
  };

  const handleClose = () => {
    setShareToClient(false);
  };

  const handleChange = (
    index,
    value,
    outerIndex,
    pendingPayment,
    automated = false
  ) => {
    setCurrentPayment((prevPayments) => {
      const updatedPayments = [...prevPayments];

      // Ensure the outer array has enough arrays
      while (updatedPayments.length <= outerIndex) {
        updatedPayments.push([]);
      }

      // Ensure the inner array has enough elements
      while (updatedPayments[outerIndex].length <= index) {
        updatedPayments[outerIndex].push("");
      }

      // Update the value at the specified index
      updatedPayments[outerIndex][index] = value;

      // Perform validation
      setErrorState((prevState) => {
        const updatedErrorState = [...prevState];

        // Ensure the outer array has enough arrays
        while (updatedErrorState.length <= outerIndex) {
          updatedErrorState.push([]);
        }

        // Ensure the inner array has enough elements
        while (updatedErrorState[outerIndex].length <= index) {
          updatedErrorState[outerIndex].push(false);
        }

        // Update the error state at the specified index
        updatedErrorState[outerIndex][index] =
          parseFloat(value) > parseFloat(pendingPayment);

        return updatedErrorState;
      });
      if (automated && value !== "") {
        const numericValue = parseFloat(value) || 0; // Ensure numericValue is 0 if value is ""
        const percentage = (numericValue * 100) / parseFloat(pendingPayment);
        handlePercentage(
          index,
          percentage?.toFixed(2),
          outerIndex,
          pendingPayment,
          false
        );
      } else if (value === "") {
        handlePercentage(index, "0.00", outerIndex, pendingPayment, false); // Set to 0.00 for consistency
      }

      return updatedPayments;
    });
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      notes: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
    },
  });
  const handlePercentage = (
    index,
    value,
    outerIndex,
    pendingPayment,
    automated = false
  ) => {
    setPercentage((prePercentage) => {
      const updatedPercentage = [...prePercentage];

      while (updatedPercentage.length <= outerIndex) {
        updatedPercentage.push([]);
      }
      while (updatedPercentage[outerIndex].length <= index) {
        updatedPercentage[outerIndex].push("");
      }
      updatedPercentage[outerIndex][index] = value;
      if (automated) {
        const payment = pendingPayment * (value / 100);
        handleChange(
          index,
          payment?.toFixed(2),
          outerIndex,
          pendingPayment,
          false
        );
      }
      return updatedPercentage;
    });
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleSend = async () => {
    if (!formik.values.email && !selectedUser) {
      toast.error("Please enter an email or select a team member.");
      return;
    }

    // if (filterTeam.length < 1) {
    //   toast.warning("No User found");
    //   return;
    // }
    setIsLoading(true);
    try {
      await handleSetAllPayments();
      const result = await invoiceDataCall();
      if (result) {
        setDone(true);
        setShareToClient(false);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  const handleSetAllPayments = async () => {
    for (let i = 0; i < lineItemData.length; i++) {
      const { outerIndex, index, id, pendingPayment } = lineItemData[i];
      if (!currentPayment[outerIndex][index]) {
        // toast.error("Please enter all fields");
        return;
      }
      if (
        parseFloat(currentPayment[outerIndex][index]) >
        parseFloat(pendingPayment)
      ) {
        toast.error("Please enter a value less than the remaining cost");
        return;
      }
      try {
        await updatePhaseLine({
          id: id,
          currentPayment: parseFloat(currentPayment[outerIndex][index]),
          projectId: projectId,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };
  const isValidIndex = (array, outerIndex, innerIndex) =>
    Array.isArray(array) &&
    Number.isInteger(outerIndex) &&
    outerIndex >= 0 &&
    outerIndex < array.length &&
    Array.isArray(array[outerIndex]) &&
    Number.isInteger(innerIndex) &&
    innerIndex >= 0 &&
    innerIndex < array[outerIndex].length;

  const filterTeam = useMemo(() => {
    if (!data?.team) return [];

    return data?.team.filter((user) => {
      if (
        userRoleAuth.userRole === "supplier" ||
        userRoleAuth.userRole === "subcontractor"
      ) {
        return (
          user.role === "Superadmin" ||
          user.role === "Admin" ||
          user.role === "Project Manager"
        );
      } else {
        return (
          user.role === "Client" ||
          user.role === "Admin" ||
          user.role === "Project Manager" ||
          user.role === "Subcontractor" ||
          user.role === "Employee" ||
          user.role === "Others"
        );
      }
    });
  }, [data, userRoleAuth.userRole]);
  console.log(filterTeam);
  return (
    <>
      <Modal open={true} onClose={setShareToClient}>
        <Stack sx={style}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack
              direction={"row"}
              justifyContent={"start"}
              alignItems={"center"}
              gap={1}
              width={"100%"}
            >
              <Box>
                <Typography
                  sx={{ p: 1 }}
                  color={"#4C8AB1"}
                  fontWeight={"500"}
                  fontSize={{ sm: "20px", xs: "16px" }}
                  whiteSpace={"nowrap"}
                >
                  Send to
                </Typography>
                <Box height={"22.91px"}></Box>
              </Box>
              <Stack direction={{ md: "row", xs: "column" }} gap={1}>
                <Box width={{ sm: "300px", xs: "180px" }}>
                  {/* Email input */}
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email ? formik.errors.email : ""}
                    InputProps={{
                      style: {
                        ...InputStyle,
                        border:
                          formik.errors.email && formik.touched.email
                            ? "1px solid #d32f2f"
                            : "1px solid #E0E4EC",
                      },
                      maxLength: 50,
                    }}
                    inputProps={{
                      style: {
                        padding: "10px",
                      },
                    }}
                  />
                  {!formik.errors.email && <Box height={"22.91px"}></Box>}
                </Box>
                <Box width={{ sm: "300px", xs: "180px" }}>
                  {/* Notes input */}
                  <TextField
                    fullWidth
                    id="notes"
                    name="notes"
                    placeholder="Notes"
                    value={formik.values.notes}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    InputProps={{
                      style: {
                        ...InputStyle,
                      },
                      maxLength: 50,
                    }}
                    inputProps={{
                      style: {
                        padding: "10px",
                      },
                    }}
                  />
                  <Box height={"22.91px"}></Box>
                </Box>
              </Stack>
            </Stack>
            <Box>
              <IconButton onClick={handleClose}>
                <CloseIcon sx={{ p: 2, color: "#535353", fontSize: "20px" }} />
              </IconButton>
              <Box height={"22.91px"}></Box>
            </Box>
          </Stack>
          <Divider variant="fullWidth" />
          <Stack height={"250px"} overflow={"auto"}>
            {filterTeam?.length > 0 ? (
              filterTeam?.map((user, index) => {
                // if (userRoleAuth.userRole === "supplier") {
                //   if (
                //     user.role === "Superadmin" ||
                //     user.role === "admin" ||
                //     user.role === "projectManager"
                //   ) {
                //     console.log(user);
                //     // Continue to the main render if the role matches
                //   } else {
                //     return <></>; // Return an empty element if the role doesn't match
                //   }
                // } else {
                //   if (user.role !== "Client") {
                //     return <></>; // Return an empty element if the role doesn't match
                //   } else {
                //     setClientExists(true);
                //   }
                // }
                return (
                  <Stack p={0.5}>
                    <Container justifyContent="center" display="flex">
                      <Stack
                        sx={{}}
                        id={user.img}
                        direction="row"
                        alignItems="center"
                        justifyContent={"center"}
                        pb={1}
                        onClick={() =>
                          handleUserSelect(() => {
                            if (selectedUser.userId === user.userId) {
                              return "";
                            } else {
                              return user;
                            }
                          })
                        }
                      >
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          p={2}
                          gap={1}
                          border={
                            selectedUser.userId === user.userId
                              ? "2px solid black"
                              : ""
                          }
                          sx={{
                            cursor: "pointer",
                            width: {
                              xl: "370px",
                              lg: "370px",
                              md: "350px",
                              xs: "340px",
                            },
                          }}
                        >
                          <Stack 
                          direction={"row"}
                          justifyContent="center"
                          alignItems="center"
                          gap={1}
                          >
                            <Avatar
                              src={user.img}
                              alt="User Profile Pic"
                              sx={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "50px",
                              }}
                            />
                            <Typography
                              color="#202227"
                              fontSize="14px"
                              fontFamily="var(--main-font-family)"
                            >
                              {user?.firstName}
                            </Typography>
                          </Stack>
                          <Typography
                            fontFamily="var(--main-font-family)"
                            fontSize="14px"
                          >
                            {user.role}
                          </Typography>
                          <Tooltip title={user.email} arrow>
                            <Typography
                              maxWidth="20ch"
                              fontFamily="var(--main-font-family)"
                              fontSize="14px"
                              noWrap
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {user.email}
                            </Typography>
                          </Tooltip>
                        </Stack>
                      </Stack>
                    </Container>

                    {users.length - 1 === index ? <></> : <Divider />}
                  </Stack>
                );
              })
            ) : (
              <Typography p={2}>No client was assigned</Typography>
            )}
          </Stack>
          <Stack justifyContent={"center"} alignItems={"flex-start"}>
            {
              <TableContainer
                component={Paper}
                style={{ height: "300px", backgroundColor: "transparent" }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={tableCellStyles}>Title</TableCell>
                      <TableCell
                        sx={{
                          ...tableCellStyles,
                          display: { sm: "table-cell", xs: "none" },
                        }}
                      >
                        Total Cost
                      </TableCell>
                      <TableCell sx={tableCellStyles}>Remaining</TableCell>
                      <TableCell
                        sx={{
                          ...tableCellStyles,
                          display: { sm: "table-cell", xs: "none" },
                        }}
                      >
                        Invoice Pending
                      </TableCell>
                      <TableCell sx={tableCellStyles}>Payment</TableCell>
                      <TableCell
                        sx={{
                          ...tableCellStyles,
                          display: { sm: "table-cell", xs: "none" },
                        }}
                      >
                        Percentage
                      </TableCell>
                      {/* <TableCell sx={tableCellStyles}>Action</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.values(rowCheckboxes).map((phase, outerIndex) =>
                      phase.rows.map((row, index) => {
                        const totalCost =
                          Number(row.total) + Number(row.margin);
                        const paymentPending = row.paymentPending
                          ? row.paymentPending
                          : 0;
                        lineItemData.push({
                          outerIndex,
                          index,
                          id: row.id,
                          pendingPayment: paymentPending,
                        });
                        return (
                          <TableRow key={row.id}>
                            <TableCell>
                              <Typography
                                sx={{
                                  ...tableCellStyles,
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {row.title}
                              </Typography>
                            </TableCell>
                            <TableCell
                              sx={{ display: { sm: "table-cell", xs: "none" } }}
                            >
                              <Typography sx={tableCellStyles}>
                                Total Cost: ${formatMoney(totalCost)}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography sx={tableCellStyles}>
                                Remaining: ${formatMoney(row.paymentPending)}
                              </Typography>
                            </TableCell>
                            <TableCell
                              sx={{ display: { sm: "table-cell", xs: "none" } }}
                            >
                              <Typography sx={tableCellStyles}>
                                Invoice Pending: $
                                {formatMoney(row.pendingAmount)}
                              </Typography>
                            </TableCell>
                            <TableCell sx={tableCellStyles}>
                              <TextField
                                placeholder="200"
                                required
                                margin="dense"
                                id="total"
                                name="total"
                                type="number"
                                variant="standard"
                                error={
                                  isValidIndex(errorState, outerIndex, index)
                                    ? errorState[outerIndex][index]
                                    : false
                                }
                                FormHelperTextProps={{
                                  style: {
                                    fontSize: "9px",
                                  },
                                }}
                                helperText={
                                  isValidIndex(errorState, outerIndex, index) &&
                                  errorState[outerIndex][index]
                                    ? "Enter below remaining cost"
                                    : ""
                                }
                                value={
                                  isValidIndex(
                                    currentPayment,
                                    outerIndex,
                                    index
                                  )
                                    ? currentPayment[outerIndex][index]
                                    : ""
                                }
                                onChange={(e) => {
                                  if (/^\d*\.?\d{0,2}$/.test(e.target.value)) {
                                    handleChange(
                                      index,
                                      e.target.value,
                                      outerIndex,
                                      paymentPending,
                                      true
                                    );
                                  }
                                }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      $
                                    </InputAdornment>
                                  ),
                                }}
                                sx={{
                                  width: {
                                    xl: "150px",
                                    lg: "150px",
                                    md: "150px",
                                    sm: "80px",
                                    xs: "80px",
                                  },
                                }}
                              />
                            </TableCell>
                            <TableCell
                              sx={{
                                ...tableCellStyles,
                                display: { sm: "table-cell", xs: "none" },
                              }}
                            >
                              <TextField
                                placeholder="10"
                                required
                                margin="dense"
                                id="total"
                                name="total"
                                type="text"
                                variant="standard"
                                value={
                                  isValidIndex(percentage, outerIndex, index)
                                    ? percentage[outerIndex][index]
                                    : ""
                                }
                                onChange={(e) => {
                                  let value = e.target.value;
                                  console.log(value);
                                  if (/^\d*\.?\d{0,2}$/.test(value)) {
                                    // Pass the raw input value (string) to the handler
                                    handlePercentage(
                                      index,
                                      value,
                                      outerIndex,
                                      row.paymentPending,
                                      true
                                    );
                                  }
                                }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      %
                                    </InputAdornment>
                                  ),
                                }}
                                sx={{
                                  width: {
                                    xl: "150px",
                                    lg: "150px",
                                    md: "150px",
                                    sm: "80px",
                                    xs: "80px",
                                  },
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            }
          </Stack>
          <Divider variant="fullWidth" />

          <Stack direction={"row"} p={2} pl={3} justifyContent={"center"}>
            <BuilderProButton
              backgroundColor={"#FFAC00"}
              variant={"contained"}
              padding={"6px 32px 6px 32px"}
              disabled={isLoading}
              handleOnClick={() => {
                handleSend();
              }}
            >
              {isLoading ? (
                <CircularProgress size={"18px"} />
              ) : (
                <Typography>Send</Typography>
              )}
            </BuilderProButton>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};

export default ShareModal;
const InputStyle = {
  backgroundColor: "#EDF2F6",
  borderRadius: "8px",
  fontFamily: "var(--main-font-family)",
  border: "1px solid #E0E4EC",
  padding: "0px",
  width: { xl: "100%", lg: "100%", md: "100%", sm: "100%", xs: "100%" },
  "& .MuiOutlinedInputRoot": {
    "& fieldset": {
      border: "none",
    },
  },
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 1,
  borderRadius: "14px",
  // overflowX: "auto",
};

const tableCellStyles = {
  fontSize: "12px", // Smaller font size
  maxWidth: "120px", // Maximum width
  overflow: "hidden", // Hide overflow
  textOverflow: "ellipsis", // Add ellipsis for overflow text
  // Prevent text wrapping
};
