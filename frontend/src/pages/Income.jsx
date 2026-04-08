import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIncome } from "../features/income/incomeSlice";

const Income = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.income);

  useEffect(() => {
    dispatch(fetchIncome());
  }, [dispatch]);

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Source</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {list.map((i) => (
              <tr key={i.id} className="text-center border-t">
                <td>{i.source}</td>
                <td>₹ {i.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Income;
