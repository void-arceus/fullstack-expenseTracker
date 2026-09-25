import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Dashboard from "../features/dashboard/Dashboard";

export interface IThemeProp {
    handleToggleTheme: () => void;
    theme: "dark" | "light";
}

function Homepage({ handleToggleTheme, theme }: IThemeProp) {
    return (
        <main className="w-full h-screen bg-(--background) flex items-center">
            <Sidebar />
            <div className="relative w-full h-full">
                <Navbar handleToggleTheme={handleToggleTheme} theme={theme} />
                <Dashboard />
            </div>
        </main>
    );
}

export default Homepage;
