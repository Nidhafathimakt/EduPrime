import React, { useContext, useEffect, useState } from "react";
import SubscriptionService from "../../services/adminApiService/SubscriptionService";
import { toast } from "react-toastify";
import { ShopContext } from "../../context/ShopContext";
function SubscriptionManagement() {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    slug: "monthly",
    price: 0,
    duration: 1,
    features: "",
  });

  const { createPlan, getPlans } = SubscriptionService();
  const { fetchPlans, plans } = useContext(ShopContext);

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        duration: Number(form.duration),
        features: form.features.split(",").map((item) => item.trim()),
      };

      const response = await createPlan(payload);

      if (response.success) {
        toast.success("Plan created successfully");

        setForm({
          name: "",
          slug: "",
          price: "",
          duration: "",
          durationUnit: "months",
          features: "",
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create plan");
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-bold">Subscription Plans</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan._id} className="card">
            <h3 className="font-semibold">{plan.name}</h3>
            <p className="text-2xl font-bold mt-1">${plan.price}</p>
            <p className="text-sm text-gray-500 capitalize">{plan.slug}</p>
            <ul className="mt-3 space-y-1 text-sm">
              {plan.features?.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <form onSubmit={handleCreate} className="card mt-8 max-w-md space-y-4">
        <h2 className="font-semibold">Create New Plan</h2>
        <input
          required
          placeholder="Plan name"
          className="input-field"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <select
          className="input-field"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        >
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>
        <input
          type="number"
          required
          placeholder="Price"
          className="input-field"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
        />
        <textarea
          placeholder="Features (one per line)"
          className="input-field"
          rows={4}
          value={form.features}
          onChange={(e) => setForm({ ...form, features: e.target.value })}
        />
        <button type="submit" className="btn-primary">
          Create Plan
        </button>
      </form>
    </div>
  );
}

export default SubscriptionManagement;
