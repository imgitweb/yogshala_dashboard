import { Ear } from "lucide-react";
import React from "react";

const EarningCard = ({ title, value, icon, iconBg, iconColor }) => (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-5">
        <div className={`p-3 rounded-full ${iconBg}`}>
            {React.cloneElement(icon, { className: `text-xl ${iconColor}` })}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">₹{value.toLocaleString('en-IN')}</p>
        </div>
    </div>
);

export default EarningCard; 