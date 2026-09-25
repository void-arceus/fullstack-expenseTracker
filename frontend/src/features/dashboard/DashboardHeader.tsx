import { FaArrowUp, FaArrowDown, FaPlus } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";

function DashboardHeader() {
    return (
        <div className="w-full px-4 bg-(--background) flex flex-col items-start gap-8">
            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col items-start justify-start">
                    <h1 className="text-2xl text-(--text-primary) font-bold">
                        Welcome Back, Arceus
                    </h1>
                    <p className="text-sm font-semibold text-(--text-secondary)">
                        Here's your financial overview, arceus
                    </p>
                </div>
                <button className="text-sm font-semibold bg-(--accent) hover:bg-(--accent-hover) flex items-center gap-2 hover:cursor-pointer px-4 py-2 rounded-md text-(--accent-soft) select-none shadow-sm hover:shadow-lg active:scale-[0.98]">
                    <FaPlus size={12} /> Add Transaction
                </button>
            </div>
            <div className="w-full grid grid-cols-3 gap-4">
                <div className="border border-(--border) bg-(--surface) hover:bg-(--surface-hover) px-4 py-8 rounded-xl flex items-center justify-start gap-4">
                    <div className="h-full">
                        <div className="p-2 bg-(--info-soft) rounded-lg text-(--info)">
                            <GrMoney size={20} />
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-1">
                        <span className="text-xs font-semibold text-(--text-secondary)">
                            Total Balance
                        </span>
                        <p className="text-xl font-bold text-(--text-primary)">
                            ₹ 42,500
                        </p>
                    </div>
                </div>
                <div className="border border-(--border) bg-(--surface) hover:bg-(--surface-hover) px-4 py-8 rounded-xl flex items-center justify-start gap-4">
                    <div className="h-full">
                        <div className="p-2 bg-(--success-soft) rounded-lg text-(--success)">
                            <FaArrowUp size={18} />
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-1">
                        <span className="text-xs font-semibold text-(--text-secondary)">
                            Total Income
                        </span>
                        <p className="text-xl font-bold text-(--text-primary)">
                            ₹ 42,500
                        </p>
                    </div>
                </div>
                <div className="border border-(--border) bg-(--surface) hover:bg-(--surface-hover) px-4 py-8 rounded-xl flex items-center justify-start gap-4">
                    <div className="h-full">
                        <div className="p-2 bg-(--danger-soft) rounded-lg text-(--danger)">
                            <FaArrowDown size={18} />
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-1">
                        <span className="text-xs font-semibold text-(--text-secondary)">
                            Total Expenses
                        </span>
                        <p className="text-xl font-bold text-(--text-primary)">
                            ₹ 42,500
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardHeader;
