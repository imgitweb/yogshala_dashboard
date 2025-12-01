import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InputField from "../../../components/landingPage/TrainerRegister/InputField";
import InputRow from "../../../components/landingPage/TrainerRegister/InputRow";
import SuggestiveSelect from "../../../components/common/SuggestiveSelect";
import {
  Save,
  ArrowLeft,
  UserPlus,
  Trash2,
  Info,
  Map,
  Image,
  Users,
} from "lucide-react";

import AssignStudioAdminPopup from "./AssignStudioAdminPopup";

import {
  getStudioById,
  updateStudioApi,
} from "../../../apis/adminApi";
import { uploadImageToImageKit } from "../../../utils/imagekitHelper";
import { showSuccess, showError } from "../../../utils/toastService";

const EditStudioPage = () => {
  const { studioId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [activeTab, setActiveTab] = useState("basic");

  const [showAssignPopup, setShowAssignPopup] = useState(false);
  const [assignedAdmins, setAssignedAdmins] = useState([]);

  // Dummy trainers list (you can later replace with real API)
  const trainersList = [
    { id: "a1", name: "Rohit Verma", email: "rohit@example.com" },
    { id: "a2", name: "Priya Admin", email: "priya@example.com" },
    { id: "a3", name: "Studio Manager", email: "manager@example.com" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    contactPhone: "",
    contactEmail: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    pinCode: "",
    website: "",
    description: "",
    logo: null,        // file
    logoPreview: null, // url
  });

  // ----------------------------------------------
  // FETCH REAL STUDIO DATA
  // ----------------------------------------------
  useEffect(() => {
    const fetchStudio = async () => {
      try {
        setLoading(true);

        const res = await getStudioById(studioId);
        // Depending on backend, res may be { studio } or the studio itself
        const studio = res.studio || res;

        setAssignedAdmins(studio.admins || []);

        setFormData({
          name: studio.name || "",
          contactPhone: studio.contactPhone || "",
          contactEmail: studio.contactEmail || "",
          address: studio.address || "",
          city: studio.city || "",
          state: studio.state || "",
          country: studio.country || "India",
          pinCode: studio.pinCode || "",
          website: studio.website || "",
          description: studio.description || "",
          logo: null,
          logoPreview: studio.logo || null,
        });
      } catch (err) {
        console.error("Failed to load studio:", err);
        showError(err?.message || "Failed to load studio");
      } finally {
        setLoading(false);
      }
    };

    fetchStudio();
  }, [studioId]);

  const handleInput = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      logo: file,
      logoPreview: file ? URL.createObjectURL(file) : prev.logoPreview,
    }));
  };

  const handleAssignAdmin = (adminId) => {
    const adminObj =
      trainersList.find((t) => t.id === adminId) ||
      assignedAdmins.find((a) => a._id === adminId);

    if (!adminObj) return;

    // avoid duplicates
    setAssignedAdmins((prev) => {
      const exists = prev.some(
        (a) => a.id === adminObj.id || a._id === adminObj._id
      );
      if (exists) return prev;
      return [...prev, adminObj];
    });

    setShowAssignPopup(false);
  };

  const handleRemoveAdmin = (adminId) => {
    setAssignedAdmins((prev) =>
      prev.filter((a) => a.id !== adminId && a._id !== adminId)
    );
  };

  // ----------------------------------------------
  // SAVE / UPDATE STUDIO (ALL FIELDS YOU HAVE HERE)
  // ----------------------------------------------
  const handleSubmit = async () => {
    try {
      setSaving(true);

      let logoUrl;
      if (formData.logo) {
        // upload new logo if user selected a file
        logoUrl = await uploadImageToImageKit(
          formData.logo,
          "/studio/logo"
        );
      }

      const payload = {
        name: formData.name,
        contactPhone: formData.contactPhone,
        contactEmail: formData.contactEmail,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        pinCode: formData.pinCode,
        website: formData.website,
        description: formData.description,
        // admins: send ids only (ObjectId array)
        admins: assignedAdmins.map((a) => a._id || a.id),
      };

      if (logoUrl) {
        payload.logo = logoUrl;
      }

      const res = await updateStudioApi(studioId, payload);

      if (!res || res.status === "error") {
        showError(res?.message || "Failed to update studio");
        return;
      }

      showSuccess(res?.message || "Studio updated successfully");
      // stay on page OR go back – your choice:
      // navigate("/admin/studios");
    } catch (err) {
      console.error("Update studio error:", err);
      showError(err?.message || "Failed to update studio");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="text-center py-10 text-muted font-600">
        Loading studio details...
      </div>
    );

  // ----------------------------------------------
  // TABS CONFIG
  // ----------------------------------------------
  const tabs = [
    { id: "basic", label: "Basic Info", icon: <Info size={16} /> },
    { id: "location", label: "Location", icon: <Map size={16} /> },
    { id: "description", label: "Description", icon: <Info size={16} /> },
    { id: "logo", label: "Logo", icon: <Image size={16} /> },
    { id: "admins", label: "Admins", icon: <Users size={16} /> },
    { id: "save", label: "Save", icon: <Save size={16} /> },
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
      
          <div>
            <h1 className="text-2xl font-800 text-dark mb-1">
              Edit Studio
            </h1>
            <p className="text-muted text-sm">
              Update studio information using tab-wise sections
            </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="btn btn-primary hover-lift flex items-center gap-2"
        >
          <Save size={18} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 p-2 overflow-x-auto scrollbar-hide bg-light">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-600 rounded-xl transition-all ${
              activeTab === tab.id
                ? "bg-primary text-white shadow hover-lift"
                : "bg-offwhite text-dark hover:bg-primary-light hover:text-dark hover-lift"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Card */}
      <div className="bg-white p-8 rounded-2xl shadow-md border border-light animate-fade-in">
        {/* BASIC INFO TAB */}
        {activeTab === "basic" && (
          <div className="flex flex-col gap-8 animate-fade-in">
            <InputRow>
              <InputField
                label="Studio Name"
                required
                value={formData.name}
                onChange={(e) => handleInput("name", e.target.value)}
              />
              <InputField
                label="Contact Number"
                required
                value={formData.contactPhone}
                onChange={(e) =>
                  handleInput("contactPhone", e.target.value)
                }
              />
            </InputRow>

            <InputRow>
              <InputField
                label="Contact Email"
                value={formData.contactEmail}
                onChange={(e) =>
                  handleInput("contactEmail", e.target.value)
                }
              />
              <InputField
                label="Website"
                value={formData.website}
                onChange={(e) =>
                  handleInput("website", e.target.value)
                }
              />
            </InputRow>
          </div>
        )}

        {/* LOCATION TAB */}
        {activeTab === "location" && (
          <div className="flex flex-col gap-8 animate-fade-in">
            <InputRow columns={3}>
              <SuggestiveSelect
                label="Country"
                required
                suggestions={["India", "USA", "UK"]}
                value={formData.country}
                onChange={(v) => handleInput("country", v)}
              />
              <SuggestiveSelect
                label="State"
                required
                suggestions={["Maharashtra", "Delhi"]}
                value={formData.state}
                onChange={(v) => handleInput("state", v)}
              />
              <SuggestiveSelect
                label="City"
                required
                suggestions={["Mumbai", "Delhi"]}
                value={formData.city}
                onChange={(v) => handleInput("city", v)}
              />
            </InputRow>

            <InputRow>
              <InputField
                label="Pin Code"
                value={formData.pinCode}
                onChange={(e) =>
                  handleInput("pinCode", e.target.value)
                }
              />
            </InputRow>

            <InputField
              label="Address"
              required
              value={formData.address}
              onChange={(e) =>
                handleInput("address", e.target.value)
              }
            />
          </div>
        )}

        {/* DESCRIPTION TAB */}
        {activeTab === "description" && (
          <div className="animate-fade-in">
            <InputField
              as="textarea"
              label="Description"
              value={formData.description}
              onChange={(e) =>
                handleInput("description", e.target.value)
              }
            />
          </div>
        )}

        {/* LOGO TAB */}
        {activeTab === "logo" && (
          <div className="animate-fade-in">
            <label className="text-sm font-600 text-dark mb-2 block">
              Studio Logo
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-light rounded-lg bg-offwhite"
            />

            {formData.logoPreview && (
              <img
                src={formData.logoPreview}
                className="w-24 h-24 rounded-xl mt-3 object-cover border border-light"
                alt="Studio Logo"
              />
            )}
          </div>
        )}

        {/* ADMINS TAB */}
        {activeTab === "admins" && (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-700 text-dark">
                Assigned Admins
              </h3>

              <button
                onClick={() => setShowAssignPopup(true)}
                className="btn btn-primary flex items-center gap-2"
              >
                <UserPlus size={16} /> Assign
              </button>
            </div>

            {assignedAdmins.length === 0 ? (
              <p className="text-muted">No admins assigned.</p>
            ) : (
              <div className="space-y-3">
                {assignedAdmins.map((admin) => (
                  <div
                    key={admin._id || admin.id}
                    className="flex justify-between items-center p-3 bg-offwhite border border-light rounded-xl"
                  >
                    <div>
                      <p className="font-600 text-dark">
                        {admin.fullName || admin.name}
                      </p>
                      <p className="text-muted text-sm">
                        {admin.email}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        handleRemoveAdmin(admin._id || admin.id)
                      }
                      className="text-red"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SAVE TAB (extra, though header button also saves) */}
        {activeTab === "save" && (
          <div className="flex justify-end animate-fade-in">
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="btn btn-primary flex items-center gap-2 hover-lift"
            >
              <Save size={18} />{" "}
              {saving ? "Saving..." : "Update Studio"}
            </button>
          </div>
        )}
      </div>

      {/* Admin Assign Popup */}
      <AssignStudioAdminPopup
        open={showAssignPopup}
        onClose={() => setShowAssignPopup(false)}
        assignedAdmins={assignedAdmins.map((a) => a._id || a.id)}
        trainers={trainersList}
        onAssign={handleAssignAdmin}
        onRemove={handleRemoveAdmin}
      />
    </div>
  );
};

export default EditStudioPage;
