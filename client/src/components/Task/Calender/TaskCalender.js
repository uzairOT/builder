import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "../../../App.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalenderWrapper from "./calender.style";
import CustomToolbar from "./CustomToolbar";
import {formats} from "./Formats";
import {CustomEventDayNotes, CustomEventDayTasks, CustomEventMonthTasks, CustomEventMonthWeatherNotes, CustomEventWeek, CustomEventWeekOnModal} from "./CustomEvent";
import TimeGutterHeader from "./TimeGutterHeader";
import MonthCellWapper from "./MonthCellWapper";


const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);


const TaskCalender = ({dailyForecast, isDrawerOpen}) => {
  const [monthEventView, setMonthEventView] = useState(true);
  const [eventView, setEventView] = useState('Work Order')
  const eventViewRef = useRef(eventView);
    eventViewRef.current = eventView;
    console.log("Ref updated: ",eventViewRef.current)

  const currentDate = moment();
  const startTime = moment(currentDate).set({ hour: 9, minute: 0, second: 0, millisecond: 0 });
  const endTime = moment(currentDate).set({ hour: 23, minute: 0, second: 0, millisecond: 0 });
 
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
      console.log("Inside Task Calender: ", monthEventView);

      const components = useMemo(()=> ({

        toolbar: (props) => <CustomToolbar toolbar={props} setEventView={setEventView} setMonthEventView={setMonthEventView} monthEventView={monthEventView}/>,
        day:{
          event: (props) => (eventViewRef.current === 'Work Order' ? <CustomEventDayTasks {...props}/> : <CustomEventDayNotes {...props}/>)
        },
        week: {
          timeGutterHeader: TimeGutterHeader,
          event: (props) => (isDrawerOpen ? <CustomEventWeekOnModal {...props}/> :<CustomEventWeek {...props} /> )
          // isDrawerOpen ? (props) => <CustomEventWeekOnModal {...props}/> :(props) => <CustomEventWeek {...props} />
        },
        month: {
          dateCellWrapper: (props) => (eventViewRef.current === 'Work Order' ? <MonthCellWapper props={props} isDrawerOpen={isDrawerOpen} monthView={'tasks'} />: <MonthCellWapper props={props} isDrawerOpen={isDrawerOpen}  monthView={'weather/notes'}/>),
          event: (props) =>{
            console.log("Month Event View current Function rerendered: ",eventViewRef.current);
            if(eventViewRef.current === 'Work Order'){
              return <CustomEventMonthTasks {...props} monthEventView={monthEventView.current} />
            }else{
              return <CustomEventMonthWeatherNotes {...props} isDrawerOpen={isDrawerOpen}/>
            }
          }
          // monthEventView === 'tasks' ? 
          // (props) => <CustomEventMonthTasks {...props} /> :
          // (props) => <CustomEventMonthWeatherNotes {...props} /> 
        }

      }), [monthEventView, setMonthEventView, isDrawerOpen])
      const messages = {
        allDay: 'Week'
      }

      const resizeEvent = useCallback(
        ({ event, start, end }) => {
          setEvents((prev) => {
            const existing = prev.find((ev) => ev.id === event.id) ?? {}
            const filtered = prev.filter((ev) => ev.id !== event.id)
            return [...filtered, { ...existing, start, end }]
          })
        },
        [setEvents]
      )
    


  return (

        <>
            <CalenderWrapper className="calendar-wrapper" style={{height: '100%'}}>
          <DnDCalendar
            defaultDate={moment().toDate()}
            defaultView="day"
            views={["day", "week", "month"]}
            events={events}
            localizer={localizer}
            resizable={false}
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