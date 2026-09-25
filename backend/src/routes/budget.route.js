const express = require("express");
const budgetController = require("../controllers/budget.controller");
const authMiddleware = require("../Middleware/auth.middleware");

const router = express.Router();

router.put("/setBudget", authMiddleware.authUser, budgetController.setBudget);
router.get("/getBudget", authMiddleware.authUser, budgetController.getBudget);

module.exports = router;
