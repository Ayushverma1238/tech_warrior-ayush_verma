import {
    Pencil,
    Trash2,
    CalendarDays,
    IndianRupee,
    Tag,
} from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogTrigger,
    AlertDialogDescription,
} from "@/components/ui/alert-dialog";

// ✅ Utility
const formatINR = (num) =>
    new Intl.NumberFormat("en-IN").format(num);

const ExpenseCard = ({ list, onEdit, onDelete }) => {
    if (!list.length) return null;

    return (
        <div className="md:hidden space-y-5">
            {list.map((e) => (
                <div
                    key={e.id}
                    className="relative bg-white/80 backdrop-blur rounded-2xl border border-gray-200 shadow-sm p-4 space-y-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                    {/* 💸 AMOUNT BADGE */}
                    <div className="absolute top-4 right-4 bg-red-50 text-red-600 px-3 py-1 rounded-full flex items-center gap-1 text-sm font-semibold">
                        <IndianRupee size={14} />
                        {formatINR(e.amount)}
                    </div>

                    {/* HEADER */}
                    <div className="space-y-2 pr-16">
                        <p className="font-semibold text-gray-900 text-base leading-tight">
                            {e.title}
                        </p>

                        {/* CATEGORY */}
                        <div className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md w-fit">
                            <Tag size={12} />
                            {e.category}
                        </div>

                        {/* DATE */}
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                            <CalendarDays size={14} />
                            {new Date(e.date).toLocaleDateString()}
                        </div>
                    </div>

                    {/* DIVIDER */}
                    <div className="border-t border-gray-100" />

                    {/* FOOTER */}
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">
                            Manage expense
                        </span>

                        <div className="flex items-center gap-2">

                            {/* EDIT */}
                            <button
                                onClick={() => onEdit(e)}
                                className="p-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 hover:scale-105 active:scale-95 transition"
                            >
                                <Pencil size={16} />
                            </button>

                            {/* DELETE */}
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <button className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 hover:scale-105 active:scale-95 transition">
                                        <Trash2 size={16} />
                                    </button>
                                </AlertDialogTrigger>

                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Delete this expense?
                                        </AlertDialogTitle>

                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your expense.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>

                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>

                                        <AlertDialogAction
                                            onClick={() => onDelete(e.id)}
                                            className="bg-red-600 hover:bg-red-700"
                                        >
                                            Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ExpenseCard;