const mongoose = require ("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        rate:{
            type:String,
            required:true
        },
        date:{
            type:String,
            required:true
        },
        CommentReview:{
            type:String,
            required:true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Reviews",reviewSchema);