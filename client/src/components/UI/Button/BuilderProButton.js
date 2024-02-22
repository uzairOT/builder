import React from "react";
import Button from "@mui/material/Button";

const BuilderProButton = ({ backgroundColor, variant, Icon, iconProps, children, handleOnClick, marginLeft, padding, fontSize, fontFamily }) => {
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
            fontFamily: fontFamily
        },
    };

    return (
        <Button
            sx={themeStyle.button}
            disableElevation
            variant={variant}
            startIcon={Icon ? <Icon sx={iconProps} /> : null}
            onClick={handleOnClick}
        >
            {children}
        </Button>
    );
};

export default BuilderProButton;