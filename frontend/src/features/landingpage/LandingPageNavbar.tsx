import { IoMoon, IoSunny } from "react-icons/io5";
import type { IThemeProp } from "../../pages/UserDashboard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function LandingPageNavbar({ handleToggleTheme, theme }: IThemeProp) {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    console.log("Landing navbar:", isLoggedIn);

    return (
        <div className="fixed top-0 w-full h-16 bg-(--surface)">
            <div className="h-full w-full max-w-6xl mx-auto flex items-center justify-between px-4 xl:px-0">
                <button
                    onClick={() => navigate("/")}
                    className="text-xl font-extrabold text-(--accent) select-none hover:cursor-pointer"
                >
                    ExpenseTracker
                </button>
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={handleToggleTheme}
                        className="text-(--text-primary) hover:cursor-pointer"
                    >
                        {theme === "light" ? <IoSunny /> : <IoMoon />}
                    </button>

                    {isLoggedIn ? (
                        <button
                            onClick={() => navigate("/userDashboard")}
                            className="px-4 py-2 bg-(--accent) hover:bg-(--accent-hover) text-xs font-bold text-[#ffffff] rounded-lg hover:cursor-pointer active:scale-[0.96] transition transform-scale duration-100 ease-in-out shadow-sm hover:shadow-md"
                        >
                            Dashboard
                        </button>
                    ) : (
                        <div className="flex items-center gap-4">
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
                    )}
                </div>
            </div>
        </div>
    );
}
export default LandingPageNavbar;
