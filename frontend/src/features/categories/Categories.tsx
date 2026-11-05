import CategoryDetails from "./CategoryDetails";
import CategoryHeader from "./CategoryHeader";
import AddCategory from "./AddCategory";
import { useState, useEffect } from "react";
import { GetCategories } from "../../api/categories";
import type { IBudget } from "../budget/BudgetForm";

export interface IUserCategories {
    id: number;
    userId?: number;
    categoryName: string;
    bgColor: string;
    categoryIcon?: string;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
    totalSpent: number;
    budget: IBudget;
}

function Categories() {
    const [categories, setCategories] = useState<IUserCategories[] | []>([]);

    useEffect(() => {
        getCategoriesData();
    }, []);

    async function getCategoriesData() {
        try {
            const res = await GetCategories();
            setCategories(res.data);
        } catch (err: any) {
            console.error(err);
        }
    }

    return (
        <div className="pt-18 h-full w-full min-w-0 px-6 flex items-center gap-4">
            <div className="h-full min-w-0 flex-1 flex flex-col items-start justify-start gap-4 overflow-scroll">
                <CategoryHeader categories={categories} />
                <CategoryDetails categories={categories} />
            </div>
            <div className="hidden xl:flex w-80 shrink-0 h-full items-start justify-start">
                <AddCategory />
            </div>{" "}
        </div>
    );
}

export default Categories;
