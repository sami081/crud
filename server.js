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
const https = require('https');
const port = process.env.PORT || 5000; // Défaut à 3000 si en local
const server = https.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
