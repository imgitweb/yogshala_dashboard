import React, { useEffect } from "react";
import { Users, UserCheck, Calendar, Wallet, Check, X, Eye, MoreHorizontal, Video, Heart} from "lucide-react";
import StatCard2 from "../../../components/common/StatCard2";
import StatusBadge from "../../../components/common/StatusBadge";
import DynamicTable from "../../../components/common/DynamicTable";
import DynamicBarChart from "../../../components/common/DynamicBarChart";
import DynamicAreaChart from "../../../components/common/DynamicAreaChart";
import { useState } from "react";
import { useSelector } from "react-redux";
import { allowMeeting, getDashboardStats } from "../../../apis/adminApi";
import FullPageLoader from "../../../components/common/FullPageLoader";
import { useNavigate } from "react-router-dom";


const AdminDashboard = () => {
  const {user} =useSelector((state) => state.auth);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading , setLoading] = useState(false);
  const [recentTrainers, setRecentTrainers] = useState([]);
  const [pendingTrainers, setPendingTrainers] = useState([]);
  const navigate = useNavigate();
  




  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const data = await getDashboardStats();
      console.log(" Dashboard Stats: ", data);
      setDashboardData(data?.data);
      setRecentTrainers(data?.data?.latestTrainers || []);
      setPendingTrainers(data?.data?.pendingTrainers || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
     
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);






  const stats = [
    {
      title: "Total Users",
      value: dashboardData ? dashboardData.totalUsers : "0",
      subtitle: "+120 this month",
      icon: <Users size={20} />,
      gradient: "from-blue-50 to-blue-100",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Trainers",
      value: dashboardData ? dashboardData.totalTrainers : "0",
      subtitle: "+5 pending approval",
      icon: <UserCheck size={20} />,
      gradient: "from-green-50 to-green-100",
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Total Studio Registered",
      value: dashboardData ? dashboardData.totalStudios : "0",
      subtitle: "Across all centers",
      icon: <Calendar size={20} />,
      gradient: "from-yellow-50 to-yellow-100",
      iconBg: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
    {
      title: "Total Batches Created",
      value: dashboardData ? `${dashboardData.totalBatchs}` : "₹0",
      subtitle: "October earnings",
      icon: <Wallet size={20} />,
      gradient: "from-indigo-50 to-indigo-100",
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
  ];

  const [sessions, setSessions] = useState([
    {
      id: "1",
      trainer: { name: "Aarav Sharma", avatar: "https://i.pravatar.cc/40?img=5" },
      classType: "Online - Hatha Yoga",
      dateTime: "Oct 07, 2025, 7:00 AM",
      status: "Confirmed",
    },
    {
      id: "2",
      trainer: { name: "Priya Singh", avatar: "https://i.pravatar.cc/40?img=6" },
      classType: "Home Visit - Vinyasa",
      dateTime: "Oct 09, 2025, 6:00 PM",
      status: "Cancelled",
    },
    {
      id: "3",
      trainer: { name: "Aarav Sharma", avatar: "https://i.pravatar.cc/40?img=5" },
      classType: "Online - Hatha Yoga",
      dateTime: "Oct 01, 2025, 7:00 AM",
      status: "Completed",
    },
    {
      id: "4",
      trainer: { name: "Rohan Mehta", avatar: "https://i.pravatar.cc/40?img=7" },
      classType: "Centre - Ashtanga",
      dateTime: "Oct 11, 2025, 8:00 AM",
      status: "Pending",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === id ? { ...session, status: newStatus } : session
      )
    );
  };

const pendingTrainerColumns = [
  {
    key: "fullName",
    label: "Trainer",
    render: (row) => (
      <div className="flex items-center gap-3">
        <img
          src={row.profilePicture || "https://i.pravatar.cc/40"}
          alt={row.fullName}
          className="w-8 h-8 rounded-full"
        />
        <span className="font-medium text-gray-700">{row.fullName}</span>
      </div>
    ),
  },
  { key: "email", label: "Email" },
  { key: "specializations", label: "Specialization" },
];


 const pendingTrainerActions = [
  {
    variant: "primary",
    icon: Eye,
    onClick: (row) => navigate(`/admin/trainer/${row._id}`),
  },
 
];



   const practiceHoursData = {
    weekly: [
      { name: "Mon", value: 1 }, { name: "Tue", value: 1.5 }, { name: "Wed", value: 1 },
      { name: "Thu", value: 2 }, { name: "Fri", value: 0.5 }, { name: "Sat", value: 1 },
      { name: "Sun", value: 2.5 },
    ],
    monthly: [
      { name: "Jan", value: 10 }, { name: "Feb", value: 12 }, { name: "Mar", value: 15 },
      { name: "Apr", value: 13 }, { name: "May", value: 18 }, { name: "Jun", value: 20 },
      { name: "Jul", value: 22 }, { name: "Aug", value: 19 }, { name: "Sep", value: 24 },
      { name: "Oct", value: 25 }, { name: "Nov", value: 28 }, { name: "Dec", value: 30 },
    ],
  };


  const hndleAllowMeeting = async() => {
   try {
   const res = await allowMeeting();
   console.log(res);
   if(res && res.url){
    window.location.href = res.url;
   }

   } catch (error) {
    console.log(error);
    alert('Error in Allowing Meeting');
   }
  };






  return (
    <div className="bg-gray-50 min-h-screen  font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
       <button
       className="whitespace-nowrap btn btn-primary w-fit"
        onClick={hndleAllowMeeting}
   
  >
    Allow Meeting
  </button>
        {/* Top Stats */}
        <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat, i) => <StatCard2 key={i} {...stat} />)}
        </div>
        

        {/* Main Content: Pending Trainers */}
        <div className="lg:col-span-8 flex flex-col gap-6">

                {/* Monthly User Growth Chart */}
      <DynamicAreaChart
        title="Monthly Practice Hours"
        dataSets={practiceHoursData}
        dataKey="value"
        height={350} // Adjust height as needed
      />

    
          
        </div>

        {/* Right Sidebar: Recent Bookings */}
{/* Right Sidebar: Recent Trainers */}
<div className="lg:col-span-4 flex flex-col gap-6">
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
    <h3 className="font-semibold text-gray-800 text-lg mb-6">Latest Trainers</h3>

    {recentTrainers.length === 0 ? (
      <p className="text-gray-500 text-sm">No trainers found.</p>
    ) : (
      <div className="space-y-5">
        {recentTrainers.map((trainer) => (
          <div
            key={trainer._id}
            className="p-4 border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200"
          >
            {/* Trainer Info */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={trainer.profilePicture || "https://i.pravatar.cc/40"}
                  alt={trainer.fullName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-800">{trainer.fullName}</p>
                  <p className="text-sm text-gray-500">{trainer.specializations || "Trainer"}</p>
                </div>
              </div>
            </div>

            {/* Contact or action */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Email: {trainer.email}</span>
              <button
                onClick={() => {
                  navigate(`/admin/trainer/${trainer._id}`);
                }}
                className="px-2 py-1 btn btn-primary text-xs"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>


      </div>
      {/* Table below chart, full width */}
      <div className="mt-6">
      <DynamicTable
  title="Pending Trainer Approvals"
  data={pendingTrainers}
  columns={pendingTrainerColumns}
  actions={pendingTrainerActions}
/>
      </div>

    </div>
  );
};

export default AdminDashboard;
