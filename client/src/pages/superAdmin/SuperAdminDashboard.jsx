import React, { useEffect, useState } from "react";
import AllUsersService from "../../services/adminApiService/AllUsersService";
import StatCard from "../../components/StatCard";

function SuperAdminDashboard() {
  const { getStatistics } = AllUsersService();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await getStatistics();
      setStats(res.stats);
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6"> Super Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Users" value={stats?.totalUsers} />
        <StatCard title="Total Courses" value={stats?.totalCourses} />
        <StatCard title="Enrollments" value={stats?.totalEnrollments} />
        <StatCard title="Active Subscriptions" value={stats?.activeSubscriptions} />
      </div>
    </div>
  );
}

export default SuperAdminDashboard;
