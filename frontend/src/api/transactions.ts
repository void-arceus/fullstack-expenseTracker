import axios from "axios";
import type { ITransactionInput } from "../features/transactions/CreateTransaction";

const BASE_URL = `http://localhost:8080`;

export async function AddTransaction(data: ITransactionInput) {
  const res = await axios.post(`${BASE_URL}/transactions`, data);
  return res.data;
}
