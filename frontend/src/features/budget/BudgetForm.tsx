function BudgetForm() {
    return (
        <div className="flex-2 border border-(--border) rounded-xl p-2 bg-(--surface)">
            <form className="w-full p-2 flex flex-col items-start justify-start gap-4">
                <div className="w-full flex flex-col items-start justify-start gap-1">
                    <label
                        htmlFor="category"
                        className="text-xs font-bold text-(--text-secondary)"
                    >
                        Category
                    </label>
                    <input
                        id="category"
                        placeholder="e.g food, shopping etc"
                        className="w-full border border-(--border) rounded-lg outline-0 py-2.5 p-2 text-xs text-(--text-secondary) font-semibold focus:border-(--border-strong)"
                    />
                </div>
                <div className="w-full flex flex-col items-start justify-start gap-1">
                    <label
                        id="budgetAmount"
                        className="text-xs font-bold text-(--text-secondary)"
                    >
                        Budget Amount
                    </label>
                    <input
                        id="budgetAmount"
                        placeholder="Amount"
                        type="number"
                        className="w-full border border-(--border) rounded-lg outline-0 py-2.5 p-2 text-xs text-(--text-secondary) font-semibold focus:border-(--border-strong)"
                    />
                </div>
                <div className="w-full flex flex-col items-start justify-start gap-2">
                    <p className="text-xs font-bold text-(--text-secondary)">
                        Time Period
                    </p>
                    <div className="w-full flex items-center justify-start gap-3">
                        <span className="px-6 py-2.5 text-xs font-semibold rounded-lg bg-(--accent) text-[#ffffff] select-none shadow-xs hover:shadow-sm hover:cursor-pointer">
                            Monthly
                        </span>
                        <span className="px-6 py-2.5 text-xs font-semibold rounded-lg text-(--text-primary) select-none shadow-xs hover:shadow-sm hover:cursor-pointer border border-(--border)">
                            Yearly
                        </span>
                    </div>
                </div>
                <div className="w-full flex flex-col items-start justify-start gap-1">
                    <label
                        htmlFor="startDate"
                        className="text-xs font-bold text-(--text-secondary)"
                    >
                        Start Date
                    </label>
                    <input
                        id="startDate"
                        type="date"
                        className="w-full border border-(--border) rounded-lg outline-0 py-2.5 p-2 text-xs text-(--text-secondary) font-semibold focus:border-(--border-strong)"
                    />
                </div>
                <div className="w-full flex flex-col items-start justify-start gap-1">
                    <label
                        htmlFor="budgetNote"
                        className="text-xs font-bold text-(--text-secondary)"
                    >
                        Notes (optional)
                    </label>
                    <textarea
                        id="budgetNote"
                        placeholder="Add a note about this budget..."
                        className="h-20 w-full border border-(--border) rounded-lg outline-0 p-2 text-xs text-(--text-secondary) font-semibold focus:border-(--border-strong) resize-none"
                    />
                </div>
                <div className="w-full flex items-center justify-between">
                    <button
                        type="button"
                        className="text-xs font-semibold text-(--text-primary) border px-4 py-2 border-(--border) hover:cursor-pointer hover:border-(--border-strong) rounded-lg bg-(--surface) hover:bg-(--surface-hover) active:scale-[0.96] select-none"
                    >
                        Clear
                    </button>
                    <button
                        type="button"
                        className="px-4 p-2 bg-(--accent) hover:bg-(--accent-hover) hover:cursor-pointer rounded-lg text-[#ffffff] text-xs font-semibold shadow-sm hover:shadow-md active:scale-[0.96] select-none"
                    >
                        Create Budget
                    </button>
                </div>
            </form>
        </div>
    );
}

export default BudgetForm;
