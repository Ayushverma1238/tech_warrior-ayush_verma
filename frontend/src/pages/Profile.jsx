import { useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail } from "lucide-react";

const Profile = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="p-4 sm:p-6 md:p-10 min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100">

            <div className="max-w-4xl mx-auto space-y-8">

                {/* HEADER CARD */}
                <Card className="rounded-3xl shadow-lg border-0 overflow-hidden bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
                    <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-center gap-6">

                        {/* AVATAR */}
                        <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-white shadow-lg">
                            <AvatarFallback className="text-2xl font-semibold bg-white text-indigo-600">
                                {user?.name?.charAt(0) || "U"}
                            </AvatarFallback>
                        </Avatar>

                        {/* USER INFO */}
                        <div className="text-center sm:text-left">
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                                {user?.name || "User"}
                            </h2>
                            <p className="text-sm opacity-90 mt-1">
                                {user?.email || "email@example.com"}
                            </p>

                            {/* Badge */}
                            <span className="inline-block mt-3 px-3 py-1 text-xs bg-white/20 rounded-full backdrop-blur">
                                Active Account
                            </span>
                        </div>
                    </CardContent>
                </Card>

                {/* 💎 DETAILS CARD */}
                <Card className="rounded-3xl shadow-md border bg-white/80 backdrop-blur">
                    <CardContent className="p-6 sm:p-8">

                        <h3 className="text-xl font-semibold mb-6 text-gray-800">
                            Personal Information
                        </h3>

                        {/* GRID */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            {/* NAME */}
                            <div className="flex items-center gap-4 p-4 rounded-2xl border bg-white hover:shadow-md transition group">
                                <div className="p-3 rounded-xl bg-indigo-100 group-hover:bg-indigo-200 transition">
                                    <User size={18} className="text-indigo-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">
                                        Full Name
                                    </p>
                                    <p className="font-semibold text-gray-800">
                                        {user?.name || "-"}
                                    </p>
                                </div>
                            </div>

                            {/* EMAIL */}
                            <div className="flex items-center gap-4 p-4 rounded-2xl border bg-white hover:shadow-md transition group">
                                <div className="p-3 rounded-xl bg-purple-100 group-hover:bg-purple-200 transition">
                                    <Mail size={18} className="text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">
                                        Email Address
                                    </p>
                                    <p className="font-semibold text-gray-800 break-all">
                                        {user?.email || "-"}
                                    </p>
                                </div>
                            </div>

                        </div>

                    </CardContent>
                </Card>

            </div>
        </div>
    );
};

export default Profile;