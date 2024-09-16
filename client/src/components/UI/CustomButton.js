import React from 'react';
import {Button, CircularProgress } from "@mui/material";
import GTWalsheimTrial from "../../assets/fonts/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf"

function CustomButton({onClick, buttonText,color,backgroundColor,width,height,borderRadius ,fontSize,border, disabled, isLoading }) {

    const YellowBtn = {
        backgroundColor: backgroundColor,
        color: color,
        borderRadius: borderRadius,
        width:width,
        height:height,
        fontFamily:GTWalsheimTrial,
        fontSize:fontSize,
        textTransform: "none",
        border: border
      };

  return (
    <Button  onClick={onClick} disabled={disabled} style={YellowBtn}>{isLoading ? <CircularProgress size={'20px'} sx={{color:'white'}} /> : buttonText}</Button>
  );
}

export default CustomButton;
