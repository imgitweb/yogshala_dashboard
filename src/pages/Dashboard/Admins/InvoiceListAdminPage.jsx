import React, { useEffect, useState } from "react";
import { Eye, ExternalLink, Send } from "lucide-react";

import DynamicTable from "../../../components/common/DynamicTable";
import StatusBadge from "../../../components/common/StatusBadge";

import {
  invoiceListApi,      // GET /invoices/list
  getAllBatchesApi,     // For batch filter
  getAllMembersApi,  
  markInvoicePaidApi   // For member filter
} from "../../../apis/adminApi";

import {  showSuccess, showError  } from "../../../utils/toastService";
import SearchableDropdown from "../../../components/common/SearchableDropdown";




const InvoiceListAdminPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [batches, setBatches] = useState([]);
  const [members, setMembers] = useState([]);

  const [batchLabel, setBatchLabel] = useState("");
  const [memberLabel, setMemberLabel] = useState("");

  const [filters, setFilters] = useState({
    batchId: "",
    memberId: "",
    status: "",
    planType: "",
  });

  // ---------------- Fetch All Batches ----------------
  const fetchBatches = async () => {
    try {
      const res = await getAllBatchesApi();
      const list = res.data || [];
      setBatches(
        list.map((b) => ({
          id: b._id,
          label: `${b.batchName} (${b.days?.join(", ")})`,
        }))
      );
    } catch (err) {
      showError("Failed to load batches");
    }
  };

  // ---------------- Fetch All Members ----------------
  const fetchMembers = async () => {
    try {
      const res = await getAllMembersApi();
      const list = res.data || [];

      setMembers(
        list.map((m) => ({
          id: m._id,
          label: `${m.fullName} (${m.email})`,
        }))
      );
    } catch (err) {
      showError("Failed to load members");
    }
  };

  // ---------------- Fetch Invoices ----------------
  const fetchInvoices = async () => {
    try {
      setLoading(true);

      const res = await invoiceListApi(filters);
      const list = res.data || [];

      setInvoices(
        list.map((inv) => ({
          id: inv._id,
          batchName: inv.batchId?.batchName,
          memberName: inv.memberId?.fullName,
          memberEmail: inv.memberId?.email,
          amount: inv.amount,
          planType: inv.planType,
          paymentLink: inv.paymentLink,
          status: inv.status,
          invoiceDate: inv.invoiceDate?.slice(0, 10),
          dueDate: inv.dueDate?.slice(0, 10),
        }))
      );
    } catch (err) {
      showError(err.message || "Failed to load invoices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
    fetchMembers();
  }, []);

  useEffect(() => {
    fetchInvoices();
  }, [filters]);

  const handleMarkAsPaid = async (invoiceId) => {
  try {
    await markInvoicePaidApi({ invoiceId });
    showSuccess("Invoice marked as paid");
    fetchInvoices(); // refresh table
  } catch (err) {
    showError(err.message || "Failed to mark as paid");
  }
};

  // ---------------- Table Columns ----------------
  const columns = [
    {
      key: "memberName",
      label: "Member",
      render: (row) => (
        <div>
          <p className="font-medium text-dark">{row.memberName}</p>
          <p className="text-xs text-gray-500">{row.memberEmail}</p>
        </div>
      ),
    },
    { key: "batchName", label: "Batch" },

    {
      key: "amount",
      label: "Amount",
      render: (row) => `₹${row.amount}`,
    },
{
  key: "markAsPaid",
  label: "Paid",
  render: (row) => {
    const isPaid = row.status === "PAID";

    return (
      <button
        onClick={() => !isPaid && handleMarkAsPaid(row.id)}
        disabled={isPaid}
        className={`flex items-center gap-2 px-3 py-1 rounded-md border transition-all
          ${isPaid ? "bg-green-100 border-green-400 cursor-default" : "bg-white border-gray-300 hover:bg-gray-100"}
        `}
      >
        {/* Custom Checkbox */}
        <div
          className={`w-5 h-5 rounded-md flex items-center justify-center border
            ${isPaid ? "bg-green-600 border-green-700" : "bg-white border-gray-400"}
          `}
        >
          {isPaid && (
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path d="M5 12l5 5l10-12" />
            </svg>
          )}
        </div>

        <span className={`text-sm font-medium ${isPaid ? "text-green-700" : "text-gray-700"}`}>
          {isPaid ? "Paid" : "Mark as Paid"}
        </span>
      </button>
    );
  },
}
,


    { key: "invoiceDate", label: "Invoice Date" },
    { key: "dueDate", label: "Due Date" },

    {
      key: "status",
      label: "Status",
      render: (row) => (
        <StatusBadge
          status={row.status}
          colorMap={{
            paid: { bg: "bg-green-100", text: "text-green-700" },
            pending: { bg: "bg-yellow-100", text: "text-yellow-800" },
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
          alert(
            `Invoice Details:\n\nMember: ${row.memberName}\nBatch: ${row.batchName}\nAmount: ₹${row.amount}\nPlan: ${row.planType}\nInvoice Date: ${row.invoiceDate}\nDue Date: ${row.dueDate}\nStatus: ${row.status}`
          );
        },
    },
    // {
    //   icon: ExternalLink,
    //   variant: "outline",
    //   onClick: (row) => {
    //     if (row.paymentLink) window.open(row.paymentLink, "_blank");
    //   },
    // },
    {
        icon: Send,
        variant: "primary",
        onClick: (row) => {
          if (row.paymentLink) {
            // Simulate sending email
            alert(`Payment link sent to ${row.memberEmail}:\n\n${row.paymentLink}`);
          }
        },  
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans">

      <div className="mb-6">
        <h1 className="text-2xl font-800 text-dark">Invoices</h1>
        <p className="text-muted">All invoices generated for batch members</p>
      </div>

      {/* ⭐ FILTERS */}
      <div className="flex flex-wrap items-end gap-6 mb-6">
        
        {/* Batch Filter */}
        <SearchableDropdown
          label="Batch"
          placeholder="Select Batch"
          options={batches}
          value={batchLabel}
          onChange={(label) => {
            setBatchLabel(label);
            const found = batches.find((b) => b.label === label);
            setFilters({ ...filters, batchId: found ? found.id : "" });
          }}
        />

        {/* Member Filter */}
        <SearchableDropdown
          label="Member"
          placeholder="Select Member"
          options={members}
          value={memberLabel}
          onChange={(label) => {
            setMemberLabel(label);
            const found = members.find((m) => m.label === label);
            setFilters({ ...filters, memberId: found ? found.id : "" });
          }}
        />

        {/* Status Filter */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-dark mb-1">Status</label>
          <select
            className="px-4 py-3 bg-white border border-light rounded-xl shadow-sm"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All</option>
            <option value="PENDING">Pending</option>
            <option value="PAID">Paid</option>
          </select>
        </div>

        {/* Plan Filter */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-dark mb-1">Plan</label>
          <select
            className="px-4 py-3 bg-white border border-light rounded-xl shadow-sm"
            value={filters.planType}
            onChange={(e) =>
              setFilters({ ...filters, planType: e.target.value })
            }
          >
            <option value="">All</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>
      </div>

      {/* ⭐ TABLE */}
      <DynamicTable
        title="Invoice Records"
        subtitle="List of all invoices with payment status"
        data={invoices}
        loading={loading}
        columns={columns}
        actions={actions}
        searchable
      />
    </div>
  );
};

export default InvoiceListAdminPage;
