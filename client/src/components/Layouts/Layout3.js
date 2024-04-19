import React, { useEffect, useState } from "react";
import { Grid, Paper } from "@mui/material";
import SideBar from "../Settings/SideBar/SideBar";
import { Outlet } from "react-router";
import Navbar from "../../components/Navbar/Navbar.js";
import { useLocation } from "react-router-dom";
import { useAddAssignRoleMutation, useUpdateAssignRoleMutation } from "../../redux/apis/Admin/assignRoleApiSlice.js";
function Layout3() {
  const [userInfo, setUserInfo] = useState({
    userRole:'',
    image:'',
    name: '',
    projects: '',
    email:'',
    phoneNumber: '',
    country: '',
    status:'',
  })

  const location = useLocation();
  const pathSegments = location.pathname.split('/')
  const userRole = pathSegments[pathSegments.length-1]
  //console.log(userRole);

  const [assignRolePost] = useAddAssignRoleMutation()
  const [assignRolePut] = useUpdateAssignRoleMutation();

  const [userId, setUserId] = useState(null);
  useEffect(() => {
    //console.log(userInfo);
  }, [userInfo]);


  const handleAssignRoleButton = (e) => {
    e.preventDefault();
    const post = {
      ...userInfo,
      userRole: userRole,
    }
    //console.log(post)
    assignRolePost(post);
    setUserInfo({
      userRole:'',
      image:'',
      name: '',
      projects: '',
      email:'',
      phoneNumber: '',
      country: '',
      status:'',
    })
  }
  const handleUpdateAssignRole = (e) => {
    e.preventDefault();
    const put = {
      ...userInfo,
      userRole: userRole
    }
    //console.log(put);
    assignRolePut(put);
    setUserInfo({
      userRole:'',
      image:'',
      name: '',
      projects: '',
      email:'',
      phoneNumber: '',
      country: '',
      status:'',
    })
  }
  return (
    <>
      
      <main>
        <Grid sx={themeStyle.dashboard} container pt={1}>
          {/* Side bar */}
          <Grid item xs={12} sm={12} md={12} lg={2}>
            <Paper sx={{ borderRadius: "0 14px 14px 0", height: "97%" }}>
              <SideBar />{" "}
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={10}
            mb={1}
            style={{ paddingTop: "0px", paddingLeft: "10px" }}
          >
            <Paper sx={themeStyle.Layout3Pages} margin={1}>
              <Outlet context={[userInfo,setUserInfo, handleAssignRoleButton,userId, setUserId, handleUpdateAssignRole]} />
            </Paper>
          </Grid>
        </Grid>
      </main>
    </>
  );
}

export default Layout3;

const themeStyle = {
  dashboard: {
    backgroundColor: "#eff5ff",
    height: "100vh",
  },
  dashboardViews: {
    height: "100%",
  },
  Layout3Pages: {
    // height: "100%",
    width: "100%",
    // margin: "1px",
    borderRadius: "14px",
  },
  scrollable: {
    overflowY: "scroll",
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
  },
};
