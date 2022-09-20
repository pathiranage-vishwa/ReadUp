const router = require("express").Router();
const bookCtrl = require("../controllers/bookCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.route("/book").get(bookCtrl.getBooks).post(bookCtrl.createBook);

router
  .route("/book/:id")
  .delete(auth, authAdmin, bookCtrl.deleteBook)
  .put(bookCtrl.updateBook)
  .get(bookCtrl.getBookBySellerID);

module.exports = router;
