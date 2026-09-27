import CategoryCards from "./CategoryCards";

function CategoryHeader() {
    return (
        <div className="w-full py-3 flex flex-col items-start justify-start gap-4">
            <div>
                <h1 className="text-xl font-bold text-(--text-primary)">
                    Categories
                </h1>
                <p className="text-xs font-semibold text-(--text-secondary)">
                    Manage your spending categories and track your expenses
                    better.
                </p>
            </div>
            <CategoryCards />
        </div>
    );
}

export default CategoryHeader;
