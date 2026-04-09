import { Card, CardContent } from "@/components/ui/card";
import { formatINR } from "@/utils/format";

const SummaryCard = ({ title, value, highlight, isPercent, icon: Icon }) => {
    const color =
        highlight === "red"
            ? "text-red-500"
            : highlight === "blue"
                ? "text-blue-500"
                : "text-gray-800";

    return (
        <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
            <CardContent className="p-5 flex justify-between items-center">

                <div>
                    <p className="text-sm text-muted-foreground">{title}</p>

                    <h2 className={`text-2xl font-bold ${color}`}>
                        {isPercent
                            ? `${value}%`
                            : formatINR(value)}
                    </h2>
                </div>

                {Icon && (
                    <div className="bg-gray-100 p-2 rounded-lg">
                        <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default SummaryCard;