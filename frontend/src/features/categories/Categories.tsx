import CategoryDetails from "./CategoryDetails";
import CategoryHeader from "./CategoryHeader";
import AddCategory from "./AddCategory";

function Categories() {
    return (
        <div className="pt-18 h-full w-full min-w-0 px-6 flex items-center gap-4">
            <div className="h-full min-w-0 flex-1 flex flex-col items-start justify-start gap-4 overflow-scroll">
                <CategoryHeader />
                <CategoryDetails />
            </div>

            <div className="hidden xl:flex w-80 shrink-0 h-full items-start justify-start">
                <AddCategory />
            </div>
        </div>
    );
}

export default Categories;
