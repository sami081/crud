// const mongoose = require("mongoose");
// const connectDB = async () => {
//   try {
//     mongoose.set("strictQuery", false);
//     mongoose.connect(
//       "mongodb+srv://sami:sami1987@crud.dndehun.mongodb.net/crud"
//     );
//     console.log("Connected to mongoDB");
//   } catch {
//     (err) => console.log("Failled to connect", err);
//   }
// };
// module.exports = connectDB;
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      // useNewUrlParser: true,
      //useUnifiedTopology: true,
      // Autres options MongoDB si nécessaires
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1); // Quitter l'application en cas d'échec de connexion
  }
};

module.exports = connectDB;
