import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./CustomCalendar.css";

const CustomCalendar = ({ events, onDateClick }) => {
  return (
    <div className="custom-calendar-container card-glass">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="auto"
        selectable={true}
        events={events}
        dateClick={onDateClick}
        headerToolbar={{
          start: "prev,next today",
          center: "title",
          end: "",
        }}
        dayHeaderClassNames="calendar-header"
        dayCellClassNames="calendar-cell"
      />
    </div>
  );
};

export default CustomCalendar;
