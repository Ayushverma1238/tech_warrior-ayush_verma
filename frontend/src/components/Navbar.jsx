const Navbar = () => {
    return (
        <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Dashboard</h2>

            <div className="flex items-center gap-4">
                <span className="text-gray-600">Hello, User</span>
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
            </div>
        </div>
    );
};

export default Navbar;