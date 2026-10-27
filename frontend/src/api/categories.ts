import axios from "axios";
import type { ICreateCategory } from "../features/categories/AddCategory";

const BASE_URL = `http://localhost:8080`;

export async function GetCategories() {
  const res = await axios.get(`${BASE_URL}/categories`);
  return res.data;
}

export async function AddCategoryHandler(data: ICreateCategory) {
  const res = await axios.post(`${BASE_URL}/categories`, data);
  return res.data;
}
