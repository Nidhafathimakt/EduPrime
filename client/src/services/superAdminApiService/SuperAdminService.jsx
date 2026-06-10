import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const SuperAdminService = () => {
  const axiosPrivate = useAxiosPrivate();

  const createAdmin = async (data) => {
    const response = await axiosPrivate.post(
      "/api/super-admin/create-admin",
      data
    );

    return response.data;
  };

  return {
    createAdmin,
  };
};

export default SuperAdminService;