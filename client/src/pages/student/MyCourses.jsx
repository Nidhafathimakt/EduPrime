import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function MyCourses() {
  const axiosPrivate = useAxiosPrivate();

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEnrolledCourses = async () => {
    try {
      setLoading(true);

      const res = await axiosPrivate.get("/api/entroll/my-enrolled-courses");

      if (res.data.success) {
        setEnrolledCourses(res.data.data);
      } else {
        setEnrolledCourses([]);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to load enrolled courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  if (loading) {
    return <p className="text-center p-10">Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">My Courses</h1>

      <p className="text-gray-500">{enrolledCourses.length} enrolled courses</p>

      {enrolledCourses.length === 0 ? (
        <p className="text-center py-10 text-gray-500">
          No enrolled courses.{" "}
          <Link to="/courses" className="text-blue-600">
            Browse courses
          </Link>
        </p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {enrolledCourses.map((course) => (
            <div key={course._id} className="card p-4">
              <h3 className="font-semibold">{course.title}</h3>

              <div className="mt-3">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{course.progress?.progressPercentage || 0}%</span>
                </div>

                <div className="h-2 bg-gray-200 rounded-full mt-1">
                  <div
                    className="h-2 bg-primary-600 rounded-full"
                    style={{
                      width: `${course.progress?.progressPercentage || 0}%`,
                    }}
                  />
                </div>
              </div>

              <Link
                to={`/learn/${course._id}`}
                className="mt-3 inline-block text-sm text-primary-600"
              >
                Continue →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyCourses;
