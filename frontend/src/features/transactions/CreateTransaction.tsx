import { Controller, useForm } from "react-hook-form";
import { FcBearish, FcBullish } from "react-icons/fc";
import { useState, useEffect } from "react";
import { GetCategories } from "../../api/categories";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { AddTransaction } from "../../api/transactions";

export interface ITransactionInput {
  transactionName: string;
  transactionAmount: number;
  transactionType: "expense" | "income";
  transactionDate: string;
  transactionNote?: string;
  categoryId: string;
}

interface ICategories {
  id: string;
  userId: string;
  categoryName: string;
  bgColor: string;
  categoryIcon: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

function CreateTransaction() {
  const { user } = useAuth();
  const { displayToast } = useToast();
  const [userCategories, setUserCategories] = useState<ICategories[]>([]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ITransactionInput>({
    defaultValues: {
      categoryId: userCategories[0]?.id,
      transactionType: "expense",
    },
  });

  useEffect(() => {
    getUserCategories();
  }, []);

  async function getUserCategories() {
    try {
      const res = await GetCategories(user?._id as string);
      setUserCategories(res.data);
    } catch (error: any) {
      throw new Error(error?.message);
    }
  }

  async function onSubmit(data: ITransactionInput) {
    try {
      const date = new Date(data.transactionDate).toISOString();
      const amount = Number(data.transactionAmount);
      data.transactionDate = date;
      data.transactionAmount = amount;
      await AddTransaction(data);
      displayToast("success", "Transaction added successfully");
    } catch (error: any) {
      displayToast("error", "Failed to add transaction");
      throw new Error(error.message);
    }
  }

  return (
    <div className="w-full flex items-center gap-2">
      <div className="flex-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4 border border-(--border) p-4 rounded-xl bg-(--surface)"
        >
          <Controller
            name="transactionType"
            control={control}
            render={({ field }) => (
              <div className="w-full flex flex-col items-start justify-start gap-2">
                <p className="text-xs font-semibold text-(--text-secondary)">
                  Transaction Type
                </p>
                <div className="w-full flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => field.onChange("expense")}
                    className={`${field.value === "expense" ? "border border-(--accent) bg-(--accent-soft)" : "border border-(--border)"} flex-1 flex items-center justify-start gap-2 p-2 px-4 rounded-lg text-xs text-(--danger) font-semibold hover:cursor-pointer`}
                  >
                    <span className="p-2 bg-(--danger-soft) rounded-full">
                      <FcBearish size={20} />
                    </span>
                    Expense
                  </button>
                  <button
                    type="button"
                    onClick={() => field.onChange("income")}
                    className={`${field.value === "income" ? "border border-(--accent) bg-(--accent-soft)" : "border border-(--border)"} flex-1 flex items-center justify-start gap-2 p-2 px-4 rounded-lg text-xs text-(--success) font-semibold hover:cursor-pointer`}
                  >
                    <span className="p-2 rounded-full bg-(--success-soft)">
                      <FcBullish size={20} />
                    </span>
                    Income
                  </button>
                </div>
              </div>
            )}
          />

          <div className="w-full flex flex-col items-start gap-2">
            <label
              htmlFor="transactionName"
              className="text-xs font-semibold text-(--text-secondary)"
            >
              Transaction Name
            </label>
            <input
              id="transactionName"
              {...register("transactionName", {
                required: "Transaction name is required",
              })}
              placeholder="e.g Groceries, Salary, Movie Tickets..."
              className="p-3 border border-(--border) outline-0 focus:border-(--border-strong) w-full rounded-lg text-(--text-primary) text-xs font-semibold"
            />
            {errors.transactionName && (
              <span className="text-xs font-semibold text-(--danger)">
                {errors.transactionName.message}
              </span>
            )}
          </div>

          <div className="w-full flex flex-col sm:flex-row items-start gap-3">
            <div className="w-full flex-1 flex flex-col items-start gap-2">
              <label
                htmlFor="transactionAmount"
                className="text-xs font-semibold text-(--text-secondary)"
              >
                Amount
              </label>
              <input
                id="transactionAmount"
                type="number"
                {...register("transactionAmount", {
                  required: "Transaction amount is required",
                  min: 0,
                })}
                placeholder="e.g Groceries, Salary, Movie Tickets..."
                className="p-3 border border-(--border) outline-0 focus:border-(--border-strong) w-full rounded-lg text-(--text-primary) text-xs font-semibold"
              />
              {errors.transactionAmount && (
                <span className="text-xs font-semibold text-(--danger)">
                  {errors.transactionAmount.message}
                </span>
              )}
            </div>

            <div className="w-full flex-1 flex flex-col items-start gap-2">
              <label
                htmlFor="transactionDate"
                className="text-xs font-semibold text-(--text-secondary)"
              >
                Transaction Date
              </label>
              <input
                id="transactionDate"
                type="Date"
                {...register("transactionDate", {
                  required: "Transaction date is required",
                })}
                placeholder="e.g Groceries, Salary, Movie Tickets..."
                className="p-3 border border-(--border) outline-0 focus:border-(--border-strong) w-full rounded-lg text-(--text-primary) text-xs font-semibold"
              />
              {errors.transactionDate && (
                <span className="text-xs font-semibold text-(--danger)">
                  {errors.transactionDate.message}
                </span>
              )}
            </div>
          </div>

          <div className="w-full flex items-center justify-start gap-2">
            <label
              htmlFor="category"
              className="text-xs font-semibold text-(--text-secondary)"
            >
              Category:
            </label>
            <select
              id="category"
              {...register("categoryId")}
              defaultValue={userCategories[0]?.id}
              className="border border-(--border) rounded-lg hover:cursor-pointer text-sm font-semibold text-(--text-secondary) p-2"
            >
              {userCategories &&
                userCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.categoryName.charAt(0).toUpperCase() +
                      c.categoryName.slice(1)}
                  </option>
                ))}
            </select>
          </div>

          <div className="w-full flex flex-col items-start gap-2">
            <label
              htmlFor="transactionDate"
              className="text-xs font-semibold text-(--text-secondary)"
            >
              Note (Optional)
            </label>
            <textarea
              id="transactionNote"
              {...register("transactionNote")}
              placeholder="Add a note...(e.g. bought groceries for the week)"
              className="p-3 border border-(--border) outline-0 focus:border-(--border-strong) w-full rounded-lg text-(--text-primary) text-xs font-semibold h-25 resize-none"
            />
            {errors.transactionName && (
              <span>{errors.transactionName.message}</span>
            )}
          </div>

          <div className="w-full flex items-center justify-end gap-3">
            <button
              type="button"
              className="px-3 py-2 text-xs font-semibold border border-(--border) rounded-md hover:cursor-pointer hover:border-(--border-strong) text-(--text-primary) active:scale-[0.98]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 text-xs font-semibold rounded-md hover:cursor-pointer text-[#ffffff] bg-(--accent) hover:bg-(--accent-hover) active:scale-[0.98]"
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
      <div className="flex-1">info</div>
    </div>
  );
}

export default CreateTransaction;
