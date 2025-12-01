import React from "react";

const TeachingModeSelector = ({ teachingMode, setTeachingMode }) => (
  <div className="flex-1 mb-6">
    <label className="block text-sm font-600 text-dark mb-2">Teaching Mode</label>
    <div className="flex gap-4">
      {["Online", "In-person", "Both"].map(mode => (
        <label
          key={mode}
          className={`flex items-center gap-2 md:px-4 px-3.5 py-3 border rounded-lg cursor-pointer transition-all ${
            teachingMode === mode
              ? "border-primary bg-primary text-white"
              : "border-light bg-offwhite text-dark hover:border-primary"
          }`}
        >
          <input
            type="radio"
            name="teachingMode"
            value={mode}
            checked={teachingMode === mode}
            onChange={e => setTeachingMode(e.target.value)}
            className="hidden"
            required
          />
          <span className="text-sm font-medium">{mode}</span>
        </label>
      ))}
    </div>
  </div>
);

export default TeachingModeSelector;
