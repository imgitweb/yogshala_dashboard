// src/components/common/DashboardCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const DashboardCard = ({
  title,
  value,
  icon,
  color = "primary", // theme color variant
  onClick,
  footer,
}) => {
  const colorMap = {
    primary: "bg-primary/10 text-primary border-primary/20",
    success: "bg-green-100 text-green-600 border-green-200",
    warning: "bg-yellow-100 text-yellow-600 border-yellow-200",
    danger: "bg-red-100 text-red-600 border-red-200",
    neutral: "bg-offwhite text-dark border-light",
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group relative cursor-pointer flex flex-col justify-between p-5 rounded-2xl border ${colorMap[color]} shadow-sm hover:shadow-md transition`}
    >
      {/* ICON + TITLE */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`p-3 rounded-xl bg-white/70 group-hover:bg-white shadow-inner`}
          >
            {icon}
          </div>
          <h3 className="text-base font-semibold text-dark">{title}</h3>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 5 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="opacity-0 group-hover:opacity-100 transition"
        >
          <ArrowRight size={18} />
        </motion.div>
      </div>

      {/* VALUE */}
      <motion.p
        className="text-3xl font-bold text-dark mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {value}
      </motion.p>

      {/* FOOTER */}
      {footer && (
        <p className="text-sm text-muted font-medium">{footer}</p>
      )}

      {/* Hover effect background */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition"
        initial={{ scale: 0.9 }}
        whileHover={{ scale: 1 }}
      />
    </motion.div>
  );
};

export default DashboardCard;
