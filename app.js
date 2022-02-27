const express = require("express");

const app = express();
const cors = require("cors");
const userRoute = require("./routes/userRoutes");
const notesRoute = require("./routes/notesRoute");
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Server running Successfully</h1>");
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/note", notesRoute);

app.use((err, req, res, next) => {
  res.json({
    status: "Failure",
    error: err.message,
    stack: err.stack,
  });
});

module.exports = app;
