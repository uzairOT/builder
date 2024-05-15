import React, { useId } from 'react';
import { Dialog, Grid, Typography, FormControl, Select, MenuItem, FormHelperText, TextField } from '@mui/material';
import Button from "../../UI/CustomButton";
import { useState, useEffect } from 'react'; // This might be needed depending on the implementation of handleSubmit, handleReset, handleChange, handleBlur, etc.
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useFormik } from 'formik';
import { settingsSchema, unitSchema } from '../../../utils/Validation/settingsPageSchema';
import { useAddUnitMutation, useEditUnitMutation } from '../../../redux/apis/Project/userProjectApiSlice';
import { useSelector } from 'react-redux';


const AddUnitModal = ({open, onClose, unit, refetch}) => {
    console.log(unit)
    const userInfo = useSelector((state) => state.auth.userInfo);
    const [addUnit] = useAddUnitMutation();
    const onSubmit = async (values, action) => {
        console.log(unit)
        const post ={
            label: values.label,
            value: values.label,
            userId: userInfo.user.id
        }
        const res = await addUnit(post);
        await refetch({userId: userInfo.user.id})
        console.log(res)
      };
    const {
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
        handleSubmit,
        isSubmitting,
        handleReset,
        setFieldValue,
        setValues
      } = useFormik({
        initialValues: {
          label: '',
        },
        validationSchema: unitSchema,
        onSubmit,
      });

    return (
        <form onSubmit={handleSubmit}>
          <Dialog open={open} onClose={onClose} maxWidth="md" sx={{}}>
            <DialogTitle sx={headingStyle}>Add Unit</DialogTitle>
            <DialogContent sx={{ display: "flex", justifyContent: "center", margin: "30px" }}>
              <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Typography variant="body1">Unit</Typography>
                  <TextField
                    error={errors.label ? true : false}
                    placeholder="Unit"
                    name={"label"}
                    value={values.label}
                    onChange={handleChange}
                    fullWidth
                    inputProps={{
                      style: {
                        ...InputStyle,
                        border:
                          errors.label && touched.label ? "1px solid #d32f2f" : "1px solid #E0E4EC",
                      },
                    }}
                    onBlur={handleBlur}
                    helperText={errors.label && touched.label ? errors.label : ""}
                  />
                </Grid>
                <DialogActions
                  sx={{ display: "flex", flexDirection: 'column', alignItems:'center', justifyContent:'center'}}
                >
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ textAlign: "center", alignItems:'center', justifyContent:'center' }}>
                    <Button
                      type={"submit"}
                      buttonText="Add Unit"
                      color="#ffffff"
                      backgroundColor={isSubmitting ? "gray" : "#4C8AB1"}
                      width="150px"
                      height="44px"
                      borderRadius="50px"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    />
                  </Grid>

                </DialogActions>
              </Grid>
            </DialogContent>
          </Dialog>
        </form>
      );
}
const InputStyle = {
    backgroundColor: "#EDF2F6",
    borderRadius: "8px",
    fontFamily: "Manrope, sans-serif",
    border: "1px solid #E0E4EC",
    padding: "10px",
    width: {xl:'250px' ,lg:'100%',md: '100%', sm: '100%', xs:'100%'},
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

export default AddUnitModal
