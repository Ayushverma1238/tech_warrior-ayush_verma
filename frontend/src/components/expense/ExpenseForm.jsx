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

import {
    AlertCircle,
    Plus,
    Pencil,
    CalendarIcon,
} from "lucide-react";

import { format } from "date-fns";

const ExpenseForm = ({ onSubmit, editData, setEditData }) => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        title: "",
        amount: "",
        category: "",
        date: null,
    });

    // LOAD EDIT DATA
    useEffect(() => {
        if (editData) {
            setForm({
                title: editData.title || "",
                amount: editData.amount || "",
                category: editData.category || "",
                date: editData.date ? new Date(editData.date) : null,
            });
            setOpen(true);
        }
    }, [editData]);

    // RESET ON CLOSE
    useEffect(() => {
        if (!open) {
            setForm({
                title: "",
                amount: "",
                category: "",
                date: null,
            });
            setError("");
            setEditData(null);
        }
    }, [open]);

    // HANDLE INPUT CHANGE
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (error) setError("");
    };

    // SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.title || !form.amount) {
            setError("Title and amount are required");
            return;
        }

        onSubmit({
            ...form,
            date: form.date ? format(form.date, "yyyy-MM-dd") : "",
        });

        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* ADD BUTTON */}
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2 shadow-sm">
                    <Plus size={16} /> Add Expense
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[95%] max-w-md sm:max-w-lg rounded-2xl p-6">
                {/* HEADER */}
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
                        <Pencil size={18} />
                        {editData ? "Edit Expense" : "Add Expense"}
                    </DialogTitle>
                </DialogHeader>

                {/* ERROR ALERT */}
                {error && (
                    <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mt-4">
                        <AlertCircle size={18} />
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-5 mt-4">

                    {/* TITLE */}
                    <div className="space-y-1">
                        <label className="text-sm text-gray-600">Title</label>
                        <Input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="e.g. Food, Travel"
                            className={`h-11 ${error && !form.title ? "border-red-500" : ""
                                }`}
                        />
                    </div>

                    {/* AMOUNT */}
                    <div className="space-y-1">
                        <label className="text-sm text-gray-600">Amount</label>
                        <Input
                            name="amount"
                            value={form.amount}
                            onChange={handleChange}
                            type="number"
                            placeholder="₹ 500"
                            className={`h-11 ${error && !form.amount ? "border-red-500" : ""
                                }`}
                        />
                    </div>

                    {/* CATEGORY */}
                    <div className="space-y-1">
                        <label className="text-sm text-gray-600">Category</label>
                        <Input
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            placeholder="Food / Travel / Bills"
                            className="h-11"
                        />
                    </div>

                    {/* DATE (CALENDAR) */}
                    <div className="space-y-1">
                        <label className="text-sm text-gray-600">Date</label>

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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <Button className="w-full">
                            {editData ? "Update Expense" : "Add Expense"}
                        </Button>

                        {editData && (
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => setOpen(false)}
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

export default ExpenseForm;