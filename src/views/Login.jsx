import React, { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import pb from "../lib/pocketBase";
const Login = () => {
  useEffect(() => {
    console.log("Auth Data:", pb.authStore);
  }, []);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Email and Password are required.");
      setTimeout(() => setError(""), 3000);
      return;
    }
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    const result = await login({
      email: formData.email,
      password: formData.password,
    });
    console.log("login result ,", result);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.error || "Login failed.");
      setTimeout(() => setError(""), 5000);
    }
  };
  return (
    <div>
      <div
        className=" min-h-screen  flex items-center justify-center p-4  "
        id="main_container"
      >
        <div className="bg-[#141514] rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className=" mb-8">
            <div className="flex mb-4">
              <div
                id="logo"
                className="w-8 h-8  rounded-lg flex items-center justify-center mr-3"
              ></div>
              <h1 className="text-white text-xl font-bold">
                Demo <span className="text-gray-300">Panel</span>
              </h1>
            </div>
            <h2 className="text-white text-2xl font-bold mb-2">
              Log in <span className="text-gray-300">to your account!</span>
            </h2>
            <p className="text-gray-400 text-sm">
              Enter your email and password to login
            </p>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                placeholder="Enter email address.."
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#202020] text-white pl-12 pr-4 py-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password.."
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-[#202020] text-white pl-12 pr-12 py-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors"
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
            {error && (
              <p className="text-red-400 text-sm font-semibold">{error}</p>
            )}
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 rounded bg-gray-800 border-gray-600"
                />
                Remember me
              </label>
              <button className="text-sm text-gray-400 hover:text-white transition-colors">
                Forgot Password ?
              </button>
            </div>

            {/* <Link to="/dashboard"> */}
            <button
              onClick={handleLogin}
              className="w-full bg-white text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Sign In to Account
            </button>
            {/* </Link> */}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm mb-4">Don't have account ?</p>
            <Link to="/signup">
              <button
                // onClick={() => setCurrentPage("signup")}
                className="w-full bg-transparent border-2 border-gray-600  text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Create New Account
              </button>
            </Link>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-500 text-xs">2025 © Demo Panel | FE</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
