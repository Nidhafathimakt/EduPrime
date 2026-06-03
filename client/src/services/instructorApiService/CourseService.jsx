import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const CourseService = () => {
  const axiosPrivate = useAxiosPrivate();

  const createCourse = async (courseData) => {
    const response = await axiosPrivate.post("/api/course", courseData);
    return response.data;
  };

  const getCourses = async () => {
    const response = await axiosPrivate.get("/api/course");
    return response.data;
  };

  const getCourseById = async (id) => {
    const response = await axiosPrivate.get(`/api/course/${id}`);
    return response.data;
  };

  const getMyCourses = async () => {
    const response = await axiosPrivate.get("/api/course/my-courses");
    return response.data;
  };

  const updateCourse = async (courseId, data) => {
    const response = await axiosPrivate.put(`/api/course/${courseId}`, data);
    return response.data;
  };

  const deleteCourse = async (courseId) => {
    const response = await axiosPrivate.delete(`/api/course/${courseId}`);
    return response.data;
  };

  const approveCourse = async (courseId) => {
    const response = await axiosPrivate.put(`/api/course/${courseId}/approve`);
    return response.data;
  };

  const rejectCourse = async (courseId) => {
    const response = await axiosPrivate.put(`/api/course/${courseId}/reject`);
    return response.data;
  };
  const getInstructorCourses = async () => {
    const response = await axiosPrivate.get(
      "/api/course/instructor/my-courses",
    );

    return response.data;
  };
  return {
    createCourse,
    getCourses,
    getCourseById,
    getMyCourses,
    updateCourse,
    deleteCourse,
    approveCourse,
    rejectCourse,
    getInstructorCourses,
  };
};

export default CourseService;
