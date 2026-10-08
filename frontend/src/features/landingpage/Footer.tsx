import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Footer() {
    const navigate = useNavigate();
    return (
        <div className="w-full bg-(--background)">
            <div className="w-full max-w-6xl mx-auto py-10 flex flex-col items-center justify-center gap-8">
                <div className="w-full flex flex-col items-center justify-center gap-4">
                    <div className="w-full flex flex-col items-center justify-center gap-2">
                        <h1 className="text-center text-2xl font-extrabold text-(--text-primary)">
                            Ready to take control of your finances?
                        </h1>
                        <p className="text-center text-xs text-(--text-secondary) font-semibold">
                            Join thousands of users who are already building
                            better money habits with Expense Tracker
                        </p>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <button
                            onClick={() => navigate("/register")}
                            className="px-6 py-3 bg-(--accent) hover:bg-(--accent-hover) hover:cursor-pointer rounded-xl text-sm font-bold text-[#ffffff] flex items-center justify-center gap-2 active:scale-[0.96] transition transform-scale duration-100 ease-in-out"
                        >
                            Get Started <FaArrowRightLong size={18} />
                        </button>
                        <button
                            onClick={() => navigate("/signin")}
                            className="px-6 py-3 rounded-xl text-sm font-bold border border-(--border) hover:cursor-pointer hover:border-(--border-strong) text-(--text-primary) active:scale-[0.96] transition transform-scale duration-100 ease-in-out"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
                <div className="w-full flex items-center justify-between">
                    <h1 className="text-md font-extrabold text-(--text-primary)">
                        ExpenseTracker
                    </h1>
                    <p className="text-xs font-bold text-(--text-secondary)">
                        &copy; 2026 ExpenseTracker, All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
