import React, { useEffect, useState } from "react";
import { Eye, Pencil, Trash } from "lucide-react";
import DynamicTable from "../../../components/common/DynamicTable";
import StatusBadge from "../../../components/common/StatusBadge";
import { useNavigate } from "react-router-dom";
import { getStudiosList, deleteStudioApi } from "../../../apis/adminApi"; 
import { showError, showSuccess } from "../../../utils/toastService";

const StudioList = () => {
  const navigate = useNavigate();

  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadStudios = async () => {
    try {
      const res = await getStudiosList();
      setStudios(res.studios || []);
    } catch (err) {
      showError(err.message || "Failed to load studios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudios();
  }, []);

  // ⭐ DELETE HANDLER
  const handleDelete = async (row) => {
    if (!window.confirm(`Are you sure you want to delete "${row.name}"?`)) {
      return;
    }

    try {
      const res = await deleteStudioApi(row._id);

      showSuccess(res.message || "Studio deleted");

      // Remove deleted one from UI (no reload needed)
      setStudios((prev) => prev.filter((s) => s._id !== row._id));

    } catch (err) {
      showError(err?.message || "Delete failed");
    }
  };

  const actions = [
    {
      // label: "View",
      variant: "outline",
      icon: Eye,
      onClick: (row) => navigate(`/admin/studio/view/${row._id}`),
      show: () => true,
    },
    {
      // label: "Edit",
      variant: "primary",
      icon: Pencil,
      onClick: (row) => navigate(`/admin/studio/edit/${row._id}`),
      show: () => true,
    },
    {
      // label: "Delete",
      variant: "danger",
      icon: Trash,
      onClick: handleDelete,
      show: () => true,
    },
  ];

  const columns = [
    {
      key: "studio",
      label: "Studio",
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.logo || "https://i.pravatar.cc/60?u=studio"}
            className="w-10 h-10 rounded-xl object-cover border"
            alt="studio logo"
          />
          <div>
            <p className="font-600 text-dark">{row.name}</p>
            <p className="text-sm text-muted">
              {row.city}, {row.state}
            </p>
          </div>
        </div>
      ),
    },

    {
      key: "type",
      label: "Type",
      render: () => <span className="text-dark">Studio</span>,
    },

    {
      key: "members",
      label: "Members",
      render: (row) => (
        <span>{Array.isArray(row.members) ? row.members.length : 0}</span>
      ),
    },

    {
      key: "status",
      label: "Status",
      render: (row) => (
        <StatusBadge
          status={row.status}
          colorMap={{
            active: { bg: "bg-green-100", text: "text-green-800" },
            inactive: { bg: "bg-red-100", text: "text-red-800" },
          }}
        />
      ),
    },
  ];

  return (
    <div className="bg-offwhite min-h-screen font-sans">
      <h1 className="text-2xl font-800 text-dark mb-2">Studios Management</h1>
      <p className="text-muted mb-6">List of all yoga studios in the system.</p>

      {loading ? (
        <p className="text-center text-muted">Loading studios...</p>
      ) : (
        <DynamicTable
          title="All Studios"
          data={studios}
          columns={columns}
          actions={actions}
        />
      )}
    </div>
  );
};

export default StudioList;
