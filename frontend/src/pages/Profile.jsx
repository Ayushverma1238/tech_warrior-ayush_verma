import { useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail } from "lucide-react";

const Profile = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="p-4 sm:p-6 md:p-10">

            <div className="max-w-4xl mx-auto space-y-6">

                {/* HEADER CARD */}
                <Card className="rounded-2xl shadow-md">
                    <CardContent className="p-5 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">

                        {/* AVATAR */}
                        <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
                            <AvatarFallback className="text-xl">
                                {user?.name?.charAt(0) || "U"}
                            </AvatarFallback>
                        </Avatar>

                        {/* USER INFO */}
                        <div className="text-center sm:text-left">
                            <h2 className="text-xl sm:text-2xl font-semibold">
                                {user?.name}
                            </h2>
                            <p className="text-sm text-gray-500">
                                {user?.email}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* DETAILS */}
                <Card className="rounded-2xl shadow-md">
                    <CardContent className="p-5 sm:p-6">

                        <h3 className="text-lg font-semibold mb-4">
                            Personal Information
                        </h3>

                        {/* GRID (Responsive) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* NAME */}
                            <div className="flex items-center gap-3 border p-3 rounded-xl hover:shadow-sm transition">
                                <User size={18} className="text-gray-500" />
                                <div>
                                    <p className="text-xs text-gray-500">
                                        Full Name
                                    </p>
                                    <p className="font-medium">
                                        {user?.name}
                                    </p>
                                </div>
                            </div>

                            {/* EMAIL */}
                            <div className="flex items-center gap-3 border p-3 rounded-xl hover:shadow-sm transition">
                                <Mail size={18} className="text-gray-500" />
                                <div>
                                    <p className="text-xs text-gray-500">
                                        Email Address
                                    </p>
                                    <p className="font-medium break-all">
                                        {user?.email}
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