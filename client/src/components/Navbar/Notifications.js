import React from "react";
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

function Notification({ notification, refetch, userId, index, setExpanded, expanded }) {

  const [updateWorkOrder] = useUpdateRequestWorkOrderMutation();


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
    } catch (err) {
      console.log(err);
    }
  };

  const handleDecline = async () => {
    try {
      await updateWorkOrder({
        workOrder_id: notification.workOrder_id,
        status: "declined",
      });
      await refetch(userId);
    } catch (err) {
      console.log(err);
    }
  };
  const isExpanded = expanded === index;
  return (
    <Accordion
      disableGutters
      expanded={isExpanded}
      onChange={handleAccordionChange(index)}
    >
      <AccordionSummary>
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Avatar src={`${notification.WorkOrderReq.User.image}`} alt="User Avatar" />

          <Typography fontFamily={"inherit"} fontSize={"12px"}>
            {notification.WorkOrderReq.User.firstName} &nbsp;
          </Typography>

          <Typography fontFamily={"inherit"} fontSize={"12px"}>
            Sent you a{" "}
            {notification.WorkOrderReq.version > 1
              ? "change order request"
              : "work order request"}{" "}
            of project: {notification.projectName}
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ width: "100%" }}>
          <Divider />
          <Grid container spacing={1}>
      <Grid item xs={6}>
        <List dense>
          <ListItem style={listItemStyle}>
            <ListItemText
              primary={<Typography variant="subtitle1" style={textStyle}>Subject</Typography>}
              secondary={notification.WorkOrderReq.subject}
            />
          </ListItem>
          <ListItem style={listItemStyle}>
            <ListItemText
              primary={<Typography variant="subtitle1" style={textStyle}>Description</Typography>}
              secondary={notification.WorkOrderReq.description}
            />
          </ListItem>
          <ListItem style={listItemStyle}>
            <ListItemText
              primary={<Typography variant="subtitle1" style={textStyle}>Priority</Typography>}
              secondary={notification.WorkOrderReq.priority}
            />
          </ListItem>
          <ListItem style={listItemStyle}>
            <ListItemText
              primary={<Typography variant="subtitle1" style={textStyle}>Total</Typography>}
              secondary={notification.WorkOrderReq.total}
            />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={6}>
        <List dense>
          <ListItem style={listItemStyle}>
            <ListItemText
              primary={<Typography variant="subtitle1" style={textStyle}>Start</Typography>}
              secondary={notification.WorkOrderReq.start_day}
            />
          </ListItem>
          <ListItem style={listItemStyle}>
            <ListItemText
              primary={<Typography variant="subtitle1" style={textStyle}>End</Typography>}
              secondary={notification.WorkOrderReq.end_day}
            />
          </ListItem>
          <ListItem style={listItemStyle}>
            <ListItemText
              primary={<Typography variant="subtitle1" style={textStyle}>Status</Typography>}
              secondary={notification.WorkOrderReq.status}
            />
          </ListItem>
          <ListItem style={listItemStyle}>
            <ListItemText
              primary={<Typography variant="subtitle1" style={textStyle}>Notes</Typography>}
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
                fontFamily={"Inter, sans serif"}
                handleOnClick={handleDecline}
              >
                Decline
              </BuilderProButton>
              <BuilderProButton
                variant={"contained"}
                backgroundColor={"#4C8AB1"}
                fontSize={"11px"}
                fontFamily={"Inter, sans serif"}
                marginLeft={"5px"}
                handleOnClick={handleAccept}
              >
                Approve
              </BuilderProButton>
            </Stack>
          </Stack>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default Notification;

const listItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const textStyle = {
  fontFamily: 'inherit',
  fontWeight: 'bold',
  fontSize: '14px',
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
        <Typography sx={{fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',}} p={1}>You have {notification.WorkOrderReq.version > 1 ? 'change order request':  'work order request'} of project: {notification.projectName}</Typography>
        <Divider />
        <Stack direction={"row"} gap={1} p={1} alignItems={'center'}>
          <Avatar src={`${notification.User.image}`} alt="User Avatar"></Avatar>
          <Stack>
            <Typography sx={{fontFamily: 'GT-Walsheim-Regular-Trial, sans-serif',}}>{notification.User.firstName}</Typography>
          </Stack>
          <Stack direction={'row'} sx={{height:'35px'}}>
          <BuilderProButton
            variant={"outlined"}
            backgroundColor={"#4C8AB1"}
            fontSize={"11px"}
            fontFamily={"Inter, sans serif"}
            handleOnClick={handleDecline}
          >
            Decline
          </BuilderProButton>
          <BuilderProButton
            variant={"contained"}
            backgroundColor={"#4C8AB1"}
            fontSize={"11px"}
            fontFamily={"Inter, sans serif"}
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
