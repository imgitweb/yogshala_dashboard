// import React, { useState, useEffect, useMemo } from "react";
// import SuggestiveSelect from "../../../components/common/SuggestiveSelect";
// import InputField from "../../../components/landingPage/TrainerRegister/InputField";
// import { Plus, Trash2, X } from "lucide-react";

// import { getAllBatchesApi, getAllMembersApi , addMemberToBatchApi } from "../../../apis/adminApi";
// import { showError, showSuccess } from "../../../utils/toastService";
// import { useNavigate } from "react-router-dom";

// const PLAN_OPTIONS = ["Monthly"];
// const getToday = () => new Date().toISOString().slice(0, 10);

// const AddMemberFullPage = ({ onSubmit }) => {
//   const [batches, setBatches] = useState([]);
//   const [members, setMembers] = useState([]);
//   const navigate = useNavigate();


//   const [loadingBatches, setLoadingBatches] = useState(true);
//   const [loadingMembers, setLoadingMembers] = useState(true);

//   const [selectedBatchLabel, setSelectedBatchLabel] = useState("");
//   const [selectedBatch, setSelectedBatch] = useState(null);

//   const [rows, setRows] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);

//   const [newRow, setNewRow] = useState({
//     memberLabel: "",
//     selectedMember: null,
//     planType: "Monthly",
//     monthlyFee: "",
//     joiningDate: getToday(),
//     notes: "",
//   });

//   // ============================
//   // FETCH REAL DATA FROM API
//   // ============================
//   const fetchBatches = async () => {
//     try {
//       setLoadingBatches(true);
//       const res = await getAllBatchesApi();

//       setBatches(res.batches || res.data || []);
//     } catch (err) {
//       showError("Failed to load batches");
//     } finally {
//       setLoadingBatches(false);
//     }
//   };

//   const fetchMembers = async () => {
//     try {
//       setLoadingMembers(true);
//       const res = await getAllMembersApi();

//       setMembers(res.members || res.data || []);
//     } catch (err) {
//       showError("Failed to load members");
//     } finally {
//       setLoadingMembers(false);
//     }
//   };

//   useEffect(() => {
//     fetchBatches();
//     fetchMembers();
//   }, []);

//   // ============================
//   // SUGGESTION LABELS
//   // ============================
//   const batchSuggestions = useMemo(() => {
//     return batches.map((b) => `${b.batchName} (${(b.days || []).join(", ")})`);
//   }, [batches]);

//   const memberSuggestions = useMemo(() => {
//     return members.map((m) => `${m.fullName} (${m.email})`);
//   }, [members]);

//   // ============================
//   // SELECT BATCH
//   // ============================
//   const handleBatchChange = (label) => {
//     setSelectedBatchLabel(label);

//     const match = batches.find(
//       (b) => `${b.batchName} (${(b.days || []).join(", ")})` === label
//     );

//     setSelectedBatch(match || null);
//   };

//   const getPlanMultiplier = (planType) => {
//     if (planType === "Quarterly") return 3;
//     if (planType === "Yearly") return 12;
//     return 1;
//   };

//   const grandTotal = useMemo(() => {
//     return rows.reduce((sum, row) => {
//       const fee = Number(row.monthlyFee) || 0;
//       return sum + fee * getPlanMultiplier(row.planType);
//     }, 0);
//   }, [rows]);

//   // ============================
//   // POPUP FUNCTIONS
//   // ============================
//   const openPopup = () => {
//     setNewRow({
//       memberLabel: "",
//       selectedMember: null,
//       planType: "Monthly",
//       monthlyFee: "",
//       joiningDate: getToday(),
//       notes: "",
//     });
//     setShowPopup(true);
//   };

//   const handleSaveNewRow = () => {
//     setRows([...rows, newRow]);
//     setShowPopup(false);
//   };

//   const handleRemove = (idx) => {
//     setRows(rows.filter((_, i) => i !== idx));
//   };

//   const isValid =
//     selectedBatch &&
//     rows.length > 0 &&
//     rows.every((r) => r.selectedMember && r.monthlyFee);
//    const handleSubmit = async () => {
//   if (!isValid) return showError("Please add at least one valid member!");

//   try {
//     for (const row of rows) {

//       const payload = {
//         batchId: selectedBatch._id,
//         memberId: row.selectedMember._id,
//         planType: row.planType,
//         monthlyFee: Number(row.monthlyFee),
//         joiningDate: row.joiningDate,
//         notes: row.notes || "",
//       };

//       console.log("Sending →", payload);

