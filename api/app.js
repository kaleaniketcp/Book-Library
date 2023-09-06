const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bookRouter = require("./routes/apis/books");
const cors = require("cors");
const path = require("path");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => console.log(err));

const app = express();

// cors
app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ extended: false }));

app.use("/apis/books", bookRouter);

app.use(
  express.static(path.join(path.join(__dirname, "./../client"), "build"))
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./../client/build", "index.html"));
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
