import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { batchMemberListApi, getAllBatchesApi , renewMemberSubscriptionApi } from "../../../apis/adminApi";
import { showError, showSuccess } from "../../../utils/toastService";
import DynamicTable from "../../../components/common/DynamicTable";
import StatusBadge from "../../../components/common/StatusBadge";
import SuggestiveSelect from "../../../components/common/SuggestiveSelect";
import SearchableDropdown from "../../../components/common/SearchableDropdown";
import { useNavigate } from "react-router-dom";

const BatchMembersListAdminPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

  const [batches, setBatches] = useState([]);
  const [batchLabel, setBatchLabel] = useState("");

  const [filters, setFilters] = useState({
    batchId: "",
    status: "",
    planType: "",
  });

  // ⭐ Fetch Batches for Filter Dropdown
  const fetchBatches = async () => {
    try {
      const res = await getAllBatchesApi();
      const list = res.data || [];

      const formatted = list.map((b) => ({
        id: b._id,
        label: `${b.batchName} (${b.days.join(", ")})`,
      }));

      setBatches(formatted);
    } catch (err) {
      showError("Failed to load batches");
    }
  };

  // ⭐ Fetch Members List
  const fetchMembers = async () => {
    try {
      setLoading(true);

      const res = await batchMemberListApi(filters);
      const list = res.data || [];

      setMembers(
        list.map((m) => ({
          id: m._id,
          batchId: m.batchId?._id,
          batchName: m.batchId?.batchName,
          memberName: m.memberId?.fullName,
          memberEmail: m.memberId?.email,
          memberPhone: m.memberId?.phone,
          memberId: m.memberId?._id,
          profilePicture: m.memberId?.profilePicture,
          currentPeriodEnd: m.currentPeriodEnd?.slice(0, 10),

          planType: m.planType,
          monthlyFee: m.monthlyFee,
          joiningDate: m.joiningDate?.slice(0, 10),

          status: m.status,
        }))
      );
    } catch (err) {
      showError(err.message || "Failed to load batch members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
    fetchMembers();
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [filters]);
   const handleRenewSubscription = async (batchMemberId) => {
    try {
       const res = await renewMemberSubscriptionApi(batchMemberId);
       console.log(res);

       fetchMembers();
       showSuccess("Subscription renewed successfully");

    } catch (error) {
      showError(error.message || "Failed to renew subscription");
      fetchMembers();
      
    }
    // alert("Renew Subscription functionality is under development.");
  };

  const columns = [
    {
      key: "memberName",
      label: "Member",
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.profilePicture}
            alt={row.memberName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-dark">{row.memberName}</p>
            <p className="text-sm text-gray-500">{row.memberEmail}</p>
          </div>
        </div>
      ),
    },
    { key: "memberPhone", label: "Phone" },
    { key: "batchName", label: "Batch" },
   {
  key: "currentPeriodEnd",
  label: "Subscription Ends",
  render: (row) => {
    const today = new Date();
    const end = new Date(row.currentPeriodEnd);

    let bg = "bg-green-100";
    let text = "text-green-800";

    if (end < today) {
      bg = "bg-red-100";
      text = "text-red-700";
    } else if ((end - today) / (1000 * 60 * 60 * 24) <= 3) {
      bg = "bg-yellow-100";
      text = "text-yellow-800";
    }

    return (
      <span
        className={`px-3 py-1 text-xs rounded-full font-medium w-fit ${bg} ${text}`}
      >
        {row.currentPeriodEnd}
      </span>
    );
  },
},


    {
      key: "monthlyFee",
      label: "Fee",
      render: (row) => `₹${row.monthlyFee}`,
    },

    { key: "joiningDate", label: "Joining" },
      {
      key: "status",
      label: "Status",
      render: (row) => (
        <StatusBadge
          status={row.status}
          colorMap={{
             pending: { bg: "bg-yellow-100", text: "text-yellow-900" },
            active: { bg: "bg-green-100", text: "text-green-800" },
            paused: { bg: "bg-yellow-200", text: "text-yellow-900" },
            left: { bg: "bg-red-100", text: "text-red-800" },
          }}
        />
      ),
    },
    {
  key: "renewSubscription",
  label: "Renew Subscription",
  render: (row) => {
    const today = new Date();
    const expiry = new Date(row.currentPeriodEnd);

    const isExpired = expiry < today;

    return (
      <div className="w-full flex items-center justify-center">
        <button
          disabled={!isExpired}
          onClick={() => handleRenewSubscription(row.id)}
          className={`px-4 py-2 rounded-lg text-white font-medium transition
            ${isExpired
              ? "btn btn-primary"
              : "bg-gray-400 cursor-not-allowed"
            }
          `}
        >
          {isExpired ? "Renew" : "Active"}
        </button>
      </div>
    );
  }
},


  
  ];

  const actions = [
    {
      icon: Eye,
      variant: "outline",
      onClick: (row) => {
        console.log("Viewing member:", row);
       navigate(`/admin/members/view/${row.memberId}`);
      },
    },
  ];

 




  return (
    <div className="bg-gray-50 min-h-screen font-sans">

      <div className="mb-6">
        <h1 className="text-2xl font-800 text-dark">Batch Members</h1>
        <p className="text-muted">All members assigned to batches across studios.</p>
      </div>

<div className="flex flex-wrap items-end gap-6 mb-6">

  <SearchableDropdown
    label="Filter by Batch"
    placeholder="Select Batch"
    options={batches}
    value={batchLabel}
    onChange={(label) => {
      setBatchLabel(label);
      const found = batches.find((b) => b.label === label);
      setFilters({ ...filters, batchId: found ? found.id : "" });
    }}
  />

  {/* 🔹 Status Dropdown */}
  <div className="flex flex-col">
    <label className="text-sm font-medium text-dark mb-1">Status</label>
    <select
      className="px-4 py-3 bg-white border border-light rounded-xl text-sm font-600 cursor-pointer shadow-sm"
      value={filters.status}
      onChange={(e) => setFilters({ ...filters, status: e.target.value })}
    >
      <option value="">All Status</option>
      <option value="Active">Active</option>
      <option value="Paused">Paused</option>
      <option value="Left">Left</option>
    </select>
  </div>

  {/* 🔹 Plan Dropdown */}
  <div className="flex flex-col">
    <label className="text-sm font-medium text-dark mb-1">Plan</label>
    <select
      className="px-4 py-3 bg-white border border-light rounded-xl text-sm font-600 cursor-pointer shadow-sm"
      value={filters.planType}
      onChange={(e) => setFilters({ ...filters, planType: e.target.value })}
    >
      <option value="">All Plans</option>
      <option value="Monthly">Monthly</option>
    </select>
  </div>
</div>


      {/* ⭐ TABLE */}
      <DynamicTable
        title="Batch Members"
        subtitle="List of all members across batches"
        data={members}
        loading={loading}
        columns={columns}
        actions={actions}
        searchable
      />
    </div>
  );
};

export default BatchMembersListAdminPage;
