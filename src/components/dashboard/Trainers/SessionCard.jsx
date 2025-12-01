import { m } from "framer-motion";
import {  MapPin, Video, Building } from 'lucide-react';
import { useState } from "react";



// --- Session Card ---
const SessionCard = ({ session }) => {
    const typeStyles = {
        Online: { bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-800', icon: <Video size={14} /> },
        Home: { bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-800', icon: <MapPin size={14} /> },
        Centre: { bg: 'bg-indigo-100', border: 'border-indigo-500', text: 'text-indigo-800', icon: <Building size={14} /> },
    };
    const style = typeStyles[session.type] || {};

    const top = (session.start.getHours() - 7) * 60 + session.start.getMinutes(); // start from 7 AM
    const height = (session.end.getTime() - session.start.getTime()) / (1000 * 60);

    return (
        <div
            className={`absolute left-2 right-2 p-2 rounded-lg shadow-sm overflow-hidden ${style.bg} border-l-4 ${style.border}`}
            style={{ top: `${top}px`, height: `${height}px` }}
        >
            <p className={`font-bold text-xs ${style.text}`}>{session.title}</p>
            <div className={`flex items-center gap-1 text-xs mt-1 ${style.text}`}>
                {style.icon}
                <span>{session.type}</span>
            </div>
            <p className={`text-xs mt-1 ${style.text}`}>
                {session.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
        </div>
    );
};

export default SessionCard;