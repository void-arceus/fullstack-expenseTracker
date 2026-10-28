import axios from "axios";

const BASE_URL = `http://localhost:8080`;
import type { IBudget } from "../features/budget/BudgetForm";

export async function handleCreateBudget(data: IBudget) {
  const res = await axios.post(`${BASE_URL}/budget`, data);
  return res.data;
}
