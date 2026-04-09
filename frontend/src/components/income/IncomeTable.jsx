import { Pencil, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

const IncomeTable = ({ list, onEdit, onDelete }) => {
    return (
        <div className="hidden md:block bg-white rounded-2xl border shadow-sm overflow-hidden">

            {/* TABLE WRAPPER (scroll support) */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">

                    {/* HEADER */}
                    <thead className="bg-gray-50 text-gray-500 sticky top-0 z-10">
                        <tr className="text-xs uppercase tracking-wide">
                            <th className="p-4 text-left">Source</th>
                            <th className="text-left">Amount</th>
                            <th className="text-left">Date</th>
                            <th className="text-right pr-6">Actions</th>
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody>
                        {list.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="text-center py-10 text-gray-400"
                                >
                                    No income records found
                                </td>
                            </tr>
                        ) : (
                            list.map((i, index) => (
                                <tr
                                    key={i.id}
                                    className={`
                                        border-t transition
                                        hover:bg-gray-50
                                        ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"}
                                    `}
                                >
                                    {/* SOURCE */}
                                    <td className="p-4 font-medium text-gray-800">
                                        {i.source}
                                    </td>

                                    {/* AMOUNT */}
                                    <td className="text-green-600 font-semibold">
                                        ₹ {Number(i.amount).toLocaleString()}
                                    </td>

                                    {/* DATE */}
                                    <td className="text-gray-500">
                                        {new Date(i.date).toLocaleDateString()}
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="text-right pr-6">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                title="Edit"
                                                onClick={() => onEdit(i)}
                                                className="p-2 rounded-lg hover:bg-blue-100 cursor-pointer text-blue-600 transition"
                                            >
                                                <Pencil size={16} />
                                            </button>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <button className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 active:scale-95 transition">
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