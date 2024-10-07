import React, { useCallback, useMemo, useRef, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment-timezone'; // or .min.js
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "../../../App.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalenderWrapper from "./calender.style";
import CustomToolbar from "./CustomToolbar";
import { DateFormat } from "./DateFormat";
import { CustomEventDayNotes, CustomEventDayTasks, CustomEventMonthTasks, CustomEventMonthWeatherNotes, CustomEventWeek, CustomEventWeekOnModal } from "./CustomEvent";
import TimeGutterHeader from "./TimeGutterHeader";
import MonthCellWapper from "./MonthCellWapper";
import CustomToolbarProjects from "./CustomToolbarProjects";
import { useParams } from "react-router-dom";




moment.tz.setDefault("UTC");
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);
const TaskCalender = ({ dailyForecast, isDrawerOpen, isProjectPage, bgColorClient, eventsArr }) => {
  const { id } = useParams();
  const [monthEventView, setMonthEventView] = useState(true);
  const [eventView, setEventView] = useState('Work Order')
  const eventViewRef = useRef(eventView);
  eventViewRef.current = eventView;
  const currentDate = moment();

  const startTime = moment(currentDate).set({ hour: 12, minute: 0, second: 0, millisecond: 0 }).toDate();
  const endTime = moment(currentDate).set({ hour: 23, minute: 59, second: 59, millisecond: 999 }).toDate();

  const events = useMemo(() => {

    return Array.isArray(eventsArr) ? eventsArr?.map((item) => {

      //CHANGES MADE TO PREVENT CRASHING OF CODE
      const parsedStart = moment(item.start).toDate();
      const parsedEnd = moment(item.end).toDate();

      return {
        ...item,
        start: parsedStart,
        end: parsedEnd,
      }
    }) : []
  }, [eventsArr]);
  const toolbarKey = dailyForecast ? 'withForecast' : 'withoutForecast';

  const components = useCallback(() => ({

    toolbar: (props) => (isProjectPage ?
      <CustomToolbarProjects bgColorClient={bgColorClient} toolbar={props} setEventView={setEventView} setMonthEventView={setMonthEventView} monthEventView={monthEventView} key={toolbarKey} /> :
      <CustomToolbar dailyForecast={dailyForecast} toolbar={props} setEventView={setEventView} setMonthEventView={setMonthEventView} monthEventView={monthEventView} key={toolbarKey} />),
    day: {
      event: (props) => (eventViewRef.current === 'Work Order' ? <CustomEventDayTasks {...props} projectId={id} isProjectPage={isProjectPage} /> : <CustomEventDayNotes {...props} projectId={id} isProjectPage={isProjectPage} />)
    },
    week: {
      timeGutterHeader: TimeGutterHeader,
      event: (props) => (isDrawerOpen ? <CustomEventWeekOnModal projectId={id} isProjectPage={isProjectPage}  {...props} /> : <CustomEventWeek {...props} projectId={id} isProjectPage={isProjectPage} />)
      // isDrawerOpen ? (props) => <CustomEventWeekOnModal {...props}/> :(props) => <CustomEventWeek {...props} />
    },
    month: {
      dateCellWrapper: (props) => (eventViewRef.current === 'Work Order' ? <MonthCellWapper props={props} isDrawerOpen={isDrawerOpen} monthView={'tasks'} isProjectPage={isProjectPage} /> : <MonthCellWapper props={props} isDrawerOpen={isDrawerOpen} monthView={'weather/notes'} isProjectPage={isProjectPage} />),
      event: (props) => {
        //console.log("Month Event View current Function rerendered: ", eventViewRef.current);
        if (eventViewRef.current === 'Work Order') {
          return <CustomEventMonthTasks {...props} projectId={id} monthEventView={monthEventView.current} isProjectPage={isProjectPage} />
        } else {
          return <CustomEventMonthWeatherNotes {...props} projectId={id} isDrawerOpen={isDrawerOpen} isProjectPage={isProjectPage} />
        }
      }

    }

  }), [monthEventView, setMonthEventView, isDrawerOpen, isProjectPage, bgColorClient, dailyForecast, toolbarKey, id])
  const messages = {
    allDay: 'Week'
  }
  const filteredEvents = useMemo(() => isProjectPage ? events.filter(event => !isProjectPage || event.data.projectId === id) : events, [id,isProjectPage, events]);

  return (

    <>
      <CalenderWrapper className="calendar-wrapper" style={{ height: '100%' }}>
        <DnDCalendar
          defaultDate={moment()}
          defaultView="day"
          views={["day", "week", "month"]}
          events={filteredEvents}
          localizer={localizer}
          resizable={false}
          style={{ height: "100% " }}
          components={components()}
          formats={DateFormat}
          messages={messages}
          min={startTime}
          max={endTime}

        />
      </CalenderWrapper>
    </>
  );
}

export default TaskCalender;