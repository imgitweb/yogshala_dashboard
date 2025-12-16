import React, { useState, useRef } from "react";
import InputField from "../../../components/landingPage/TrainerRegister/InputField";
import InputRow from "../../../components/landingPage/TrainerRegister/InputRow";
import SuggestiveSelect from "../../../components/common/SuggestiveSelect";
import SuggestiveMultiSelect from "../../../components/common/SuggestiveMultiSelect";
import { Save } from "lucide-react";

import { createMemberApi } from "../../../apis/adminApi";
import { showError, showSuccess } from "../../../utils/toastService";

const AddMemberAdminPage = () => {
  const [saving, setSaving] = useState(false);
  const pageRef = useRef(null);

  // -------------------------------------------------------
  // FORM DATA
  // -------------------------------------------------------
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    age: "",
    gender: "",
    role: "Student",
    profilePicture: "",

    // Additional info
    occupation: "",
    joinedDate: "",   // ✅ FIXED


    // Health
    height: "",
    weight: "",
    bloodGroup: "",
    injuries: [],
    allergies: [],
    medicalConditions: [],

    // Goals
    primaryGoals: [],
    targetWeight: "",
    goalsNotes: "",

    // Emergency Contact
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: "",

    status: "Pending",
  });

  const handleInput = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  // Dropdown Options
  const genderOptions = ["Male", "Female", "Other"];
  const bloodOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const goalsOptions = [
    "Weight Loss",
    "Strength",
    "Flexibility",
    "General Fitness",
    "Rehabilitation",
  ];
  const occupationOptions = [
    "Student",
    "Working Professional",
    "Homemaker",
    "Retired",
  ];

  // -------------------------------------------------------
  // HELPER: SCROLL + HIGHLIGHT FIELD
  // -------------------------------------------------------
  const scrollToField = (id) => {
    const ele = document.getElementById(id);
    if (ele) {
      ele.scrollIntoView({ behavior: "smooth", block: "center" });
      ele.classList.add("ring-2", "ring-red-500");

      setTimeout(() => {
        ele.classList.remove("ring-2", "ring-red-500");
      }, 1200);
    }
  };

  // -------------------------------------------------------
  // VALIDATION + SCROLL TO FIRST ERROR
  // -------------------------------------------------------
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    // Full Name
    if (!formData.fullName || formData.fullName.trim().length < 2) {
      showError("Please enter a valid full name");
      scrollToField("fullName");
      return false;
    }


 // Email OPTIONAL but must be valid if provided
if (formData.email && !emailRegex.test(formData.email.trim())) {
  showError("Please enter a valid email (e.g. user@example.com)");
  scrollToField("email");
  return false;
}

