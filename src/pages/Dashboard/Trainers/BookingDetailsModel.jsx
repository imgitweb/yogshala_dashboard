import React, { useState } from "react";
import { Video, MapPin, Building, Calendar, Clock, Mail, Phone, X } from "lucide-react";
import { notifyUserforMeeting } from "../../../apis/trainerApi";
import { useDispatch, useSelector } from "react-redux";
import { showError, showSuccess } from "../../../utils/toastService";

const BookingDetailsModal = ({ booking, onClose }) => {
   const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [isloading , setIsloading] =  useState(false) ;
  if (!booking) return null;


  const isOnline = booking.classType === "Online Session";
  const isHome = booking.classType === "Home Visit";
  const isCentre = booking.classType === "Centre Session";


const NotifyUserForJoinMeet = async(email, videoLink, bookingId) => {
try {
  setIsloading(true);
    const response =  await notifyUserforMeeting(email, videoLink, bookingId) ;
    if(response){
      showSuccess(response?.message || "Notification sent successfully");
    }
} catch (error) {
  console.error("Failed to send notification:", error);
  showError("Failed to send notification");
} finally{
  setIsloading(false);
}
  }



  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-light rounded-2xl shadow-lg border border-light p-6 w-full max-w-lg relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-dark transition"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-4 mb-5 border-b pb-4">
          <img
            src={booking.client?.avatar || "https://i.pravatar.cc/80?u=" }
            alt={booking.client?.name || "Client"}
            className="w-14 h-14 rounded-full border-2 border-primary"
          />
          <div>
            <h2 className="text-lg font-700 text-dark">
              {booking.client?.name || "Unknown Client"}
            </h2>
            <p className="text-sm text-muted">{booking.client?.email}</p>
          </div>
        </div>

        {/* Booking Info */}
        <div className="space-y-4 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-primary" />
            <span>
             {
                booking.dateTime
                  ? new Date(booking.dateTime).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"
             }
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={16} className="text-primary" />
            <span>
             {booking.time}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isOnline ? (
              <Video size={16} className="text-blue-500" />
            ) : isHome ? (
              <MapPin size={16} className="text-green-500" />
            ) : (
              <Building size={16} className="text-indigo-500" />
            )}
            <span className="capitalize">
              {isOnline
                ? "Online Session"
                : isHome
                ? "Home Visit"
                : "Centre Session"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Phone size={16} className="text-primary" />
            <span>{booking.client?.phone || "N/A"}</span>
          </div>

          {/* Notes */}
          {/* {booking.notes && (
            <div className="p-3 bg-gray-50 rounded-xl border">
              <p className="text-sm italic text-gray-600">“{booking.notes}”</p>
            </div>
          )} */}
          {/* Email */}
          {
            user?.role === 'Trainer' ?
            ( <div className="flex items-center justify-between">
         <div className="flex items-center gap-2">
            <Mail size={16} className="text-primary" />
            <span>{booking.client?.email || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="btn btn-primary"
            onClick={
              ()=>{
                NotifyUserForJoinMeet(booking.client?.email, booking.videoLink , booking.id) ;
              }
            }
            
            >
              { isloading ? "Sending..." : "Send Mail"}
              </span></div>
          </div>) : null 
          }
         
         

          {/* Address / Join Button */}
          {isOnline && (
            <div className="pt-4">
              <a
                href={booking.videoLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full inline-flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-xl font-600 hover:bg-primary-dark transition ${
                  !booking.videoLink ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Video size={16} />
                Join Now
              </a>
            </div>
          )}

          {isHome && (
            <div className="pt-4 border-t">
              <p className="text-sm text-muted mb-1 font-600">Home Address:</p>
              <p className="text-gray-700">
                {booking.address || "Address not provided"}
              </p>
            </div>
          )}

          {isCentre && (
            <div className="pt-4 border-t">
              <p className="text-sm text-muted mb-1 font-600">Centre:</p>
              <p className="text-gray-700">
                {booking.centreName || "Main Yoga Centre"}
              </p>
              {booking.centreAddress && (
                <p className="text-gray-600 text-sm mt-1">
                  {booking.centreAddress} , {booking.centreCity } , {booking.centreState }
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 border-t pt-4 flex justify-between items-center">
          <div>
            <span className="text-sm text-muted">Amount:</span>{" "}
            <span className="font-700 text-dark">
              {booking.currency} {booking.amount}
            </span>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-600 capitalize ${
              booking.status === "confirmed"
                ? "bg-green-100 text-green-800"
                : booking.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {booking.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
