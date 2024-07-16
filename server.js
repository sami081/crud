const express = require("express");

const userRoutes = require("./routes/user.routes")
const app = express();

const connectDB = require("./config/db");
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/user", userRoutes);

//server
app.listen(5000, () => {
  console.log("Listening on port 5000");
});
