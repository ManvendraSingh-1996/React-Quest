import { createContext, useContext, useEffect, useState } from "react";
import pb from "../lib/pocketBase";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const authData = pb.authStore;

    if (authData.isValid) {
      setUser(authData.model);
    }

    setLoading(false);

    const unsubscribe = pb.authStore.onChange((token, model) => {
      setUser(model);
    });

    return unsubscribe;
  }, []);

  //function to handle user login , used in Login.jsx
  const login = async (userData) => {
    try {
      const loginData = await pb
        .collection("users")
        .authWithPassword(userData.email, userData.password);
      toast.success(`Welcome back, ${userData.email}!`);
      setUser(loginData.record);

      return {
        success: true,
        user: loginData.record,
        message: "Login successful",
      };
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
      return {
        success: false,
        error: error.response?.message || error.message || "Login failed",
      };
    }
  };
  //function to handle user Signin in Signup.jsx
  const register = async (userData) => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8090/api/collections/users/records",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: userData.username,
            email: userData.email,
            password: userData.password,
            passwordConfirm: userData.confirmPassword,
            emailVisibility: true,
          }),
        }
      );

      const data = await res.json();

      //  Handle validation / API errors
      if (!res.ok) {
        console.error("PocketBase error:", data);
        toast.error("Registration failed. Please try again.");
        return {
          success: false,
          error:
            data?.message ||
            data?.data?.email?.message ||
            data?.data?.username?.message ||
            "Registration failed",
        };
      }
      toast.success(`User registered Successfully`);
      console.log("User registered:", data);
      return { success: true, message: "Signup successful. Please login." };
    } catch (error) {
      toast.error("Registration error.");
      console.error(" Registration error:", error);
      return {
        success: false,
        error: error.message || "Registration failed",
      };
    }
  };
  //   function to handle user logout
  const logout = () => {
    pb.authStore.clear();
    toast.success(` ${user.email} Logged Out`);
    console.log("user got logged out", user);

    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
