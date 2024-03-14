import React from "react";
import Button from "@mui/material/Button";

const BuilderProButton = ({ backgroundColor, variant, Icon,iconProps, children, handleOnClick, marginLeft, padding, fontSize, fontFamily,fontWeight, disabled }) => {
  const themeStyle = {
    button: {
      backgroundColor: variant === "outlined" ? "" : backgroundColor,
      borderRadius: "34px",
      textTransform: "none",
      "&:hover": {
        backgroundColor: variant === "outlined" ? "" : backgroundColor,
      },
      marginLeft: marginLeft ? marginLeft : "15px",
      borderWidth: "1px",
      padding: padding,
      fontSize: fontSize,
      fontFamily: fontFamily,
      fontWeight: fontWeight,
    },
  };

  return (
    <Button
      sx={themeStyle.button}
      disableElevation
      variant={variant}
      startIcon={Icon ? <Icon sx={iconProps} /> : null}
      onClick={handleOnClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default BuilderProButton;
