import React, { useState } from "react";
import { ArrowUpRight, ChevronDown, X } from "lucide-react";

const PerformanceReviewCard = ({ title, users, alertInfo }) => {
  const [isAlertVisible, setIsAlertVisible] = useState(true);

  return (
    <div className="w-full  bg-white shadow-lg rounded-2xl p-6 font-sans hover:shadow-xl transition-shadow">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <button className="text-gray-400 hover:text-gray-700 transition-colors">
          <ArrowUpRight size={20} />
        </button>
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            
            {/* Left: Avatar + Name */}
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full border-2 border-gray-200"
              />
              <div>
                <p className="font-semibold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">{user.mainStat}</p>
              </div>
            </div>

            {/* Middle: Secondary Stat */}
            <div className="text-right mr-4">
              <p className="text-sm text-gray-500">{user.secondaryStat.label}</p>
              <p className="font-semibold text-gray-800">{user.secondaryStat.value}</p>
            </div>

            {/* Right: Role Button */}
            <button className="flex items-center gap-1 bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
              {user.role} <ChevronDown size={16} className="text-gray-400" />
            </button>
          </div>
        ))}
      </div>

      {/* Alert Banner */}
      {alertInfo && isAlertVisible && (
        <div className="mt-6 flex items-start gap-3 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
          <div className="text-red-500 mt-0.5">{alertInfo.icon}</div>
          <div className="flex-1">
            <p className="font-semibold text-red-700">{alertInfo.title}</p>
            <p className="text-sm text-red-600">{alertInfo.subtitle}</p>
          </div>
          <button
            onClick={() => setIsAlertVisible(false)}
            className="text-red-400 hover:text-red-700 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default PerformanceReviewCard;
