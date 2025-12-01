import React, { useEffect, useState } from "react";
import DynamicTable from "../../../components/common/DynamicTable";
import { Clock, Video, MapPin, Building, Info, CircleCheckBig, Eye } from "lucide-react";
import { getBookings } from "../../../apis/trainerApi";
import StatusBadge from "../../../components/common/StatusBadge";
import BookingDetailsModal from "./BookingDetailsModel";

const BookingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("confirmed");
   const [selectedBooking, setSelectedBooking] = useState(null);
  



  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await getBookings();
        const data = res.bookings || [];
        console.log("Fetched Bookings:", data);


        const mapped = data.map((b) => ({
          id: b._id,
          client: {
            name: b.student?.fullName || "Unknown",
            avatar: b.student?.profilePicture || "/default-avatar.png",
            phone: b.student?.phone || "N/A",
            email: b.student?.email || "N/A",
          },
          classType:
            b.sessionType === "online"
              ? "Online Session"
              : b.sessionType === "home"
              ? "Home Visit"
              : "Centre Session",
          dateTime: new Date(b.sessionDate),
          note: b.notes || "-",
          price: `${b.currency} ${b.amount}`,
          status: b.status,
          startTime: b.startTime,
          endTime: b.endTime,
          address: b.address || null,
          amount: b.amount || null,
          centreAddress: b.centreAddress || null,
          centreCity: b.centreCity || null,
          centreName: b.centreName || null,
          centreState: b.centreState || null,
          videoLink : b.videoLink || null,

        }));

        setRequests(mapped);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const columns = [
    {
      key: "client",
      label: "Client",
      render: (row) => (
        <div className="flex items-center gap-2">
          <img
            src={row.client.avatar}
            alt={row.client.name}
            className="w-8 h-8 rounded-full border"
          />
          <span>{row.client.name}</span>
        </div>
      ),
    },
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
    {
      key: "dateTime",
      label: "Date & Time",
      render: (row) => (
        <div className="flex items-center gap-1">
          <Clock size={16} className="text-gray-500" />
          <span>
            {row.dateTime.toLocaleDateString("en-IN", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}{" "}
            | {row.startTime} - {row.endTime}
          </span>
        </div>
      ),
    },
    { key: "status", label: "Status", render: (row) => 
      
          {
            const statusMap = {
              pending: { bg: "bg-yellow-100", text: "text-yellow-800" },
              confirmed: { bg: "bg-green-100", text: "text-green-800" },
              rejected: { bg: "bg-red-100", text: "text-red-800" },
            };
            return <StatusBadge status={row.status} colorMap={statusMap} />;
          }

    },
    { key: "price", label: "Price" },
  ];



   const handleSelectBooking = (row) => {
   console.log("Selected Booking Row:", row);

const booking = {
  id: row.id,
  client: {
    name: row.client.name || "Unknown",
    avatar: row.client.avatar || "/default-avatar.png",
    phone: row.client.phone || "N/A",
    email: row.client.email || "N/A",
  },
  classType: row.classType || null,
  time: `${row.startTime} - ${row.endTime}`,
  status: row.status || "confirmed",
  videoLink: row.videoLink || null,
  centreName: row.centreName || null,
  centreAddress: row.centreAddress || null,
  centreCity: row.centreCity || null,
  centreState: row.centreState || null,
  dateTime: row.dateTime,
  startTime: row.startTime,
  endTime: row.endTime,
  notes: row.note || null,
  amount: row.amount || null,
  currency: row.currency || null,
  address: row.address || null,
};

    setSelectedBooking(booking);
}

  

  const sessionActions = [
    { label: 'View', variant: 'primary', icon: Eye, onClick: (row) => {
      handleSelectBooking(row);
    } },
    { label: 'Details', variant: 'outline', icon: CircleCheckBig, onClick: (row) => alert(`Viewing details for ${row.client.name}`) },
  ];



  const filteredRequests = requests.filter(
    (req) => req.status === activeTab
  );






  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex gap-4 mb-4">
        {[ "confirmed", "pending", "rejected"].map((tab) => (
          <button
            key={tab}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-600 rounded-xl transition-all ${
              activeTab === tab
                ? "bg-primary text-white shadow hover-lift"
                : "bg-light text-dark hover:bg-primary-light hover:text-dark hover-lift"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <DynamicTable
        title="Booking Requests"
        subtitle={`Showing ${activeTab} requests`}
        data={filteredRequests}
        actions={sessionActions}
        columns={columns}
        searchable={true}
      />

       <BookingDetailsModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </div>
  );
};

export default BookingRequests;
