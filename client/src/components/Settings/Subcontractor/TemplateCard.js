import React from "react";
import {
  Card,
  CardHeader,
  Divider,
  Typography,
  CardContent,
  Button,
} from "@mui/material";
import '../../../App.css'
function TemplateCard() {
  return (
    <Card
      sx={{
        maxWidth: 700,
        borderRadius: "14px",
        border: "1px solid #E3E3E3",
        boxShadow: "none",
      }}
    >
      <CardHeader title="Card Heading" sx={headingStyle} />
      <Divider />
      <CardContent>
        <Typography variant="body1" gutterBottom sx={contentStyle}>
          Lorem ipsum dolor sit amet consectetur. Ultrices potenti habitant id
          dui convallis in tincidunt fringilla. At urna ullamcorper elit eget
          eleifend. Rhoncus facilisi et at purus nec ornare mi nulla cursus.
          Venenatis cursus non mauris sit rutrum donec. Lorem ipsum dolor sit
          amet consectetur. Ultrices potenti habitant id dui convallis in
          tincidunt fringilla. At urna ullamcorper elit eget eleifend. Rhoncus
          facilisi et at purus nec ornare mi nulla cursus. Venenatis cursus non
          mauris sit rutrum donec.
          <br /> Lorem ipsum dolor sit amet consectetur. Ultrices potenti
          habitant id dui convallis in tincidunt fringilla. At urna ullamcorper
          elit eget eleifend. Rhoncus facilisi et at purus nec ornare mi nulla
          cursus. Venenatis cursus non mauris sit rutrum donec.
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={subheadingStyle}>
          Name
        </Typography>
        <Typography variant="body1" gutterBottom sx={contentStyle}>
          Name Regional Branch Manager, Dunder Mifflin Scranton
        </Typography>
      </CardContent>
      <Divider />

      <CardContent
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
         
        }}
      >
        <Typography
          variant="body1"
          sx={{ color: "#4C8AB1", marginTop: "auto",}}
        >
          Send
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TemplateCard;

const headingStyle = {
  textAlign: "left",
  fontWeight: 600,
  color: "#000000",
  fontSize: "18px",
  fontFamily: "Inter",
};

const subheadingStyle = {
  fontWeight: 600,
  color: "#000000",
  fontSize: "14px",
  fontFamily: "Inter",
};

const contentStyle = {
  ...subheadingStyle,
  fontWeight: 400,
};
