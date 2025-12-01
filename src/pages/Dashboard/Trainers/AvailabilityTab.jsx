import React from "react";
import { Edit2, PlusCircle, Trash2, CalendarDays } from "lucide-react";

const AvailabilityTab = ({ slots, openModal, deleteSlot }) => {
  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-600 text-lg text-dark">Your Availability</h3>
        <button
          onClick={() => openModal(null)}
          className="bg-primary px-3 py-2 text-white rounded-full flex items-center gap-2 text-sm font-600 hover:bg-primary/80"
        >
          <PlusCircle size={16} /> Add Slot
        </button>
      </div>

      <div className="space-y-3">
        {slots.length > 0 ? (
          slots.map((dateSlot) => (
            <div key={dateSlot._id} className="bg-offwhite p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CalendarDays size={16} className="text-primary" />
                <h4 className="font-600 text-dark">
                  {new Date(dateSlot.date).toLocaleDateString("en-IN", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </h4>
              </div>

              {dateSlot.slots?.length > 0 ? (
                dateSlot.slots.map((slot) => (
                  <div
                    key={slot._id}
                    className="flex justify-between items-center mb-2 p-2 bg-light rounded-lg"
                  >
                    <p className="text-dark font-medium">
                      {slot.startTime} – {slot.endTime}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          openModal({
                            ...slot,
                            date: dateSlot.date,
                            dateId: dateSlot._id,
                            _id: slot._id,
                          })
                        }
                        className="p-2 text-muted hover:text-primary hover:bg-offwhite rounded-full"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => deleteSlot(slot._id, dateSlot._id)}
                        className="p-2 text-muted hover:text-accent hover:bg-offwhite rounded-full"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-muted">No slots for this date.</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-sm text-muted">No availability slots yet.</p>
        )}
      </div>
    </div>
  );
};

export default AvailabilityTab;
