import { Box, Paper, Stack } from "@mui/material";
import React, { useState } from "react";
import AddPhaseView from "../../AssignProject/AddPhaseView/AddPhaseView";
import { useParams } from "react-router-dom";
import ProjectsChangeOrder from "../ProjectsChangeOrder/ProjectsChangeOrder";
import TaskCalender from "../../Task/Calender/TaskCalender";
import { useSelector } from "react-redux";
import { allEvents } from "../../../redux/slices/Events/eventsSlice";
import { getForecast } from "../../../redux/slices/DailyForecast/dailyForecastSlice";
import { useGetProjectChangeOrderQuery } from "../../../redux/apis/Project/projectApiSlice";
import { ref } from "yup";
import BuilderProButton from "../../UI/Button/BuilderProButton";
import ProjectsInvoices from "./ProjectsInvoices";
import { getUserRoleFromRedux } from "../../../redux/slices/auth/userRoleSlice";

const ProjectInvoicesView = () => {
  const [changeView, setChangeView] = useState(false);
  const allEvent = useSelector(allEvents);
  const forecast = useSelector(getForecast);
  const userRole = useSelector(getUserRoleFromRedux);
  const events = allEvent.events;
  const params = useParams();
  const userRoleAuth = useSelector(getUserRoleFromRedux);
  console.log(userRoleAuth);
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

  const handleChangeView = () => {
    setChangeView(!changeView);
  };
  console.log(userRole)

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
          <Stack>
            <ProjectsInvoices
              // workOrder={true}
              // view={"Work Order Logs"}
              // setChangeView={setChangeView}
              // data={data}
              // refetch={refetch}
              // userRole={userRole}
              userRole={userRole}
                    workOrder={true}
                    view={"Work Order Logs"}
                    setChangeView={setChangeView}
                    data={data}
                    refetch={refetch}
            />
          </Stack>
        </>
      ) : (
        <>
          {" "}
          <Box pt={1} pl={1} pb={0}>
            <BuilderProButton
              backgroundColor={"#FFAC00"}
              variant={"contained"}
              fontFamily={"inherit"}
              fontSize={{xl:"16px", lg:"14px",md:"16px",xs:"16px",}}
              fontWeight={"600"}
              padding={{ md: "6px 32px 6px 32px" }}
              marginLeft={"4px"}
              handleOnClick={handleChangeView}
            >
              {changeView ? "Generate Invoice" : "View Invoice History"}
            </BuilderProButton>
          </Box>
          <Stack pt={1} width={"inherit"}>
            <Stack justifyContent={"flex-start"} height={"95%"}>
              {changeView ? (
                <Stack>
                  <ProjectsInvoices
                  userRole={userRole}
                    workOrder={true}
                    view={"Work Order Logs"}
                    setChangeView={setChangeView}
                    data={data}
                    refetch={refetch}
                  />
                </Stack>
              ) : (
                <>
                  <Stack p={1} borderRadius={"14px"} width={"99%"}>
                    <AddPhaseView
                      refetchChangeOrder={refetch}
                      projectId={id}
                      adminProjectView={true}
                      view={"Generate Invoice"}
                    />
                  </Stack>
                </>
              )}
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
