import {
    Pencil,
    Trash2,
    IndianRupee,
    CalendarDays,
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

const ExpenseTable = ({ list, onEdit, onDelete }) => {
    return (
        <div className="hidden md:block bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

            <div className="overflow-x-auto">
                <table className="w-full text-sm">

                    {/* HEADER */}
                    <thead className="bg-gray-50/80 backdrop-blur sticky top-0 z-10 border-b">
                        <tr className="text-xs uppercase tracking-wider text-gray-500">
                            <th className="p-4 text-left">Title</th>
                            <th className="text-left">Amount</th>
                            <th className="text-left">Category</th>
                            <th className="text-left">Date</th>
                            <th className="text-right pr-6">Actions</th>
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody className="divide-y divide-gray-100">
                        {list.map((e) => (
                            <tr
                                key={e.id}
                                className="group hover:bg-gray-50/70 transition"
                            >
                                {/* TITLE */}
                                <td className="p-4">
                                    <div className="font-medium text-gray-900">
                                        {e.title}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        Expense item
                                    </div>
                                </td>

                                {/* AMOUNT */}
                                <td>
                                    <div className="flex items-center gap-1 font-semibold text-red-600">
                                        <IndianRupee size={14} />
                                        {formatINR(e.amount)}
                                    </div>
                                </td>

                                {/* CATEGORY */}
                                <td>
                                    <div className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md">
                                        <Tag size={12} />
                                        {e.category}
                                    </div>
                                </td>

                                {/* DATE */}
                                <td className="text-gray-500 text-sm">
                                    <div className="flex items-center gap-1">
                                        <CalendarDays size={14} />
                                        {new Date(e.date).toLocaleDateString()}
                                    </div>
                                </td>

                                {/* ACTIONS */}
                                <td className="pr-6">
                                    <div className="flex justify-end items-center gap-2 opacity-70 group-hover:opacity-100 transition">

                                        {/* EDIT */}
                                        <button
                                            onClick={() => onEdit(e)}
                                            className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition hover:scale-105"
                                        >
                                            <Pencil size={16} />
                                        </button>

                                        {/* DELETE */}
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <button className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition hover:scale-105">
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
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ExpenseTable;