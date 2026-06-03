import { Link, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Dashboard({ navItems, title }) {
  const { pathname } = useLocation();
  const { auth } = useAuth();
  return (
    <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8 sm:px-6">
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="card sticky top-24">
          <div className="mb-6 border-b border-gray-200 pb-4 dark:border-gray-700">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              {title}
            </p>
            <p className="mt-1 font-semibold">{auth?.name}</p>
            <p className="text-sm text-gray-500 capitalize">{auth?.role}</p>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  pathname === item.path || pathname.startsWith(item.path + "/")
                    ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                    : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
