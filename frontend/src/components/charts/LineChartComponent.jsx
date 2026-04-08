import {
    LineChart, Line, XAxis, YAxis, Tooltip,
    CartesianGrid, Legend, ResponsiveContainer
} from "recharts";

const LineChartComponent = ({ data }) => {
    return (
        <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="mb-4 font-semibold">Monthly Overview</h3>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="income" stroke="#22c55e" />
                    <Line type="monotone" dataKey="expense" stroke="#ef4444" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineChartComponent;