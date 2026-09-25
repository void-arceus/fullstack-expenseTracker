require("dotenv").config();
const express = require("express");
const expenseRouter = require("./routes/expense.route");
const authRouter = require("./routes/auth.route");
const budgetRouter = require("./routes/budget.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    https: false,
  }),
);

app.use("/api/expense", expenseRouter);
app.use("/api/auth", authRouter);
app.use("/api/budget", budgetRouter);

module.exports = app;
