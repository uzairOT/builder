import {
  Box,
  Divider,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import React, { useEffect } from "react";
import ProjectCard from "../../UI/Card/ProjectCard";
import projects from "./assets/data/projects.json";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetProjectUserRoleMutation,
  useGetUserProjectsQuery,
} from "../../../redux/apis/Project/userProjectApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { addProjects } from "../../../redux/slices/Project/userProjectsSlice";
import { Height } from "@mui/icons-material";
import { authUserRole } from "../../../redux/slices/auth/userRoleSlice";

const ListProjects = () => {
  const dispatch = useDispatch();
  const local = localStorage.getItem("userInfo");
  const [getUserRole] = useGetProjectUserRoleMutation();
  const currentUser = JSON.parse(local);
  const userRole = useSelector(authUserRole);
  const currentUserId = currentUser.user.id;
  const navigate = useNavigate();
  //console.log('LIST PROJECTS:', currentUserId)
  const { data, isLoading, error } = useGetUserProjectsQuery({
    userId: currentUserId,
  });
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

  return (
    <Box sx={{ padding: "0 8px" }}>
      <Typography
        sx={{
          color: "#4C8AB1",
          fontSize: "16px",
          fontWeight: "400",
          padding: 1,
          fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
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
          fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
          fontWeight: "400",
        }}
      >
        All Listed Projects
      </Typography>
      <Box
        sx={{ ...themeStyle.scrollable, height: "calc(90vh - 355px)", }}
        pb={2}
      >
        {error ? (
          <>{error?.data?.message}</>
        ) : (
          <Stack spacing={1} pl={"14px"} pr={"14px"}>
            {isLoading ? (
              <Stack justifyContent={"center"} alignItems={"center"}>
                <CircularProgress />
              </Stack>
            ) : (
              <>
                {data?.projects?.map((projectProfileCard) => {
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
                })}
              </>
            )}
          </Stack>
        )}
      </Box>
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
