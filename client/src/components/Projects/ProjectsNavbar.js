import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import ProjectNavbarDrawer from "./ProjectNavbarDrawer";

const ProjectsNavbar = ({ project }) => {
  const location = useLocation();
  const page = location.pathname.split('/',)[3];
  const theme = useTheme();
  const showHamburger = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate();
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
    {
      title: "Work Order",
      path: "work-order",
    },
    {
      title: "Chat",
      path: "chat",
    },
    {
      title: "Notes",
      path: "notes",
    },
    {
      title: "Project Report",
      path: "project-report",
    },
    {
      title: "Change Order",
      path: "change-order",
    },
  ];
  const [selectedNav, setSelectedNav] = useState(navLinks.path);
  const handleNavClick = (path) => {
    setSelectedNav(path);
  };
  const navigateToDefault = () => {
    navigate("");
    handleNavClick('');
  };

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
            onClick={navigateToDefault}
          />
        </IconButton>
        {/* <img src={project?.image} alt='Project' width={'60px'} height={'35px'} style={{borderRadius: '12px'}}></img> */}
        <Link to={``} onClick={() => handleNavClick('')} style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              color: "#494A4A",
              fontSize: "20px",
              fontWeight: 600,
              fontFamily: "GT-Walsheim-Regular-Trial, sans-serif",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: {xl:"200px",lg:"100px",md:"250px",sm:"250px",xs:"160px"}, // Adjust this value based on your layout
            }}
          >
            {project?.projectName}
          </Typography>
        </Link>
      </Stack>

      {showHamburger && <ProjectNavbarDrawer navLinks={navLinks} />}
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={1}
        pr={2}
        display={{ xl: "flex", lg: "flex", md: "none", sm: "none", xs: "none" }}
      >
        {navLinks.map((navlink, index) => (
          <React.Fragment key={index}>
            <Link
              to={`${navlink.path}`}
              style={{ textDecoration: "none" }}
              onClick={() => handleNavClick(navlink.path)}
            >
              <Typography
                color={selectedNav === navlink.path ? "#ffac00" : "#494A4A"}
                fontSize={"15px"}
                fontWeight={"400"}
                fontFamily={"GT-Walsheim-Regular-Trial, sans-serif"}
                pr={1}
              >
                {navlink.title}
              </Typography>
            </Link>
            {index !== navLinks.length - 1 && (
              <Divider
                orientation="vertical"
                style={{ borderWidth: "1px" }}
                flexItem
              />
            )}
          </React.Fragment>
        ))}
      </Stack>
    </Stack>
  );
};

export default ProjectsNavbar;
