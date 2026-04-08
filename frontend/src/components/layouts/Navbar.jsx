import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <div className="flex gap-5 bg-linear-to-tr from-gray-800 to-slate-700 w-full border border-b border-gray-200/50 backdrop:blur-[2px] py-4 px-7 sticky top-0 z-30">
      <button
        className="block lg:hidden text-white"
        onClick={() => {
          setOpenSideMenu(!openSideMenu);
        }}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <h2 className="text-lg font-medium text-white">Expense Tracker</h2>
      {openSideMenu && (
        <div className="fixed top-15.25 left-0 w-64 h-full bg-linear-to-br from-gray-800 to-slate-700 shadow-lg z-40 lg:hidden">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;