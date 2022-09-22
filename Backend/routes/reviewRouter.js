const router = require("express").Router();
const reviewCtrl = require("../controllers/reviewCtrl");
const auth = require("../middleware/auth");

router
    .route("/review")
    .post(auth,reviewCtrl.createReviews);

router
    .route("/review/:id")
    .put(reviewCtrl.updateReview);

module.exports = router;