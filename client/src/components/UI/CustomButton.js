import React from 'react';
import {Button } from "@mui/material";
import GTWalsheimTrial from "../../assets/fonts/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf"

function CustomButton({onClick, buttonText,color,backgroundColor,width,height,borderRadius ,fontSize,border }) {

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
    <Button onClick={onClick} style={YellowBtn}>{buttonText}</Button>
  );
}

export default CustomButton;