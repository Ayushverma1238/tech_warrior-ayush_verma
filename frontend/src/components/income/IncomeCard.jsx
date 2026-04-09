import {
    Pencil,
    Trash2,
    CalendarDays,
    IndianRupee,
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
} from "@/components/ui/alert-dialog";

const IncomeCard = ({ list, onEdit, onDelete }) => {
    if (!list.length) return null;

    return (
        <div className="md:hidden space-y-4">
            {list.map((i) => (
                <div
                    key={i.id}
                    className="bg-white rounded-2xl border shadow-sm p-4 space-y-4 transition hover:shadow-md active:scale-[0.99]"
                >
                    {/* HEADER */}
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <p className="font-semibold text-gray-800 text-base">
                                {i.source}
                            </p>

                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <CalendarDays size={14} />
                                {new Date(i.date).toLocaleDateString()}
                            </div>
                        </div>

                        <div className="flex items-center gap-1 text-green-600 font-bold text-lg">
                            <IndianRupee size={16} />
                            {Number(i.amount).toLocaleString()}
                        </div>
                    </div>

                    {/* DIVIDER */}
                    <div className="border-t border-gray-100" />

                    {/* FOOTER */}
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">
                            Manage entry
                        </span>

                        <div className="flex gap-2">

                            {/* EDIT */}
                            <button
                                onClick={() => onEdit(i)}
                                className="p-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 active:scale-95 transition"
                            >
                                <Pencil size={16} />
                            </button>

                            {/* DELETE WITH CONFIRM */}
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <button className="p-2.5 rounded-xl bg-red-50 text-red-600 cursor-pointer hover:bg-red-100 active:scale-95 transition">
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
                                            className="bg-red-600 cursor-pointer hover:bg-red-700"
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

export default IncomeCard;