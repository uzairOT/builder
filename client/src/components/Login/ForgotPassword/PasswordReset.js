import React from "react";
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

const PAsswordReset = () => {
  const navigate = useNavigate();
  const submitHandler = () => {
    navigate("/setnewpassword");
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
                  Password Reset
                </Typography>
                <Typography sx={{ mb: 1.5, mt: 1.5 }} color="text.secondary">
                  Your password has been successfully reset. click confirm to
                  set a new
                  <br /> password.
                </Typography>
              </Box>

              <CardActions>
                <Button
                  sx={{
                    ...YellowBtn,
                  }}
                  onClick={submitHandler}
                >
                  {"Continue"}
                </Button>
              </CardActions>
            </Container>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PAsswordReset;
