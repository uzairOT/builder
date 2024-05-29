import React, { useCallback, useMemo, useRef, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";

import moment from 'moment-timezone'; // or .min.js
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "../../../App.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalenderWrapper from "./calender.style";
import CustomToolbar from "./CustomToolbar";
import {DateFormat} from "./DateFormat";
import {CustomEventDayNotes, CustomEventDayTasks, CustomEventMonthTasks, CustomEventMonthWeatherNotes, CustomEventWeek, CustomEventWeekOnModal} from "./CustomEvent";
import TimeGutterHeader from "./TimeGutterHeader";
import MonthCellWapper from "./MonthCellWapper";
import CustomToolbarProjects from "./CustomToolbarProjects";
import { useParams } from "react-router-dom";




moment.tz.setDefault("UTC");
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);
const TaskCalender = ({ dailyForecast, isDrawerOpen, isProjectPage, bgColorClient, eventsArr }) => {
  console.log("Current time: "); console.log(moment().format());
  console.log("Currrent timezone after updating: "); console.log(moment().tz());
  const {id}= useParams();
  const [monthEventView, setMonthEventView] = useState(true);
  const [eventView, setEventView] = useState('Work Order')
  const eventViewRef = useRef(eventView);
  eventViewRef.current = eventView;
  const currentDate = moment();

  const startTime = moment(currentDate).set({ hour: 9, minute: 0, second: 0, millisecond: 0 });
  const endTime = moment(currentDate).set({ hour: 23, minute: 0, second: 0, millisecond: 0 });
  // console.log(eventsArr)

    const events = Array.isArray(eventsArr) ? eventsArr?.map((item)=>{

//CHANGES MADE TO PREVENT CRASHING OF CODE
     const parsedStart = moment(item.start).toDate();
      const parsedEnd =  moment(item.end).toDate();
      // const utcParsedStart = parsedStart.utc();
      // const utcParsedEnd = parsedEnd.utc();
      // const dateParsedStart = utcParsedStart.toDate();
      // const dateParseEnd = utcParsedEnd.toDate();
      
      return{
        ...item,
        start:  parsedStart,
        end: parsedEnd,
      }
    }) : [];
    console.log(id);

  // console.log("In Task Calender View: ", eventsArr);

  // const [events, setEvents] = useState([
  //   {
  //     start: moment('2024-03-26T09:00:00').toDate(),
  //     end: moment('2024-03-26T11:00:00').toDate(),
  //     title: "Event 1",
  //     data: {
  //       task: "Distributed tertiary system engine",
  //       weather: {
  //         icon: 'sunny',
  //         temp: '23',
  //         description: 'Cloudy',
  //       },
  //       note: 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive'
  //     }
  //   },
  //   {
  //     start: moment('2024-03-27T12:00:00').toDate(),
  //     end: moment('2024-03-27T13:00:00').toDate(),
  //     title: "Event 2",
  //     data: {
  //       task: "Distributed tertiary system engine",
  //       weather: {
  //         icon: 'sunny',
  //         temp: '25',
  //         description: 'Partially Sunny',
  //       },
  //       note: 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive'
  //     }
  //   },
  //   {
  //     start: moment('2024-03-27T14:00:00').toDate(),
  //     end: moment('2024-03-27T15:00:00').toDate(),
  //     title: "Event 2",
  //     data: {
  //       task: "Distributed tertiary system engine",
  //       weather: {
  //         icon: 'sunny',
  //         temp: '25',
  //         description: 'Partially Sunny',
  //       },
  //       note: 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive'
  //     }
  //   },
  //   {
  //     start: moment('2024-03-28T12:00:00').toDate(),
  //     end: moment('2024-03-28T13:00:00').toDate(),
  //     title: "Event 2",
  //     data: {
  //       task: "Distributed tertiary system engine",
  //       weather: {
  //         icon: 'sunny',
  //         temp: '25',
  //         description: 'Partially Sunny',
  //       },
  //       note: 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive'
  //     }
  //   },
  //   {
  //     start: moment('2024-03-28T16:00:00').toDate(),
  //     end: moment('2024-03-28T18:00:00').toDate(),
  //     title: "Event 3",
  //     data: {
  //       task: "Distributed tertiary system engine",
  //       weather: {
  //         icon: 'sunny',
  //         temp: '25',
  //         description: 'Partially Sunny',
  //       },
  //       note: 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive'
  //     }
  //   },
  //   {
  //     start: moment('2024-04-03T13:00:00').toDate(),
  //     end: moment('2024-04-04T16:00:00').toDate(),
  //     title: "Long Event",
  //     data: {
  //       task: "Distributed tertiary system engine",
  //       weather: {
  //         icon: 'sunny',
  //         temp: '25',
  //         description: 'Partially Sunny',
  //       },
  //       note: 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive'
  //     }
  //   },
  //   {
  //     start: moment('2024-04-04T13:00:00').toDate(),
  //     end: moment('2024-04-05T18:00:00').toDate(),
  //     title: "Event 3",
  //     data: {
  //       task: "Distributed tertiary system engine",
  //       weather: {
  //         icon: 'sunny',
  //         temp: '25',
  //         description: 'Partially Sunny',
  //       },
  //       note: 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive'
  //     }
  //   },
  // ]);
  //console.log(events)
  //console.log("Inside Task Calender: ", monthEventView);
  const toolbarKey = dailyForecast ? 'withForecast' : 'withoutForecast';
  //console.log("Inside Task Calender dailyForecast: ", dailyForecast, " toolbar key: ", toolbarKey);

  const components = useCallback(() => ({

    toolbar: (props) => (isProjectPage ? 
    <CustomToolbarProjects bgColorClient={bgColorClient} toolbar={props} setEventView={setEventView} setMonthEventView={setMonthEventView} monthEventView={monthEventView} key={toolbarKey} /> : 
    <CustomToolbar dailyForecast={dailyForecast} toolbar={props} setEventView={setEventView} setMonthEventView={setMonthEventView} monthEventView={monthEventView} key={toolbarKey} />),
    day: {
      event: (props) => (eventViewRef.current === 'Work Order' ? <CustomEventDayTasks {...props} projectId={id} isProjectPage={isProjectPage} /> : <CustomEventDayNotes {...props} projectId={id} isProjectPage={isProjectPage}  />)
    },
    week: {
      timeGutterHeader: TimeGutterHeader,
      event: (props) => (isDrawerOpen ? <CustomEventWeekOnModal projectId={id} isProjectPage={isProjectPage}  {...props} /> : <CustomEventWeek {...props} projectId={id} isProjectPage={isProjectPage}  />)
      // isDrawerOpen ? (props) => <CustomEventWeekOnModal {...props}/> :(props) => <CustomEventWeek {...props} />
    },
    month: {
      dateCellWrapper: (props) => (eventViewRef.current === 'Work Order' ? <MonthCellWapper props={props} isDrawerOpen={isDrawerOpen} monthView={'tasks'} isProjectPage={isProjectPage} /> : <MonthCellWapper props={props} isDrawerOpen={isDrawerOpen} monthView={'weather/notes'} isProjectPage={isProjectPage} />),
      event: (props) => {
        //console.log("Month Event View current Function rerendered: ", eventViewRef.current);
        if (eventViewRef.current === 'Work Order') {
          return <CustomEventMonthTasks {...props} projectId={id} monthEventView={monthEventView.current} isProjectPage={isProjectPage}  />
        } else {
          return <CustomEventMonthWeatherNotes {...props} projectId={id} isDrawerOpen={isDrawerOpen} isProjectPage={isProjectPage} />
        }
      }

    }

  }), [monthEventView, setMonthEventView, isDrawerOpen, isProjectPage, bgColorClient,dailyForecast,toolbarKey, id])
  const messages = {
    allDay: 'Week'
  }



  return (

        <>
            <CalenderWrapper className="calendar-wrapper" style={{height:'100%' }}>
          <DnDCalendar
            defaultDate={moment()}
            defaultView="day"
            views={["day", "week", "month"]}
            events={events}
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