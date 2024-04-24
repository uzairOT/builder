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
