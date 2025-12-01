
import React from 'react';
import { Calendar, MessageSquare, Star } from 'lucide-react';
import StatusBadge from '../../common/StatusBadge';


const BookingCard = ({ booking }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
            <div className="p-5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <div className="flex items-center gap-4 mb-3 sm:mb-0">
                        <img src={booking.trainer.avatar} alt={booking.trainer.name} className="w-12 h-12 rounded-full border-2 border-indigo-200" />
                        <div>
                            <p className="font-bold text-gray-800 text-lg">{booking.trainer.name}</p>
                            <p className="text-sm text-gray-500">{booking.classType}</p>
                        </div>
                    </div>
                    <StatusBadge status={booking.status} 
                    colorMap={{
            confirmed: { bg: "bg-green-100", text: "text-green-800" },
            completed: { bg: "bg-blue-100", text: "text-blue-800" },
            pending: { bg: "bg-yellow-100", text: "text-yellow-800" },
            cancelled: { bg: "bg-red-100", text: "text-red-800" },
          }}
                    
                    />
                </div>
                
                <div className="border-t border-gray-100 my-4"></div>

                <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-2 mb-2 sm:mb-0">
                        <Calendar size={16} className="text-gray-400" />
                        <span>{booking.dateTime}</span>
                    </div>
                     <div className="font-semibold text-gray-800">
                        Price: {booking.price}
                    </div>
                </div>
            </div>
            
            {booking.status !== 'Cancelled' && (
                 <div className="bg-gray-50 px-5 py-3">
                    <div className="flex items-center justify-end gap-3">
                        {booking.status === 'Confirmed' && (
                             <button className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors">Cancel Session</button>
                        )}
                         {booking.status === 'Completed' && (
                             <button className="flex items-center gap-1.5 text-sm font-medium text-amber-600 hover:text-amber-800 transition-colors">
                                <Star size={16} /> Rate Session
                             </button>
                        )}
                        <button className="flex items-center gap-1.5 text-sm font-medium bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors">
                           <MessageSquare size={16} /> Contact Trainer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingCard;