const Requests = require("../models/requestBookModel");
const Products = require("../models/bookModel");

const requestBookCtrl = {
  getRequests: async (req, res) => {
    try {
      const requests = await Requests.find();
      res.json(requests);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createRequests: async (req, res) => {
    try {
      const { bookName, category, author, isbnNumber } = req.body;
      const resRequest = await Requests.findOne({ bookName });

      if (resRequest)
        return res.status(400).json({ msg: "This Request already exists." });

      const newRequest = new Requests({
        bookName,
        category,
        author,
        isbnNumber,
      });

      await newRequest.save();
      res.json({ msg: "Created a Request" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteRequest: async (req, res) => {
    try {
      await Requests.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a Request" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateRequest: async (req, res) => {
    try {
      const { bookName, category, author, isbnNumber } = req.body;
      await Requests.findOneAndUpdate(
        { _id: req.params.id },
        { bookName, category, author, isbnNumber }
      );

      res.json({ msg: "Updated a Request" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateRequestStatus: async (req, res) => {
    try {
      const { status } = req.body;
      await Requests.findOneAndUpdate({ _id: req.params.id }, { status });

      res.json({ msg: "Updated Request Status" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = requestBookCtrl;
