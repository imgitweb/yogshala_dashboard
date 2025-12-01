import { Eye, EyeClosed } from "lucide-react";
import React, { useState } from "react";

const InputField = React.memo(
  ({
    id,
    name,
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    as: Component = "input",
    rows = 2,
    required = false, // ✅ new prop
  }) => {
    const [showPassword, setShowPassword] = useState(false);

    // Determine actual input type
    const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

    return (
      <div className="flex-1 mb-6 relative">
        {/* Label with optional red asterisk */}
        <label htmlFor={id} className="block text-sm font-600 text-dark mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {Component === "textarea" ? (
          <textarea
            id={id}
            name={name || id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            rows={rows}
            className="w-full px-4 py-2 bg-offwhite border border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
            required={required} // ✅
          />
        ) : type === "file" ? (
          <input
            type="file"
            id={id}
            name={name || id}
            onChange={onChange}
            className="w-full px-4 py-2 bg-offwhite border border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
            required={required} // ✅
          />
        ) : (
          <div className="relative">
            <input
              type={inputType}
              id={id}
              name={name || id}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              onKeyDown={(e) => {
                // 🚫 Prevent typing "-" or "e" in number field
                if (type === "number" && (e.key === "-" || e.key === "e")) {
                  e.preventDefault();
                }
              }}
              className="w-full px-4 py-3 bg-offwhite border border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
              required={required} // ✅
              min={type === "number" ? 0 : undefined}

            />
            {type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
);

export default InputField;
