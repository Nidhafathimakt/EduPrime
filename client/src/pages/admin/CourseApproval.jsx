import React, { useContext, useEffect } from "react";
import { ShopContext } from "../../context/ShopContext";
import CourseService from "../../services/instructorApiService/CourseService";
import { toast } from "react-toastify";

function CourseApproval() {
  const { getCourses, approveCourse, rejectCourse } = CourseService();
  const { courses, setCourses } = useContext(ShopContext);

  useEffect(() => {
    fetchCourses();
  }, []);

  //  Fetch only pending courses
  const fetchCourses = async () => {
    try {
      const res = await getCourses();

      if (res.success) {
        const pendingCourses = res.data.filter(
          (course) => course.status === "pending",
        );

        setCourses(pendingCourses);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to load courses");
    }
  };

  //  Approve course
  const handleApproval = async (id) => {
    try {
      await approveCourse(id);
      toast.success("Course approved");

      // remove from list (because it's no longer pending)
      setCourses((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.log(err);
      toast.error("Approval failed");
    }
  };

  //  Reject course
  const handleReject = async (id) => {
    try {
      await rejectCourse(id);
      toast.success("Course rejected");

      // remove from list
      setCourses((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.log(err);
      toast.error("Rejection failed");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Course Approval</h1>

      <p className="text-gray-500">{courses.length} courses pending review</p>

      <div className="mt-6 space-y-4">
        {courses.map((course) => (
          <div key={course._id} className="card">
            <div className="flex flex-wrap items-start justify-between gap-4">
              {/* Course Info */}
              <div>
                <h3 className="font-semibold">{course.title}</h3>
                <p className="text-sm text-gray-500">
                  by {course.instructor?.name} · {course.category}
                </p>
                <p className="mt-2 line-clamp-2 text-sm">
                  {course.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleApproval(course._id)}
                  className="btn-primary text-sm"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(course._id)}
                  className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}

        {courses.length === 0 && (
          <p className="py-12 text-center text-gray-500">No pending courses.</p>
        )}
      </div>
    </div>
  );
}

export default CourseApproval;