//       // 👇 API request (one by one)
//       await addMemberToBatchApi(payload);
//     }

//     showSuccess("All members added successfully with invoices!");
//     navigate("/admin/batch-member-list");
//   } catch (err) {
//     showError(err?.message || "Failed to add member(s)");
//   }
// };

//   // ============================
//   // UI START
//   // ============================
//   return (
//     <div className="min-h-screen font-sans relative">
//       <h1 className="text-2xl font-800 text-dark mb-2">Add Members to Batch</h1>
//       <p className="text-muted mb-4">Select batch → Add members → Set pricing</p>

//       <div className="mx-auto bg-white rounded-2xl shadow-md border border-light p-6 md:p-8">

//         {/* SELECT BATCH */}
//         <div className="mb-8 max-w-xl">
//           <SuggestiveSelect
//             label="Select Batch"
//             required
//             placeholder="Choose batch"
//             loading={loadingBatches}
//             suggestions={batchSuggestions}
//             value={selectedBatchLabel}
//             onChange={handleBatchChange}
//           />

//           {selectedBatch && (
//             <p className="text-xs text-muted mt-2">
//               Selected: {selectedBatch.batchName} ({(selectedBatch.days || []).join(", ")})
//             </p>
//           )}
//         </div>

//         {/* MEMBERS TABLE */}
//         {selectedBatch && (
//           <div className="mb-6">

//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-700 text-dark">Members & Pricing</h2>

//               <button onClick={openPopup} className="btn btn-primary px-5 py-2 rounded-lg">
//                 + Add Member
//               </button>
//             </div>

//             {/* TABLE */}
//             {rows.length > 0 && (
//               <div className="overflow-x-auto border border-light rounded-xl mb-5">
//                 <table className="w-full text-left">
//                   <thead className="bg-offwhite text-dark text-sm">
//                     <tr>
//                       <th className="p-3">Member</th>
//                       <th className="p-3">Plan</th>
//                       <th className="p-3">Fee</th>
//                       <th className="p-3">Total</th>
//                       <th className="p-3">Joining</th>
//                       <th className="p-3 text-center">Actions</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {rows.map((r, idx) => (
//                       <tr key={idx} className="border-t border-light">
//                         <td className="p-3 text-sm">
//                           {r.selectedMember.fullName}
//                           <br />
//                           <span className="text-muted text-xs">
//                             {r.selectedMember.email}
//                           </span>
//                         </td>

//                         <td className="p-3">{r.planType}</td>
//                         <td className="p-3">{r.monthlyFee}</td>
//                         <td className="p-3">
//                           {Number(r.monthlyFee) * getPlanMultiplier(r.planType)}
//                         </td>
//                         <td className="p-3">{r.joiningDate}</td>

//                         <td className="p-3 text-center">
//                           <button
//                             onClick={() => handleRemove(idx)}
//                             className="text-red-500 hover:text-red-700"
//                           >
//                             <Trash2 size={16} />
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}

//         {/* SUBMIT BUTTON */}
//         {selectedBatch && (
//           <div className="flex justify-end mt-4">
//             <button
//               onClick={handleSubmit}
//               disabled={!isValid}
//               className="btn btn-primary flex items-center gap-2"
//             >
//               <Plus size={18} />
//               Add Members to Batch
//             </button>
//           </div>
//         )}
//       </div>

//       {/* POPUP MODAL */}
//       {showPopup && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-6 relative">
//             <button
//               className="absolute top-3 right-3 text-gray-500 hover:text-black"
//               onClick={() => setShowPopup(false)}
//             >
//               <X size={20} />
//             </button>

//             <h2 className="text-lg font-700 text-dark mb-4">Add Member</h2>

//             <SuggestiveSelect
//               label="Member"
//               placeholder="Select member"
//               loading={loadingMembers}
//               suggestions={memberSuggestions}
//               value={newRow.memberLabel}
//               onChange={(label) => {
//                 const m = members.find(
//                   (mm) => `${mm.fullName} (${mm.email})` === label
//                 );
//                 setNewRow({ ...newRow, memberLabel: label, selectedMember: m });
//               }}
//             />

//             {/* Info Display */}
//             {newRow.selectedMember && (
//               <p className="text-sm font-600 text-dark mt-1">
//                 {newRow.selectedMember.email} • {newRow.selectedMember.phone}
//               </p>
//             )}

