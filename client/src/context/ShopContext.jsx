import { useState } from "react";
import { createContext } from "react";
import SubscriptionService from "../services/adminApiService/SubscriptionService";
import AllUsersService from "../services/adminApiService/AllUsersService";
import CourseService from "../services/instructorApiService/CourseService";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const { getPlans } = SubscriptionService();
  const { getUser } = AllUsersService();
  const { updateCourse } = CourseService();
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );
  const [plans, setPlans] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState([]);

  const fetchPlans = async () => {
    try {
      const response = await getPlans();

      if (response.success) {
        setPlans(response.data);
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //GET User
  const fetchUser = async () => {
    const res = await getUser();
    setAllUsers(res.users);
  };

  return (
    <ShopContext.Provider
      value={{
        user,
        setUser,
        fetchPlans,
        plans,
        setPlans,
        allUsers,
        setAllUsers,
        fetchUser,
        courses,
        setCourses,
        enrolled,
        setEnrolled,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
