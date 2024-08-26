import React, { useState } from "react";
import Switch from "@mui/joy/Switch";
import {
  Typography,
  Grid,
  TextField,
  Divider,
  Stack,
  CircularProgress,
} from "@mui/material";
import Button from "../../UI/CustomButton";
import { useTheme } from "@mui/material/styles";
import {
  useResetProfilePasswordMutation,
  useUpdateUserNotificationsMutation,
} from "../../../redux/apis/usersApiSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useGetUserNotificationQuery } from "../../../redux/apis/Project/userProjectApiSlice";
import { useEffect } from "react";
import { duration } from "moment-timezone";

export default function MyApp() {
  const theme = useTheme();
  const isXs = theme.breakpoints.down("xs");
  const user = useSelector((state) => state.auth.userInfo);
  const { data, refetch } = useGetUserNotificationQuery({
    userId: user.user.id,
  });
  const [updateNotifications, { isLoading: isLoadingNotifications }] =
    useUpdateUserNotificationsMutation();
  const [resetPassword, { isLoading }] = useResetProfilePasswordMutation();
  const [chatNotificationsChecked, setChatNotificationsChecked] =
    useState(true);
  const [employeeChecked, setEmployeeChecked] = useState(true);
  const [supplierNotification, setSupplierNotification] = useState(true);
  const [subContractorChecked, setSubContractorChecked] = useState(true);
  const [clientChecked, setClientChecked] = useState(true);

  const [confrimPassword, setConfrimPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [errorNewPassword, setErrorNewPassword] = useState(false);

  const handleConfirmPasswordBlur = () => {
    const passwordMatch = newPassword === confrimPassword;
    setErrorConfirmPassword(!passwordMatch);
  };
  const handleNewPasswordBlur = () => {
    const isPasswordValidLength = newPassword.length >= 8;
    setErrorNewPassword(!isPasswordValidLength);
  };
  const validationStyle = {
    "& input": {
      border: !errorConfirmPassword ? "1px solid #E0E4EC" : "1px solid #D02E2E",
      borderRadius: "8px",
      padding: "10px",
    },
  };
  const validationStyleNewPassword = {
    "& input": {
      border: !errorNewPassword ? "1px solid #E0E4EC" : "1px solid #D02E2E",
      borderRadius: "8px",
      padding: "10px",
    },
  };
  // const handleSubmit = async () => {
  //   if(!passwordMatch){
  //     toast.error("Passwords don't match!");
  //     return false
  //   } else {
  //   const resetBody = {
  //     oldPassword: currentPassword,
  //     newPassword: newPassword,
  //     confirmPassword: confrimPassword,
  //     userId: user.user.id,
  //   }
  //  const res = await resetPassword(resetBody);
  //  console.log(res);
  //  if(res?.error){
  //   toast.error(res.error.data.message);
  //   return false
  //  }
  //  if(res?.data?.success){
  //   toast.info(res.data.message);
  //   return false
  //  }
  //   }
  // }

  const handleSubmit = async () => {
    if (errorConfirmPassword || errorNewPassword) {
      toast.error(
        `${
          errorConfirmPassword
            ? "Passwords don't match!"
            : "Password must be at least 8 characters long"
        }`
      );
      return false;
    } else {
      try {
        const resetBody = {
          oldPassword: currentPassword,
          newPassword: newPassword,
          confirmPassword: confrimPassword,
          userId: user.user.id,
        };
        const res = await resetPassword(resetBody).unwrap();
        toast.success("Profile updated successfully");
      } catch (error) {
        console.log(error);
        toast.error(
          error?.data?.message ||
            error.error ||
            error?.data?.error ||
            "Something went wrong!"
        );
      }
    }
  };
  const handleUpdateNotifications = async (name, checked) => {
    try {
      const res = await updateNotifications({
        userId: user.user.id,
        name: name,
        toggle: checked,
      });
      await refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleNotifications = (e) => {
    const { name, checked } = e.target;

    switch (name) {
      case "chatNotification":
        setChatNotificationsChecked(checked);
        handleUpdateNotifications(name, checked);
        break;
      case "employeeNotification":
        setEmployeeChecked(checked);
        handleUpdateNotifications(name, checked);
        break;
      case "supplierNotification":
        setSupplierNotification(checked);
        handleUpdateNotifications(name, checked);
        break;
      case "subcontractorNotification":
        setSubContractorChecked(checked);
        handleUpdateNotifications(name, checked);
        break;
      default:
        console.warn(`Unknown notification type: ${name}`);
    }
  };
  useEffect(() => {
    if (data?.data?.id) {
      setEmployeeChecked(Boolean(data?.data?.employeeNotification));
      setSupplierNotification(Boolean(data?.data?.supplierNotification));
      setSubContractorChecked(Boolean(data?.data?.subcontractorNotification));
    }
  }, [data]);

  return (
    <div>
      {/* Password Section */}
      <Typography sx={passwordHeadings} variant="h5" gutterBottom>
        Password
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item md={6} xs={12}>
          <Typography sx={subHeadings}>Current Password</Typography>
          <TextField
            inputProps={{ maxLength: 50 }}
            fullWidth
            placeholder="Enter Current Password"
            variant="outlined"
            type="password"
            sx={InputStyle}
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
            }}
          />
        </Grid>
        <Grid item md={6} xs={0}></Grid>

        <Grid item md={6} xs={12}>
          <Typography sx={subHeadings}>New Password</Typography>
          <TextField
            inputProps={{ maxLength: 50 }}
            fullWidth
            placeholder="Enter New Password"
            variant="outlined"
            type="password"
            sx={{ ...InputStyle, ...validationStyleNewPassword }}
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            onBlur={handleNewPasswordBlur}
          />
          {errorNewPassword && (
            <Typography fontSize={"11px"} color={"#D02E2E"}>
              Password must be at least 8 characters long
            </Typography>
          )}
        </Grid>
        <Grid item md={6} xs={0}></Grid>
        <Grid item md={6} xs={12}>
          <Typography sx={subHeadings}>Confirm Password</Typography>
          <TextField
            inputProps={{ maxLength: 50 }}
            fullWidth
            placeholder="Confirm your password here"
            variant="outlined"
            type="password"
            sx={{ ...InputStyle, ...validationStyle }}
            value={confrimPassword}
            onChange={(e) => {
              setConfrimPassword(e.target.value);
            }}
            onBlur={handleConfirmPasswordBlur}
          />
          {errorConfirmPassword && (
            <Typography fontSize={"11px"} color={"#D02E2E"}>
              Passwords dont match
            </Typography>
          )}
        </Grid>
      </Grid>

      {/* Divider */}
      <Divider sx={{ my: 2, mt: 3 }} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography sx={headings} variant="h5" gutterBottom>
              Notifications
            </Typography>
            {isLoadingNotifications && <CircularProgress size={"20px"} />}
          </Stack>
        </Grid>
        {/* <Grid item xs={12}>
          <Typography sx={subHeadings} variant="body1" gutterBottom>
            Chat Notifications
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} md={6} lg={8} xl={5} sx={{ display: "flex" }}>
            <Grid item xs={12} md={6} lg={8} xl={5}>
              <Typography sx={switchLabelstyles} variant="body1">
                Chat Notifications
              </Typography>
            </Grid>
            <Switch
              slotProps={{ input: { name: "chatNotification" } }}
              checked={chatNotificationsChecked}
              onChange={handleNotifications}
            />
          </Grid>
        </Grid> */}
        <Grid item xs={12} md={5}>
          <Typography sx={subHeadings} variant="body1" gutterBottom>
            Team Notification
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} md={6} lg={8} xl={5} sx={{ display: "flex" }}>
            <Grid item xs={12} md={6} lg={8} xl={5}>
              <Typography sx={switchLabelstyles} variant="body1">
                Employee
              </Typography>
            </Grid>
            <Switch
              sx={switchTransition}
              slotProps={{ input: { name: "employeeNotification" } }}
              checked={employeeChecked}
              onChange={handleNotifications}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} md={6} lg={8} xl={5} sx={{ display: "flex" }}>
            <Grid item xs={12} md={6} lg={8} xl={5}>
              <Typography sx={switchLabelstyles} variant="body1">
                Supplier
              </Typography>
            </Grid>
            <Switch
              sx={switchTransition}
              slotProps={{ input: { name: "supplierNotification" } }}
              checked={supplierNotification}
              onChange={handleNotifications}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} md={6} lg={8} xl={5} sx={{ display: "flex" }}>
            <Grid item xs={12} md={6} lg={8} xl={5}>
              <Typography sx={switchLabelstyles} variant="body1">
                Subcontractor
              </Typography>
            </Grid>
            <Switch
              sx={switchTransition}
              slotProps={{ input: { name: "subcontractorNotification" } }}
              checked={subContractorChecked}
              onChange={handleNotifications}
            />
          </Grid>
        </Grid>
        {/* <Grid item xs={12}>
          <Grid item xs={12} md={6} lg={8} xl={5} sx={{ display: "flex" }}>
            <Grid item xs={12} md={6} lg={8} xl={5}>
              <Typography sx={switchLabelstyles} variant="body1">
                Client
              </Typography>
            </Grid>
            <Switch
              slotProps={{ input: { name: "client" } }}
              checked={clientChecked}
              onChange={handleNotifications}
            />
          </Grid>
        </Grid> */}
        <Grid
          item
          xs={12}
          md={4}
          lg={3}
          sx={{ display: "flex", justifyContent: "flex-start", gap: 1, my: 6 }}
        >
          <Button
          sx={{  
            fontFamily: 'var(--main-font-family)',
          }}
            buttonText="Update Profile"
            color="#ffffff"
            backgroundColor="#4C8AB1"
            width="112px"
            height="38px"
            borderRadius="50px"
            onClick={handleSubmit}
            isLoading={isLoading}
          />

          {/* <Button
            buttonText="Reset"
            color="#4C8AB1"
            border={"1px solid #4C8AB1"}
            width="112px"
            height="38px"
            borderRadius="50px"
            fontSize={"13px"}
          /> */}
        </Grid>
      </Grid>
    </div>
  );
}

const switchLabelstyles = {
  fontFamily: "var(--main-font-family)",
  fontWeight: "400",
  color: "#2022279C",
  marginLeft: "15px",
};
const passwordHeadings = {
  marginTop: "20px",
  marginBottom: "20px",
  fontFamily: "var(--main-font-family)",
  fontWeight: "400",
  color: "#4C8AB1",
};
const headings = {
  marginTop: "10px",
  marginBottom: "10px",
  fontFamily: "var(--main-font-family)",
  fontWeight: "400",
  color: "#4C8AB1",
};
const subHeadings = {
  ...headings,
  color: "#202227",
  fontWeight: "500",
  marginBottom: "5px",
  marginTop: "0px",
};
const InputStyle = {
  backgroundColor: "#EDF2F6",
  borderRadius: "8px",
  fontFamily: "var(--main-font-family)",
  "& input": {
    border: "1px solid #E0E4EC",
    borderRadius: "8px",
    padding: "10px",
    fontFamily: "var(--main-font-family)",
  },
  "& .MuiInputBase-input::placeholder": {
    fontFamily: "var(--main-font-family)",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
  },
};
const switchTransition = {
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    borderRadius: 6,
    transition: "all 0.3s ease",
  },
};
