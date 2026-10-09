import {
    createContext,
    useContext,
    type ReactNode,
    useState,
    useEffect,
} from "react";
import type { ILoginInput } from "../features/auth/Login";
import { GetCurrentUser, Login, Logout } from "../features/auth/auth.api";
import { GiKingJuMask } from "react-icons/gi";

interface IAuthProviderProps {
    children: ReactNode;
}

interface IAuthContext {
    isLoggedIn: boolean;
    HandleLogin: (data: ILoginInput) => Promise<boolean>;
    HandleLogout: () => void;
    user: IUser | null;
}

interface IUser {
    id: string;
    username: string;
    email: string;
    pfpUrl: string;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthProvider({ children }: IAuthProviderProps) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        HandleGetCurrentUser();
        console.log("Context isLoggedIn:", isLoggedIn);
    }, []);

    async function HandleGetCurrentUser() {
        try {
            const res = await GetCurrentUser();
            console.log("Current user result:", res);
            setIsLoggedIn(true);
            setUser(res.data);
        } catch (error: any) {
            setIsLoggedIn(false);
            setUser(null);
        }
    }

    async function HandleLogin(data: ILoginInput): Promise<boolean> {
        try {
            const res = await Login(data);
            setIsLoggedIn(true);
            setUser(res.data);
            return res.status;
        } catch (error: any) {
            setIsLoggedIn(false);
            return false;
        }
    }

    async function HandleLogout() {
        try {
            await Logout();
            setIsLoggedIn(false);
            setUser(null);
        } catch (error: any) {
            console.error(
                "Logout failed on server:",
                error?.response.data || error.message,
            );
        }
    }

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, HandleLogin, HandleLogout, user }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): IAuthContext => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within and AuthProvider");
    }
    return context;
};
