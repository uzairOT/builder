import React, { useState } from "react";
import {
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Stack,
  Typography,
  TextField,
  Box,
} from "@mui/material";
import BuilderProButton from "../UI/Button/BuilderProButton";
import { useGetWorkOrderDetailsMutation } from "../../redux/apis/Project/projectApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { getForecast } from "../../redux/slices/DailyForecast/dailyForecastSlice";
import { socket } from "../../socket";
import {
  useApproveInitialPhasesMutation,
  useApprovePhaseMutation,
  useDeclineInitialPhasesMutation,
  useDeclinePhaseMutation,
} from "../../redux/apis/NotificationsApproval/NotificationApprovalApiSlice";

function ApprovalNotification({
  index,
  userId,
  setExpanded,
  expanded,
  notification,
  approvalRefetchCall,
}) {
  const [checkedRow, setCheckedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [data1, setData1] = useState(null);
  const [declineReason, setDeclineReason] = useState("");
  const [showReasonField, setShowReasonField] = useState(false);
  const [getWorkOrder, { isLoading }] = useGetWorkOrderDetailsMutation();

  const [approvePhases] = useApprovePhaseMutation();
  const [declinePhases] = useDeclinePhaseMutation();
  const [approveInitialPhases] = useApproveInitialPhasesMutation();
  const [declineInitialPhases] = useDeclineInitialPhasesMutation();

  const forecast = useSelector(getForecast);
  const dailyForecast = forecast.dailyForecast || [];
  const dispatch = useDispatch();

  // const handleOnClick = async () => {
  //   const res = await getWorkOrder({ workOrderId: notification.WorkOrderReq.id });
  //   setData1(res.data);
  //   setOpen(true);
  // };

  const handleAccordionChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : -1);
  };

  // const handleAccept = async () => {
  //   try {
  //     await updateWorkOrder({
  //       workOrder_id: notification.workOrder_id,
  //       status: "approved",
  //     });
  //     await refetch(userId);
  //     dispatch(fetchEvents({ userId: userId, dailyForecast: dailyForecast }));
  //   } catch (err) {
  //     // Handle error
  //   }
  // };

  const handleDecline = async () => {
    handleAccordionChange(notification.id); 
    setShowReasonField(true);
  };

  const handleSubmitReason = async () => {
    try {
      if (notification?.phaseId == null) {
        await declineInitialPhases({
          projectId: notification?.Project?.id,
          notes: declineReason,
          sendApprovalNotificationId: notification?.id,
        }).unwrap();
        approvalRefetchCall();
      } else {
        await declinePhases({
          phaseId: notification?.phaseId,
          projectId: notification?.Project?.id,
          notes: declineReason,
          sendApprovalNotificationId: notification?.id,
        }).unwrap();
        approvalRefetchCall();
      }
      setShowReasonField(false);
      setDeclineReason("");
    } catch (err) {
      console.error("Failed to submit reason:", err);
    }
  };

  const handleAccept = async () => {
    setExpanded(false); 
    try {
      setExpanded(false); 
      setShowReasonField(false); 
      if (notification?.phaseId == null) {
        await approveInitialPhases({
          projectId: notification?.projectId,
          sendApprovalNotificationId: notification?.id,
        }).unwrap();
      } else {
        await approvePhases({
          phaseId: notification?.phaseId,
          projectId: notification?.projectId,
          sendApprovalNotificationId: notification?.id,
        }).unwrap();
      }
      approvalRefetchCall();
   
    } catch (err) {
      console.error("Failed to accept:", err);
    }
  };
  

  return (
    <Accordion
      disableGutters
      // expanded={isExpanded}
      // onChange={handleAccordionChange(index)}
    
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
              Project Approval Notifications:
            </Typography>
          )}
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ gap: 1 }}
          >
            <Avatar src={notification.sentByUser.image} alt="User Avatar" />
            <Typography
              fontFamily={"var(--main-font-family)"}
              fontSize={"12px"}
              fontWeight={700}
            >
              <span>{notification?.sentByUser?.firstName} </span>{" "}
              <span>{notification?.sentByUser?.lastName}</span>
            </Typography>
            <Typography
              fontFamily={"var(--main-font-family)"}
              fontSize={"12px"}
            >
              Sent you Approval Request of project:
              <span style={{fontWeight:700}}>{notification?.Project?.projectName}</span>
            </Typography>
          </Stack>

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
                Accept
              </BuilderProButton>
            </Stack>
          </Stack>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ width: "100%" }}>
          <Divider />

          {showReasonField && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                fullWidth
                label="Reason for Disapproval"
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
              />
              <BuilderProButton
                variant={"contained"}
                backgroundColor={"#FFAC00"}
                fontSize={"11px"}
                fontFamily={"var(--main-font-family)"}
                handleOnClick={handleSubmitReason}
              >
                Submit
              </BuilderProButton>{" "}
            </Box>
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default ApprovalNotification;

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
