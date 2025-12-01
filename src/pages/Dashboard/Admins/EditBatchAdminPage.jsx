import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import InputField from "../../../components/landingPage/TrainerRegister/InputField";
import InputRow from "../../../components/landingPage/TrainerRegister/InputRow";
import SuggestiveSelect from "../../../components/common/SuggestiveSelect";
import SuggestiveMultiSelect from "../../../components/common/SuggestiveMultiSelect";
import { Save } from "lucide-react";

const EditBatchAdminPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ------------------- Dummy DATA (replace with API) -------------------
  const studios = [
    { id: "s1", name: "YogShala Central" },
    { id: "s2", name: "Zen Wellness Studio" },
  ];

  const trainersByStudio = {
    s1: [
      { id: "t1", name: "Aarav Sharma" },
      { id: "t2", name: "Priya Singh" },
    ],
    s2: [
      { id: "t3", name: "Rohan Mehta" },
      { id: "t4", name: "Kavya Rao" },
    ],
  };

  const daysOptions = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // ------------------- FORM STATE -------------------
  const [formData, setFormData] = useState(null);
  const [slots, setSlots] = useState([]);

  const handleInput = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  // ------------------- Load existing Batch -------------------
  useEffect(() => {
    // Fetch from API →  /api/batches/:id
    // Mock response:
    const existingBatch = {
      studioId: "s1",
      batchName: "Morning Hatha Yoga",
      batchType: "Group",
      level: "Intermediate",
      difficulty: "Moderate",
      mode: "Offline",
      trainerId: "t1",
      days: ["Mon", "Wed", "Fri"],
      startTime: "07:00",
      endTime: "08:00",
      startDate: "2025-01-01",
      endDate: "",
      price: "499",
      capacity: "25",
      roomName: "Hall A",
      meetingLink: "",
      tags: ["Flexibility", "Strength"],
      description: "A refreshing morning session",
      status: "Active",
      visibility: "Public",
      extraSlots: [
        { day: "Tue", start: "09:00", end: "10:00" },
      ],
    };

    setFormData(existingBatch);
    setSlots(existingBatch.extraSlots || []);
  }, [id]);

  if (!formData) return <p className="p-4">Loading batch...</p>;

  // Trainer list based on studio
  const trainers = formData.studioId
    ? trainersByStudio[formData.studioId] || []
    : [];

  // ------------------- DAYS TOGGLE -------------------
  const toggleDay = (day) => {
    setFormData((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };

  // ------------------- SLOTS HANDLERS -------------------
  const addSlot = () => {
    setSlots((prev) => [...prev, { day: "", start: "", end: "" }]);
  };

  const updateSlot = (index, key, value) => {
    const updated = [...slots];
    updated[index][key] = value;
    setSlots(updated);
  };

  const removeSlot = (index) => {
    setSlots((prev) => prev.filter((_, i) => i !== index));
  };

  // ------------------- SUBMIT -------------------
  const handleSubmit = () => {
    const payload = {
      ...formData,
      extraSlots: slots,
    };

    console.log("Updated Batch →", payload);

    alert("Batch Updated Successfully!");
    navigate("/admin/batch-list");
  };

  // ---------------------------------------------------------------------------
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-800 text-dark mb-1">Edit Batch</h1>
        <p className="text-muted">Modify batch details and update schedule.</p>
      </div>

      {/* Main Card */}
      <div className="bg-white p-8 rounded-2xl shadow-lg ">

        <div className="flex flex-col gap-3">

          {/* ========== SECTION 1: Basic Info ========== */}
          <div>
            <h2 className="text-lg font-700 text-dark mb-4">Basic Details</h2>

            <InputRow>
              <InputField
                label="Batch Name"
                required
                value={formData.batchName}
                onChange={(e) => handleInput("batchName", e.target.value)}
              />

              <InputField
                as="textarea"
                label="Description"
                value={formData.description}
                onChange={(e) => handleInput("description", e.target.value)}
              />
            </InputRow>

            <InputRow columns={3}>
              <SuggestiveSelect
                label="Batch Type"
                required
                suggestions={["Group", "1-on-1", "Small Group"]}
                value={formData.batchType}
                onChange={(v) => handleInput("batchType", v)}
              />

              <SuggestiveSelect
                label="Level"
                required
                suggestions={["Beginner", "Intermediate", "Advanced", "All Levels"]}
                value={formData.level}
                onChange={(v) => handleInput("level", v)}
              />

              <SuggestiveSelect
                label="Intensity"
                required
                suggestions={["Gentle", "Moderate", "Intense"]}
                value={formData.difficulty}
                onChange={(v) => handleInput("difficulty", v)}
              />
            </InputRow>
          </div>

          {/* ========== SECTION 2: Trainer & Schedule ========== */}
          <div>
            <h2 className="text-lg font-700 text-dark mb-4">Trainer & Schedule</h2>

            <InputRow>
              <SuggestiveSelect
                label="Select Studio"
                required
                suggestions={studios.map((s) => s.name)}
                value={studios.find((s) => s.id === formData.studioId)?.name || ""}
                onChange={(val) => {
                  const selected = studios.find((s) => s.name === val);
                  handleInput("studioId", selected?.id || "");
                  handleInput("trainerId", "");
                }}
              />

              <SuggestiveSelect
                label="Select Trainer"
                required
                suggestions={trainers.map((t) => t.name)}
                value={
                  trainers.find((t) => t.id === formData.trainerId)?.name || ""
                }
                onChange={(val) => {
                  const trainer = trainers.find((t) => t.name === val);
                  handleInput("trainerId", trainer?.id || "");
                }}
              />
            </InputRow>

            {/* Days */}
            <div className="mb-6">
              <label className="text-sm font-600 text-dark">Select Days *</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {daysOptions.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`px-4 py-2 rounded-xl border text-sm font-500 ${
                      formData.days.includes(day)
                        ? "bg-primary text-white"
                        : "bg-offwhite text-dark"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <InputRow>
              <InputField
                label="Start Time"
                type="time"
                value={formData.startTime}
                onChange={(e) => handleInput("startTime", e.target.value)}
              />
              <InputField
                label="End Time"
                type="time"
                value={formData.endTime}
                onChange={(e) => handleInput("endTime", e.target.value)}
              />
            </InputRow>

            <InputRow>
              <InputField
                label="Start Date"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInput("startDate", e.target.value)}
              />
              <InputField
                label="End Date (optional)"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInput("endDate", e.target.value)}
              />
            </InputRow>
          </div>

          {/* ========== SECTION: MULTIPLE SLOTS ========== */}
          <div>
            <h2 className="text-lg font-700 text-dark mb-4">Additional Time Slots</h2>

            <div className="overflow-x-auto border border-light rounded-xl">
              <table className="w-full text-left">
                <thead className="bg-offwhite text-dark text-sm">
                  <tr>
                    <th className="p-3">Day</th>
                    <th className="p-3">Start</th>
                    <th className="p-3">End</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {slots.map((slot, i) => (
                    <tr key={i} className="border-t border-light">
                      <td className="p-3">
                        <select
                          value={slot.day}
                          onChange={(e) => updateSlot(i, "day", e.target.value)}
                          className="w-full p-2 rounded-lg bg-offwhite border"
                        >
                          <option value="">Select</option>
                          {daysOptions.map((d) => (
                            <option key={d}>{d}</option>
                          ))}
                        </select>
                      </td>

                      <td className="p-3">
                        <input
                          type="time"
                          value={slot.start}
                          onChange={(e) => updateSlot(i, "start", e.target.value)}
                          className="w-full p-2 rounded-lg bg-offwhite border"
                        />
                      </td>

                      <td className="p-3">
                        <input
                          type="time"
                          value={slot.end}
                          onChange={(e) => updateSlot(i, "end", e.target.value)}
                          className="w-full p-2 rounded-lg bg-offwhite border"
                        />
                      </td>

                      <td className="p-3 text-center">
                        <button
                          onClick={() => removeSlot(i)}
                          className="text-red-500 font-600 px-3 py-1"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  <tr>
                    <td colSpan="4" className="p-3 text-center">
                      <button onClick={addSlot} className="btn btn-outline px-5">
                        + Add Slot
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ========== Pricing ========== */}
          <div>
            <h2 className="text-lg font-700 text-dark mb-4">Pricing & Capacity</h2>

            <InputRow>
              <InputField
                label="Price (INR)"
                type="number"
                value={formData.price}
                onChange={(e) => handleInput("price", e.target.value)}
              />

              <InputField
                label="Capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => handleInput("capacity", e.target.value)}
              />
            </InputRow>
          </div>

          {/* ========== Room / Link ========== */}
          <div>
            <h2 className="text-lg font-700 text-dark mb-4">Location / Meeting</h2>

            <InputRow>
              <InputField
                label="Room / Studio Name"
                value={formData.roomName}
                onChange={(e) => handleInput("roomName", e.target.value)}
              />
              <InputField
                label="Online Meeting Link"
                value={formData.meetingLink}
                onChange={(e) => handleInput("meetingLink", e.target.value)}
              />
            </InputRow>
          </div>

          {/* ========== Tags ========== */}
          <div>
            <h2 className="text-lg font-700 text-dark mb-4">Tags</h2>

            <SuggestiveMultiSelect
              label="Focus Tags"
              suggestions={[
                "Back Pain Relief",
                "Weight Loss",
                "Strength",
                "Flexibility",
                "Mindfulness",
              ]}
              values={formData.tags}
              onChange={(vals) => handleInput("tags", vals)}
            />
          </div>

          {/* ========== Status ========== */}
          <div>
            <h2 className="text-lg font-700 text-dark mb-4">Status & Visibility</h2>

            <InputRow>
              <div className="flex-1">
                <label className="text-sm font-600 text-dark">Status</label>
                <div className="flex gap-2 mt-2">
                  {["Active", "Inactive", "Draft"].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleInput("status", s)}
                      className={`px-4 py-2 rounded-xl border ${
                        formData.status === s ? "bg-primary text-white" : "bg-offwhite"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <label className="text-sm font-600 text-dark">Visibility</label>
                <div className="flex gap-2 mt-2">
                  {["Public", "Private"].map((v) => (
                    <button
                      key={v}
                      onClick={() => handleInput("visibility", v)}
                      className={`px-4 py-2 rounded-xl border ${
                        formData.visibility === v
                          ? "bg-primary text-white"
                          : "bg-offwhite"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </InputRow>
          </div>

          {/* ========== SAVE BUTTON ========== */}
          <div className="flex justify-end">
            <button onClick={handleSubmit} className="btn btn-primary flex items-center gap-2">
              <Save size={18} />
              Update Batch
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditBatchAdminPage;
