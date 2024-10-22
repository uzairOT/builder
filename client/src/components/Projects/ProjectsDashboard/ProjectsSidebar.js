import { Box, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BuilderProButton from "../../UI/Button/BuilderProButton";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ProjectCard from "../../UI/Card/ProjectCard";
import projects from "./assets/data/projects.json";
import {
  useGetProjectUserRoleMutation,
  useGetUserProjectsQuery,
} from "../../../redux/apis/Project/userProjectApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addProjects,
  projectsPackage,
} from "../../../redux/slices/Project/userProjectsSlice";
import { addInitialPhase } from "../../../redux/slices/Project/projectInitialProposal";
import { authUserRole } from "../../../redux/slices/auth/userRoleSlice";

const ProjectsSidebar = ({ reports }) => {
  const [activeBtn, setActiveBtn] = useState("remodel");
  const dispatch = useDispatch();
  const [getUserRole] = useGetProjectUserRoleMutation();
  const local = localStorage.getItem("userInfo");
  const userRole = useSelector(authUserRole);
  const currentUser = JSON.parse(local);
  const currentUserId = currentUser.user.id;
  const location = useLocation();
  const path =
    !location.pathname.split("/")[3] ||
    location.pathname.split("/")[3] === "client"
      ? ""
      : location.pathname.split("/")[3];
  const handleListedProjectsButton = (btn) => {
    setActiveBtn(btn);
  };

  const navigate = useNavigate();

  const handleClick = async (projectId, pathTo, e) => {
    // console.log(path);
    // console.log(pathTo);
    if (path !== pathTo) {
      dispatch(addInitialPhase([]));
    }
    // const res = await getUserRole({projectId, userId: currentUserId});
    // // console.log(res)
    // dispatch(authUserRole(res.data.role));
    if (userRole.userRole === "client") {
      navigate(`/projects/${projectId}/client`);
    } else {
      navigate(`/projects/${projectId}/${pathTo}`);
    }
  };
  const { id } = useParams();
  //console.log(id);
  // const { data, isLoading, error } = useGetUserProjectsQuery({
  //   userId: currentUserId,
  // });
  const { projects, isLoading, error } = useSelector(projectsPackage);

  useEffect(() => {
    const selectedProject = projects[0]?.find(
      (projectProfileCard) => Number(projectProfileCard.id) === Number(id)
    );
    if (selectedProject) {
      setActiveBtn(selectedProject?.buildType.toLowerCase());
    }
  }, [id]);

  if (isLoading && projects[0]?.length < 1) {
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
          mb={"4px"}
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
              fontSize={"0.6rem"}
              fontWeight={"500"}
              color={"black"}
              fontFamily={"var(--main-font-family)"}
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
              fontSize={"0.6rem"}
              fontWeight={"500"}
              color={"black"}
              fontFamily={"var(--main-font-family)"}
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
              fontSize={"0.6rem"}
              fontWeight={"500"}
              color={"black"}
              fontFamily={"var(--main-font-family)"}
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
            height: reports ? "calc(85vh - 278px)" : "calc(85vh - 225px)",
          }}
        >
          <Stack spacing={1} pl={{xl:2, lg:'0px', xs:2}} pr={{xl:2, lg:'0px', xs:2}} pt={1}>
            <>
              {projects[0]?.map((projectProfileCard) => {
                const selected = Number(projectProfileCard.id) === Number(id);
                if (projectProfileCard.buildType === activeBtn) {
                  return (
                    <React.Fragment key={projectProfileCard.id}>
                      <Link
                        key={projectProfileCard.id}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick(projectProfileCard.id, path, e);
                        }}
                        style={{ textDecoration: "none" }}
                      >
                        <ProjectCard
                          projectProfileCard={projectProfileCard}
                          selected={selected}
                        />
                      </Link>
                    </React.Fragment>
                  );
                } else {
                  return <></>;
                }
              })}
            </>
          </Stack>
        </Box>
        <Stack justifyContent={"center"}>
          <Stack pt={0.5} pb={0.5} width={"90%"} alignSelf={"center"}>
            <BuilderProButton
              variant={"contained"}
              backgroundColor={"#FFAC00"}
              fontFamily={"var(--main-font-family)"}
              fontSize={"0.8rem"}
              marginLeft={0}
              fontWeight={600}
              handleOnClick={() => {
                navigate("/assignproject");
              }}
            >
              Add New Project
            </BuilderProButton>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default ProjectsSidebar;

const themeStyle = {
  title: {
    fontSize: "22px",
    fontWeight: "500",
    fontFamily: "var(--main-font-family)",
    color: "#000000",
  },
  subtile: {
    fontSize: "16px",
    fontWeight: "500",
    fontFamily: "var(--main-font-family)",
    color: "#4C8AB1",
  },
  listTitle: {
    fontSize: "12px",
    fontWeight: "500",
    fontFamily: "var(--main-font-family)",
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
