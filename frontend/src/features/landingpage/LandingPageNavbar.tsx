import { IoMoon, IoSunny } from "react-icons/io5";
import type { IThemeProp } from "../../pages/Homepage";
import { useNavigate } from "react-router-dom";

function LandingPageNavbar({ handleToggleTheme, theme }: IThemeProp) {
    const navigate = useNavigate();

    return (
        <div className="fixed top-0 w-full h-16 bg-(--surface)">
            <div className="h-full w-full max-w-6xl mx-auto flex items-center justify-between px-4 xl:px-0">
                <h1 className="text-xl font-extrabold text-(--accent)">
                    ExpenseTracker
                </h1>
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={handleToggleTheme}
                        className="text-(--text-primary) hover:cursor-pointer"
                    >
                        {theme === "light" ? <IoSunny /> : <IoMoon />}
                    </button>
                    <button
                        onClick={() => navigate("/signin")}
                        className="px-4 py-2 border border-(--border) hover:cursor-pointer hover:border-(--border-strong) rounded-lg text-xs font-semibold text-(--text-primary) active:scale-[0.96] transition transform-scale duration-100 ease-in-out"
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => navigate("/register")}
                        className="px-4 py-2 bg-(--accent) hover:bg-(--accent-hover) text-xs font-semibold text-[#ffffff] hover:cursor-pointer rounded-lg active:scale-[0.96] transition transform-scale duration-100 ease-in-out"
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
}
export default LandingPageNavbar;
