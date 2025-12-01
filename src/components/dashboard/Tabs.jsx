import React from "react";

// Reusable Tabs Component (Updated)
// props: tabs=[{label, value, icon}], activeTab, setActiveTab

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex gap-2 mb-6 p-2 overflow-x-auto scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setActiveTab(tab.value)}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-600 rounded-xl transition-all ${
            activeTab === tab.value
              ? "bg-primary text-white shadow hover-lift"
              : "bg-offwhite text-dark hover:bg-primary-light hover:text-dark hover-lift"
          }`}
        >
          {tab.icon} {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;