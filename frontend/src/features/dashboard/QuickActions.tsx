import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { FaCirclePlus } from "react-icons/fa6";
import { FiTag } from "react-icons/fi";
import { PiTargetBold } from "react-icons/pi";

function QuickActions() {
    return (
        <div className="w-full flex flex-col gap-2">
            <div className="w-full">
                <h1 className="text-sm font-bold text-(--text-primary)">
                    Quick Actions
                </h1>
            </div>
            <div className="w-full grid xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-3">
                <button className="border border-(--border) bg-(--surface) flex items-center justify-center gap-2 py-2 rounded-xl select-none hover:cursor-pointer hover:bg-(--surface-hover)">
                    <div className="h-10 w-10 text-(--accent) rounded-full bg-(--accent-soft) flex items-center justify-center">
                        <FaCirclePlus size={18} />
                    </div>
                    <span className="text-xs font-semibold text-(--text-primary)">
                        Add Transaction
                    </span>
                </button>
                <button className="border border-(--border) bg-(--surface) flex items-center justify-center gap-2 py-2 rounded-xl select-none hover:cursor-pointer hover:bg-(--surface-hover)">
                    <div className="h-10 w-10 text-(--accent) rounded-full bg-(--accent-soft) flex items-center justify-center">
                        <FiTag size={18} />
                    </div>
                    <span className="text-xs font-semibold text-(--text-primary)">
                        View Categories
                    </span>
                </button>
                <button className="border border-(--border) bg-(--surface) flex items-center justify-center gap-2 py-2 rounded-xl select-none hover:cursor-pointer hover:bg-(--surface-hover)">
                    <div className="h-10 w-10 text-(--accent) rounded-full bg-(--accent-soft) flex items-center justify-center">
                        <BiSolidBarChartAlt2 size={18} />
                    </div>
                    <span className="text-xs font-semibold text-(--text-primary)">
                        See Analytics
                    </span>
                </button>
                <button className="border border-(--border) bg-(--surface) flex items-center justify-center gap-2 py-2 rounded-xl select-none hover:cursor-pointer hover:bg-(--surface-hover)">
                    <div className="h-10 w-10 text-(--accent) rounded-full bg-(--accent-soft) flex items-center justify-center">
                        <PiTargetBold size={18} />
                    </div>
                    <span className="text-xs font-semibold text-(--text-primary)">
                        Manage Budget
                    </span>
                </button>
            </div>
        </div>
    );
}

export default QuickActions;
