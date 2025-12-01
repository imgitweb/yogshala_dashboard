import React, { useState } from 'react';
import { ChevronLeft, ChevronRight} from 'lucide-react';
import SessionCard from '../../../components/dashboard/Trainers/SessionCard';

// --- Helper Data ---
const today = new Date();
const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Demo sessions
const demoSessions = [
    { id: 1, title: "Riya Patel", type: "Online", start: new Date(2025, 9, 6, 14, 0), end: new Date(2025, 9, 6, 15, 0) },
    { id: 2, title: "Sameer Khan", type: "Home", start: new Date(2025, 9, 6, 16, 0), end: new Date(2025, 9, 6, 17, 0) },
    { id: 3, title: "Anjali Sharma", type: "Centre", start: new Date(2025, 9, 6, 18, 0), end: new Date(2025, 9, 6, 19, 0) },
    { id: 4, title: "Pawan Kumar", type: "Online", start: new Date(2025, 9, 7, 10, 0), end: new Date(2025, 9, 7, 11, 30) },
    { id: 5, title: "Sneha Reddy", type: "Home", start: new Date(2025, 9, 8, 11, 0), end: new Date(2025, 9, 8, 12, 0) },
    { id: 6, title: "Vikram Rathod", type: "Online", start: new Date(2025, 9, 8, 14, 0), end: new Date(2025, 9, 8, 15, 30) },
    { id: 7, title: "Meera Das", type: "Centre", start: new Date(2025, 9, 10, 17, 0), end: new Date(2025, 9, 10, 18, 0) },
];



// --- Main Component ---
const MySchedule = () => {
    const [currentDate, setCurrentDate] = useState(today);

    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    const weekDates = Array.from({ length: 7 }).map((_, i) => {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        return date;
    });

    const changeWeek = (amount) => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + amount * 7);
        setCurrentDate(newDate);
    };

    const timeSlots = Array.from({ length: 15 }).map((_, i) => {
        const hour = 7 + i;
        return `${hour % 12 === 0 ? 12 : hour % 12} ${hour < 12 || hour === 24 ? 'AM' : 'PM'}`;
    });

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
             <div className=' pb-4 '>
                        <h1 className="text-2xl sm:text-2xl font-bold text-gray-800">My Schedule</h1>
                        <p className="text-gray-500">Your weekly view of upcoming sessions.</p>
                    </div>
            <div className=" bg-white p-4 sm:p-6 rounded-2xl shadow border border-gray-200">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                        <p className="text-gray-500">Your weekly view of upcoming sessions.</p>
                   
                    <div className="flex items-center md:gap-4 mt-4 sm:mt-0">
                        <div className="flex items-center gap-2">
                            <button onClick={() => changeWeek(-1)} className="p-2 rounded-md hover:bg-gray-100"><ChevronLeft size={20} /></button>
                            <span className="font-semibold text-gray-700 w-32 text-center">
                                {startOfWeek.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                            </span>
                            <button onClick={() => changeWeek(1)} className="p-2 rounded-md hover:bg-gray-100"><ChevronRight size={20} /></button>
                        </div>
                        <button onClick={() => setCurrentDate(new Date())} className="px-4 py-2 text-sm font-semibold border border-gray-300 rounded-md hover:bg-gray-100">
                            Today
                        </button>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="overflow-x-auto">
                    <div className="flex min-w-[700px]">

                        {/* Time Column */}
                        <div className="flex flex-col w-16">
                            <div className="h-12"></div> {/* Spacer for day headers */}
                            {timeSlots.map(time => (
                                <div key={time} className="h-16 flex items-start justify-end pr-2">
                                    <span className="text-xs text-gray-500">{time}</span>
                                </div>
                            ))}
                        </div>

                        {/* Days Columns */}
                        <div className="flex-1 grid grid-cols-7 relative border-l border-t border-gray-100">
                            {/* Day Headers */}
                            {weekDates.map((date, i) => (
                                <div key={i} className="text-center p-2 border-l border-gray-100">
                                    <p className="text-sm text-gray-500">{dayLabels[i]}</p>
                                    <p className={`text-xl font-bold mt-1 w-10 h-10 flex items-center justify-center rounded-full mx-auto ${date.toDateString() === today.toDateString() ? 'bg-indigo-500 text-white' : 'text-gray-800'}`}>
                                        {date.getDate()}
                                    </p>
                                </div>
                            ))}

                            {/* Sessions Area */}
                            {weekDates.map((date, i) => (
                                <div key={i} className="relative border-l border-t border-gray-100">
                                    {timeSlots.map((_, idx) => (
                                        <div key={idx} className="h-16 border-b border-gray-100"></div>
                                    ))}
                                    {demoSessions
                                        .filter(s => new Date(s.start).toDateString() === date.toDateString())
                                        .map(session => <SessionCard key={session.id} session={session} />)
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MySchedule;
