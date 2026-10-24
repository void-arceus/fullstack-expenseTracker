import { useState, useEffect } from "react";
import { GetTransactions } from "../../api/transactions";
import type { ITransactionInput } from "./CreateTransaction";

type filterValue = "all" | "expense" | "income";

function TransactionsTable() {
  const [filter, setFilter] = useState<filterValue>("all");
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<ITransactionInput[]>([]);

  useEffect(() => {
    GetUserTransactions();
  }, [filter]);

  async function GetUserTransactions() {
    try {
      const res = await GetTransactions(filter);
      setTransactions(res.Data as ITransactionInput[]);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  function Capitalize(text: string): string {
    return text[0].toUpperCase() + text.slice(1, Number(text.length));
  }

  return (
    <div className="h-full w-full flex flex-col gap-4">
      <div className="flex items-center justify-start gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`${filter === "all" ? "bg-(--accent) text-[#ffffff] border-(--accent)" : "border-(--border) text-(--text-primary)"} border text-sm font-bold rounded-full py-1.5 px-8 hover:cursor-pointer select-none`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("income")}
          className={`${filter === "income" ? "bg-(--accent) text-[#ffffff] border-(--accent)" : "border-(--border) text-(--text-primary)"} text-sm font-bold rounded-full py-1.5 px-8 hover:cursor-pointer border select-none`}
        >
          Income
        </button>
        <button
          onClick={() => setFilter("expense")}
          className={`${filter === "expense" ? "bg-(--accent) text-[#ffffff] border-(--accent)" : "border-(--border) text-(--text-primary)"} text-sm font-bold rounded-full py-1.5 px-8 hover:cursor-pointer border select-none`}
        >
          Expense
        </button>
      </div>
      <div className="w-full overflow-x-auto rounded-xl border border-(--border)">
        {/*display transaction table here*/}
        <table className="w-full table-auto text-left text-left text-sm">
          <thead className="bg-(--surface) text-(--text-primary) text-xs sm:text-sm font-extrabold">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-(--border)">
            {transactions.length !== 0
              ? transactions.map((t) => {
                  return (
                    <tr key={t.id}>
                      <td className="px-4 py-3 sm:text-sm text-xs text-(--text-primary) font-semibold">
                        {t.createdAt}
                      </td>
                      <td className="px-4 py-3 sm:text-sm text-xs text-(--text-primary) font-semibold">
                        {Capitalize(t.transactionName)}
                      </td>
                      <td className="px-4 py-3 sm:text-sm text-xs text-(--text-primary) font-semibold">
                        {Capitalize(t.category?.categoryName as string)}
                      </td>
                      <td className="px-4 py-3 sm:text-sm text-xs text-(--text-primary) font-semibold">
                        ₹ {t.transactionAmount}
                      </td>
                      <td className="px-4 py-3 sm:text-sm text-xs text-(--text-primary) font-semibold">
                        {Capitalize(t.transactionType)}
                      </td>
                      <td className="relative px-4 py-3 sm:text-sm text-xs text-(--text-primary) font-semibold">
                        {showOptions && (
                          <div className="absolute p-1 w-20 border border-(--border) rounded-md bottom-6 flex flex-col items-center justify-center bg-(--surface)">
                            <button className="w-full flex items-center justify-start p-1 hover:cursor-pointer hover:bg-(--accent-soft) rounded-sm text-(--accent) hover:text-(--accent-hover) text-xs font-bold">
                              Edit
                            </button>
                            <button className="w-full flex items-center justify-start py-0.5 px-1 hover:cursor-pointer hover:bg-(--accent-soft) rounded-sm text-xs font-bold text-(--accent) hover:text-(--accent-hover)">
                              Delete
                            </button>
                          </div>
                        )}
                        <button
                          onClick={() => setShowOptions((prev) => !prev)}
                          className="hover:cursor-pointer"
                        >
                          ...
                        </button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionsTable;
