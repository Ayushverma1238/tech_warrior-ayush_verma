import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../features/dashboard/dashboardSlice";

import LineChartComponent from "../components/charts/LineChartComponent";
import PieChartComponent from "../components/charts/PieChartComponent";
import StatCard from "@/components/StatCard";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.dashboard);
    const token = useSelector((state) => state.auth.token);

    console.log("Category:", data?.categoryBreakdown);
    console.log("Income:", data?.incomeBreakdown);

    useEffect(() => {
        if (token) dispatch(fetchDashboard());
    }, [dispatch, token]);

    const formattedData = data?.monthlyData?.map((item) => ({
        month: item.month.slice(0, 3),
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

    console.log("Expense Pie:", expensePie);
console.log("Income Pie:", incomePie);

    if (loading || !data) return <p className="p-6">Loading...</p>;

    return (
        <div className="space-y-6">

            {/* Cards */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Income" value={data?.totalIncome || 0} />
                <StatCard title="Expense" value={data?.totalExpense || 0} />
                <StatCard title="Savings" value={data?.savings || 0} />
                <StatCard title="Loss" value={data?.loss || 0} />
            </div>

            {/* Charts */}
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                <LineChartComponent data={formattedData} />
                <PieChartComponent
                    data={expensePie}
                    title="Expenses"
                />
            </div>

            <PieChartComponent
                data={incomePie}
                title="Income Sources"
            />
        </div>
    );
};

export default Dashboard;