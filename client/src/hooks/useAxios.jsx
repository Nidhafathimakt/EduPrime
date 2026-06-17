import React, { useEffect } from "react";
import useAuth from "./useAuth";
import axios from "../Axios";

const useAxios = () => {
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }, [auth]);
  return axios;
};

export default useAxios;
