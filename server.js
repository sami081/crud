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

// routes
app.use("/api/user", userRoutes);

// server
const port = process.env.PORT || 3000; // Utilisation de 3000 si PORT n'est pas défini
console.log(`Port from environment: ${process.env.PORT}`);
console.log(`Server will run on port: ${port}`);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
