const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(
      "mongodb+srv://sami:sami1987@crud.dndehun.mongodb.net/crud"
    );
    console.log("Connected to mongoDB");
  } catch {
    (err) => console.log("Failled to connect", err);
  }
};
module.exports = connectDB;
