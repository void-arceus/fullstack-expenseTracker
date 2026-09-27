import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { LiaCoinsSolid } from "react-icons/lia";
import { LuChartNoAxesCombined } from "react-icons/lu";
function CategoryCards() {
    return (
        <div className="w-full grid grid-cols-4 gap-3">
            <div className="border border-(--border) p-4 rounded-xl bg-(--surface) hover:bg-(--surface-hover) flex items-center gap-4">
                <div className=" w-10 h-full flex items-start justiyf-start">
                    <div className="h-10 w-10 bg-(--danger-soft) rounded-full flex items-center justify-center">
                        <LiaCoinsSolid size={30} className="text-(--danger)" />
                    </div>
                </div>
                <div>
                    <p className="text-xs font-semibold text-(--text-secondary)">
                        Total Spending
                    </p>
                    <h1 className="text-xl font-bold text-(--text-primary)">
                        $980
                    </h1>
                    <p className="text-xs text-(--text-secondary) font-semibold">
                        This month
                    </p>
                </div>
            </div>
            <div className="border border-(--border) p-4 rounded-xl bg-(--surface) hover:bg-(--surface-hover) flex items-center gap-4">
                <div className=" w-10 h-full flex items-start justiyf-start">
                    <div className="h-10 w-10 bg-(--accent-soft) rounded-full flex items-center justify-center">
                        <BiCategoryAlt size={25} className="text-(--accent)" />
                    </div>
                </div>
                <div>
                    <p className="text-xs font-semibold text-(--text-secondary)">
                        Categories
                    </p>
                    <h1 className="text-xl font-bold text-(--text-primary)">
                        5
                    </h1>
                    <p className="text-xs text-(--text-secondary) font-semibold">
                        Active Categories
                    </p>
                </div>
            </div>
            <div className="border border-(--border) p-4 rounded-xl bg-(--surface) hover:bg-(--surface-hover) flex items-center gap-4">
                <div className=" w-10 h-full flex items-start justiyf-start">
                    <div className="h-10 w-10 bg-(--danger-soft) rounded-full flex items-center justify-center">
                        <AiOutlineShoppingCart
                            size={25}
                            className="text-(--danger)"
                        />
                    </div>
                </div>
                <div>
                    <p className="text-xs font-semibold text-(--text-secondary)">
                        Largest Category
                    </p>
                    <h1 className="text-lg font-bold text-(--text-primary)">
                        Shopping
                    </h1>
                    <p className="text-xs text-(--text-secondary) font-semibold">
                        25.5% of total
                    </p>
                </div>
            </div>
            <div className="border border-(--border) p-4 rounded-xl bg-(--surface) hover:bg-(--surface-hover) flex items-center gap-4">
                <div className=" w-10 h-full flex items-start justiyf-start">
                    <div className="h-10 w-10 bg-(--success-soft) rounded-full flex items-center justify-center">
                        <LuChartNoAxesCombined
                            size={25}
                            className="text-(--success)"
                        />
                    </div>
                </div>
                <div>
                    <p className="text-xs font-semibold text-(--text-secondary)">
                        Avg. per category
                    </p>
                    <h1 className="text-xl font-bold text-(--text-primary)">
                        $196
                    </h1>
                    <p className="text-xs text-(--text-secondary) font-semibold">
                        This month
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CategoryCards;
