import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import {
  couponSchema,
  settingsSchema,
} from "../../../utils/Validation/settingsPageSchema";
import Button from "../../UI/CustomButton";
import {
  useGetCreateUserCouponsMutation,
  useUpdateUserCouponsMutation,
} from "../../../redux/apis/Coupon/CouponApiSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CouponModal = ({
  open,
  title,
  onClose,
  updateOpen,
  updateClose,
  userId,
  couponId,
  addCoupon,
  updateCoupon
}) => {
  

  const handleClose = () => {
    if (updateOpen) {
      updateClose();
    } else {
      onClose();
    }
  };

  const onSubmit = async (values, action) => {
    if (open) {
      try {
        await addCoupon({
          couponCode: values.couponCode,
          couponValue: values.couponValue,
          userId: userId,
        });
        toast.success("Coupon added successfully");
      } catch (e) {
        console.log(e);
        toast.error("Something went wrong");
      }
    } else {
      try {
        await updateCoupon({
          couponCode: values.couponCode,
          couponValue: values.couponValue,
          userId: userId,
          couponId,
        });
        toast.success("Coupon updated successfully");
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong");
      }
    }
  };

  const {
    handleBlur,
    handleChange,
    values,
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    handleReset,
  } = useFormik({
    initialValues: {
      couponCode: "",
      couponValue: "",
    },
    validationSchema: couponSchema,
    onSubmit,
  });
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Dialog
          open={open || updateOpen}
          onClose={handleClose}
          maxWidth="md"
          sx={{}}
        >
          <DialogTitle sx={headingStyle}>
            {open ? "Add" : "Update"} {title}
          </DialogTitle>
          <DialogContent
            sx={{ display: "flex", justifyContent: "center", margin: "30px" }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Coupon Code</Typography>
                <TextField
                  error={errors.couponCode ? true : false}
                  value={values.couponCode}
                  placeholder="15OFF"
                  fullWidth
                  name={"couponCode"}
                  inputProps={{
                    style: {
                      ...InputStyle,
                      border:
                        errors.couponCode && touched.couponCode
                          ? "1px solid #d32f2f"
                          : "1px solid #E0E4EC",
                    },
                    maxLength: 50,
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.couponCode && touched.couponCode
                      ? errors.couponCode
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">Percentage Off</Typography>
                <TextField
                  type="number"
                  error={errors.couponValue ? true : false}
                  value={values.couponValue}
                  placeholder="15"
                  fullWidth
                  name={"couponValue"}
                  inputProps={{
                    style: {
                      ...InputStyle,
                      border:
                        errors.couponValue && touched.couponValue
                          ? "1px solid #d32f2f"
                          : "1px solid #E0E4EC",
                    },
                    maxLength: 50,
                    //   type: 'number'
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.couponValue && touched.couponValue
                      ? errors.couponValue
                      : ""
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 1, sm: 0 },
            }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              sx={{ textAlign: "center" }}
            >
              <Button
                buttonText={isSubmitting ? "Submitting" : "Update Code"}
                color="#ffffff"
                backgroundColor={isSubmitting ? "gray" : "#4C8AB1"}
                width="150px"
                height="44px"
                borderRadius="50px"
                type={"submit"}
                onClick={handleSubmit}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              sx={{ textAlign: "center" }}
            >
              <Button
                buttonText="Reset"
                color="#4C8AB1"
                border={"1px solid #4C8AB1"}
                width="150px"
                height="44px"
                borderRadius="50px"
                fontSize={"13px"}
                onClick={handleReset}
              />
            </Grid>
          </DialogActions>
        </Dialog>
      </form>
    </>
  );
};
const InputStyle = {
  backgroundColor: "#EDF2F6",
  borderRadius: "8px",
  fontFamily: "Manrope, sans-serif",
  border: "1px solid #E0E4EC",
  padding: "10px",
  width: { xl: "250px", lg: "100%", md: "100%", sm: "100%", xs: "100%" },
  "& .MuiOutlinedInputRoot": {
    "& fieldset": {
      border: "none",
    },
  },
};

const headingStyle = {
  marginTop: "20px",
  // marginBottom: "10px",
  marginLeft: "25px",
  fontFamily: "Poppins",
  fontWeight: "500",
  fontSize: "22px",
  color: "#4C8AB1",
};

export default CouponModal;
