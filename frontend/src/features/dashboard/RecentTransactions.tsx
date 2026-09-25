import { FaArrowRight } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";

interface ITransaction {
    id: number;
    title: string;
    category: string;
    amount: number;
    date: string;
    type: string;
}

function RecentTransactions() {
    const transactions: ITransaction[] = [
        {
            id: 1,
            title: "Grocery Shopping",
            category: "Food",
            amount: -84.5,
            date: "Sep 25, 2026",
            type: "expense",
        },
        {
            id: 2,
            title: "Salary",
            category: "Income",
            amount: 3200,
            date: "Sep 24, 2026",
            type: "income",
        },
        {
            id: 3,
            title: "Netflix",
            category: "Entertainment",
            amount: -15.99,
            date: "Sep 23, 2026",
            type: "expense",
        },
        {
            id: 4,
            title: "Electricity Bill",
            category: "Bills",
            amount: -72.35,
            date: "Sep 22, 2026",
            type: "expense",
        },
        {
            id: 5,
            title: "Freelance Payment",
            category: "Income",
            amount: 850,
            date: "Sep 21, 2026",
            type: "income",
        },
        {
            id: 6,
            title: "Coffee",
            category: "Food",
            amount: -6.75,
            date: "Sep 20, 2026",
            type: "expense",
        },
        {
            id: 7,
            title: "Uber",
            category: "Transport",
            amount: -24.8,
            date: "Sep 19, 2026",
            type: "expense",
        },
        {
            id: 8,
            title: "Amazon",
            category: "Shopping",
            amount: -129.99,
            date: "Sep 18, 2026",
            type: "expense",
        },
    ];
    return (
        <div className="w-full py-2">
            <div className="border border-(--border) p-2 rounded-lg shadow-sm bg-(--surface)">
                <div className="w-full flex items-center justify-between">
                    <p className="text-sm font-semibold text-(--text-primary)">
                        Recent Transactions
                    </p>
                    <button className="flex items-center gap-2 text-sm font-bold text-(--accent) hover:cursor-pointer hover:text-(--accent-hover)">
                        view all
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RecentTransactions;
