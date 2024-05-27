import React from "react";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import logo from "../../Signup/Assets/pngs/builderProYellowLogo.png";
const ProjectCard = ({ projectProfileCard, selected }) => {
  const handleCardBorderColor = () => {
    switch (projectProfileCard.status) {
      case "Critical":
        return "#EA3B46";
      case "High":
        return "#FAAA3B";
      case "Medium":
        return "#82B811";
      default:
        return "#5272E9";
    }
  };
  const handleCardColor = () => {
    switch (projectProfileCard.status) {
      case "Critical":
        return selected ? "#CF4A52" : "#FFE0E2";
      case "High":
        return "#FFF3E1";
      case "Medium":
        return "#F3FFDB";
      default:
        return "#E9EFFF";
    }
  };
  const themeStyle = {
    cardBody: {
      marginBottom: "2px",
      fontSize: "12px",
      fontFamily: "inherit",
      fontStyle: selected ? "italic" : "normal",
    },
    card: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      padding: "10px",
      borderRadius: "14px",
      ml: 1,
      mr: 1,
    },
    image: {
      width: "38px",
      height: "38px",
      borderRadius: "9px",
    },
  };

  return (
    <Card
      sx={{
        // border: `1px solid ${handleCardBorderColor()}`,
        backgroundColor: `${projectProfileCard.projectColor}`,
        ...themeStyle.card,
        // boxShadow: "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px"
      }}
    >
      {/* Icon */}
      <div
        sx={{
          marginRight: "10px",
        }}
      >
        <CardMedia
          component="img"
          image={projectProfileCard.image ? projectProfileCard.image : logo}
          sx={{ ...themeStyle.image }}
        />
      </div>

      {/* Content */}
      <Box sx={{ pl: 1 }}>
        <Typography
          variant="h6"
          sx={{
            color: selected
              ? "white"
              : projectProfileCard.status === "Critical"
              ? "#FD3845"
              : `${handleCardBorderColor()}`,
            ...themeStyle.cardBody,
            maxWidth:'30ch',
            marginBottom: "8px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {projectProfileCard.projectName}
        </Typography>
        {selected === true || selected === undefined ? (
          <>
            <Typography
              variant="body1"
              sx={{
                ...themeStyle.cardBody,
                color: selected ? "white" : "#848484",
              }}
            >
              Client name: {projectProfileCard.clientName}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                ...themeStyle.cardBody,
                color: selected ? "white" : "#202227",
              }}
            >
              Job Running Total: {projectProfileCard.jobRunningTotal}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                ...themeStyle.cardBody,
                color: selected ? "white" : "#848484",
              }}
            >
              Location: {projectProfileCard.location}
            </Typography>
          </>
        ) : (
          <></>
        )}
      </Box>
    </Card>
  );
};

export default ProjectCard;
