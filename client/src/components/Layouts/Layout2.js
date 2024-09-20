import {
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import ProjectsSidebar from "../Projects/ProjectsDashboard/ProjectsSidebar";
import { Outlet, useParams } from "react-router-dom";
import ProjectsNavbar from "../Projects/ProjectsNavbar";
import projects from "./assets/data/projects";
import { useGetProjectDataQuery } from "../../redux/apis/Project/projectApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetProjectUserRoleMutation } from "../../redux/apis/Project/userProjectApiSlice";
import {
  authUserRole,
  getUserRoleFromRedux,
  setUserRoleError,
  setUserRoleIsLoading,
} from "../../redux/slices/auth/userRoleSlice";
import {
  useGetProjectPermssionsListMutation,
  usePermissionsMutation,
} from "../../redux/apis/Permissions/permissionsApiSlice";
import { setPermissionsState } from "../../redux/slices/Permissions/permissionsSlice";
import { socket } from "../../socket";
import { setPermissionsListState } from "../../redux/slices/LoginPermissions/PermissionsSlice";

const Layout2 = () => {
  const params = useParams();
  const { id: currentProjectId } = params;
  const { data } = useGetProjectDataQuery({ projectId: currentProjectId });
  const isAuthenticated = useSelector((state) => state.auth.userInfo);
  const userId = isAuthenticated ? isAuthenticated.user.id : null;
  const [getUserRole, { isLoading }] = useGetProjectUserRoleMutation();
  const userRole = useSelector(getUserRoleFromRedux);
  const dispatch = useDispatch();
  // projects.find(project => project.id === parseInt(currentProjectId));
  const selectedProjectId = data?.data;
  const selectedProjectData = data?.data;
  const projectName = selectedProjectId?.projectName;
  const projectLocation = selectedProjectId?.location;
  const SuperAdminId = selectedProjectId?.userId;
  // console.log("Selected Project:", SuperAdminId);
  // console.log('APP.JS: ',id)

  const [GetPermissionsList] = usePermissionsMutation();

  const handleUpdatePermission = async () => {
    try {
      const response = await GetPermissionsList({
        projectId: currentProjectId,
      }).unwrap();

      if (response && Array.isArray(response)) {
        dispatch(setPermissionsState(response));
      }
    } catch (error) {
      console.error("Failed to update permission:", error);
    }
  };

  useEffect(() => {
    handleUpdatePermission();
    
    const handleSocketUpdate = async () => {
      try {
        await handleUpdatePermission();
      } catch (error) {
        console.error("Failed to update permissions from socket:", error);
      }
    };

    socket.on("project-permissions-updated", (data) => {
      // console.log("Run", data?.projectId);
      if (data?.projectId == currentProjectId) {
        handleSocketUpdate();
      }
    });

    return () => {
      socket.off("project-permissions-updated");
    };
  }, [socket, currentProjectId]);

  const getUserRoleAuth = async () => {
    if (currentProjectId) {
      try {
        dispatch(setUserRoleIsLoading(true));
        const res = await getUserRole({
          projectId: currentProjectId,
          userId: userId,
        });
        const permissions = await GetPermissionsList({
          projectId: currentProjectId,
        });
        dispatch(setPermissionsState(permissions?.data));
        dispatch(authUserRole(res.data.role));
      } catch (error) {
        console.log(error);
        dispatch(setUserRoleError(error.message));
      } finally {
        dispatch(setUserRoleIsLoading(false));
      }
    }
    // if(res.data.role === 'client'){
    //   navigate(`/projects/${projectId}/client`);
    // } else{

    //   navigate(`/projects/${projectId}/${path}`);
    // }
  };

  useEffect(() => {
    getUserRoleAuth();
  }, [currentProjectId]);

  return (
    <>
      <Grid
        container
        mt={"0.00001px"}
        height={{
          xl: "calc(93vh)",
          lg: "calc(93vh + 15px)",
          md: "100%",
          sm: "100%",
          xs: "100%",
        }}
        backgroundColor={"#eff5ff"}
        spacing={1}
      >
        <Grid
          item
          xl={2}
          lg={2}
          md={4}
          sm={12}
          xs={12}
          height={"93vh"}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          <Paper sx={{ height: "100%", borderRadius: "14px" }}>
            <Typography sx={themeStyle.title} p={2} pb={1.5}>
              Projects Dashboard
            </Typography>
            <ProjectsSidebar />
          </Paper>
        </Grid>
        <Grid
          item
          xl={10}
          lg={10}
          md={8}
          sm={12}
          xs={12}
          pr={1}
          pb={1}
          height={{
            xl: "calc(93vh - 5px)",
            lg: "93vh",
            md: "calc(93vh + 15px)",
            sm: "93vh",
            xs: "93vh",
          }}
          sx={themeStyle.scrollable}
          overflow={"hidden"}
        >
          <Stack>
            <Paper sx={{ borderRadius: "14px" }}>
              <ProjectsNavbar project={selectedProjectId} />
            </Paper>
          </Stack>
          {userRole.isLoading ? (
            <Stack
              sx={{ marginTop: 5 }}
              m={"auto"}
              width={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <CircularProgress />
            </Stack>
          ) : (
            <Outlet
              context={[
                projectName,
                projectLocation,
                SuperAdminId,
                selectedProjectData,
              ]}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Layout2;

const themeStyle = {
  title: {
    fontSize: { xl: "22px", lg: "17px", md: "19px", xs: "20px" },
    fontWeight: "500",
    fontFamily: "var(--main-font-family)",
    color: "#000000",
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
