import { transactions } from "../dashboard/RecentTransactions";

function TransactionsTable() {
    return (
        <div className="h-full w-full">
            <div className="flex items-center justify-start gap-4">
                <button className="text-sm font-semibold select-none ">
                    All
                </button>
                <button>Income</button>
                <button>Expense</button>
            </div>
            <div></div>
        </div>
    );
}

export default TransactionsTable;
