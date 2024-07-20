import { Box, Paper, Stack } from "@mui/material";
import React, { useState } from "react";
import ProjectsChangeOrder from "../../components/Projects/ProjectsChangeOrder/ProjectsChangeOrder";
import { useParams } from "react-router-dom";
import { useGetProjectChangeOrderQuery } from "../../redux/apis/Project/projectApiSlice";
import BuilderProButton from "../../components/UI/Button/BuilderProButton";
import TaskCalender from "../../components/Task/Calender/TaskCalender";
import AddPhaseView from "../../components/AssignProject/AddPhaseView/AddPhaseView";
import { useSelector } from "react-redux";
import { allEvents } from "../../redux/slices/Events/eventsSlice";
import { getForecast } from "../../redux/slices/DailyForecast/dailyForecastSlice";
import { getUserRoleFromRedux } from "../../redux/slices/auth/userRoleSlice";

const ChangeOrder = () => {
  const params = useParams();
  const { id: currentProjectId } = params;
  const [changeView, setChangeView] = useState(false);
  const currentUser = localStorage.getItem("userInfo");
  const user = JSON.parse(currentUser);
  const authUserRole= useSelector(getUserRoleFromRedux);
  const allEvent = useSelector(allEvents);
  const forecast = useSelector(getForecast);
  const events = allEvent.events;
  const dailyForecast = forecast.dailyForecast;
  const { data, refetch } = useGetProjectChangeOrderQuery({
    projectId: currentProjectId,
    userId: user.user.id,
    changeOrder: true,
  });
  const handleChangeView = () => {
    setChangeView(!changeView);
  };
  return (
    <Paper
      style={{
        ...themeStyle.borders,
        width: "99%",
        marginBottom: "4px",
        marginTop: "8px",
        height: !changeView ? "" : "100%",
        ...themeStyle.scrollable,
      }}
    >
      <Box pt={1} pl={1} pb={0}>
        <BuilderProButton
          backgroundColor={"#FFAC00"}
          variant={"contained"}
          fontFamily={"Inter, sans serif"}
          fontSize={{ xl: "16px", lg: 12, md: "16px", xs: "16px" }}
          fontWeight={"600"}
          padding={{ md: "6px 32px 6px 32px" }}
          marginLeft={"4px"}
          handleOnClick={handleChangeView}
        >
          {changeView ? "Submit Change Order" : "View Change Order Logs"}
        </BuilderProButton>
      </Box>
      <Stack pt={1} width={'inherit'}>
        <Stack justifyContent={"flex-start"} height={"95%"}>

      {changeView ? (<ProjectsChangeOrder data={data} refetch={refetch} />) : (<>
              <Box
                height= '600px'
                bgcolor={"white"}
              >
                <TaskCalender
                  dailyForecast={dailyForecast}
                  eventsArr={events}
                  isProjectPage={true}
                  isDrawerOpen={true}
                />
              </Box>
              <Stack p={1} borderRadius={"14px"} width={'99%'}>
                <AddPhaseView
                  refetchChangeOrder={refetch}
                  projectId={currentProjectId}
                  adminProjectView={true}
                  view={"Change Order"}
                  authUserRole={authUserRole.userRole}
                  changeOrderView={true}
                />
              </Stack>
            </>)}
        </Stack>
          </Stack>
    </Paper>
  );
};

export default ChangeOrder;

const themeStyle = {
  borders: {
    borderRadius: "14px",
  },
  scrollable: {
    scrollbarWidth: 'none',  // For Firefox
    '-ms-overflow-style': 'none',  // For IE and Edge
    '&::-webkit-scrollbar': {
      width: '6px'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'transparent',
      transition: 'background-color 0.3s',
    },
    '&:hover::-webkit-scrollbar-thumb': {
      backgroundColor: '#ddd',
    },
    overflowY: 'scroll'
  },
  border: {
    borderRadius: "14px",
  },
};
