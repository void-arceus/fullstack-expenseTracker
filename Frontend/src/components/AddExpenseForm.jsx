import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import axios from "axios";

const AddExpenseForm = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  function handleCreateExpense(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const obj = Object.fromEntries(formData.entries());
    if (!obj.name || !obj.description || !obj.amount) {
      showToast("Missing Credentials", "error");
      return;
    }
    if (isNaN(Number(obj.amount))) {
      showToast("Invalid Amount", "error");
      return;
    }
    // calling api
    axios
      .post(`http://localhost:3000/api/expense/addExpense`, obj)
      .then(() => {
        showToast("Expense Created Successfully", "success");
        navigate("/");
      })
      .catch((err) => {
        const message = err.response.data.message;
        showToast(message, "error");
      });
  }

  return (
    <div className="h-screen w-full relative">
      <div className="border border-gray-200 rounded-2xl sm:w-lg w-11/12 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 py-6 shadow-lg ease-in-out duration-200">
        <div className="w-full text-center p-4">
          <h1 className="text-3xl font-medium text-shadow-lg">
            Create Expense
          </h1>
        </div>
        <form
          onSubmit={handleCreateExpense}
          className="p-2 flex flex-col items-center gap-4"
        >
          <input
            name="name"
            placeholder="Expense Name"
            className="w-full border-2 border-gray-400 p-2 rounded-lg outline-0 focus:border-gray-600"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            className="w-full border-2 resize-none p-2 border-gray-400 rounded-lg outline-0 focus:border-gray-600"
            required
          />

          <div className="w-full flex">
            <div className="flex-2 flex gap-2 items-center">
              <label htmlFor="expenseType" className="text-md font-medium">
                Expense Type:
              </label>
              <select
                name="expenseType"
                className="border-2 p-2 border-gray-400 rounded-lg cursor-pointer"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div className="flex-1">
              <input
                name="amount"
                type="text"
                placeholder="Amount"
                className="w-full border-2 border-gray-400 rounded-lg p-2 outline-0 focus:border-gray-600"
              />
            </div>
          </div>

          <div className="w-full flex items-center gap-3">
            <label htmlFor="category" className="text-md font-medium">
              Category:
            </label>
            <select
              name="category"
              className="border-2 border-gray-400 p-2 rounded-lg cursor-pointer"
            >
              <option value="food">Food</option>
              <option value="travel">Travel</option>
              <option value="shopping">Shopping</option>
              <option value="bills">Bills</option>
              <option value="entertainment">Entertainment</option>
              <option value="health">Health</option>
              <option value="education">Education</option>
              <option value="rent">Rent</option>
              <option value="subscription">Subscription</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="w-full flex flex-col items-center gap-3">
            <button
              type="submit"
              className="w-full bg-gray-800 p-2 rounded-lg text-gray-100 text-md font-medium cursor-pointer hover:opacity-95 shadow-md"
            >
              Create Expense
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
              className="w-full bg-gray-300 p-2 rounded-lg text-md font-medium cursor-pointer hover:bg-gray-200 shadow-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseForm;
