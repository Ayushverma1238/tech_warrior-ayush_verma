const Card = ({ title, value, color = "text-gray-800" }) => {
    return (
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-gray-500">{title}</h3>
            <p className={`text-2xl font-bold mt-2 ${color}`}>
                ₹ {value}
            </p>
        </div>
    );
};

export default Card;