import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import builder1 from "../Signup/Assets/pngs/builderProYellowLogo.png";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Toolbar sx={{ padding: "10px" }}>
          <Box sx={{ flexGrow: 1 }}>
            <img alt="logo" src={builder1} width={"130px"} />
          </Box>
          <Box sx={{ display: "flex", columnGap: "10px" }}>
            <Button
              color="inherit"
              sx={{
                ...style.buttonStyle,
                backgroundColor: "#E9ECFF",
                color: "#4C8AB1",
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
            <Button
              color="inherit"
              sx={{
                ...style.buttonStyle,
                backgroundColor: "#4C8AB1",
                color: "#ffff",
                "&:hover": {
                  backgroundColor: "#479cd1",
                },
              }}
              onClick={() => {
                navigate("/signup");
              }}
            >
              Signup
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
const style = {
  buttonStyle: {
    backgroundColor: "#E9ECFF",
    color: "#4C8AB1",
    fontSize: "16px",
    fontWeight: 600,
    fontFamily: "Poppins",
    padding: "16px 50px 16px 50px",
    borderRadius: "20px",
  },
};
export default Header;
