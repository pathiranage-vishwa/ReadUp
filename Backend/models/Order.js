const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    books: [
      {
        bookId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    pNumber:{type:String,required:true},
    email:{type:String,required:true},
    amount: { type: Number, required: true },
    country:{ type: Number, required: true },
    pcode:{ type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
