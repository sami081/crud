const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");

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
    password: {
      type: String,
      required: true,
      maxLength: 1024,
      minLength: 6,
    },
  },
  {
    timestamps: true,
  }
);

//

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  (this.password = await bcrypt.hash(this.password, salt)), next();
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
