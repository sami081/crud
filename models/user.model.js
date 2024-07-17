const mongoose = require("mongoose");
const { isEmail } = require("validator");
// const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      trimp: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trimp: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
    },
 
  },
  {
    timestamps: true,
  }
);

//



const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
