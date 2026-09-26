import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

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
            amount: 84.5,
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
            amount: 15.99,
            date: "Sep 23, 2026",
            type: "expense",
        },
        {
            id: 4,
            title: "Electricity Bill",
            category: "Bills",
            amount: 72.35,
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
            amount: 6.75,
            date: "Sep 20, 2026",
            type: "expense",
        },
        {
            id: 7,
            title: "Uber",
            category: "Transport",
            amount: 24.8,
            date: "Sep 19, 2026",
            type: "expense",
        },
        {
            id: 8,
            title: "Amazon",
            category: "Shopping",
            amount: 129.99,
            date: "Sep 18, 2026",
            type: "expense",
        },
    ];
    return (
        <div className="w-full py-2 max-h-full">
            <div className="border border-(--border) p-2 rounded-lg shadow-sm bg-(--surface) px-4 flex flex-col items-start gap-4">
                <div className="w-full flex items-center justify-between py-2">
                    <p className="text-xs font-bold text-(--text-primary)">
                        Recent Transactions
                    </p>
                    <button className="flex items-center gap-2 text-xs font-bold text-(--accent) hover:cursor-pointer hover:text-(--accent-hover)">
                        view all
                    </button>
                </div>
                {transactions.length > 0 ? (
                    <div className="w-full flex flex-col items-start justify-start gap-4 text-(--text-primary)">
                        {transactions.map((t) => (
                            <div
                                key={t.id}
                                className="w-full flex items-center justify-start gap-4 border-b border-(--border) pb-2"
                            >
                                {/* logo */}
                                <div className="h-10 w-10 flex items-center justify-center">
                                    <div className="h-10 w-10 border border-(--border) rounded-full text-xs font-bold flex items-center justify-center">
                                        {t.category[0]}
                                    </div>
                                </div>
                                <div className="w-full flex items-center">
                                    <div className="w-full flex flex-col gap-1">
                                        <h1 className="text-xs font-bold">
                                            {t.title}
                                        </h1>
                                        <p className="text-xs text-(--text-secondary) font-semibold">
                                            {t.category}
                                        </p>
                                    </div>
                                    <div className="w-full flex flex-col items-end gap-1">
                                        <p
                                            className={`${t.type === "expense" ? "text-(--danger)" : "text-(--success)"} text-xs font-bold flex items-center gap-2`}
                                        >
                                            {t.type === "expense" ? (
                                                <FaArrowTrendDown />
                                            ) : (
                                                <FaArrowTrendUp />
                                            )}
                                            {t.amount}
                                        </p>
                                        <p className="text-xs font-semibold text-(--text-secondary)">
                                            {t.date}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="w-full flex items-center justify-center">
                        <p className="text-xs font-semibold text-(--text-secondary)">
                            No Recent Transactons
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RecentTransactions;
