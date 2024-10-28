import { Paper, Stack, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import MonitoringFinances from "../Projects/ProjectsDefault/MonitoringFinances";
import ProjectInfoAndTeam from "../Projects/ProjectsDefault/ProjectInfoAndTeam";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import ChangeOrder from "../Projects/ProjectsDefault/ChangeOrder";
import BuilderProButton from "../UI/Button/BuilderProButton";
import ChangeOrderRequest from "../dialogues/ChangeOrderRequest/ChangeOrderRequest";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useProjectPermissionCheck } from "../Projects/ProjectPermissions/ProjectsPermissionCheck";

const InnerLayout2 = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userId = userInfo.user.id;
  const [open, setOpen] = useState(false);
  const [projectName, projectLocation, SuperAdminId, selectedProjectData, projectOrganizationId] =
    useOutletContext(); // Extracting the context values
  const permissionsState = useSelector(
    (state) => state?.permissions?.permissions
  );
  const changeOrderPermission = useProjectPermissionCheck(
    "change-order",
    permissionsState
  );
  // console.log("Project Data Chk", selectedProjectData);
  const handleOpen = () => {
    navigate(`/projects/${id}/change-order`);
    //This component is depreciated
    // setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // console.log("Manage", SuperAdminId);
  return (
    <>
      <Stack
        direction={{ xl: "row", lg: "row", md: "column" }}
        pt={1}
        spacing={1}
      >
        {/* Monitoring And Accounting */}
        <Stack
          p={{ md: 0, xs: 1 }}
          flex={{ xl: 2 }}
          display={{ xl: "flex", lg: "flex" }}
        >
          <Paper style={themeStyle.border}>
            <MonitoringFinances projectId={id} userId={userId} />
          </Paper>
        </Stack>
        <Stack p={{ md: 0, xs: 1 }} flex={{ xl: 8, lg: 7 }}>
          <Paper style={themeStyle.border}>
            <ProjectInfoAndTeam
              SuperAdminId={SuperAdminId}
              projectId={id}
              userId={userId}
              projectOrganizationId={projectOrganizationId}
            />
          </Paper>
        </Stack>
      </Stack>
      <Stack
        direction={{ xl: "row", lg: "row" }}
        pt={1}
        spacing={1}
        sx={{ height: "calc(92vh - 295px)" }}
      >
        <Stack flex={2} height={"inherit"}>
          <Outlet context={[SuperAdminId, projectOrganizationId, selectedProjectData]} />
        </Stack>
        {/* Change Order Tab navigation */}
        <Stack flex={1} pt={{ xs: 1, lg: 0 }}>
          <Paper style={{ ...themeStyle.border, height: "100%", width: "99%" }}>
            {/* First Item of Stack */}
            <Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                height={"40px"}
                mt={1}
                pr={1}
              >
                <Typography pl={3} color={"#4C8AB1"}>
                  Change Order
                </Typography>
                <Tooltip
                  title={
                    !selectedProjectData?.initialProposalApproved
                      ? "You can't access this while the initial phases are not approved"
                      : !changeOrderPermission
                      ? "You don't have permission to access this feature"
                      : ""
                  }
                >
                  <span>
                    <BuilderProButton
                      disabled={
                        !selectedProjectData?.initialProposalApproved ||
                        !changeOrderPermission
                      }
                      variant={"contained"}
                      fontFamily={"var(--main-font-family)"}
                      fontSize={{
                        xl: "14px",
                        lg: "12.5px",
                        md: "14px",
                        sm: "12px",
                        xs: "10px",
                      }}
                      backgroundColor={"#4C8AB1"}
                      handleOnClick={handleOpen}
                    >
                      Change Order Request
                    </BuilderProButton>
                  </span>
                </Tooltip>
              </Stack>
              <Tabs defaultValue={0} sx={{ backgroundColor: "transparent" }}>
                <TabList
                  sx={{
                    [`& .${tabClasses.root}[aria-selected="true"]`]: {
                      boxShadow: "0",
                      bgcolor: "white",
                      "--Tab-indicatorColor": "#4C8AB1",
                      "--Tab-indicatorRadius": "28px",
                      "--Tab-indicatorThickness": "3.5px",
                      "--Tab-indicatorSize": "70%",
                      fontWeight: "500",
                    },
                    boxShadow: "none",
                  }}
                >
                  <Tab
                    sx={{
                      fontFamily: "var(--main-font-family)",
                      fontSize: { xl: "15px", lg: "13px", md: 15, xs: 15 },
                    }}
                  >
                    Approved
                  </Tab>
                  <Tab
                    sx={{
                      fontFamily: "var(--main-font-family)",
                      fontSize: { xl: "15px", lg: "13px", md: 15, xs: 15 },
                    }}
                  >
                    Pending
                  </Tab>
                  <Tab
                    sx={{
                      fontFamily: "var(--main-font-family)",
                      fontSize: { xl: "15px", lg: "13px", md: 15, xs: 15 },
                    }}
                  >
                    Declined
                  </Tab>
                </TabList>
                <TabPanel
                  sx={{ padding: 0, width: { xl: "28.5vw" } }}
                  value={0}
                >
                  <ChangeOrder value={0} />
                </TabPanel>
                <TabPanel
                  sx={{ padding: 0, width: { xl: "28.5vw" } }}
                  value={1}
                >
                  <ChangeOrder value={1} />
                </TabPanel>
                <TabPanel
                  sx={{ padding: 0, width: { xl: "28.5vw" } }}
                  value={2}
                >
                  <ChangeOrder value={2} />
                </TabPanel>
              </Tabs>
            </Stack>
            {/* Second Item of Stack */}
            <Stack alignItems={"flex-end"} pr={4} pt={2}>
              {/* This component is depreciated */}
              {open && (
                <ChangeOrderRequest
                  handleClose={handleClose}
                  handleOpen={handleOpen}
                  heading={"Change Order"}
                  admin={true}
                />
              )}
            </Stack>
          </Paper>
        </Stack>
      </Stack>
    </>
  );
};

export default InnerLayout2;

const themeStyle = {
  border: {
    borderRadius: "14px",
  },
};
