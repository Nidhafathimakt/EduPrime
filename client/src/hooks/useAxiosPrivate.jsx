import { useEffect } from "react";

import useAuth from "./useAuth";
import { axiosPrivate } from "../Axios";

const useAxiosPrivate = () => {
  const { auth, setAuth } = useAuth();
  const accessToken = localStorage.getItem("token");
  // console.log(accessToken,"====accessToken");

  useEffect(() => {
    axiosPrivate.interceptors.request.use(
      (config) => {
        if (config.data instanceof FormData) {
          config.headers["Content-Type"] = "multipart/form-data";
        } else {
          config.headers["Content-Type"] = "application/json";
        }

        if (!config.headers["Authorization"]) {
          // config.headers['Authorization'] = auth?.accessToken;
          config.headers["Authorization"] = accessToken;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    axiosPrivate.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        return Promise.reject(error);
      },
    );
  }, [auth]);

  return axiosPrivate;
};

export default useAxiosPrivate;
