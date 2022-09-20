const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cardSchema = new Schema(
  {
    uid: {
        type: String,
        required : true
    },

    cardNumber: {
      type: String,
      required: true,
    },
    firstFourDigits:{
      type: String,
      required: true,
    },
    cardType: {
      type: String,
      required: true,
    },

    cardHolderName: {
      type: String,
      required: true,
    },

    cardSecurityCode: {
      type: String,
      required: true,
    },
    ExDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Card = mongoose.model("Card", cardSchema);
module.exports = Card;
