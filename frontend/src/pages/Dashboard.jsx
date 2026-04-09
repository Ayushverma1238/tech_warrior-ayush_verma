import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../features/dashboard/dashboardSlice";

import LineChartComponent from "../components/charts/LineChartComponent";
import PieChartComponent from "../components/charts/PieChartComponent";
import StatCard from "@/components/StatCard";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
    TrendingUp,
    TrendingDown,
    IndianRupee,
    Wallet,
    PieChart as PieIcon,
    BarChart3,
    CalendarDays,
    Sparkles
} from "lucide-react";

import { formatINR } from "@/utils/format";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.dashboard);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        if (token) dispatch(fetchDashboard());
    }, [dispatch, token]);

    if (loading || !data) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] gap-6">
                <div className="relative">
                    <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>
                    <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
                </div>

                <div className="text-center">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Loading Dashboard
                    </h2>
                    <p className="text-sm text-gray-500">
                        Preparing your financial insights...
                    </p>
                </div>
            </div>
        );
    }

    const formattedData =
        data?.monthlyData?.map((item) => ({
            month: item.month
                ? item.month.charAt(0) +
                item.month.slice(1, 3).toLowerCase()
                : "",
            income: item.income,
            expense: item.expense,
        })) || [];

    const formatPieData = (obj) =>
        Object.entries(obj || {}).map(([name, value]) => ({
            name,
            value,
        }));

    const expensePie = formatPieData(data?.categoryBreakdown);
    const incomePie = formatPieData(data?.incomeBreakdown);

    const isSaving = data.savings > data.loss;

    return (
        <div className="min-h-screen p-6 space-y-8 bg-linear-to-br from-slate-50 via-white to-slate-100">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <BarChart3 className="w-7 h-7 text-indigo-600" />
                        Financial Dashboard
                    </h1>

                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            <CalendarDays className="w-4 h-4" />
                            {new Date().toDateString()}
                        </span>

                        <Badge className="bg-green-100 text-green-700 border-none">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Live Data
                        </Badge>
                    </div>
                </div>
            </div>

            {/* STATS */}
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Income" value={data.totalIncome} icon={IndianRupee} />
                <StatCard title="Expense" value={data.totalExpense} icon={Wallet} />
                <StatCard title="Savings" value={data.savings} icon={TrendingUp} />
                <StatCard title="Loss" value={data.loss} icon={TrendingDown} />
            </div>

            {/* INSIGHT */}
            <Card
                className={`rounded-2xl shadow-md border-l-4 ${
                    isSaving
                        ? "border-green-500 bg-green-50"
                        : "border-red-500 bg-red-50"
                }`}
            >
                <CardContent className="p-6 flex items-start gap-4">
                    <div className="p-3 rounded-full bg-white shadow">
                        {isSaving ? (
                            <TrendingUp className="text-green-500" />
                        ) : (
                            <TrendingDown className="text-red-500" />
                        )}
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Insight</p>

                        <h2 className="text-lg font-semibold mt-1">
                            {isSaving
                                ? "Great job! You're saving well 🎉"
                                : "Warning: Expenses exceed income ⚠️"}
                        </h2>

                        <p className="text-sm text-gray-600 mt-1">
                            {isSaving
                                ? `You saved ${formatINR(data.savings)} this period`
                                : `You lost ${formatINR(data.loss)} this period`}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* SECTION TITLE */}
            <div className="flex items-center gap-2">
                <PieIcon className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-semibold">
                    Financial Analytics
                </h2>
            </div>

            {/* CHARTS */}
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                <div className="rounded-2xl shadow-md bg-white p-4">
                    <LineChartComponent
                        title="Monthly Income vs Expense"
                        data={formattedData}
                    />
                </div>

                <div className="rounded-2xl shadow-md bg-white p-4">
                    <PieChartComponent
                        data={expensePie}
                        title="Expense Distribution"
                    />
                </div>
            </div>

            {/* INCOME SECTION */}
            <div className="flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-semibold">
                    Income Sources
                </h2>
            </div>

            <div className="rounded-2xl shadow-md bg-white p-4">
                <PieChartComponent
                    data={incomePie}
                    title="Income Breakdown"
                />
            </div>
        </div>
    );
};

export default Dashboard;