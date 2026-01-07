const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// Request 1
app.get("/", (req, res) => {
  res.send("CI/CD Project - NodeJS App");
});

// Request 2
app.get("/hello/:name", (req, res) => {
  res.json({
    message: `Hello ${req.params.name}`
  });
});

// Request 3
app.post("/sum", (req, res) => {
  const { a, b } = req.body;
  res.json({
    result: a + b
  });
});

// Request 4 (NEW)
app.get("/info", (req, res) => {
  res.json({
    app: "NodeJS CI/CD Demo",
    version: "1.0.0",
    serverTime: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
