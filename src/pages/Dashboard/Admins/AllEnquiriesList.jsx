import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DynamicTable from "../../../components/common/DynamicTable";
import { Eye, Trash2 } from "lucide-react";
import {
  getAllEnquiries,
  deleteEnquiryApi,
} from "../../../apis/adminApi";
import { showError, showSuccess } from "../../../utils/toastService";
import StatusBadge from "../../../components/common/StatusBadge";

const AllEnquiriesList = () => {
  const navigate = useNavigate();

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);

      const res = await getAllEnquiries();
      const list = res.data || [];

      setEnquiries(
        list.map((e) => ({
          id: e._id,
          name: e.fullName,
          email: e.email,
          phone: e.phone,
          sessionType: e.sessionType,
          date: e.sessionDate,
          time: e.sessionTime,
          status: e.status || "pending",
          createdAt: new Date(e.createdAt).toLocaleDateString(),
        }))
      );
    } catch (err) {
      showError(err?.message || "Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // DELETE
  const handleDelete = async (row) => {
    if (!window.confirm(`Delete enquiry from "${row.name}"?`)) return;

    try {
      await deleteEnquiryApi(row.id);

      showSuccess("Enquiry deleted successfully");

      setEnquiries((prev) => prev.filter((e) => e.id !== row.id));
    } catch (err) {
      showError(err?.message || "Delete failed");
    }
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    {
      key: "sessionType",
      label: "Session Type",
      render: (row) =>
        row.sessionType === "online"
          ? "Online"
          : row.sessionType === "home"
          ? "Home"
          : "Yoga Studio",
    },
    { key: "date", label: "Date" },
    { key: "time", label: "Time" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <StatusBadge
          status={row.status}
          colorMap={{
            pending: { bg: "bg-yellow-100", text: "text-yellow-800" },
            contacted: { bg: "bg-blue-100", text: "text-blue-800" },
            completed: { bg: "bg-green-100", text: "text-green-800" },
          }}
        />
      ),
    },
    { key: "createdAt", label: "Created" },
  ];

  const actions = [
    {
      icon: Eye,
      variant: "outline",
      onClick: (row) => navigate(`/admin/enquiries/view/${row.id}`),
    },
    {
      icon: Trash2,
      variant: "danger",
      onClick: handleDelete,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-800 text-dark">All Enquiries</h1>
          <p className="text-muted">
            Manage all free session booking enquiries.
          </p>
        </div>
      </div>

      <DynamicTable
        title="Enquiries List"
        subtitle="All free session booking enquiries"
        data={enquiries}
        loading={loading}
        columns={columns}
        actions={actions}
        searchable
      />
    </div>
  );
};

export default AllEnquiriesList;
