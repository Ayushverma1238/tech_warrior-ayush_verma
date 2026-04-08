import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses, addExpense } from "../features/expense/expenseSlice";

const Expenses = () => {
    const dispatch = useDispatch();
    const { list, loading } = useSelector((state) => state.expense);

    const { user } = useSelector((state) => state.auth);

    const [form, setForm] = useState({
        title: "",
        amount: "",
        category: "",
        date: "",
    });

    useEffect(() => {
        if (user?.id) {
            dispatch(fetchExpenses());
        }
    }, [dispatch, user]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user?.id) {
            alert("User not loaded yet");
            return;
        }

        if (!form.title || !form.amount) return;

        dispatch(addExpense(form));

        setForm({
            title: "",
            amount: "",
            category: "",
            date: "",
        });
    };

    return (
        <div className="p-6 space-y-6">

            {/* Header */}
            <h2 className="text-2xl font-bold text-gray-800">💸 Expenses</h2>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-5 rounded-2xl shadow-md grid md:grid-cols-5 gap-4"
            >
                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="input border p-2 rounded-lg"
                />

                <input
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="Amount"
                    type="number"
                    className="input border p-2 rounded-lg"
                />

                <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Category"
                    className="input border p-2 rounded-lg"
                />

                <input
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    type="date"
                    className="input border p-2 rounded-lg"
                />

                <button
                    disabled={!user?.id}
                    className="bg-blue-600 disabled:bg-gray-400 text-white rounded-lg px-4 py-2 transition"
                >
                    Add
                </button>
            </form>

            {/* Table */}
            <div className="bg-white shadow rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="p-3 text-left">Title</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="p-4 text-center">
                                    Loading...
                                </td>
                            </tr>
                        ) : list.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-4 text-center text-gray-500">
                                    No expenses yet
                                </td>
                            </tr>
                        ) : (
                            list.map((e) => (
                                <tr key={e.id} className="border-t hover:bg-gray-50">
                                    <td className="p-3">{e.title}</td>
                                    <td className="text-center font-medium">
                                        ₹ {e.amount}
                                    </td>
                                    <td className="text-center">{e.category}</td>
                                    <td className="text-center">
                                        {e.date?.slice(0, 10)}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Expenses;