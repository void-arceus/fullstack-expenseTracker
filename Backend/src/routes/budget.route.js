const express = require("express");
const budgetController = require("../controllers/budget.controller");
const authMiddleware = require("../Middleware/auth.middleware");

const router = express.Router();

router.post("/setBudget", authMiddleware.authUser, budgetController.setBudget);

module.exports = router;
