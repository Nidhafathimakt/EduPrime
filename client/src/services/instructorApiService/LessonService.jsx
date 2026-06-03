import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const LessonService = () => {
  const axiosPrivate = useAxiosPrivate();

  const createLesson = async (data) => {
    const res = await axiosPrivate.post("/api/lesson", data);
    return res.data;
  };

  const getLessonsByCourse = async (courseId) => {
    const res = await axiosPrivate.get(`/api/lesson/course/${courseId}`);
    return res.data;
  };

  const updateLesson = async (id, data) => {
    const res = await axiosPrivate.put(`/api/lesson/${id}`, data);
    return res.data;
  };

  const deleteLesson = async (id) => {
    const res = await axiosPrivate.delete(`/api/lesson/${id}`);
    return res.data;
  };

  return {
    createLesson,
    getLessonsByCourse,
    updateLesson,
    deleteLesson,
  };
};

export default LessonService;
