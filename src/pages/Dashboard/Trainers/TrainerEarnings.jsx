import React from 'react';
import { Wallet, TrendingUp, Banknote, Calendar, Download, AlertCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../../../components/dashboard/Trainers/EarningCard';
import DynamicTable from '../../../components/common/DynamicTable';
import DynamicBarChart from '../../../components/common/DynamicBarChart';

// --- Demo Data ---
const earningsData = {
    totalRevenue: 78500,
    thisMonth: 12400,
    pendingPayout: 3200,
    availableBalance: 9200,
};

const transactions = [
  { id: "txn1", date: "2025-10-05", client: "Riya Patel", amount: 500, status: "Paid Out" },
  { id: "txn2", date: "2025-10-04", client: "Sameer Khan", amount: 1200, status: "Paid Out" },
  { id: "txn3", date: "2025-10-02", client: "Anjali Sharma", amount: 800, status: "Paid Out" },
  { id: "txn4", date: "2025-09-30", client: "Pawan Kumar", amount: 750, status: "Processing" },
  { id: "txn5", date: "2025-09-28", client: "Sneha Reddy", amount: 1200, status: "Paid Out" },
  { id: "txn6", date: "2025-09-27", client: "Meera Das", amount: 800, status: "Paid Out" },
];

const columns = [
  {
    key: "date",
    label: "Date",
    render: (row) => (
      <span className="text-dark font-medium">{row.date}</span>
    ),
  },
  {
    key: "client",
    label: "Client",
    render: (row) => (
      <span className="font-semibold text-dark">{row.client}</span>
    ),
  },
  {
    key: "amount",
    label: "Amount (₹)",
    render: (row) => (
      <span className="text-dark">₹{row.amount.toLocaleString("en-IN")}</span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (row) => {
      const statusColors = {
        "Paid Out": "bg-green-100 text-green-800",
        "Processing": "bg-yellow-100 text-yellow-800",
      };
      const style = statusColors[row.status] || "bg-gray-100 text-gray-700";
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${style}`}>
          {row.status}
        </span>
      );
    },
  },
];


const actions = [
  {
    label: "Renew",
    onClick: () => alert("Downloading report...") ,
    variant: "primary",
    icon: Banknote,
  },
  { label: "Download ", icon: Download, variant: "outline", onClick: () => alert("Downloading report...") }
];
const weeklyData = [
  { name: "Mon", reservations: 20, cancellations: 5 },
  { name: "Tue", reservations: 35, cancellations: 10 },
  { name: "Wed", reservations: 40, cancellations: 8 },
    { name: "Thu", reservations: 50, cancellations: 12 },
  { name: "Fri", reservations: 60, cancellations: 15 },
  { name: "Sat", reservations: 70, cancellations: 18 },
  { name: "Sun", reservations: 80, cancellations: 20 },
];

const monthlyData = [
  { name: "Jan", reservations: 120, cancellations: 20 },
  { name: "Feb", reservations: 150, cancellations: 25 },
  { name: "Mar", reservations: 180, cancellations: 30 },
    { name: "Apr", reservations: 200, cancellations: 22 },
  { name: "May", reservations: 220, cancellations: 28 },
  { name: "Jun", reservations: 240, cancellations: 32 },
  { name: "Jul", reservations: 260, cancellations: 35 },
  { name: "Aug", reservations: 280, cancellations: 38 },
  { name: "Sep", reservations: 300, cancellations: 40 },
  { name: "Oct", reservations: 320, cancellations: 42 },
  { name: "Nov", reservations: 340, cancellations: 45 },
  { name: "Dec", reservations: 360, cancellations: 48 },
];






// --- Main Component ---
const TrainerEarnings = () => {
    const stats = [
        { title: "Total Revenue (YTD)", value: earningsData.totalRevenue, icon: <TrendingUp />, iconBg: 'bg-green-100', iconColor: 'text-green-600' },
        { title: "This Month's Earnings", value: earningsData.thisMonth, icon: <Calendar />, iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
        { title: "Pending Payout", value: earningsData.pendingPayout, icon: <AlertCircle />, iconBg: 'bg-yellow-100', iconColor: 'text-yellow-600' },
        { title: "Available Balance", value: earningsData.availableBalance, icon: <Wallet />, iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600' },
    ];

    return (
        <div className="bg-gray-50 min-h-screen  font-sans">
            <div className="w-full ">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">My Earnings</h1>
                    <p className="text-gray-500">
                        Here's what we can find on your account.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map(stat => <StatCard key={stat.title} {...stat} />)}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Side: Chart */}
                   <div className="lg:col-span-8">
<DynamicBarChart
  title="Reservations Overview"
  dataSets={{ weekly: weeklyData, monthly: monthlyData }}
  keys={["reservations", "cancellations"]}
  labels={{ weekly: "Weekly", monthly: "Monthly" }}
  height={300}
  maxY={200}
/>
</div>

                    {/* Right Side: Payout */}
                    <div className="lg:col-span-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                        <div>
                            <h3 className="font-semibold text-lg text-gray-800 mb-2">Request Payout</h3>
                             <p className="text-sm text-gray-500 mb-6">You can request a payout to your bank account. Payouts are processed within 3-5 business days.
                             </p>
                             <div className="bg-indigo-50 p-4 rounded-lg text-center mb-6">
                                <p className="text-sm text-indigo-700 font-medium">Available Balance</p>
                                <p className="text-4xl font-bold text-indigo-900 mt-1">₹{earningsData.availableBalance.toLocaleString('en-IN')}</p>
                            </div>
                        </div>
                        <button className="w-full btn btn-primary flex items-center justify-center gap-2 ">
                           <Banknote size={18} /> Request Payout
                        </button>
                    </div>
                </div>

                  {/* Transactions */}
        <div className="mt-6">
        <DynamicTable
            title="Recent Transactions"
            subtitle="
            Here are your latest transactions. Click on any transaction for more details.
            "
            searchable
            actions={actions}
          data={transactions}
            columns={columns}

          />
        </div>
            </div>
        </div>
    );
};

export default TrainerEarnings;
