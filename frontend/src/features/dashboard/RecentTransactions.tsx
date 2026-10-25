import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { useState, useEffect } from "react";
import type { ITransactionInput } from "../transactions/CreateTransaction";
import { GetTransactions } from "../../api/transactions";

function RecentTransactions() {
  const [transactions, setTransactions] = useState<ITransactionInput[]>([]);

  useEffect(() => {
    handleGetTransactions();
  }, []);

  async function handleGetTransactions() {
    try {
      const res = await GetTransactions();
      setTransactions(res.Data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

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
        {transactions && transactions.length > 0 ? (
          <div className="w-full flex flex-col items-start justify-start gap-4 text-(--text-primary)">
            {transactions.map((t) => {
              let date = new Date(t.transactionDate);
              const formattedDate = date.toLocaleString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              });
              return (
                <div
                  key={t.id}
                  className="w-full flex items-center justify-start gap-4 border-b border-(--border) pb-2"
                >
                  {/* logo */}
                  <div className="h-10 w-10 flex items-center justify-center">
                    <div
                      className={`${t.transactionType === "expense" ? "bg-(--danger-soft)" : "bg-(--success-soft)"} h-10 w-10 border border-(--border) rounded-full text-xs font-bold flex items-center justify-center`}
                    >
                      T
                    </div>
                  </div>
                  <div className="w-full flex items-center">
                    <div className="w-full flex flex-col gap-1">
                      <h1 className="text-xs font-bold">{t.transactionName}</h1>
                      <p className="text-xs text-(--text-secondary) font-semibold">
                        {t.category?.categoryName
                          ? t.category?.categoryName[0].toUpperCase() +
                            t.category?.categoryName.slice(
                              1,
                              t.category?.categoryName.length,
                            )
                          : ""}
                      </p>
                    </div>
                    <div className="w-full flex flex-col items-end gap-1">
                      <p
                        className={`${t.transactionType === "expense" ? "text-(--danger)" : "text-(--success)"} text-xs font-bold flex items-center gap-2`}
                      >
                        {t.transactionType === "expense" ? (
                          <FaArrowTrendDown />
                        ) : (
                          <FaArrowTrendUp />
                        )}
                        {t.transactionAmount}
                      </p>
                      <p className="text-xs font-semibold text-(--text-secondary)">
                        {formattedDate}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
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
