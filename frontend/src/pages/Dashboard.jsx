import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../features/dashboard/dashboardSlice";

import LineChartComponent from "../components/charts/LineChartComponent";
import PieChartComponent from "../components/charts/PieChartComponent";
import StatCard from "@/components/StatCard";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.dashboard);

    useEffect(() => {
        dispatch(fetchDashboard());
    }, [dispatch]);

    if (loading || !data) return <p>Loading...</p>;

    return (
        <div className="space-y-6">
            {/* Cards */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard title="Income" value={data.totalIncome} />
                <StatCard title="Expense" value={data.totalExpense} />
                <StatCard title="Net Profit" value={data.netProfit} />
            </div>

            {/* Charts */}
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                <LineChartComponent data={data.monthlyData} />
                <PieChartComponent data={data.categoryBreakdown} title="Expenses" />
            </div>

            <PieChartComponent data={data.incomeBreakdown} title="Income Sources" />
        </div>
    );
};

export default Dashboard;