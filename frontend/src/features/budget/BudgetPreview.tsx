import { HiLightBulb } from "react-icons/hi";
import { ImSpoonKnife } from "react-icons/im";

function BudgetPreview() {
    return (
        <div className="flex-1 border border-(--border) rounded-xl p-2 shadow-xs">
            <div className="w-full flex flex-col items-start justify-start gap-5 p-2">
                <div className="w-full flex flex-col items-start justify-start gap-4">
                    <h1 className="text-sm font-bold text-(--text-primary)">
                        Budget Preview
                    </h1>
                    <div className="w-full flex items-center justify-start gap-2">
                        <div className="p-2 bg-(--category-food-bg) rounded-full">
                            <ImSpoonKnife
                                size={18}
                                className="text-(--category-food-text)"
                            />
                        </div>
                        <span className="text-sm font-semibold text-(--text-primary)">
                            Food
                        </span>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-4">
                    <div className="w-full flex flex-col items-start justify-start gap-2">
                        <div className="w-full flex items-center justify-between">
                            <p className="text-xs font-bold text-(--text-muted)">
                                Budget Amount{" "}
                            </p>
                            <p className="text-xs font-bold text-(--text-secondary)">
                                $500
                            </p>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <p className="text-xs font-bold text-(--text-muted)">
                                Time Period
                            </p>
                            <p className="text-xs font-bold text-(--text-secondary)">
                                Monthly
                            </p>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <p className="text-xs font-bold text-(--text-muted)">
                                Start Date
                            </p>
                            <p className="text-xs font-bold text-(--text-secondary)">
                                Sep 28, 2025
                            </p>
                        </div>
                    </div>
                    <div className="w-full h-20 rounded-lg flex items-center gap-4">
                        <div className="h-20 flex items-start py-2">
                            <HiLightBulb size={20} />
                        </div>
                        <div className="flex flex-col items-start justify-start">
                            <h2 className="text-sm font-bold text-(--accent-hover)">
                                Tip
                            </h2>
                            <p>
                                You can always edit or delete this budget from
                                the Budgets page later
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BudgetPreview;
