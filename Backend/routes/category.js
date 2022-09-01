const Category = require("../models/Category");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newCategory = new Category(req.body);

  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json("Category has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Category
router.get("/find/:id", async (req, res) => {
  try {
    const Category = await Category.findById(req.params.id);
    res.status(200).json(Category);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL CategoryS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let Categorys;

    if (qNew) {
      Categorys = await Category.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      Categorys = await Category.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      Categorys = await Category.find();
    }

    res.status(200).json(Categorys);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
