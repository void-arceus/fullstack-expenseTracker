function AddCategory() {
    return (
        <div className="h-full w-full pt-18">
            <div className="w-full py-4 p-2 border border-(--border) rounded-lg shadow-sm bg-(--surface) flex flex-col gap-4">
                <div className="w-full text-start">
                    <h1 className="text-md font-bold">Add New Category</h1>
                </div>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="w-full flex flex-col items-start gap-4"
                >
                    <div className="w-full flex flex-col items-start justify-start gap-1">
                        <label
                            htmlFor="categoryName"
                            className="text-xs font-semibold text-(--text-primary)"
                        >
                            Category Name
                        </label>
                        <input
                            id="categoryName"
                            placeholder="e.g. Grocerries, Travel etc"
                            className="p-2.5 w-full outline-0 border border-(--border) bg-surface rounded-lg text-xs text-(--text-secondary) font-semibold focus:border-(--border-strong)"
                        />
                    </div>
                    <div className="w-full flex flex-col items-start justify-start gap-1">
                        <label
                            htmlFor="budget"
                            className="text-xs font-semibold text-(--text-primary)"
                        >
                            Monthly Budget
                        </label>
                        <input
                            id="budget"
                            placeholder="e.g. 500, 1000j"
                            className="p-2.5 w-full outline-0 border border-(--border) bg-surface rounded-lg text-xs text-(--text-secondary) font-semibold focus:border-(--border-strong)"
                        />
                    </div>
                    <div className="w-full">
                        <button
                            type="submit"
                            className="text-xs font-semibold p-2.5 w-full bg-(--accent) text-[#ffffff] rounded-lg hover:cursor-pointer hover:bg-(--accent-hover) shadow-sm hover:shadow-md active:scale-[0.96] transition transform-scale duration-100 ease-in"
                        >
                            Add Category
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddCategory;
