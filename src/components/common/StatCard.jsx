import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/**
 * StatCard – Dynamic Gradient + Theme Matched
 */
const StatCard = ({ icon, name, val, increament, action, to, bg }) => {
  const navigate = useNavigate();

  const isIconUrl = (str) => {
    return typeof str === "string" && (str.startsWith("http://") || str.startsWith("https://"));
  };

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 200 }}
      onClick={() => to && navigate(to)}
      className={`
        relative overflow-hidden cursor-pointer
        rounded-2xl p-5 min-w-[260px] h-44
        bg-gradient-to-br ${bg}
        shadow-md hover-lift card-glass
        transition-all duration-300 ease-out
      `}
    >
      {/* Subtle Glass Overlay */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[8px] rounded-2xl pointer-events-none"></div>

      {/* Card Content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Header */}
        <div className="flex justify-between items-center text-dark">
          <div className="flex items-center gap-2">
            <span className="font-700 text-lg text-dark">{name}</span>
            {increament && (
              <span className="text-sm text-muted font-500">({increament})</span>
            )}
          </div>

          {/* Icon */}
          <div className="text-3xl text-primary">
            {isIconUrl(icon) ? (
              <img
                src={icon}
                alt={name}
                className="w-9 h-9 object-contain"
              />
            ) : (
              icon
            )}
          </div>
        </div>

        {/* Value */}
        <div className="text-4xl font-800 text-dark tracking-tight drop-shadow-sm">
          {val}
        </div>

        {/* Action button */}
        {action && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(to);
            }}
            className="btn btn-primary mt-3 text-sm font-500"
          >
            {action}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
