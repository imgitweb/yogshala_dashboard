import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Edit2, Settings, Mail, Phone, ActivityIcon, Upload } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImageToImageKit } from "../../../utils/imagekitHelper";
import { updateStudentProfile } from "../../../apis/userApi";
import { setUser } from "../../../redux/slices/authSlice";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("details");
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [uploading, setUploading] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    avatar: "",
    phone: "",
  });
  const [message, setMessage] = useState(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  useEffect(() => {
    if (user) {
      setPersonalInfo({
        fullName: user.fullName || "",
        avatar: user.profilePicture || "https://i.pravatar.cc/100?img=12",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploading(true);
      const url = await uploadImageToImageKit(file);
      setPersonalInfo((prev) => ({ ...prev, avatar: url }));
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoadingUpdate(true);
      setMessage(null);

      const data = {
        fullName: personalInfo.fullName,
        profilePicture: personalInfo.avatar,
        phone: personalInfo.phone,
      };

      const res = await updateStudentProfile(user._id, data)
      setMessage("Profile updated successfully.");
       dispatch(setUser(res));
    } catch (err) {
      console.error(err);
      setMessage("Failed to update profile.");
    } finally {
      setLoadingUpdate(false);
    }
  };

  const tabs = [
    { id: "details", label: "Details", icon: <User size={16} /> },
    { id: "edit", label: "Edit", icon: <Edit2 size={16} /> },
    { id: "more", label: "More", icon: <Settings size={16} /> },
  ];


  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div>
        <h1 className="text-2xl font-800 text-dark mb-2">User Profile</h1>
        <p className="text-muted mb-6">Manage your account and personal details.</p>
      </div>

      <div className="w-full bg-light rounded-2xl p-4 font-sans transition-colors duration-300">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 p-2 overflow-x-auto scrollbar-hide">
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

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover-lift">
          {activeTab === "details" && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img
                  src={personalInfo.avatar || "https://i.pravatar.cc/100?img=12"}
                  alt="User Avatar"
                  className="w-20 h-20 rounded-full"
                />
                <div>
                  <h2 className="text-xl font-700 text-dark">
                    {user.fullName || "N/A"}
                  </h2>
                  <p className="text-sm text-muted">
                    Member since{" "}
                    {new Date(user.createdAt).toLocaleDateString() || "N/A"}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-dark font-600 flex items-center gap-2">
                  <Mail size={16} /> {user.email || "N/A"}
                </p>
                <p className="text-dark font-600 flex items-center gap-2">
                  <Phone size={16} /> {user.phone || "N/A"}
                </p>
                <p className="text-dark font-600 flex items-center gap-2">
                  <User size={16} />
                  {user.role || "N/A"}
                </p>
                <p className="text-dark font-600 flex items-center gap-2">
                  <ActivityIcon size={16} />
                  {user.isActive ? "Active" : "Inactive" || "N/A"}
                </p>
              </div>
            </div>
          )}

          {activeTab === "edit" && (
            <div className="space-y-4">
              {/* Avatar Upload */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={personalInfo.avatar}
                    alt="Profile"
                    className="w-20 h-20 rounded-full border"
                  />
                  <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary-light transition">
                    <Upload size={14} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                {uploading && (
                  <p className="text-sm text-muted">Uploading image...</p>
                )}
              </div>

              {/* Full Name (Editable) */}
              <div>
                <label className="text-sm font-600 text-dark">Name</label>
                <input
                  type="text"
                  value={personalInfo.fullName}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, fullName: e.target.value })
                  }
                  className="mt-1 w-full p-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary transition"
                />
              </div>

              {/* Email (Disabled) */}
              <div>
                <label className="text-sm font-600 text-dark">Email</label>
                <input
                  type="email"
                  value={user.email || ""}
                  disabled
                  className="mt-1 w-full p-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>

              {/* Phone (Editable) */}
              <div>
                <label className="text-sm font-600 text-dark">Phone</label>
                <input
                  type="text"
                  value={personalInfo.phone}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, phone: e.target.value })
                  }
                  className="mt-1 w-full p-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary transition"
                />
              </div>

              {message && (
                <p
                  className={`text-sm font-600 ${
                    message.includes("successfully")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {message}
                </p>
              )}

              <button
                onClick={handleSave}
                disabled={loadingUpdate}
                className="mt-4 bg-primary text-white py-2 px-6 rounded-lg font-600 hover:bg-primary-light transition"
              >
                {loadingUpdate ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}

          {activeTab === "more" && (
            <div className="space-y-4">
              <p className="text-dark font-600">Share Your Profile</p>
              <p className="text-muted text-sm">
                Share your profile link with friends or on social media.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `https://yourapp.com/user/${user._id}`
                    )
                  }
                  className="bg-offwhite btn btn-primary text-dark py-2 px-6 rounded-lg font-600 hover:bg-primary-light hover:text-dark hover-lift transition"
                >
                  Copy Profile Link
                </button>
                <button
                  onClick={() =>
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=https://yourapp.com/user/${user._id}`,
                      "_blank"
                    )
                  }
                  className="bg-offwhite btn btn-primary hover-lift text-dark py-2 px-6 rounded-lg font-600 hover:bg-primary-light hover:text-dark transition"
                >
                  Share on Facebook
                </button>
                <button
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?url=https://yourapp.com/user/${user._id}`,
                      "_blank"
                    )
                  }
                  className="bg-offwhite btn btn-primary hover-lift text-dark py-2 px-6 rounded-lg font-600 hover:bg-primary-light hover:text-dark transition"
                >
                  Share on Twitter
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
