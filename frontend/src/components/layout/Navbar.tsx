import type { IThemeProp } from "../../pages/UserDashboard";
import { IoSearch, IoSunny, IoMoon } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";

function Navbar({ handleToggleTheme, theme }: IThemeProp) {
    const { user } = useAuth();
    return (
        <div className="absolute w-full bg-(--background) h-18 flex items-center justify-between px-6">
            <div className="flex relative">
                <IoSearch
                    size={20}
                    className="text-(--text-muted) absolute top-3.5 left-2"
                />
                <input
                    placeholder="Search transactions..."
                    className="bg-(--surface) px-8 py-3 w-md outline-0 text-sm font-medium text-(--text-secondary) border border-(--border) focus:border-(--border-strong) rounded-xl"
                />
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={handleToggleTheme}
                    className="hover:cursor-pointer flex items-center gap-2 px-4 py-1.5 bg-(--theme-toggle-bg) text-(--theme-toggle-icon) rounded-2xl active:scale-[0.96] transition transform-scale duration-100 ease-in-out"
                >
                    {theme === "light" ? (
                        <IoSunny size={16} />
                    ) : (
                        <IoMoon size={16} />
                    )}
                    <span className="text-sm font-semibold select-none">
                        Toggle
                    </span>
                </button>
                <div className="h-10 w-10 bg-(--accent-soft) rounded-full flex items-center justify-center text-sm font-bold text-(--accent) select-none hover:cursor-pointer">
                    {user?.username[0].toUpperCase()}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
