const Books = require("../models/bookModel");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString };

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const bookCtrl = {
  getBooks: async (req, res) => {
    try {
      const features = new APIfeatures(Books.find(), req.query)
        .filtering()
        .sorting()
        .paginating();

      const Book = await features.query;

      res.json({
        status: "success",
        result: Book.length,
        Books: Book,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createBook: async (req, res) => {
    try {
      const {
        //book_id,
        seller_id,
        title,
        author,
        price,
        description,
        content,
        images,
        category,
      } = req.body;
      if (!images) return res.status(400).json({ msg: "No image upload" });

      // const product = await Books.findOne({ _id });
      // if (product)
      //   return res.status(400).json({ msg: "This product already exists." });

      const newProduct = new Books({
        // book_id,
        seller_id,
        title: title.toLowerCase(),
        author,
        price,
        description,
        content,
        images,
        category,
      });

      await newProduct.save();
      res.json({ msg: "Created a product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteBook: async (req, res) => {
    try {
      await Books.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a Product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateBook: async (req, res) => {
    try {
      const { title, author, price, description, content, images, category } =
        req.body;
      if (!images) return res.status(400).json({ msg: "No image upload" });

      await Books.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          author,
          price,
          description,
          content,
          images,
          category,
        }
      );

      res.json({ msg: "Updated a Product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getBookBySellerID: async (req, res) => {
    try {
      const Book = await Books.find({ seller_id: req.params.id });
      res.json(Book);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = bookCtrl;
