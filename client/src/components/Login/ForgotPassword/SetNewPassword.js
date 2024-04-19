import React, { useState } from "react";
import builder1 from "../../Signup/Assets/pngs/builderPro2.png";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Modal,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import YellowBtn from "../../UI/button";
import { useNavigate } from "react-router-dom";
import CheckMark from "../../../assets/checkmark.png";
import { useResetPasswordMutation } from "../../../redux/apis/usersApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const SetNewPassword = () => {
  const forgetPasswordEmail = useSelector(
    (state) => state.auth.forgetPasswordEmail
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPassword] = useResetPasswordMutation();
  const isMobile = useMediaQuery("(max-width:600px)");
  const lableResponsiveFont = { fontSize: isMobile ? "0.8rem" : "1rem" };
  const navigate = useNavigate();
  const borderRadiusResponsive = {
    borderRadius: isMobile ? "0.5rem" : "0.75rem",
  };
  const submitHandler = async () => {
    const res = await resetPassword({
      email: forgetPasswordEmail,
      password: password,
      confirmPassword: confirmPassword,
    });
    if (res?.error) {
      alert(res.error);
    } else {
      handleOpen();
      toast.success("Password changed successfully");
      navigate("/login");
    }

    // navigate("/verifycode");
  };
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div
      style={{
        backgroundColor: "#4c8ab1",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Box 1*/}
      <Box
        sx={{
          margin: "3rem",
          display: "flex",
          justifyContent: {
            xl: "start",
            lg: "start",
            md: "center",
            sm: "center",
          },
        }}
      >
        <img alt="builder logo" width={"288px"} style={{}} src={builder1}></img>
      </Box>
      {/* Box 2*/}
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Card
          sx={{
            minWidth: { xl: "700px", lg: "550px", md: "400px", sm: "300px" },
            padding: "10px",
            borderRadius: "24px",
          }}
        >
          <CardContent
            sx={{ display: "flex", flexDirection: "column", rowGap: "40px" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#4C8AB1",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              <div>
                <ArrowBackIosIcon sx={{ fontSize: 16 }} />
              </div>
              <Typography sx={{ fontSize: 14 }} color="#4C8AB1" gutterBottom>
                Back To Login
              </Typography>
            </Box>
            <Container
              sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
            >
              <Box>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    color: "#000000",
                    fontSize: "20px",
                    fontFamily: "GT Walsheim Trial",
                    fontWeight: 550,
                  }}
                >
                  Set a New Password
                </Typography>
                <Typography sx={{ mb: 1.5, mt: 1.5 }} color="text.secondary">
                  Create a new password. Ensure it differs from previous ones
                  for security
                </Typography>
              </Box>
              {/* Passwoord Setting 👇 */}
              <Box sx={{ marginTop: "0.5rem" }}>
                <label
                  style={{
                    ...labelStyle,
                    ...lableResponsiveFont,
                  }}
                  htmlFor="email"
                >
                  Password
                </label>
                <Box sx={{ position: "relative" }}>
                  <input
                    placeholder="Enter your new password"
                    required
                    type={passwordVisible ? "text" : "password"}
                    style={{
                      ...inputStyle,
                      ...borderRadiusResponsive,
                      ...placeholderStyle,
                      ...lableResponsiveFont,
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Box
                    style={passwordEyeBox}
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <VisibilityOff /> : <Visibility />}
                    {!isMobile && (
                      <span style={{ marginLeft: "5px" }}>
                        {passwordVisible ? "Hide" : "Show"}
                      </span>
                    )}
                  </Box>
                </Box>
              </Box>

              {/* Confirm Password */}
              <Box sx={{ marginTop: "0.5rem" }}>
                <label
                  style={{
                    ...labelStyle,
                    ...lableResponsiveFont,
                  }}
                  htmlFor="email"
                >
                  Confirm Password
                </label>
                <Box sx={{ position: "relative" }}>
                  <input
                    required
                    type={passwordVisible ? "text" : "password"}
                    style={{
                      ...inputStyle,
                      ...borderRadiusResponsive,
                      ...placeholderStyle,
                      ...lableResponsiveFont,
                    }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-Enter your new password"
                  />
                  <Box
                    style={passwordEyeBox}
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <VisibilityOff /> : <Visibility />}
                    {!isMobile && (
                      <span style={{ marginLeft: "5px" }}>
                        {passwordVisible ? "Hide" : "Show"}
                      </span>
                    )}
                  </Box>
                </Box>
              </Box>
              {/* Confirm Password 👆 */}
              <CardActions>
                <Button
                  sx={{
                    ...YellowBtn,
                  }}
                  onClick={submitHandler}
                >
                  {"Password updated"}
                </Button>
              </CardActions>
            </Container>
          </CardContent>
        </Card>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box>
                <img alt="check mark" src={CheckMark} />
              </Box>
              <Typography
                id="modal-modal-title"
                component="h2"
                sx={{ color: "#474747", fontSize: "28px", fontWeight: 700 }}
              >
                Successful
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{
                  mt: 2,
                  color: "#A9A9A9",
                  fontFamily: "GT Walsheim Trial",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "24px",
                  textAlign: "center",
                }}
              >
                Congratulations! Your password has been changed. <br />
                Click Continue to Login.
              </Typography>
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  );
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "24px",
  boxShadow: 24,
  p: 4,
};
const labelStyle = {
  display: "block",
  marginBottom: "1rem",
  color: "#202227",
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  fontSize: { lg: "1rem", md: "1rem", sm: "0.9rem", xs: "0.75rem" },
  fontWeight: 400,
};
const placeholderStyle = {
  color: "#B8B8B8",
  padding: "8px",
  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
  fontSize: "1rem",
  fontWeight: 400,
};
const inputStyle = {
  height: "2.5rem",
  alignSelf: "stretch",
  width: "90%",
  fontSize: "14px",
  border: "1px solid #ccc",
  borderRadius: "0.75rem",
  marginBottom: { lg: "1rem", md: "1rem", sm: "1rem", xs: "1rem" },
};
const passwordEyeBox = {
  position: "absolute",
  top: "50%",
  right: "70px",
  transform: "translateY(-50%)",
  cursor: "pointer",
  opacity: "50%",
  display: "flex",
  alignItems: "center",
};
export default SetNewPassword;
