// src/pages/trainer/TrainerDashboard.jsx
import React, { useEffect, useState } from "react";
import { Calendar, Users, Wallet, Clock, Check, X, Video, MoreHorizontal, MapPin, Building, DoorOpen, CircleCheckBig, Eye } from "lucide-react";
import StatCard2 from "../../../components/common/StatCard2";
import StatusBadge from "../../../components/common/StatusBadge";
import DynamicTable from "../../../components/common/DynamicTable";
import DynamicAreaChart from "../../../components/common/DynamicAreaChart"; // <-- make sure this exists
import { getDashboardData } from "../../../apis/trainerApi";
import BookingDetailsModal from "./BookingDetailsModel";

const TrainerDashboard = () => {
const [dashboardData, setDashboardData] = useState(null);
 const [selectedBooking, setSelectedBooking] = useState(null);
 console.log("Dashboard Data:", selectedBooking);

const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    const res = await getDashboardData();
    setDashboardData(res);
    setLoading(false);
   
  };

  fetchData();
}, []);

if (loading) {
  return <div className="flex flex-col items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-primary"></div>
    <p>Loading dashboard data...</p>
  

  </div>;
}







  const stats = [
    { title: "Today's Sessions", value: dashboardData.todaySessions.length || 0, subtitle: "3 upcoming", icon: <Calendar size={18} />, gradient: "from-blue-50 to-blue-100", iconBg: "bg-blue-50", iconColor: "text-blue-600" },
    { title: "Confirmed Bookings", value: dashboardData.confirmBookings.length
, subtitle: "+4 this week", icon: <Users size={18} />, gradient: "from-green-50 to-green-100", iconBg: "bg-green-50", iconColor: "text-green-600" },
    { title: "Total Earnings", value: dashboardData.monthlyEarnings.totalEarnings
 || 0, subtitle: "As of Oct 6", icon: <Wallet size={18} />, gradient: "from-yellow-50 to-yellow-100", iconBg: "bg-yellow-50", iconColor: "text-yellow-600" },
    { title: "Pending Requests", value: dashboardData.pendingBookings.length
|| 0, subtitle: "Awaiting payment", icon: <Clock size={18} />, gradient: "from-red-50 to-red-100", iconBg: "bg-red-50", iconColor: "text-red-600" },
  ];

  const upcomingSessions = dashboardData.confirmBookings
.map((s) => ({
    id: s._id,
    client: {
      name: s.student?.fullName || "Unknown",
      avatar: s.student?.profilePicture || "/default-avatar.png",
      phone: s.student?.phone || "N/A",
      email: s.student?.email || "N/A",
    },
    classType:
      s.sessionType === "online"
        ? "Online Session"
        : s.sessionType === "home"
        ? "Home Visit"
        : "Centre Session",
    time: `${s.startTime} - ${s.endTime}`,
    status: "confirmed", 
    videoLink: s.videoLink || null,
    centreName: s.centreName || null,
    centreAddress: s.centreAddress || null,
    centreCity: s.centreCity || null,
    centreState: s.centreState || null,
    dateTime: s.sessionDate,
    start : s.startTime,
    end : s.endTime,
    notes : s.notes,
    amount : s.amount,
    currency : s.currency,
    address :s.address
    
  }));

  const sessionColumns = [
    { key: 'client', label: 'Client', render: (row) => (
      <div className="flex items-center gap-3">
        <img src={row.client.avatar} alt={row.client.name} className="w-8 h-8 rounded-full" />
        <span className="font-medium text-gray-700">{row.client.name}</span>
      </div>
    )},
     {
      key: "classType",
      label: "Class Type",
      render: (row) => {
        const icons = {
          Online: <Video size={16} className="text-blue-500" />,
          Home: <MapPin size={16} className="text-green-500" />,
          Centre: <Building size={16} className="text-indigo-500" />,
        };
        const type = row.classType.split(" ")[0];
        return (
          <div className="flex items-center gap-1">
            {icons[type] || <Info size={16} />}
            <span>{row.classType}</span>
          </div>
        );
      },
    },
    { key: 'time', label: 'Time' },
    { key: 'status', label: 'Status', render: (row) => (
      <StatusBadge status={row.status} colorMap={{ confirmed: { bg: "bg-green-100", text: "text-green-800" } }} />
    )},
  ];

  const sessionActions = [
    { label: 'View', variant: 'primary', icon: Eye, onClick: (row) => 
    {
      setSelectedBooking(row);
    }      
     },
    { label: 'Details', variant: 'outline', icon: CircleCheckBig, onClick: (row) => alert(`Viewing details for ${row.client.name}`) },
  ];

 const bookingRequests = dashboardData.latestBookings.map((b) => ({
    id: b._id,
    client: {
      name: b.student?.fullName || "Unknown",
      avatar: b.student?.profilePicture || "/default-avatar.png",
    },
    classType:
      b.sessionType === "online"
        ? "Online Session"
        : b.sessionType === "home"
        ? "Home Visit"
        : "Centre Session",
    dateTime: new Date(b.sessionDate),
    requested: new Date(b.createdAt).toLocaleDateString(),
    status: b.status,
  }));  

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


  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Top row: Stat Cards */}
        <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard2 key={index} {...stat} />
          ))}
        </div>

        {/* Main Content Area (Left Side) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Area Chart */}
             <DynamicAreaChart
        title="Monthly Earnings"
        dataSets={practiceHoursData}
        dataKey="value"
        height={360} // Adjust height as needed
      />

       
        </div>

       {/* Right Sidebar */}
<div className="lg:col-span-4 flex flex-col gap-6">
  <div className="bg-light p-6 rounded-xl shadow-md border border-light">
    <h3 className="font-700 text-dark text-lg mb-5">New Booking Requests</h3>

    <div className="space-y-5">
      {bookingRequests.map(req => (
        <div 
          key={req.id} 
          className="p-4 border-gray-100  border rounded-xl  shadow-sm hover-lift transition-shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <img 
                src={req.client.avatar} 
                alt={req.client.name} 
                className="w-12 h-12 rounded-full border-2 border-primary"
              />
              <div>
                <p className="font-600 text-dark">{req.client.name}</p>
                <p className="text-sm text-muted">{req.classType}</p>
              </div>
            </div>

           <span className={`px-3 py-1 rounded-full text-xs font-500 ${
  req.status === "pending" ? "bg-yellow-100 text-yellow-800" :
  req.status === "confirmed" ? "bg-green-100 text-green-800" :
  req.status === "declined" ? "bg-red-100 text-red-800" :
  "bg-gray-100 text-gray-500"
}`}>
  {req.status ? req.status.charAt(0).toUpperCase() + req.status.slice(1) : "Unknown"}
</span>
          </div>

          <div className="flex items-center justify-between text-xs text-muted mb-3">
            <span>Requested: {req.requested}</span>
            <span className="flex items-center gap-1">
              <Clock size={12} /> {req.requested}
            </span>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 btn btn-primary hover:bg-light flex items-center justify-center gap-2 text-accent border-accent">
              <X size={14} /> Decline
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
      </div>
      <div className="mt-6">

          <DynamicTable
            title="Today's Upcoming Sessions"
            data={upcomingSessions.reverse().slice(0,5)}
            columns={sessionColumns}
            actions={sessionActions}
          />
      </div>
       <BookingDetailsModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
         
    </div>
  );
};

export default TrainerDashboard;
