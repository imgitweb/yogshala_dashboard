import React, { useState } from "react";

const DynamicTable = ({
  title = "Table",
  subtitle,
  data = [],
  columns = [], // [{ key: "client", label: "Client", render: (row)=> JSX }]
  actions = [], // [{ label: "Renew", onClick: (row)=>void, variant: "primary|outline", icon: Icon }]
  searchable = true,
  sortable = false,
  accentColor = "primary",
  onSearch,
  onSort,
}) => {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  // Selection logic
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(new Set(data.map((d) => d.id || d.key)));
    } else setSelectedRows(new Set());
  };
  const handleSelectRow = (id) => {
    const updated = new Set(selectedRows);
    updated.has(id) ? updated.delete(id) : updated.add(id);
    setSelectedRows(updated);
  };
  const isAllSelected =
    selectedRows.size > 0 && selectedRows.size === data.length;

  // Filtering logic
  const filteredData = data.filter((item) => {
    if (!searchQuery) return true;
    return columns.some((col) => {
      const value = item[col.key];
      return value?.toString().toLowerCase().includes(searchQuery.toLowerCase());
    });
  });

  return (
    <div className="w-full bg-light p-5 rounded-2xl shadow-sm border border-light">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-dark">{title}</h2>
          {subtitle && <p className="text-sm text-muted mt-0.5">{subtitle}</p>}
        </div>
      </div>

      {/* Actions & Search */}
      

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="text-muted font-semibold border-b">
            <tr>
              <th className="p-3 w-4">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  className="rounded"
                />
              </th>
              {columns.map((col) => (
                <th key={col.key} className="p-3">
                  {col.label}
                </th>
              ))}
              {actions.length > 0 && <th className="p-3">Actions</th>}
            </tr>
          </thead>
          <tbody className="text-dark">
            {filteredData.map((row) => {
              const rowId = row.id || row.key;
              return (
                <tr
                  key={rowId}
                  className={`border-t hover:bg-offwhite ${
                    selectedRows.has(rowId) ? `bg-${accentColor}-50` : ""
                  }`}
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(rowId)}
                      onChange={() => handleSelectRow(rowId)}
                      className="rounded"
                    />
                  </td>
                  {columns.map((col) => (
                    <td key={col.key} className="p-3">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td className="p-3 flex gap-4">
                      {actions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => action.onClick?.(row)}
                        className={`p-1 rounded-md text-sm ${
  action.variant === "primary"
    ? "btn btn-primary text-white"
    : action.variant === "danger"
    ? "btn btn-danger text-white"
    : action.variant === "success"
    ? "btn btn-success text-white"
    : action.variant === "warning"
    ? "btn btn-warning text-white"
    : action.variant === "outline"
    ? "btn btn-outline"
    : "btn btn-secondary"
}`}
    >
                          {action.icon && <action.icon size={14} />}
                        </button>
                      ))}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredData.length === 0 && (
          <div className="text-center py-6 text-muted text-sm">
            No records found.
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="block md:hidden space-y-4">
        {filteredData.map((row) => {
          const rowId = row.id || row.key;
          return (
            <div
              key={rowId}
              className={`p-4 border rounded-xl ${
                selectedRows.has(rowId) ? `bg-${accentColor}-50` : "bg-white"
              }`}
            >
              {columns.map((col, i) => (
                <div key={i} className="mb-2 flex justify-between">
                  <span className="font-medium text-muted">{col.label}:</span>
                  <span className="text-dark">
                    {col.render ? col.render(row) : row[col.key]}
                  </span>
                </div>
              ))}
              {actions.length > 0 && (
                <div className="flex gap-2 mt-2 flex-wrap">
                  {actions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => action.onClick?.(row)}
                      className={`p-1 rounded-md text-sm  flex items-center gap-2  ${
                        action.variant === "primary"
                          ? "btn btn-primary text-white"
                          : "btn btn-outline"
                      }`}
                    >
                      {action.icon && <action.icon size={14} />}
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DynamicTable;
