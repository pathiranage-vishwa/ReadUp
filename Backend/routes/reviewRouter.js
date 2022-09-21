const router = require("express").Router();
const reviewCtrl = require("../controllers/reviewCtrl");
const auth = require("../middleware/auth");


router
    .route("/review")
    .post(auth,reviewCtrl.createReviews);

module.exports = router;