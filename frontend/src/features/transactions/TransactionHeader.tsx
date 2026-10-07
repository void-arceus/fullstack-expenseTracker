import { FaPlus } from "react-icons/fa6";
function TransactionHeader() {
    return (
        <div className="py-4 w-full flex items-center justify-between">
            <div className="flex flex-col items-start justify-start">
                <h1 className="text-xl text-(--text-primary) font-bold">
                    Welcome Back, Arceus
                </h1>
                <p className="text-sm font-semibold text-(--text-secondary)">
                    Here's your financial overview, arceus
                </p>
            </div>
            <button className="text-xs font-semibold bg-(--accent) hover:bg-(--accent-hover) flex items-center gap-2 hover:cursor-pointer px-3 py-2 rounded-md text-[#ffffff] select-none shadow-sm hover:shadow-lg active:scale-[0.98]">
                <FaPlus size={12} /> Add Transaction
            </button>
        </div>
    );
}

export default TransactionHeader;
