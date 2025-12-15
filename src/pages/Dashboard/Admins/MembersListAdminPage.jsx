import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DynamicTable from "../../../components/common/DynamicTable";
import { Pencil, Trash2, Plus, Eye } from "lucide-react";

import {
  getAllMembersApi,
  deleteMemberApi,
} from "../../../apis/adminApi";

import { showError, showSuccess } from "../../../utils/toastService";
import StatusBadge from "../../../components/common/StatusBadge";

const MembersListAdminPage = () => {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------------------------------------------------------
  // FETCH MEMBERS
  // ---------------------------------------------------------
  const fetchMembers = async () => {
    try {
      setLoading(true);

      const res = await getAllMembersApi();
      console.log(res);
      const list = res.members || res.data || [];

      setMembers(
        list.map((m) => ({
          id: m._id,
          name: m.fullName,
          email: m.email,
          phone: m.phone || "-",
          gender: m.gender || "-",
          age: m.age || "-",
          status: m.status || "Pending",
          joinedDate: m.joinedDate,
        }))
      );
    } catch (err) {
      showError(err?.message || "Failed to load members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // ---------------------------------------------------------
  // DELETE MEMBER
  // ---------------------------------------------------------
  const handleDelete = async (row) => {
    if (!window.confirm(`Are you sure you want to delete "${row.name}"?`)) {
      return;
    }

    try {
      await deleteMemberApi(row.id);

      showSuccess(`Member "${row.name}" deleted successfully`);

      setMembers((prev) => prev.filter((m) => m.id !== row.id));
    } catch (err) {
      showError(err?.message || "Delete failed");
    }
  };

  // ---------------------------------------------------------
  // TABLE COLUMN DEFINITIONS
  // ---------------------------------------------------------
  const columns = [
    { key: "name", label: "Full Name" },

    { key: "email", label: "Email" },
    {
      key: "joinedDate", label: "Joined On",
      render: (row) => new Date(row.joinedDate).toLocaleDateString(),
    },

    { key: "phone", label: "Phone" },

    {
      key: "gender",
      label: "Gender",
    },

    { key: "age", label: "Age" },

    {
      key: "status",
      label: "Status",
      render: (row) => (
        <StatusBadge
          status={row.status}
          colorMap={{
            pending: { bg: "bg-yellow-100", text: "text-yellow-800" },
            approved: { bg: "bg-green-100", text: "text-green-800" },
            rejected: { bg: "bg-red-100", text: "text-red-800" },
          }}
        />
      ),
    },
  ];

  // ---------------------------------------------------------
  // ACTION BUTTONS
  // ---------------------------------------------------------
  const actions = [
    {
      icon: Eye,
      variant: "outline",
      onClick: (row) => navigate(`/admin/members/view/${row.id}`),
    },

    {
      icon: Pencil,
      variant: "primary",
      onClick: (row) => navigate(`/admin/members/edit/${row.id}`),
    },

    {
      icon: Trash2,
      variant: "danger",
      onClick: handleDelete,
    },
  ];

  // ---------------------------------------------------------
  // PAGE UI
  // ---------------------------------------------------------
  return (
    <div className="bg-gray-50 min-h-screen font-sans">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-800 text-dark">All Members</h1>
          <p className="text-muted">Manage all registered members.</p>
        </div>

        <button
          onClick={() => navigate("/admin/register-member")}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus size={18} /> Add Member
        </button>
      </div>

      {/* Table */}
      <DynamicTable
        title="Member List"
        subtitle="All members registered across the platform"
        data={members}
        loading={loading}
        columns={columns}
        actions={actions}
        searchable
      />
    </div>
  );
};

export default MembersListAdminPage;
