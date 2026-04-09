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

import { LogOut, User, Menu, ChevronDown } from "lucide-react";
import { SidebarContent } from "./Sidebar";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    return (
        <header className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur-xl px-4 md:px-6 py-3 flex justify-between items-center shadow-sm">

            {/* LEFT SECTION */}
            <div className="flex items-center gap-4">

                {/* MOBILE MENU */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                                <Menu size={20} />
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="left" className="w-64 p-5">
                            <SidebarContent />
                        </SheetContent>
                    </Sheet>
                </div>

                {/* TITLE */}
                <div className="leading-tight">
                    <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
                        Dashboard
                    </h2>
                    <p className="text-xs text-gray-500 hidden sm:block">
                        Welcome back, <span className="font-medium text-gray-700">
                            {user?.name || "User"}
                        </span>
                    </p>
                </div>
            </div>

            {/* RIGHT SECTION */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-gray-100 transition"
                    >
                        <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-linear-to-br from-indigo-500 to-purple-500 text-white text-sm font-semibold">
                                {user?.name?.charAt(0) || "U"}
                            </AvatarFallback>
                        </Avatar>

                        <div className="hidden sm:flex flex-col items-start text-sm">
                            <span className="font-medium text-gray-800 leading-none">
                                {user?.name || "User"}
                            </span>
                            <span className="text-xs text-gray-500">
                                Account
                            </span>
                        </div>

                        <ChevronDown size={16} className="text-gray-500 hidden sm:block" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    className="w-56 rounded-2xl shadow-lg border bg-white/95 backdrop-blur-xl p-2"
                >

                    {/* USER INFO */}
                    <div className="px-3 py-2">
                        <p className="text-sm font-semibold text-gray-800">
                            {user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500">
                            Logged in
                        </p>
                    </div>

                    <DropdownMenuSeparator />

                    {/* PROFILE */}
                    <DropdownMenuItem
                        onClick={() => navigate("/profile")}
                        className="flex items-center gap-2 rounded-lg cursor-pointer hover:bg-gray-100"
                    >
                        <User size={16} />
                        Profile
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {/* LOGOUT */}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                                className="flex items-center gap-2 text-red-600 rounded-lg cursor-pointer hover:bg-red-50"
                            >
                                <LogOut size={16} />
                                Logout
                            </DropdownMenuItem>
                        </AlertDialogTrigger>

                        <AlertDialogContent className="rounded-2xl">
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Confirm Logout
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    You’ll be securely logged out of your account.
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
        </header>
    );
};

export default Navbar;