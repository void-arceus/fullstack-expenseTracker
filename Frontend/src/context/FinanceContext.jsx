import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const FinanceContext = createContext();
const BASE_URL = "http://localhost:3000/api/budget";

export const FinanceProvider = ({ children }) => {
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    getBudgetData();
  }, []);

  function getBudgetData() {
    axios
      .get(`${BASE_URL}/getBudget`)
      .then((res) => {
        setBudget(res.data.data.budget);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function updateBudget(data) {
    try {
      await axios.put(`${BASE_URL}/setBudget`, data);
      getBudgetData();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  return (
    <FinanceContext.Provider value={{ budget, getBudgetData, updateBudget }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
