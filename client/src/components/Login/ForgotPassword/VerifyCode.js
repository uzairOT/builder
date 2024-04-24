import React, { useRef, useState } from "react";
import builder1 from "../../Signup/Assets/pngs/builderPro2.png";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import YellowBtn from "../../UI/button";
import { useNavigate } from "react-router-dom";
import {
  useResendOTPMutation,
  useVerifyOTPMutation,
} from "../../../redux/apis/usersApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const VerifyCode = () => {
  const navigate = useNavigate();
  const [verifycode] = useVerifyOTPMutation();
  const [resendOTP] = useResendOTPMutation();
  const forgetPasswordEmail = useSelector(
    (state) => state.auth.forgetPasswordEmail
  );
  const [code, setCode] = useState(["", "", "", "", ""]);
  const inputRefs = useRef([]);
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("forgetPasswordEmail", forgetPasswordEmail);
    const otpString = code.join("");
    // Check if all verification code fields are filled
    if (code.some((value) => value === "")) {
      // If any field is empty, show toast and prevent submission
      toast.error("Please fill in the verification code.");
      return;
    }
    try {
      const res = await verifycode({
        otp: otpString,
        email: forgetPasswordEmail,
      }).unwrap();
      toast.success("OTP matched successfully");
      navigate("/setnewpassword");
    } catch (err) {
      toast.error(err?.data?.error || err.data.message);
    }
  };
  const handleInputChange = (index, value) => {
    if (value.length > 1) {
      // Ensure only single character per input
      value = value.charAt(value.length - 1);
    }
    const newCode = [...code];
    newCode[index] = value.toUpperCase(); // Convert to uppercase if needed
    setCode(newCode);

    // Move to the next input box if available
    if (value && index < code.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && index > 0 && !code[index]) {
      // Move to the previous input box on backspace if the current box is empty
      inputRefs.current[index - 1].focus();
    }
  };
  const resendHandler = async () => {
    try {
      const res = await resendOTP({ email: forgetPasswordEmail }).unwrap();
      toast.success("OTP resend successfully");
    } catch (err) {
      toast.error(err?.data?.error || err.error);
    }
  };
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
                  Verify code
                </Typography>
                <Typography sx={{ mb: 1.5, mt: 1.5 }} color="text.secondary">
                  We sent a reset link to contact@dscode...com enter 5 digit
                  code that
                  <br /> mentioned in the email.
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#202227",
                    fontWeight: 500,
                    fontSize: "16px",
                    fontFamily: "GT Walsheim Trial",
                  }}
                >
                  Enter Code
                </Typography>
                <Box sx={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  {code.map((value, index) => (
                    <TextField
                      key={index}
                      inputRef={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputProps={{
                        maxLength: 1,
                        style: {
                          width: "80px",
                          height: "80px",
                          fontSize: "20px",
                          textAlign: "center",
                          border: "2px solid #E1E1E1",
                          borderRadius: "12px",
                        },
                      }}
                      value={value}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  ))}
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#202227",
                    fontWeight: 500,
                    fontSize: "16px",
                    fontFamily: "GT Walsheim Trial",
                    marginTop: "15px",
                  }}
                >
                  Didn’t receive a code?{" "}
                  <span
                    style={{ color: "#4C8AB1", cursor: "pointer" }}
                    onClick={resendHandler}
                  >
                    Resend
                  </span>
                </Typography>
              </Box>

              <CardActions>
                <Button
                  sx={{
                    ...YellowBtn,
                  }}
                  onClick={submitHandler}
                  type="submit"
                >
                  {"Verify"}
                </Button>
              </CardActions>
            </Container>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifyCode;
