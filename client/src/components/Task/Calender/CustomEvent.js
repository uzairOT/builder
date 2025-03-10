import {
  Box,
  CircularProgress,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PartlySunny from "./assets/partly-cloudy.png";
import moment from "moment";
import ScheduleIcon from "@mui/icons-material/Schedule";
import NotificationDetailModal from "../../Navbar/NotificationDetailModal";
import { useGetWorkOrderDetailsMutation } from "../../../redux/apis/Project/projectApiSlice";
import { useParams } from "react-router-dom";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import { useSelector } from "react-redux";
import { getTempUnit } from "../../../redux/slices/DailyForecast/dailyForecastSlice";
import { getWeatherIcon } from "../../../utils/weatherFunctions";
import { useTranslation } from "react-i18next";
import getContrastColor from "../../../utils/ColorContrast/getContrastColor";

const CustomEventDayTasks = ({ event, isProjectPage }) => {
  const { id } = useParams();
  const projectId = id;
  const {t} = useTranslation();
  const temperatureUnit = useSelector(getTempUnit)
  const tempUnit = temperatureUnit === 'imperial' ? 'F' : 'C'
  let temperature = event?.data?.weather?.temp ? event?.data?.weather?.temp : 'N/A'
  if(temperatureUnit === 'imperial' && temperature !== 'N/A'){
    temperature = ((temperature * 9/5) + 32).toFixed(2);
  }
  const formattedTemperature = temperature !== 'N/A' ? `${temperature}°${tempUnit}` :'N/A';
  const [getWorkOrder, { isLoading }] = useGetWorkOrderDetailsMutation({
    workOrderId: event?.data?.workOrderId,
  });
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const handleOnClick = async () => {
    const res = await getWorkOrder({ workOrderId: event?.data?.workOrderId });
    setData(res.data);
    setOpen(true);
  };

  return (
    <>
      {isProjectPage ? (
        projectId === event.data.projectId && (
          <>
            <Stack
              sx={themeStyle.eventBox}
              width={"176px"}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              height={"inherit"}
              spacing={0.2}
              borderRadius={"6px"}
              borderRight={`6px solid ${event?.data?.projectColor}`}
              onClick={handleOnClick}
            >
              <Stack
                sx={themeStyle.weather}
                backgroundColor={`${event?.data?.projectColor}`}
                max-height={"90%"}
                max-width={"50%"}
                alignItems={"center"}
                justifyContent={"center"}
                flex={1}
                gap={"2px"}
              >
                {isLoading ? (
                  <Box p={1.75}>
                    <CircularProgress size={"20px"} />
                  </Box>
                ) : (
                  <>
                    {" "}
                    <Typography sx={themeStyle.eventText(event?.data?.projectColor)} fontSize={"10px"}>
                      {formattedTemperature}
                    </Typography>
                    <img
                      src={getWeatherIcon(event?.data?.weather?.description)}
                      alt={PartlySunny}
                      style={themeStyle.eventIcon}
                      fontSize={"10px"}
                    ></img>
                    
                    <Typography sx={themeStyle.eventText(event?.data?.projectColor)} fontSize={"10px"}>
                      {event?.data?.weather?.description}
                    </Typography>
                  
                  </>
                )}
              </Stack>
              <Stack
                height={"inherit"}
                pl={0.5}
                flex={2}
                justifyContent={"center"}
              >
                <Typography
                  sx={themeStyle.eventTask}
                  fontSize={"10px"}
                  fontStyle={"italic"}
                  color={"#454545"}
                  fontWeight={"300"}
                >
                  {t('CustomEvent.title1')}
                </Typography>
                <Typography
                  sx={themeStyle.eventTask}
                  fontSize={"10px"}
                  overflow={"hidden"}
                  fontWeight={"500"}
                >
                  {event?.data?.task}
                </Typography>
              </Stack>
              <Stack alignItems={"end"} justifyContent={"end"}>
                {event?.data?.priority === "urgent" && (
                  <FlagOutlinedIcon
                    sx={{ color: "#EB1717", fontSize: "14px" }}
                  />
                )}
              </Stack>
            </Stack>
            {data === null ? (
              <></>
            ) : (
              <NotificationDetailModal
                changeOrder={true}
                notification={data}
                isEvent={true}
                open={open}
                setOpen={setOpen}
              />
            )}
          </>
        )
      ) : (
        <>
          <Stack
            sx={themeStyle.eventBox}
            width={"176px"}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            height={"inherit"}
            spacing={0.2}
            borderRadius={"6px"}
            borderRight={`6px solid ${event?.data?.projectColor}`}
            onClick={handleOnClick}
          >
            <Stack
              sx={themeStyle.weather}
              backgroundColor={`${event?.data?.projectColor}`}
              max-height={"90%"}
              max-width={"50%"}
              alignItems={"center"}
              justifyContent={"center"}
              flex={1}
              gap={"2px"}
            >
              {isLoading ? (
                <Box p={1.75}>
                  <CircularProgress size={"20px"} />
                </Box>
              ) : (
                <>
                  <Typography sx={themeStyle.eventText(event?.data?.projectColor)} fontSize={"10px"}>
                    {formattedTemperature}
                  </Typography>
                  <img
                    src={getWeatherIcon(event?.data?.weather?.description)}
                    alt={PartlySunny}
                    style={themeStyle.eventIcon}
                    fontSize={"10px"}
                  ></img>
                  <Typography sx={themeStyle.eventText(event?.data?.projectColor)} fontSize={"10px"}>
                    {event?.data?.weather?.description}
                  </Typography>
                </>
              )}
            </Stack>
            <Stack
              height={"inherit"}
              pl={0.5}
              flex={2}
              justifyContent={"center"}
            >
              <Typography
                sx={themeStyle.eventTask}
                fontSize={"10px"}
                fontStyle={"italic"}
                color={"#454545"}
                fontWeight={"300"}
              >
                {t('CustomEvent.title1')}
              </Typography>
              <Typography
                sx={themeStyle.eventTask}
                fontSize={"10px"}
                overflow={"hidden"}
                fontWeight={"500"}
              >
                {event?.data?.task}
              </Typography>
            </Stack>
            <Stack alignItems={"end"} justifyContent={"end"}>
              {event?.data?.priority === "urgent" && (
                <FlagOutlinedIcon sx={{ color: "#EB1717", fontSize: "14px" }} />
              )}
            </Stack>
          </Stack>
          {data === null ? (
            <></>
          ) : (
            <NotificationDetailModal
              changeOrder={true}
              notification={data}
              isEvent={true}
              open={open}
              setOpen={setOpen}
            />
          )}
        </>
      )}
    </>
  );
};
const CustomEventDayNotes = ({ event, isProjectPage }) => {
  const { id } = useParams();
  const projectId = id;
  const {t} = useTranslation();
  const temperatureUnit = useSelector(getTempUnit)
  const tempUnit = temperatureUnit === 'imperial' ? 'F' : 'C'
  let temperature = event?.data?.weather?.temp ? event?.data?.weather?.temp : 'N/A'
  if(temperatureUnit === 'imperial'  && temperature !== 'N/A'){
    temperature = ((temperature * 9/5) + 32).toFixed(2);
  }
  const formattedTemperature = temperature !== 'N/A' ? `${temperature}°${tempUnit}` :'N/A';
  const [getWorkOrder, { isLoading }] = useGetWorkOrderDetailsMutation({
    workOrderId: event?.data?.workOrderId,
  });
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const handleOnClick = async () => {
    const res = await getWorkOrder({ workOrderId: event?.data?.workOrderId });
    setData(res.data);
    setOpen(true);
  };

  return (
    <>
      {isProjectPage ? (
        projectId === event.data.projectId && (
          <>
            <Stack
              sx={themeStyle.eventBox}
              width={"176px"}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              height={"100%"}
              spacing={0.2}
              borderRadius={"6px"}
              borderRight={`6px solid ${event?.data?.projectColor}`}
              onClick={handleOnClick}
            >
              <Stack
                sx={themeStyle.weather}
                backgroundColor={`${event?.data?.projectColor}`}
                max-height={"90%"}
                max-width={"50%"}
                alignItems={"center"}
                justifyContent={"center"}
                flex={1}
                gap={"2px"}
              >
                {isLoading ? (
                  <Box p={1.75}>
                    <CircularProgress size={"20px"} />
                  </Box>
                ) : (
                  <>
                    <Typography sx={themeStyle.eventText(event?.data?.projectColor)} fontSize={"10px"}>
                      {formattedTemperature}
                    </Typography>
                    <img
                      src={getWeatherIcon(event?.data?.weather?.description)}
                      alt={PartlySunny}
                      style={themeStyle.eventIcon}
                      fontSize={"10px"}
                    ></img>
                    <Typography sx={themeStyle.eventText(event?.data?.projectColor)} fontSize={"10px"}>
                      {event?.data?.weather?.description}
                    </Typography>
                  </>
                )}
              </Stack>
              <Stack flex={2} pl={0.5} justifyContent={"flex-start"}>
                <Typography
                  sx={themeStyle.eventTask}
                  fontSize={"10px"}
                  fontStyle={"italic"}
                  color={"#454545"}
                  fontWeight={"300"}
                >
                  {t('CustomEvent.title2')}
                </Typography>
                <Typography
                  sx={{ ...themeStyle.eventNote, ...themeStyle.scrollable }}
                  fontSize={"10px"}
                  maxHeight={"45px"}
                  fontWeight={"500"}
                >
                  {event.data.note ? event?.data?.note : "No notes added..."}
                </Typography>
              </Stack>
              <Stack alignItems={"end"} justifyContent={"end"}>
                {event?.data?.priority === "urgent" && (
                  <FlagOutlinedIcon
                    sx={{ color: "#EB1717", fontSize: "14px" }}
                  />
                )}
              </Stack>
            </Stack>
            {data === null ? (
              <></>
            ) : (
              <NotificationDetailModal
                changeOrder={true}
                notification={data}
                isEvent={true}
                open={open}
                setOpen={setOpen}
              />
            )}
          </>
        )
      ) : (
        <>
          <Stack
            sx={themeStyle.eventBox}
            width={"176px"}
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            height={"100%"}
            spacing={0.2}
            borderRadius={"6px"}
            borderRight={`6px solid ${event?.data?.projectColor}`}
            onClick={handleOnClick}
          >
            <Stack
              sx={themeStyle.weather}
              backgroundColor={`${event?.data?.projectColor}`}
              max-height={"90%"}
              max-width={"50%"}
              alignItems={"center"}
              justifyContent={"center"}
              flex={1}
              gap={"2px"}
            >
              {isLoading ? (
                <Box p={1.75}>
                  <CircularProgress size={"20px"} />
                </Box>
              ) : (
                <>
                  <Typography sx={themeStyle.eventText(event?.data?.projectColor)} fontSize={"10px"}>
                    {formattedTemperature}
                  </Typography>
                  <img
                    src={getWeatherIcon(event?.data?.weather?.description)}
                    alt={PartlySunny}
                    style={themeStyle.eventIcon}
                    fontSize={"10px"}
                  ></img>
                  <Typography sx={themeStyle.eventText(event?.data?.projectColor)} fontSize={"10px"}>
                    {event?.data?.weather?.description}
                  </Typography>
                </>
              )}
            </Stack>
            <Stack flex={2} pl={0.5} justifyContent={"flex-start"}>
              <Typography
                sx={themeStyle.eventTask}
                fontSize={"10px"}
                fontStyle={"italic"}
                color={"#454545"}
                fontWeight={"300"}
              >
                {t('CustomEvent.title2')}
              </Typography>
              <Typography
                sx={{ ...themeStyle.eventNote, ...themeStyle.scrollable }}
                fontSize={"10px"}
                maxHeight={"45px"}
                fontWeight={"500"}
              >
                {event.data.note ? event?.data?.note : "No notes added..."}
              </Typography>
            </Stack>
            <Stack alignItems={"end"} justifyContent={"end"}>
              {event?.data?.priority === "urgent" && (
                <FlagOutlinedIcon sx={{ color: "#EB1717", fontSize: "14px" }} />
              )}
            </Stack>
          </Stack>
          {data === null ? (
            <></>
          ) : (
            <NotificationDetailModal
              changeOrder={true}
              notification={data}
              isEvent={true}
              open={open}
              setOpen={setOpen}
            />
          )}
        </>
      )}
    </>
  );
};
const CustomEventWeek = ({ event, isProjectPage }) => {
  const { id } = useParams();
  const projectId = id;
  const [getWorkOrder, { isLoading }] = useGetWorkOrderDetailsMutation({
    workOrderId: event?.data?.workOrderId,
  });
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const handleOnClick = async () => {
    const res = await getWorkOrder({ workOrderId: event?.data?.workOrderId });
    setData(res.data);
    setOpen(true);
  };
  return (
    <>
      {isProjectPage ? (
        projectId === event.data.projectId && (
          <>
            <Stack
              sx={themeStyle.eventBox}
              height={"100%"}
              borderRight={`6px solid ${event?.data?.projectColor}`}
              borderRadius={"6px"}
              onClick={handleOnClick}
            >
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                pl={0.5}
              >
                <Box>
                  {isLoading ? (
                    <>
                      <CircularProgress size={"20px"} />
                    </>
                  ) : (
                    <Typography
                      height={"30px"}
                      width={"40px"}
                      sx={themeStyle.eventTask}
                      textOverflow={"ellipsis"}
                      overflow={"hidden"}
                      fontSize={"7px"}
                    >
                      {event?.data?.task}
                    </Typography>
                  )}
                </Box>
                <Box width={"fit-content"}>
                  <img
                    src={getWeatherIcon(event?.data?.weather?.description)}
                    alt={PartlySunny}
                    width={"fit-content"}
                    style={themeStyle.eventIcon}
                    fontSize={"10px"}
                  ></img>
                </Box>
              </Stack>
              <Box pl={0.5}>
                <Typography fontSize={"7px"} height={"40px"} width={"100%"}>
                  {!event.data.note ? "No notes added..." : event?.data?.note}
                </Typography>
              </Box>
            </Stack>
            {data === null ? (
              <></>
            ) : (
              <NotificationDetailModal
                changeOrder={true}
                notification={data}
                isEvent={true}
                open={open}
                setOpen={setOpen}
              />
            )}
          </>
        )
      ) : (
        <>
          <Stack
            sx={themeStyle.eventBox}
            height={"100%"}
            borderRight={`6px solid ${event?.data?.projectColor}`}
            borderRadius={"6px"}
            onClick={handleOnClick}
          >
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              pl={0.5}
            >
              <Box>
                {isLoading ? (
                  <>
                    <CircularProgress size={"20px"} />
                  </>
                ) : (
                  <Typography
                    height={"30px"}
                    width={"40px"}
                    sx={themeStyle.eventTask}
                    textOverflow={"ellipsis"}
                    overflow={"hidden"}
                    fontSize={"7px"}
                  >
                    {event?.data?.task}
                  </Typography>
                )}
              </Box>
              <Box width={"fit-content"}>
                <img
                  src={getWeatherIcon(event?.data?.weather?.description)}
                  alt={PartlySunny}
                  width={"fit-content"}
                  style={themeStyle.eventIcon}
                  fontSize={"10px"}
                ></img>
              </Box>
            </Stack>
            <Box pl={0.5}>
              <Typography fontSize={"7px"} height={"40px"} width={"100%"}>
                {!event.data.note ? "No notes added..." : event?.data?.note}
              </Typography>
            </Box>
            <Stack alignItems={"end"} justifyContent={"end"}>
              {event?.data?.priority === "urgent" && (
                <FlagOutlinedIcon sx={{ color: "#EB1717", fontSize: "14px" }} />
              )}
            </Stack>
          </Stack>
          {data === null ? (
            <></>
          ) : (
            <NotificationDetailModal
              changeOrder={true}
              notification={data}
              isEvent={true}
              open={open}
              setOpen={setOpen}
            />
          )}
        </>
      )}
    </>
  );
};

const CustomEventWeekOnModal = ({ event, isProjectPage }) => {
  const { id } = useParams();
  const {t} = useTranslation();
  const projectId = id;
  const start = moment(event.start).format("HH:mm");
  const end = moment(event.end).format("HH:mm");
  const temperatureUnit = useSelector(getTempUnit)
  const tempUnit = temperatureUnit === 'imperial' ? 'F' : 'C'
  let temperature = event?.data?.weather?.temp ? event?.data?.weather?.temp : 'N/A'
  if(temperatureUnit === 'imperial'  && temperature !== 'N/A'){
    temperature = ((temperature * 9/5) + 32).toFixed(2);
  }
  const formattedTemperature = temperature !== 'N/A' ? `${temperature}°${tempUnit}` :'N/A';
  const [getWorkOrder, { isLoading }] = useGetWorkOrderDetailsMutation({
    workOrderId: event?.data?.workOrderId,
  });
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const handleOnClick = async () => {
    const res = await getWorkOrder({ workOrderId: event?.data?.workOrderId });
    setData(res.data);
    setOpen(true);
  };
  return (
    <>
      {isProjectPage ? (
        projectId === event.data.projectId && (
          <>
            <Stack
              sx={themeStyle.eventBox}
              borderRight={`6px solid ${event?.data?.projectColor}`}
              borderRadius={"6px"}
              height={"100%"}
              onClick={handleOnClick}
            >
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                pl={1}
                pr={1}
                flex={1}
              >
                <Box flex={1}>
                  {isLoading ? (
                    <>
                      <CircularProgress size={"20px"} />
                    </>
                  ) : (
                    <Typography
                      sx={themeStyle.eventTask}
                      textOverflow={"ellipsis"}
                      fontSize={"8px"}
                      overflow={"hidden"}
                    >
                      {event?.data?.task}
                    </Typography>
                  )}
                </Box>
                <Stack
                  flex={1}
                  direction={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  spacing={0}
                >
                  <ScheduleIcon
                    fontSize="6px"
                    sx={{
                      color:
                        event?.data?.priority === "urgent"
                          ? "#EB1717"
                          : "#1C1C1C",
                    }}
                    fontWeight={"200"}
                  ></ScheduleIcon>
                  <Typography
                    color={
                      event?.data?.priority === "urgent" ? "#EB1717" : "#1C1C1C"
                    }
                    textOverflow={"ellipsis"}
                    height={"100%"}
                    fontSize={"9px"}
                    overflow={"hidden"}
                    textAlign={"center"}
                    fontWeight={"300"}
                  >
                    {`${start}-${end}`}
                  </Typography>
                </Stack>
                <Box>
                  <img
                    src={getWeatherIcon(event?.data?.weather?.description)}
                    alt={PartlySunny}
                    style={themeStyle.eventIcon}
                    fontSize={"8px"}
                  ></img>
                </Box>
              </Stack>
              <Stack direction={"row"} pl={1} pr={1} flex={1}>
                <Box flex={1} alignSelf={"flex-end"} height={"100%"}>
                  <Typography
                    sx={themeStyle.eventNote}
                    height={"40px"}
                    width={"100%"}
                    pt={1}
                    textOverflow={"ellipsis"}
                    fontSize={"6px"}
                  >{`${t('CustomEvent.title2')} ${event?.data?.note}`}</Typography>
                </Box>
                <Box flex={1} textAlign={"right"}>
                  <Typography
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    fontSize={"10px"}
                  >{`${event?.data?.weather?.description ? event?.data?.weather?.description : ''}`}</Typography>
                  <Typography fontSize={"12px"}>
                    {" "}
                    {formattedTemperature}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
            {data === null ? (
              <></>
            ) : (
              <NotificationDetailModal
                changeOrder={true}
                notification={data}
                isEvent={true}
                open={open}
                setOpen={setOpen}
              />
            )}
          </>
        )
      ) : (
        <>
          <Stack
            sx={themeStyle.eventBox}
            borderRight={`6px solid ${event?.data?.projectColor}`}
            borderRadius={"6px"}
            height={"100%"}
            onClick={handleOnClick}
          >
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              pl={1}
              pr={1}
              flex={1}
            >
              <Box flex={1}>
                {isLoading ? (
                  <>
                    <CircularProgress size={"20px"} />
                  </>
                ) : (
                  <Typography
                    sx={themeStyle.eventTask}
                    textOverflow={"ellipsis"}
                    fontSize={"8px"}
                    overflow={"hidden"}
                  >
                    {event?.data?.task}
                  </Typography>
                )}
              </Box>
              <Stack
                flex={1}
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={0}
              >
                <ScheduleIcon
                  fontSize="6px"
                  sx={{
                    color:
                      event?.data?.priority === "urgent"
                        ? "#EB1717"
                        : "#1C1C1C",
                  }}
                  fontWeight={"200"}
                ></ScheduleIcon>
                <Typography
                  color={
                    event?.data?.priority === "urgent" ? "#EB1717" : "#1C1C1C"
                  }
                  textOverflow={"ellipsis"}
                  height={"100%"}
                  fontSize={"9px"}
                  overflow={"hidden"}
                  textAlign={"center"}
                  fontWeight={"300"}
                >
                  {`${start}-${end}`}
                </Typography>
              </Stack>
              <Box>
                <img
                  src={getWeatherIcon(event?.data?.weather?.description)}
                  alt={PartlySunny}
                  style={themeStyle.eventIcon}
                  fontSize={"8px"}
                ></img>
              </Box>
            </Stack>
            <Stack direction={"row"} pl={1} pr={1} flex={1}>
              <Box flex={1} alignSelf={"flex-end"} height={"100%"}>
                <Typography
                  sx={themeStyle.eventNote}
                  height={"40px"}
                  width={"100%"}
                  pt={1}
                  textOverflow={"ellipsis"}
                  fontSize={"6px"}
                >{`${t('CustomEvent.title2')} ${event?.data?.note}`}</Typography>
              </Box>
              <Box flex={1} textAlign={"right"}>
                <Typography
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  fontSize={"10px"}
                >{`${event?.data?.weather?.description ? event?.data?.weather?.description : ''}`}</Typography>
                <Typography fontSize={"12px"}>
                  {" "}
                  {formattedTemperature}
                </Typography>
              </Box>
            </Stack>
          </Stack>
          {data === null ? (
            <></>
          ) : (
            <NotificationDetailModal
              changeOrder={true}
              notification={data}
              isEvent={true}
              open={open}
              setOpen={setOpen}
            />
          )}
        </>
      )}
    </>
  );
};

const CustomEventMonthTasks = ({ event, isProjectPage, projectId }) => {
  const start = moment(event.start).format("HH:mm");
  const end = moment(event.end).format("HH:mm");
  const [getWorkOrder, { isLoading }] = useGetWorkOrderDetailsMutation({
    workOrderId: event?.data?.workOrderId,
  });
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const handleOnClick = async () => {
    const res = await getWorkOrder({ workOrderId: event?.data?.workOrderId });
    setData(res.data);
    setOpen(true);
  };
  return (
    <>
      {isProjectPage ? (
        projectId === event.data.projectId && (
          <>
            <Box
              sx={{ background: event?.data?.projectColor }}
              height={"100%"}
              onClick={handleOnClick}
              borderRadius={"6px 0px 0px 6px"}
            >
              {isLoading ? (
                <>
                  <Skeleton
                    sx={{
                      bgcolor: `rgba(${event?.data?.projectColor}, 0.6)`, // Set background color dynamically
                      animation: "wave 1s infinite", // Make the wave animation more prominent and continuous
                    }}
                    animation="wave"
                    variant="rectangle"
                  ></Skeleton>
                </>
              ) : (
                <Stack direction={"row"} justifyContent={"space-between"} >
                  <Typography fontSize={"12px"} color={getContrastColor(event?.data?.projectColor)} overflow={'hidden'} textOverflow={'ellipsis'}  maxWidth={"calc(100% - 16px)" } ml={'8px'}>
                    {event?.data?.task}
                  </Typography>
                  <Stack alignItems={"end"} justifyContent={"end"}>
                    {event?.data?.priority !== "urgent" && (
                      <Tooltip title="Status: urgent">
                      <FlagOutlinedIcon
                        sx={{ color: getContrastColor(event?.data?.projectColor), fontSize: "14px" }}
                        />
                      </Tooltip>
                    )}
                  </Stack>
                </Stack>
              )}
            </Box>
            {data === null ? (
              <></>
            ) : (
              <NotificationDetailModal
                changeOrder={true}
                notification={data}
                isEvent={true}
                open={open}
                setOpen={setOpen}
              />
            )}
          </>
        )
      ) : (
        <>
          <Box
            sx={{ background: event?.data?.projectColor }}
            height={"100%"}
            onClick={handleOnClick}
            borderRadius={"6px 0px 0px 6px"}
          >
            {isLoading ? (
              <>
                <Skeleton
                  sx={{
                    // bgcolor: `rgba(${event?.data?.projectColor}, 0.1)`, // Set background color dynamically
                    animation: "wave 1s infinite", // Make the wave animation more prominent and continuous
                  }}
                  animation="wave"
                  variant="rectangle"
                ></Skeleton>
              </>
            ) : (
              <Typography fontSize={"12px"} color={getContrastColor(event?.data?.projectColor)} fontWeight={'bold'} overflow={'hidden'} textOverflow={'ellipsis'} maxWidth={"calc(100% - 16px)" } ml={'8px'}>
                {event?.data?.task}
              </Typography>
            )}
          </Box>
          {data === null ? (
            <></>
          ) : (
            <NotificationDetailModal
              changeOrder={true}
              notification={data}
              isEvent={true}
              open={open}
              setOpen={setOpen}
            />
          )}
        </>
      )}
    </>
  );
};
const CustomEventMonthWeatherNotes = ({ event, isDrawerOpen, setMonthEventView, props }) => {
  const {t} = useTranslation();
  // const start = moment(event.start).format("HH:mm");
  // const end = moment(event.end).format("HH:mm");

  // const [getWorkOrder, { isLoading }] = useGetWorkOrderDetailsMutation({
  //   workOrderId: event?.data?.workOrderId,
  // });
  // const [open, setOpen] = useState(false);
  // const [data, setData] = useState(null);
  // // const handleOnClick = async () => {
  // //   const res = await getWorkOrder({ workOrderId: event?.data?.workOrderId });
  // //   setData(res.data);
  // //   setOpen(true);
  // // };
  // const handleClose = (close) => {
  //   setMonthEventView('Work Order');
  //   setMonthEventView('Weather/Notes');
  //   setOpen(close);
  // }
  return (
    <>
      <Stack
        width={"fit-content"}
        backgroundColor={"transparent"}
        alignItems={"flex-end"}
        pl={1}
        pt={4}
        // onClick={handleOnClick}
      >
        <Typography
          sx={themeStyle.eventNote}
          overflow={"hidden"}
          height={"47px"}
          width={isDrawerOpen ? "100%" : "42px"}
          color={event?.data?.priority === "urgent" ? "#EB1717" : "#1C1C1C"}
        >
          {t('CustomEvent.title2')} {event?.data?.note}
        </Typography>
      </Stack>
      {/* {data === null ? (
        <></>
      ) : (
        <NotificationDetailModal
          changeOrder={true}
          notification={data}
          isEvent={true}
          open={open}
          setOpen={handleClose}
        />
      )} */}
    </>
  );
};

export {
  CustomEventDayTasks,
  CustomEventDayNotes,
  CustomEventWeek,
  CustomEventWeekOnModal,
  CustomEventMonthTasks,
  CustomEventMonthWeatherNotes,
};



const themeStyle = {
  eventTask: {
    fontSize: "10px",
    textOverflow: "ellipsis",
    color: "#454545",
    fontFamily: 'var(--main-font-family)',
    maxWidth:'103px',
    wordBreak: 'break-word',
    hyphens: 'auto'
  },
  eventText: (bgColor) =>({
    color: getContrastColor(bgColor),
    borderRadius:'4px',
    maxWidth:'60px',
  }),
  eventNote: {
    fontSize: "10px",
    textOverflow: "ellipsis",
    fontStyle: "italic",
    fontFamily: 'var(--main-font-family)',
    maxWidth:'103px',
    wordBreak: 'break-word',
    hyphens: 'auto'
  },
  weather: {
    color: "#FFF",
    borderRadius: "10px",
    paddingTop: 0.1,
    paddingBottom: 0.1,
    paddingLeft: 0.5,
    paddingRight: 0.5,
    textAlign: "center",
  },
  eventIcon: {
    width: "30px",
    height: "30px",
  },
  eventBox: {
    boxShadow:
      "rgba(0, 0, 0, 0.03) 0px 0.46875rem 2.1875rem, rgba(0, 0, 0, 0.03) 0px 0.9375rem 1.40625rem, rgba(0, 0, 0, 0.05) 0px 0.25rem 0.53125rem, rgba(0, 0, 0, 0.03) 0px 0.125rem 0.1875rem",
    backgroundColor: "#F3F3F3",
  },
  scrollable: {
    overflowY: "scroll",
    scrollbarWidth: "none", // For Firefox
    "-ms-overflow-style": "none", // For IE and Edge
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "transparent",
      transition: "background-color 0.3s",
    },
    "&:hover::-webkit-scrollbar-thumb": {
      backgroundColor: "#ddd",
    },
  },
};
