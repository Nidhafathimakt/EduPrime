import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const SubscriptionService = () => {
  const axiosPrivate = useAxiosPrivate();

  const createPlan = async (data) => {
    const response = await axiosPrivate.post("/api/subscription", data);
    return response.data;
  };

  const getPlans = async () => {
    const response = await axiosPrivate.get("/api/subscription");
    return response.data;
  };

  return {
    createPlan,
    getPlans,
  };
};

export default SubscriptionService;
