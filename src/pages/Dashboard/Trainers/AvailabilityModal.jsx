import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const AvailabilityModal = ({ isOpen, onClose, onSave, slot }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  // Today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (slot) {
      setSelectedDate(
        slot.date
          ? new Date(slot.date).toISOString().slice(0, 10)
          : ""
      );
      setStartTime(slot.startTime || "09:00");
      setEndTime(slot.endTime || "17:00");
    } else {
      setSelectedDate("");
      setStartTime("09:00");
      setEndTime("17:00");
    }
  }, [slot, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }
    if (startTime >= endTime) {
      alert("Start time must be before end time.");
      return;
    }

    onSave({
      date: selectedDate,
      startTime,
      endTime,
      _id: slot?._id,       // existing slot ID for editing
      dateId: slot?.dateId,  // existing date ID for editing
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-800/70 flex items-center justify-center z-50">
      <div className="bg-light rounded-xl shadow-lg w-full max-w-md m-4 border border-light">
        <div className="p-5 border-b border-light flex justify-between items-center">
          <h3 className="text-lg font-600 text-dark">
            {slot ? "Edit Slot" : "Add New Slot"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-offwhite text-muted"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="text-sm font-500 text-dark mb-2 block">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              min={today} // Disable past dates
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border border-light rounded-md p-2 text-dark"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-500 text-dark mb-1 block">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full border border-light rounded-md p-2 text-dark"
              />
            </div>
            <div>
              <label className="text-sm font-500 text-dark mb-1 block">End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full border border-light rounded-md p-2 text-dark"
              />
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-light bg-offwhite flex justify-end gap-3">
          <button onClick={onClose} className="btn btn-outline">
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn btn-primary">
            Save Slot
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityModal;
