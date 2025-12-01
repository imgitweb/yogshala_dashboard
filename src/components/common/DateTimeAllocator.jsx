// src/components/DateTimeAllocator.js
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DateTimeAllocator = ({
  onDateChange,
  onSlotSelect,
  timeSlots = [],
  selectedDate,
  selectedSlot,
  onClick,
  isLoading,
}) => {
 const formatTime = (time24) => {
  if (!time24) return "--:--";   // handle undefined
  const [hour, minute] = time24.split(':');
  const h = parseInt(hour, 10);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const formattedHour = ((h + 11) % 12) + 1;
  return `${String(formattedHour).padStart(2, '0')}:${minute}${suffix}`;
};

  return (
    <div className="bg-white sticky top-23 rounded-2xl p-6 font-sans space-y-8 shadow-md">
      <Calendar
        onChange={onDateChange}
        value={selectedDate || new Date()}
        className="custom-calendar"
      />

      <div className="grid grid-cols-2 gap-3 mb-6">
        {timeSlots.map((slot, index) => {
          const isSelected =
            selectedSlot &&
            ((typeof selectedSlot === 'number' && selectedSlot === index) ||
              (selectedSlot.start === slot.start && selectedSlot.end === slot.end));
          return (
            <div
              key={index}
              className="flex items-center justify-center text-gray-800 font-semibold text-[10px]"
            >
              <div
                onClick={() => onSlotSelect(slot, index)}
                className={`w-full text-center px-4 py-2 rounded-full border shadow-sm cursor-pointer transition
                  ${isSelected ? 'bg-primary text-white border-indigo-600' : 'bg-light border-gray-300 hover:bg-indigo-50'}`}
              >
                {`${formatTime(slot.start)} - ${formatTime(slot.end)}`}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          className="w-full py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
          onClick={() => {
            onDateChange && onDateChange(null);
            onSlotSelect && onSlotSelect(null);
          }}
        >
          Cancel
        </button>
        <button
          className="w-full py-3 bg-primary btn btn-primary text-white"
          onClick={() => onClick && onClick({ date: selectedDate, slot: selectedSlot })}
          disabled={isLoading || !selectedDate || !selectedSlot}
        >
       {  isLoading ? 'Booking...' : 'Book Now' }
        </button>
      </div>
    </div>
  );
};


export default DateTimeAllocator;
