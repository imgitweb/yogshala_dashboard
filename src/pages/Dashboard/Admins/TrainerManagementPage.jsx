import React, { useState, useEffect } from "react";
import { UserCheck, UserX, Eye } from "lucide-react";
import { showError, showSuccess } from "../../../utils/toastService";

// Components
import Tabs from "../../../components/dashboard/Tabs";
import TrainerList from "./TrainerList";
import AddTrainerForm from "./AddTrainerForm";
import StatusBadge from "../../../components/common/StatusBadge";
import { useNavigate } from "react-router-dom";

import { getTrainersList , UpdateTrainerStatus } from "../../../apis/adminApi";

const TrainerManagementPage = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const [trainers, setTrainers] = useState([]);

  const fetchTrainers = async () => {
    try {
      setLoading(true);

      const response = await getTrainersList();
      const apiTrainers = response?.data.trainers || [];

      const formatted = apiTrainers.map((t) => ({
        id: t._id,
        name: t.fullName,
        email: t.email,
        phone: t.phone || "N/A",
        specialty: t.specializations?.join(", ") || "N/A",
        experience: t.experienceYears + " yrs",
         status: t.status.toLowerCase(),
        avatar: t.profilePicture,
      }));

      setTrainers(formatted);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);


  /* ---------------- Local UI update ---------------- */
  const updateStatus = (id, newStatus) => {
    setTrainers((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: newStatus.toLowerCase() } : t
      )
    );
  };

  /* ---------------- Approve / Reject Handler ---------------- */
const handleStatusChange = async (id, newStatus) => {
  try {
    const res = await UpdateTrainerStatus(id, { status: newStatus });

    updateStatus(id, newStatus.toLowerCase());
    showSuccess(`Trainer ${newStatus} successfully`);
  } catch (error) {
    showError(error.response?.data?.message || "Failed to update status");
  }
};



  const trainerColumns = [
    {
      key: "trainer",
      label: "Trainer",
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.avatar}
            alt={row.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-dark">{row.name}</p>
          </div>
        </div>
      ),
    },
    { key: "email", label: "Email" },
    { key: "specialty", label: "Specialty" },
    { key: "experience", label: "Experience" },

    {
      key: "status",
      label: "Status",
      render: (row) => (
        <StatusBadge
          status={row.status}
        colorMap={{
  approved: { bg: "bg-green-100", text: "text-green-800" },
  pending:  { bg: "bg-yellow-100", text: "text-yellow-800" },
  rejected: { bg: "bg-red-100", text: "text-red-800" },
}}

        />
      ),
    },
  ];

 
  const trainerActions = [
  {
    variant: "primary",
    icon: UserCheck,
    onClick: (row) => handleStatusChange(row.id, "Approved"),
    show: (row) => row.status === "pending",
  },
  {
    variant: "danger",
    icon: UserX,
    onClick: (row) => handleStatusChange(row.id, "Rejected"),
    show: (row) => row.status === "pending",
  },
  {
    variant: "secondary",
    icon: Eye,
    onClick: (row) => navigate(`/admin/trainer/${row.id}`),
    show: () => true,
  },
];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    languages: [],
    specializations: [],
    bio: "",
    profilePicture: null,
    certifications: [],
    socialLinks: [{ platform: "", url: "" }],
  });

  const handleInput = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleFileChange = (e, key) => {
    if (key === "profilePicture") {
      setFormData((prev) => ({
        ...prev,
        profilePicture: e.target.files[0],
      }));
    }

    if (key === "certifications") {
      setFormData((prev) => ({
        ...prev,
        certifications: Array.from(e.target.files),
      }));
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div>
        <h1 className="text-2xl font-800 text-dark mb-2">Trainer Management</h1>
        <p className="text-muted mb-6">Manage trainers and their details.</p>
      </div>

      <div className="bg-light rounded-2xl p-4">
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={[
            { label: "Trainer List", value: "list" },
            { label: "Add Trainer", value: "add" },
          ]}
        />

        {activeTab === "list" && (
          <TrainerList
            trainers={trainers}
            loading={loading}
            trainerColumns={trainerColumns}
            trainerActions={trainerActions}
          />
        )}

        {activeTab === "add" && (
          <AddTrainerForm
            formData={formData}
            handleInput={handleInput}
            handleFileChange={handleFileChange}
          />
        )}
      </div>
    </div>
  );
};

export default TrainerManagementPage;
