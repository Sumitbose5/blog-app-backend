// import the model
const Comment = require("../models/comment");
const Post = require("../models/post");
const User = require("../models/user");

// create route handler
exports.createComment = async(req, res) => {
    try{
        // fetch the data from req.body
        const {postID, username, myComment} = req.body;

        const findUser = await User.find({username});
        if(findUser.length === 0){
            return res.status(404).json({
                message : "User Not Found"
            })
        }

        // create a comment object
        const comment = new Comment({
            postID, username, myComment
        })

        // save the new comment object in the DB
        const savedComment = await comment.save();

        console.log(savedComment);

        // find the post by username and add the new comment to the comment's array
        const updatedPost = await Post.findByIdAndUpdate(postID, {$push : {comments : savedComment._id}}, {new: true})
                            .populate("comments").exec();

        res.status(200).json({
            post : updatedPost,
        })
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : err.message
        })
    }
}