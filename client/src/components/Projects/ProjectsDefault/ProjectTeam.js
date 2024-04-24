import { Stack, Typography, Popover, IconButton, Divider,Input, FormControl, Select, InputLabel, MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import data1 from './assests/data/data.json'
import BuilderProButton from '../../UI/Button/BuilderProButton';
import CloseIcon from "@mui/icons-material/Close";
import { ReactComponent as BuilderProNavbarShare } from "./assests/svgs/builder-pro-navbar-share.svg";
import users from './assests/data/users.json'
import LinkIcon from "@mui/icons-material/Link";
import { useGetProjectTeamQuery } from '../../../redux/apis/Project/projectApiSlice';
import {useLocation} from 'react-router-dom'



    const ProjectTeam = () => {
        const [open, setOpen] = useState(null);
        const [userType, setUserType] = useState("");
        const openShare = Boolean(open);
        const [email, setEmail] = useState('');
        const location = useLocation();
        const pathSegments = location.pathname.split('/')
        const projectId = pathSegments[2];
        //console.log(pathSegments)
        const {data, isLoading} = useGetProjectTeamQuery(projectId)
        const team = data?.team
        console.log(team)
        const id = openShare ? "simple-popover" : undefined;
        const groupedData = isLoading ?  <>Loading...</> :  team?.reduce((acc, person) => {
          acc[person.role] = acc[person.role] || [];
          acc[person.role].push(person);
          return acc;
        }, {});
        
        //console.log("team: ", team, "groupedData :", groupedData)
        const handleShare = (e) => {
            setOpen(e.currentTarget);
          };
          const handleClose = () => {
            setOpen(null);
          };
          const handleUserTypeChange = (event) => {
            setUserType(event.target.value);
          };
         const  handleEmailChange = (e) =>{
            setEmail(e.target.value)
          }
  return (
    <Stack pl={{xl:5,lg:5,md:0}} >
        <Typography sx={themeStyle.title}>Project Team</Typography>
        <Stack direction={'row'} justifyContent={{xl:'space-between',lg:'space-between',md:'center'}}>
            <Stack  width={'100%'} >
            {isLoading ? <>Loading...</>  : Object?.keys(groupedData)?.map((role)=>{
                let acc =0;
                return(
                <Stack direction={'row'} justifyContent={{xl:'space-between', lg:'space-between', md:'flex-start', sm:'flex-start', xs:'flex-start'}} >
                <Stack direction={'row'}  width={{xl:'100%', lg:'100%', md:'50%', sm:'50%', xs:'70%'}} justifyContent={'space-between'}>
                <Typography sx={themeStyle.subTitle}>{role}</Typography>
                <Stack direction={'row'} width={'190px'}>

                {groupedData[role].map((person, index)=>{
                    if (index > 1){
                        acc++;
                        return(
                            <Typography sx={{...themeStyle.subTitle}} style={{color: '#636363'}} position={'relative'} top={'-2px'} pl={0.5}>+{acc}</Typography>
                      )
                    }else{
                        return(
                      <Typography sx={themeStyle.subTitle}>{person.firstName} {person.lastName}{groupedData[role].length > 1 && index === 0 ? ',' :''}</Typography>
                    )}
                })}
                </Stack>
                </Stack>
                <Stack direction={'row'} width={'100px'}>
                {groupedData[role].map((person, index)=>{
                    return( <>
                        <img key={index} src={person.image} alt='profile' width={'35px'} height={'35px'} style={{borderRadius:'50px', marginLeft: '-10px'}} ></img>
                        </>
                        )
                    })}
                </Stack>
                </Stack>
                )})
            }
            </Stack>
            <Stack mt={'-16px'}>
            <BuilderProButton
              backgroundColor={"#FFAC00"}
              variant={"contained"}
              Icon={BuilderProNavbarShare}
              handleOnClick={handleShare}
              >
              {true ? "Share" : ""}
            </BuilderProButton>
                </Stack>
        </Stack>
        <Popover
        id={id}
        open={openShare}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              marginTop: "30px",
              borderRadius: "15px",
            },
          },
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography sx={{ p: 2 }} color={"#4C8AB1"}>
            Invite
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ p: 2, color: "#535353", fontSize: "19px" }} />
          </IconButton>
        </Stack>
        <Divider variant="fullWidth" />
        <Stack direction={"row"} pl={4} pr={4} pt={2} pb={2} spacing={3}>
          <Stack
            direction={"row"}
            border={"2px solid #FFAC00"}
            borderRadius={"30px"}
            pl={2}
          >
            <Input
            value={email}
            onChange={(e)=>{handleEmailChange(e)}}
              placeholder="Enter an Email to invite"
              aria-describedby="my-helper-text"
              sx={{
                "&::after": {
                  borderBottom: "none",
                },
                "&:before": {
                  borderBottom: "none",
                },
                "&.MuiInput-root:hover:not(.Mui-disabled, Mui-error):before": {
                  borderBottom: "none",
                },
              }}
            />
            <FormControl
              style={{ marginLeft: "5px", width: "120px" }}
              size="small"
            >
              <InputLabel
                id="demo-simple-select-label"
                style={{
                  fontSize: "12px",
                  top: "3px",
                  fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
                  color: "#202227",
                }}
                sx={{
                  "&.Mui-focused": {
                    transform: "translate(14px, -1px) scale(0.75)",
                  },
                }}
              >
                Select Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userType}
                label="Age"
                onChange={handleUserTypeChange}
                placeholder="Select Role"
                sx={{
                  "& .notchedOutline": {
                    border: "none",
                  },
                }}
              >
                <MenuItem value={"admin"}>Admin</MenuItem>
                <MenuItem value={"client"}>Client</MenuItem>
                <MenuItem value={"projectManager"}>Project Manager</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <BuilderProButton backgroundColor={"#FFAC00"} variant={"contained"}>
            <Typography>Invite</Typography>
          </BuilderProButton>
        </Stack>

        {team?.map((user, index) => (
          <Stack key={index} p={0.5} pl={2.5} pr={2.5}>
            <Stack
              id={user.userId}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              pb={1}
            >
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                pl={2}
              >
                <img
                  src={user.image}
                  alt="User Profile Pic"
                  width={"32px"}
                  height={"32px"}
                  style={{ borderRadius: "50px" }}
                ></img>
                <Typography
                  color={"#202227"}
                  fontSize={"14px"}
                  pl={2}
                  fontFamily={"GT-Walsheim-Regular-Trial, sans-serif"}
                >
                  {user.firstName}
                </Typography>
              </Stack>
              <Typography
                fontFamily={"GT-Walsheim-Regular-Trial, sans-serif"}
                fontSize={"14px"}
              >
                {user.role}
              </Typography>
            </Stack>
            {team?.length - 1 === index ? <></> : <Divider />}
          </Stack>
        ))}
        <Divider />
        <Stack direction={"row"} p={2} pl={3}>
          {/* <BuilderProButton
            Icon={LinkIcon}
            iconProps={{ transform: "rotate(135deg)" }}
            variant={"text"}
          >
            Copy Link
          </BuilderProButton> */}
        </Stack>
      </Popover>
    </Stack>
  )
}

export default ProjectTeam;

const themeStyle ={
    title: {
        fontSize: '16px',
        color: '#4C8AB1',
        fontFamily:'GT-Walsheim-Regular-Trial, sans-serif',
        
    },
    subTitle: {
        fontSize: '13px',
        color: '#202227',
        fontFamily:'GT-Walsheim-Regular-Trial, sans-serif',
        textAlign: 'left'
    }
}