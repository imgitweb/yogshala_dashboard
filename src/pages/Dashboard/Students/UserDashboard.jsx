import React, { use, useEffect, useState } from "react";
import { Calendar, CheckCircle, UserCircle, AlertCircle, MoreHorizontal, Heart, Video, XCircle } from "lucide-react";
import StatCard2 from "../../../components/common/StatCard2";
import DynamicTable from "../../../components/common/DynamicTable";
import StatusBadge from "../../../components/common/StatusBadge";
import DynamicBarChart from "../../../components/common/DynamicBarChart";
import DynamicAreaChart from "../../../components/common/DynamicAreaChart";
import { useSelector } from "react-redux";
import { dashboardStats } from "../../../apis/userApi";


const UserDashboard = () => {
  const {user} = useSelector((state) => state.auth);
  const [dashboardStatsData, setDashboardStatsData] = useState({});
   const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    document.title = `${user?.firstName || 'User'}'s Dashboard - Yoga Trainer App`;
    const fetchDashboardData = async () => {
      try {

        const stats = await dashboardStats();
        setDashboardStatsData(stats);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchDashboardData();

  }, [user]);




  console.log("Table Data:", dashboardStatsData.latestBookings);


  const stats = [
    {
      title: "Upcoming Sessions",
      value: dashboardStatsData.upCommingSessions || 0,
      subtitle: "This week",
      icon: <Calendar size={18} />,
      gradient: "from-blue-50 to-blue-100",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Sessions Attended",
      value: dashboardStatsData.completedSessions || 0,
      subtitle: "This month",
      icon: <CheckCircle size={18} />,
      gradient: "from-green-50 to-green-100",
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Active Trainers",
      value: dashboardStatsData.activeTrainers || 0,
      subtitle: "You are connected with",
      icon: <UserCircle size={18} />,
      gradient: "from-indigo-50 to-indigo-100",
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    {
      title: "Total Spent",
      value: dashboardStatsData.totalSpent || 0,
      subtitle: "For next month",
      icon: <AlertCircle size={18} />,
      gradient: "from-yellow-50 to-yellow-100",
      iconBg: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
  ];

 const sessionsData = dashboardStatsData.latestBookings || [];

  const sessionColumns = [
    {
      key: "trainer",
      label: "Trainer",
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.trainer?.profilePicture || "/default-avatar.png"}
            alt={row.trainer?.fullName || "Trainer"}
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium text-gray-700">
            {row.trainer?.fullName || "Unknown Trainer"}
          </span>
        </div>
      ),
    },
    {
      key: "sessionType",
      label: "Class Type",
      render: (row) =>
        row.sessionType
          ? row.sessionType.charAt(0).toUpperCase() + row.sessionType.slice(1)
          : "N/A",
    },
    {
      key: "sessionDate",
      label: "Date & Time",
      render: (row) => {
        const date = new Date(row.sessionDate);
        return (
          <span>
            {date.toLocaleDateString("en-IN", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}{" "}
            | {row.startTime} - {row.endTime}
          </span>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <StatusBadge
          status={row.status}
          colorMap={{
            confirmed: { bg: "bg-green-100", text: "text-green-800" },
            completed: { bg: "bg-blue-100", text: "text-blue-800" },
            pending: { bg: "bg-yellow-100", text: "text-yellow-800" },
            cancelled: { bg: "bg-red-100", text: "text-red-800" },
          }}
        />
      ),
    },
  ];

  // Actions for each session in the table
  const sessionActions = [
    {
      label: "Join",
      variant: "primary",
      icon: Video,
      onClick: (row) => {
        window.open(row.videoLink, "_blank");

      },
      show: (row) => row.status === "Confirmed" && row.classType.toLowerCase().includes("online"),
    },
    // {
    //   label: "Rate",
    //   variant: "primary",
    //   icon: Heart,
    //   onClick: (row) => alert(`Rating session with ${row.trainer.name}`),
    //   show: (row) => row.status === "Completed",
    // },
    {
      label: "Details",
      variant: "outline",
      icon: MoreHorizontal,
      onClick: (row) => alert(`Viewing details for class on ${row.dateTime}`),
      show: () => true,
    },
  ];

  const pendingReviews = [
    { trainer: { name: "Aarav Sharma", avatar: "https://i.pravatar.cc/40?img=5" }, classType: "Online - Hatha Yoga", dateTime: "Oct 01, 2025, 7:00 AM" }
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

   const nextSession = sessionsData
    .filter(s => s.status === 'Confirmed' && new Date(s.dateTime) > new Date())
    .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))[0];


  return (
  <div className="bg-gray-50 min-h-screen  font-sans">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard2 key={index} {...stat} />
      ))}
    </div>

    {/* Main Content Area: Area Chart */}
    <div className="lg:col-span-8">
      <DynamicAreaChart
        title="Monthly Practice Hours"
        dataSets={practiceHoursData}
        dataKey="value"
        height={400} // Adjust height as needed
      />

    
    </div>
    

    {/* Right Sidebar */}
    <div className="lg:col-span-4 flex flex-col gap-6">
      {/* Next Session Card */}
      {nextSession && (
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Next Session</h3>
          <div className="p-4 bg-indigo-50 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={nextSession.trainer.avatar}
                alt={nextSession.trainer.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-indigo-800">{nextSession.trainer.name}</p>
                <p className="text-sm text-indigo-700">{nextSession.classType}</p>
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-4 space-y-1">
              <p>
                <strong>Date:</strong>{" "}
                {new Date(nextSession.dateTime).toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <p>
                <strong>Time:</strong>{" "}
                {new Date(nextSession.dateTime).toLocaleTimeString(undefined, {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            {nextSession.classType.toLowerCase().includes("online") && (
              <button className="w-full text-sm bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2">
                <Video size={16} /> Join Online Class
              </button>
            )}
          </div>
        </div>
      )}

      {/* Pending Reviews Card */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">Pending Reviews</h3>
        {pendingReviews.length > 0 ? (
          <div className="space-y-3">
            {pendingReviews.map((review) => (
              <div key={review.dateTime} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={review.trainer.avatar}
                    alt={review.trainer.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-sm text-gray-700">{review.trainer.name}</p>
                    <p className="text-xs text-gray-500">{review.classType}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-3">Session on: {review.dateTime}</p>
                <button className="w-full text-sm bg-amber-500 text-white py-1.5 rounded-md hover:bg-amber-600 transition-colors flex items-center justify-center gap-2">
                  <Heart size={14} /> Rate Session
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">You're all caught up!</p>
        )}
      </div>
    </div>
  </div>
    {/* Table below chart, full width */}
      <div className="mt-6">
        <DynamicTable
          title="Your Sessions"
          subtitle="Upcoming and past yoga classes"
          data={sessionsData}
          columns={sessionColumns}
          actions={sessionActions}
          searchable
        />
      </div>
       {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-[90%] text-center relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
            >
              <XCircle size={22} />
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Book Your Session Now!</h2>
            <p className="text-gray-600 mb-5">
              Don’t miss out on your next yoga class. Reserve your spot today and stay consistent with your practice.
            </p>
            <button
              onClick={() => {
                setShowPopup(false);
                window.location.href = "/trainers"; // 👈 redirect to booking page
              }}
              className="bg-primary text-white py-2 px-6 rounded-lg font-semibold hover:bg-primary-light transition"
            >
              Book Now
            </button>
          </div>
        </div>
      )}

</div>

  );
};

export default UserDashboard;
