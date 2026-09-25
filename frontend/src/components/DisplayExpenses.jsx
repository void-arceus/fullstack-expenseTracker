import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getExpenses, deleteExpense } from "../services/expenseService";
import { useToast } from "../context/ToastContext";
import { BarGraph } from "./Chart";

const DisplayExpenses = () => {
  const [expenseData, setExpenseData] = useState([]);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [filterBy, setFilterBy] = useState("all");
  const [filterValue, setFilterValue] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortValue, setSortValue] = useState("desc");
  const filters = useMemo(
    () => ({ filterBy, filterValue, sortBy, sortValue }),
    [filterBy, filterValue, sortBy, sortValue],
  );

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    try {
      const res = await getExpenses(filters);
      setExpenseData(res.data.data);
    } catch (err) {
      showToast("Something went wrong", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      fetchData(filters);
      showToast("Expense Deleted Successfully!", "success");
    } catch (err) {
      showToast("Something went wrong!", "error");
    }
  };

  return (
    <main className="h-fit w-full flex flex-col">
      {/* section to display bar graph */}
      <section className="h-100 w-full p-2">
        <div className="h-full w-full p-2 border-2 border-gray-400 flex flex-col items-start gap-4">
          <h1 className="text-2xl font-medium text-shadow-md">
            Amount Spent Per Category:
          </h1>
          <BarGraph />
        </div>
      </section>

      {/* display the expenses/incomes with filter option and pagination */}
      <section className="w-full flex flex-col gap-2 p-4">
        {/* filter bar*/}
        <div className="h-fit flex items-center justify-between bg-gray-300 p-2 rounded-xl shadow-sm text-md font-medium">
          <div className="flex-4 flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <button className="bg-gray-100 border border-gray-500 py-1.5 shadow-sm px-4 rounded-full cursor-pointer flex items-center gap-2">
                <img src="/filters.png" alt="" className="h-5" />
                Filters
              </button>
              <button
                onClick={() => {
                  setFilterBy("all");
                  setFilterValue("");
                  setSortBy("");
                  setSortValue("desc");
                }}
                className={` ${filterBy === "all" ? "bg-gray-600 text-gray-100" : "bg-gray-100"} border border-transparent py-1.5 shadow-sm px-4 rounded-lg cursor-pointer hover:shadow-md hover:border hover:border-gray-500 flex items-center gap-2`}
              >
                <img src="/show_all.png" alt="all" className="h-5" />
                All
              </button>
              <button
                onClick={() => {
                  setFilterBy("expenseType");
                  setFilterValue("expense");
                }}
                className={` ${filterValue === "expense" ? "bg-gray-600 text-gray-100" : "bg-gray-100"} border border-transparent py-1.5 shadow-sm px-4 rounded-lg cursor-pointer hover:shadow-md hover:border hover:border-gray-500 flex items-center gap-2`}
              >
                <img src="/expense_icon.png" alt="exp-icon" className="h-5" />
                Expense
              </button>
              <button
                onClick={() => {
                  setFilterBy("expenseType");
                  setFilterValue("income");
                }}
                className={` ${filterValue === "income" ? "bg-gray-700 text-gray-100" : "bg-gray-100"} border border-transparent py-1.5 shadow-sm px-4 rounded-lg cursor-pointer hover:shadow-md hover:border hover:border-gray-500 flex items-center gap-2`}
              >
                <img src="income_icon.png" alt="income-icon" className="h-5" />
                Income
              </button>
            </div>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-1 text-md font-medium">
                <img src="/arrow.png" alt="arrow" className="h-5" />
                Sort By:
              </p>
              <button
                onClick={() => {
                  sortBy === "updated" ? setSortBy("") : setSortBy("updated");
                }}
                className={` ${sortBy === "updated" ? "bg-gray-700 text-gray-100" : "bg-gray-100"} border border-transparent py-1.5 shadow-sm px-4 rounded-lg cursor-pointer hover:shadow-md hover:border hover:border-gray-500 flex items-center gap-2`}
              >
                <img src="/date_icon.png" alt="date-icon" className="h-5" />
                updated
              </button>
              <button
                onClick={() => {
                  sortBy === "amount" ? setSortBy("") : setSortBy("amount");
                }}
                className={`${sortBy === "amount" ? "bg-gray-700 text-gray-100" : "bg-gray-100"} border border-transparent py-1.5 shadow-sm px-4 rounded-lg cursor-pointer hover:shadow-md hover:border hover:border-gray-500 flex items-center gap-2`}
              >
                <img src="/money.png" alt="money-icon" className="h-5" />
                Amount
              </button>
              <button
                onClick={() => {
                  sortBy === "createdAt"
                    ? setSortBy("")
                    : setSortBy("createdAt");
                }}
                className={`${sortBy === "createdAt" ? "bg-gray-700 text-gray-100" : "bg-gray-100"} border border-transparent py-1.5 shadow-sm px-4 rounded-lg cursor-pointer hover:shadow-md hover:border hover:border-gray-500 flex items-center gap-2`}
              >
                <img src="/date_icon.png" alt="date-icon" className="h-5" />
                createdAt
              </button>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-md font-medium">Sort Value:</p>
              <button
                onClick={() => {
                  sortValue === "asc" ? setSortValue("") : setSortValue("asc");
                }}
                className={`${sortBy !== "" && sortValue === "asc" ? "bg-gray-700 text-gray-100" : "bg-gray-100"} border border-transparent py-1.5 shadow-sm px-4 rounded-lg cursor-pointer hover:shadow-md hover:border hover:border-gray-500 flex items-center gap-2`}
              >
                <img src="/ascending-sort.png" alt="asc-icon" className="h-5" />
                asc
              </button>
              <button
                onClick={() => {
                  sortValue === "desc"
                    ? setSortValue("")
                    : setSortValue("desc");
                }}
                className={`${sortBy !== "" && sortValue === "desc" ? "bg-gray-700 text-gray-100" : "bg-gray-100"} border border-transparent py-1.5 shadow-sm px-4 rounded-lg cursor-pointer hover:shadow-md hover:border hover:border-gray-500 flex items-center gap-2`}
              >
                <img
                  src="descending_sort.png"
                  alt="desc-icon"
                  className="h-5"
                />
                desc
              </button>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-end">
            <button
              onClick={() => {
                navigate("/addExpense");
              }}
              className="bg-gray-800 text-gray-100 font-medium py-1.5 px-2.5 rounded-lg cursor-pointer shadow-md hover:shadow-lg hover:opacity-95"
            >
              Add Expense
            </button>
          </div>
        </div>

        {/* expense table */}
        <div className="border min-w-sm border-gray-300 w-full rounded-xl shadow-xl overflow-scroll">
          {expenseData.length > 0 ? (
            <div className="w-full">
              <div className="w-full grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr_1fr_1fr] bg-gray-300 sticky top-0 z-10 rounded-t-xl p-2.5">
                <h1 className="text-md font-medium">Name</h1>
                <h1 className="text-md font-medium">Description</h1>
                <h1 className="text-md font-medium">Amount</h1>
                <h1 className="text-md font-medium">Type</h1>
                <h1 className="text-md font-medium">Category</h1>
                <h1 className="text-md font-medium">CreatedAt</h1>
                <h1 className="text-md font-medium">UpdatedAt</h1>
                <h1 className="text-md font-medium">Edit/Delete</h1>
              </div>
              {expenseData.map((exp) => (
                <div
                  key={exp._id}
                  className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr_1fr_1fr] last:rounded-b-xl p-2.5 odd:bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                >
                  <p>{exp.name}</p>
                  <p>{exp.description}</p>
                  <p
                    className={`${exp.expenseType === "expense" ? "text-red-500" : "text-green-500"}`}
                  >
                    {`${exp.expenseType === "expense" ? "-" : "+"}` +
                      exp.amount}
                  </p>
                  <p>{exp.expenseType}</p>
                  <p>{exp.category}</p>
                  <p>{exp.createdAt}</p>
                  <p>{exp.updatedAt}</p>
                  <div className="flex items-center gap-4">
                    <button className="cursor-pointer">
                      <img src="/edit-text.png" alt="edit" className="h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(exp._id)}
                      className="cursor-pointer"
                    >
                      <img src="/delete.png" alt="delete" className="h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-40 w-full flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <h1 className="lg:text-6xl md:text-5xl text-2xl font-bold text-red-600 text-shadow-lg duration-300 ease-in-out">
                  No Expense/Income Found!
                </h1>
                <button
                  onClick={() => {
                    navigate("/addExpense");
                  }}
                  className="bg-gray-800  text-gray-100 font-medium py-1.5 px-4 rounded-lg cursor-pointer shadow-md hover:shadow-lg hover:opacity-95"
                >
                  Add +
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default DisplayExpenses;
