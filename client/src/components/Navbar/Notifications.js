import React, { useState } from "react";
import {
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
} from "@mui/material";
import BuilderProButton from "../UI/Button/BuilderProButton";
import { useUpdateRequestWorkOrderMutation } from "../../redux/apis/Project/workOrderApiSlice";
import NotificationDetailModal from "./NotificationDetailModal";
import { useGetWorkOrderDetailsMutation } from "../../redux/apis/Project/projectApiSlice";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../redux/slices/Events/eventsSlice";
import { getForecast } from "../../redux/slices/DailyForecast/dailyForecastSlice";
import { toggleWorkOrderDeclineRecall } from "../../redux/slices/Notifications/notificationSlice";
import { socket } from "../../socket";
import { toast } from "react-toastify";

function Notification({
  notification,
  refetch,
  userId,
  index,
  setExpanded,
  expanded,
}) {
  const [updateWorkOrder] = useUpdateRequestWorkOrderMutation();

  const [checkedRow, setCheckedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [data1, setData1] = useState(null);
  const [getWorkOrder, { isLoading, data }] = useGetWorkOrderDetailsMutation();
  const forecast = useSelector(getForecast);
  const dailyForecast = forecast.dailyForecast || [];
  const dispatch = useDispatch();
  const handleOnClick = async () => {
    const res = await getWorkOrder({
      workOrderId: notification.WorkOrderReq.id,
    });
    // console.log("after handleonclick", res);
    setData1(res.data);
    setOpen(true);
  };

  // console.log(notification);
  const handleAccordionChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : -1);
  };

  const handleAccept = async () => {
    try {
      await updateWorkOrder({
        workOrder_id: notification.workOrder_id,
        status: "approved",
      });
      await refetch(userId);
      dispatch(fetchEvents({ userId: userId, dailyForecast: dailyForecast }));
      toast.success("Work order approved sucessfully!");
      window.location.reload();

      // socket.emit('statusDoneNotification', {
      //   userId: userId,
      //   client:true,
      //   workOrderVersion: notification.WorkOrderReq.version,
      //   projectName: notification.projectName,
      //   projectId: notification?.WorkOrderReq?.phaseItems[0]?.Phase?.project_id,
      //   LineItem_id: notification?.WorkOrderReq?.phaseItems[0]?.LineItems[0]?.id,
      //   phaseId: notification?.WorkOrderReq?.phaseItems[0]?.phaseId,
      // }, (response) => {
      //   console.log(response.data);
      //   // dispatch(toggleWorkOrderDeclineRecall());
      // })
      // window.location.reload();
    } catch (err) {
      // console.log(err);
    }
  };

  const handleDecline = async () => {
    try {
      await updateWorkOrder({
        workOrder_id: notification.workOrder_id,
        status: "declined",
      });
      await refetch(userId);
      // socket.emit('statusDoneNotification', {
      //   userId: userId,
      //   client:true,
      //   workOrderVersion: parseInt(notification.WorkOrderReq.version)-9999,
      //   projectName: notification.projectName,
      //   projectId: notification?.WorkOrderReq?.phaseItems[0]?.Phase?.project_id,
      //   LineItem_id: notification?.WorkOrderReq?.phaseItems[0]?.LineItems[0]?.id,
      //   phaseId: notification?.WorkOrderReq?.phaseItems[0]?.phaseId,
      // }, (response) => {
      //   console.log(response.data);
      //   // dispatch(toggleWorkOrderDeclineRecall());
      // })
      dispatch(toggleWorkOrderDeclineRecall());
      toast.info("Work order declined sucessfully!");
      window.location.reload();

      // window.location.reload();
    } catch (err) {
      // console.log(err);
    }
  };
  const isExpanded = expanded === index;
  const handleModalClick = () => {};
  const rowCheckboxes = {
    phase: {
      id: 2,
      rows: [
        {
          id: 10,
          phase_id: 2,
          title: "Line1",
          description: "Lorem ipsum",
          unit: "sqft",
          // Add other properties as needed
        },
        {
          id: 11,
          phase_id: 2,
          title: "Line2",
          description: "Lorem ipsum",
          unit: "sqft",
          // Add other properties as needed
        },
        // Add more rows as needed
      ],
    },
  };
  // console.log(notification);
  return (
    <Accordion
      disableGutters
      expanded={isExpanded}
      onChange={handleAccordionChange(index)}
    >
      <AccordionSummary>
        <Stack>
          {index === 0 && (
            <Typography
              display={"block"}
              fontFamily={"var(--main-font-family)"}
              fontSize={"12px"}
              sx={{ textDecoration: "underline", fontWeight: "600" }}
            >
              Work/Change Order Notifications:
            </Typography>
          )}

          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Avatar
              src={`${notification.WorkOrderReq.User.image}`}
              alt="User Avatar"
            />
            <Typography
              fontFamily={"var(--main-font-family)"}
              fontSize={"12px"}
              fontWeight={700}
            >
              {notification.WorkOrderReq.User.firstName} &nbsp; &nbsp; &nbsp;
            </Typography>
            <Typography
              fontFamily={"var(--main-font-family)"}
              fontSize={"12px"}
            >
              Sent you a{" "}
              {notification.WorkOrderReq.changeOrder
                ? "change order request"
                : "work order request"}{" "}
              of project:
              <span style={{ fontWeight: 700 }}>
                {notification.projectName}{" "}
              </span>
            </Typography>
          </Stack>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ width: "100%" }}>
          <Divider />
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <List dense>
                <ListItem sx={listItemStyle}>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" sx={textStyle}>
                        Subject
                      </Typography>
                    }
                    secondaryTypographyProps={{ sx: textSecondaryStyle }}
                    secondary={notification.WorkOrderReq.subject}
                  />
                </ListItem>
                <ListItem sx={listItemStyle}>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" sx={textStyle}>
                        Description
                      </Typography>
                    }
                    secondaryTypographyProps={{ sx: textSecondaryStyle }}
                    secondary={notification.WorkOrderReq.description}
                  />
                </ListItem>
                <ListItem sx={listItemStyle}>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" sx={textStyle}>
                        Priority
                      </Typography>
                    }
                    secondaryTypographyProps={{ sx: textSecondaryStyle }}
                    secondary={notification.WorkOrderReq.priority}
                  />
                </ListItem>
                {/* <ListItem sx={listItemStyle}>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" sx={textStyle}>
                        Total
                      </Typography>
                    }
                    secondaryTypographyProps={{sx:textSecondaryStyle}}
                    secondary={notification.WorkOrderReq.total}
                  />
                </ListItem> */}
              </List>
            </Grid>
            <Grid item xs={6}>
              <List dense>
                <ListItem sx={listItemStyle}>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" sx={textStyle}>
                        Start
                      </Typography>
                    }
                    secondaryTypographyProps={{ sx: textSecondaryStyle }}
                    secondary={moment(
                      notification.WorkOrderReq.start_day
                    ).format("MM/DD/YYYY HH:mm a")}
                  />
                </ListItem>
                <ListItem sx={listItemStyle}>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" sx={textStyle}>
                        End
                      </Typography>
                    }
                    secondaryTypographyProps={{ sx: textSecondaryStyle }}
                    secondary={moment(notification.WorkOrderReq.end_day).format(
                      "MM/DD/YYYY HH:mm a"
                    )}
                  />
                </ListItem>
                <ListItem sx={listItemStyle}>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" sx={textStyle}>
                        Status
                      </Typography>
                    }
                    secondaryTypographyProps={{ sx: textSecondaryStyle }}
                    secondary={notification.WorkOrderReq.status}
                  />
                </ListItem>
                <ListItem sx={listItemStyle}>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" sx={textStyle}>
                        Notes
                      </Typography>
                    }
                    secondaryTypographyProps={{ sx: textSecondaryStyle }}
                    secondary={notification.WorkOrderReq.notes}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Stack direction={"row"} gap={1} p={1} alignItems={"center"}>
            <Stack direction={"row"} sx={{ height: "35px" }}>
              <BuilderProButton
                variant={"outlined"}
                backgroundColor={"#4C8AB1"}
                fontSize={"11px"}
                fontFamily={"var(--main-font-family)"}
                handleOnClick={handleDecline}
              >
                Decline
              </BuilderProButton>
              <BuilderProButton
                variant={"contained"}
                backgroundColor={"#4C8AB1"}
                fontSize={"11px"}
                fontFamily={"var(--main-font-family)"}
                marginLeft={"5px"}
                handleOnClick={handleAccept}
              >
                Approve
              </BuilderProButton>
              <BuilderProButton
                variant={"contained"}
                backgroundColor={"#4C8AB1"}
                fontSize={"11px"}
                fontFamily={"var(--main-font-family)"}
                marginLeft={"5px"}
                handleOnClick={() =>
                  handleOnClick(notification.WorkOrderReq.workOrderId)
                }
              >
                Detail
              </BuilderProButton>
              {open ? (
                <NotificationDetailModal
                  rowCheckboxes={rowCheckboxes}
                  checkedRow={checkedRow}
                  changeOrder={true}
                  notification={notification}
                  data1={data1}
                  open={open}
                  setOpen={setOpen}
                  handleOnClick={handleOnClick}
                />
              ) : (
                <></>
              )}
            </Stack>
          </Stack>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default Notification;

const listItemStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const textStyle = {
  fontFamily: "var(--main-font-family)",
  fontWeight: "bold",
  fontSize: "14px",
  width: { sm: "25ch", xs: "10ch" },
};
const textSecondaryStyle = {
  fontFamily: "var(--main-font-family)",
  fontSize: "14px",
  width: { sm: "25ch", xs: "10ch" },
  overflow: "hidden",
  textOverflow: "ellipsis",
};

/* 
import { Avatar, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import BuilderProButton from "../UI/Button/BuilderProButton";
import zIndex from "@mui/material/styles/zIndex";
import { useUpdateRequestWorkOrderMutation } from "../../redux/apis/Project/workOrderApiSlice";
function Notification({ notification, refetch, userId }) {
  const [updateWorkOrder] = useUpdateRequestWorkOrderMutation();
  const style = {
    border: "1px solid #ccc",
    borderRadius: "12px",
    padding: "0px",
    marginBottom: "1px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
  };
  const buttonStyle = {
    padding: "5px 10px",
    borderRadius: "3px",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  };
  const acceptButtonStyle = {
    ...buttonStyle,
    backgroundColor: "green",
  };
  const rejectButtonStyle = {
    ...buttonStyle,
    backgroundColor: "red",
  };


  const handleAccept = async () => {
      try{
        const res = await updateWorkOrder({workOrder_id: notification.workOrder_id, status: 'approved'});
        await refetch(userId)
      }catch (err) {
        console.log(err);
      }
  }
  const handleDecline = async () => {
    try{
      const res = await updateWorkOrder({workOrder_id: notification.workOrder_id, status: 'declined'});
      await refetch(userId)
    }catch (err) {
      console.log(err);
    }
  }
  console.log(notification);
 
  return (
    <div style={style}>
      <p></p>
      <div>
        <Typography sx={{fontFamily: 'var(--main-font-family)',}} p={1}>You have {notification.WorkOrderReq.version > 1 ? 'change order request':  'work order request'} of project: {notification.projectName}</Typography>
        <Divider />
        <Stack direction={"row"} gap={1} p={1} alignItems={'center'}>
          <Avatar src={`${notification.User.image}`} alt="User Avatar"></Avatar>
          <Stack>
            <Typography sx={{fontFamily: 'var(--main-font-family)',}}>{notification.User.firstName}</Typography>
          </Stack>
          <Stack direction={'row'} sx={{height:'35px'}}>
          <BuilderProButton
            variant={"outlined"}
            backgroundColor={"#4C8AB1"}
            fontSize={"11px"}
            fontFamily={'var(--main-font-family)'}
            handleOnClick={handleDecline}
          >
            Decline
          </BuilderProButton>
          <BuilderProButton
            variant={"contained"}
            backgroundColor={"#4C8AB1"}
            fontSize={"11px"}
            fontFamily={'var(--main-font-family)'}
            marginLeft={'5px'}
            handleOnClick={handleAccept}
            >
            Approve
          </BuilderProButton>
        </Stack>
        </Stack>
      </div>
    </div>
  );
}
export default Notification;

*/
