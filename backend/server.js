require("dotenv").config();

const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(cors());
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", function () {
  console.log("Connected to Database");

  // List all collections in the connected database

  db.db.listCollections().toArray(function (err, collections) {
    if (err) {
      console.error("Error fetching collections:", err);
      return;
    }
    console.log("Collections in the Database:");
    collections.forEach((collection) => console.log(collection.name));
  });
});

app.use(express.json());

const locationRouter = require("./routes/location");
app.use("/location", locationRouter);

app.listen(3000, () => console.log("Server Started on port 3000"));
