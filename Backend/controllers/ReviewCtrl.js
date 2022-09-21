const Reviews = require("../models/reviewModel");
const Requests = require("../models/requestBookModel");

const reviewBookCtrl = {
    createReviews: async (req, res) => {
        try {
            const { rate, date, review } = req.body;

            const newReview = new Reviews({
                rate,
                date,
                review,
            });

            await newReview.save();
            res.json({ msg: "Submitted a Review" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
}

module.exports = reviewBookCtrl;