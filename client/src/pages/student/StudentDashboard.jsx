import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, CheckCircle, TrendingUp, Play } from "lucide-react";
import { toast } from "react-toastify";
import CourseService from "../../services/instructorApiService/CourseService";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

function StudentDashboard() {
  const { getMyCourses } = CourseService();

  const { enrolled, setEnrolled } = useContext(ShopContext);
  const [progress, setProgress] = useState([]);
  const [continueLearning, setContinueLearning] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const res = await getMyCourses();

      if (!res || !res.success) {
        toast.error("Failed to load dashboard");
        return;
      }

      const courses = res.data || [];

      setEnrolled(courses);

      const progressData = courses.map((c) => ({
        courseId: c,
        progressPercentage: c.progress?.progressPercentage || 0,
        completedLessons: c.completedLessons || [],
      }));

      setProgress(progressData);

      const continueCourse = courses.find(
        (c) => (c.progress?.progressPercentage || 0) < 100,
      );

      setContinueLearning(
        continueCourse
          ? {
              courseId: continueCourse,
              lastLesson: continueCourse.lastLesson,
            }
          : null,
      );
    } catch (err) {
      console.log(err);
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const completedLessons = progress.reduce(
    (s, p) => s + (p.completedLessons?.length || 0),
    0,
  );

  const avgProgress =
    progress.length > 0
      ? Math.round(
          progress.reduce((s, p) => s + p.progressPercentage, 0) /
            progress.length,
        )
      : 0;

  if (loading) {
    return <p className="p-6 text-gray-500">Loading dashboard...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-gray-500">
        Welcome back! Continue your learning journey.
      </p>

      {/* STATS */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { icon: BookOpen, label: "Enrolled Courses", value: enrolled.length },
          {
            icon: CheckCircle,
            label: "Completed Lessons",
            value: completedLessons,
          },
          { icon: TrendingUp, label: "Avg Progress", value: `${avgProgress}%` },
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

      {/* CONTINUE LEARNING */}
      {continueLearning && (
        <div className="card mt-6 bg-gradient-to-r from-primary-600 to-indigo-600 text-white">
          <h2 className="font-semibold">Continue Learning</h2>
          <p className="mt-1 text-primary-100">
            {continueLearning.courseId?.title}
          </p>

          <Link
            to={`/learn/${continueLearning.courseId?._id}`}
            className="mt-4 inline-flex items-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-primary-700"
          >
            <Play className="mr-2 h-4 w-4" />
            Resume
          </Link>
        </div>
      )}

      {/* MY COURSES */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">My Courses</h2>
          <Link
            to="/student/courses"
            className="text-sm text-primary-600 hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {enrolled.slice(0, 4).map((course) => (
            <div key={course._id} className="card">
              <h3 className="font-semibold line-clamp-1">{course.title}</h3>

              <div className="mt-3">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{course.progress?.progressPercentage || 0}%</span>
                </div>

                <div className="mt-1 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-2 rounded-full bg-primary-600"
                    style={{
                      width: `${course.progress?.progressPercentage || 0}%`,
                    }}
                  />
                </div>
              </div>

              <Link
                to={`/learn/${course._id}`}
                className="mt-3 inline-block text-sm font-medium text-primary-600 hover:underline"
              >
                Continue →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
