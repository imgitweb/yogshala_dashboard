import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DynamicTable from "../../../components/common/DynamicTable";
import { Pencil, Trash2, Plus, View, Eye } from "lucide-react";
import { deleteBatchApi, getAllBatchesApi } from "../../../apis/adminApi";
import { showError } from "../../../utils/toastService";
import StatusBadge from "../../../components/common/StatusBadge";

const BatchsListAdminPage = () => {
  const navigate = useNavigate();

  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBatches = async () => {
    try {
      setLoading(true);

      const res = await getAllBatchesApi();
      const list = res.data || [];

      setBatches(
        list.map((b) => ({
          id: b._id,
          name: b.batchName,
          studio: b.studioId,                    // ⭐ API gives only ID
          trainer: b.assignedTrainers?.[0] || "",// ⭐ First trainer ID
          mode: b.mode,
          days: b.days || [],
          time: `${b.startTime} - ${b.endTime}`,
          status: b.status
        }))
      );
    } catch (err) {
      showError(err.message || "Failed to load batches");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  // ⭐ DELETE HANDLER
  const handleDelete = async (row) => {
    if (!window.confirm(`Are you sure you want to delete "${row.name}"?`)) {
      return;
    }

    try {
      await deleteBatchApi(row.id);

      showError(`Batch "${row.name}" deleted (simulated)`);

      setBatches((prev) => prev.filter((b) => b.id !== row.id));

    } catch (err) {
      showError(err?.message || "Delete failed");
    }
  };

  const columns = [
    { key: "name", label: "Batch Name" },
    { key: "studio", label: "Studio ID" },
    // { key: "trainer", label: "Trainer ID" },
    { key: "mode", label: "Mode" },
    {
      key: "days",
      label: "Days",
      render: (row) => row.days.join(", ")
    },
    { key: "time", label: "Time" },
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

  const actions = [
    {
      icon: Eye,
      variant: "outline",
      onClick: (row) => {
        navigate(`/admin/batches/view/${row.id}`);
      },
    },
    {
      icon: Pencil,
      variant: "primary",
      onClick: (row) => navigate(`/admin/batches/edit/${row.id}`),
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
          <h1 className="text-2xl font-800 text-dark">All Batches</h1>
          <p className="text-muted">Manage all batches created in all studios.</p>
        </div>

        <button
          onClick={() => navigate("/admin/add-batch")}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus size={18} /> Add Batch
        </button>
      </div>

      <DynamicTable
        title="Batch List"
        subtitle="All batches created across studios"
        data={batches}
        loading={loading}
        columns={columns}
        actions={actions}
        searchable
      />
    </div>
  );
};

export default BatchsListAdminPage;
