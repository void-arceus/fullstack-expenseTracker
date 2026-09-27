import { FaShoppingCart } from "react-icons/fa";
import { FaBus } from "react-icons/fa6";
import { HiMiniPlus } from "react-icons/hi2";
import { ImSpoonKnife } from "react-icons/im";
import { IoDocumentText, IoGameController } from "react-icons/io5";
import { LuShapes } from "react-icons/lu";

interface ICategories {
    id: number;
    category: string;
    monthlyBudget: number;
    spent: number;
    remaining: number;
    progress: number;
}

const categories: ICategories[] = [
    {
        id: 1,
        category: "Food",
        monthlyBudget: 8000,
        spent: 5200,
        remaining: 2800,
        progress: 65,
    },
    {
        id: 2,
        category: "Bills",
        monthlyBudget: 5000,
        spent: 4200,
        remaining: 800,
        progress: 84,
    },
    {
        id: 3,
        category: "Transport",
        monthlyBudget: 4000,
        spent: 3120,
        remaining: 880,
        progress: 78,
    },
    {
        id: 4,
        category: "Shopping",
        monthlyBudget: 3500,
        spent: 2600,
        remaining: 900,
        progress: 74,
    },
    {
        id: 5,
        category: "Entertainment",
        monthlyBudget: 2500,
        spent: 1700,
        remaining: 800,
        progress: 68,
    },
    {
        id: 6,
        category: "Other",
        monthlyBudget: 3000,
        spent: 2560,
        remaining: 440,
        progress: 85,
    },
];

const categoryColors = {
    food: {
        icon: <ImSpoonKnife className="text-(--category-food-text)" />,
        bg: "--category-food-bg",
        text: "--category-food-text",
    },
    transport: {
        icon: <FaBus className="text-(--category-transport-text)" />,
        bg: "--category-transport-bg",
        text: "--category-transport-text",
    },
    shopping: {
        icon: <FaShoppingCart className="text-(--category-shopping-text)" />,
        bg: "--category-shopping-bg",
        text: "--category-shopping-text",
    },
    bills: {
        icon: <IoDocumentText className="text-(--category-bills-text)" />,
        bg: "--category-bills-bg",
        text: "--category-bills-text",
    },
    entertainment: {
        icon: (
            <IoGameController className="text-(--category-entertainment-text)" />
        ),
        bg: "--category-entertainment-bg",
        text: "--category-entertainment-text",
    },
    other: {
        icon: <LuShapes className="text-(--category-other-text)" />,
        bg: "--category-other-bg",
        text: "--category-other-text",
    },
};

type CategoryType = keyof typeof categoryColors;

function CategoryDetails() {
    return (
        <div className="h-full w-full py-2">
            <div className="h-fit w-full border border-(--border) overflow-hidden rounded-xl bg-(--surface) shadow-xs">
                <table className="w-full border-separate border-spacing-y-2">
                    <thead>
                        <tr>
                            <th className="text-start px-4 py-2 text-sm font-bold text-(--text-primary)">
                                Category
                            </th>
                            <th className="text-start px-4 py-2 text-sm font-bold text-(--text-primary)">
                                Monthly Budget
                            </th>
                            <th className="text-start px-4 py-2 text-sm font-bold text-(--text-primary)">
                                Spent
                            </th>
                            <th className="text-start px-4 py-2 text-sm font-bold text-(--text-primary)">
                                Remaining
                            </th>
                            <th className="text-start px-4 py-2 text-sm font-bold text-(--text-primary)">
                                Progress
                            </th>
                            <th className="text-start px-4 py-2 text-sm font-bold text-(--text-primary)">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="[&>tr:last-child>td]:border-b-0">
                        {categories.map((c, index) => (
                            <tr key={index}>
                                <td className="text-start px-4 py-3 text-xs font-semibold text-(--text-secondary) border-b border-(--border) flex items-center justify-start gap-2">
                                    <div
                                        className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center"
                                        style={{
                                            backgroundColor: `var(${
                                                categoryColors[
                                                    c.category.toLowerCase() as CategoryType
                                                ].bg
                                            })`,
                                        }}
                                    >
                                        {
                                            categoryColors[
                                                c.category.toLowerCase() as CategoryType
                                            ].icon
                                        }
                                    </div>
                                    {c.category}
                                </td>
                                <td className="text-start px-4 py-2 text-xs font-semibold text-(--text-secondary) border-b border-(--border)">
                                    {c.monthlyBudget}
                                </td>
                                <td className="text-start px-4 py-2 text-xs font-semibold text-(--text-secondary) border-b border-(--border)">
                                    {c.spent}
                                </td>
                                <td className="text-start px-4 py-2 text-xs font-semibold text-(--text-secondary) border-b border-(--border)">
                                    {c.remaining}
                                </td>
                                <td className="text-start px-4 py-2 text-xs font-semibold text-(--text-secondary) border-b border-(--border)">
                                    {c.progress}
                                </td>
                                <td className="text-start px-4 py-2 text-xs font-semibold text-(--text-secondary) border-b border-(--border)">
                                    <button className="hover:cursor-pointer font-bold text-lg">
                                        ...
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="md:hidden w-full flex items-center justify-center py-4 px-2">
                    <button className="text-xs font-semibold flex items-center justify-center gap-1 w-full p-2.5 bg-(--accent) rounded-lg hover:cursor-pointer text-[#ffffff] select-none hover:bg-(--accent-hover) active:scale-[0.98] transition transform-scale duration-150 ease-in shadow-sm hover:shadow-md">
                        <HiMiniPlus className="text-lg font-bold" />
                        <span>Add Category</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CategoryDetails;
