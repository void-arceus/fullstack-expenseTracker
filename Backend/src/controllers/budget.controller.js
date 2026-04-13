const budgetModel = require("../models/budget.model");

async function setBudget(req, res) {
  try {
    const { budget } = req.body;
    if (!budget) {
      return res.status(400).json({ message: "Budget is requried!" });
    }
    const data = await budgetModel.create({
      userId: req.user._id,
      budget: budget,
    });
    console.log(data);
    return res.status(200).json({
      message: "Budget Updated Successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
module.exports = { setBudget };
