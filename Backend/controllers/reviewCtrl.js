const Reviews = require("../models/reviewModel");

const reviewBookCtrl = {


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


    updateReview:async (req,res) =>{
        try{
            const {rate,date,CommentReview} = req.body;
            await Reviews.findOneAndUpdate(
                {_id:req.params.id},
                {rate,date,CommentReview}
            );
            res.json({ msg: "Updated a Review!" });
        }catch (err){
            return res.status(500).json({ msg: err.message })
        }
    },
};

module.exports = reviewBookCtrl;