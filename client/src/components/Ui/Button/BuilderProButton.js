import React from "react";
import Button from "@mui/material/Button";

const BuilderProButton = ({ backgroundColor, variant, Icon, children }) => {
    const themeStyle = {
        button: {
            backgroundColor: variant === "outlined" ? "" : backgroundColor,
            borderRadius: "34px",
            textTransform: "none",
            "&:hover": {
                backgroundColor: variant === "outlined" ? "" : backgroundColor,
            },
            marginLeft: "15px",
            borderWidth: "1px",
        },
    };

    return (
        <Button
            sx={themeStyle.button}
            disableElevation
            variant={variant}
            startIcon={Icon ? <Icon /> : null}
        >
            {children}
        </Button>
    );
};

export default BuilderProButton;