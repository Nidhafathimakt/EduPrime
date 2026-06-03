import { Users, BookOpen, DollarSign, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import AllUsersService from "../../services/adminApiService/AllUsersService";

function AdminDashboard() {
  const { getStatistics } = AllUsersService();
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getStatistics();

        if (response.success) {
          setStatistics(response.stats);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="text-gray-500">Platform overview and statistics</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Users, label: "Total Users", value: statistics?.totalUsers },
          {
            icon: BookOpen,
            label: "Total Courses",
            value: statistics?.totalCourses,
          },
          {
            icon: CreditCard,
            label: "Active Subscriptions",
            value: statistics?.activeSubscriptions,
          },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="card">
            <Icon className="h-8 w-8 text-primary-600" />
            <p className="mt-3 text-2xl font-bold">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="card text-center">
          <p className="text-3xl font-bold text-green-600">
            {statistics?.approvedCourses}
          </p>
          <p className="text-sm text-gray-500">Approved Courses</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-amber-600">
            {statistics?.pendingCourses}
          </p>
          <p className="text-sm text-gray-500">Pending Approval</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold">{statistics?.totalEnrollments}</p>
          <p className="text-sm text-gray-500">Total Enrollments</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
