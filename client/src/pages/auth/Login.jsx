import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopContext } from "../../context/ShopContext";
import { AuthContext } from "../../context/AuthContext";
import AuthService from "../../services/authApiService/AuthService";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(ShopContext);
  const { auth, setAuth, logout } = useContext(AuthContext);
  const { postLogin } = AuthService();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postLogin(form);
      console.log(response.user);
      console.log("Role:", response.user.role);

      if (response?.success) {
        const accessToken = response?.token;
        const user = response?.user;

        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        setUser(user);

        setAuth({
          accessToken,
          role: user.role,
          user,
        });

        toast.success("Login Successful");
        console.log("Role:", user.role);
        const paths = {
          student: "/student/dashboard",
          instructor: "/instructor/dashboard",
          admin: "/admin/dashboard",
          superadmin: "/superadmin/dashboard",
        };
        navigate(paths[user.role] || "/");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    }
  };
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="card">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="mt-1 text-sm text-gray-500">
            Sign in to continue learning
          </p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <input
                type="email"
                required
                className="input-field"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Password</label>
              <input
                type="password"
                required
                className="input-field"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-primary-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
