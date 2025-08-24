import React, { useState } from "react";
import { User, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TermsCondition from "../components/termsCondition";
import { useAuth } from "../contexts/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showTermsConditions, setTermsConditions] = useState(false);
  const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      // here we are using the previous state to ensure we don't overwrite other fields
      ...prev,
      [name]: value,
    }));
  };
  // function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.preventDefault();
    setError("");

    //  Input field validation
    if (
      !formData.fullName ||
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required.");
      // Clear error message after 3 seconds
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    if (!passwordRegex.test(formData.password)) {
      setError(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      setTimeout(() => setError(""), 5000);
      return;
    }
    const result = await register({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });
    console.log("register: ", result);

    if (result.success) {
      navigate("/login");
    } else {
      setError(result.error);
    }
  };
  return (
    <div
      id="main_container"
      className="min-h-screen  flex items-center justify-center p-4"
    >
      <div className="bg-[#141514] rounded-3xl shadow-2xl  w-full max-w-2xl p-4 sm:p-8 ">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white text-2xl font-bold mb-2">
              Create <span className="text-gray-300">a new account</span>
            </h2>
            <p className="text-gray-500 text-sm">
              Sign up to unlock exclusive features.
            </p>
          </div>
          <div className="flex items-center">
            <div
              id="logo"
              className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3"
            ></div>
            <h1 className="text-white text-xl font-bold">
              Demo <span className="text-gray-300">Panel</span>
            </h1>
          </div>
        </div>
        <hr className="border-[1px] border-solid border-[#202020] my-4" />
        <div className="flex flex-col lg:flex-row gap-8 mb-8 items-center">
          <div className="lg:w-1/5">
            <div className="bg-[#202020] rounded-xl p-5 border border-gray-800 flex items-center justify-center h-24  mx-auto ">
              <User className="w-12 h-12 text-gray-400" />
            </div>
          </div>
          <div className="lg:w-3/4 w-full">
            <label className="block text-gray-200 text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="w-full bg-[#202020] text-gray-300 px-4 py-2 rounded-lg border border-gray-800 focus:border-gray-500 focus:outline-none transition-colors"
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-full w-full">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter your username"
                    className="w-full bg-[#202020] text-white px-4 py-2 rounded-lg border border-gray-800 focus:border-gray-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your full email"
                    className="w-full bg-[#202020] text-white px-4 py-2 rounded-lg border border-gray-800 focus:border-gray-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter password"
                      className="w-full bg-[#202020] text-white px-4 pr-12 py-2 rounded-lg border border-gray-800 focus:border-gray-500 focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm password"
                      className="w-full bg-[#202020] text-white px-4 pr-12 py-2 rounded-lg border border-gray-800 focus:border-gray-500 focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              {error && (
                <p className="text-red-400 text-sm font-semibold">{error}</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center text-sm text-gray-300">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mr-2 rounded bg-[#202020] border-gray-600 text-blue-600 focus:ring-blue-500"
                  />
                  I accept the{" "}
                  <button
                    type="button"
                    onClick={() => setTermsConditions(true)}
                    className="text-gray-100 cursor-pointer hover:text-gray-300 underline ml-1"
                  >
                    Terms & Conditions
                  </button>
                </label>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!acceptTerms}
                  className="bg-gray-50 cursor-pointer  text-gray-900 px-8 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Account →
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-8 gap-4">
              <p className="text-gray-400 text-sm">
                Already have an account?
                <Link to="/">
                  <button
                    type="button"
                    className="text-gray-100 hover:text-white ml-1 underline"
                    onClick={() => {
                      // This will be handled by your AppNavigator.tsx
                      console.log("Navigate to login");
                    }}
                  >
                    Log in
                  </button>
                </Link>
              </p>
              <p className="text-gray-500 text-xs">2025 © Demo Panel | FE</p>
            </div>
          </div>
        </div>
        {/* {showTermsConditions ? (
          <TermsCondition setTermsConditions={setTermsConditions} />
        ) : null} */}
      </div>
      {/* Terms and Condition Component */}
      {showTermsConditions ? (
        <TermsCondition setTermsConditions={setTermsConditions} />
      ) : null}
    </div>
  );
};

export default Signup;
