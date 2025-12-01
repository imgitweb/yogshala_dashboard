import React, { useState, useRef, useEffect } from "react";

const SuggestiveSelect = ({
  label,
  placeholder,
  suggestions = [],
  value,
  onChange,
  required = false,
}) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const wrapperRef = useRef(null);

  // Filter suggestions based on search
  const filtered = suggestions.filter((item) =>
    item.toLowerCase().includes((value || search).toLowerCase())
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!open) return;

    if (e.key === "ArrowDown") {
      setHighlightIndex((prev) =>
        prev < filtered.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      setHighlightIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter") {
      if (highlightIndex >= 0 && filtered[highlightIndex]) {
        onChange(filtered[highlightIndex]);
        setSearch(filtered[highlightIndex]);
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Highlight matched text
  const highlightText = (text) => {
    const val = (value || search).toLowerCase();
    const index = text.toLowerCase().indexOf(val);
    if (index === -1) return text;

    return (
      <>
        {text.substring(0, index)}
        <span className="bg-yellow-200 rounded ">
          {text.substring(index, index + val.length)}
        </span>
        {text.substring(index + val.length)}
      </>
    );
  };

  return (
    <div className="relative w-full mb-6" ref={wrapperRef}>
      {label && (
        <label className="block text-sm font-600 text-dark mb-2">
          {label}
          {required && <span className="text-red-600"> *</span>}
        </label>
      )}

      {/* Input + Clear Button */}
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={value || search}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-3 bg-offwhite border border-light rounded-lg focus:outline-none focus:ring-2 
                     focus:ring-primary transition-all duration-200"
        />

        {value && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              onChange("");
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-dark"
          >
            ✕
          </button>
        )}
      </div>

      {/* Suggestion Dropdown */}
      {open && (
        <div
          className="absolute z-30 w-full bg-white border border-light rounded-lg mt-1 max-h-56 overflow-y-auto shadow-xl 
                     animate-fadeIn transition-all"
        >
          {filtered.length === 0 ? (
            <div className="p-4 text-muted text-sm text-center">No results found</div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHighlightIndex(idx)}
                onClick={() => {
                  onChange(item);
                  setSearch(item);
                  setOpen(false);
                }}
                className={`px-4 py-3 cursor-pointer flex items-center justify-between 
                            transition-all duration-150
                            ${
                              highlightIndex === idx
                                ? "bg-primary text-white"
                                : "hover:bg-gray-100"
                            }`}
              >
                <span>{highlightText(item)}</span>
                {value === item && (
                  <span className="text-primary font-bold">✔</span>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SuggestiveSelect;
