import { Box, Paper, Stack, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import AddPhaseView from "../../AssignProject/AddPhaseView/AddPhaseView";
import { useOutletContext, useParams } from "react-router-dom";
import ProjectsChangeOrder from "../ProjectsChangeOrder/ProjectsChangeOrder";
import TaskCalender from "../../Task/Calender/TaskCalender";
import { useSelector } from "react-redux";
import { allEvents } from "../../../redux/slices/Events/eventsSlice";
import { getForecast } from "../../../redux/slices/DailyForecast/dailyForecastSlice";
import { useGetProjectChangeOrderQuery } from "../../../redux/apis/Project/projectApiSlice";
import { getUserRoleFromRedux } from "../../../redux/slices/auth/userRoleSlice";

const WorkOrderView = () => {
  const [changeView, setChangeView] = useState(false);
  const authUserRole = useSelector(getUserRoleFromRedux);
  const allEvent = useSelector(allEvents);
  const forecast = useSelector(getForecast);
  const events = allEvent.events;
  const params = useParams();
  const { id: currentProjectId } = params;
  const currentUser = localStorage.getItem("userInfo");
  const user = JSON.parse(currentUser);
  const { data, refetch } = useGetProjectChangeOrderQuery({
    projectId: currentProjectId,
    userId: user.user.id,
    changeOrder: false,
  });
  const dailyForecast = forecast.dailyForecast;
  const { id } = useParams();
  const [projectName, projectLocation, SuperAdminId, selectedProjectData] =
    useOutletContext();
  const [selectedTab, setSelectedTab] = useState(0);
  const handleChangeView = () => {
    setChangeView(!changeView);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Paper
      style={{
        ...themeStyle.borders,
        width: "99%",
        marginBottom: "4px",
        marginTop: "8px",
        height: !changeView ? "100%" : "100%",
        ...themeStyle.scrollable,
      }}
    >
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
            label="New Work Order"
            sx={{
              textTransform: "capitalize",
              fontFamily: "var(--main-font-family)",
              backgroundColor: selectedTab === 0 ? "#FFAC00" : "#F2F2F2",
              color:
                selectedTab === 0 ? "white !important" : "black !important",
              border:
                selectedTab === 0 ? "1px solid #FFAC00" : "1px solid #FFAC00",
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              padding: 0.5,
              fontWeight: "600",
            }}
          />
          <Tab
            label="Work Order Logs"
            sx={{
              textTransform: "capitalize",
              fontFamily: "var(--main-font-family)",
              ml: 0.5,
              backgroundColor: selectedTab === 1 ? "#FFAC00" : "#F2F2F2",
              color:
                selectedTab === 1 ? "white !important" : "black !importants",
              border:
                selectedTab === 1 ? "1px solid #FFAC00" : "1px solid #FFAC00",
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              padding: 0.5,
              fontWeight: "600",
            }}
          />
        </Tabs>
      </Box>

      {/* <Box pt={1} pl={1} pb={0}>
        <BuilderProButtonA
          backgroundColor={"#FFAC00"}
          variant={"contained"}
          fontFamily={'var(--main-font-family)'}
          fontSize={{xl:"16px", lg:12,md:"16px",xs:"16px",}}
          fontWeight={"600"}
          padding={{ md: "6px 32px 6px 32px" }}
          marginLeft={"4px"}
          
          handleOnClick={handleChangeView}
        >
          {changeView ? "Submit New Work Order" : "View Work Order Logs"}
        </BuilderProButtonA>
      </Box> */}

      <Stack pt={1} width={"inherit"}>
        <Stack justifyContent={"flex-start"} height={"95%"}>
          {selectedTab === 0 && (
            <>
              <Stack p={1} borderRadius={"14px"} width={"99%"}>
                <AddPhaseView
                  refetchChangeOrder={refetch}
                  projectId={id}
                  adminProjectView={true}
                  view={"Work Order"}
                  authUserRole={authUserRole.userRole}
                  selectedProjectData={selectedProjectData}
                />
              </Stack>
              <Box height="600px" bgcolor={"white"}>
                <TaskCalender
                  dailyForecast={dailyForecast}
                  eventsArr={events}
                  isProjectPage={true}
                  isDrawerOpen={true}
                />
              </Box>
            </>
          )}
        </Stack>

        {selectedTab === 1 && (
          <Stack justifyContent={"flex-start"}>
            <ProjectsChangeOrder
              workOrder={true}
              view={"Work Order Logs"}
              setChangeView={() => setSelectedTab(0)}
              data={data}
              refetch={refetch}
            />
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};

export default WorkOrderView;

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
