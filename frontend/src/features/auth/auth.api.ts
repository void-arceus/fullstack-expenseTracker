import axios from "axios";
import type { ILoginInput } from "./Login";

const BASE_URL = "http://localhost:8080";

export async function HandleLogin(data: ILoginInput) {
    try {
        await axios.post(`${BASE_URL}/login`, data);
    } catch (error: any) {
        return error;
    }
}
