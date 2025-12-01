import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TrainerCalendar = ({
  availability,
  onDateSelect,
  onSlotSelect,
  selectedDate,
  selectedSlot,
  handleBooking,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [datesWithAvailability, setDatesWithAvailability] = useState([]);
  console.log("Availability prop:", availability);

  useEffect(() => {
    if (availability?.length > 0) {
      const availableDates = availability.map((a) => a.date.slice(0, 10));
      setDatesWithAvailability(availableDates);

      const today = new Date();
      const todayStr = `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

      const defaultDate =  todayStr

      onDateSelect(defaultDate);
    }
  }, [availability, onDateSelect]);

  const startOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  );

  const daysInMonth = [];
  for (let i = 1; i <= endOfMonth.getDate(); i++) {
    daysInMonth.push(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i)
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleDateClick = (dateObj) => {
    const localStr = `${dateObj.getFullYear()}-${String(
      dateObj.getMonth() + 1
    ).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")}`;

    onDateSelect(localStr);
    onSlotSelect(null); 
  };

  const selectedSlots =
    availability.find((a) => a.date.slice(0, 10) === selectedDate)?.slots || [];

  const goToPrevMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  const goToNextMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );

  return (
    <div className="bg-light p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={goToPrevMonth}
          className="px-2 py-1 rounded hover:bg-gray-200"
        >
          &lt;
        </button>
        <div className="font-semibold">
          {currentMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </div>
        <button
          onClick={goToNextMonth}
          className="px-2 py-1 rounded hover:bg-gray-200"
        >
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-sm font-medium mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array(startOfMonth.getDay())
          .fill(null)
          .map((_, i) => (
            <div key={`empty-${i}`}></div>
          ))}

        {daysInMonth.map((dateObj) => {
          const localStr = `${dateObj.getFullYear()}-${String(
            dateObj.getMonth() + 1
          ).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")}`;

          const isPast = dateObj < today;
          const hasAvailability = datesWithAvailability.includes(localStr);
          const isSelected = localStr === selectedDate;

          return (
            <button
              key={localStr}
              onClick={() => handleDateClick(dateObj)}
              disabled={isPast}
              className={`w-full py-2 rounded-full text-sm transition
                ${
                  isSelected
                    ? "bg-primary text-white"
                    : hasAvailability
                    ? "bg-green-100 text-dark hover:bg-green-200"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }
                ${isPast ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {dateObj.getDate()}
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {selectedSlots.length > 0 ? (
          selectedSlots.map((slot) => (
            <motion.button
              key={slot._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => onSlotSelect(slot)}
              className={`px-2 py-2 rounded-lg font-medium border ${
                selectedSlot?._id === slot._id
                  ? "bg-primary text-white border-primary"
                  : "bg-offwhite text-dark border-light hover:bg-light"
              }`}
            >
              {slot.startTime} - {slot.endTime}
            </motion.button>
          ))
        ) : (
          <p className="text-muted col-span-2 text-center py-2">
            No slots available
          </p>
        )}
      </div>

      <button
        onClick={handleBooking}
        disabled={ !selectedSlot ||  !selectedDate}
        className="w-full mt-3 bg-primary hover:bg-primary-dark text-white font-semibold py-2 rounded-lg shadow-md transition 
        
        disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Book Now
      </button>
    </div>
  );
};

export default TrainerCalendar;
