import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Check, IndianRupee } from "lucide-react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { toast } from "react-toastify";

function Pricing() {
  
  const [subscribing, setSubscribing] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const { fetchPlans, plans } = useContext(ShopContext);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const response = await fetchPlans();
        console.log("Plans API:", response);
      } catch (error) {
        console.log(error)
      }
    };

    loadPlans();
  }, []);

  const handleSubscribe = async (planId) => {
  
    try {
      setSubscribing(planId);

      const res = await axiosPrivate.post(
        `/api/subscription/subscribe/${planId}`,
      );

      if (res.data.success) {
        toast.success("Subscribed successfully");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    }
  };
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Choose Your Plan</h1>
        <p className="mt-2 text-gray-500">
          Unlimited access to all courses. Cancel anytime.
        </p>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {plans.map((plan, i) => (
          <div
            key={plan._id}
            className={`card relative ${
              i === 1 ? "ring-2 ring-primary-500 shadow-lg scale-105" : ""
            }`}
          >
            {i === 1 && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary-600 px-3 py-0.5 text-xs font-medium text-white">
                Most Popular
              </span>
            )}
            <h3 className="text-xl font-bold">{plan.name}</h3>
            <p className="mt-2">
              <span className="text-4xl font-extrabold flex"><IndianRupee className="mt-2.5" />{plan.price}</span>
            </p>
            <ul className="mt-6 space-y-3">
              {plan.features?.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSubscribe(plan._id)}
              disabled={subscribing === plan._id}
              className={`mt-8 w-full rounded-lg py-3 text-sm font-semibold ${
                i === 1 ? "btn-primary" : "btn-secondary"
              }`}
            >
              {subscribing === plan._id ? "Processing..." : "Get Started"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pricing;
