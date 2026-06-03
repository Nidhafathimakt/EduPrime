import { ArrowRight, Play, Award, Users, BookOpen } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import CourseCard from "../components/CourseCard";
import { ShopContext } from "../context/ShopContext";
import CourseService from "../services/instructorApiService/CourseService";

const categories = [
  "Development",
  "Design",
  "Marketing",
  "Business",
  "IT & Software",
  "Personal Development",
];

const testimonials = [
  {
    name: "Emily Watson",
    role: "Software Engineer",
    text: "SkillSphere transformed my career. The web development bootcamp was incredibly comprehensive.",
    avatar: "https://i.pravatar.cc/80?u=emily",
  },
  {
    name: "James Park",
    role: "UX Designer",
    text: "Best learning platform I have used. The instructors are world-class and the content is always up to date.",
    avatar: "https://i.pravatar.cc/80?u=james",
  },
  {
    name: "Lisa Martinez",
    role: "Marketing Manager",
    text: "The subscription model is perfect. I learn something new every week without breaking the bank.",
    avatar: "https://i.pravatar.cc/80?u=lisa",
  },
];
function Home() {
  const [featured, setFeatured] = useState([]);

  const [loading, setLoading] = useState(true);
  const { fetchPlans, plans } = useContext(ShopContext);
  const { getCourses } = CourseService();
  useEffect(() => {
    const loadPlans = async () => {
      try {
        const res = await getCourses();
        // const response = await fetchPlans();
        //     console.log("Plans API:", response);
        if (res?.success) {
          setFeatured(res.data.slice(0, 4));
        }

        await fetchPlans();
      } catch (err) {
        console.log(err);
      }
    };

    loadPlans();
  }, []);

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-indigo-900 text-white">
        <div className="absolute inset-0  opacity-50" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
          <div className="max-w-2xl">
            <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
              🚀 Start learning today
            </span>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Learn Without Limits on{" "}
              <span className="text-primary-300">EduPrime</span>
            </h1>
            <p className="mt-6 text-lg text-primary-100">
              Access thousands of courses from expert instructors. Subscribe
              once, learn everything. Track your progress and earn certificates.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/courses"
                className="btn-primary bg-white text-primary-700 hover:bg-primary-50"
              >
                Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold hover:bg-white/10"
              >
                <Play className="mr-2 h-4 w-4" /> View Plans
              </Link>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
            {[
              { icon: BookOpen, label: "500+ Courses" },
              { icon: Users, label: "50K+ Students" },
              { icon: Award, label: "100+ Instructors" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="text-center">
                <Icon className="mx-auto h-8 w-8 text-primary-300" />
                <p className="mt-2 text-sm font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="mb-8 text-2xl font-bold">Browse by Category</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/courses?category=${encodeURIComponent(cat)}`}
              className="rounded-xl border border-gray-200 bg-white p-4 text-center text-sm font-medium transition hover:border-primary-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex justify-between">
            <h2 className="text-2xl font-bold">Featured Courses</h2>
            <Link to="/courses" className="text-primary-600">
              View all →
            </Link>
          </div>

          {featured.length === 0 ? (
            <p className="text-center text-gray-500">
              No featured courses found
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="mb-8 text-center text-2xl font-bold">
          What Students Say
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="card">
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold">Simple, Transparent Pricing</h2>
          <p className="mt-2 text-primary-200">
            Choose the plan that fits your learning goals
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {plans.map((plan, i) => (
              <div
                key={plan._id}
                className={`rounded-2xl p-6 ${
                  i === 1
                    ? "bg-white text-gray-900 ring-4 ring-primary-400 scale-105"
                    : "bg-white/10 backdrop-blur"
                }`}
              >
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <p className="mt-2 text-3xl font-extrabold">
                  ${plan.price}
                  <span className="text-sm font-normal opacity-70">/plan</span>
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  {plan.features?.slice(0, 4).map((f) => (
                    <li key={f}>✓ {f}</li>
                  ))}
                </ul>
                <Link
                  to="/pricing"
                  className={`mt-6 block rounded-lg py-2.5 text-center text-sm font-semibold ${
                    i === 1
                      ? "bg-primary-600 text-white hover:bg-primary-700"
                      : "bg-white/20 hover:bg-white/30"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
