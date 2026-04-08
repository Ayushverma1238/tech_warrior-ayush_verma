import { Card, CardContent } from "./ui/card";

const StatCard = ({ title, value }) => {
    return (
        <Card>
            <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">{title}</p>
                <h2 className="text-2xl font-bold">₹ {value}</h2>
            </CardContent>
        </Card>
    );
};

export default StatCard;