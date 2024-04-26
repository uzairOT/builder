import { Box, Paper, Stack,  } from "@mui/material";
import React, {  useState } from "react";
import AddPhaseView from "../../AssignProject/AddPhaseView/AddPhaseView";
import { useParams } from "react-router-dom";
import ProjectsChangeOrder from "../ProjectsChangeOrder/ProjectsChangeOrder";
import TaskCalender from "../../Task/Calender/TaskCalender";
import { useSelector } from "react-redux";
import { allEvents } from "../../../redux/slices/Events/eventsSlice";
import { getForecast } from "../../../redux/slices/DailyForecast/dailyForecastSlice";

const WorkOrderView = () => {
  const [changeView, setChangeView] = useState(false);
  const allEvent = useSelector(allEvents);
  const forecast = useSelector(getForecast);
  const events = allEvent.events;
  const dailyForecast = forecast.dailyForecast;
    const {id} = useParams();

  return (
    <Stack flex={1} pt={1} height={"100%"} >
      <Paper  style={{ ...themeStyle.borders, width: "99%", marginBottom:'4px', height: changeView ? '': '100%'}}>
        <Stack justifyContent={"flex-start"} height={"95%"}>
          {!changeView ? (
           <Stack height={{xl:'475px', lg:'450px', md:'450px', sm:'450px', xs:'400px'}}>
           <ProjectsChangeOrder workOrder={true} view={'Work Order'} setChangeView={setChangeView} />  
           <Box height={'inherit'}>
            <TaskCalender dailyForecast={dailyForecast} eventsArr={events} isProjectPage={true} isDrawerOpen={true} />
           </Box>
           </Stack>
          ) : (
            <>
             
              <Stack p={1} borderRadius={"14px"}>
                <AddPhaseView projectId={id} adminProjectView={true} view={'Work Order'} />
              </Stack>
              
            </>
          )}
        </Stack>
      </Paper>
    </Stack>
  );
};

export default WorkOrderView;

const themeStyle = {
  borders: {
    borderRadius: "14px",
  },
  border: {
    borderRadius: '14px'
  }
};



