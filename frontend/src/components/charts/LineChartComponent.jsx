import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend
} from "recharts";

const LineChartComponent = ({ data = [] }) => {
    return (
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">

            <h3 className="mb-4 font-semibold text-gray-700">
                Monthly Overview
            </h3>

            {data.length === 0 ? (
                <p className="text-center text-gray-400">
                    No data available
                </p>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="month" />
                        <YAxis />

                        <Tooltip
                            formatter={(value) => `₹ ${value}`}
                        />

                        <Legend />

                        <Line
                            type="monotone"
                            dataKey="income"
                            stroke="#22c55e"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                            animationDuration={800}
                        />

                        <Line
                            type="monotone"
                            dataKey="expense"
                            stroke="#ef4444"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                            animationDuration={800}
                        />

                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default LineChartComponent;