import { Paper, Stack } from "@mui/material";
import React from "react";
import TaskCalenderView from "../../Dashboard/TaskCalenderView/TaskCalenderView";
import Notes from "./Notes";
import { useSelector } from "react-redux";
import { allEvents } from "../../../redux/slices/Events/eventsSlice";
import { getForecast } from "../../../redux/slices/DailyForecast/dailyForecastSlice";

const NotesView = () => {
  const allEvent = useSelector(allEvents);
  const forecast = useSelector(getForecast);
  const loading = allEvent.isLoading;
  const events = allEvent.events;
  const dailyForecast = forecast.dailyForecast;;
  //console.log( "IN DASHBOARD EVENTS: ", events)
  return (
    <Stack
      direction={{ xl: "row", lg: "column" }}
      pt={1}
      spacing={1}
      height="calc(92vh - 63px)"
      overflow={"hidden"}
      style={{ ...themeStyle.scrollable }}
    >
      <Stack flex={3}>
        <Notes />
      </Stack>
      <Stack flex={1}>
        <Paper sx={{ borderRadius: "14px", height: "calc(92vh - 70px)" }}>
          {loading ? (
            <>Loading</>
          ) : (
            <TaskCalenderView
              dailyForecast={dailyForecast}
              eventsArr={events}
            />
          )}
        </Paper>
      </Stack>
    </Stack>
  );
};

export default NotesView;

const themeStyle = {
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
