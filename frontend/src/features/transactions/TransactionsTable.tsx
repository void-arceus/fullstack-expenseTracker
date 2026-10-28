import { useState, useEffect } from "react";
import { GetTransactions } from "../../api/transactions";
import type { ITransactionInput } from "./CreateTransaction";

type filterValue = "all" | "expense" | "income";
type sortValue = "desc" | "asc";

function TransactionsTable() {
  const [filter, setFilter] = useState<filterValue>("all");
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<ITransactionInput[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy, setSortBy] = useState<sortValue>("desc");

  useEffect(() => {
    GetUserTransactions();
  }, [filter, page]);

  async function GetUserTransactions() {
    try {
      const res = await GetTransactions(filter, sortBy, String(page), "10");
      setTransactions(res.Data.transactions as ITransactionInput[]);
      setTotalPages(res.Data.totalPages);
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
          onClick={() => {
            setFilter("all");
            setPage(1);
          }}
          className={`${filter === "all" ? "bg-(--accent) text-[#ffffff] border-(--accent)" : "border-(--border) text-(--text-primary)"} border text-sm font-bold rounded-full py-1.5 px-8 hover:cursor-pointer select-none`}
        >
          All
        </button>
        <button
          onClick={() => {
            setFilter("income");
            setPage(1);
          }}
          className={`${filter === "income" ? "bg-(--accent) text-[#ffffff] border-(--accent)" : "border-(--border) text-(--text-primary)"} text-sm font-bold rounded-full py-1.5 px-8 hover:cursor-pointer border select-none`}
        >
          Income
        </button>
        <button
          onClick={() => {
            setFilter("expense");
            setPage(1);
          }}
          className={`${filter === "expense" ? "bg-(--accent) text-[#ffffff] border-(--accent)" : "border-(--border) text-(--text-primary)"} text-sm font-bold rounded-full py-1.5 px-8 hover:cursor-pointer border select-none`}
        >
          Expense
        </button>
      </div>
      <div className="w-full overflow-x-auto rounded-xl border border-(--border)">
        {/*display transaction table here*/}
        <table className="w-full table-auto text-left text-left text-sm">
          <thead className="text-(--accent) text-xs sm:text-sm font-extrabold bg-(--accent-soft)">
            <tr>
              <th className="px-4 py-3 border-b border-(--border)">Date</th>
              <th className="px-4 py-3 border-b border-(--border)">Name</th>
              <th className="px-4 py-3 border-b border-(--border)">Category</th>
              <th className="px-4 py-3 border-b border-(--border)">Amount</th>
              <th className="px-4 py-3 border-b border-(--border)">Type</th>
              <th className="px-4 py-3 border-b border-(--border)">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-(--border) bg-(--surface)">
            {transactions.length !== 0
              ? transactions.map((t) => {
                  let date = new Date(t.transactionDate);
                  let formattedDate = date.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  });
                  return (
                    <tr key={t.id}>
                      <td className="px-4 py-3.5 sm:text-sm text-xs text-(--text-primary) font-semibold">
                        {formattedDate}
                      </td>
                      <td className="px-4 py-3.5 sm:text-sm text-xs text-(--text-primary) font-semibold">
                        {Capitalize(t.transactionName)}
                      </td>
                      <td className="px-4 py-3.5 sm:text-sm text-xs text-(--text-primary) font-semibold">
                        <span
                          className={`px-4 py-1.5 text-(--text-primary) rounded-full text-xs font-bold`}
                          style={{
                            backgroundColor: t.category?.bgColor,
                            color: `#ffffff`,
                          }}
                        >
                          {Capitalize(t.category?.categoryName as string)}
                        </span>
                      </td>
                      <td
                        className={`px-4 py-3.5  sm:text-sm text-xs font-semibold ${t.transactionType == "expense" ? "text-(--danger)" : "text-(--success)"}`}
                      >
                        ₹ {t.transactionAmount}
                      </td>
                      <td
                        className={`px-4 py-3.5 sm:text-sm text-xs font-semibold ${t.transactionType == "expense" ? "text-(--danger)" : "text-(--success)"}`}
                      >
                        {Capitalize(t.transactionType)}
                      </td>
                      <td className="relative px-4 py-3.5 sm:text-sm text-xs text-(--text-primary) font-semibold">
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
            <tr>
              <td colSpan={100}>
                <div className="w-full py-3.5 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setPage(1);
                    }}
                    className="px-2 py-1 border border-(--accent) rounded-md text-xs font-semibold text-(--accent) hover:cursor-pointer active:scale-[0.96] transition transform-scale duration-100 ease-in-out"
                  >
                    First
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (page == 1) return;
                      setPage((prev) => prev - 1);
                    }}
                    className="px-2 py-1 border border-(--accent) rounded-md text-xs font-semibold text-(--accent) hover:cursor-pointer active:scale-[0.96] transition transform-scale duration-100 ease-in-out"
                  >
                    Prev
                  </button>
                  <div className="h-6 w-6 text-xs font-bold text-(--accent) border border-(--accent) rounded-full flex items-center justify-center">
                    {page}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (page == totalPages) return;
                      setPage((prev) => prev + 1);
                    }}

                    className="px-2 py-1 border border-(--accent) rounded-md text-xs font-semibold text-(--accent) hover:cursor-pointer active:scale-[0.96] transition transform-scale duration-100 ease-in-out"
                  >
                    Next
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPage(totalPages);
                    }}
                    className="px-2 py-1 border border-(--accent) rounded-md text-xs font-semibold text-(--accent) hover:cursor-pointer active:scale-[0.96] transition transform-scale duration-100 ease-in-out"
                  >
                    Last
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionsTable;
