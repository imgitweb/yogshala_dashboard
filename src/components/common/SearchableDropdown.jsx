import { useState } from "react";

const SearchableDropdown = ({ label, placeholder, options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full md:w-64 relative">
      {label && (
        <label className="text-sm font-medium text-dark mb-1 block">
          {label}
        </label>
      )}

      {/* Input box */}
      <div
        className="px-4 py-3 bg-white border border-light rounded-xl cursor-pointer text-sm shadow-sm"
        onClick={() => setOpen(!open)}
      >
        {value || placeholder}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white border border-light rounded-xl mt-2 p-2 shadow-lg z-20">

          {/* Search box */}
          <input
            type="text"
            className="w-full border border-light rounded-lg px-3 py-2 text-sm mb-2"
            placeholder="Search…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />

          {/* List */}
          <ul className="max-h-48 overflow-y-auto">
            {filtered.length === 0 ? (
              <li className="p-2 text-gray-400 text-sm">No options</li>
            ) : (
              filtered.map((opt) => (
                <li
                  key={opt.id}
                  className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => {
                    onChange(opt.label);
                    setQuery("");
                    setOpen(false);
                  }}
                >
                  {opt.label}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;