import { Pencil, Trash2, IndianRupee } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";

// ✅ Utility
const formatINR = (num) =>
    new Intl.NumberFormat("en-IN").format(num);

const IncomeTable = ({ list, onEdit, onDelete }) => {
    return (
        <div className="hidden md:block bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

            {/* TABLE WRAPPER */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">

                    {/* HEADER */}
                    <thead className="bg-gray-50/80 backdrop-blur sticky top-0 z-10 border-b">
                        <tr className="text-xs uppercase tracking-wider text-gray-500">
                            <th className="p-4 text-left font-medium">Source</th>
                            <th className="text-left font-medium">Amount</th>
                            <th className="text-left font-medium">Date</th>
                            <th className="text-right pr-6 font-medium">Actions</th>
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody className="divide-y divide-gray-100">
                        {list.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="text-center py-16 text-gray-400"
                                >
                                    No income records found
                                </td>
                            </tr>
                        ) : (
                            list.map((i) => (
                                <tr
                                    key={i.id}
                                    className="group transition-all hover:bg-gray-50/70"
                                >
                                    {/* SOURCE */}
                                    <td className="p-4">
                                        <div className="font-medium text-gray-900">
                                            {i.source}
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            Income source
                                        </div>
                                    </td>

                                    {/* AMOUNT */}
                                    <td>
                                        <div className="flex items-center gap-1 font-semibold text-green-600">
                                            <IndianRupee size={14} />
                                            {formatINR(i.amount)}
                                        </div>
                                    </td>

                                    {/* DATE */}
                                    <td className="text-gray-500 text-sm">
                                        {new Date(i.date).toLocaleDateString()}
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="pr-6">
                                        <div className="flex justify-end items-center gap-2 opacity-70 group-hover:opacity-100 transition">

                                            {/* EDIT */}
                                            <button
                                                title="Edit"
                                                onClick={() => onEdit(i)}
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
                                                            Delete this income?
                                                        </AlertDialogTitle>
                                                        <p className="text-sm text-gray-500">
                                                            This action cannot be undone.
                                                        </p>
                                                    </AlertDialogHeader>

                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            Cancel
                                                        </AlertDialogCancel>

                                                        <AlertDialogAction
                                                            onClick={() => onDelete(i.id)}
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
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default IncomeTable;