import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

const PieChartComponent = ({ data = [], title }) => {

    const chartData = Array.isArray(data) ? data : [];

    // ✅ Handle empty state
    if (chartData.length === 0) {
        return (
            <div className="bg-white p-4 rounded-2xl shadow">
                <h3 className="mb-4 font-semibold">{title}</h3>
                <p className="text-center text-gray-500">
                    No data available
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="mb-4 font-semibold">{title}</h3>

            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"   // ✅ FIXED
                        nameKey="name"
                        outerRadius={90}
                        label
                    >
                        {chartData.map((_, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieChartComponent;