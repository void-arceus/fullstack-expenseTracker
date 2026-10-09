import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Dashboard from "../features/dashboard/Dashboard";
import Categories from "../features/categories/Categories";
import Transactions from "../features/transactions/Transactions";
import Analytics from "../features/analytics/Analytics";
import Budget from "../features/budget/Budget";
import Settings from "../features/settings/Settings";

export interface IThemeProp {
    handleToggleTheme: () => void;
    theme: "dark" | "light";
}

function displayView(menu: string) {
    switch (menu) {
        case "dashboard":
            return <Dashboard />;
        case "categories":
            return <Categories />;
        case "transactions":
            return <Transactions />;
        case "analytics":
            return <Analytics />;
        case "budget":
            return <Budget />;
        case "settings":
            return <Settings />;
        default:
            return <></>;
    }
}

function UserDashboard({ handleToggleTheme, theme }: IThemeProp) {
    const [menu, setMenu] = useState<string>("dashboard");

    function handleSetMenu(val: string) {
        setMenu(val);
    }
    return (
        <main className="w-full h-screen min-w-0 bg-(--background) flex">
            <Sidebar handleSetMenu={handleSetMenu} menu={menu} />

            <div className="relative h-full min-w-0 flex-1">
                <Navbar handleToggleTheme={handleToggleTheme} theme={theme} />
                <div className="min-w-0 w-full h-full">{displayView(menu)}</div>
            </div>
        </main>
    );
}

export default UserDashboard;
