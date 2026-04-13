import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { useToast } from "../context/ToastContext";
import SummaryCard from "./SummaryCard";
import axios from "axios";

const Dashboard = () => {
  const [expenseData, setExpenseData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, logout, user, loading } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    if (isLoggedIn) {
      getExpenses();
    }
  }, [isLoggedIn]);

  function handleLogoutUser() {
    axios
      .post(`http://localhost:3000/api/auth/logout`)
      .then(() => {
        logout();
        showToast("Logged out successfully", "success");
        navigate("/login");
      })
      .catch((err) => {
        let message = err.response.data.message || "Something went wrong";
        showToast(message, "error");
      });
  }

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
    <main className="h-screen w-full flex flex-col m-auto">
      {/* navbar */}
      <section className="max-h-1/2 w-full border-b border-gray-200 flex items-center justify-between py-4 px-6">
        <div className="flex-1 text-2xl font-bold text-shadow-lg">
          ExpenseTracker
        </div>
        <div className="flex items-center">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold underline">
                {!loading && user.name}
              </h2>
              <button
                onClick={handleLogoutUser}
                className="bg-gray-800 py-1.5 px-4 rounded-lg text-gray-100 font-medium text-md cursor-pointer hover:opacity-90 hover:shadow-xl"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="bg-gray-100 flex items-center gap-2 py-2 px-4 rounded-lg cursor-pointer shadow-md hover:shadow-lg text-md font-medium"
              >
                <img
                  src="/login_logo.png"
                  alt="login-logo"
                  className="h-6 w-6"
                />
                Login
              </button>
              <button
                onClick={() => {
                  navigate("/register");
                }}
                className="bg-gray-900 py-2 px-4 rounded-lg flex items-center gap-2 text-white cursor-pointer shadow-md hover:shadow-lg text-md font-medium"
              >
                <img
                  src="/register_logo.png"
                  alt="register-logo"
                  className="h-6 w-6 bg-white rounded-sm"
                />
                Signup
              </button>
            </div>
          )}
        </div>
      </section>

      {/* display recent expenses */}
      <section className="h-full flex flex-col">
        <div className="max-h-1/2 flex-1">
          <div className="h-full p-2">
            <SummaryCard />
          </div>
          <div></div>
        </div>
        <div className="h-1/2 flex flex-col items-center w-full p-4">
          <div className="w-full flex-1 flex items-center justify-between gap-4 py-2.5">
            <div>
              <h2 className="text-lg font-medium text-gray-600">
                Recent Transactions
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  navigate("/viewExpenses");
                }}
                className="bg-gray-200 text-md font-medium py-1.5 px-3 rounded-lg cursor-pointer shadow-sm hover:shadow-md"
              >
                View All
              </button>
              <button
                onClick={() => {
                  navigate("/addExpense", {
                    state: { from: location.pathname },
                  });
                }}
                className="bg-gray-800 text-gray-100 font-medium py-1.5 px-2.5 rounded-lg cursor-pointer shadow-md hover:shadow-lg hover:opacity-95"
              >
                Add Expense
              </button>
            </div>
          </div>
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
                        onClick={() => handleDeleteExpense(exp._id)}
                        className="cursor-pointer"
                      >
                        <img src="/delete.png" alt="delete" className="h-5" />
                      </button>
                    </div>
                  </div>
                ))}
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
