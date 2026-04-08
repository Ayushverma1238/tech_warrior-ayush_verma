import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";
import { API_PATH } from "../utils/apiPaths";

const Login = () => {
  const [error, setError] = useState("");
  const [isEyeOpen, setIsEyeOpen] = useState(false)
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(form.email)) {
      setError("Please enter valid email");
      return;
    }

    if (!form.password) {
      setError("Please enter the password");
      return;
    }

    console.log("login successfull");
    setError("");

    // Login api logic

    try {
      const response = await axiosInstance.post(API_PATH.AUTH.LOGIN, form);

      const { token, user } = response?.data?.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }

      toast("User Login successfull", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("User login error", error);
      if (error.response || error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 to-slate-700">
      <div className="container max-w-md mx-auto hover:shadow-gray-300 ring-2  hover:ring-gray-300 bg-gray-800 p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl text-center text-gray-100 font-bold mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-300 text-center mb-6">
          Welcome Back, Please Login
        </p>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-200 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-200 font-medium mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={isEyeOpen ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full px-3 py-2 pr-10 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              {/* Eye Icon */}
              <span
                onClick={() => setIsEyeOpen(!isEyeOpen)}
                className="absolute right-3 top-2.5 text-gray-300 cursor-pointer"
              >
                {isEyeOpen ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded text-white font-semibold"
          >
            Login
          </button>
        </form>
        <p className="text-white flex gap-4 pt-5 justify-center">
          <span> New User?</span>
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