//             <div className="mt-4">
//               <label className="text-sm font-600 mb-2 block text-dark">Plan</label>
//               <div className="flex gap-3 flex-wrap">
//                 {PLAN_OPTIONS.map((p) => (
//                   <button
//                     key={p}
//                     onClick={() => setNewRow({ ...newRow, planType: p })}
//                     className={`px-3 py-3 rounded-md text-sm border ${
//                       newRow.planType === p
//                         ? "bg-primary text-white border-primary"
//                         : "bg-offwhite text-dark border-light"
//                     }`}
//                   >
//                     {p}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="mt-4">
//               <InputField
//                 label="Monthly Fee (₹)"
//                 type="number"
//                 placeholder="e.g. 1500"
//                 value={newRow.monthlyFee}
//                 onChange={(e) =>
//                   setNewRow({ ...newRow, monthlyFee: e.target.value })
//                 }
//               />
//             </div>

//             <div className="mt-4">
//               <label className="text-sm font-600 mb-2 block text-dark">Joining Date</label>
//               <input
//                 type="date"
//                 value={newRow.joiningDate}
//                 onChange={(e) =>
//                   setNewRow({ ...newRow, joiningDate: e.target.value })
//                 }
//                 className="w-full px-3 py-3 rounded-lg border border-light bg-offwhite"
//               />
//             </div>

//             <div className="mt-4">
//               <InputField
//                 label="Notes (optional)"
//                 placeholder="e.g. Paid cash, discount"
//                 value={newRow.notes}
//                 onChange={(e) =>
//                   setNewRow({ ...newRow, notes: e.target.value })
//                 }
//               />
//             </div>

//             <div className="flex justify-end gap-3 mt-6">
//               <button
//                 onClick={() => setShowPopup(false)}
//                 className="px-4 py-2 border border-light rounded-lg text-muted text-sm"
//               >
//                 Cancel
//               </button>

//               <button
//                 disabled={!newRow.selectedMember || !newRow.monthlyFee}
//                 onClick={handleSaveNewRow}
//                 className="btn btn-primary px-6 py-2"
//               >
//                 Save Member
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddMemberFullPage;

import React, { useState, useEffect, useMemo } from "react";
import SuggestiveSelect from "../../../components/common/SuggestiveSelect";
import InputField from "../../../components/landingPage/TrainerRegister/InputField";
import { X } from "lucide-react";

import {
  getAllBatchesApi,
  getAllMembersApi,
  addMemberToBatchApi,
} from "../../../apis/adminApi";

import { showError, showSuccess } from "../../../utils/toastService";
import { useNavigate } from "react-router-dom";

const PLAN_OPTIONS = ["Monthly"];
const getToday = () => new Date().toISOString().slice(0, 10);

