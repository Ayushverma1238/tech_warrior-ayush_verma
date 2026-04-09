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
import {
    IndianRupee,
    PlusCircle,
    Wallet,
    Search,
    X,
    TrendingUp,
    BarChart3,
} from "lucide-react";

import { formatINR } from "@/utils/format";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Income = () => {
    const dispatch = useDispatch();
    const { list, loading } = useSelector((state) => state.income);
    const token = useSelector((state) => state.auth.token);

    const [editItem, setEditItem] = useState(null);

    const [filters, setFilters] = useState({
        keyword: "",
        source: "",
    });

    const [debouncedFilters, setDebouncedFilters] = useState(filters);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedFilters(filters);
        }, 400);
        return () => clearTimeout(timer);
    }, [filters]);

    useEffect(() => {
        if (token) {
            dispatch(fetchIncome(debouncedFilters));
        }
    }, [dispatch, token, debouncedFilters]);

    const handleSubmit = async (form) => {
        try {
            if (editItem) {
                await dispatch(
                    updateIncome({ id: editItem.id, data: form })
                ).unwrap();
                toast.success("Income updated");
                setEditItem(null);
            } else {
                await dispatch(addIncome(form)).unwrap();
                toast.success("Income added");
            }
        } catch (err) {
            toast.error(err || "Something went wrong");
        }
    };

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteIncome(id)).unwrap();
            toast.success("Income deleted");
        } catch {
            toast.error("Delete failed");
        }
    };

    const totalIncome = list.reduce(
        (acc, item) => acc + Number(item.amount || 0),
        0
    );

    const avgIncome = list.length
        ? Math.round(totalIncome / list.length)
        : 0;

    if (loading) {
        return <div className="p-6 text-gray-500">Loading income...</div>;
    }

    return (
        <div className="p-6 md:p-10 space-y-8 min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-green-100">
                            <Wallet className="w-6 h-6 text-green-600" />
                        </div>
                        Income Dashboard
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Track, analyze & optimize your earnings
                    </p>
                </div>

                <IncomeForm
                    onSubmit={handleSubmit}
                    editData={editItem}
                    setEditData={setEditItem}
                />
            </div>

            {/* SEARCH + FILTER */}
            <div className="bg-white/80 backdrop-blur-md border rounded-2xl shadow-sm p-4 flex flex-wrap gap-4 items-center">

                <div className="flex items-center gap-2 border px-3 py-2 rounded-xl flex-1 min-w-55 focus-within:ring-2 ring-green-200">
                    <Search size={16} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search income..."
                        value={filters.keyword}
                        onChange={(e) =>
                            setFilters({ ...filters, keyword: e.target.value })
                        }
                        className="w-full outline-none text-sm bg-transparent"
                    />
                </div>

                <Select
                    value={filters.source || "all"}
                    onValueChange={(value) =>
                        setFilters({
                            ...filters,
                            source: value === "all" ? "" : value, 
                        })
                    }
                >
                    <SelectTrigger className="w-55 rounded-xl flex items-center gap-2">
                        <SelectValue placeholder="All Sources" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="all">All Sources</SelectItem>
                        <SelectItem value="Salary">Salary</SelectItem>
                        <SelectItem value="Freelance">Freelance</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                    </SelectContent>
                </Select>

                {(filters.keyword || filters.source) && (
                    <button
                        onClick={() =>
                            setFilters({ keyword: "", source: "" })
                        }
                        className="flex items-center gap-1 px-3 py-2 text-sm bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition"
                    >
                        <X size={14} />
                        Reset
                    </button>
                )}
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

                <div className="bg-white rounded-2xl shadow-md p-5 flex justify-between items-center hover:shadow-lg transition">
                    <div>
                        <p className="text-sm text-gray-500">Total Income</p>
                        <h2 className="text-2xl font-bold text-green-600">
                            ₹ {formatINR(totalIncome)}
                        </h2>
                    </div>
                    <div className="p-3 bg-green-100 rounded-xl">
                        <IndianRupee className="text-green-600" />
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-5 flex justify-between items-center hover:shadow-lg transition">
                    <div>
                        <p className="text-sm text-gray-500">Entries</p>
                        <h2 className="text-2xl font-bold">
                            {list.length}
                        </h2>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-xl">
                        <BarChart3 className="text-blue-600" />
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-5 flex justify-between items-center hover:shadow-lg transition">
                    <div>
                        <p className="text-sm text-gray-500">Avg Income</p>
                        <h2 className="text-2xl font-bold text-purple-600">
                            ₹ {formatINR(avgIncome)}
                        </h2>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-xl">
                        <TrendingUp className="text-purple-600" />
                    </div>
                </div>

            </div>

            {/* DATA */}
            <div className="bg-white rounded-2xl shadow-md p-5">

                {list.length === 0 ? (
                    <div className="text-center py-16 text-gray-400 flex flex-col items-center gap-3">
                        <Wallet size={40} className="opacity-30" />
                        <p>No income records found</p>
                        <p className="text-xs">Start by adding your first income</p>
                    </div>
                ) : (
                    <>
                        <div className="hidden md:block">
                            <IncomeTable
                                list={list}
                                onEdit={setEditItem}
                                onDelete={handleDelete}
                            />
                        </div>

                        <div className="md:hidden">
                            <IncomeCard
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

export default Income;