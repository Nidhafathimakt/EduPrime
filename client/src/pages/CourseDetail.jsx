import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Users, Clock, Play } from "lucide-react";
import { toast } from "react-toastify";
import CourseService from "../services/instructorApiService/CourseService";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function CourseDetail() {
  const { id } = useParams();
  const { getCourseById } = CourseService();
  const axiosPrivate = useAxiosPrivate();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);

  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  const getThumbnail = (thumb) => {
    if (!thumb) {
      return "https://via.placeholder.com/800x400?text=Course";
    }

    if (thumb.startsWith("http")) {
      return thumb;
    }

    return `http://localhost:5000/uploads/${thumb}`;
  };

 
  //  FETCH DATA
  const fetchData = async () => {
    try {
      

      // GET COURSE
      const res = await getCourseById(id);

      if (!res.success) {
        toast.error("Course not found");
        return;
      }

      setCourse(res.data);

      // GET LESSONS
      const lessonRes = await axiosPrivate.get(`/api/lesson/course/${id}`);

      const lessonData = lessonRes.data;

      if (lessonData.success) {
        setLessons(lessonData.data);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to load course");
    } 
  };

  //  ENROLL
  const handleEnroll = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

if (user?.role !== "student") {
  toast.error("Only students can enroll in courses");
  return;
}
    try {
       

      setEnrolling(true);

      const res = await axiosPrivate.post(`/api/entroll/enroll/${id}`);

      if (res.data.success) {
        toast.success("Enrolled successfully");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Enrollment failed");
    } finally {
      setEnrolling(false);
    }
  };


 
  

  // NO COURSE STATE
  if (!course) {
    return <p className="p-10 text-center">Course not found</p>;
  }

  // TOTAL DURATION
  const totalDuration = lessons.reduce((sum, l) => sum + (l.duration || 0), 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* LEFT */}
        <div className="lg:col-span-2">
          {/* THUMBNAIL */}
          <img
            src={getThumbnail(course.thumbnail)}
            alt={course.title}
            className="aspect-video w-full rounded-xl object-cover"
          />

          <h1 className="mt-6 text-3xl font-bold">{course.title}</h1>

          <p className="mt-2 text-gray-600">{course.description}</p>

          {/* INFO */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 text-amber-400" />
              {course.rating || 0}
            </span>

            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {course.enrolledStudents?.length || 0} students
            </span>

            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {totalDuration} min
            </span>

            <span className="capitalize">{course.level}</span>
          </div>

          {/* LESSONS */}
          <div className="mt-8">
            <h2 className="text-xl font-bold">Curriculum</h2>

            <p className="text-sm text-gray-500">{lessons.length} lessons</p>

            <div className="mt-4 space-y-2">
              {lessons.length === 0 ? (
                <p className="text-gray-500">No lessons found</p>
              ) : (
                lessons.map((lesson, i) => (
                  <div
                    key={lesson._id}
                    className="flex justify-between rounded-lg border p-4"
                  >
                    <div>
                      <p className="font-medium">
                        {i + 1}. {lesson.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {lesson.duration} min
                      </p>
                    </div>

                    {lesson.isPreview && (
                      <span className="text-xs text-green-600">Preview</span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <div className="card sticky top-24">
            <button
              onClick={handleEnroll}
              disabled={enrolling}
              className="btn-primary w-full"
            >
              <Play className="mr-2 h-4 w-4" />
              {enrolling ? "Enrolling..." : "Enroll Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
