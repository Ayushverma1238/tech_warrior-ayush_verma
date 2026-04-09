import {
    PieChart,
    Pie,
    Tooltip,
    Cell,
    ResponsiveContainer,
    Legend
} from "recharts";

const COLORS = [
    "#6366f1", "#22c55e", "#f59e0b", "#ef4444",
    "#3b82f6", "#a855f7"
];

const PieChartComponent = ({ data = [], title }) => {

    const chartData = Array.isArray(data) ? data : [];

    // calculate total
    const total = chartData.reduce((sum, d) => sum + d.value, 0);

    if (chartData.length === 0) {
        return (
            <div className="bg-white p-5 rounded-2xl shadow">
                <h3 className="mb-4 font-semibold">{title}</h3>
                <p className="text-center text-gray-400">
                    No data available
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">

            <h3 className="mb-4 font-semibold text-gray-700">{title}</h3>

            <ResponsiveContainer width="100%" height={260}>
                <PieChart>

                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={90}
                        innerRadius={50} // 🔥 donut style
                        paddingAngle={3}
                        animationDuration={800}
                        label={({ name, value }) =>
                            `${((value / total) * 100).toFixed(0)}%`
                        }
                    >
                        {chartData.map((_, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>

                    <Tooltip
                        formatter={(value) => `₹ ${value}`}
                        contentStyle={{
                            borderRadius: "10px",
                            border: "none",
                        }}
                    />

                    <Legend />

                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieChartComponent;