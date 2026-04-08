import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchExpenses,
    addExpense,
} from "../features/expense/expenseSlice";

const Expenses = () => {
    const dispatch = useDispatch();
    const { list } = useSelector((state) => state.expense);

    const [form, setForm] = useState({
        title: "",
        amount: "",
        category: "",
        date: "",
    });

    useEffect(() => {
        dispatch(fetchExpenses());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addExpense(form));
    };

    return (
        <div className="p-6 space-y-6">
            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-4 rounded-xl shadow grid md:grid-cols-4 gap-4"
            >
                <input placeholder="Title" className="input" onChange={(e) => setForm({ ...form, title: e.target.value })} />
                <input placeholder="Amount" className="input" onChange={(e) => setForm({ ...form, amount: e.target.value })} />
                <input placeholder="Category" className="input" onChange={(e) => setForm({ ...form, category: e.target.value })} />
                <input type="date" className="input" onChange={(e) => setForm({ ...form, date: e.target.value })} />

                <button className="bg-blue-600 text-white rounded px-4 py-2">
                    Add
                </button>
            </form>

            {/* Table */}
            <div className="bg-white shadow rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3">Title</th>
                            <th>Amount</th>
                            <th>Category</th>
                        </tr>
                    </thead>

                    <tbody>
                        {list.map((e) => (
                            <tr key={e.id} className="text-center border-t">
                                <td className="p-2">{e.title}</td>
                                <td>₹ {e.amount}</td>
                                <td>{e.category}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Expenses;