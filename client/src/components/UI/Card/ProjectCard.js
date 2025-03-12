import React from "react";
import { Box, Card, CardMedia, IconButton, Stack, Typography } from "@mui/material";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import logo from "../../Signup/Assets/pngs/builderProYellowLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { formatMoney } from "../../../utils/Formatters/moneyFormat";
import { styled } from '@mui/material/styles';
import PushPinIcon from "@mui/icons-material/PushPin";
import { usePinProjectMutation } from "../../../redux/apis/usersApiSlice";
import { toast } from "react-toastify";
import { setFetchPinnedProjectToggle } from "../../../redux/slices/Project/userProjectsSlice";
const ProjectCard = ({ projectProfileCard, selected, handleClick, pinnedProject=false, path }) => {
  const { t } = useTranslation();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userId = userInfo?.user?.id;
  const dispatch = useDispatch()
  const [markProjectAsPinned] = usePinProjectMutation();
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
  const themeStyle = {
    cardBody: {
      marginBottom: "2px",
      fontSize: { xl: "12px", lg: "11px", md: "12px", xs: "12px" },
      fontFamily: 'var(--main-font-family)',
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
  const handlePinProject = async () => {
    if(pinnedProject) return
    try{

      const payload = {
        userId,
        projectId: projectProfileCard.id
      }
      const response = await markProjectAsPinned(payload);
      console.log(response)
      toast.success(response.data?.message || "Successfully pinned")
      dispatch(setFetchPinnedProjectToggle())
      console.log(response);
    } catch(error){
      console.error(error);
      toast.error("Something went wrong!")
    }

  }


  return (
    <Card
      sx={{
        // border: `1px solid ${handleCardBorderColor()}`,
        backgroundColor: `${projectProfileCard.projectColor}`,
        ...themeStyle.card,
        // boxShadow: "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px"
        // height:'100%'
        opacity: 0.9
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          padding:{xl:'10px 0px 10px 10px', lg:'2px 0px 2px 2px'}
        }}
        onClick={() => handleClick(projectProfileCard.id, path)}
      >
        <CardMedia
          component="img"
          image={projectProfileCard.image ? projectProfileCard.image : logo}
          sx={{ ...themeStyle.image }}
        />
      </Box>
        <Stack backgroundColor={'#f6f6f6'} ml={0.5} direction={'row'} p={{xl:"2px", lg:'1px'}} justifyContent={'space-between'} alignItems={'start'} width={'100%'}  height={'100%'}>
      {/* Content */}
      <Box sx={{ pl: 0.5}} height={'100%'} onClick={() => handleClick(projectProfileCard.id, path)}>
        <Typography
          variant="h6"
          sx={{
            color: 
             "#202227",
              
            ...themeStyle.cardBody,
            maxWidth:{xl:'11ch', lg:'9ch', md:'15ch',},
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: { xl: "14px", lg: "12px", md: "14px", xs: "14px" },
            fontWeight:'550',
            textTransform:'uppercase'
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
              {t('userProject.title6')} {projectProfileCard.clientName ? projectProfileCard.clientName : "-"}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                ...themeStyle.cardBody,
                color: "#848484",
              }}
            >
              {t('userProject.title7')} {`$${formatMoney(projectProfileCard.totalJobRunning)}`}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                ...themeStyle.cardBody,
                color:  "#848484",
              }}
            >
              {t('userProject.title8')} {projectProfileCard.location ? projectProfileCard.location : '-'}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                ...themeStyle.cardBody,
                color:  "#848484",
              }}
            >
              {t('userProject.title9')} {projectProfileCard?.User?.companyName ? projectProfileCard?.User?.companyName : '-'}
            </Typography>
          </>
        ) : (
          <>
          <Box height={'35px'} onClick={() => handleClick(projectProfileCard.id, path)}>

          </Box>
          </>
          )}
      </Box>
      <Stack gap={1} alignItems={'center'}>
      <LightTooltip title="Pin project" placement="top">
            <IconButton onClick={handlePinProject} sx={{":hover":{ backgroundColor: "#4C8AB180"}}}>
              <PushPinIcon
                sx={{ color: pinnedProject ? "#FFAC00" : "#DBDBDB", fontSize:"18px" }}
              />
            </IconButton>
          </LightTooltip>
        {!combined && <>
        <LightTooltip title='Missing fields'  placement="top">
        <WarningRoundedIcon sx={{color:'#EC3710', fontSize:"18px"}} />
        </LightTooltip>
        </>}

      </Stack>
      </Stack>
    </Card>
  );
};

export default ProjectCard;
