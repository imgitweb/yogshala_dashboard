import React, { useState } from "react";
import {
  ArrowUpRight,
  Info,
  X,
} from "lucide-react";

const ValidationQueueCard = ({
  title = "Validation Queue",
  gradientFrom = "from-indigo-600",
  gradientTo = "to-blue-800",
  items = [],
  alertText = "Please indicate the appropriate executors for verification to avoid delays in the policy process.",
  showAlert = true,
  iconMap = {},
}) => {
  const [isAlertVisible, setIsAlertVisible] = useState(showAlert);

  return (
    <div
      className={`w-full  p-6 text-white rounded-2xl shadow-lg bg-gradient-to-br ${gradientFrom} ${gradientTo} backdrop-blur-lg border border-white/20`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        <button className="p-2 rounded-md bg-white/15 text-white/70 hover:text-white transition-colors">
          <ArrowUpRight size={22} />
        </button>
      </div>

      {/* Grid Items */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-3">
            <div className="text-white/70 bg-white/15 p-2 rounded-md">{iconMap[item.id]}</div>
            <div>
              <span className="text-2xl font-bold block">
                {item.count > 0 ? `+${item.count}` : "0"}
              </span>
              <span className="text-sm text-white/80">{item.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Alert */}
      {isAlertVisible && alertText && (
        <div className="flex items-start p-3 space-x-3 rounded-lg bg-white/15 border border-white/20">
          <Info className="flex-shrink-0 mt-0.5 text-white/80" size={18} />
          <p className="flex-grow text-sm text-white/90 leading-snug">
            {alertText}
          </p>
          <button
            onClick={() => setIsAlertVisible(false)}
            className="p-0.5 text-white/70 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ValidationQueueCard;
