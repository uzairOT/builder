import {
  Box,
  Divider,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ProjectCard from "../../UI/Card/ProjectCard";
import projects from "./assets/data/projects.json";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetProjectUserRoleMutation,
  useGetUserProjectsQuery,
} from "../../../redux/apis/Project/userProjectApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addProjects,
  projectsPackage,
} from "../../../redux/slices/Project/userProjectsSlice";
import { Height } from "@mui/icons-material";
import { authUserRole } from "../../../redux/slices/auth/userRoleSlice";
import BuilderProButton from "../../UI/Button/BuilderProButton";

const ListProjects = () => {
  const userRole = useSelector(authUserRole);
  const navigate = useNavigate();
  const [activeBtn, setActiveBtn] = useState("remodel");
  const { projects, error, isLoading } = useSelector(projectsPackage);
  //console.log('LIST PROJECTS:', currentUserId)
  // const { data, isLoading, error } = useGetUserProjectsQuery({
  //   userId: currentUserId,
  // });
  //console.log(data);
  //Add this code in useEffect

  const handleClick = async (projectId, e) => {
    // const res = await getUserRole({ projectId, userId: currentUserId });
    // // console.log(res)
    // dispatch(authUserRole(res.data.role));
    if (userRole.userRole === "client") {
      navigate(`/projects/${projectId}/client`);
    } else {
      navigate(`/projects/${projectId}`);
    }
  };
  const handleListedProjectsButton = (btn) => {
    setActiveBtn(btn);
  };

  return (
    <Box sx={{ padding: "0 8px" }}>
      <Typography
        sx={{
          color: "#4C8AB1",
          fontSize: "16px",
          fontWeight: "400",
          padding: 1,
          fontFamily: "Arial Rounded MT, sans-serif",
        }}
      >
        User Projects
      </Typography>
      <Divider variant="middle" />
      <Typography
        sx={{
          fontSize: "12px",
          color: "var(--textField, rgba(83, 83, 83, 0.79))",
          padding: 2,
          fontFamily: "Arial Rounded MT, sans-serif",
          fontWeight: "400",
        }}
      >
        All Listed Projects
      </Typography>
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
            fontSize={{ xl: "11px", lg: "9px", md: "8px", xs: "11px" }}
            fontWeight={"600"}
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
            fontSize={{ xl: "11px", lg: "9px", md: "8px", xs: "11px" }}
            fontWeight={"600"}
            color={"black"}
            fontFamily={"Inter, sans-serif"}
            width={"100%"}
          >
            New Build
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
            fontSize={{ xl: "11px", lg: "9px", md: "8px", xs: "11px" }}
            fontWeight={"600"}
            color={"black"}
            fontFamily={"Inter, sans-serif"}
          >
            Commercial
          </Typography>
        </BuilderProButton>
      </Stack>
      <Box
        sx={{
          ...themeStyle.scrollable,
          height: {
            xl: "calc(90vh - 445px)",
            lg: "calc(90vh - 425px)",
            md: "calc(90vh - 275px)",
            xs: "calc(33vh)",
          },
        }}
        pb={2}
        pt={2}
      >
        {error ? (
          <>
            {/* removed error message to prompt user to refresh if error occurs */}
          </>
        ) : (
          <Stack spacing={2} pl={"5px"} pr={"5px"}>
            {isLoading ? (
              <Stack justifyContent={"center"} alignItems={"center"}>
                <CircularProgress />
              </Stack>
            ) : (
              <>
                {projects[0]?.map((projectProfileCard) => {
                  if (projectProfileCard.buildType === activeBtn) {
                    return (
                      <Link
                        key={projectProfileCard.id}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick(projectProfileCard.id, e);
                        }}
                        // to={`projects/${projectProfileCard.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <ProjectCard projectProfileCard={projectProfileCard} />
                      </Link>
                    );
                  } else {
                    return <></>;
                  }
                })}
              </>
            )}
          </Stack>
        )}
      </Box>
      <Stack justifyContent={'center'}>
        <Stack pt={0.5} width={"90%"} alignSelf={"center"}>
          <BuilderProButton
            variant={"contained"}
            backgroundColor={"#FFAC00"}
            fontFamily={"inherit"}
            fontSize={"16px"}
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
    </Box>
  );
};

export default ListProjects;
const themeStyle = {
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
