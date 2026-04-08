import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIncome } from "../features/income/incomeSlice";

const Income = () => {
    const dispatch = useDispatch();
    const { list, loading, error } = useSelector((state) => state.income);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        if (token) {
            dispatch(fetchIncome());
        }
    }, [dispatch, token]);

    if (loading) return <p className="p-6">Loading income...</p>;
    if (error) return <p className="p-6 text-red-500">{error}</p>;

    return (
        <div className="p-6">
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3">Source</th>
                            <th className="p-3">Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        {(list || []).length === 0 ? (
                            <tr>
                                <td colSpan="2" className="p-4 text-center">
                                    No income data found
                                </td>
                            </tr>
                        ) : (
                            list.map((i) => (
                                <tr key={i.id} className="text-center border-t">
                                    <td className="p-3">{i.source}</td>
                                    <td className="p-3 font-medium">
                                        ₹ {i.amount}
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