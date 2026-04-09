import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "../ui/dropdown-menu";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "../ui/sheet";

import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "../ui/alert-dialog";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

import { LogOut, User, Menu } from "lucide-react";
import { SidebarContent } from "./Sidebar";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="border-b bg-white/70 backdrop-blur-md px-4 md:px-6 py-3 flex justify-between items-center">

            {/* LEFT */}
            <div className="flex items-center gap-3">

                {/* MOBILE MENU */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu size={20} />
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="left" className="w-64 p-5">
                            <SidebarContent />
                        </SheetContent>
                    </Sheet>
                </div>

                {/* TITLE */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Dashboard
                    </h2>
                    <p className="text-xs text-gray-500 hidden sm:block">
                        Welcome back, {user?.name || "User"}
                    </p>
                </div>
            </div>

            {/* RIGHT */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                        <Avatar>
                            <AvatarFallback>
                                {user?.name?.charAt(0) || "U"}
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-44 rounded-xl">

                    {/* PROFILE */}
                    <DropdownMenuItem
                        onClick={() => navigate("/profile")}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <User size={16} />
                        Profile
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {/* ✅ LOGOUT WITH CONFIRM */}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()} // 🔥 VERY IMPORTANT
                                className="flex items-center gap-2 text-red-600 cursor-pointer"
                            >
                                <LogOut size={16} />
                                Logout
                            </DropdownMenuItem>
                        </AlertDialogTrigger>

                        <AlertDialogContent className="rounded-xl">
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you sure you want to logout?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    You will be logged out of your account.
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                                <AlertDialogCancel>
                                    Cancel
                                </AlertDialogCancel>

                                <AlertDialogAction
                                    onClick={() => dispatch(logout())}
                                    className="bg-red-600 hover:bg-red-700"
                                >
                                    Logout
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default Navbar;






















