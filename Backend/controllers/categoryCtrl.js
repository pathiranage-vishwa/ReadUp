const Category = require("../models/categoryModel");
const Products = require("../models/bookModel");

const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      const { categoryName, date, description } = req.body;
      const resCategory = await Category.findOne({ categoryName });

      if (resCategory)
        return res.status(400).json({ msg: "This category already exists." });

      const newCategory = new Category({ categoryName, date, description });

      await newCategory.save();
      res.json({ msg: "Created a category" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const products = await Products.findOne({ category: req.params.id });
      if (products)
        return res.status(400).json({
          msg: "Please delete all products with a relationship.",
        });

      await Category.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a Category" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { categoryName } = req.body;
      await Category.findOneAndUpdate({ _id: req.params.id }, { categoryName });

      res.json({ msg: "Updated a category" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = categoryCtrl;
