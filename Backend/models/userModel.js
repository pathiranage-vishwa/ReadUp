const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userType: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: {
      type: Array,
      default: [],
    },
    wishList: {
      type: Array,
      default: [],
    },
    image: {
      type: String,
      default: "https://res.cloudinary.com/dlprhahi4/image/upload/v1663887060/pngwing.com_ar5lyy.png"
  }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
