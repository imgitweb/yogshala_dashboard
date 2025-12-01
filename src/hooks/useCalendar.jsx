import { useState } from "react";

export default function useCalendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
  };

  const addEvent = (title, date) => {
    setEvents([...events, { title, date }]);
  };

  return {
    selectedDate,
    events,
    addEvent,
    handleDateClick,
  };
}
