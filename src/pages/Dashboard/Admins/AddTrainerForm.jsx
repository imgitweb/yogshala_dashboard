import React from "react";
import InputField from "../../../components/landingPage/TrainerRegister/InputField";
import InputRow from "../../../components/landingPage/TrainerRegister/InputRow";
import SuggestiveMultiSelect from "../../../components/common/SuggestiveMultiSelect";
import SocialLinksInput from "../../../components/common/SocialLinksInput";
import { Plus } from "lucide-react";

const AddTrainerForm = ({ formData, handleInput, handleFileChange }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-md border border-light w-full animate-fade-in">
      <h2 className="text-xl font-700 text-dark mb-6">Add New Trainer</h2>

      <div className="flex flex-col gap-8">

        {/* ========== Row 1: Name + Email + Phone ========== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputField
            label="Full Name"
            required
            placeholder="Enter full name"
            value={formData.fullName}
            onChange={(e) => handleInput("fullName", e.target.value)}
          />

          <InputField
            label="Email"
            type="email"
            required
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) => handleInput("email", e.target.value)}
          />

          <InputField
            label="Phone"
            required
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={(e) => handleInput("phone", e.target.value)}
          />
        </div>

        {/* ========== Row 2: Experience + Languages + Specializations ========== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputField
            label="Experience (years)"
            type="number"
            required
            placeholder="e.g. 5"
            value={formData.experience}
            onChange={(e) => handleInput("experience", e.target.value)}
          />

          <SuggestiveMultiSelect
            label="Languages"
            required
            placeholder="Add languages..."
            suggestions={[
              "English", "Hindi", "Sanskrit", "Tamil", "French",
              "German", "Gujarati", "Kannada", "Malayalam", "Spanish",
            ]}
            values={formData.languages}
            onChange={(vals) => handleInput("languages", vals)}
          />

          <SuggestiveMultiSelect
            label="Specializations"
            required
            placeholder="Add yoga styles..."
            suggestions={[
              "Hatha Yoga", "Vinyasa Yoga", "Ashtanga Yoga",
              "Power Yoga", "Yin Yoga", "Restorative Yoga",
            ]}
            values={formData.specializations}
            onChange={(vals) => handleInput("specializations", vals)}
          />
        </div>

        {/* ========== Bio Full Width ========== */}
        <div>
          <InputField
            as="textarea"
            label="Bio"
            placeholder="Write a short trainer bio..."
            value={formData.bio}
            onChange={(e) => handleInput("bio", e.target.value)}
          />
        </div>

        {/* ========== Row: Profile Picture + Certifications ========== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-600 text-dark mb-2">
              Profile Picture <span className="text-red-500">*</span>
            </label>

            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => handleFileChange(e, "profilePicture")}
              className="w-full border border-light rounded-lg p-3 bg-offwhite"
            />

            {formData.profilePicture && (
              <div className="mt-3">
                <img
                  src={URL.createObjectURL(formData.profilePicture)}
                  alt="Preview"
                  className="w-24 h-24 rounded-lg object-cover border border-light"
                />
              </div>
            )}
          </div>

          {/* Certifications */}
          <div>
            <label className="block text-sm font-600 text-dark mb-2">
              Certifications <span className="text-red-500">*</span>
            </label>

            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              required
              onChange={(e) => handleFileChange(e, "certifications")}
              className="w-full border border-light rounded-lg p-3 bg-offwhite"
            />

            {formData.certifications.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-3">
                {formData.certifications.map((file, idx) => (
                  <div
                    key={idx}
                    className="text-sm text-dark bg-offwhite px-3 py-2 rounded-xl border border-light truncate"
                  >
                    {file.name}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* ========== Social Links Full Width ========== */}
        <SocialLinksInput
          label="Social Media Links "
          values={formData.socialLinks}
          required
          onChange={(val) => handleInput("socialLinks", val)}
        />

      

         <div className=" w-full flex justify-end mt-4">
  <button className="btn btn-primary flex items-center gap-2 hover-lift">
    <Plus size={18} /> Save Trainer
  </button>
       </div>
   </div>

     
    </div>
  );
};

export default AddTrainerForm;
