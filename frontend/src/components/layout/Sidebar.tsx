import { GiExpense } from "react-icons/gi";
import { RxDashboard } from "react-icons/rx";
import { TbCategoryPlus } from "react-icons/tb";
import { AiOutlineTransaction } from "react-icons/ai";
import { MdLogout, MdOutlineAnalytics } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FaSackDollar } from "react-icons/fa6";

function Sidebar() {
    return (
        <div className="relative bg-(--surface) h-full w-xs border-r border-(--border) p-2 flex flex-col items-start justify-start gap-2">
            <div className="w-full flex items-center justify-start gap-2 p-2 text-(--text-primary) mb-2 hover:cursor-pointer">
                <GiExpense size={20} />
                <h1 className="text-md font-bold select-none">
                    ExpenseTracker
                </h1>
            </div>
            <div className="w-full flex flex-col items-start justify-start gap-1 pb-4 border-b border-(--border)">
                <button className="w-full flex items-center justify-start gap-4 px-2 py-3 hover:bg-(--accent-soft) hover:cursor-pointer rounded-md text-(--text-primary) hover:text-(--accent-hover)">
                    <RxDashboard size={20} />
                    <p className="text-xs font-bold select-none">Dashboard</p>
                </button>
                <button className="w-full flex items-center justify-start gap-4 px-2 py-3 hover:bg-(--accent-soft) hover:cursor-pointer rounded-md text-(--text-primary)  hover:text-(--accent-hover)">
                    <AiOutlineTransaction size={20} />
                    <p className="text-xs font-bold select-none">
                        Transactions
                    </p>
                </button>
                <button className="w-full flex items-center justify-start gap-4 px-2 py-3 hover:bg-(--accent-soft) hover:cursor-pointer rounded-md text-(--text-primary)  hover:text-(--accent-hover)">
                    <FaSackDollar size={16} />
                    <p className="text-xs font-bold select-none">Budget</p>
                </button>
                <button className="w-full flex items-center justify-start gap-4 px-2 py-3 hover:bg-(--accent-soft) hover:cursor-pointer rounded-md text-(--text-primary)  hover:text-(--accent-hover)">
                    <TbCategoryPlus size={20} />
                    <p className="text-xs font-bold select-none">Categories</p>
                </button>
                <button className="w-full flex items-center justify-start gap-4 px-2 py-3 hover:bg-(--accent-soft) hover:cursor-pointer rounded-md text-(--text-primary)  hover:text-(--accent-hover)">
                    <MdOutlineAnalytics size={20} />
                    <p className="text-xs font-bold select-none">Analytics</p>
                </button>
            </div>
            <button className="w-full mt-2 px-2 py-3 text-(--text-primary) flex items-center justify-start gap-3 hover:cursor-pointer hover:bg-(--accent-soft) rounded-md  hover:text-(--accent-hover)">
                <IoSettingsOutline size={20} />
                <p className="text-xs font-bold">Settings</p>
            </button>
            <div className="absolute bottom-0 left-0 w-full flex items-center justify-between p-4">
                <div className="w-full border-t border-(--border) flex items-center justify-between py-6">
                    <div className="w-full flex items-center justify-start gap-4">
                        <div className="h-10 w-10 flex items-center justify-center rounded-full text-md font-extrabold text-(--accent) bg-(--accent-soft)">
                            A
                        </div>
                        <div className="flex flex-col items-start justify-start">
                            <h1 className="text-xs font-bold text-(--text-primary)">
                                Arceus
                            </h1>
                            <p className="text-xs font-medium text-(--text-muted)">
                                arceus@gmail.com
                            </p>
                        </div>
                    </div>
                    <button className="hover:cursor-pointer text-(--text-primary)">
                        <MdLogout size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
