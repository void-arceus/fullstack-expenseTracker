import { Controller, useForm } from "react-hook-form";
import { FcBearish, FcBullish } from "react-icons/fc";

interface Inputs {
    transactionName: string;
    transactionAmount: number;
    transactionType: "expense" | "income";
    transactionDate: Date;
    transactionNote?: string;
    categoryId: string;
}

function CreateTransaction() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const { control } = useForm<Inputs>({
        defaultValues: {
            transactionType: "expense",
        },
    });

    return (
        <div className="w-full flex items-center gap-2">
            <div className="flex-2">
                <form className="w-full flex flex-col gap-4 border border-(--border) p-4 rounded-xl bg-(--surface)">
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
                                        onClick={() =>
                                            field.onChange("expense")
                                        }
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
                            {...register("transactionName", { required: true })}
                            placeholder="e.g Groceries, Salary, Movie Tickets..."
                            className="p-3 border border-(--border) outline-0 focus:border-(--border-strong) w-full rounded-lg text-(--text-primary) text-xs font-semibold"
                        />
                        {errors.transactionName && (
                            <span>{errors.transactionName.message}</span>
                        )}
                    </div>

                    <div className="w-full flex flex-col sm:flex-row items-center gap-3">
                        <div className="w-full flex-1 flex flex-col items-start gap-2">
                            <label
                                htmlFor="transactionAmount"
                                className="text-xs font-semibold text-(--text-secondary)"
                            >
                                Amount
                            </label>
                            <input
                                id="transactionAmount"
                                {...register("transactionAmount", {
                                    required: true,
                                    min: 0,
                                })}
                                placeholder="e.g Groceries, Salary, Movie Tickets..."
                                className="p-3 border border-(--border) outline-0 focus:border-(--border-strong) w-full rounded-lg text-(--text-primary) text-xs font-semibold"
                            />
                            {errors.transactionAmount && (
                                <span>{errors.transactionAmount.message}</span>
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
                                    required: true,
                                })}
                                placeholder="e.g Groceries, Salary, Movie Tickets..."
                                className="p-3 border border-(--border) outline-0 focus:border-(--border-strong) w-full rounded-lg text-(--text-primary) text-xs font-semibold"
                            />
                            {errors.transactionDate && (
                                <span>{errors.transactionDate.message}</span>
                            )}
                        </div>
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

                    {/* categories */}
                    <div></div>

                    <div className="w-full flex items-center justify-end gap-3">
                        <button
                            type="button"
                            className="px-3 py-2 text-xs font-semibold border border-(--border) rounded-md hover:cursor-pointer hover:border-(--border-strong) text-(--text-primary) active:scale-[0.98]"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
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
