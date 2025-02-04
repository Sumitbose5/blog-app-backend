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
        // first like in the post
        if(findPostInLike.length === 0){
            // create a new like obj
            const newLikeObj = new Like({
                "post" : postID,
                "users" : [userID],
                "likeCount" : 1
            })
            // save this obj in the Like DB
            await newLikeObj.save();

            // console.log("New Like Object", newLikeObj);

            // update the likes in the Post DB
            const updateLikesInPostDB = await Post.findByIdAndUpdate(
                postID, 
                {
                    $push: { likes: newLikeObj.users }, // Push new user into 'likes' array
                    $inc: { likeCount: newLikeObj.users.length } // Increment 'likeCount' by the number of new users
                },
                { new: true }
            );

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
                const updateUserLiked = await Like.findByIdAndUpdate(likeObjLoc._id,
                    {
                        $push : {users : userID},
                        $inc : {likeCount : 1}
                    }, 
                    {new : true});

                // console.log("Update User Liked", updateUserLiked);

                // update the post DB 
                const lastInd = updateUserLiked.users.length - 1;
                const updateLikesInPostDB = await Post.findByIdAndUpdate(postID, 
                    {
                        $push : { likes : updateUserLiked.users[lastInd] },
                        $set: { likeCount: updateUserLiked.likeCount }
                    }, 
                    {new : true}
                );

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



exports.unlikePost = async(req, res) => {
    try{
        const postID = req.params.id;
        const { userID } = req.body;
        const findPost = await Post.findById({_id : postID});

        if(findPost.length === 0){
            return res.status(404).json({
                message : "Post not found"
            })
        }

        const likeID = await Like.find({post : postID});
        console.log("Like ID : ", likeID);

        // Check if there is a like of the user in the likes array or not
        const checkLike = await Like.findOne({users : userID});
        // if user is not present in the users array it means he/she have already unliked the post
        if(!checkLike){
            return res.status(404).json({
                message : "User have already unliked the post"
            })
        }

        const updateLike = await Like.findOneAndUpdate(
            {_id : likeID}, 
            {
                $pull : {users : userID},
                $inc : {likeCount : -1}
            },
            {new : true}
        ); 

        console.log("Update Like to Unlike : ", updateLike);

        const updatePost = await Post.findByIdAndUpdate(postID, 
            {
                $set : {
                    likes : updateLike._id,
                    likeCount : updateLike.likeCount
                }
            },
            {new : true}
        );

        console.log("Updated Post : ", updatePost)

        res.status(200).json({
            updatedLike : updatePost
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message : err.message
        })
    }
}