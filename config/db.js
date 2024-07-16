const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB");
  } catch {
    (err) => console.log("Failled to connect", err);
  }
};
module.exports = connectDB;
