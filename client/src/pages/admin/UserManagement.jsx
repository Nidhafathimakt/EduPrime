import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import AllUsersService from "../../services/adminApiService/AllUsersService";
import { toast } from "react-toastify";

function UserManagement() {
  const { allUsers, fetchUser, setAllUsers } = useContext(ShopContext);
  const { deleteUser, updateUser } = AllUsersService();
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const HandleDeleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;
    try {
      await deleteUser(id);
      setAllUsers((prev) => prev.filter((user) => user._id !== id));
      toast.success("User deleted");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const updateRole = async (id, role) => {
    try {
      const response = await updateUser(id, { role });

      if (response.success) {
        setAllUsers((prev) =>
          prev.map((user) => (user._id === id ? { ...user, role } : user)),
        );

        toast.success("Role updated");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update role");
    }
  };

  const filteredUsers = filter
    ? allUsers.filter((user) => user.role === filter)
    : allUsers;

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">User Management</h1>
      <div className="mt-4 flex gap-2">
        {["", "student", "instructor"].map((r) => (
          <button
            key={r || "all"}
            onClick={() => setFilter(r)}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              filter === r
                ? "bg-primary-600 text-white"
                : "bg-gray-100 dark:bg-gray-800"
            }`}
          >
            {r || "All"}
          </button>
        ))}
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left dark:border-gray-700">
              <th className="py-3 pr-4">Name</th>
              <th className="py-3 pr-4">Email</th>
              <th className="py-3 pr-4">Role</th>
              <th className="py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u._id} className="border-b dark:border-gray-800">
                <td className="py-3 pr-4">{u.name}</td>
                <td className="py-3 pr-4">{u.email}</td>
                <td className="py-3 pr-4 capitalize">{u.role}</td>
                <td className="py-3 flex gap-2">
                  {u.role !== "superadmin" && u.role !== "admin" && (
                    <>
                      <select
                        value={u.role}
                        onChange={(e) => updateRole(u._id, e.target.value)}
                        className="input-field py-1 text-xs"
                      >
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                      </select>
                      <button
                        onClick={() => HandleDeleteUser(u._id)}
                        className="text-red-600 hover:underline text-xs"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagement;
