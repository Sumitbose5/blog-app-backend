// import the model
const Like = require("../models/like");
const Post = require("../models/post");
const User = require("../models/user");

// create route handler
exports.likePost = async(req, res) => {
    try{
        // extract data from req.body
        const { postID, userID } = req.body;
        
        const post = await Post.findById(postID);
        const user = await User.findById(userID);

        if(!post || !user){
            return res.status(500).json({
                message : "Invalid ID's verify them"
            })
        }

        const findPostInLike = await Like.find({"post" : postID});
        // no posts have been liked yet (first like in the post)
        if(findPostInLike.length === 0){
            // create a new like obj
            const newLikeObj = new Like({
                "post" : postID,
                "users" : [userID]
            })
            // save this obj in the Like DB
            await newLikeObj.save();

            console.log(newLikeObj);

            // update the likes in the Post DB
            const updateLikesInPostDB = await Post.findByIdAndUpdate(postID, {$push : {likes : newLikeObj.users}}, {new : true});

            // send the response
            return res.status(200).json({
                post : updateLikesInPostDB
            })
        }
        else{
            // as the post is found that's why we are in this block
            // now find the user in the user's array
            const findUser = await Like.findOne({
                "post" : postID,
                "users" : userID
            });

            // if the user has not liked the post
            if(findUser === null){
                // get the like obj id where the post exists
                const likeObjLoc = await Like.findOne({"post" : postID});
        
                // update the users's array by appending the newuser (userID) in it
                const updateUserLiked = await Like.findByIdAndUpdate(likeObjLoc._id, {$push : {users : userID}}, {new : true});

                // update the post DB 
                const updateLikesInPostDB = await Post.findByIdAndUpdate(postID, {$push : {likes : updateUserLiked._id}}, {new : true});

                // return the response
                return res.status(200).json({
                    postLike : updateLikesInPostDB
                })
            }
            else{
                // if the user has alreday liked the post
                return res.status(500).json({
                    message : "Post Already Liked!"
                })
            }
        }

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : err.message
        })
    }
}