import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTax } from "../features/tax/taxSlice";

const Tax = () => {
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.tax);

    useEffect(() => {
        dispatch(fetchTax());
    }, [dispatch]);

    if (loading) return <p className="p-6">Loading...</p>;
    if (!data) return <p className="p-6">No data available</p>;

    return (
        <div className="p-6 grid md:grid-cols-2 gap-6">

            <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-gray-500">Taxable Income</h3>
                <p className="text-2xl font-bold">
                    ₹ {data.taxableIncome}
                </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-gray-500">Estimated Tax</h3>
                <p className="text-2xl font-bold text-red-500">
                    ₹ {data.taxAmount} 
                </p>
            </div>

        </div>
    );
};

export default Tax;