import { formatINR } from "@/utils/format";
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

const MONTH_MAP = {
    jan: 0, january: 0,
    feb: 1, february: 1,
    mar: 2, march: 2,
    apr: 3, april: 3,
    may: 4,
    jun: 5, june: 5,
    jul: 6, july: 6,
    aug: 7, august: 7,
    sep: 8, sept: 8, september: 8,
    oct: 9, october: 9,
    nov: 10, november: 10,
    dec: 11, december: 11,
};

const getMonthIndex = (month) => {
    if (!month) return 999;

    const key = month.toString().toLowerCase().trim();
    return MONTH_MAP[key] ?? 999; 
};

const LineChartComponent = ({ data = [], title = "Monthly Overview" }) => {

    const sortedData = Array.isArray(data)
        ? [...data].sort((a, b) => getMonthIndex(a.month) - getMonthIndex(b.month))
        : [];

    if (sortedData.length === 0) {
        return (
            <div className="bg-white p-5 rounded-2xl shadow">
                <h3 className="mb-4 font-semibold text-gray-700">{title}</h3>
                <p className="text-center text-gray-400">No data available</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">

            <h3 className="mb-4 font-semibold text-gray-700">{title}</h3>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={sortedData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />
                    <YAxis />

                    <Tooltip formatter={(value) => formatINR(value)} />

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
        </div>
    );
};

export default LineChartComponent;