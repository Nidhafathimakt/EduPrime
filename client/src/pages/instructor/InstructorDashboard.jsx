import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Users, DollarSign } from "lucide-react";
import Spinner from "../../components/Spinner";
import CourseService from "../../services/instructorApiService/CourseService";

function InstructorDashboard() {
  const { getInstructorCourses } = CourseService();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await getInstructorCourses();

      if (res.success) {
        const courses = res.data;

        const totalStudents = courses.reduce(
          (sum, course) => sum + (course.enrolledStudents?.length || 0),
          0,
        );

        setAnalytics({
          totalCourses: courses.length,
          totalStudents,
          totalRevenue: 0,
          courses,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-bold">Instructor Dashboard</h1>
      <p className="text-gray-500">Manage your courses and track performance</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          {
            icon: BookOpen,
            label: "Total Courses",
            value: analytics?.totalCourses || 0,
          },
          {
            icon: Users,
            label: "Total Students",
            value: analytics?.totalStudents || 0,
          },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="card flex items-center gap-4">
            <div className="rounded-lg bg-primary-50 p-3 dark:bg-primary-900/30">
              <Icon className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Your Courses</h2>
          <Link to="/instructor/courses/new" className="btn-primary text-sm">
            Create Course
          </Link>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left dark:border-gray-700">
                <th className="py-3 pr-4">Title</th>
                <th className="py-3 pr-4">Students</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3">Rating</th>
              </tr>
            </thead>
            <tbody>
              {analytics?.courses?.map((c) => (
                <tr
                  key={c._id}
                  className="border-b border-gray-100 dark:border-gray-800"
                >
                  <td className="py-3 pr-4">
                    <Link
                      to={`/instructor/courses/${c._id}/edit`}
                      className="font-medium hover:text-primary-600"
                    >
                      {c.title}
                    </Link>
                  </td>
                  <td className="py-3 pr-4">{c.students}</td>
                  <td className="py-3 pr-4">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs capitalize ${
                        c.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : c.status === "pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3">{c.rating || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default InstructorDashboard;
