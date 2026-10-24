import axios from "axios";
import type { ITransactionInput } from "../features/transactions/CreateTransaction";

const BASE_URL = `http://localhost:8080`;

export async function AddTransaction(data: ITransactionInput) {
  const res = await axios.post(`${BASE_URL}/transactions`, data);
  return res.data;
}

export async function GetTransactions(
  filter: string = "all",
  sortBy: string = "desc",
  page: string = "1",
  limit: string = "10",
) {
  const res = await axios.get(
    `${BASE_URL}/transactions?filter=${filter}&sortBy=${sortBy}&page=${page}&limit=${limit}`,
  );
  return res.data;
}
