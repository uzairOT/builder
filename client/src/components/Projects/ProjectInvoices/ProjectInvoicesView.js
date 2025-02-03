import { Box, Paper, Stack, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import AddPhaseView from "../../AssignProject/AddPhaseView/AddPhaseView";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetProjectChangeOrderQuery } from "../../../redux/apis/Project/projectApiSlice";
import ProjectsInvoices from "./ProjectsInvoices";
import { getUserRoleFromRedux } from "../../../redux/slices/auth/userRoleSlice";

const ProjectInvoicesView = () => {
  const [changeView, setChangeView] = useState(false);
  // const allEvent = useSelector(allEvents);
  const userRole = useSelector(getUserRoleFromRedux);
  // const role = useSelector((state) => state.userRole.userRole);
  // const events = allEvent.events;
  const params = useParams();
  // const userRoleAuth = useSelector(getUserRoleFromRedux);
  // console.log(userRoleAuth);
  const { id: currentProjectId } = params;
  const currentUser = localStorage.getItem("userInfo");
  const user = JSON.parse(currentUser);
  const { data, refetch } = useGetProjectChangeOrderQuery({
    projectId: currentProjectId,
    userId: user.user.id,
    changeOrder: false,
  });
  const { id } = useParams();

  const handleChangeView = () => {
    setChangeView(!changeView);
  };

  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  // console.log(userRole);
  // const [projectName, projectLocation, SuperAdminId] = useOutletContext();
  // const canGenerate = usePermissionCheck("generate-invoices", role, SuperAdminId)
  return (
    <Paper
      style={{
        ...themeStyle.borders,
        width: "99%",
        marginBottom: "4px",
        marginTop: "8px",
        height: "100%",
        ...themeStyle.scrollable,
      }}
    >
      {userRole.userRole === "client" ? (
        <>
          {/* <Box pt={1} pl={1} pb={0}>
            <BuilderProButton
              backgroundColor={"#FFAC00"}
              variant={"contained"}
              fontFamily={"var(--main-font-family)"}
              fontSize={{ xl: "16px", lg: "14px", md: "16px", xs: "16px" }}
              fontWeight={"600"}
              padding={{ md: "6px 32px 6px 32px" }}
              marginLeft={"4px"}
              handleOnClick={handleChangeView}
            >
              {changeView ? "   View Invoice History" : "Generate Invoice"}
            </BuilderProButton>
          </Box>{" "} */}
          <Box padding={0}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              sx={{
                fontFamily: "var(--main-font-family)",
                color: "black",
                borderBottom: "0.2px solid #FFB300",
                "& .MuiTabs-indicator": {
                  backgroundColor: "#FFB300",
                },
              }}
            >
              <Tab
                label="Generate Invoice"
                sx={{
                  textTransform: "capitalize",
                  fontFamily: "var(--main-font-family)",
                  backgroundColor: selectedTab === 0 ? "#FFAC00" : "#F2F2F2",
                  color:
                    selectedTab === 0 ? "white !important" : "black !important",
                  border:
                    selectedTab === 0
                      ? "1px solid #FFAC00"
                      : "1px solid #FFAC00",
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  padding: 0.5,
                  fontWeight: "600",
                }}
              />
              <Tab
                label="View Invoice History"
                sx={{
                  textTransform: "capitalize",
                  fontFamily: "var(--main-font-family)",
                  ml: 0.5,
                  backgroundColor: selectedTab === 1 ? "#FFAC00" : "#F2F2F2",
                  color:
                    selectedTab === 1
                      ? "white !important"
                      : "black !importants",
                  border:
                    selectedTab === 1
                      ? "1px solid #FFAC00"
                      : "1px solid #FFAC00",
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  padding: 0.5,
                  fontWeight: "600",
                }}
              />
            </Tabs>
          </Box>
          <Stack pt={1} width={"inherit"}>
            <Stack justifyContent={"flex-start"} height={"95%"}>
              {/* {changeView ? ( */}
              <Stack p={1} borderRadius={"14px"} width={"99%"}>
                {selectedTab === 0 && (
                  <AddPhaseView
                    // canGenerate={canGenerate}
                    refetchChangeOrder={refetch}
                    projectId={id}
                    adminProjectView={true}
                    view={"Generate Invoice"}
                  />
                )}
              </Stack>
              {/* ) : ( */}
              <>
                <Stack>
                  {selectedTab === 1 && (
                    <ProjectsInvoices
                      userRole={userRole}
                      workOrder={true}
                      view={"Work Order Logs"}
                      setChangeView={setChangeView}
                      data={data}
                      refetch={refetch}
                    />
                  )}
                </Stack>
              </>
              {/* )} */}
            </Stack>
          </Stack>{" "}
        </>
      ) : (
        <>
          {/* <Box pt={1} pl={1} pb={0}>
            <BuilderProButton
              backgroundColor={"#FFAC00"}
              variant={"contained"}
              fontFamily={"var(--main-font-family)"}
              fontSize={{ xl: "16px", lg: "14px", md: "16px", xs: "16px" }}
              fontWeight={"600"}
              padding={{ md: "6px 32px 6px 32px" }}
              marginLeft={"4px"}
              handleOnClick={handleChangeView}
            >
              {changeView ? "View Invoice History" : " Generate Invoice"}
            </BuilderProButton>
          </Box>{" "} */}
          <Box padding={0}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              sx={{
                fontFamily: "var(--main-font-family)",
                color: "black",
                borderBottom: "0.2px solid #FFB300",
                "& .MuiTabs-indicator": {
                  backgroundColor: "#FFB300",
                },
              }}
            >
              <Tab
                label="Generate Invoice"
                sx={{
                  textTransform: "capitalize",
                  fontFamily: "var(--main-font-family)",
                  backgroundColor: selectedTab === 0 ? "#FFAC00" : "#F2F2F2",
                  color:
                    selectedTab === 0 ? "white !important" : "",
                  border:
                    selectedTab === 0
                      ? "1px solid #FFAC00"
                      : "1px solid #FFAC00",
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  padding: 0.5,
                  fontWeight: "600",
                }}
              />
              <Tab
                label="View Invoice History"
                sx={{
                  textTransform: "capitalize",
                  fontFamily: "var(--main-font-family)",
                  ml: 0.5,
                  backgroundColor: selectedTab === 1 ? "#FFAC00" : "#F2F2F2",
                  color:
                    selectedTab === 1
                      ? "white !important"
                      : "",
                  border:
                    selectedTab === 1
                      ? "1px solid #FFAC00"
                      : "1px solid #FFAC00",
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  padding: 0.5,
                  fontWeight: "600",
                }}
              />
            </Tabs>
          </Box>
          <Stack pt={1} width={"inherit"}>
            <Stack justifyContent={"flex-start"} height={"95%"}>
              {/* {changeView ? ( */}
              <Stack p={1} borderRadius={"14px"} width={"99%"}>
                {selectedTab === 0 && (
                  <AddPhaseView
                    // canGenerate={canGenerate}
                    refetchChangeOrder={refetch}
                    projectId={id}
                    adminProjectView={true}
                    view={"Generate Invoice"}
                  />
                )}
              </Stack>
              {/* ) : ( */}
              <>
                <Stack>
                  {selectedTab === 1 && (
                    <ProjectsInvoices
                      userRole={userRole}
                      workOrder={true}
                      view={"Work Order Logs"}
                      setChangeView={setChangeView}
                      data={data}
                      refetch={refetch}
                    />
                  )}
                </Stack>
              </>
              {/* )} */}
            </Stack>
          </Stack>{" "}
        </>
      )}
    </Paper>
  );
};

export default ProjectInvoicesView;

const themeStyle = {
  borders: {
    borderRadius: "14px",
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
  border: {
    borderRadius: "14px",
  },
};
