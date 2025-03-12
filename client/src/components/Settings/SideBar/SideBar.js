import React, { useState } from "react";
import { Box, Typography, List, ListItemText, ListItem } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../../App.css";
import { useTranslation } from "react-i18next";
function SideBar() {
  const {t} = useTranslation()
  const location = useLocation();

  const paths = [
    "/settings",
    "/settings/masterline",
    "/settings/units",
    "/settings/admin",
    "/settings/projectManager",
    "/settings/client",
    "/settings/employee",
    "/settings/subcontractor",
    "/settings/supplier",
    "/settings/others",
    "/settings/accounts",
    "/settings/coupon",
    // "/settings/permissions",

  ];

  const selectedItem = paths.findIndex((path) => path === location.pathname);

  return (
    <Box padding={"2rem"} display={{lg:'block', xs:'none'}}>
      <Typography sx={listHeading}>My Profile</Typography>
      <List sx={{ ...listHeading, fontSize: "1rem", marginTop: "2rem" }}>
        <ListItem
          component={Link}
          to="/settings"
          selected={selectedItem === 0}
          sx={listItemStyle}
        >
          {t("Settings.SideBar.profile")}
        </ListItem>
        <ListItem
          component={Link}
          to="/settings/masterline"
          selected={selectedItem === 1}
          sx={listItemStyle}
        >
          {t("Settings.SideBar.master")}
        </ListItem>
        <ListItem
          component={Link}
          to="/settings/units"
          selected={selectedItem === 2}
          sx={listItemStyle}
        >
          {t("Settings.SideBar.units")}
        </ListItem>
        <ListItem
          component={Link}
          to="/settings/admin"
          selected={selectedItem === 3}
          sx={listItemStyle}
        >
          {t("Settings.SideBar.admin")}
        </ListItem>
        <ListItem
          component={Link}
          to="/settings/projectManager"
          selected={selectedItem === 4}
          sx={listItemStyle}
        >
          {t("Settings.SideBar.projectManager")}
        </ListItem>
        <ListItem
          component={Link}
          to="/settings/client"
          selected={selectedItem === 5}
          sx={listItemStyle}
        >
          {t("Settings.SideBar.client")}
        </ListItem>
        <ListItem
          component={Link}
          to="/settings/employee"
          selected={selectedItem === 6}
          sx={listItemStyle}
        >
          {t("Settings.SideBar.employee")}
        </ListItem>
        <ListItem
          component={Link}
          to="/settings/subcontractor"
          selected={selectedItem === 7}
          sx={listItemStyle}
        >
          {t("Settings.SideBar.subcontractor")}
        </ListItem>
        <ListItem
          component={Link}
          to="/settings/supplier"
          selected={selectedItem === 8}
          sx={listItemStyle}
        >
          {t("Settings.SideBar.supplier")}
        </ListItem>
        <ListItem
          component={Link}
          to="/settings/others"
          selected={selectedItem === 9}
          sx={listItemStyle}
        >
          {t("Settings.SideBar.others")}
        </ListItem>
        <ListItem
          component={Link}
          to="/settings/accounts"
          selected={selectedItem === 10}
          sx={listItemStyle}
        >
          {t("Settings.SideBar.account")}
        </ListItem>
        <ListItem
          component={Link}
          to="/settings/coupon"
          selected={selectedItem === 11}
          sx={listItemStyle}
        >
          {t("Settings.SideBar.coupon")}
        </ListItem>
        {/* <ListItem
          component={Link}
          to="/settings/permissions"
          selected={selectedItem === 12}
          sx={listItemStyle}
        >
          Permission Access
        </ListItem> */}
      </List>
    </Box>
  );
}
const listHeading = {
  fontFamily: 'var(--main-font-family)',
  fontSize: "1.5rem",
  color: "#000",
};

const listItemStyle = {
  color: "#000",
  height: "46px",
  // marginBottom: "1rem",
  cursor: "pointer",
  fontWeight: '400',
  marginBottom: "0px",
  padding:'4px',

  "&:hover": {
    //   backgroundColor: "#E9F6FF",
  },
  "&.Mui-selected": {
    backgroundColor: "#E9F6FF",
    borderRadius: "0 9px 9px 0",
    borderLeft: "6px solid #1F9EF3",
    color: "#4C8AB1",
  },
};
export default SideBar;
