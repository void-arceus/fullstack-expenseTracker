import axios from "axios";

const BASE_URL = `http://localhost:8080`;

export async function GetCategories(id: string) {
  const res = await axios.get(`${BASE_URL}/categories/${id}`);
  return res.data;
}
