import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { validateEmail } from "../utils/helper";
import { API_PATH } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";
const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) {
      setError("Please enter your name.");
      return;
    }

    if (!validateEmail(form.email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (!form.password) {
      setError("Please enter a password.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password at least 8 charaters");
      return;
    }

    setError("");

    // API logic
    try {
      const response = await axiosInstance.post(API_PATH.AUTH.REGISTER, form);

      console.log(response.data);

      const { token, user } = response?.data?.data;
      if (token) {
        localStorage.setItem("token", token);
        // updateUser(user);
        navigate("/dashboard");
      }

      toast("User Register Successfull", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br  from-gray-900 to-slate-700">
      <div className="container max-w-md mx-auto ring-1 ring-white shaodw-lg hover:shadow-gray-200 bg-gray-800 p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl text-center font-bold text-gray-100 mb-2">
          Create an Account
        </h1>
        <p className="text-gray-300 text-center mb-6">
          Join us today by entering your details below.{" "}
        </p>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-200 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-3 py-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

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
            className="w-full bg-green-600 rounded-lg hover:bg-green-700 transition py-2 text-white font-semibold"
          >
            Register
          </button>

          <p className="text-white flex gap-4 pt-5 justify-center">
            <span> Already Register?</span>
            <Link to="/" className="text-blue-500 hover:underline">
              Login Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
