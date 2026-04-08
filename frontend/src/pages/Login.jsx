import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";

const Login = () => {
    const dispatch = useDispatch();

    const handleLogin = () => {
        // Fake login (replace with real API later)
        const fakeToken = "abc123";

        dispatch(
            setCredentials({
                user: { name: "Anurag" },
                token: fakeToken,
            })
        );
    };

    return (
        <div className="flex h-screen justify-center items-center bg-gray-100">
            <div className="bg-white p-6 rounded-xl shadow w-80">
                <h2 className="text-xl mb-4 font-semibold">Login</h2>

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white py-2 rounded"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;