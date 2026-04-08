import {
    LineChart, Line, XAxis, YAxis, Tooltip,
    CartesianGrid, Legend, ResponsiveContainer
} from "recharts";

const LineChartComponent = ({ data = [] }) => {
    return (
        <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="mb-4 font-semibold">Monthly Overview</h3>

            {data.length === 0 ? (
                <p className="text-center text-gray-500">No data available</p>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        <Line
                            type="monotone"
                            dataKey="income"
                            stroke="#22c55e"
                            strokeWidth={3}
                            animationDuration={800}
                        />
                        <Line
                            type="monotone"
                            dataKey="expense"
                            stroke="#ef4444"
                            strokeWidth={3}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default LineChartComponent;