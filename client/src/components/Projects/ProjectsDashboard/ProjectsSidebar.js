import { Box, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BuilderProButton from "../../UI/Button/BuilderProButton";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ProjectCard from "../../UI/Card/ProjectCard";
import projects from "./assets/data/projects.json";
import { useGetProjectUserRoleMutation, useGetUserProjectsQuery } from "../../../redux/apis/Project/userProjectApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { addProjects } from "../../../redux/slices/Project/userProjectsSlice";
import { addInitialPhase } from "../../../redux/slices/Project/projectInitialProposal";
import { authUserRole } from "../../../redux/slices/auth/userRoleSlice";

const ProjectsSidebar = () => {
  const [activeBtn, setActiveBtn] = useState("remodel");
  const dispatch = useDispatch();
  const [getUserRole] = useGetProjectUserRoleMutation();
  const local = localStorage.getItem("userInfo");
  const userRole = useSelector(authUserRole);
  const currentUser = JSON.parse(local);
  const currentUserId = currentUser.user.id;
  const location = useLocation();
  const path = !location.pathname.split("/")[3] || location.pathname.split("/")[3] ==='client'
    ? ""
    :  location.pathname.split("/")[3];
  const handleListedProjectsButton = (btn) => {
    setActiveBtn(btn);
  };
  const navigate = useNavigate();


  const handleClick = async (projectId, path, e) => {
    console.log(path)
    dispatch(addInitialPhase([]));
    // const res = await getUserRole({projectId, userId: currentUserId});
    // // console.log(res)
    // dispatch(authUserRole(res.data.role));
    if(userRole.userRole === 'client'){
      navigate(`/projects/${projectId}/client`);
    } else{
      
      navigate(`/projects/${projectId}/${path}`);
    }
    
  };
  const { id } = useParams();
  //console.log(id);
  const { data, isLoading, error } = useGetUserProjectsQuery({
    userId: currentUserId,
  });
  useEffect(() => {
    //console.log(data)
    if (data) {
      dispatch(addProjects(data));
    }
  }, [data, dispatch]);
  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <>
      <Stack p={2}>
        {/* PROJECT DASHBOARD */}
        <Typography sx={themeStyle.subtile} pb={1.5}>
          User Projects
        </Typography>
        <Divider
          variant="fullWidth"
          sx={{ marginLeft: "2px", marginRight: "2px" }}
        />

        {/* LIST OF PROJECTS */}
        <Typography sx={themeStyle.listTitle} pt={1.5} pb={4}>
          All listed Projects
        </Typography>

        {/* BUTTON STACK */}
        <Stack
          direction={"row"}
          ml={"-16px"}
          mr={"-16px"}
          justifyContent={"center"}
        >
          <BuilderProButton
            variant={"contained"}
            marginLeft={"4px"}
            padding={"8px 8px"}
            backgroundColor={activeBtn === "remodel" ? "#FFCA5B" : "#F2F2F2"}
            handleOnClick={() => {
              handleListedProjectsButton("remodel");
            }}
          >
            <Typography
              fontSize={"11px"}
              fontWeight={"500"}
              color={"black"}
              fontFamily={"Inter, sans-serif"}
              width={"100%"}
            >
              Remodel
            </Typography>
          </BuilderProButton>
          <BuilderProButton
            variant={"contained"}
            marginLeft={"4px"}
            padding={"8px 8px"}
            backgroundColor={activeBtn === "newbuild" ? "#FFCA5B" : "#F2F2F2"}
            handleOnClick={() => {
              handleListedProjectsButton("newbuild");
            }}
          >
            <Typography
              fontSize={"11px"}
              fontWeight={"500"}
              color={"black"}
              fontFamily={"Inter, sans-serif"}
              width={"100%"}
            >
              New build
            </Typography>
          </BuilderProButton>
          <BuilderProButton
            variant={"contained"}
            marginLeft={"4px"}
            padding={"8px 8px"}
            backgroundColor={activeBtn === "commercial" ? "#FFCA5B" : "#F2F2F2"}
            handleOnClick={() => {
              handleListedProjectsButton("commercial");
            }}
          >
            <Typography
              fontSize={"11px"}
              fontWeight={"500"}
              color={"black"}
              fontFamily={"Inter, sans-serif"}
            >
              Commercial
            </Typography>
          </BuilderProButton>
        </Stack>
        {/* xl: "50vh",
              lg: "45vh",
              md: "45vh",
              sm: "48vh",
              xs: "48vh", */}
        <Box
          sx={{
            ...themeStyle.scrollable,
            height: 'calc(92vh - 220px)'
          }}
        >
          <Stack spacing={1} pl={2} pr={2} pt={1}>
            <>
              {data?.projects?.map((projectProfileCard) => {
                const selected = projectProfileCard.id == id;
                if (projectProfileCard.buildType === activeBtn) {
                  return (
                    <Link
                      key={projectProfileCard.id}
                      onClick={(e)=>{
                        e.preventDefault();
                        handleClick(projectProfileCard.id,path, e);
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      <ProjectCard
                        projectProfileCard={projectProfileCard}
                        selected={selected}
                      />
                    </Link>
                  );
                } else {
                  return <></>;
                }
              })}
            </>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default ProjectsSidebar;

const themeStyle = {
  title: {
    fontSize: "22px",
    fontWeight: "500",
    fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
    color: "#000000",
  },
  subtile: {
    fontSize: "16px",
    fontWeight: "500",
    fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
    color: "#4C8AB1",
  },
  listTitle: {
    fontSize: "12px",
    fontWeight: "500",
    fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
    color: "#535353C9",
  },
  scrollable: {
    scrollbarWidth: "none", // For Firefox
    "-ms-overflow-style": "none", // For IE and Edge
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "transparent",
      transition: "background-color 0.3s",
    },
    "&:hover::-webkit-scrollbar-thumb": {
      backgroundColor: "#ddd",
    },
    overflowY: "scroll",
  },
};
