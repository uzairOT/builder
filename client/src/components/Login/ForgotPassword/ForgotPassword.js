import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import builder1 from "../../Signup/Assets/pngs/builderPro2.png";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import YellowBtn from "../../UI/button";
import { useNavigate } from "react-router-dom";
import { useForgetPasswordMutation } from "../../../redux/apis/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setForgetPasswordEmail } from "../../../redux/slices/authSlice";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [forgetPassword] = useForgetPasswordMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const forgetPasswordEmail = useSelector(
    (state) => state.auth.forgetPasswordEmail
  );

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Please Enter Email"),
    }),
    onSubmit: async (values) => {
      try {
        dispatch(setForgetPasswordEmail(values.email));
        const res = await forgetPassword({
          email: values.email,
        }).unwrap();
        toast.success(res.message || res.data.message || "Success");
        navigate("/verifycode");
      } catch (err) {
        console.log(err);
        toast.error(
          err?.data?.error || err.error || err.data.message || "Something went wrong!"
        );
      }
    },
  });

  return (
    <div
      style={{
        backgroundColor: "#4c8ab1",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Box 1 */}
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
      {/* Box 2 */}
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
                Back to log in
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
                    fontFamily: 'var(--main-font-family)',
                    fontWeight: 550,
                  }}
                >
                  Forgot Password?
                </Typography>
                <Typography sx={{ mb: 1.5, mt: 1.5 }} color="text.secondary">
                  Don’t worry, happens to all of us. Enter your email below to
                  recover <br /> your password.
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#202227",
                    fontWeight: 500,
                    fontSize: "16px",
                    fontFamily: 'var(--main-font-family)',
                  }}
                >
                  Email
                </Typography>
                <input
                  style={{
                    padding: "15px",
                    borderRadius: "12px",
                    border: "2px solid #20222759",
                    width: "calc(100% - 32px)",
                    marginTop: "10px",
                  }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  name="email"
                  placeholder="john.doe@gmail.com"
                />
                {formik.touched.email && formik.errors.email ? (
                  <Typography
                    variant="body2"
                    color="error"
                    sx={{ mt: 1 }}
                  >
                    {formik.errors.email}
                  </Typography>
                ) : null}
              </Box>

              <CardActions sx={{display:'flex', justifyContent:'center'}}>
                <Button
                  sx={{
                    ...YellowBtn,
                  }}
                  onClick={formik.handleSubmit}
                >
                  {"Submit"}
                </Button>
              </CardActions>
            </Container>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
