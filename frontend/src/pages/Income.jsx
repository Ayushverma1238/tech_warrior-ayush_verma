import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchIncome,
    addIncome,
    deleteIncome,
    updateIncome,
} from "../features/income/incomeSlice";

import IncomeForm from "@/components/income/IncomeForm";
import IncomeTable from "@/components/income/IncomeTable";
import IncomeCard from "@/components/income/IncomeCard";
import { toast } from "sonner";

const Income = () => {
    const dispatch = useDispatch();

    const { list, loading } = useSelector((state) => state.income);
    const token = useSelector((state) => state.auth.token);

    const [editItem, setEditItem] = useState(null);

    useEffect(() => {
        if (token) dispatch(fetchIncome());
    }, [dispatch, token]);

    // const handleSubmit = (form) => {
    //     if (editItem) {
    //         dispatch(updateIncome({ id: editItem.id, data: form }));
    //         setEditItem(null);
    //     } else {
    //         dispatch(addIncome(form));
    //     }
    // };

    // const handleDelete = (id) => {
    //     dispatch(deleteIncome(id));
    // };


    const handleSubmit = async (form) => {
        try {
            if (editItem) {
                await dispatch(updateIncome({ id: editItem.id, data: form })).unwrap();
                toast.success("Income updated successfully");
                setEditItem(null);
            } else {
                await dispatch(addIncome(form)).unwrap();
                toast.success("Income added successfully");
            }
        } catch (err) {
            toast.error(err || "Something went wrong");
        }
    };

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteIncome(id)).unwrap();
            toast.success("Income deleted");
        } catch (err) {
            toast.error("Delete failed");
        }
    };






    // Total Income (UX upgrade)
    const totalIncome = list.reduce((acc, item) => acc + Number(item.amount || 0), 0);

    if (loading) {
        return (
            <div className="p-6 text-gray-500">
                Loading income...
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 space-y-6 bg-gray-50 min-h-screen">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Income
                    </h1>
                    <p className="text-sm text-gray-500">
                        Track and manage your earnings
                    </p>
                </div>

                <IncomeForm
                    onSubmit={handleSubmit}
                    editData={editItem}
                    setEditData={setEditItem}
                />
            </div>

            {/* STATS CARD */}
            <div className="bg-white rounded-2xl shadow-sm border p-5 flex justify-between items-center">
                <div>
                    <p className="text-sm text-gray-500">Total Income</p>
                    <h2 className="text-2xl font-bold text-green-600">
                        ₹ {totalIncome.toLocaleString()}
                    </h2>
                </div>
            </div>

            {/* CONTENT */}
            <div className="bg-white rounded-2xl shadow-sm border p-4">

                {list.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-gray-400 text-sm">
                            No income records yet
                        </p>
                        <p className="text-gray-300 text-xs mt-1">
                            Click "Add Income" to get started
                        </p>
                    </div>
                ) : (
                    <>
                        {/* TABLE */}
                        <IncomeTable
                            list={list}
                            onEdit={setEditItem}
                            onDelete={handleDelete}
                        />

                        {/* CARD */}
                        <IncomeCard
                            list={list}
                            onEdit={setEditItem}
                            onDelete={handleDelete}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default Income;