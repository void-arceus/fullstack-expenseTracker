import { useState, useEffect } from "react";
import { useFinance } from "../context/FinanceContext";
import { useToast } from "../context/ToastContext";
import { getExpenses } from "../services/expenseService";

const SummaryCard = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [income, setIncome] = useState(0);
  const [spending, setSpending] = useState(0);
  const [saving, setSaving] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [overBudget, setOverBudget] = useState(false);
  const { budget, updateBudget } = useFinance();
  const { showToast } = useToast();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (expenseData.length > 0) {
      calculateData(expenseData, budget);
    }
  }, [expenseData, budget]);

  async function getData() {
    try {
      const res = await getExpenses({});
      setExpenseData(res.data.data);
    } catch (err) {
      showToast("Something went wrong", "error");
    }
  }

  function calculateData(data, budget) {
    let incomeSum = 0,
      expenseSum = 0;
    data.forEach((el) => {
      if (el.expenseType === "income") {
        incomeSum += el.amount;
      } else {
        expenseSum += el.amount;
      }
    });
    setIncome(incomeSum);
    setSpending(expenseSum);

    let remainingAmount = Math.max(budget - expenseSum, 0);
    let savingAmount = Math.max(incomeSum - expenseSum, 0);

    setRemaining(remainingAmount);
    setSaving(savingAmount);

    setOverBudget(expenseSum > budget);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData.entries());
    if (!formObj.budget) {
      showToast("Budget Amount is required", "error");
      return;
    }
    if (formObj.budget < 0) {
      showToast("Budget Amount Cannot be Negative", "error");
      return;
    }
    try {
      await updateBudget(formObj);
      showToast("Budget Updated Successfully!", "success");
      setIsEditing(false);
    } catch (err) {
      showToast("Something went wrong", "error");
    }
  }

  return (
    <div className="border-box h-full w-full p-2">
      <div className="w-1/2 h-full flex flex-col items-start gap-1 border border-gray-200 rounded-xl p-4 shadow-md cursor-pointer hover:shadow-lg">
        <div>
          <h1 className="text-xl font-bold">Total Income: ₹ {income}</h1>
        </div>
        <div>
          <h1 className="text-xl font-bold">Total Spending: ₹ {spending}</h1>
        </div>
        <div>
          <h1 className="text-xl font-bold">Remaining: ₹ {remaining}</h1>
        </div>
        <div>
          <h1 className="text-xl font-bold">Savings: ₹ {saving}</h1>
        </div>
        <div className="w-full flex flex-col gap-2">
          <h1 className="text-xl font-bold">Budget: ₹ {budget}</h1>
          <div className="w-full">
            {isEditing ? (
              <div className="w-full">
                <form
                  onSubmit={handleFormSubmit}
                  className="flex flex-col gap-4 w-full"
                >
                  <input
                    name="budget"
                    type="number"
                    defaultValue={budget}
                    placeholder="Budget Amount"
                    className="border-2 border-gray-400 outline-0 md:w-xs w-full p-1.5 rounded-lg focus:border-gray-700"
                  />
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setIsEditing(false);
                      }}
                      className="bg-gray-300 px-4 py-1.5 font-medium rounded-lg border border-gray-300 shadow-md cursor-pointer hover:shadow-lg hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-gray-900 px-4 py-1.5 rounded-lg text-gray-100 font-medium cursor-pointer shadow-md hover:shadow-lg hover:opacity-90"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsEditing(true);
                }}
                className="bg-gray-900 text-gray-100 font-medium px-4 py-2 rounded-xl cursor-pointer shadow-lg hover:shadow-xl"
              >
                Edit Budget
              </button>
            )}
          </div>
        </div>
        <div className="h-full flex items-center">
          <h1
            className={`${overBudget ? "text-red-500" : "text-green-500"} text-lg font-medium`}
          >
            {overBudget
              ? "You exceeded the Budget"
              : "You are within the Budget"}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
