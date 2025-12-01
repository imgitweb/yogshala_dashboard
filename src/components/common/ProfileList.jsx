import React from "react";

const ProfileList = ({ title, users }) => {
  return (
    <div className="card-glass p-4 rounded-2xl">
      <h3 className="font-700 text-dark mb-3">{title}</h3>
      <ul className="space-y-3">
        {users.map((u) => (
          <li key={u.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={u.avatar}
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <div className="font-600 text-dark">{u.name}</div>
                <div className="text-xs text-muted">{u.role}</div>
              </div>
            </div>
            <div className="text-sm text-muted">{u.detail}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileList;
