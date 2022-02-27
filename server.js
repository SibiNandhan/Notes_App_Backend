const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.DB_URL.replace("<password>", process.env.DB_PASSWORD))
  .then(() => console.log("Connected Successfully"))
  .catch((err) => console.log(err.message));

app.listen(process.env.PORT, () => {
  console.log("Server started Successfully");
});
