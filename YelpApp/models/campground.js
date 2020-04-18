var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

// const Comment = require("./comment");
// campgroundSchema.pre('delete', async function () {
//     try {
//         await Comment.deleteMany({
//             _id: {
//                 $in: this.comment
//             }
//         });
//         return next();
//     } catch (err) {
//         return next(err);
//     }
// })

module.exports = mongoose.model("Campground", campgroundSchema);