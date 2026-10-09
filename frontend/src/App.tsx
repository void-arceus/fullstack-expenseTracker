import axios from "axios";
import { useState, useEffect } from "react";
import UserDashboard from "./pages/UserDashboard";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
axios.defaults.withCredentials = true;

interface ITheme {
    theme: "light" | "dark";
}

function App() {
    const [theme, setTheme] = useState<ITheme>({ theme: "light" });

    useEffect(() => {
        const htmlElement = document.documentElement;
        // checking local storage for theme
        let storedTheme = localStorage.getItem("aExpenseTrackerTheme");
        if (!storedTheme) storedTheme = "light";
        setTheme({ theme: storedTheme === "light" ? "light" : "dark" });
        htmlElement.className = "";
        htmlElement.className = storedTheme;
    }, []);

    function handleToggleTheme() {
        const changeThemeTo = theme.theme === "light" ? "dark" : "light";
        setTheme({ theme: changeThemeTo });
        localStorage.setItem("aExpenseTrackerTheme", changeThemeTo);
        const htmlElement = document.documentElement;
        htmlElement.className = "";
        htmlElement.className = changeThemeTo;
    }

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <LandingPage
                            handleToggleTheme={handleToggleTheme}
                            theme={theme.theme}
                        />
                    }
                />
                <Route
                    path="/signin"
                    element={
                        <Login
                            handleToggleTheme={handleToggleTheme}
                            theme={theme.theme}
                        />
                    }
                />
                <Route
                    path="/register"
                    element={
                        <Register
                            handleToggleTheme={handleToggleTheme}
                            theme={theme.theme}
                        />
                    }
                />
                <Route
                    path="/userDashboard"
                    element={
                        <UserDashboard
                            handleToggleTheme={handleToggleTheme}
                            theme={theme.theme}
                        />
                    }
                />
            </Routes>
        </>
    );
}

export default App;
