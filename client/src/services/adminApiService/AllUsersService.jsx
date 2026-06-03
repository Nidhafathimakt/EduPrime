import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AllUsersService = () => {
  const axiosPrivate = useAxiosPrivate();

  const getUser = async () => {
    const response = await axiosPrivate.get("/api/admin");
    return response.data;
  };

  const updateUser = async (UserId, user) => {
    const response = await axiosPrivate.put(`/api/admin/${UserId}`, user);
    return response.data;
  };

  const deleteUser = async (UserId) => {
    const response = await axiosPrivate.delete(`/api/admin/${UserId}`);
    return response.data;
  };

  const getStatistics = async () => {
    const response = await axiosPrivate.get("/api/admin/stats");
    return response.data;
  };

  return {
    getUser,
    updateUser,
    deleteUser,
    getStatistics,
  };
};

export default AllUsersService;
