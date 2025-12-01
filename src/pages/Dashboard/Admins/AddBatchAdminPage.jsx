import React, { useEffect, useState } from "react";
import InputField from "../../../components/landingPage/TrainerRegister/InputField";
import InputRow from "../../../components/landingPage/TrainerRegister/InputRow";
import SuggestiveSelect from "../../../components/common/SuggestiveSelect";
import SuggestiveMultiSelect from "../../../components/common/SuggestiveMultiSelect";
import { Save } from "lucide-react";
import { getStudiosList, getTrainersList, createBatchApi } from "../../../apis/adminApi";
import { showError, showSuccess } from "../../../utils/toastService";


const AddBatchAdminPage = () => {
  const [saving, setSaving] = useState(false);


  const [studios, setStudios] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [loadingStudios, setLoadingStudios] = useState(true);
  const [loadingTrainers, setLoadingTrainers] = useState(false);
  const fetchTrainers = async () => {
    try {
      setLoadingTrainers(true);

      const res = await getTrainersList();
      const trainerList = res.data.trainers
        || res || [];

      setTrainers(
        trainerList.map((t) => ({
          id: t._id || t.id,
          name: t.fullName || t.name,
          email: t.email,
        }))
      );
    } catch (err) {
      showError(err?.message || "Failed to load trainers");
    } finally {
      setLoadingTrainers(false);
    }
  };
  const fetchStudios = async () => {
    try {
      setLoadingStudios(true);
      const res = await getStudiosList();


      const studioList = res.studios || [];

      setStudios(studioList);
    } catch (err) {
      showError(err?.message || "Failed to load studios");
    } finally {
      setLoadingStudios(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
    fetchStudios();
  }, []);



  // ------------------- Form Data -------------------
  const [formData, setFormData] = useState({
    studioId: "",
    batchName: "",
    batchType: "Group",
    level: "",
    difficulty: "",
    mode: "",
    trainerId: "",
    days: [],
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
    price: "",
    capacity: "",
    roomName: "",
    meetingLink: "",
    tags: [],
    description: "",
    status: "Active",
    visibility: "Public",
  });

  const handleInput = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));


  const daysOptions = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const toggleDay = (day) => {
    setFormData((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };

  const [slots, setSlots] = useState([]);

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


const handleSubmit = async () => {
  try {
    setSaving(true);

    if (!formData.studioId) return alert("Select a studio");
    if (!formData.batchName.trim()) return alert("Batch name is required");
    if (!formData.trainerId) return alert("Please select trainer");
    if (!formData.days.length) return alert("Please select at least one day");
    if (!formData.startTime || !formData.endTime)
      return alert("Please select start and end time");

    const payload = {
      studioId: formData.studioId,
      batchName: formData.batchName,
      description: formData.description,
      batchType: formData.batchType,
      level: formData.level,
      difficulty: formData.difficulty,
      mode: formData.mode,
      assignedTrainers: [formData.trainerId],
      days: formData.days,
      startTime: formData.startTime,
      endTime: formData.endTime,
      startDate: formData.startDate,
      endDate: formData.endDate || null,
      extraSlots: slots,
      price: Number(formData.price),
      capacity: Number(formData.capacity),
      roomName: formData.roomName,
      meetingLink: formData.meetingLink,
      tags: formData.tags,
      status: formData.status,
      visibility: formData.visibility,
      language: null,
      cancellationPolicy: null,
      genderRefference: null,
      ageGroup: null,
      thumbnail: null,
    };

    const res = await createBatchApi(payload);
    console.log("Batch created:--------", res);
    showSuccess(res.message || "Batch Created Successfully!");
  } catch (err) {
    console.log("Error:", err.message);

    showError(err.message);
  } finally {
    setSaving(false);
  }
};


  return (
    <div className="bg-gray-50 min-h-screen  font-sans">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-800 text-dark mb-1">Create New Batch</h1>
        <p className="text-muted">
          Admin can create and manage batches for any studio.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white p-8 rounded-2xl shadow-md border border-light animate-fade-in">

        <div className="flex flex-col gap-3">

          {/* ========== SECTION 1: Basic Info ========== */}
          <div>
            <h2 className="text-lg font-700 text-dark mb-4">Basic Details</h2>

            <InputRow>
              <InputField
                label="Batch Name"
                required
                placeholder="Morning Hatha Flow, Evening Relaxation..."
                value={formData.batchName}
                onChange={(e) => handleInput("batchName", e.target.value)}
              />

              <InputField
                as="textarea"
                label="Description"
                placeholder="Write about this batch..."
                value={formData.description}
                onChange={(e) => handleInput("description", e.target.value)}
              />
            </InputRow>

            <InputRow columns={3}>
              <SuggestiveSelect
                label="Batch Type"
                required
                placeholder="Select batch type"
                suggestions={["Group", "1-on-1", "Small Group"]}
                value={formData.batchType}
                onChange={(val) => handleInput("batchType", val)}
              />

              <SuggestiveSelect
                label="Level"
                required
                suggestions={["Beginner", "Intermediate", "Advanced", "All Levels"]}
                value={formData.level}
                onChange={(val) => handleInput("level", val)}
              />

              <SuggestiveSelect
                label="Intensity"
                required
                suggestions={["Gentle", "Moderate", "Intense"]}
                value={formData.difficulty}
                onChange={(val) => handleInput("difficulty", val)}
              />
            </InputRow>

            <InputRow>
              <SuggestiveSelect
                label="Mode"
                required
                suggestions={["Online", "Offline", "Hybrid"]}
                value={formData.mode}
                onChange={(val) => handleInput("mode", val)}
              />
            </InputRow>
          </div>

          {/* ========== SECTION 2: Trainer & Schedule ========== */}
          <div>
            <h2 className="text-lg font-700 text-dark mb-4">Trainer & Schedule</h2>

            <InputRow>
              {loadingStudios ? (
                <div className="w-full h-[52px] bg-gray-200 rounded-lg animate-pulse" />
              ) : (
                <SuggestiveSelect
                  label="Select Studio"
                  suggestions={studios.map((s) => s.name)}
                  value={
                    formData.studioId
                      ? studios.find((s) => s._id === formData.studioId)?.name
                      : ""
                  }
                  onChange={(val) => {
                    const selected = studios.find((s) => s.name === val);
                    handleInput("studioId", selected?._id || "");
                  }}
                />
              )}



              {loadingTrainers ? (
                <div className="w-full h-[52px] bg-gray-200 rounded-lg animate-pulse" />
              ) : (
                <SuggestiveSelect
                  label="Select Trainer"
                  suggestions={trainers.map((t) => t.name)}
                  value={
                    formData.trainerId
                      ? trainers.find((t) => t.id === formData.trainerId)?.name
                      : ""
                  }
                  onChange={(val) => {
                    const selected = trainers.find((t) => t.name === val);
                    handleInput("trainerId", selected?.id || "");
                  }}
                />
              )}


            </InputRow>

            {/* Days */}
            <div className="mb-6 ">
              <label className="text-sm font-600 text-dark">Select Days *</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {daysOptions.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`px-4 py-2 rounded-xl border border-light text-sm font-500 
                      ${formData.days.includes(day)
                        ? "bg-primary text-white"
                        : "bg-offwhite text-dark"
                      }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Times */}
            <InputRow>
              <InputField
                label="Start Time"
                type="time"
                required
                value={formData.startTime}
                onChange={(e) => handleInput("startTime", e.target.value)}
              />

              <InputField
                label="End Time"
                type="time"
                required
                value={formData.endTime}
                onChange={(e) => handleInput("endTime", e.target.value)}
              />
            </InputRow>

            <InputRow>
              <InputField
                label="Start Date"
                type="date"
                required
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

          {/* ========== SECTION: MULTIPLE SLOTS TABLE ========== */}
          <div className="mb-6">
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
                  {slots.map((slot, index) => (
                    <tr key={index} className="border-t border-light">
                      <td className="p-3">
                        <select
                          value={slot.day}
                          onChange={(e) => updateSlot(index, "day", e.target.value)}
                          className="w-full border border-light rounded-lg p-2 bg-offwhite"
                        >
                          <option value="">Select</option>
                          {daysOptions.map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </td>

                      <td className="p-3">
                        <input
                          type="time"
                          value={slot.start}
                          onChange={(e) => updateSlot(index, "start", e.target.value)}
                          className="w-full border border-light rounded-lg p-2 bg-offwhite"
                        />
                      </td>

                      <td className="p-3">
                        <input
                          type="time"
                          value={slot.end}
                          onChange={(e) => updateSlot(index, "end", e.target.value)}
                          className="w-full border border-light rounded-lg p-2 bg-offwhite"
                        />
                      </td>

                      <td className="p-3 text-center">
                        <button
                          onClick={() => removeSlot(index)}
                          className="text-red-500 hover:text-red-700 bg-offwhite px-3 py-1 rounded-lg font-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  <tr>
                    <td colSpan="4" className="p-3 text-center">
                      <button type="button" onClick={addSlot} className="btn btn-outline px-5">
                        + Add Slot
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ========== SECTION 3: Pricing ========== */}
          <div>
            <h2 className="text-lg font-700 text-dark mb-4">Pricing & Capacity</h2>

            <InputRow>
              <InputField
                label="Price (INR)"
                type="number"
                required
                placeholder="e.g. 499"
                value={formData.price}
                onChange={(e) => handleInput("price", e.target.value)}
              />

              <InputField
                label="Capacity"
                type="number"
                required
                placeholder="Max students"
                value={formData.capacity}
                onChange={(e) => handleInput("capacity", e.target.value)}
              />
            </InputRow>
          </div>

          {/* ========== SECTION 4: Room / Link ========== */}
          <div>
            <h2 className="text-lg font-700 text-dark mb-4">Location / Meeting</h2>

            <InputRow>
              <InputField
                label="Room / Studio Name"
                placeholder="Room A, Main Hall, Rooftop..."
                value={formData.roomName}
                onChange={(e) => handleInput("roomName", e.target.value)}
              />

              <InputField
                label="Online Meeting Link"
                placeholder="Zoom / Google Meet link"
                value={formData.meetingLink}
                onChange={(e) => handleInput("meetingLink", e.target.value)}
              />
            </InputRow>
          </div>

          {/* ========== SECTION 5: Tags ========== */}
          <div>
            <h2 className="text-lg font-700 text-dark mb-4">Content & Tags</h2>

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

          {/* ========== SECTION 6: Status ========== */}
          <div>
            <h2 className="text-lg font-700 text-dark mb-4">Status & Visibility</h2>

            <InputRow>
              <div className="flex-1">
                <label className="text-sm font-600 text-dark mb-2">Status</label>
                <div className="flex gap-2 flex-wrap">
                  {["Active", "Inactive", "Draft"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleInput("status", s)}
                      className={`px-4 py-2 rounded-xl border text-sm font-500 ${formData.status === s
                          ? "bg-primary text-white"
                          : "bg-offwhite text-dark"
                        }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <label className="text-sm font-600 text-dark mb-2">Visibility</label>
                <div className="flex gap-2 flex-wrap">
                  {["Public", "Private"].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => handleInput("visibility", v)}
                      className={`px-4 py-2 rounded-xl border text-sm font-500 ${formData.visibility === v
                          ? "bg-primary text-white"
                          : "bg-offwhite text-dark"
                        }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </InputRow>
          </div>

          {/* ========== SUBMIT ========== */}
          <div className="w-full flex justify-end">
           <button
  onClick={handleSubmit}
  disabled={saving}
  className={`btn btn-primary flex items-center gap-2 ${
    saving ? "opacity-50 cursor-not-allowed" : ""
  }`}
>
  {saving ? (
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
  ) : (
    <Save size={18} />
  )}

  {saving ? "Creating..." : "Create Batch"}
</button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default AddBatchAdminPage;
