import React, { useMemo, useRef, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment-timezone'; // or .min.js
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "../../../App.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalenderWrapper from "./calender.style";
import { DateFormat } from "./DateFormat";
import { useParams } from "react-router-dom";
import { useGetProjectWeatherMutation } from "../../../redux/apis/Project/projectApiSlice";
import useCalendarComponents from "./useCalendarComponents";
import { useDispatch } from "react-redux";
import { setIsLoadingProjectWeather, setProjectWeather } from "../../../redux/slices/Project/projectWeather";




moment.tz.setDefault("UTC");
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);
const TaskCalender = ({ dailyForecast, isDrawerOpen, isProjectPage, bgColorClient, eventsArr, coordinates }) => {
  const { id } = useParams();
  const [monthEventView, setMonthEventView] = useState(true);
  const [eventView, setEventView] = useState('Work Order')
  const [monthRange, setMonthRange] = useState({
    startDate: '', endDate: ''
  })
  const dispatch = useDispatch()
  const [getProjectWeather] =   useGetProjectWeatherMutation()
  const handleMonthRange = (startDate, endDate) => {
    const formatStartDate = moment(startDate).format('YYYY/MM/DD');
    const formatEndDate = moment(endDate).format('YYYY/MM/DD');
    getWeatherFunction(formatStartDate, formatEndDate);
    setMonthRange({ startDate: formatStartDate, endDate: formatEndDate });

  }

  const getWeatherFunction  = async (startDate, endDate)=>{
    try{
      dispatch(setIsLoadingProjectWeather(true))
      const data = await getProjectWeather({projectId: id, startDate: startDate, endDate:endDate});
      dispatch(setProjectWeather(data.data.data));
      dispatch(setIsLoadingProjectWeather(false))
    }catch(error){
      console.error(error)
    }
  }

  // useEffect(() => {
  //   getWeatherFunction();
  // }, [monthRange.startDate])
  const eventViewRef = useRef(eventView);
  eventViewRef.current = eventView;
  console.log("first event",eventViewRef.current)
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
  const components = useCalendarComponents({
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
    monthRange,
    coordinates,
    toolbarKey,
  });

  const messages = {
    allDay: 'Week'
  }
  const filteredEvents = useMemo(() => isProjectPage ? events.filter(event => !isProjectPage || event.data.projectId === id) : events, [id, isProjectPage, events]);

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