import {
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
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
import { t } from "i18next";

const ProjectsNavbar = ({ project }) => {
  const location = useLocation();
  const page = location.pathname.split("/")[3];
  const theme = useTheme();
  const showHamburger = useMediaQuery(theme.breakpoints.down("xl"));
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
      title: t("ProjectNavbar.title1"),
      path: `initial-proposal`,
    },
    {
      title: t("ProjectNavbar.title2"),
      path: "images",
    },
    {
      title: t("ProjectNavbar.title3"),
      path: "permit",
    },
    {
      title: t("ProjectNavbar.title4"),
      path: "drawing-files",
    },
    ...(data?.data?.initialProposalApproved === false
      ? [
          {
            title: t("ProjectNavbar.title5"),
            path: "",
            disabled: true,
          },
        ]
      : [
          {
            title: t("ProjectNavbar.title5"),
            path: "work-order",
            disabled: false,
          },
        ]),

    {
      title: t("ProjectNavbar.title6"),
      path: "chat",
    },
    {
      title: t("ProjectNavbar.title7"),
      path: "notes",
    },
    ...(projectReportPermission
      ? [
          {
            title: t("ProjectNavbar.title8"),
            path: "project-report",
          },
        ]
      : []),
    ...(data?.data?.initialProposalApproved === false
      ? [
          {
            title: t("ProjectNavbar.title9"),
            path: "",
            disabled: true,
          },
        ]
      : [
          {
            title: t("ProjectNavbar.title9"),
            path: "change-order",
            disabled: false,
          },
        ]),

    {
      title: t("ProjectNavbar.title10"),
      path: "invoices",
    },
    ...(userId === project?.userId
      ? [
          {
            title: t("ProjectNavbar.title11"),
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
        spacing={0.5}
        pr={2}
        pl={1}
        display={{ xl: "flex", lg: "none", md: "none", sm: "none", xs: "none" }}
        // minWidth={'80vw'}
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
                    pr={0.5}
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
                    pr={0.5}
                  >
                    {navlink.title}
                  </Typography>
                </Link>
              )}
              {index !== navLinks.length - 1 && (
                <Divider
                  orientation="vertical"
                  style={{ borderWidth: "1px", marginRight:'4px' }}
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
