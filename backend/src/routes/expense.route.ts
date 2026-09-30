const express = require("express");
const expenseController = require("../controllers/expense.controller");
const authMiddleware = require("../Middleware/auth.middleware");

const router = express.Router();

router.post(
  "/addExpense",
  authMiddleware.authUser,
  expenseController.addNewExpense,
);
router.get(
  "/getExpenses",
  authMiddleware.authUser,
  expenseController.getUserExpenses,
);
router.delete(
  "/deleteExpense/:id",
  authMiddleware.authUser,
  expenseController.deleteUserExpense,
);

router.put(
  "/updateExpense/:id",
  authMiddleware.authUser,
  expenseController.updateExpense,
);

module.exports = router;
