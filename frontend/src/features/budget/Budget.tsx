import BudgetForm from "./BudgetForm";
import BudgetPreview from "./BudgetPreview";

function Budget() {
    return (
        <div className="pt-18 h-full w-full min-w-0 px-6 gap-4 flex flex-col items-start justify-start">
            <div className="py-3">
                <h1 className="text-xl font-bold text-(--text-primary)">
                    Create Budget
                </h1>
                <p className="text-xs font-semibold text-(--text-secondary)">
                    Set a spending limit for a category and keep your finances
                    on track.
                </p>
            </div>
            <div className="w-full flex items-start justify-center gap-4">
                <BudgetForm />
                <BudgetPreview />
            </div>
        </div>
    );
}

export default Budget;
