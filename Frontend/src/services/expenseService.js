import axios from "axios";

const BASE_URL = "http://localhost:3000/api/expense";

export const getExpenses = async (filters) => {
  const { filterBy, filterValue, sortBy, sortValue } = filters;
  const res = await axios.get(`${BASE_URL}/getExpenses`, {
    params: { filterBy, filterValue, sortBy, sortValue },
  });
  return res.data;
};

export const deleteExpense = async (id) => {
  const res = await axios.delete(`${BASE_URL}/deleteExpense/${id}`);
  return res.data;
};