const AddMemberFullPage = () => {
  const [batches, setBatches] = useState([]);
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  const [loadingBatches, setLoadingBatches] = useState(true);
  const [loadingMembers, setLoadingMembers] = useState(true);

  const [selectedBatchLabel, setSelectedBatchLabel] = useState("");
  const [selectedBatch, setSelectedBatch] = useState(null);

  const [showPopup, setShowPopup] = useState(false);

  const [newRow, setNewRow] = useState({
    memberLabel: "",
    selectedMember: null,
    planType: "Monthly",
    monthlyFee: "",
    joiningDate: getToday(),
    notes: "",
  });

  /* ---------------- Fetch Batches ---------------- */
  const fetchBatches = async () => {
    try {
      setLoadingBatches(true);
      const res = await getAllBatchesApi();
      setBatches(res.batches || res.data || []);
    } catch (err) {
      showError("Failed to load batches");
    } finally {
      setLoadingBatches(false);
    }
  };

  /* ---------------- Fetch Members ---------------- */
  const fetchMembers = async () => {
    try {
      setLoadingMembers(true);
      const res = await getAllMembersApi();
      setMembers(res.members || res.data || []);
    } catch (err) {
      showError("Failed to load members");
    } finally {
      setLoadingMembers(false);
    }
  };

  useEffect(() => {
    fetchBatches();
    fetchMembers();
  }, []);

  /* ---------------- Suggestions ---------------- */
  const batchSuggestions = useMemo(() => {
    return batches.map(
      (b) => `${b.batchName} (${(b.days || []).join(", ")})`
    );
  }, [batches]);

  const memberSuggestions = useMemo(() => {
    return members.map((m) => `${m.fullName} (${m.email})`);
  }, [members]);

  /* ---------------- Batch Select ---------------- */
  const handleBatchChange = (label) => {
    setSelectedBatchLabel(label);

    const match = batches.find(
      (b) => `${b.batchName} (${(b.days || []).join(", ")})` === label
    );

    setSelectedBatch(match || null);
  };

  /* ---------------- Popup ---------------- */
  const openPopup = () => {
    setNewRow({
      memberLabel: "",
      selectedMember: null,
      planType: "Monthly",
      monthlyFee: "",
      joiningDate: getToday(),
      notes: "",
    });
    setShowPopup(true);
  };

  /* ---------------- Direct Save (API) ---------------- */
  const handleSave = async () => {
    if (!selectedBatch)
      return showError("Please select a batch first!");

    if (!newRow.selectedMember)
      return showError("Please select a member!");

    if (!newRow.monthlyFee)
      return showError("Please enter monthly fee!");

    const payload = {
      batchId: selectedBatch._id,
      memberId: newRow.selectedMember._id,
      planType: newRow.planType,
      monthlyFee: Number(newRow.monthlyFee),
      joiningDate: newRow.joiningDate,
      notes: newRow.notes || "",
    };

    try {
      await addMemberToBatchApi(payload);
      showSuccess("Member added successfully!");

      setShowPopup(false);
      navigate("/admin/batch-member-list");
    } catch (err) {
      showError(err?.message || "Failed to add member");
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen font-sans relative">
      <h1 className="text-2xl font-800 text-dark mb-2">
        Add Member to Batch
      </h1>
      <p className="text-muted mb-4">
        Select batch → Add member → Save
      </p>

      <div className="mx-auto bg-white rounded-2xl shadow-md border border-light p-6 md:p-8">
        {/* SELECT BATCH */}
        <div className="mb-8 max-w-xl">
          <SuggestiveSelect
            label="Select Batch"
            required
            placeholder="Choose batch"
            loading={loadingBatches}
            suggestions={batchSuggestions}
            value={selectedBatchLabel}
            onChange={handleBatchChange}
          />

          {selectedBatch && (
            <p className="text-xs text-muted mt-2">
              Selected: {selectedBatch.batchName} (
              {(selectedBatch.days || []).join(", ")})
            </p>
          )}
        </div>

        {/* Add Member Button */}
        {selectedBatch && (
          <button
            onClick={openPopup}
            className="btn btn-primary px-5 py-2 rounded-lg"
          >
            + Add Member
          </button>
        )}
      </div>

      {/* POPUP MODAL */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={() => setShowPopup(false)}
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-700 text-dark mb-4">Add Member</h2>

            <SuggestiveSelect
              label="Member"
              placeholder="Select member"
              loading={loadingMembers}
              suggestions={memberSuggestions}
              value={newRow.memberLabel}
              onChange={(label) => {
                const m = members.find(
                  (mm) =>
                    `${mm.fullName} (${mm.email})` === label
                );
                setNewRow({
                  ...newRow,
                  memberLabel: label,
                  selectedMember: m,
                });
              }}
            />

            {newRow.selectedMember && (
              <p className="text-sm font-600 text-dark mt-1">
                {newRow.selectedMember.email} •{" "}
                {newRow.selectedMember.phone}
              </p>
            )}

            <div className="mt-4">
              <label className="text-sm font-600 block mb-2">
                Plan
              </label>
              <button
                className={`px-3 py-3 rounded-md text-sm border ${
                  newRow.planType === "Monthly"
                    ? "bg-primary text-white border-primary"
                    : "bg-offwhite text-dark border-light"
                }`}
              >
                Monthly
              </button>
            </div>

            <div className="mt-4">
              <InputField
                label="Monthly Fee (₹)"
                type="number"
                placeholder="e.g. 1500"
                value={newRow.monthlyFee}
                onChange={(e) =>
                  setNewRow({
                    ...newRow,
                    monthlyFee: e.target.value,
                  })
                }
              />
            </div>

            <div className="mt-4">
              <label className="text-sm font-600 block mb-2">
                Joining Date
              </label>
              <input
                type="date"
                value={newRow.joiningDate}
                onChange={(e) =>
                  setNewRow({
                    ...newRow,
                    joiningDate: e.target.value,
                  })
                }
                className="w-full px-3 py-3 rounded-lg border border-light bg-offwhite"
              />
            </div>

            <div className="mt-4">
              <InputField
                label="Notes (optional)"
                placeholder="e.g. Paid cash, discount"
                value={newRow.notes}
                onChange={(e) =>
                  setNewRow({
                    ...newRow,
                    notes: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 border border-light rounded-lg text-muted text-sm"
              >
                Cancel
              </button>

              <button
                disabled={
                  !newRow.selectedMember || !newRow.monthlyFee
                }
                onClick={handleSave}
                className="btn btn-primary px-6 py-2"
              >
                Save Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMemberFullPage;