// Password OPTIONAL but must be min 6 chars if provided
if (formData.password && formData.password.trim().length < 6) {
  showError("Password must be at least 6 characters");
  scrollToField("password");
  return false;
}


    // Phone required + 10 digits
    if (!formData.phone || formData.phone.trim() === "") {
      showError("Phone number is required");
      scrollToField("phone");
      return false;
    }
    if (!phoneRegex.test(formData.phone.trim())) {
      showError("Phone must be a 10-digit number");
      scrollToField("phone");
      return false;
    }

   
    if (formData.password.trim().length < 6) {
      showError("Password must be at least 6 characters");
      scrollToField("password");
      return false;
    }

    if (!formData.joinedDate) {
  showError("Please select joined date");
  scrollToField("joinedDate");
  return false;
}

    // Gender required
    if (!formData.gender) {
      showError("Please select gender");
      scrollToField("gender");
      return false;
    }

    // Age required + valid number
    const ageNum = Number(formData.age);
    if (!formData.age || Number.isNaN(ageNum)) {
      showError("Age is required");
      scrollToField("age");
      return false;
    }
    if (ageNum <= 0 || ageNum > 120) {
      showError("Please enter a valid age");
      scrollToField("age");
      return false;
    }

    // Emergency phone (optional but if filled, must be valid)
    if (
      formData.emergencyPhone &&
      !phoneRegex.test(formData.emergencyPhone.trim())
    ) {
      showError("Emergency phone must be a 10-digit number");
      scrollToField("emergencyPhone");
      return false;
    }

    return true;
  };

  // -------------------------------------------------------
  // SUBMIT HANDLER
  // -------------------------------------------------------
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setSaving(true);

      const payload = {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        gender: formData.gender,
        age: Number(formData.age),
        role: formData.role,
        occupation: formData.occupation,
        joinedDate: formData.joinedDate,
        profilePicture: formData.profilePicture,

  ...(formData.email && {
    email: formData.email.trim().toLowerCase(),
  }),

  ...(formData.password && {
    password: formData.password,
  }),


        health: {
          height: formData.height ? Number(formData.height) : null,
          weight: formData.weight ? Number(formData.weight) : null,
          bloodGroup: formData.bloodGroup,
          injuries: formData.injuries,
          allergies: formData.allergies,
          medicalConditions: formData.medicalConditions,
        },

        goals: {
          primaryGoals: formData.primaryGoals,
          targetWeight: formData.targetWeight
            ? Number(formData.targetWeight)
            : null,
          notes: formData.goalsNotes,
        },

        emergencyContact: {
          name: formData.emergencyName,
          phone: formData.emergencyPhone,
          relation: formData.emergencyRelation,
        },

        status: formData.status,
      };

      const res = await createMemberApi(payload);
      showSuccess(res.message || "Member created successfully!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        age: "",
        gender: "",
        role: "Student",
        profilePicture: "",

        // Additional info
        occupation: "",
        joinedDate: "",

        // Health
        height: "",
        weight: "",
        bloodGroup: "",
        injuries: [],
        allergies: [],
        medicalConditions: [],

        // Goals
        primaryGoals: [],
        targetWeight: "",
        goalsNotes: "",

        // Emergency Contact
        emergencyName: "",
        emergencyPhone: "",
        emergencyRelation: "",

        status: "Pending",
      });
    } catch (err) {
      showError(err?.message || "Failed to create member");
    } finally {
      setSaving(false);
    }
  };

  // -------------------------------------------------------
  // PAGE UI
  // -------------------------------------------------------
  return (
    <div ref={pageRef} className="bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-800 text-dark mb-1">Add New Member</h1>
        <p className="text-muted">Admin can create & manage members.</p>
      </div>

      {/* Card */}
      <div className="bg-white p-8 rounded-2xl shadow-md border border-light animate-fade-in">
        <div className="flex flex-col gap-6">
          {/* -------- BASIC DETAILS -------- */}
          <div>
            <h2 className="text-lg font-700 text-dark mb-4">Basic Details</h2>

            <InputRow>
              <InputField
                id="fullName"
                label="Full Name"
                required
                placeholder="John Sharma"
                value={formData.fullName}
                onChange={(e) => handleInput("fullName", e.target.value)}
              />

            <InputField
  id="email"
  label="Email"
  placeholder="example@gmail.com"
  value={formData.email}
  onChange={(e) => handleInput("email", e.target.value)}
/>


            </InputRow>


            <InputRow>
              <InputField
              required
                id="phone"
                label="Phone"
                placeholder="9876543210"
                value={formData.phone}
                onChange={(e) => handleInput("phone", e.target.value)}
              />

         <InputField
  id="password"
  label="Password"
  type="password"
  placeholder="Enter password"
  value={formData.password}
  onChange={(e) => handleInput("password", e.target.value)}
/>

            </InputRow>
            <InputRow>
              <div className="w-full" id="joinedDate">
                <InputField
                required
                  label="Joined Date"
                  type="date"
                  value={formData.joinedDate}
                  onChange={(e) => handleInput("joinedDate", e.target.value)}
                />
              </div>
            </InputRow>

          </div>

          {/* -------- HEALTH INFO -------- */}
          <div>
            <h2 className="text-lg font-700 text-dark mb-4">
              Health Information
            </h2>

            <InputRow columns={3}>
              <div className="w-full" id="height">
                <InputField

                  label="Height (cm)"
                  type="number"
                  placeholder="170"
                  value={formData.height}
                  onChange={(e) => handleInput("height", e.target.value)}
                />
              </div>

              <div className="w-full" id="weight">
                <InputField
                  label="Weight (kg)"
                  placeholder="70"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInput("weight", e.target.value)}
                />
              </div>

              <div className="w-full">
                <SuggestiveSelect
                  label="Blood Group"
                  placeholder="Select Blood Group"
                  suggestions={bloodOptions}
                  value={formData.bloodGroup}
                  onChange={(val) => handleInput("bloodGroup", val)}
                />
              </div>
            </InputRow>

            {/* -------- ADDITIONAL INFO (Occupation + Injuries + Allergies) -------- */}
            <div>
              <h2 className="text-lg font-700 text-dark mb-4">
                Additional Member Info
              </h2>

              <InputRow>
                <div className="w-full" id="occupation">
                  <SuggestiveSelect
                    id="occupation"
                    label="Occupation"
                    placeholder="Select Occupation"
                    suggestions={occupationOptions}
                    value={formData.occupation}
                    onChange={(val) => handleInput("occupation", val)}
                  />
                </div>

                <div className="w-full">
                  <SuggestiveMultiSelect
                    label="Injuries"
                    placeholder="Search Knee Issue, Back Pain etc."
                    suggestions={["Knee Issue", "Back Pain", "Neck Stiffness"]}
                    values={formData.injuries}
                    onChange={(vals) => handleInput("injuries", vals)}
                  />
                </div>

                <div className="w-full">
                  <SuggestiveMultiSelect
                    label="Allergies"
                    placeholder="Search Dust, Pollen etc."
                    suggestions={["Dust", "Pollen", "Food"]}
                    values={formData.allergies}
                    onChange={(vals) => handleInput("allergies", vals)}
                  />
                </div>
              </InputRow>
            </div>

            <SuggestiveMultiSelect
              label="Medical Conditions"
              placeholder="Search Hypertension, Diabetes, Asthma etc."
              suggestions={[
                "Asthma",
                "Hypertension",
                "Diabetes",
                "Heart Disease",
                "Arthritis",
                "Obesity",
              ]}
              values={formData.medicalConditions}
              onChange={(vals) => handleInput("medicalConditions", vals)}
            />
          </div>

          {/* -------- GOALS + GENDER + AGE + PROFILE PICTURE -------- */}
          <div>
            <h2 className="text-lg font-700 text-dark mb-4">Fitness Goals</h2>

            <SuggestiveMultiSelect
              placeholder="Search Strength, Weight Loss, Flexibility, General Fitness, Rehabilitation"
              label="Primary Goals"
              suggestions={goalsOptions}
              values={formData.primaryGoals}
              onChange={(vals) => handleInput("primaryGoals", vals)}
            />

            <InputRow>
              <InputField
                label="Target Weight (kg)"
                placeholder="70"
                type="number"
                value={formData.targetWeight}
                onChange={(e) => handleInput("targetWeight", e.target.value)}
              />

              <InputField
                as="textarea"
                label="Notes"
                placeholder="Any special instructions..."
                value={formData.goalsNotes}
                onChange={(e) => handleInput("goalsNotes", e.target.value)}
              />
            </InputRow>

            <InputRow columns={3}>
              {/* Gender Radio */}
              <div className="w-full" id="gender">
                <label className="text-sm font-600 text-dark mb-2 block">
                  Gender <span className="text-red-500">*</span>
                </label>

                <div className="flex gap-3 flex-wrap">
                  {genderOptions.map((g) => (
                    <label
                      key={g}
                      className={`px-4 py-3 rounded-xl border cursor-pointer text-sm font-500 ${formData.gender === g
                          ? "bg-primary text-white"
                          : "bg-offwhite text-dark"
                        }`}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={formData.gender === g}
                        onChange={() => handleInput("gender", g)}
                        className="hidden"
                      />
                      {g}
                    </label>
                  ))}
                </div>
              </div>

              {/* Age */}
              <div className="w-full">
                <InputField
                  id="age"
                  label="Age"
                  type="number"
                  required
                  placeholder="22"
                  value={formData.age}
                  onChange={(e) => handleInput("age", e.target.value)}
                />
              </div>

              {/* Profile Picture File Input */}
              <div className="w-full" id="profilePicture">
                <label className="text-sm font-600 text-dark mb-2 block">
                  Profile Picture{" "}
                  <span className="text-muted font-400">(optional)</span>
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    const localPreviewUrl = URL.createObjectURL(file);
                    handleInput("profilePicture", localPreviewUrl);

                    // TODO: yahan aap actual upload API call kar sakte ho,
                    // aur upload URL ko state me store kar sakte ho.
                  }}
                  className="w-full border border-light rounded-xl p-3 bg-offwhite cursor-pointer"
                />

                {formData.profilePicture && (
                  <img
                    src={formData.profilePicture}
                    alt="Preview"
                    className="mt-3 w-32 h-32 object-cover rounded-xl border"
                  />
                )}
              </div>
            </InputRow>
          </div>

          {/* -------- EMERGENCY CONTACT -------- */}
          <div>
            <h2 className="text-lg font-700 text-dark mb-4">
              Emergency Contact
            </h2>

            <InputRow>
              <InputField
                label="Name"
                placeholder="Jane Doe"
                value={formData.emergencyName}
                onChange={(e) => handleInput("emergencyName", e.target.value)}
              />

              <InputField
                id="emergencyPhone"
                label="Phone"
                placeholder="9876543210"
                value={formData.emergencyPhone}
                onChange={(e) =>
                  handleInput("emergencyPhone", e.target.value)
                }
              />

              <InputField
                label="Relation"
                value={formData.emergencyRelation}
                placeholder="Mother"
                onChange={(e) =>
                  handleInput("emergencyRelation", e.target.value)
                }
              />
            </InputRow>
          </div>

          {/* -------- STATUS (MOBILE-FRIENDLY RADIO STYLE) -------- */}
          <div>
            <h2 className="text-lg font-700 text-dark mb-4">Member Status</h2>

            <div className="flex flex-col gap-3">
              {["Pending", "Approved", "Rejected"].map((statusVal) => (
                <label
                  key={statusVal}
                  className="flex items-center gap-3 p-3 border border-light rounded-xl bg-offwhite cursor-pointer"
                >
                  <input
                    type="radio"
                    name="memberStatus"
                    value={statusVal}
                    checked={formData.status === statusVal}
                    onChange={() => handleInput("status", statusVal)}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-sm font-600 text-dark">
                    {statusVal}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* -------- SUBMIT BUTTON -------- */}
          <div className="w-full flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={saving}
              className={`btn btn-primary flex items-center gap-2 ${saving ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save size={18} />
              )}
              {saving ? "Creating..." : "Create Member"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMemberAdminPage;
