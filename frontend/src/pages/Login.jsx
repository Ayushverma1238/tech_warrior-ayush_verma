import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state) => state.auth);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async () => {
        const res = await dispatch(loginUser(form));

        if (res.meta.requestStatus === "fulfilled") {
            navigate("/dashboard"); // ✅ redirect after login
        }
    };

    return (
        <div className="flex h-screen justify-center items-center bg-gray-100">
            <div className="bg-white p-6 rounded-xl shadow w-80">
                <h2 className="text-xl mb-4 font-semibold">Login</h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full mb-3 p-2 border rounded"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full mb-3 p-2 border rounded"
                />

                {error && (
                    <p className="text-red-500 text-sm mb-2">{error}</p>
                )}

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </div>
        </div>
    );
};

export default Login;