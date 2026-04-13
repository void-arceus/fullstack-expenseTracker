const budgetModel = require("../models/budget.model");

async function setBudget(req, res) {
  try {
    const { budget } = req.body;
    if (!budget) {
      return res.status(400).json({ message: "Budget is requried!" });
    }
    const cleaned = budget.trim().replace(/,/g, "");
    if (cleaned === "") {
      return res.status(400).json({ message: "Invalid Budget Amount" });
    }
    const numBudget = Number(cleaned);
    if (isNaN(numBudget) || numBudget < 0) {
      return res.status(400).json({ message: "Invalid Budget" });
    }
    const findBudget = await budgetModel.findOne({ userId: req.user._id });
    let data = null;
    if (!findBudget) {
      data = await budgetModel.create({
        userId: req.user._id,
        budget: numBudget,
      });
      console.log("I am here");
    } else {
      data = await budgetModel.findOneAndUpdate(
        { userId: req.user._id },
        { budget: numBudget },
        { returnDocument: "after" },
      );
    }
    return res.status(200).json({
      message: "Budget Set Successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getBudget(req, res) {
  try {
    let budget = await budgetModel.findOne({ userId: req.user._id });
    console.log("Budget:", budget);
    if (!budget) budget = { budget: 0 };
    return res
      .status(200)
      .json({ message: "Budget Fetch Successfully", data: budget });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { setBudget, getBudget };
