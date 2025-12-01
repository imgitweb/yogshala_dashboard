import React, { useState, useRef } from "react";

const SuggestiveMultiSelect = ({
  label,
  placeholder = "Type to search...",
  suggestions = [],
  values = [],
  onChange,
  required = false,
}) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const filteredSuggestions =
    inputValue.trim().length === 0
      ? []
      : suggestions.filter(
          (item) =>
            item.toLowerCase().includes(inputValue.toLowerCase()) &&
            !values.includes(item)
        );

  const addValue = (val) => {
    onChange([...values, val]);
    setInputValue("");
    inputRef.current?.focus();
  };

  const removeValue = (val) => {
    onChange(values.filter((v) => v !== val));
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      addValue(inputValue.trim());
      e.preventDefault();
    }

    if (e.key === "Backspace" && !inputValue && values.length > 0) {
      removeValue(values[values.length - 1]);
    }
  };

  // ❌ Prevent numbers
  const handleInputChange = (e) => {
    const value = e.target.value;

    // Allow only letters + space
    const cleaned = value.replace(/[^A-Za-z\s]/g, "");

    setInputValue(cleaned);
  };

  return (
    <div className="mb-6 w-full relative">
      <label className="block text-sm font-600 text-dark mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div
        className="w-full min-h-[52px] flex flex-wrap items-center gap-2 px-3 py-2 bg-offwhite border border-light rounded-lg focus-within:ring-2 focus-within:ring-primary"
        onClick={() => inputRef.current?.focus()}
      >
        {values.map((val, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-primary text-white rounded-full flex items-center gap-2 text-sm"
          >
            {val}
            <button
              type="button"
              className="font-bold"
              onClick={() => removeValue(val)}
            >
              ×
            </button>
          </span>
        ))}

        <input
          ref={inputRef}
          type="text"
          className="flex-1 min-w-[120px] bg-offwhite outline-none py-1"
          placeholder={values.length === 0 ? placeholder : ""}
          value={inputValue}
          onChange={handleInputChange}   
          onKeyDown={handleKeyDown}
        />
      </div>

      {filteredSuggestions.length > 0 && (
        <div className="absolute left-0 right-0 z-20 border bg-white rounded-lg mt-1 shadow-lg max-h-40 overflow-y-auto">
          {filteredSuggestions.map((s, index) => (
            <div
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => addValue(s)}
            >
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SuggestiveMultiSelect;
