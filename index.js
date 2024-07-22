const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const app = express();
require("dotenv").config({ path: "./config/.env" });
const connectDB = require("./config/db");
connectDB();
//cors
const corsOptions = {
  origin:  'https://crud-front-ebon.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});
// routes

app.use("/user", userRoutes);

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
