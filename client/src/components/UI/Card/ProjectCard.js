import React from "react";
import { Box, Card, CardMedia, Stack, Typography } from "@mui/material";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import logo from "../../Signup/Assets/pngs/builderProYellowLogo.png";
import { formatMoney } from "../../../utils/Formatters/moneyFormat";
import { styled } from '@mui/material/styles';
const ProjectCard = ({ projectProfileCard, selected }) => {
  const displayAlert = Boolean(projectProfileCard.end_time);
  const alert1 = Boolean(projectProfileCard.start_time)
  const alert2 = Boolean( projectProfileCard.location)
  const combined = Boolean(projectProfileCard.end_time && projectProfileCard.start_time && projectProfileCard.location)
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));
  const handleCardBorderColor = () => {
    // console.log(displayAlert, ' ', alert1, ' ', alert2, " ", combined);
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
      // padding: "10px",
      borderRadius: "7px",
      ml: 1,
      mr: 1,
    },
    image: {
      width: "38px",
      height: "38px",
      borderRadius: "9px",
      objectFit: 'scale-down'
    },
  };

  return (
    <Card
      sx={{
        // border: `1px solid ${handleCardBorderColor()}`,
        backgroundColor: `${projectProfileCard.projectColor}`,
        ...themeStyle.card,
        // boxShadow: "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px"
        // height:'100%'
      }}
    >
      {/* Icon */}
      <div
        style={{
          padding:'10px 0px 10px 10px'
        }}
      >
        <CardMedia
          component="img"
          image={projectProfileCard.image ? projectProfileCard.image : logo}
          sx={{ ...themeStyle.image }}
        />
      </div>
        <Stack backgroundColor={'#F2F2F2'} ml={0.5} direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}  height={'100%'}>
      {/* Content */}
      <Box sx={{ pl: 0.5}} height={'100%'}>
        <Typography
          variant="h6"
          sx={{
            color: 
             "#202227",
              
            ...themeStyle.cardBody,
            maxWidth:'30ch',
            marginBottom: "12px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize:'14px',
            fontWeight:'600',
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
                color:"#848484",
              }}
            >
              Client name: {projectProfileCard.clientName}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                ...themeStyle.cardBody,
                color: "#848484",
              }}
            >
              Job Running Total: {`$${formatMoney(projectProfileCard.totalJobRunning)}`}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                ...themeStyle.cardBody,
                color:  "#848484",
              }}
            >
              Location: {projectProfileCard.location}
            </Typography>
          </>
        ) : (
          <>
          <Box height={'35px'}>

          </Box>
          </>
          )}
      </Box>
      <Stack>
        {!combined && <>
        <LightTooltip title='Missing fields'  placement="top">
        <WarningRoundedIcon sx={{color:'#EC3710'}} />
        </LightTooltip>
        </>}

      </Stack>
      </Stack>
    </Card>
  );
};

export default ProjectCard;
