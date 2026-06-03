import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-gray-200 bg-gray-900 text-gray-300 dark:border-gray-800">
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-primary-400" />
            <span className="text-lg font-bold text-white">EduPrime</span>
          </div>
          <p className="text-sm text-gray-400">
            Learn without limits. Master new skills with expert-led courses.
          </p>
        </div>
        <div>
          <h4 className="mb-3 font-semibold text-white">Platform</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/courses" className="hover:text-white">
                Browse Courses
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-white">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-white">
                Become Instructor
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-semibold text-white">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-semibold text-white">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li>Development</li>
            <li>Design</li>
            <li>Marketing</li>
            <li>Business</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} EduPrime. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
