import { ButtonGroup, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import WorkOrder from "./WorkOrder";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import BuilderProButton from "../../UI/Button/BuilderProButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddPhaseView from "../../AssignProject/AddPhaseView/AddPhaseView";
import RequestWorkOrderModal from "../../dialogues/RequestWorkOrder/RequestWorkOrderModal";
import { useGetProjectWorkOrderQuery } from "../../../redux/apis/Project/projectApiSlice";
import { useGetRequestWorkOrderQuery } from "../../../redux/apis/Project/workOrderApiSlice";
import { useParams } from "react-router-dom";
import ProjectsChangeOrder from "../ProjectsChangeOrder/ProjectsChangeOrder";
import TaskCalender from "../../Task/Calender/TaskCalender";
import { useSelector } from "react-redux";
import { allEvents } from "../../../redux/slices/Events/eventsSlice";
import { getForecast } from "../../../redux/slices/DailyForecast/dailyForecastSlice";

const WorkOrderView = () => {
  const [changeView, setChangeView] = useState(false);
  const [checkedRow, setCheckedRow] = useState(null);
  const allEvent = useSelector(allEvents);
  const forecast = useSelector(getForecast);
  const events = allEvent.events;
  const dailyForecast = forecast.dailyForecast;
  const {data} = useGetProjectWorkOrderQuery();
  //console.log(data)
    //console.log(checkedRow)
    const {id} = useParams();
    const getUserIdFromLocalStorage = () => {
      const userData = localStorage.getItem('user');
      if(userData){
        const user = JSON.parse(userData);
        const userId = user.id;
        //console.log(userId)
        return{ userId: userId}
      } else{
        return null;
      }
    }
    const {requestWorkOrderData} = useGetRequestWorkOrderQuery(getUserIdFromLocalStorage());
  return (
    <Stack flex={1} pt={1} height={"100%"} >
      <Paper style={{ ...themeStyle.borders, width: "99%", marginBottom:'4px' }}>
        <Stack justifyContent={"space-between"} height={"95%"}>
          {!changeView ? (
           <Stack height={'500px'}>
           <ProjectsChangeOrder workOrder={true} setChangeView={setChangeView} />  
           <Paper style={{ ...themeStyle.border, height: '91%' }}>
            <TaskCalender dailyForecast={dailyForecast} eventsArr={events} isProjectPage={true} isDrawerOpen={true} />
            </Paper>
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
    padding: "8px",
  },
  border: {
    borderRadius: '14px'
  }
};



