const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  expenseType: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: String },
  updatedAt: { type: String },
});
const expenseModel = mongoose.model("expense", expenseSchema);
module.exports = expenseModel;
