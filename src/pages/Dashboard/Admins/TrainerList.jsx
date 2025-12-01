import React from "react";
import { Search, Filter } from "lucide-react";
import DynamicTable from "../../../components/common/DynamicTable";
import StatusBadge from "../../../components/common/StatusBadge";

const TrainerList = ({ trainers, trainerColumns, trainerActions }) => {
  return (
    <>
      {/* Search + Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-light mb-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center bg-offwhite px-3 py-2 rounded-lg w-full md:w-1/3">
          <Search className="text-muted" size={18} />
          <input
            type="text"
            placeholder="Search trainers..."
            className="bg-transparent ml-2 w-full text-dark outline-none"
          />
        </div>

        <button className="btn btn-outline flex items-center gap-2">
          <Filter size={16} /> Filters
        </button>
      </div>

      {/* Trainers Table */}
      <DynamicTable
        title="All Trainers"
        data={trainers}
        columns={trainerColumns}
        actions={trainerActions}
      />
    </>
  );
};

export default TrainerList;
