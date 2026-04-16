import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { useToast } from "../context/ToastContext";
import { ShowPieChart } from "./Chart";
import Navbar from "./Navbar";
import SummaryCard from "./SummaryCard";
import axios from "axios";

const Dashboard = () => {
  const [expenseData, setExpenseData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    if (isLoggedIn) {
      getExpenses();
    }
  }, [isLoggedIn]);

  function getExpenses() {
    axios
      .get(`http://localhost:3000/api/expense/getExpenses?limit=5`)
      .then((res) => {
        setExpenseData(res.data.data.data);
      })
      .catch((err) => {
        setExpenseData([]);
      });
  }

  function handleDeleteExpense(id) {
    axios
      .delete(`http://localhost:3000/api/expense/deleteExpense/${id}`)
      .then(() => {
        showToast("Expense Deleted Successfully", "success");
        getExpenses();
      })
      .catch((err) => {
        const message = err.response.data.message || "Something went wrong";
        showToast(message, "error");
      });
  }

  return (
    <main className="h-full w-full flex flex-col m-auto">
      {/* navbar */}
      <Navbar />

      {/* display recent expenses */}
      <section className="h-full flex flex-col">
        <div className={`w-full h-full`}>
          <div className="w-full h-fit">
            <SummaryCard />
          </div>
          <div className="w-full h-fit p-2">
            <ShowPieChart />
          </div>
        </div>

        <div className="w-full flex flex-col p-2">
          <div className="w-full flex items-center justify-between gap-4 py-3">
            <div>
              <h2 className="text-sm font-medium text-gray-600">
                Recent Transactions
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  navigate("/viewExpenses");
                }}
                className="bg-gray-200 text-sm font-medium py-1.5 px-3 rounded-lg cursor-pointer shadow-sm hover:shadow-md"
              >
                View All
              </button>
              <button
                onClick={() => {
                  navigate("/addExpense", {
                    state: { from: location.pathname },
                  });
                }}
                className="bg-gray-800 text-gray-100 text-sm font-medium py-1.5 px-2.5 rounded-lg cursor-pointer shadow-md hover:shadow-lg hover:opacity-95"
              >
                Add Expense
              </button>
            </div>
          </div>
          <div className="w-full border border-gray-300 rounded-xl shadow-xl overflow-x-auto">
            {expenseData.length > 0 ? (
              <div className="w-full overflow-x-auto">
                <div className="min-w-305">
                  <div className="grid grid-cols-[120px_300px_120px_120px_120px_160px_160px_120px] gap-x-2 bg-gray-300 sticky top-0 z-10 rounded-t-xl p-2.5">
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
                      className="grid grid-cols-[120px_300px_120px_120px_120px_160px_160px_120px] gap-x-2 p-2 min-w-0 odd:bg-gray-100 hover:bg-gray-200 text-sm"
                    >
                      <p>{exp.name}</p>
                      <p>{exp.description}</p>
                      <p
                        className={`${exp.expenseType === "expense" ? "text-red-500" : "text-green-500"} `}
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
                          <img
                            src="/edit-text.png"
                            alt="edit"
                            className="h-5"
                          />
                        </button>
                        <button
                          onClick={() => handleDeleteExpense(exp._id)}
                          className="cursor-pointer"
                        >
                          <img src="/delete.png" alt="delete" className="h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="w-full bg-red-500">
                No Expense / Income found!
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
