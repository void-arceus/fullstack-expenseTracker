import CategoryDetails from "./CategoryDetails";
import CategoryHeader from "./CategoryHeader";
import AddCategory from "./AddCategory";

function Categories() {
    return (
        <div className="pt-18 h-full w-full px-6 flex items-center gap-4">
            <div className="h-full flex flex-col items-start justify-start gap-4 w-[70%]">
                <CategoryHeader />
                <CategoryDetails />
            </div>
            <div className="w-[30%] h-full flex items-start justify-start">
                <AddCategory />
            </div>
        </div>
    );
}

export default Categories;
