const Orders = require("../models/orderModel");
const Users = require("../models/userModel");
const Products = require("../models/bookModel");

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
        transfer_amount,
      } = req.body;
      //const {_id, name, email} = user;

      const newOrder = new Orders({
        user_id,
        name,
        email,
        cart,
        paymentID,
        address,
        country,
        postalCode,
        phoneNumber,
        total: transfer_amount,
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

  getOrderBySellerID: async (req, res) => {
    try {
      const order = await Orders.aggregate([
        { $match: { "cart.seller_id": req.params.seller_id } },
        {
          $project: {
            _id: 1,
            user_id: 1,
            name: 1,
            email: 1,
            address: 1,
            country: 1,
            postalCode: 1,
            phoneNumber: 1,
            paymentID: 1,
            total: 1,
            cart: {
              $filter: {
                input: "$cart",
                as: "cartItem",
                cond: {
                  $eq: ["$$cartItem.seller_id", req.params.seller_id],
                },
              },
            },
          },
        },
      ]);

      res.json(order);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateOrderStatus: async (req, res) => {
    // orderId = req.params.id;

    try {
      const order = await Orders.findOneAndUpdate(
        { _id: req.params.id },
        {
          orderstatus: req.body.orderstatus,
        }
      );
      res.json({ msg: "Order Status Updated" });
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
