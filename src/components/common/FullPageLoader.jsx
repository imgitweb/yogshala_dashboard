// src/components/common/FullPageLoader.jsx
import React from "react";

const FullPageLoader = ({ visible }) => {
  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-white/60 flex flex-col items-center justify-center transition-all duration-500"
    >
      <div className="w-14 h-14 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
      <p className="mt-4 text-dark font-medium text-lg animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default FullPageLoader;
