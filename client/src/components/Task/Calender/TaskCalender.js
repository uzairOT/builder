import React, { useEffect, useMemo, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "../../../App.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalenderWrapper from "./calender.style";
import CustomToolbar from "./CustomToolbar";
import {formats} from "./Formats";
import {CustomEventDay, CustomEventWeek, CustomEventWeekOnModal} from "./CustomEvent";


const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);


const TaskCalender = ({dailyForecast, isDrawerOpen}) => {
  
  const currentDate = moment();
  const startTime = moment(currentDate).set({ hour: 9, minute: 0, second: 0, millisecond: 0 });
  const endTime = moment(currentDate).set({ hour: 23, minute: 0, second: 0, millisecond: 0 });
  const [monthEventView, setMonthEventView] = useState('task');
    const [events, setEvents] = useState([
        {
          start: moment('2024-02-06T09:00:00').toDate(),
          end: moment('2024-02-06T11:00:00').toDate(),
          title: "Event 1",
          data: {
            task: "Distributed tertiary system engine",
            weather: {
              icon: 'sunny',
              temp: '23',
              description: 'Cloudy',
            },
            note: 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive'
          }
        },
        {
          start: moment('2024-02-07T12:00:00').toDate(),
          end: moment('2024-02-07T13:00:00').toDate(),
          title: "Event 2",
          data: {
            task: "Distributed tertiary system engine",
            weather: {
              icon: 'sunny',
              temp: '25',
              description: 'Partially Sunny',
            },
            note: 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive'
          }
        },
        {
          start: moment('2024-02-07T14:00:00').toDate(),
          end: moment('2024-02-07T15:00:00').toDate(),
          title: "Event 2",
          data: {
            task: "Distributed tertiary system engine",
            weather: {
              icon: 'sunny',
              temp: '25',
              description: 'Partially Sunny',
            },
            note: 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive'
          }
        },
        {
          start: moment('2024-02-08T12:00:00').toDate(),
          end: moment('2024-02-08T13:00:00').toDate(),
          title: "Event 2",
          data: {
            task: "Distributed tertiary system engine",
            weather: {
              icon: 'sunny',
              temp: '25',
              description: 'Partially Sunny',
            },
            note: 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive'
          }
        },
        {
          start: moment('2024-02-08T16:00:00').toDate(),
          end: moment('2024-02-08T18:00:00').toDate(),
          title: "Event 3",
          data: {
            task: "Distributed tertiary system engine",
            weather: {
              icon: 'sunny',
              temp: '25',
              description: 'Partially Sunny',
            },
            note: 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive'
          }
        },
        {
          start: moment('2024-02-12T13:00:00').toDate(),
          end: moment('2024-02-13T16:00:00').toDate(),
          title: "Long Event",
          data: {
            task: "Distributed tertiary system engine",
            weather: {
              icon: 'sunny',
              temp: '25',
              description: 'Partially Sunny',
            },
            note: 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive'
          }
        },
        {
          start: moment('2024-02-13T13:00:00').toDate(),
          end: moment('2024-02-14T18:00:00').toDate(),
          title: "Event 3",
          data: {
            task: "Distributed tertiary system engine",
            weather: {
              icon: 'sunny',
              temp: '25',
              description: 'Partially Sunny',
            },
            note: 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive'
          }
        },
      ]);


      const components = useMemo(()=> ({
        toolbar: (props) => <CustomToolbar toolbar={props} setMonthEventView={setMonthEventView} />,
        day:{
          event: (props) => <CustomEventDay {...props} />
        },
        week: {
          event: isDrawerOpen ? (props) => <CustomEventWeekOnModal {...props}/> :(props) => <CustomEventWeek {...props} />
        },

      }),[isDrawerOpen])
      const messages = {
        allDay: 'Week'
      }
      useEffect(()=>{console.log(monthEventView)}, [monthEventView])


  return (

        <>
            <CalenderWrapper className="calendar-wrapper" style={{height: '100%'}}>
          <DnDCalendar
            defaultDate={moment().toDate()}
            defaultView="day"
            views={["day", "week", "month"]}
            events={events}
            localizer={localizer}
            resizable
            style={{ height: "100% " }}
            components={components}
            formats={formats}
            messages={messages}
            min={startTime.toDate()}
            max={endTime.toDate()}
          />
          </CalenderWrapper>
        </>
      );
}

export default TaskCalender