const Orders = require("../models/orderModel");
const Users = require("../models/userModel");
const Products = require("../models/bookModel");

const orderCtrl = {
  //get one user orders
  getOrders: async (req, res) => {
    try {
      const orders = await Orders.find({"user_id":req.params.buyer_id});
      res.json(orders);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createOrder: async (req, res) => {
    try {
      
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


      await newOrder.save();
      res.json({ msg: "Order Succes!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

// get orders for seller
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
            orderstatus: 1,
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
