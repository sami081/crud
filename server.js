const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const app = express();
require("dotenv").config({ path: "./config/.env" });
const connectDB = require("./config/db");
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/user", userRoutes);

//server
const port = process.env.PORT || 5000; // Défaut à 3000 si en local
app.listen(port, () => {
  console.log(`${port}`);
});
