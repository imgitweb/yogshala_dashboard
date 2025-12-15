import React from "react";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import DynamicTable from "../../../components/common/DynamicTable";

const TrainerList = ({
  trainers,
  trainerColumns,
  trainerActions,

  // 🔹 NEW PROPS
  searchTerm,
  onSearchChange,

  page,
  totalPages,
  onPageChange,
  loading,
}) => {
  return (
    <>
      {/* ---------------- SEARCH + FILTERS ---------------- */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-light mb-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center bg-offwhite px-3 py-2 rounded-lg w-full md:w-1/3">
          <Search className="text-muted" size={18} />
          <input
            type="text"
            placeholder="Search trainers..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-transparent ml-2 w-full text-dark outline-none"
          />
        </div>

        <button className="btn btn-outline flex items-center gap-2">
          <Filter size={16} /> Filters
        </button>
      </div>

      {/* ---------------- TABLE ---------------- */}
      <DynamicTable
        title="All Trainers"
        data={trainers}
        columns={trainerColumns}
        actions={trainerActions}
        loading={loading}
      />

      {/* ---------------- PAGINATION ---------------- */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-muted">
            Page <span className="font-600">{page}</span> of{" "}
            <span className="font-600">{totalPages}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => onPageChange(page - 1)}
              className="p-2 rounded-lg border disabled:opacity-50"
            >
              <ChevronLeft size={18} />
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => onPageChange(i + 1)}
                className={`px-3 py-2 rounded-lg text-sm font-600 ${
                  page === i + 1
                    ? "bg-primary text-white"
                    : "border hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => onPageChange(page + 1)}
              className="p-2 rounded-lg border disabled:opacity-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TrainerList;
