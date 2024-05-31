import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import BuilderProButton from "../UI/Button/BuilderProButton";
import { useUpdateTeamStatusNotificationsMutation } from "../../redux/apis/Project/workOrderApiSlice";

const TeamNotifications = ({ teamNotification, index, userId, refetch }) => {
  const [updateRead] = useUpdateTeamStatusNotificationsMutation();

  const handleMarkRead = async () => {
    try {
      const res = await updateRead(teamNotification.teamStatusNotificationId).unwrap().then(async()=>{
        await refetch();
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Accordion disableGutters>
        <AccordionSummary
          aria-controls="panel1-content"
          id="panel1-header"
          style={{ width: "100%" }}
        >
          <Stack>
            {index === 0 && (
              <Typography
                display={"block"}
                fontFamily={"inherit"}
                fontSize={"12px"}
                sx={{ textDecoration: "underline", fontWeight: "600" }}
              >
                Team Notifications:
              </Typography>
            )}
            <Stack
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {/* User Image (optional) */}
              {teamNotification.user?.image && (
                <Avatar src={teamNotification.user.image} alt="User Avatar" />
              )}
              <div style={{ marginLeft: "0px" }} className="notification-text">
                <Typography fontFamily={"inherit"} fontSize={"13px"}>
                  You have a notification for project{" "}
                  <b>{teamNotification.projectName}</b>
                </Typography>
              </div>
            </Stack>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Typography fontFamily={"inherit"} fontSize={"12px"}>
            <b>{teamNotification.user?.firstName}</b>(
            {teamNotification.user?.ProjectMembers[0]?.role}) completed the
            assigned task
          </Typography>
          <Typography fontFamily={"inherit"} fontSize={"12px"}>
            <b>{teamNotification.phase.LineItems[0]?.title || ""}</b> of phase{" "}
            <b>{teamNotification.phase.phase_name}</b>.
          </Typography>
          <Stack alignItems={"flex-end"}>
            <BuilderProButton
              variant={"contained"}
              backgroundColor={"#4C8AB1"}
              fontSize={"11px"}
              fontFamily={"Inter, sans serif"}
              marginLeft={"5px"}
              alignSelf={"right"}
              handleOnClick={handleMarkRead}
            >
              Mark as Read
            </BuilderProButton>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default TeamNotifications;
