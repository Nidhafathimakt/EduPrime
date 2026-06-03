import { Link } from "react-router-dom";
import { Star, Clock, Users } from "lucide-react";

const CourseCard = ({ course }) => {
  const instructor = course.instructor?.name || "Instructor";

  const rating = Number(course.rating || 0).toFixed(1);
  const students = course.enrolledStudents?.length || 0;

  const getThumbnail = () => {
    if (!course.thumbnail) {
      return "https://via.placeholder.com/300x200?text=No+Image";
    }

    if (course.thumbnail.startsWith("http")) {
      return course.thumbnail;
    }

    return `http://localhost:5000/uploads/${course.thumbnail}`;
  };
  return (
    <Link
      to={`/courses/${course._id}`}
      className="group overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-lg"
    >
      {/* IMAGE */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={getThumbnail()}
          alt={course.title}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />

        <span className="absolute left-3 top-3 rounded-full bg-primary-600 px-2 py-1 text-xs text-white">
          {course.category || "General"}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="line-clamp-2 font-semibold">{course.title}</h3>

        <p className="text-sm text-gray-500">{instructor}</p>

        <div className="mt-2 flex items-center gap-3 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 text-amber-400" />
            {rating}
          </span>

          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {students}
          </span>

          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {Math.round((course.totalDuration || 0) / 60)}h
          </span>
        </div>

        <p className="mt-2 text-xs capitalize text-gray-500">
          {course.level || "beginner"}
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;
