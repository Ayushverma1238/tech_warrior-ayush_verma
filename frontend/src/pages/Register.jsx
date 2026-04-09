import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

import {
    Mail,
    Lock,
    User,
    UserPlus,
} from "lucide-react";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state) => state.auth);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async () => {
        const res = await dispatch(registerUser(form));

        if (res.meta.requestStatus === "fulfilled") {
            navigate("/dashboard");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 via-white to-slate-100 p-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">

                {/* HEADER */}
                <div className="text-center space-y-2">
                    <div className="flex justify-center">
                        <div className="p-3 bg-green-100 rounded-xl">
                            <UserPlus className="text-green-600 w-6 h-6" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Create Account
                    </h2>
                    <p className="text-sm text-gray-500">
                        Start managing your finances 🚀
                    </p>
                </div>

                {/* FORM */}
                <div className="space-y-4">

                    {/* NAME */}
                    <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 ring-green-200">
                        <User className="w-4 h-4 text-gray-400 mr-2" />
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full outline-none text-sm"
                        />
                    </div>

                    {/* EMAIL */}
                    <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 ring-green-200">
                        <Mail className="w-4 h-4 text-gray-400 mr-2" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full outline-none text-sm"
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 ring-green-200">
                        <Lock className="w-4 h-4 text-gray-400 mr-2" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full outline-none text-sm"
                        />
                    </div>

                    {/* ERROR */}
                    {error && (
                        <p className="text-red-500 text-sm text-center">
                            {error}
                        </p>
                    )}

                    {/* BUTTON */}
                    <button
                        onClick={handleRegister}
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 transition text-white py-2 rounded-xl font-medium"
                    >
                        {loading ? "Creating account..." : "Register"}
                    </button>
                </div>

                {/* FOOTER */}
                <p className="text-sm text-center text-gray-500">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-green-600 cursor-pointer font-medium"
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;