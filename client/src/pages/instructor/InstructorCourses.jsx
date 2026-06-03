import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CourseService from "../../services/instructorApiService/CourseService";
import { toast } from "react-toastify";
import { ShopContext } from "../../context/ShopContext";
function InstructorCourses() {
  const { getInstructorCourses, deleteCourse } = CourseService();
  const { courses, setCourses } = useContext(ShopContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await getInstructorCourses();

      if (response.success) {
        setCourses(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this course?")) return;
    try {
      await deleteCourse(id);
      setCourses((prev) => prev.filter((course) => course._id !== id));

      toast.success("Course deleted");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Courses</h1>
        <Link to="/instructor/courses/new" className="btn-primary">
          Create Course
        </Link>
      </div>
      <div className="mt-6 space-y-4">
        {courses.map((course) => (
          <div
            key={course._id}
            className="card flex flex-wrap items-center justify-between gap-4"
          >
            <div>
              <h3 className="font-semibold">{course.title}</h3>
              <p className="text-sm text-gray-500">
                {course.category} · {course.enrolledStudents?.length || 0}{" "}
                students · <span className="capitalize">{course.status}</span>
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  navigate(`/instructor/courses/${course._id}/edit`)
                }
                className="rounded-lg border px-4 py-2 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(course._id)}
                className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InstructorCourses;
