import { Box, Paper, Stack,  } from "@mui/material";
import React, {  useState } from "react";
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

const WorkOrderView = () => {
  const [changeView, setChangeView] = useState(false);
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
  });
  const dailyForecast = forecast.dailyForecast;
    const {id} = useParams();
    
  const handleChangeView = () => {
    setChangeView(!changeView);
  }

  return (
      <Paper  style={{ ...themeStyle.borders, width: "99%", marginBottom:'4px', height: !changeView ? '': '100%'}}>
        <Box pt={1} pb={0}>

        <BuilderProButton
                  backgroundColor={"#4C8AB1"}
                  variant={"contained"}
                  fontFamily={"Inter, sans serif"}
                  fontSize={"16px"}
                  fontWeight={"600"}
                  padding={{md:"6px 32px 6px 32px"}}
                  marginLeft={'4px'}
                  handleOnClick={handleChangeView}
                  >
                  {changeView ? 'Request New Work Order' : 'View  Work Logs'}
                </BuilderProButton>
                  </Box>
    <Stack  pt={1} >
        <Stack justifyContent={"flex-start"} height={"95%"}>
          {changeView ? (
           <Stack >
           <Box height={{xl:'45vh', lg:'45vh', md:'45vh', sm:'45vh', xs:'45vh'}} bgcolor={'white'}>
            <TaskCalender dailyForecast={dailyForecast} eventsArr={events} isProjectPage={true} isDrawerOpen={true} />
           </Box>
           <ProjectsChangeOrder workOrder={true} view={'Work Order Logs'} setChangeView={setChangeView} data={data} refetch={refetch}/>  
           
           </Stack>
          ) : (
            <>
             
              <Stack p={1} borderRadius={"14px"}>
                <AddPhaseView refetchChangeOrder={refetch} projectId={id} adminProjectView={true} view={'Work Order'} />
              </Stack>
              
            </>
          )}
        </Stack>
    </Stack>
      </Paper>
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



