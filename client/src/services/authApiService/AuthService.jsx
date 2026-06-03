import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AuthService = () => {
  const axiosPrivate = useAxiosPrivate();

  const postRegister = async (data) => {
    const response = await axiosPrivate.post("/api/user/register", data);
    return response.data;
  };

  const postLogin = async (data) => {
    const response = await axiosPrivate.post("/api/user/login", data);
    return response.data;
  };

  return {
    postRegister,
    postLogin,
  };
};
export default AuthService;
