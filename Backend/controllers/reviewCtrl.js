const Reviews = require("../models/reviewModel");

const reviewBookCtrl = {

    getReviews: async (req, res) => {
        try {
            const reviews = await Reviews.find();
            res.json(reviews);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    createReviews: async (req, res) => {
        try {
            const { rate, date, CommentReview } = req.body;

            const newReview = new Reviews({
                rate,
                date,
                CommentReview,
            });

            await newReview.save();
            res.json({ msg: "Submitted a Review" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = reviewBookCtrl;