import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Courses from "./pages/Courses";
import Pricing from "./pages/Pricing";
import CourseDetail from "./pages/CourseDetail";
import Notifications from "./pages/Notifications";
import VideoPlayer from "./pages/VideoPlayer";
import ProtectedRoute from "./components/ProtectedRoute";
import { ShopProvider } from "./context/ShopContext";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/Dashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import MyCourses from "./pages/student/MyCourses";
import ProgressTrack from "./pages/student/ProgressTrack";
import ProfileSettings from "./pages/student/ProfileSettings";
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import InstructorCourses from "./pages/instructor/InstructorCourses";
import CourseForm from "./pages/instructor/CourseForm";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import CourseApproval from "./pages/admin/CourseApproval";
import SubscriptionManagement from "./pages/admin/SubscriptionManagement";

import {
  LayoutDashboard,
  BookOpen,
  TrendingUp,
  User,
  PlusCircle,
  Users,
  CheckSquare,
  CreditCard,
  UserPlus,
} from "lucide-react";

import SuperAdminDashboard from "./pages/superAdmin/SuperAdminDashboard";
import AdminList from "./pages/superAdmin/AdminList";
import CreateAdmin from "./pages/superAdmin/CreateAdmin";

const studentNav = [
  { path: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/student/courses", label: "My Courses", icon: BookOpen },
  { path: "/student/progress", label: "Progress", icon: TrendingUp },
  { path: "/student/profile", label: "Profile", icon: User },
];

const instructorNav = [
  { path: "/instructor/dashboard", label: "Overview", icon: LayoutDashboard },
  { path: "/instructor/courses", label: "My Courses", icon: BookOpen },
  { path: "/instructor/courses/new", label: "Create Course", icon: PlusCircle },
];

const adminNav = [
  { path: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { path: "/admin/users", label: "Users", icon: Users },
  { path: "/admin/approval", label: "Course Approval", icon: CheckSquare },
  { path: "/admin/subscriptions", label: "Subscriptions", icon: CreditCard },
];

const superAdminNav = [
  {
    path: "/superadmin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    path: "/superadmin/create-admin",
    label: "Create Admin",
    icon: UserPlus,
  },
  {
    path: "/superadmin/admins",
    label: "Manage Admins",
    icon: Users,
  },
];
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ShopProvider>
          <Routes>
            <Route
              path="/learn/:courseId"
              element={
                <ProtectedRoute roles={["student", "instructor", "superadmin"]}>
                  <VideoPlayer />
                </ProtectedRoute>
              }
            />

            <Route element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="courses" element={<Courses />} />
              <Route path="courses/:id" element={<CourseDetail />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route
                path="notifications"
                element={
                  <ProtectedRoute>
                    <Notifications />
                  </ProtectedRoute>
                }
              />

              <Route
                path="student"
                element={
                  <ProtectedRoute roles={["student"]}>
                    <Dashboard navItems={studentNav} title="Student" />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="courses" element={<MyCourses />} />
                <Route path="progress" element={<ProgressTrack />} />
                <Route path="profile" element={<ProfileSettings />} />
              </Route>

              <Route
                path="instructor"
                element={
                  <ProtectedRoute roles={["instructor", "superadmin"]}>
                    <Dashboard navItems={instructorNav} title="Instructor" />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<InstructorDashboard />} />
                <Route path="courses" element={<InstructorCourses />} />
                <Route path="courses/new" element={<CourseForm />} />
                <Route path="courses/:id/edit" element={<CourseForm />} />
              </Route>

              <Route
                path="admin"
                element={
                  <ProtectedRoute roles={["superadmin"]}>
                    <Dashboard navItems={adminNav} title="Admin" />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="approval" element={<CourseApproval />} />
                <Route
                  path="subscriptions"
                  element={<SubscriptionManagement />}
                />
              </Route>

              <Route
                path="superadmin"
                element={
                  <ProtectedRoute roles={["superadmin"]}>
                    <Dashboard navItems={superAdminNav} title="Super Admin" />
                  </ProtectedRoute>
                }
              >
                <Route index element={<SuperAdminDashboard />} />
                <Route path="dashboard" element={<SuperAdminDashboard />} />
                <Route path="create-admin" element={<CreateAdmin />} />
                <Route path="admins" element={<AdminList />} />
              </Route>
            </Route>
          </Routes>
          <ToastContainer position="top-center" closeOnClick />
        </ShopProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
