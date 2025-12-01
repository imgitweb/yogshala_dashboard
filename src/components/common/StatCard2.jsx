import React from "react";
import { ArrowUpRight } from "lucide-react"; // optional, for the corner arrow icon

const StatCard2 = ({
  title,
  value,
  subtitle,
  icon,
  gradient = "from-green-50 to-green-100",
  iconBg = "bg-green-100",
  iconColor = "text-green-600",
}) => {
  return (
    <div className="relative bg-white rounded-2xl p-5 border border-light shadow-sm hover-lift transition-all duration-300">
      {/* Top Right Arrow */}
      <div className="absolute top-4 right-4 bg-offwhite p-2 text-primary rounded-md cursor-pointer hover:text-primary transition-colors">
        <ArrowUpRight size={16} />
      </div>

      {/* Icon Section */}
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br ${gradient} ${iconBg} mb-3`}
      >
        <span className={`${iconColor}`}>{icon}</span>
      </div>

      {/* Content */}
      <h3 className="text-sm font-600 text-dark mb-1">{title}</h3>
      <div className="text-2xl font-700 text-dark">{value}</div>
      <p className="text-sm text-muted mt-1">{subtitle}</p>
    </div>
  );
};

export default StatCard2;
