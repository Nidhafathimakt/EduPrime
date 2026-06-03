import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IoIosAdd } from "react-icons/io";
import { useContext } from "react";

import CourseService from "../../services/instructorApiService/CourseService";
import LessonService from "../../services/instructorApiService/LessonService";

const categories = [
  "Development",
  "Business",
  "Design",
  "Marketing",
  "IT & Software",
  "Personal Development",
  "Photography",
  "Music",
];

function CourseForm() {
  const { createCourse, updateCourse, getCourseById } = CourseService();
  const { createLesson, getLessonsByCourse, deleteLesson } = LessonService();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(isEdit);
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [newLesson, setNewLesson] = useState({
    title: "",
    videoUrl: "",
    duration: 10,
    order: lessons.length + 1,
    isPreview: false,
  });

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Development",
    level: "beginner",
    thumbnail: "",
    price: 0,
  });

  useEffect(() => {
    if (isEdit) {
      fetchCourse();
      fetchLessons();
    }
  }, [id]);

  // const fetchCourse = async () => {
  //   try {
  //     const res = await getCourseById(id);

  //     if (res.success) {
  //       setForm({
  //         title: res.data.title || '',
  //         description: res.data.description || '',
  //         category: res.data.category || 'Development',
  //         level: res.data.level || 'beginner',
  //         thumbnail: res.data.thumbnail || '',
  //         price: res.data.price || 0,
  //       });
  //     }
  //   } catch (error) {
  //     toast.error('Failed to load course');
  //   }
  // };

  const fetchCourse = async () => {
    try {
      const res = await getCourseById(id);

      if (res.success) {
        setForm({
          title: res.data.title || "",
          description: res.data.description || "",
          category: res.data.category || "Development",
          level: res.data.level || "beginner",
          thumbnail: res.data.thumbnail || "",
          price: res.data.price || 0,
        });
      }
    } catch (error) {
      toast.error("Failed to load course");
    }
  };

  const fetchLessons = async () => {
    try {
      const res = await getLessonsByCourse(id);
      if (res.success) setLessons(res.data);
    } catch {
      toast.error("Failed to load lessons");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     let response;

  //     if (isEdit) {
  //       response = await updateCourse(id, form);
  //       toast.success("Course updated successfully");
  //     } else {
  //       response = await createCourse(form);
  //       toast.success("Course created successfully");
  //     }

  //     navigate("/instructor/courses");
  //   } catch (error) {
  //     toast.error(
  //       error.response?.data?.message ||
  //       "Something went wrong"
  //     );
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", form.title);
    data.append("description", form.description);
    data.append("category", form.category);
    data.append("level", form.level);
    data.append("price", form.price);

    if (thumbnail) {
      data.append("thumbnail", thumbnail);
    }

    try {
      if (isEdit) {
        await updateCourse(id, data);
        toast.success("Course updated");
      } else {
        await createCourse(data);
        toast.success("Course created");
      }

      navigate("/instructor/courses");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };
  // const handleAddLesson = async (e) => {

  //     e.preventDefault();

  //     try {
  //       await createLesson({
  //         ...newLesson,
  //         courseId: id,

  //       });

  //       toast.success("Lesson added");

  //       setNewLesson({
  //         title: "",
  //         videoUrl: "",
  //         duration: 10,
  //         isPreview: false,
  //       });

  //       fetchLessons();
  //     } catch {
  //       toast.error("Failed to add lesson");
  //     }
  //   };

  // ✅ DELETE LESSON

  const handleAddLesson = async (e) => {
    e.preventDefault();

    try {
      await createLesson({
        ...newLesson,
        order: lessons.length + 1,
        courseId: id,
      });

      toast.success("Lesson added");

      setNewLesson({
        title: "",
        videoUrl: "",
        duration: 10,
        isPreview: false,
      });

      fetchLessons();
    } catch {
      toast.error("Failed to add lesson");
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    try {
      await deleteLesson(lessonId);
      toast.success("Lesson deleted");
      fetchLessons();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold">
        {isEdit ? "Edit Course" : "Create Course"}
      </h1>
      <form onSubmit={handleSubmit} className="card mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Title</label>
          <input
            required
            className="input-field"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Description</label>
          <textarea
            required
            rows={4}
            className="input-field"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Category</label>
            <select
              className="input-field"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Level</label>
            <select
              className="input-field"
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="all-levels">All Levels</option>
            </select>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">
            Thumbnail Image
          </label>

          <div className="relative w-40 h-40">
            <img
              src={
                preview
                  ? preview
                  : form.thumbnail
                    ? `http://localhost:5000/uploads/${form.thumbnail}`
                    : ""
              }
              className="w-full h-full object-cover rounded"
            />

            <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow cursor-pointer">
              <IoIosAdd />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setThumbnail(file);
                  setPreview(URL.createObjectURL(file));
                }}
              />
            </label>
          </div>
        </div>
        <button type="submit" className="btn-primary">
          {isEdit ? "Update Course" : "Create Course"}
        </button>
      </form>

      {isEdit && (
        <div className="card mt-6">
          <h2 className="font-semibold">Lessons ({lessons.length})</h2>
          <div className="mt-4 space-y-2">
            {lessons.map((l, i) => (
              <div
                key={l._id}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700"
              >
                <span>
                  {i + 1}. {l.title} ({l.duration} min)
                </span>
                <button
                  onClick={() => handleDeleteLesson(l._id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <form
            onSubmit={handleAddLesson}
            className="mt-4 space-y-3 border-t pt-4 dark:border-gray-700"
          >
            <h3 className="text-sm font-medium">Add Lesson</h3>
            <input
              required
              placeholder="Lesson title"
              className="input-field"
              value={newLesson.title}
              onChange={(e) =>
                setNewLesson({ ...newLesson, title: e.target.value })
              }
            />
            <input
              required
              placeholder="Video URL (YouTube embed)"
              className="input-field"
              value={newLesson.videoUrl}
              onChange={(e) =>
                setNewLesson({ ...newLesson, videoUrl: e.target.value })
              }
            />
            <input
              type="number"
              className="input-field"
              value={newLesson.duration}
              onChange={(e) =>
                setNewLesson({ ...newLesson, duration: Number(e.target.value) })
              }
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={newLesson.isPreview}
                onChange={(e) =>
                  setNewLesson({ ...newLesson, isPreview: e.target.checked })
                }
              />
              Free preview lesson
            </label>
            <button type="submit" className="btn-secondary">
              Add Lesson
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CourseForm;
