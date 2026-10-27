import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useToast } from "../../context/ToastContext";
import { AddCategoryHandler } from "../../api/categories";

export interface ICreateCategory {
  categoryName: string;
  bgColor: string;
}

const colors = [
  { id: 0, color: "#3B82F6" },
  { id: 1, color: "#22C55E" },
  { id: 2, color: "#F59E0B" },
  { id: 3, color: "#EF4444" },
  { id: 4, color: "#8B5CF6" },
  { id: 5, color: "#14B8A6" },
  { id: 6, color: "#EC4899" },
  { id: 7, color: "#84CC16" },
  { id: 8, color: "#64748B" },
];

function AddCategory() {
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryNameError, setCategoryError] = useState<string>("");
  const { displayToast } = useToast();

  async function handleSubmit() {
    const cleanCategoryName: string = categoryName.trim();
    if (cleanCategoryName === "") {
      setCategoryError("Category name is required");
      return;
    }
    if (cleanCategoryName.length >= 31) {
      setCategoryError("Name length should not exceed 30 chars");
      return;
    }

    const bgColor: string = colors[selectedColor].color;
    const data: ICreateCategory = {
      categoryName: cleanCategoryName,
      bgColor: bgColor,
    };

    try {
      await AddCategoryHandler(data);
      displayToast("success", "Category added successfully");
      setCategoryError("");
      setCategoryName("");
      setSelectedColor(0);
    } catch (error: any) {
      displayToast("error", "Failed to add category");
      return;
    }
  }

  return (
    <div className="h-full w-full pt-18">
      <div className="w-full py-4 p-2 border border-(--border) rounded-lg shadow-sm bg-(--surface) flex flex-col gap-4">
        <div className="w-full text-start">
          <h1 className="text-md font-bold text-(--text-primary)">
            Add New Category
          </h1>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
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
              value={categoryName}
              onChange={(e) => {
                let curr: string = e.target.value;
                if (curr.trim().length > 30) {
                  setCategoryError("Name length cannot be more thatn 30");
                  return;
                }
                setCategoryName(curr);
                setCategoryError("");
              }}
              placeholder="e.g. Grocerries, Travel etc (30 chars max)"
              className="p-2.5 w-full outline-0 border border-(--border) bg-surface rounded-lg text-xs text-(--text-secondary) font-semibold focus:border-(--border-strong)"
            />
            {categoryNameError !== "" && (
              <span className="text-xs font-bold text-(--danger)">
                {categoryNameError}
              </span>
            )}
          </div>
          <div className="w-full flex items-start justify-between gap-2">
            {colors.map((color) => {
              return (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => setSelectedColor(color.id)}
                  style={{ backgroundColor: color.color }}
                  className={`h-6 w-6 rounded-full hover:cursor-pointer flex items-center justify-center text-[#ffffff]`}
                >
                  {selectedColor === color.id ? <FaCheck size={12} /> : ""}
                </button>
              );
            })}
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="text-xs font-bold p-2.5 w-full bg-(--accent) text-[#ffffff] rounded-lg hover:cursor-pointer hover:bg-(--accent-hover) shadow-sm hover:shadow-md active:scale-[0.96] transition transform-scale duration-100 ease-in"
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
