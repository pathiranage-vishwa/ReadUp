const Orders = require("../models/orderModel");
const Users = require("../models/userModel");
const Products = require("../models/bookModel");
const md5 = require("md5");

const orderCtrl = {
  getOrders: async (req, res) => {
    try {
      const Orders = await Orders.find();
      res.json(Orders);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createOrder: async (req, res) => {
    try {
      // const user = await Users.findById(req.user.id).select('name email')
      // if(!user) return res.status(400).json({msg: "User does not exist."})

      const {
        user_id,
        name,
        email,
        cart,
        paymentID,
        address,
        country,
        postalCode,
        phoneNumber,
        transfer_amount
      } = req.body;
      //const {_id, name, email} = user;

      const newOrder = new Orders({
        user_id,
        name,
        email,
        cart,
<<<<<<< Updated upstream
        paymentID,
=======
        paymentID:md5(`${user_id}${req.body.time}${req.body.date}`),
>>>>>>> Stashed changes
        address,
        country,
        postalCode,
        phoneNumber,
        total:transfer_amount,
      });

      // cart.filter(item => {
      //     return sold(item._id, item.quantity, item.sold)
      // })

      await newOrder.save();
      res.json({ msg: "Order Succes!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const sold = async (id, quantity, oldSold) => {
  await Products.findOneAndUpdate(
    { _id: id },
    {
      sold: quantity + oldSold,
    }
  );
};

module.exports = orderCtrl;
