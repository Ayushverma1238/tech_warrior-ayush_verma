import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTax } from "../features/tax/taxSlice";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import SummaryCard from "@/components/tax/SummaryCard";
import RegimeCard from "@/components/tax/RegimeCard";
import LoadingState from "@/components/tax/LoadingState";
import EmptyState from "@/components/tax/EmptyState";

import LineChartComponent from "@/components/charts/LineChartComponent";
import PieChartComponent from "@/components/charts/PieChartComponent";

import {
    IndianRupee,
    Percent,
    TrendingDown,
    Sparkles,
    BarChart3,
    Lightbulb,
    ShieldCheck,
} from "lucide-react";
import { formatINR } from "@/utils/format";

const Tax = () => {
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.tax);

    useEffect(() => {
        dispatch(fetchTax());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="p-6 md:p-10 space-y-8 animate-pulse min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100">

                {/* HEADER */}
                <div className="space-y-2">
                    <div className="h-8 w-64 bg-gray-200 rounded"></div>
                    <div className="h-4 w-40 bg-gray-100 rounded"></div>
                </div>

                {/* SUMMARY */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-sm p-5 border">
                            <div className="h-4 w-24 bg-gray-200 rounded mb-3"></div>
                            <div className="h-6 w-32 bg-gray-300 rounded"></div>
                        </div>
                    ))}
                </div>

                {/* RECOMMENDATION CARD */}
                <div className="h-28 rounded-2xl bg-linear-to-r from-gray-200 to-gray-100"></div>

                {/* CHARTS */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="h-64 bg-white rounded-2xl shadow-sm border"></div>
                    <div className="h-64 bg-white rounded-2xl shadow-sm border"></div>
                </div>

                {/* REGIME */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="h-28 bg-white rounded-2xl shadow-sm border"></div>
                    <div className="h-28 bg-white rounded-2xl shadow-sm border"></div>
                </div>

                {/* BOTTOM SECTIONS */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="h-48 bg-white rounded-2xl shadow-sm border"></div>
                    <div className="h-48 bg-white rounded-2xl shadow-sm border"></div>
                </div>
            </div>
        );
    }

    if (!data) return <EmptyState />;

    const taxableIncome = Number(data?.taxableIncome ?? 0);
    const taxAmount = Number(data?.taxAmount ?? 0);

    const taxRate =
        taxableIncome > 0
            ? ((taxAmount / taxableIncome) * 100).toFixed(2)
            : "0.00";

    const isNewBetter = data.taxNewRegime < data.taxOldRegime;
    const savings = Math.abs(data.taxOldRegime - data.taxNewRegime);

    return (
        <div className="p-6 md:p-10 space-y-10 min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-2">
                        <BarChart3 className="w-8 h-8 text-blue-600" />
                        Tax Dashboard
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Smart insights to optimize your taxes
                    </p>
                </div>

                <Badge className="px-3 py-1 text-xs bg-black text-white rounded-full shadow-sm">
                    <Sparkles size={12} className="mr-1" />
                    Smart Analysis
                </Badge>
            </div>

            {/* SUMMARY */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <SummaryCard
                    title="Total Income"
                    value={data.totalIncome}
                    icon={IndianRupee}
                />

                <SummaryCard
                    title="Total Tax"
                    value={data.taxAmount}
                    highlight="red"
                    icon={TrendingDown}
                />

                <SummaryCard
                    title="Effective Tax Rate"
                    value={taxRate}
                    isPercent
                    highlight="blue"
                    icon={Percent}
                />
            </div>

            {/* RECOMMENDATION */}
            <Card className="relative overflow-hidden border-none shadow-xl bg-linear-to-r from-green-500 to-emerald-600 text-white">
                <CardContent className="p-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm opacity-80 flex items-center gap-1">
                            <ShieldCheck size={14} />
                            Recommendation
                        </p>

                        <h2 className="text-2xl font-semibold mt-2">
                            {isNewBetter ? "New Regime" : "Old Regime"} is better
                        </h2>

                        <p className="mt-2 text-sm opacity-90">
                            Save up to ₹ {formatINR(savings)}
                        </p>
                    </div>

                    <Sparkles className="w-10 h-10 opacity-30" />
                </CardContent>
            </Card>

            {/* CHARTS */}
            <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                    <BarChart3 size={18} />
                    Analytics Overview
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition">
                        <PieChartComponent
                            title="Income vs Tax"
                            data={[
                                { name: "Income", value: data.totalIncome },
                                { name: "Tax", value: data.taxAmount },
                            ]}
                        />
                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition">
                        <LineChartComponent
                            title="Monthly Overview"
                            data={data.monthlyBreakdown}
                        />
                    </div>
                </div>
            </div>

            {/* REGIME COMPARISON */}
            <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                    <TrendingDown size={18} />
                    Regime Comparison
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                    <RegimeCard
                        title="Old Regime"
                        value={data.taxOldRegime}
                    />
                    <RegimeCard
                        title="New Regime"
                        value={data.taxNewRegime}
                        best={isNewBetter}
                    />
                </div>
            </div>

            {/* DEDUCTIONS + SUGGESTIONS */}
            <div className="grid md:grid-cols-2 gap-8">

                {/* DEDUCTIONS */}
                <Card className="rounded-2xl shadow-md hover:shadow-xl transition">
                    <CardContent className="p-6">
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <IndianRupee size={18} />
                            Deductions
                        </h3>

                        <Separator className="mb-4" />

                        <div className="space-y-2">
                            {(data.deductions || []).map((d, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between text-sm bg-gray-50 px-3 py-2 rounded-lg"
                                >
                                    <span className="text-gray-600">
                                        {d.category}
                                    </span>
                                    <span className="font-semibold text-gray-900">
                                        ₹ {formatINR(d.amount)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* SUGGESTIONS */}
                <Card className="rounded-2xl shadow-md hover:shadow-xl transition">
                    <CardContent className="p-6">
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                            <Lightbulb size={18} />
                            Smart Suggestions
                        </h3>

                        <Separator className="mb-4" />

                        <ul className="space-y-3">
                            {(data.suggestions || []).map((s, i) => (
                                <li
                                    key={i}
                                    className="text-sm bg-blue-50 text-blue-700 px-3 py-2 rounded-lg"
                                >
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Tax;