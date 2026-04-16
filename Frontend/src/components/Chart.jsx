import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useFinance } from "../context/FinanceContext";
import { useState, useEffect } from "react";
import { getExpenses } from "../services/expenseService";
import { useToast } from "../context/ToastContext";

export const ShowPieChart = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [data, setData] = useState([]);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const { budget } = useFinance();
  const { showToast } = useToast();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (expenseData.length > 0) {
      const result = calculateData(expenseData, budget);
      setData(result);
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
    let remainingAmount = Math.max(budget - expenseSum, 0);
    let savingAmount = Math.max(incomeSum - expenseSum, 0);
    return [
      { name: "Income", value: incomeSum },
      { name: "Spending", value: expenseSum },
      { name: "Remaining", value: remainingAmount },
      { name: "Saving", value: savingAmount },
    ];
  }

  return (
    <div className="h-full w-full p-2 border border-gray-300 rounded-xl shadow-lg flex items-center justify-center">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            labelLine={false}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const BarGraph = () => {
  const [graphData, setGraphData] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const res = await getExpenses({});
      const data = groupByCategory(res.data.data);
      setGraphData(data);
    } catch (err) {
      console.log(err);
      showToast("Something went wrong", "error");
    }
  }

  function groupByCategory(data) {
    const map = {
      food: 0,
      travel: 0,
      shopping: 0,
      bills: 0,
      entertainment: 0,
      health: 0,
      education: 0,
      rent: 0,
      subscription: 0,
      other: 0,
    };
    data.forEach((el) => {
      const category = el.category;
      map[category] += el.amount;
    });
    return Object.keys(map).map((key) => ({
      category: key,
      amount: map[key],
    }));
  }

  if (!graphData.length) return <p>No data</p>;

  return (
    <div className="w-full h-full">
      <ResponsiveContainer>
        <BarChart data={graphData} barCategoryGap="40%">
          <CartesianGrid strokeDasharray="0" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="amount"
            fill="#8884d8"
            barSize={50}
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
