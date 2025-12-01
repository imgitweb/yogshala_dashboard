import React, { useState } from "react";
import StatusBadge from "./StatusBadge";
import {
  Download,
  Search,
  ChevronDown,
  SlidersHorizontal,
  MoreHorizontal,
} from "lucide-react";

const ExpirationCell = ({ expiration, colorMap = {} }) => {
  const warningColor = colorMap["warning"] || {
    bg: "bg-orange-100",
    text: "text-orange-700",
  };
  const linkColor = colorMap["link"] || {
    text: "text-blue-600",
    hover: "hover:underline",
  };

  if (expiration?.toLowerCase().startsWith("in")) {
    return (
      <span
        className={`text-xs font-medium px-2.5 py-1 rounded-md ${warningColor.bg} ${warningColor.text}`}
      >
        {expiration}
      </span>
    );
  }
  return (
    <a href="#" className={`${linkColor.text} ${linkColor.hover}`}>
      {expiration}
    </a>
  );
};

const AssigneeCell = ({ name, avatar }) => (
  <div className="flex items-center space-x-2">
    {avatar && <img src={avatar} alt={name} className="w-6 h-6 rounded-full" />}
    <span className="text-sm font-medium text-dark">{name}</span>
  </div>
);

const Table = ({
  title = "Policies",
  subtitle,
  data = [],
  accentColor = "primary",
  icons = {},
  statusColors = {},
  expirationColors = {},
  onImport,
  onRenew,
  onComplete,
  onSort,
  onSearch,
  searchable = true,
  sortable = true,
}) => {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = data.map((d) => d.policyId);
      setSelectedRows(new Set(allIds));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (id) => {
    const updated = new Set(selectedRows);
    updated.has(id) ? updated.delete(id) : updated.add(id);
    setSelectedRows(updated);
  };

  const filteredData = data.filter(
    (item) =>
      item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.policyId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isAllSelected =
    selectedRows.size > 0 && selectedRows.size === data.length;

  const {
    importIcon: ImportIcon = Download,
    searchIcon: SearchIcon = Search,
    sortIcon: SortIcon = ChevronDown,
    filterIcon: FilterIcon = SlidersHorizontal,
    moreIcon: MoreIcon = MoreHorizontal,
  } = icons;

  return (
    <div className="w-full bg-light p-5 rounded-2xl shadow-sm border border-light">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-dark">{title}</h2>
          {subtitle && (
            <p className="text-sm text-muted mt-0.5">{subtitle}</p>
          )}
        </div>
        <button className="p-2 mt-2 sm:mt-0 text-muted hover:text-dark">
          <FilterIcon size={20} />
        </button>
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onImport}
            className={`btn btn-primary flex items-center text-white`}
          >
            <ImportIcon size={16} className="mr-2" /> Import
          </button>
          <button
            onClick={onRenew}
            className="btn btn-outline"
          >
            Renew
          </button>
          <button
            onClick={onComplete}
            className="btn btn-outline"
          >
            Complete
          </button>
        </div>

        <div className="flex items-center gap-2">
          {searchable && (
            <div className="relative w-full sm:w-auto">
              <SearchIcon
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-3 py-2 w-full sm:w-64 border border-light rounded-lg text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  onSearch?.(e.target.value);
                }}
              />
            </div>
          )}
          {sortable && (
            <button
              onClick={onSort}
              className="btn btn-outline flex items-center"
            >
              Sort by <SortIcon size={16} className="ml-2" />
            </button>
          )}
        </div>
      </div>

      {/* Table Desktop */}
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
              <th className="p-3">Client</th>
              <th className="p-3">Policy ID</th>
              <th className="p-3">Expiration</th>
              <th className="p-3">Policy Source</th>
              <th className="p-3">Assignee</th>
              <th className="p-3">Status</th>
              <th className="p-3"></th>
            </tr>
          </thead>

          <tbody className="text-dark">
            {filteredData.map((row) => (
              <tr
                key={row.policyId}
                className={`border-t hover:bg-offwhite ${
                  selectedRows.has(row.policyId) ? `bg-${accentColor}-50` : ""
                }`}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(row.policyId)}
                    onChange={() => handleSelectRow(row.policyId)}
                    className="rounded"
                  />
                </td>
                <td className="p-3 font-medium">{row.client}</td>
                <td className="p-3 text-muted">{row.policyId}</td>
                <td className="p-3">
                  <ExpirationCell
                    expiration={row.expiration}
                    colorMap={expirationColors}
                  />
                </td>
                <td className="p-3 text-muted">{row.policySource}</td>
                <td className="p-3">
                  <AssigneeCell
                    name={row.assignee?.name}
                    avatar={row.assignee?.avatar}
                  />
                </td>
                <td className="p-3">
                  <StatusBadge status={row.status} colorMap={statusColors} />
                </td>
                <td className="p-3 text-muted">
                  <button className="hover:bg-offwhite p-1 rounded-full">
                    <MoreIcon size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredData.length === 0 && (
          <div className="text-center py-6 text-muted text-sm">
            No records found.
          </div>
        )}
      </div>

      {/* Mobile cards */}
      <div className="block md:hidden space-y-4">
        {filteredData.map((row) => (
          <div
            key={row.policyId}
            className={`p-4 border rounded-xl ${
              selectedRows.has(row.policyId) ? `bg-${accentColor}-50` : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-dark">{row.client}</h4>
              <StatusBadge status={row.status} colorMap={statusColors} />
            </div>
            <p className="text-sm text-muted mt-1">{row.policyId}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-sm text-dark">
              <span>
                <strong>Source:</strong> {row.policySource}
              </span>
              <span>
                <strong>Expires:</strong>{" "}
                <ExpirationCell
                  expiration={row.expiration}
                  colorMap={expirationColors}
                />
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <AssigneeCell
                name={row.assignee?.name}
                avatar={row.assignee?.avatar}
              />
              <button className="hover:bg-offwhite p-1 rounded-full">
                <MoreIcon size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
