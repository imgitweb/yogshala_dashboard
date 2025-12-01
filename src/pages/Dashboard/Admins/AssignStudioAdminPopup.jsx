import React, { useState, useEffect } from "react";
import { X, Search, UserPlus, UserMinus } from "lucide-react";

const AssignStudioAdminPopup = ({
  open,
  onClose,
  assignedAdmins = [],
  trainers = [],
  onAssign,
  onRemove,
}) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  if (!open) return null;

  // Filter trainers by name or email
  const filtered = trainers.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-100 animate-fade-in px-2">
      <div className="bg-white w-[100%] max-w-lg rounded-2xl p-6 shadow-lg border border-light animate-slide-in-up ">

        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-700 text-dark">Manage Studio Admins</h2>
          <button onClick={onClose} className="text-dark hover:text-primary">
            <X size={22} />
          </button>
        </div>

        {/* Search */}
        <div className="bg-offwhite border border-light rounded-lg px-3 py-2 flex items-center mb-4">
          <Search size={18} className="text-muted" />
          <input
            type="text"
            placeholder="Search trainers..."
            className="bg-transparent ml-2 w-full outline-none text-dark"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* List */}
        <div className="max-h-72 overflow-y-auto pr-1 scrollbar-hide space-y-3">
          {filtered.length === 0 ? (
            <p className="text-center text-muted text-sm py-6">
              No trainers found
            </p>
          ) : (
            filtered.map((trainer) => {
              const isAssigned = assignedAdmins.includes(trainer.id);

              return (
                <div
                  key={trainer.id}
                  className="flex items-center justify-between bg-offwhite p-3 rounded-xl border border-light"
                >
                  {/* Trainer Info */}
                  <div className="flex items-center gap-3">
                    <img
                      src={trainer.avatar}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-600 text-dark">{trainer.name}</p>
                      <p className="text-muted text-sm">{trainer.email}</p>
                    </div>
                  </div>

                  {/* Action */}
                  {!isAssigned ? (
                    <button
                      className="btn btn-primary flex items-center gap-2"
                      onClick={() => onAssign(trainer.id)}
                    >
                      <UserPlus size={16} /> Assign
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline flex items-center gap-2 border-red-500 text-red-500 hover:bg-red-50"
                      onClick={() => onRemove(trainer.id)}
                    >
                      <UserMinus size={16} /> Remove
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignStudioAdminPopup;
