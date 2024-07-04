import {
  Avatar,
  Divider,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import BuilderProButton from "../../UI/Button/BuilderProButton";
import CloseIcon from "@mui/icons-material/Close";
import LinkIcon from "@mui/icons-material/Link";
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

const ShareModal = ({
  setShareToClient,
  setDone,
  rowCheckboxes,
  setInvoiceData,
  setRowCheckboxes,
}) => {
  let loggedInUser = localStorage.getItem("userInfo");
  let userInfo = JSON.parse(loggedInUser);
  const dispatch = useDispatch();
  const userRoleAuth = useSelector(getUserRoleFromRedux);
  const currentUser = userInfo?.user;
  const [currentPayment, setCurrentPayment] = useState([[]]);
  const [percentage, setPercentage] = useState([[]]);
  const [userExits, setClientExists] = useState(false);
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const [selectedUser, setSelectedUser] = useState("");
  const projectId = pathSegments[2];
  const userAuth = userRoleAuth.userRole === "supplier";
  const { data, isError, refetch } = useGetProjectTeamQuery(projectId);
  const [clientInvoice, { data: invoiceData, isLoading }] =
    useClientInvoiceMutation();
  const [updatePhaseLine, { isLoading: updateIsLoading }] =
    useUpdatePhaseLineMutation();
  const rowsArray = Object.values(rowCheckboxes).flatMap(({ rows }) => rows);
  console.log(userRoleAuth);
  const invoiceDataCall = async () => {
    try {
      const lineItemIds = rowsArray.flatMap((lineItem) => lineItem.id);
      const result = await clientInvoice({
        rowsArray: lineItemIds,
        selectedUser,
        adminId: currentUser.id,
        projectId,
        supplier: userAuth,
      }).unwrap();
      console.log("Success:", result);
      setInvoiceData(result);
      setRowCheckboxes({});
      dispatch(toggleWorkOrderDeclineRecall());
      return true;
    } catch (err) {
      console.error("Failed to fetch reports stats:", err);
      toast.error(err?.data?.message || "Something went wrong!");
      // setRowCheckboxes({})
      // dispatch(toggleWorkOrderDeclineRecall())
      return false;
    }
  };
  console.log("TEAMTEAMTEAMTEAMTEAMTEAM TEAMTEAMTEAMTEAMTEAM", currentPayment);

  // useEffect(() => {
  //   console.log("API CALLED090909()()()(userIduserIduserId");

  // }, []);

  //
  const handleSetPayment = async (id, index, pendingPayment, outterIndex) => {
    console.log(currentPayment[outterIndex][index]);
    console.log(pendingPayment);
    if (
      parseFloat(currentPayment[outterIndex][index]) >
      parseFloat(pendingPayment)
    ) {
      toast.error("Please enter a value less than the remaining cost");
      return;
    }
    //on send button the line item will update against it and then the invoice will generate
    try {
      const res = await updatePhaseLine({
        id: id,
        currentPayment: currentPayment[outterIndex][index],
        projectId: projectId,
      });
      toast.success("Payment has been set");
    } catch (err) {
      console.log(err);
    }
  };
  const team = data?.team;
  const [open, setOpen] = useState(true);
  const [userType, setUserType] = useState("");
  const handleClose = () => {
    setShareToClient(false);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleChange = (
    index,
    value,
    outerIndex,
    pendingPayment,
    automated = false
  ) => {
    // Initialize the nested array structure if necessary
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
      if (automated) {
        const percentage =
          (parseFloat(value) * 100) / parseFloat(pendingPayment);
        // console.log(pendingPayment);
        handlePercentage(index, percentage, outerIndex, pendingPayment, false);
      }
      return updatedPayments;
    });
  };
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
        // console.log(automated);
        // console.log()
        const payment = pendingPayment * (value / 100);
        handleChange(index, payment, outerIndex, pendingPayment, false);
      }
      return updatedPercentage;
    });
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    // console.log("Selected user:", user);
  };

  const handleSend = async () => {
    if (filterTeam?.length < 1) {
      toast.warning("No User found");
      return;
    } else if (!selectedUser) {
      toast.warning("Please select a user");
      return;
    }
    const result = await invoiceDataCall();
    console.log(result);
    if (result) {
      setDone(true);
      setShareToClient(false);
    } else {
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

  const filterTeam = useMemo(()=>{
    if(!data?.team) return [];

    return data?.team.filter(user => {
      if(userRoleAuth.userRole ===  'supplier'){
        return(
          user.role === "Superadmin" ||
          user.role === "admin" ||
          user.role === "projectManager"
        )
      }else {
        return (
          user.role === 'Client'
        )
      }
    })

  }, [data, userRoleAuth.userRole])

  return (
    <>
      <Modal open={open} onClose={setShareToClient}>
        <Stack sx={style}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              sx={{ p: 1 }}
              color={"#4C8AB1"}
              fontWeight={"500"}
              fontSize={"20px"}
            >
              Send to
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon sx={{ p: 2, color: "#535353", fontSize: "20px" }} />
            </IconButton>
          </Stack>
          <Divider variant="fullWidth" />
          <Stack justifyContent={"center"} alignItems={"flex-start"}>
            {userAuth ? (
              <></>
            ) : (
              Object.values(rowCheckboxes).map((phase, outerIndex) =>
                phase.rows.map((row, index) => {
                  // totalCost =
                  //   totalCost +
                  //   parseFloat(invoiceData?.invoiceCompleteObj?.InvoiceLineItems[index]
                  //     ?.totalAmount);

                  const totalCost = Number(row.total) + Number(row.margin);
                  return (
                    <>
                      <Stack
                        key={row.id}
                        p={1}
                        direction={"row"}
                        gap={2}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Typography sx={label}>{row.title}</Typography>
                        <Typography
                          sx={{
                            ...label,
                            display: {
                              xl: "inline-block",
                              lg: "inline-block",
                              md: "inline-block",
                              sm: "none",
                              xs: "none",
                            },
                          }}
                        >
                          Total Cost: ${formatMoney(totalCost)}
                        </Typography>
                        <Typography
                          sx={{
                            ...label,
                            display: {
                              xl: "inline-block",
                              lg: "inline-block",
                              md: "inline-block",
                              sm: "none",
                              xs: "none",
                            },
                          }}
                        >
                          Remaining: ${formatMoney(row.paymentPending)}
                        </Typography>
                        <Typography
                          sx={{
                            ...label,
                            display: {
                              xl: "inline-block",
                              lg: "inline-block",
                              md: "inline-block",
                              sm: "none",
                              xs: "none",
                            },
                          }}
                        >
                          Invoice pending: ${formatMoney(row.pendingAmount)}
                        </Typography>
                        <Stack direction={"row"} alignItems={"center"}>
                          <Typography sx={label}>Payment: </Typography>
                          <TextField
                            sx={{
                              width: {
                                xl: "150px",
                                lg: "150px",
                                md: "150px",
                                sm: "80px",
                                xs: "80px",
                              },
                            }}
                            placeholder="200"
                            required
                            margin="dense"
                            id="total"
                            name="total"
                            type="number"
                            variant="standard"
                            value={
                              isValidIndex(currentPayment, outerIndex, index)
                                ? currentPayment[outerIndex][index]
                                : ""
                            }
                            onChange={(e) =>
                              handleChange(
                                index,
                                e.target.value,
                                outerIndex,
                                row.paymentPending,
                                true
                              )
                            }
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  $
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Stack>
                        <Stack direction={"row"} alignItems={"center"}>
                          {/* <Typography sx={label}>% </Typography> */}
                          <TextField
                            sx={{
                              width: {
                                xl: "150px",
                                lg: "150px",
                                md: "150px",
                                sm: "80px",
                                xs: "80px",
                              },
                            }}
                            placeholder="10"
                            required
                            margin="dense"
                            id="total"
                            name="total"
                            type="number"
                            variant="standard"
                            value={
                              isValidIndex(percentage, outerIndex, index)
                                ? percentage[outerIndex][index]
                                : ""
                            }
                            onChange={(e) =>
                              handlePercentage(
                                index,
                                e.target.value,
                                outerIndex,
                                row.paymentPending,
                                true
                              )
                            }
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  %
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Stack>
                        <BuilderProButton
                          handleOnClick={() =>
                            handleSetPayment(
                              row.id,
                              index,
                              row.paymentPending,
                              outerIndex
                            )
                          }
                        >
                          set
                        </BuilderProButton>
                        {/* <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">{row.unit_price}</TableCell> */}
                        {/* <TableCell align="right">{row.margin}</TableCell> */}
                      </Stack>
                      {/* <TableRow>
                  <TableCell rowSpan={3} colSpan={2} />
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align="right">{row.total}</TableCell>
                </TableRow> */}
                    </>
                  );
                })
              )
            )}
          </Stack>
          <Divider variant="fullWidth" />
          {/* <Stack direction={"row"} pl={4} pr={4} pt={2} pb={2} spacing={3}>
            <Stack
              direction={"row"}
              border={"2px solid #FFAC00"}
              borderRadius={"30px"}
              pl={2}
              width={"100%"}
            >
              <Input
                placeholder="Select Person To Send Email To:"
                aria-describedby="my-helper-text"
                value={selectedUser?.firstName || ""}
                onChange={(e) => setSelectedUser(e.target.value)}
                sx={{
                  "&::after": {
                    borderBottom: "none",
                  },
                  "&:before": {
                    borderBottom: "none",
                  },
                  "&.MuiInput-root:hover:not(.Mui-disabled, Mui-error):before":
                    {
                      borderBottom: "none",
                    },
                  width: "90%",
                }}
              />
              <FormControl
                style={{ marginLeft: "5px", width: "120px" }}
                size="small"
                fullWidth
              >
                <InputLabel
                  id="demo-simple-select-label"
                  style={{
                    fontSize: "12px",
                    top: "3px",
                    fontFamily: "Arial Rounded MT, sans-serif",
                    color: "#202227",
                  }}
                  sx={{
                    marginRight: "5px",
                    paddingRight: "5px",
                    "&.Mui-focused": {
                      display: "none",
                    },
                    "&.MuiInputLabel-shrink": {
                      display: "none",
                    },
                  }}
                >
                  Select Role
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={userType}
                  label={userType}
                  onChange={handleUserTypeChange}
                  placeholder={`Client`}
                  sx={{
                    cursor: "pointer",
                    ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                >
                  <MenuItem value={"user"}>Client</MenuItem>
                  <MenuItem value={"admin"}>Admin</MenuItem>
                  <MenuItem value={"super admin"}>Super admin</MenuItem>
                  <MenuItem value={"super admin"}>Project Manager</MenuItem>
                  <MenuItem value={"super admin"}>Subcontractor</MenuItem>
                  <MenuItem value={"super admin"}>Supplier</MenuItem>
                  <MenuItem value={"super admin"}>Employee</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Stack> */}

          {data?.team.length > 0 ? (
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
                <Stack p={0.5} width={"100%"}>
                  <Stack
                    id={user.img}
                    direction={"row"}
                    justifyContent={"center"}
                    alignItems={"center"}
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
                      direction={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      p={2}
                      sx={{ cursor: "pointer" }}
                      gap={1}
                      border={
                        selectedUser.userId === user.userId
                          ? "2px solid black"
                          : ""
                      }
                    >
                      <Avatar
                        src={user.img}
                        alt="User Profile Pic"
                        width={"32px"}
                        height={"32px"}
                        style={{ borderRadius: "50px" }}
                      ></Avatar>
                      <Typography
                        color={"#202227"}
                        fontSize={"14px"}
                        pl={2}
                        fontFamily={"Arial Rounded MT, sans-serif"}
                      >
                        {user?.firstName}
                      </Typography>
                      <Typography
                        fontFamily={"Arial Rounded MT, sans-serif"}
                        fontSize={"14px"}
                      >
                        {user.role}
                      </Typography>
                      <Typography
                        fontFamily={"Arial Rounded MT, sans-serif"}
                        fontSize={"14px"}
                      >
                        {user.email}
                      </Typography>
                    </Stack>
                  </Stack>
                  {users.length - 1 === index ? <></> : <Divider />}
                </Stack>
              );
            })
          ) : (
            <Typography p={2}>No Team Members were Assigned</Typography>
          )}
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
              <Typography>Send</Typography>
            </BuilderProButton>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};

export default ShareModal;

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
};
const label = {
  fontSize: "12px",
  fontFamily: "inherit",
};
