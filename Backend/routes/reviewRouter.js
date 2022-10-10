const router = require("express").Router();
const reviewCtrl = require("../controllers/reviewCtrl");
const auth = require("../middleware/auth");

router
    .route("/review")
    .get(reviewCtrl.getReviews)
    .post(auth,reviewCtrl.createReviews);

router
    .route("/review/:id")
    .delete(reviewCtrl.deleteReview)
    .put(reviewCtrl.updateReview);

router.route("/review/book/:id").get(reviewCtrl.getReviewByBookId);

module.exports = router;