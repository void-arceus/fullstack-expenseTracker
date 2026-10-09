import axios from "axios";
import type { ILoginInput } from "./Login";

const BASE_URL = "http://localhost:8080";

export async function GetCurrentUser() {
    const res = await axios.get(`${BASE_URL}/me`);
    return res.data;
}

export async function Login(data: ILoginInput) {
    const res = await axios.post(`${BASE_URL}/login`, data);
    return res.data;
}

export async function Logout() {
    const res = await axios.post(`${BASE_URL}/logout`);
    return res.data;
}
