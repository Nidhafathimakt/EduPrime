import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import CourseService from "../services/instructorApiService/CourseService";

const categories = [
  "All",
  "Development",
  "Business",
  "Design",
  "Marketing",
  "IT & Software",
  "Photography",
  "Music",
];

function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getCourses } = CourseService();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const level = searchParams.get("level") || "";
  const sort = searchParams.get("sort") || "newest";

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (value) params.set(key, value);
    else params.delete(key);

    setSearchParams(params);
  };

  const fetchCourses = async () => {
    try {
      setLoading(true);

      const response = await getCourses();

      console.log("API RESPONSE:", response);

      if (!response?.success) {
        setCourses([]);
        setLoading(false);
        return;
      }

      let filtered = response.data || [];

      filtered = filtered.filter((course) =>
        course.status ? course.status === "approved" : true,
      );

      setCourses(filtered);
    } catch (error) {
      console.log("GET COURSES ERROR:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, [searchParams]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold">Explore Courses</h1>

      <p className="mt-1 text-gray-500">{courses.length} courses available</p>

      <div className="mt-8 flex flex-col gap-6 lg:flex-row">
        <aside className="lg:w-64 shrink-0">
          <div className="card space-y-6">
            {/* search */}
            {/* <input
              className="input-field"
              placeholder="Search..."
              defaultValue={search}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateParam("search", e.target.value);
                }
              }}
            /> */}

            {/* category */}
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() =>
                    updateParam("category", cat === "All" ? "" : cat)
                  }
                  className="block w-full text-left px-3 py-1.5"
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* level */}
            <select
              value={level}
              onChange={(e) => updateParam("level", e.target.value)}
              className="input-field"
            >
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            {/* sort */}
            <select
              value={sort}
              onChange={(e) => updateParam("sort", e.target.value)}
              className="input-field"
            >
              <option value="newest">Newest</option>
              <option value="popular">Popular</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </aside>

        {/* COURSES */}
        <div className="flex-1">
          {loading ? (
            <p className="py-12 text-center">Loading...</p>
          ) : courses.length === 0 ? (
            <p className="py-12 text-center text-gray-500">No courses found</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Courses;
