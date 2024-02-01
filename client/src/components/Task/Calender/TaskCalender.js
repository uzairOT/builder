import React, { useMemo, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "../../../App.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalenderWrapper from "./calender.style";
import CustomToolbar from "./CustomToolbar";
import formats from "./formats";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);


const TaskCalender = () => {
    const [events, setEvents] = useState([
        {
          start: moment().toDate(),
          end: moment().add(1, "day").toDate(),
          title: "Title Test",
        },
      ]);
    
      const onEventResize = (data) => {
        const { start, end } = data;
    
        setEvents((prevEvents) => {
          const updatedEvent = { ...prevEvents[0], start, end };
          return [updatedEvent];
        });
      };
    
      const onEventDrop = (data) => {
        console.log(data);
      };

      const components = useMemo(()=> ({
        toolbar: CustomToolbar,

      }),[])

  return (

        <div className="App">
            <CalenderWrapper className="">
          <DnDCalendar
            defaultDate={moment().toDate()}
            defaultView="day"
            views={["day", "week", "month"]}
            events={events}
            localizer={localizer}
            onEventDrop={onEventDrop}
            onEventResize={onEventResize}
            resizable
            style={{ height: "100vh" }}
            components={components}
            formats={formats}
          />
          </CalenderWrapper>
        </div>
      );
}

export default TaskCalender