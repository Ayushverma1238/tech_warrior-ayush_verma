import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

const PieChartComponent = ({ data, title }) => {
    return (
        <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="mb-4 font-semibold">{title}</h3>

            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie data={data} dataKey="amount" nameKey="name" outerRadius={90}>
                        {data?.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieChartComponent;