import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import InputField from "../../../components/landingPage/TrainerRegister/InputField";
import InputRow from "../../../components/landingPage/TrainerRegister/InputRow";
import SuggestiveSelect from "../../../components/common/SuggestiveSelect";
import SuggestiveMultiSelect from "../../../components/common/SuggestiveMultiSelect";

import { Save, ArrowLeft } from "lucide-react";
import {
  getMemberByIdApi,
  updateMemberApi,
} from "../../../apis/adminApi";

import { showError, showSuccess } from "../../../utils/toastService";

const MemberEditAdminPage = () => {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const pageRef = useRef(null);

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    age: "",
    gender: "",
    profilePicture: "",
    occupation: "",

    health: {
      height: "",
      weight: "",
      bloodGroup: "",
      injuries: [],
      allergies: [],
      medicalConditions: [],
    },

    goals: {
      primaryGoals: [],
      targetWeight: "",
      notes: "",
    },

    emergencyContact: {
      name: "",
      phone: "",
      relation: "",
    },

    status: "Pending",
  });

  const handleInput = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleNestedInput = (parent, key, value) =>
    setFormData((prev) => ({
      ...prev,
      [parent]: { ...prev[parent], [key]: value },
    }));

  // ----------------------------------------------------------------------------------------
  // LOAD EXISTING MEMBER DATA
  // ----------------------------------------------------------------------------------------
  const fetchMember = async () => {
    try {
      const res = await getMemberByIdApi(memberId);
      const data = res.member || res.data;

      if (!data) return showError("Member not found");

      setFormData({
        fullName: data.fullName || "",
        email: data.email || "",
        phone: data.phone || "",
        password: "", // keep empty – only update if admin types new one
        age: data.age || "",
        gender: data.gender || "",
        profilePicture: data.profilePicture || "",
        occupation: data.occupation || "",

        health: {
          height: data.health?.height || "",
          weight: data.health?.weight || "",
          bloodGroup: data.health?.bloodGroup || "",
          injuries: data.health?.injuries || [],
          allergies: data.health?.allergies || [],
          medicalConditions: data.health?.medicalConditions || [],
        },

        goals: {
          primaryGoals: data.goals?.primaryGoals || [],
          targetWeight: data.goals?.targetWeight || "",
          notes: data.goals?.notes || "",
        },

        emergencyContact: {
          name: data.emergencyContact?.name || "",
          phone: data.emergencyContact?.phone || "",
          relation: data.emergencyContact?.relation || "",
        },

        status: data.status || "Pending",
      });
    } catch (err) {
      showError(err.message || "Failed to load member");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMember();
  }, []);


  // ----------------------------------------------------------------------------------------
  // VALIDATION
  // ----------------------------------------------------------------------------------------
  const validateForm = () => {
    const required = [
      { key: "fullName", label: "Full Name" },
      { key: "email", label: "Email" },
      { key: "gender", label: "Gender" },
      { key: "age", label: "Age" },
    ];

    for (const field of required) {
      if (!formData[field.key]?.trim()) {
        showError(`${field.label} is required`);
        const el = document.getElementById(field.key);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.classList.add("ring-2", "ring-red-500");
          setTimeout(() => {
            el.classList.remove("ring-2", "ring-red-500");
          }, 1200);
        }
        return false;
      }
    }

    return true;
  };

  // ----------------------------------------------------------------------------------------
  // SUBMIT UPDATE
  // ----------------------------------------------------------------------------------------
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setSaving(true);

      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password || undefined,
        gender: formData.gender,
        age: Number(formData.age),
        occupation: formData.occupation,
        profilePicture: formData.profilePicture,

        health: formData.health,
        goals: formData.goals,
        emergencyContact: formData.emergencyContact,

        status: formData.status,
      };

      const res = await updateMemberApi(memberId, payload);

      showSuccess("Member updated successfully");
      navigate(`/admin/members/view/${memberId}`);
    } catch (err) {
      showError(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-lg text-muted animate-pulse">
        Loading member...
      </div>
    );
  }

  // ========================================================================================
  // PAGE UI
  // ========================================================================================
  return (
    <div className="bg-offWhite min-h-screen font-sans" ref={pageRef}>

    

       <div className="mb-6 flex gap-2">
          <button
        onClick={() => navigate(`/admin/members/view/${memberId}`)}
        className="mb-6 flex items-center gap-2 text-primary transition"
      >
        <ArrowLeft size={20} /> 
      </button>

       <div>
         <h1 className="text-2xl font-800 text-dark mb-1"> Edit Member</h1>
        <p className="text-muted"> 
            Update member information and details.
        </p>
       </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg border ">

        <h1 className="text-2xl font-800 text-dark mb-8">Edit Member</h1>

        {/* Basic Info */}
        <InputRow>
          <InputField
            id="fullName"
            label="Full Name"
            value={formData.fullName}
            onChange={(e) => handleInput("fullName", e.target.value)}
          />

          <InputField
            id="email"
            label="Email"
            value={formData.email}
            onChange={(e) => handleInput("email", e.target.value)}
          />
        </InputRow>

        <InputRow>
          <InputField
            id="phone"
            label="Phone"
            value={formData.phone}
            onChange={(e) => handleInput("phone", e.target.value)}
          />

          <InputField
            label="New Password"
            type="password"
            placeholder="Leave empty to keep unchanged"
            value={formData.password}
            onChange={(e) => handleInput("password", e.target.value)}
          />
        </InputRow>

        <InputRow columns={3}>
          {/* Gender Radio */}
          <div id="gender" className="w-full">
            <label className="text-sm font-600 text-dark mb-2 block">
              Gender *
            </label>
            <div className="flex gap-3 flex-wrap">
              {genderOptions.map((g) => (
                <label
                  key={g}
                  className={`px-4 py-2 rounded-xl border cursor-pointer text-sm font-500 ${
                    formData.gender === g
                      ? "bg-primary text-white"
                      : "bg-offwhite text-dark"
                  }`}
                >
                  <input
                    type="radio"
                    name="gender"
                    className="hidden"
                    checked={formData.gender === g}
                    onChange={() => handleInput("gender", g)}
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>

          <InputField
            id="age"
            label="Age"
            type="number"
            value={formData.age}
            onChange={(e) => handleInput("age", e.target.value)}
          />

          <div className="w-full">
            <SuggestiveSelect
              label="Occupation"
              suggestions={occupationOptions}
              value={formData.occupation}
              onChange={(v) => handleInput("occupation", v)}
            />
          </div>
        </InputRow>

        {/* Health */}
        <h2 className="text-lg font-700 text-dark mt-8 mb-4">Health</h2>

        <InputRow columns={3}>
          <InputField
            label="Height (cm)"
            value={formData.health.height}
            onChange={(e) => handleNestedInput("health", "height", e.target.value)}
          />

          <InputField
            label="Weight (kg)"
            value={formData.health.weight}
            onChange={(e) => handleNestedInput("health", "weight", e.target.value)}
          />

          <SuggestiveSelect
            label="Blood Group"
            suggestions={bloodOptions}
            value={formData.health.bloodGroup}
            onChange={(v) => handleNestedInput("health", "bloodGroup", v)}
          />
        </InputRow>

        <SuggestiveMultiSelect
          label="Injuries"
          suggestions={["Knee Issue", "Back Pain", "Neck Stiffness"]}
          values={formData.health.injuries}
          onChange={(vals) => handleNestedInput("health", "injuries", vals)}
        />

        <SuggestiveMultiSelect
          label="Allergies"
          suggestions={["Dust", "Pollen", "Food"]}
          values={formData.health.allergies}
          onChange={(vals) => handleNestedInput("health", "allergies", vals)}
        />

        <SuggestiveMultiSelect
          label="Medical Conditions"
          suggestions={["Asthma", "Hypertension", "Diabetes", "Heart Disease"]}
          values={formData.health.medicalConditions}
          onChange={(vals) =>
            handleNestedInput("health", "medicalConditions", vals)
          }
        />

        {/* Goals */}
        <h2 className="text-lg font-700 text-dark mt-10 mb-4">Fitness Goals</h2>

        <SuggestiveMultiSelect
          label="Primary Goals"
          suggestions={goalsOptions}
          values={formData.goals.primaryGoals}
          onChange={(vals) =>
            handleNestedInput("goals", "primaryGoals", vals)
          }
        />

        <InputRow>
          <InputField
            label="Target Weight (kg)"
            value={formData.goals.targetWeight}
            onChange={(e) =>
              handleNestedInput("goals", "targetWeight", e.target.value)
            }
          />

          <InputField
            as="textarea"
            label="Notes"
            value={formData.goals.notes}
            onChange={(e) => handleNestedInput("goals", "notes", e.target.value)}
          />
        </InputRow>

        {/* Emergency Contact */}
        <h2 className="text-lg font-700 text-dark mt-10 mb-4">
          Emergency Contact
        </h2>

        <InputRow>
          <InputField
            label="Name"
            value={formData.emergencyContact.name}
            onChange={(e) =>
              handleNestedInput("emergencyContact", "name", e.target.value)
            }
          />

          <InputField
            label="Phone"
            value={formData.emergencyContact.phone}
            onChange={(e) =>
              handleNestedInput("emergencyContact", "phone", e.target.value)
            }
          />

          <InputField
            label="Relation"
            value={formData.emergencyContact.relation}
            onChange={(e) =>
              handleNestedInput("emergencyContact", "relation", e.target.value)
            }
          />
        </InputRow>

        {/* Status */}
        <h2 className="text-lg font-700 text-dark mt-10 mb-4">Status</h2>

        <div className="flex flex-col gap-3">
          {["Pending", "Approved", "Rejected"].map((s) => (
            <label
              key={s}
              className="flex items-center gap-3 p-3 border rounded-xl bg-offwhite cursor-pointer"
            >
              <input
                type="radio"
                name="status"
                checked={formData.status === s}
                onChange={() => handleInput("status", s)}
              />
              <span className="font-600 text-dark">{s}</span>
            </label>
          ))}
        </div>

        {/* Submit */}
        <div className="w-full flex justify-end mt-10">
          <button
            onClick={handleSubmit}
            disabled={saving}
            className={`btn btn-primary flex items-center gap-2 ${
              saving ? "opacity-50" : ""
            }`}
          >
            {saving ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberEditAdminPage;
