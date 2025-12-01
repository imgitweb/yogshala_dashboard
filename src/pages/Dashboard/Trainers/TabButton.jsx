import React from 'react'


const TabButton = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex-1 sm:flex-initial flex items-center justify-center sm:justify-start gap-3 px-4 py-3 text-sm font-600 rounded-lg transition-all ${
      isActive
        ? 'bg-primary text-white shadow-md'
        : 'text-muted hover:bg-offwhite hover:text-dark'
    }`}
  >
    {icon}
    <span className="hidden sm:inline">{label}</span>
  </button>
);

export default TabButton
