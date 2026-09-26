import { useState, useEffect } from "react";
import Homepage from "./pages/Homepage";

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
            <Homepage
                handleToggleTheme={handleToggleTheme}
                theme={theme.theme}
            />
        </>
    );
}

export default App;
