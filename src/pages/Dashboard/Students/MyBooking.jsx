import React, { useEffect, useState, useMemo } from "react";
import {
  Calendar,
  CheckCircle,
  XCircle,
  Video,
  MapPin,
  Home,
  Info,
} from "lucide-react";
import { getMyBookings } from "../../../apis/userApi";
import BookingDetailsModal from "../Trainers/BookingDetailsModel";

const MyBooking = () => {
  const [activeTab, setActiveTab] = useState("confirmed");
  const [myBookings, setMyBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await getMyBookings();
        setMyBookings(Array.isArray(res) ? res : []);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      }
    };
    fetchBookings();
  }, []);

  const tabs = [
    { id: "pending", label: "Pending", icon: <Info size={16} /> },
    { id: "confirmed", label: "Confirmed", icon: <CheckCircle size={16} /> },
    { id: "completed", label: "Completed", icon: <CheckCircle size={16} /> },
    { id: "cancelled", label: "Cancelled", icon: <XCircle size={16} /> },
  ];

  const filteredBookings = useMemo(() => {
    return myBookings.filter(
      (b) => b.status?.toLowerCase() === activeTab.toLowerCase()
    );
  }, [activeTab, myBookings]);

  const handleJoinNow = (booking) => {
    if (!booking.videoLink) {
      alert("Meeting link not yet shared by the trainer.");
      return;
    }
    window.open(booking.videoLink, "_blank");
  };

  const handleViewDetails = (booking) => setSelectedBooking(booking);

  const handlePayNow = (bookingId) => {
    alert(`Redirecting to payment for booking ${bookingId}`);
    // TODO: integrate Razorpay or your payment API here
  };

  return (
    <div className="min-h-screen font-sans">
      <div>
        <h1 className="text-2xl font-bold text-dark mb-2">My Bookings</h1>
        <p className="text-gray-500 mb-6">
          Manage and track all your yoga sessions.
        </p>
      </div>

      {/* Tabs */}
      <div className="w-full bg-light rounded-2xl p-4">
        <div className="flex gap-2 mb-6 p-2 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow"
                  : "bg-gray-100 text-dark hover:bg-primary-light hover:text-dark"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Booking Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => {
              const type = booking.sessionType?.toLowerCase();
              const trainer = booking.trainer || {};
              const classLabel =
                booking.sessionType === "online"
                  ? "Online Session"
                  : booking.sessionType === "home"
                  ? "Home Visit"
                  : "Centre Session";

              return (
                <div
                  key={booking._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between hover:shadow-md transition"
                >
                  {/* Trainer Info */}
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={trainer.profilePicture || "/default-avatar.png"}
                      alt={trainer.fullName || "Trainer"}
                      className="w-12 h-12 rounded-full border"
                    />
                    <div>
                      <p className="font-semibold text-dark">
                        {trainer.fullName || "Unknown Trainer"}
                      </p>
                      <p className="text-sm text-gray-500">{classLabel}</p>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="text-sm text-dark mb-3">
                    {new Date(booking.sessionDate).toLocaleDateString("en-IN", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    | {booking.startTime} - {booking.endTime}
                  </div>

                  {/* Status & Amount */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "completed"
                          ? "bg-blue-100 text-blue-700"
                          : booking.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                    <span className="font-semibold text-dark">
                      {booking.currency || "INR"} {booking.amount || 0}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  {booking.status === "pending" ? (
                    <button
                      onClick={() => handlePayNow(booking._id)}
                      className="mt-2 w-full btn btn-primary flex items-center justify-center gap-2"
                    >
                      Pay & Confirm Seat
                    </button>
                  ) : booking.status === "confirmed" ? (
                    <>
                      {type === "online" ? (
                        <button
                          onClick={() => handleJoinNow(booking)}
                          className="mt-2 w-full btn btn-primary flex items-center justify-center gap-2"
                        >
                          <Video size={16} /> Join Session
                        </button>
                      ) : (
                        <button
                          onClick={() => handleViewDetails(booking)}
                          className="mt-2 w-full btn btn-primary flex items-center justify-center gap-2"
                        >
                          {type === "home" ? (
                            <>
                              <Home size={16} /> View Address
                            </>
                          ) : (
                            <>
                              <MapPin size={16} /> Centre Details
                            </>
                          )}
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => handleViewDetails(booking)}
                      className="mt-2 w-full btn btn-outline flex items-center justify-center gap-2"
                    >
                      <Info size={16} /> View Details
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <p className="col-span-full text-center text-gray-500 mt-10">
              No {activeTab} bookings available.
            </p>
          )}
        </div>
      </div>

      {/* ✅ Replaced old modal with your imported BookingDetailsModal */}
      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
};

export default MyBooking;
