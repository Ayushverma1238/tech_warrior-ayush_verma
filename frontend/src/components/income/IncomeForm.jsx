import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { format } from "date-fns";
import { CalendarIcon, Plus, Pencil, AlertCircle } from "lucide-react";

const IncomeForm = ({ onSubmit, editData, setEditData }) => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        source: "",
        amount: "",
        date: null,
    });

    useEffect(() => {
        if (editData) {
            setForm({
                source: editData.source || "",
                amount: editData.amount || "",
                date: editData.date ? new Date(editData.date) : null,
            });
            setOpen(true);
        }
    }, [editData]);

    useEffect(() => {
        if (!open) {
            setError("");
            setForm({ source: "", amount: "", date: null });
        }
    }, [open]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (error) setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.source || !form.amount) {
            setError("Source and amount are required");
            return;
        }

        onSubmit({
            ...form,
            date: form.date ? format(form.date, "yyyy-MM-dd") : "",
        });

        setEditData(null);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* ADD BUTTON */}
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2 shadow-sm">
                    <Plus size={16} /> Add Income
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[95%] max-w-md sm:max-w-lg rounded-2xl p-6">

                {/* HEADER */}
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
                        <Pencil size={18} />
                        {editData ? "Edit Income" : "Add Income"}
                    </DialogTitle>
                </DialogHeader>

                {error && (
                    <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mt-4">
                        <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 mt-4"
                >
                    {/* SOURCE */}
                    <div className="space-y-1">
                        <label className="text-sm text-gray-600">
                            Income Source
                        </label>
                        <Input
                            name="source"
                            value={form.source}
                            onChange={handleChange}
                            placeholder="e.g. Salary, Freelance"
                            className={`h-11 ${error && !form.source ? "border-red-500 focus:ring-red-500" : ""}`}
                        />
                    </div>

                    {/* AMOUNT */}
                    <div className="space-y-1">
                        <label className="text-sm text-gray-600">
                            Amount
                        </label>
                        <Input
                            name="amount"
                            value={form.amount}
                            onChange={handleChange}
                            type="number"
                            placeholder="₹ 5000"
                            className={`h-11 ${error && !form.amount ? "border-red-500 focus:ring-red-500" : ""}`}
                        />
                    </div>

                    {/* DATE PICKER */}
                    <div className="space-y-1">
                        <label className="text-sm text-gray-600">
                            Date
                        </label>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full justify-start h-11 text-left font-normal"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {form.date
                                        ? format(form.date, "PPP")
                                        : "Pick a date"}
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={form.date}
                                    onSelect={(date) =>
                                        setForm({ ...form, date })
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* BUTTONS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                        <Button className="w-full cursor-pointer">
                            {editData ? "Update Income" : "Add Income"}
                        </Button>

                        {editData && (
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full cursor-pointer"
                                onClick={() => {
                                    setEditData(null);
                                    setOpen(false);
                                }}
                            >
                                Cancel
                            </Button>
                        )}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default IncomeForm;