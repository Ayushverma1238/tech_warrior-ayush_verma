import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
} from "../features/expense/expenseSlice";

import ExpenseForm from "@/components/expense/ExpenseForm";
import ExpenseTable from "@/components/expense/ExpenseTable";
import ExpenseCard from "@/components/expense/ExpenseCard";

import { toast } from "sonner";

import {
    Wallet,
    TrendingDown,
    Receipt,
    IndianRupee,
} from "lucide-react";
import { formatINR } from "@/utils/format";

const Expenses = () => {
    const dispatch = useDispatch();
    const [editItem, setEditItem] = useState(null);

    const { list, loading } = useSelector((state) => state.expense);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user?.id) {
            dispatch(fetchExpenses());
        }
    }, [dispatch, user]);

    const handleSubmit = (form) => {
        if (editItem) {
            dispatch(updateExpense({ id: editItem.id, data: form }))
                .unwrap()
                .then(() => {
                    toast.success("Expense updated");
                    setEditItem(null);
                })
                .catch(() => toast.error("Failed to update expense"));
        } else {
            dispatch(addExpense(form))
                .unwrap()
                .then(() => toast.success("Expense added"))
                .catch(() => toast.error("Failed to add expense"));
        }
    };

    const handleDelete = (id) => {
        const promise = dispatch(deleteExpense(id)).unwrap();

        toast.promise(promise, {
            loading: "Deleting...",
            success: "Expense deleted",
            error: "Failed to delete",
        });
    };

    const totalExpense = list.reduce(
        (acc, item) => acc + Number(item.amount || 0),
        0
    );

    const avgExpense = list.length
        ? Math.round(totalExpense / list.length)
        : 0;

    return (
        <div className="p-6 md:p-10 space-y-8 min-h-screen bg-linear-to-br from-red-50 via-white to-slate-100">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                        <Wallet className="w-7 h-7 text-red-500" />
                        Expense Dashboard
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Track and control your spending habits
                    </p>
                </div>

                <ExpenseForm
                    onSubmit={handleSubmit}
                    editData={editItem}
                    setEditData={setEditItem}
                />
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                {/* TOTAL */}
                <div className="bg-white rounded-2xl shadow-md p-5 flex justify-between items-center hover:shadow-xl transition">
                    <div>
                        <p className="text-sm text-gray-500">Total Expenses</p>
                        <h2 className="text-2xl font-bold text-red-600 mt-1">
                            ₹ {formatINR(totalExpense)}
                        </h2>
                    </div>
                    <div className="bg-red-100 p-3 rounded-xl">
                        <TrendingDown className="text-red-600 w-6 h-6" />
                    </div>
                </div>

                {/* COUNT */}
                <div className="bg-white rounded-2xl shadow-md p-5 flex justify-between items-center hover:shadow-xl transition">
                    <div>
                        <p className="text-sm text-gray-500">Entries</p>
                        <h2 className="text-2xl font-bold text-gray-800 mt-1">
                            {list.length}
                        </h2>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-xl">
                        <Receipt className="text-blue-600 w-6 h-6" />
                    </div>
                </div>

                {/* AVG */}
                <div className="bg-white rounded-2xl shadow-md p-5 flex justify-between items-center hover:shadow-xl transition">
                    <div>
                        <p className="text-sm text-gray-500">Avg Expense</p>
                        <h2 className="text-2xl font-bold text-purple-600 mt-1">
                            ₹ {formatINR(avgExpense)}
                        </h2>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-xl">
                        <IndianRupee className="text-purple-600 w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="bg-white rounded-2xl shadow-md p-5">

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-6">

                        {/* Gradient Spinner */}
                        <div className="relative">
                            <div className="h-14 w-14 rounded-full border-4 border-gray-200"></div>
                            <div className="absolute top-0 left-0 h-14 w-14 rounded-full border-4 border-red-500 border-t-transparent animate-spin"></div>
                        </div>

                        {/* Title */}
                        <p className="text-sm font-medium text-gray-600 tracking-wide">
                            Loading your expenses...
                        </p>

                        {/* Animated progress bar */}
                        <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full w-1/2 bg-red-500 animate-[loading_1.2s_infinite]"></div>
                        </div>

                    </div>
                ) : list.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <Wallet className="w-12 h-12 text-gray-300 mb-4" />
                        <p className="text-gray-500 text-sm">
                            No expenses recorded yet
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                            Start tracking your spending now
                        </p>
                    </div>
                ) : (
                    <>
                        {/* DESKTOP */}
                        <div className="hidden md:block">
                            <ExpenseTable
                                list={list}
                                onEdit={setEditItem}
                                onDelete={handleDelete}
                            />
                        </div>

                        {/* MOBILE */}
                        <div className="md:hidden">
                            <ExpenseCard
                                list={list}
                                onEdit={setEditItem}
                                onDelete={handleDelete}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Expenses;