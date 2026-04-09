import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatINR } from "@/utils/format";

const RegimeCard = ({ title, value, best }) => (
    <Card className={`rounded-2xl ${best ? "border-green-500 border-2" : ""}`}>
        <CardContent className="p-5 flex justify-between items-center">
            <div>
                <p className="text-sm text-muted-foreground">{title}</p>
                <h2 className="text-xl font-bold">
                    ₹ {formatINR(value)}
                </h2>
            </div>

            {best && <Badge className="bg-green-500">Best</Badge>}
        </CardContent>
    </Card>
);

export default RegimeCard;