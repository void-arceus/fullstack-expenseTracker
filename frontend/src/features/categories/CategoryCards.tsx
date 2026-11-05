import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { LiaCoinsSolid } from "react-icons/lia";
import { LuChartNoAxesCombined } from "react-icons/lu";
import type { IUserCategories } from "./Categories";
import { useState, useEffect } from "react";

interface ICategoryCardsProps {
    categories: IUserCategories[];
}

interface ICategoryAnalytics {
    totalSpending: number;
    averageSpending: number;
    largestCategory: string;
    largestCategoryPercentage: number;
}

function CategoryCards({ categories }: ICategoryCardsProps) {
    const [categoryAnalytics, setCategoryAnalytics] =
        useState<ICategoryAnalytics | null>(null);

    function spendingAnalytics() {
        let spent: number = 0;
        categories.map((c) => {
            spent += c.totalSpent;
        });

        const maxCategory: IUserCategories | null =
            categories.length > 0
                ? categories.reduce((a, b) =>
                      a.totalSpent > b.totalSpent ? a : b,
                  )
                : null;
        const maxSpent: number = maxCategory ? maxCategory?.totalSpent : 0;
        const largest: number = Math.round((maxSpent / spent) * 100);

        setCategoryAnalytics({
            totalSpending: spent,
            averageSpending: spent / categories.length,
            largestCategory: maxCategory?.categoryName || "",
            largestCategoryPercentage: largest,
        });
    }

    useEffect(() => {
        spendingAnalytics();
    }, [categories.length]);

    return (
        <div className="max-w-full w-full grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-cols-1 gap-3">
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
                        ₹
                        {categoryAnalytics?.totalSpending?.toLocaleString(
                            "en-EN",
                        )}
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
                        {categories.length}
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
                        {categoryAnalytics?.largestCategory}
                    </h1>
                    <p className="text-xs text-(--text-secondary) font-semibold">
                        {categoryAnalytics?.largestCategoryPercentage}% of total
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
                        ₹
                        {categoryAnalytics?.averageSpending.toLocaleString(
                            "en-EN",
                        )}
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
