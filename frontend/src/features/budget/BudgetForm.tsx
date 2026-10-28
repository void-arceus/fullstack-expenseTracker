import { useState, useEffect } from "react";
import type { ICategories } from "../transactions/CreateTransaction";
import { GetCategories } from "../../api/categories";
import { useForm } from "react-hook-form";
import { handleCreateBudget } from "../../api/budget";
import { useToast } from "../../context/ToastContext";

type Period = "weekly" | "monthly" | "yearly";

export interface IBudget {
  categoryId: string;
  budgetAmount: number;
  period: Period;
  startDate: string;
  budgetNote?: string;
}

function BudgetForm() {
  const [userCategories, setUserCategories] = useState<ICategories[] | null>(
    null,
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IBudget>({
    defaultValues: {
      categoryId: userCategories ? userCategories[0].id : "",
    },
  });
  const { displayToast } = useToast();

  useEffect(() => {
    getUserCategories();
  }, []);

  async function handleFormSubmit(data: IBudget) {
    let convertedDate = new Date(data.startDate).toISOString();
    let amount = Number(data.budgetAmount);
    data.startDate = convertedDate;
    data.budgetAmount = amount;
    data.period = "monthly";
    try {
      await handleCreateBudget(data);
      displayToast("success", "Budget created successfully");
      reset();
    } catch (error: any) {
      console.error(error.message);
      displayToast("error", "Failed to create budget");
    }
  }

  async function getUserCategories() {
    try {
      const res = await GetCategories();
      setUserCategories(res.data);
    } catch (error: any) {
      console.error(error.message);
      return;
    }
  }

  return (
    <div className="flex-2 border border-(--border) rounded-xl p-2 bg-(--surface)">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="w-full p-2 flex flex-col items-start justify-start gap-4"
      >
        <div className="w-full flex flex-col items-start justify-start gap-2">
          <label
            htmlFor="category"
            className="text-xs font-bold text-(--text-secondary)"
          >
            Category
          </label>
          <select
            id="category"
            {...register("categoryId", {
              required: "You must select a category",
            })}
            className="w-full border border-(--border) rounded-lg p-2 text-xs font-semibold text-(--text-secondary) hover:cursor-pointer"
          >
            {userCategories
              ? userCategories.map((c) => {
                  return (
                    <option key={c.id} value={c.id}>
                      {c.categoryName[0].toUpperCase() +
                        c.categoryName.slice(1)}
                    </option>
                  );
                })
              : null}
          </select>
          {errors.categoryId && (
            <span className="text-xs font-semibold text-(--danger)">
              {errors.categoryId.message}
            </span>
          )}
        </div>
        <div className="w-full flex flex-col items-start justify-start gap-2">
          <label
            id="budgetAmount"
            className="text-xs font-bold text-(--text-secondary)"
          >
            Budget Amount
          </label>
          <input
            id="budgetAmount"
            placeholder="Amount"
            type="number"
            {...register("budgetAmount", {
              required: "Budget Amount is required",
              min: {
                value: 0,
                message: "Amount cannot be negative",
              },
            })}
            className="w-full border border-(--border) rounded-lg outline-0 py-2.5 p-2 text-xs text-(--text-secondary) font-semibold focus:border-(--border-strong)"
          />
          {errors.budgetAmount && (
            <span className="text-xs font-semibold text-(--danger)">
              {errors.budgetAmount.message}
            </span>
          )}
        </div>
        <div className="w-full flex flex-col items-start justify-start gap-2">
          <p className="text-xs font-bold text-(--text-secondary)">
            Time Period
          </p>
          <div className="w-full flex items-center justify-start gap-3">
            <span className="px-6 py-2.5 text-xs font-semibold rounded-lg bg-(--accent) text-[#ffffff] select-none shadow-xs hover:shadow-sm hover:cursor-pointer">
              Monthly
            </span>
            <span className="px-6 py-2.5 text-xs font-semibold rounded-lg text-(--text-primary) select-none shadow-xs hover:shadow-sm hover:cursor-pointer border border-(--border)">
              Yearly
            </span>
          </div>
        </div>
        <div className="w-full flex flex-col items-start justify-start gap-2">
          <label
            htmlFor="startDate"
            className="text-xs font-bold text-(--text-secondary)"
          >
            Start Date
          </label>
          <input
            {...register("startDate", {
              required: "Start date is required",
            })}
            id="startDate"
            type="date"
            className="w-full border border-(--border) rounded-lg outline-0 py-2.5 p-2 text-xs text-(--text-secondary) font-semibold focus:border-(--border-strong)"
          />
          {errors.startDate && (
            <span className="text-xs font-semibold text-(--danger)">
              {errors.startDate?.message}
            </span>
          )}
        </div>
        <div className="w-full flex flex-col items-start justify-start gap-2">
          <label
            htmlFor="budgetNote"
            className="text-xs font-bold text-(--text-secondary)"
          >
            Notes (optional)
          </label>
          <textarea
            id="budgetNote"
            placeholder="Add a note about this budget..."
            className="h-20 w-full border border-(--border) rounded-lg outline-0 p-2 text-xs text-(--text-secondary) font-semibold focus:border-(--border-strong) resize-none"
          />
        </div>
        <div className="w-full flex items-center justify-between">
          <button
            type="button"
            className="text-xs font-semibold text-(--text-primary) border px-4 py-2 border-(--border) hover:cursor-pointer hover:border-(--border-strong) rounded-lg bg-(--surface) hover:bg-(--surface-hover) active:scale-[0.96] select-none"
          >
            Clear
          </button>
          <button
            type="submit"
            className="px-4 p-2 bg-(--accent) hover:bg-(--accent-hover) hover:cursor-pointer rounded-lg text-[#ffffff] text-xs font-semibold shadow-sm hover:shadow-md active:scale-[0.96] select-none"
          >
            Create Budget
          </button>
        </div>
      </form>
    </div>
  );
}

export default BudgetForm;
