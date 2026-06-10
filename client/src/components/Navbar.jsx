import { Link } from "react-router-dom";
import { GraduationCap, Search, Bell, Menu, X } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const dashboardPath = {
    student: "/student/dashboard",
    instructor: "/instructor/dashboard",
    admin: "/admin/dashboard",
    superadmin: "/superadmin/dashboard",
  };
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur ">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-primary-600" />

          <span className="text-xl font-bold text-gray-900 ">
            Edu<span className="text-primary-600">Prime</span>
          </span>
        </Link>

        <div className="hidden flex-1 items-center gap-6 px-8 md:flex">
          <Link
            to="/courses"
            className="text-sm font-medium hover:text-primary-600"
          >
            Courses
          </Link>
          <Link
            to="/pricing"
            className="text-sm font-medium hover:text-primary-600"
          >
            Pricing
          </Link>
          <form className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              name="search"
              placeholder="Search courses..."
              className="input-field pl-10 py-2"
            />
          </form>
        </div>

        <div className="flex items-center gap-2">
          {auth?.accessToken ? (
            <>
              <Link
                to="/notifications"
                className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Bell className="h-5 w-5" />
              </Link>
              <Link
                to={dashboardPath[auth.role] || "/student/dashboard"}
                className="hidden rounded-lg bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-100 dark:bg-primary-900/30 dark:text-primary-300 sm:block"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="btn-secondary hidden sm:inline-flex"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary hidden sm:inline-flex">
                Log in
              </Link>
              <Link
                to="/register"
                className="btn-primary hidden sm:inline-flex"
              >
                Sign up
              </Link>
            </>
          )}
          <button
            className="rounded-lg p-2 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-gray-200 px-4 py-4 md:hidden dark:border-gray-800">
          <div className="flex flex-col gap-3">
            <Link to="/courses" onClick={() => setMenuOpen(false)}>
              Courses
            </Link>
            <Link to="/pricing" onClick={() => setMenuOpen(false)}>
              Pricing
            </Link>
            {auth?.accessToken ? (
              <>
                <Link
                  to={dashboardPath[auth.role]}
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  Log in
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)}>
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
