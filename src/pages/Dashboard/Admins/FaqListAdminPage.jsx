import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DynamicTable from "../../../components/common/DynamicTable";
import { Pencil, Trash2, Plus, Eye } from "lucide-react";

import {
  getAllFaqsApi,
  deleteFaqApi,
} from "../../../apis/adminApi";

import { showError, showSuccess } from "../../../utils/toastService";

const FaqListAdminPage = () => {
  const navigate = useNavigate();

  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  // --------------------------------
  // FETCH FAQs
  // --------------------------------
  const fetchFaqs = async () => {
    try {
      setLoading(true);

      const res = await getAllFaqsApi();
      const list = res.data || [];

      setFaqs(
        list.map((f, index) => ({
          id: f._id,
          sno: index + 1,
          question: f.question,
          answer: f.answer,
          createdAt: new Date(f.createdAt).toLocaleDateString(),
        }))
      );
    } catch (err) {
      showError(err?.message || "Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  // --------------------------------
  // DELETE FAQ
  // --------------------------------
  const handleDelete = async (row) => {
    if (!window.confirm("Are you sure you want to delete this FAQ?")) {
      return;
    }

    try {
      await deleteFaqApi(row.id);
      showSuccess("FAQ deleted successfully");

      setFaqs((prev) => prev.filter((f) => f.id !== row.id));
    } catch (err) {
      showError(err?.message || "Delete failed");
    }
  };

  // --------------------------------
  // TABLE CONFIG
  // --------------------------------
  const columns = [
    { key: "sno", label: "#" },
    {
      key: "question",
      label: "Question",
      render: (row) => (
        <div className="max-w-md truncate">{row.question}</div>
      ),
    },
    {
      key: "answer",
      label: "Answer",
      render: (row) => (
        <div className="max-w-md truncate text-muted">
          {row.answer}
        </div>
      ),
    },
  ];

  const actions = [
    {
      icon: Trash2,
      variant: "danger",
      onClick: handleDelete,
    },
  ];

  // --------------------------------
  // UI
  // --------------------------------
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-800 text-dark">
            Chatbot FAQs
          </h1>
          <p className="text-muted">
            Manage all chatbot questions & answers
          </p>
        </div>

        <div className="flex gap-3">
      

          <button
            onClick={() => navigate("/admin/add-faq")}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus size={18} /> Add FAQ
          </button>
        </div>
      </div>

      {/* Table */}
      <DynamicTable
        title="FAQ List"
        subtitle="All FAQs used by chatbot"
        data={faqs}
        loading={loading}
        columns={columns}
        actions={actions}
        searchable
      />
    </div>
  );
};

export default FaqListAdminPage;
