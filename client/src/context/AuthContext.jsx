import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (accessToken && user) {
      setAuth({
        accessToken,
        role: user.role,
        user,
      });
    }
  }, []);

  const logout = () => {
    setAuth({});

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
