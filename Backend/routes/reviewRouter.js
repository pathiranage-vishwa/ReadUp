const reviewCtrl = require("../controllers/reviewCtrl");
const auth = require("../middleware/auth");
const router = require("express").Router();

router
    .route("/review")
    .post(auth,reviewCtrl.createReviews);

module.exports = router;