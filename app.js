const express = require("express");
const port = process.env.PORT || 3000;
const path = require("path");
const mongoose = require("mongoose");
const ahaRouter = require("./routes/aha");
const methodOverride = require("method-override");

mongoose
  .connect("mongodb://127.0.0.1:27017/aha", {})
  .then(() => console.log("mongodb connected"))
  .catch((e) => console.log(e));

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "./public")));
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(express.urlencoded({ extended: true }));

app.use("/", ahaRouter);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
