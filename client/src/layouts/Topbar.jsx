import React from "react";

function Topbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h2 className="font-semibold">Super Admin Panel</h2>

      <div className="text-sm text-gray-600">
        {user?.name} ({user?.role})
      </div>
    </div>
  );
}

export default Topbar;