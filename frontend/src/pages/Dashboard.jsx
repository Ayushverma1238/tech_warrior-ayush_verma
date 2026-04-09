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
    BarChart3
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
            <div className="p-6 text-center text-gray-500">
                Loading dashboard...
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
        <div className="bg-linear-to-br from-gray-50 to-gray-100 min-h-screen p-6 space-y-8">

            {/* HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <BarChart3 className="w-7 h-7 text-blue-500" />
                        Dashboard
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Overview of your financial activity
                    </p>
                </div>

                <Badge variant="secondary">Updated</Badge>
            </div>

            {/* STATS */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Income" value={data.totalIncome} icon={IndianRupee} />
                <StatCard title="Expense" value={data.totalExpense} icon={Wallet} />
                <StatCard title="Savings" value={data.savings} icon={TrendingUp} />
                <StatCard title="Loss" value={data.loss} icon={TrendingDown} />
            </div>

            {/* INSIGHT */}
            <Card
                className={`border-l-4 ${isSaving
                        ? "border-green-500 bg-green-50"
                        : "border-red-500 bg-red-50"
                    }`}
            >
                <CardContent className="p-5 flex items-start gap-4">
                    <div className="mt-1">
                        {isSaving ? (
                            <TrendingUp className="text-green-500" />
                        ) : (
                            <TrendingDown className="text-red-500" />
                        )}
                    </div>

                    <div>
                        <p className="text-sm text-gray-600">Insight</p>

                        <h2 className="text-lg font-semibold mt-1">
                            {isSaving
                                ? "You're saving well this month 🎉"
                                : "Expenses are higher than income ⚠️"}
                        </h2>

                        <p className="text-sm text-muted-foreground mt-1">
                            {isSaving
                                ? `You saved ${formatINR(data.savings)}`
                                : `You lost ${formatINR(data.loss)}`}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* CHART SECTION TITLE */}
            <div className="flex items-center gap-2">
                <PieIcon className="w-5 h-5 text-purple-500" />
                <h2 className="text-lg font-semibold">
                    Financial Analytics
                </h2>
            </div>

            {/* CHARTS */}
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                <LineChartComponent
                    title="Monthly Income vs Expense"
                    data={formattedData}
                />

                <PieChartComponent
                    data={expensePie}
                    title="Expense Distribution"
                />
            </div>

            {/* INCOME SOURCES */}
            <div className="flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-green-500" />
                <h2 className="text-lg font-semibold">
                    Income Sources
                </h2>
            </div>

            <PieChartComponent
                data={incomePie}
                title="Income Breakdown"
            />
        </div>
    );
};

export default Dashboard;