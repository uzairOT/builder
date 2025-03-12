import { useCallback, useEffect, useState } from "react";
import CustomToolbarProjects from "./CustomToolbarProjects";
import CustomToolbar from "./CustomToolbar";
import {
  CustomEventDayNotes,
  CustomEventDayTasks,
  CustomEventMonthTasks,
  CustomEventMonthWeatherNotes,
  CustomEventWeek,
  CustomEventWeekOnModal,
} from "./CustomEvent";
import MonthCellWapper from "./MonthCellWapper";
import TimeGutterHeader from "./TimeGutterHeader";

// Assuming you import necessary components at the top

const useCalendarComponents = ({
  handleMonthRange,
  bgColorClient,
  dailyForecast,
  setEventView,
  setMonthEventView,
  monthEventView,
  isProjectPage,
  id,
  isDrawerOpen,
  eventViewRef,
  projectWeather,
  coordinates,
  toolbarKey,
}) => {
  const toolbarComponent = useCallback(
    (props) =>
      isProjectPage ? (
        <CustomToolbarProjects
          handleMonthRange={handleMonthRange}
          bgColorClient={bgColorClient}
          toolbar={props}
          setEventView={setEventView}
          setMonthEventView={setMonthEventView}
          monthEventView={monthEventView}
          key={toolbarKey}
          projectWeather={projectWeather}
        />
      ) : (
        <CustomToolbar
          dailyForecast={dailyForecast}
          toolbar={props}
          setEventView={setEventView}
          setMonthEventView={setMonthEventView}
          monthEventView={monthEventView}
          key={toolbarKey}
        />
      ),
    [
      isProjectPage,
      bgColorClient,
      dailyForecast,
      setEventView,
      setMonthEventView,
      monthEventView,
      toolbarKey,
    ]
  );

  const dayComponent = useCallback(
    (props) =>
      eventViewRef.current === "Work Order" ? (
        <CustomEventDayTasks
          {...props}
          projectId={id}
          isProjectPage={isProjectPage}
        />
      ) : (
        <CustomEventDayNotes
          {...props}
          projectId={id}
          isProjectPage={isProjectPage}
        />
      ),
    [id, isProjectPage, eventViewRef]
  );

  const weekComponent = useCallback(
    (props) =>
      isDrawerOpen ? (
        <CustomEventWeekOnModal
          projectId={id}
          isProjectPage={isProjectPage}
          {...props}
        />
      ) : (
        <CustomEventWeek
          {...props}
          projectId={id}
          isProjectPage={isProjectPage}
        />
      ),
    [id, isDrawerOpen, isProjectPage]
  );

  const MonthComponent = useCallback(
    (props) => {
      const monthView = eventViewRef.current === 'Work Order' ? 'tasks' : 'weather/notes';
      // let monthView;
      // console.log(eventViewRef.current)
      // switch (eventViewRef.current) {
      //   case "Work Order":
      //     monthView = "tasks";
      //     break;
      //   case "Chart":
      //     return (
      //       <>
      //       </>
      //     );
      //   default:
      //     monthView = "weather/notes";
      // }
  
      return (
        <MonthCellWapper
          props={props}
          isDrawerOpen={isDrawerOpen}
          monthView={monthView}
          isProjectPage={isProjectPage}
        />
      );
    },
    [isDrawerOpen, isProjectPage, eventViewRef.current]
  );
  const eventComponent = useCallback(
    (props) =>
      eventViewRef.current === "Work Order" ? (
        <CustomEventMonthTasks
          {...props}
          projectId={id}
          monthEventView={monthEventView.current}
          isProjectPage={isProjectPage}
        />
      ) : (
        <CustomEventMonthWeatherNotes
          {...props}
          projectId={id}
          setMonthEventView={setEventView}
          isDrawerOpen={isDrawerOpen}
          isProjectPage={isProjectPage}
        />
      ),
    [id, isDrawerOpen, isProjectPage, monthEventView, eventViewRef, setEventView]
  );

  return () => ({
    toolbar: toolbarComponent,
    day: {
      event: dayComponent,
    },
    week: {
      timeGutterHeader: TimeGutterHeader,
      event: weekComponent,
    },
    month: {
      dateCellWrapper: MonthComponent,
      event: eventComponent,
    },
  });
};

export default useCalendarComponents; // Make sure to export it if needed
