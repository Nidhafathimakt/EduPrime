import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import ProgressService from "../services/instructorApiService/ProgressService";

function VideoPlayer() {
  const { courseId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const { updateProgress } = ProgressService();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [progress, setProgress] = useState(null);
  

  const currentIndex = lessons.findIndex((l) => l._id === currentLesson?._id);

  // GET DATA
  const fetchData = async () => {
    try {
      

      const courseRes = await axiosPrivate.get(`/api/course/${courseId}`);

      const lessonRes = await axiosPrivate.get(
        `/api/lesson/course/${courseId}`,
      );

      const progressRes = await axiosPrivate.get(`/api/progress/my-progress`);

      setCourse(courseRes.data.data);
      setLessons(lessonRes.data.data || []);

      const myProgress = progressRes.data.data.find(
        (p) => p.courseId._id === courseId,
      );

      setProgress(myProgress || null);

      setCurrentLesson(lessonRes.data.data?.[0] || null);
    } catch (err) {
      console.log(err);
    } 
  };

  useEffect(() => {
    fetchData();
  }, [courseId]);

  // MARK COMPLETE
  const markComplete = async () => {
    try {
      if (!currentLesson?._id) return;

      const res = await updateProgress({
        courseId,
        lessonId: currentLesson._id,
      });

      setProgress(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const isCompleted = progress?.completedLessons?.includes(currentLesson?._id);

  const getEmbedUrl = (url) => {
    if (!url) return "";

    try {
      const videoId = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } catch (err) {
      return "";
    }
  };

 
  return (
    <div className="flex min-h-screen flex-col bg-gray-950 lg:flex-row">
      {/* MAIN */}
      <div className="flex-1">
        <div className="border-b border-gray-800 px-4 py-3">
          <Link
            to="/student/courses"
            className="text-sm text-gray-400 hover:text-white"
          >
            ← Back to courses
          </Link>

          <h1 className="mt-1 text-lg font-semibold text-white">
            {course?.title}
          </h1>

          <div className="mt-2 flex items-center gap-2">
            <div className="h-1.5 flex-1 rounded-full bg-gray-700">
              <div
                className="h-1.5 rounded-full bg-primary-500"
                style={{
                  width: `${progress?.progressPercentage || 0}%`,
                }}
              />
            </div>

            <span className="text-xs text-gray-400">
              {progress?.progressPercentage || 0}%
            </span>
          </div>
        </div>

        {/* VIDEO */}
        <div className="aspect-video bg-black">
          {currentLesson?.videoUrl ? (
            <iframe
              src={getEmbedUrl(currentLesson.videoUrl)}
              title={currentLesson.title}
              className="h-full w-full"
              allowFullScreen
            />
          ) : (
            <p className="text-white p-10">No video available</p>
          )}
        </div>

        {/* CONTROLS */}
        <div className="p-4 text-white">
          <h2 className="text-xl font-bold">{currentLesson?.title}</h2>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={markComplete}
              disabled={isCompleted}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                isCompleted
                  ? "bg-green-600/20 text-green-400"
                  : "bg-primary-600 hover:bg-primary-700"
              }`}
            >
              <CheckCircle className="mr-2 inline h-4 w-4" />
              {isCompleted ? "Completed" : "Mark as Complete"}
            </button>

            {currentIndex > 0 && (
              <button
                onClick={() => setCurrentLesson(lessons[currentIndex - 1])}
                className="rounded-lg border border-gray-600 px-4 py-2 text-sm hover:bg-gray-800"
              >
                <ChevronLeft className="inline h-4 w-4" /> Prev
              </button>
            )}

            {currentIndex < lessons.length - 1 && (
              <button
                onClick={() => setCurrentLesson(lessons[currentIndex + 1])}
                className="rounded-lg border border-gray-600 px-4 py-2 text-sm hover:bg-gray-800"
              >
                Next <ChevronRight className="inline h-4 w-4" />
              </button>
            )}
          </div>

          {progress?.certificateIssued && (
            <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-amber-200">
              🎉 Certificate Earned!
            </div>
          )}
        </div>
      </div>

      {/* SIDEBAR */}
      <aside className="w-full border-t border-gray-800 lg:w-80 lg:border-l lg:border-t-0">
        <div className="p-4">
          <h3 className="font-semibold text-white">Course Content</h3>
          <p className="text-sm text-gray-400">{lessons.length} lessons</p>
        </div>

        <div className="overflow-y-auto lg:max-h-[calc(100vh-80px)]">
          {lessons.map((lesson, i) => {
            const done = progress?.completedLessons?.some(
              (id) => id === lesson._id,
            );

            return (
              <button
                key={lesson._id}
                onClick={() => setCurrentLesson(lesson)}
                className={`flex w-full gap-3 border-b border-gray-800 px-4 py-3 text-left hover:bg-gray-900 ${
                  currentLesson?._id === lesson._id ? "bg-gray-900" : ""
                }`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                    done
                      ? "bg-green-600 text-white"
                      : "bg-gray-700 text-gray-300"
                  }`}
                >
                  {done ? "✓" : i + 1}
                </span>

                <div>
                  <p className="text-sm text-gray-200">{lesson.title}</p>
                  <p className="text-xs text-gray-500">{lesson.duration} min</p>
                </div>
              </button>
            );
          })}
        </div>
      </aside>
    </div>
  );
}

export default VideoPlayer;
