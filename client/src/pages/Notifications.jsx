import React, { useState } from "react";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold">Notifications</h1>
      <div className="mt-6 space-y-3">
        {notifications.map((n) => (
          <div
            key={n._id}
            className={`card ${!n.isRead ? "border-primary-200 bg-primary-50/50 dark:border-primary-800" : ""}`}
          >
            <p className="font-medium">{n.title}</p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {n.message}
            </p>
            <p className="mt-2 text-xs text-gray-400">
              {new Date(n.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
        {notifications.length === 0 && (
          <p className="py-12 text-center text-gray-500">
            No notifications yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default Notifications;
