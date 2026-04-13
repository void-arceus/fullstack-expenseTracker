import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const FinanceContext = createContext();

export const FinanceProvider = () => {
  useEffect(() => {}, []);

  const [budget, setBudget] = useState(0);
  return (
    <FinanceContext.Provider value={budget}>{children}</FinanceContext.Provider>
  );
};

export const useFinance = useContext(FinanceContext);
