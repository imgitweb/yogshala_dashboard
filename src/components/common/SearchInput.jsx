import React from "react";

const SearchInput = ({ onChange }) => {
  return (
    <div className="mt-5 max-w-2xl mx-auto px-4">
      <div className="relative">
        <input
          type="search"
          placeholder="e.g., Hatha Yoga in Delhi"
          className="w-full p-3 pr-12 text-base md:text-lg border border-light outline-none rounded-full shadow-sm focus:ring-2 focus:ring-primary focus:border-primary"
          onChange={(e) => onChange(e.target.value)} // ← notify parent
        />
        <svg
          className="w-6 h-6 text-muted absolute top-1/2 right-4 -translate-y-1/2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchInput;
