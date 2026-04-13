const expenseModel = require("../models/expense.model");

async function addNewExpense(req, res) {
  try {
    const { name, amount, description, expenseType, category } = req.body;
    if (!name || !amount || !description || !expenseType || !category) {
      return res.status(400).json({ message: "Missing Data!" });
    }
    if (name.trim() === "" || description.trim() === "") {
      return res.status(400).json({ message: "Invalid Data" });
    }
    const date = new Date().toDateString();
    const expenseData = await expenseModel.create({
      userId: req.user._id,
      name: name,
      amount: Number(amount),
      description: description,
      expenseType: expenseType,
      category: category,
      createdAt: date,
      updatedAt: "n/a",
    });
    return res.status(201).json({
      message: "Expense added Successfully",
      expenseData: expenseData,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getUserExpenses(req, res) {
  try {
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const filterBy = req.query.filterBy || "all";
    const filterValue = req.query.filterValue || "";
    const sortBy = req.query.sortBy || undefined;
    const sortValue = req.query.sortValue || "desc";

    // valid || expected filter values
    const validFilterByValues = ["all", "expenseType"];
    const validFilterValues = ["expense", "income"];
    const validSortByValues = ["amount", "createdAt", "updated"];
    const validSortValues = ["asc", "desc"];

    // checking for valid fitler values
    if (filterBy !== undefined) {
      const isValidFilterBy = validFilterByValues.find((el) => el === filterBy);
      if (filterValue !== "") {
        const isValidFilterValue = validFilterValues.find(
          (el) => el === filterValue,
        );
        if (!isValidFilterValue) {
          return res.status(400).json({ message: "Bad Request" });
        }
      }
      if (!isValidFilterBy) {
        return res.status(400).json({ message: "Bad Request" });
      }
    }

    // filter data if requested
    const expenseData =
      filterBy === "all"
        ? await expenseModel.find({ userId: req.user._id })
        : await expenseModel.find({
            userId: req.user._id,
            [filterBy]: filterValue,
          });

    if (sortBy !== undefined) {
      const isValidSortBy = validSortByValues.find((el) => el === sortBy);
      const isValidSortValue = validSortValues.find((el) => el === sortValue);
      if (!isValidSortBy || !isValidSortValue) {
        return res.status(400).json({ message: "Bad Request" });
      }
      if (sortValue === "asc") {
        expenseData.sort((a, b) => a[sortBy] - b[sortBy]);
      } else {
        expenseData.sort((a, b) => b[sortBy] - a[sortBy]);
      }
    }

    // pagination
    let end = page * limit;
    let start = end - limit;
    let totalPages = Math.ceil(Number(expenseData.length) / limit);
    const paginatedData = expenseData.slice(start, end);

    return res.status(200).json({
      message: "Data fetched successfully",
      data: { data: paginatedData },
      totalPages: totalPages,
      page: page,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteUserExpense(req, res) {
  try {
    const expenseId = req.params.id;
    if (!expenseId) {
      return res.status(400).json({ message: "Bad Request" });
    }
    const result = await expenseModel.findByIdAndDelete({
      userId: req.user._id,
      _id: expenseId,
    });
    if (result === null) {
      return res.status(401).json({ message: "Not Authorized" });
    }
    return res.status(200).json({ message: "Expense deleted successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateExpense(req, res) {
  try {
    const expenseId = req.params.id;
    if (!expenseId) {
      return res.status(400).json({ message: "Bad Request" });
    }
    const currDate = new Date().toDateString();
    const updatedExpense = await expenseModel.findOneAndUpdate(
      {
        _id: expenseId,
        userId: req.user._id,
      },
      { $set: { ...req.body, updatedAt: currDate } },
      { new: true, runValidators: true },
    );
    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense data not found" });
    }
    return res.status(200).json({ message: "Expense Updated Successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  addNewExpense,
  getUserExpenses,
  deleteUserExpense,
  updateExpense,
};
