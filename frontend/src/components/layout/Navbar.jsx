import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "../ui/dropdown-menu";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

const Navbar = () => {
    const dispatch = useDispatch();

    return (
        <div className="border-b bg-background px-4 py-3 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Dashboard</h2>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                        <AvatarFallback>AY</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => dispatch(logout())}>
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default Navbar;