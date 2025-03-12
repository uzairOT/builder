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
import { useTranslation } from "react-i18next";

const TeamNotifications = ({ teamNotification, index, userId, refetch }) => {
  const { t } = useTranslation();
  const [updateRead] = useUpdateTeamStatusNotificationsMutation();

  const handleMarkRead = async () => {
    try {
      const res = await updateRead(teamNotification.teamStatusNotificationId)
        .unwrap()
        .then(async () => {
          await refetch();
        });
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(teamNotification);
  return (
    <>
      <Accordion disableGutters>
        {teamNotification?.client ? (
          <>
            <AccordionSummary
              aria-controls="panel1-content"
              id="panel1-header"
              style={{ width: "100%" }}
            >
              <Stack>
                {index === 0 && (
                  <Typography
                    display={"block"}
                    fontFamily={"var(--main-font-family)"}
                    fontSize={"12px"}
                    sx={{ textDecoration: "underline", fontWeight: "600" }}
                  >
                    {t("TeamNotifications.title")}:
                  </Typography>
                )}
                <Stack
                  direction={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  {/* User Image (optional) */}
                  {teamNotification.user?.image && (
                    <Avatar
                      src={teamNotification.user.image}
                      alt="User Avatar"
                    />
                  )}
                  <div
                    style={{ marginLeft: "0px" }}
                    className="notification-text"
                  >
                    <Typography
                      fontFamily={"var(--main-font-family)"}
                      fontSize={"13px"}
                    >
                      {t("TeamNotifications.body")}{" "}
                      <b>{teamNotification.projectName}</b>
                    </Typography>
                  </div>
                </Stack>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Typography fontFamily="var(--main-font-family)" fontSize="12px">
                <b>{teamNotification.user?.firstName}</b>
                ({teamNotification.user?.ProjectMembers[0]?.role})
                {teamNotification?.workOrderVersion < 0 ? t("TeamNotifications.declined") : t("TeamNotifications.approved")}
                {teamNotification?.workOrderVersion > 1 ? t("TeamNotifications.changeOrder") : t("TeamNotifications.workOrder")}
              </Typography>
              <Stack alignItems={"flex-end"}>
                <BuilderProButton
                  variant={"contained"}
                  backgroundColor={"#4C8AB1"}
                  fontSize={"11px"}
                  fontFamily={"var(--main-font-family)"}
                  marginLeft={"5px"}
                  alignSelf={"right"}
                  handleOnClick={handleMarkRead}
                >
                  {t("TeamNotifications.button")}
                </BuilderProButton>
              </Stack>
            </AccordionDetails>
          </>
        ) : (
          <>
            <AccordionSummary
              aria-controls="panel1-content"
              id="panel1-header"
              style={{ width: "100%" }}
            >
              <Stack>
                {index === 0 && (
                  <Typography
                    display={"block"}
                    fontFamily={"var(--main-font-family)"}
                    fontSize={"12px"}
                    sx={{ textDecoration: "underline", fontWeight: "600" }}
                  >
                    {t("TeamNotifications.title")}:
                  </Typography>
                )}
                <Stack
                  direction={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  {/* User Image (optional) */}
                  {teamNotification.user?.image && (
                    <Avatar
                      src={teamNotification.user.image}
                      alt="User Avatar"
                    />
                  )}
                  <div
                    style={{ marginLeft: "0px" }}
                    className="notification-text"
                  >
                    <Typography
                      fontFamily={"var(--main-font-family)"}
                      fontSize={"13px"}
                    >
                      {t("TeamNotifications.title")}{" "}
                      <b>{teamNotification.projectName}</b>
                    </Typography>
                  </div>
                </Stack>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                fontFamily={"var(--main-font-family)"}
                fontSize={"12px"}
              >
                <b>{teamNotification.user?.firstName}</b>(
                {t(`ProjectTeam.role.${teamNotification.user?.ProjectMembers[0]?.role}`)}) {t("TeamNotifications.body2")}
              </Typography>
              <Typography
                fontFamily={"var(--main-font-family)"}
                fontSize={"12px"}
              >
                <b>{teamNotification?.phase?.LineItems[0]?.title || ""}</b> {t("TeamNotifications.body3")}
                <b>{teamNotification?.phase.phase_name}</b>.
              </Typography>
              <Stack alignItems={"flex-end"}>
                <BuilderProButton
                  variant={"contained"}
                  backgroundColor={"#4C8AB1"}
                  fontSize={"11px"}
                  fontFamily={"var(--main-font-family)"}
                  marginLeft={"5px"}
                  alignSelf={"right"}
                  handleOnClick={handleMarkRead}
                >
                  {t("TeamNotifications.button")}
                </BuilderProButton>
              </Stack>
            </AccordionDetails>
          </>
        )}
      </Accordion>
    </>
  );
};

export default TeamNotifications;
