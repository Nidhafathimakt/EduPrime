import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ProgressService = () => {
  const axiosPrivate = useAxiosPrivate();

  const getMyProgress = async () => {
    const res = await axiosPrivate.get("/api/progress/my-progress");
    return res.data;
  };

  const updateProgress = async (data) => {
    const res = await axiosPrivate.post("/api/progress/update", data);
    return res.data;
  };

  return { getMyProgress, updateProgress };
};

export default ProgressService;
