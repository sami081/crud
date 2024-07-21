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
      required: true,
      
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

// cript le password a l' inscription

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  (this.password = await bcrypt.hash(this.password, salt)), next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
