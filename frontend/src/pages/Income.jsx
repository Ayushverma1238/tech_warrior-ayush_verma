import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchIncome,
    addIncome,
    deleteIncome,
    updateIncome
} from "../features/income/incomeSlice";

const Income = () => {
    const dispatch = useDispatch();
    const { list, loading } = useSelector((state) => state.income);
    const token = useSelector((state) => state.auth.token);

    const [form, setForm] = useState({
        source: "",
        amount: "",
        date: "",
    });

    const [editId, setEditId] = useState(null);

    useEffect(() => {
        if (token) dispatch(fetchIncome());
    }, [dispatch, token]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.source || !form.amount) return;

        if (editId) {
            dispatch(updateIncome({ id: editId, data: form }));
            setEditId(null);
        } else {
            dispatch(addIncome(form));
        }

        setForm({ source: "", amount: "", date: "" });
    };

    const handleEdit = (item) => {
        setForm(item);
        setEditId(item.id);
    };

    const handleDelete = (id) => {
        dispatch(deleteIncome(id));
    };

    if (loading) return <p className="p-6">Loading...</p>;

    return (
        <div className="p-6 space-y-6">

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-4 rounded-xl shadow grid md:grid-cols-4 gap-4"
            >
                <input
                    name="source"
                    value={form.source}
                    onChange={handleChange}
                    placeholder="Source"
                    className="border p-2 rounded"
                />

                <input
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    type="number"
                    placeholder="Amount"
                    className="border p-2 rounded"
                />

                <input
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    type="date"
                    className="border p-2 rounded"
                />

                <button className="bg-blue-600 text-white rounded px-4">
                    {editId ? "Update" : "Add"}
                </button>
            </form>

            {/* TABLE */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3">Source</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {list.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center p-4">
                                    No income found
                                </td>
                            </tr>
                        ) : (
                            list.map((i) => (
                                <tr key={i.id} className="border-t text-center">
                                    <td className="p-2">{i.source}</td>
                                    <td>₹ {i.amount}</td>
                                    <td>{i.date?.slice(0, 10)}</td>
                                    <td className="space-x-2">
                                        <button
                                            onClick={() => handleEdit(i)}
                                            className="text-blue-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(i.id)}
                                            className="text-red-600"
                                        >
                                            Delete
                                        </button>
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

export default Income;