import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const menu = [
    { name: "Dashboard", path: "/superadmin/dashboard" },
    { name: "Create Admin", path: "/superadmin/create-admin" },
    { name: "Admins", path: "/superadmin/admins" },
  ];

  return (
    <div className="w-64 bg-white border-r p-4">
      <h1 className="text-xl font-bold mb-6">Super Admin</h1>

      <nav className="space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${
                isActive ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;