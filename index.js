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
// const corsOptions = {
//   origin :process.env.CLIENT_URL,
//   credentials : true,
//   'allowedHeaders' : ['sessionId', 'Content-type'],
//   'exposedHeaders' : ['sessionId'],
//   'methods' : 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   'preflightContinue' : false
// }

app.use(cors({
  origin: 'https://crud-front-ebon.vercel.app', // URL de votre frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes HTTP autorisées
  allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
  credentials: true // Permet les informations d'identification
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//jwt
app.get("/", checkUser);
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
