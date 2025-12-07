require("dotenv").config();
const express = require("express");
const transactionRoutes = require("./routes/transactionRoutes");
const analytics = require("./utils/analytics");
const errorHandler = require("./middleware/errorHandler");
const logger = require("./middleware/logger");


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "test") {
    res.pretty = (data) => res.json(data);
    return next();
  }

  res.pretty = (data) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(data, null, 2));
  };
  next();
});
app.use(logger);

// Transaction routes
app.use("/transactions", transactionRoutes);

// Summary route
app.get("/summary", async (req, res, next) => {
  try {
    const summary = await analytics.computeSummary();
    res.json(summary);
  } catch (err) {
    next(err);
  }
});

app.get("/", (req, res) => {
  res.send(`Welcome to ${process.env.APP_NAME || "the Finance App"}`);
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
