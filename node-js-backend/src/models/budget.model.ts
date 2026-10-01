const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  budget: { type: Number, require: true },
});

const budgetModel = mongoose.model("budget", budgetSchema);

module.exports = budgetModel;
