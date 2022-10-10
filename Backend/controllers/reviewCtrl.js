const Reviews = require("../models/reviewModel");
const Requests = require("../models/requestBookModel");

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
            const { bookId,userId, rate, date, CommentReview } = req.body;

            const newReview = new Reviews({
                bookId,
                userId,
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


    updateReview:async (req,res) =>{
        try{
            const {userId,rate,date,CommentReview} = req.body;
            await Reviews.findOneAndUpdate(
                {_id:req.params.id},
                {userId, rate,date,CommentReview}
            );
            res.json({ msg: "Updated a Review!" });
        }catch (err){
            return res.status(500).json({ msg: err.message })
        }
    },

    deleteReview: async (req, res) => {
        try {
            await Reviews.findByIdAndDelete(req.params.id);
            res.json({ msg: "Deleted a Review" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    //get review by book id
    getReviewByBookId: async (req, res) => {
        try {
            const reviews = await Reviews.find({bookId: req.params.id});
            res.json(reviews);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
};

module.exports = reviewBookCtrl;