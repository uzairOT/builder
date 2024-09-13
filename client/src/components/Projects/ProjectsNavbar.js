import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useRadioGroup,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import ProjectNavbarDrawer from "./ProjectNavbarDrawer";
import { useSelector } from "react-redux";
import { getUserRoleFromRedux } from "../../redux/slices/auth/userRoleSlice";
import { useProjectPermissionCheck } from "./ProjectPermissions/ProjectsPermissionCheck";
import { useGetProjectDataQuery } from "../../redux/apis/Project/projectApiSlice";

const ProjectsNavbar = ({ project }) => {
  const location = useLocation();
  const page = location.pathname.split("/")[3];
  const theme = useTheme();
  const showHamburger = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate();
  const userRole = useSelector(getUserRoleFromRedux);
  const userOrganization = useSelector(
    (state) => state?.auth?.userInfo?.user?.userOrganization
  );
  const params = useParams();
  const userId = useSelector((state) => state?.auth?.userInfo?.user?.id);
  const { id: currentProjectId } = params;
  const { data } = useGetProjectDataQuery({ projectId: currentProjectId });
  // console.log("Data Test ", data?.data?.initialProposalApproved);
  const permissionsState = useSelector(
    (state) => state?.permissions?.permissions
  );
  // const changeOrderCheck = useSelector(
  //   (state) => state?.projectInitialProposal?.initialPhases
  // );

  const projectReportPermission = useProjectPermissionCheck(
    "project-report",
    permissionsState
  );

  const navLinks = [
    {
      title: "Initial Proposal",
      path: `initial-proposal`,
    },
    {
      title: "Images",
      path: "images",
    },
    {
      title: "Permit",
      path: "permit",
    },
    {
      title: "Drawing & Files",
      path: "drawing-files",
    },
    ...(data?.data?.initialProposalApproved === false
      ? [
          {
            title: "Work Order",
            path: "",
            disabled: true,
          },
        ]
      : [
          {
            title: "Work Order",
            path: "work-order",
            disabled: false,
          },
        ]),

    {
      title: "Chat",
      path: "chat",
    },
    {
      title: "Notes",
      path: "notes",
    },
    ...(projectReportPermission
      ? [
          {
            title: "Project Report",
            path: "project-report",
          },
        ]
      : []),
    ...(data?.data?.initialProposalApproved === false
      ? [
          {
            title: "Change Order",
            path: "",
            disabled: true,
          },
        ]
      : [
          {
            title: "Change Order",
            path: "change-order",
            disabled: false,
          },
        ]),

    {
      title: "Invoices",
      path: "invoices",
    },
    ...(userId === project?.userId
      ? [
          {
            title: "Project Permissions",
            path: "project-permissions",
          },
        ]
      : []),
  ];
  const [selectedNav, setSelectedNav] = useState(navLinks.path);
  const handleNavClick = (path) => {
    if (userRole.userRole === "client") {
    }
    // setSelectedNav(path);
  };
  const navigateOneStepBack = () => {
    navigate(-1);
    // handleNavClick("");
  };
  useEffect(() => {
    setSelectedNav(page);
  }, [page]);

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      p={1}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <IconButton>
          <ChevronLeftIcon
            style={{ color: "black" }}
            onClick={navigateOneStepBack}
          />
        </IconButton>
        {/* <img src={project?.image} alt='Project' width={'60px'} height={'35px'} style={{borderRadius: '12px'}}></img> */}
        <Link to={``} style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              color: "#494A4A",
              fontSize: { xl: "20px", lg: "17px", md: "20px", xs: "20px" },
              fontWeight: 600,
              fontFamily: "var(--main-font-family)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: {
                xl: "19vw",
                lg: "19vw",
                md: "50vw",
                sm: "80vw",
                xs: "70vw",
              },
            }}
          >
            {project?.projectName}
          </Typography>
        </Link>
      </Stack>

      {showHamburger && (
        <ProjectNavbarDrawer navLinks={navLinks} userRole={userRole} />
      )}
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={1}
        pr={2}
        pl={1}
        display={{ xl: "flex", lg: "flex", md: "none", sm: "none", xs: "none" }}
      >
        {navLinks.map((navlink, index) => {
          if (
            userRole?.userRole === "client" &&
            (navlink.title === "Notes" || navlink.title === "Project Report")
          ) {
            return <></>;
          }
          return (
            <React.Fragment key={index}>
              {navlink.disabled ? (
                <Tooltip title="You can't access this while the initial phases are not approved">
                  <Typography
                    color="#A0A0A0"
                    fontSize={{ xl: "15px", lg: "11px" }}
                    fontWeight={"400"}
                    fontFamily={"var(--main-font-family)"}
                    pr={1}
                    style={{ cursor: "not-allowed" }}
                  >
                    {navlink.title}
                  </Typography>
                </Tooltip>
              ) : (
                <Link
                  to={`${navlink.path}`}
                  style={{ textDecoration: "none" }}
                  onClick={() => handleNavClick(navlink.path)}
                >
                  <Typography
                    color={selectedNav === navlink.path ? "#ffac00" : "#494A4A"}
                    fontSize={{ xl: "15px", lg: "11px" }}
                    fontWeight={"400"}
                    fontFamily={"var(--main-font-family)"}
                    pr={1}
                  >
                    {navlink.title}
                  </Typography>
                </Link>
              )}
              {index !== navLinks.length - 1 && (
                <Divider
                  orientation="vertical"
                  style={{ borderWidth: "1px" }}
                  flexItem
                />
              )}
            </React.Fragment>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default ProjectsNavbar;
