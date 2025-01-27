const Blog = require("../models/post");
const User = require("../models/user");

// create route handler
exports.createPost = async(req, res) => {
    try{
        // get the username and content from the request body
        const { username, title, body } = req.body;

        // check if the user is created or not
        const checkUser = await User.find({"username" : username});
        if(checkUser.length === 0){
            return res.status(500).json({
                message : "User doesn't exist!"
            })
        }

        // create an entry in the database of the post
        const responseData = await Blog.create({username, title, body});

        // send a json response with a success flag
        res.status(200).json({
            success : true,
            data : responseData,
            message : "Post Created Successfully"
        });
    }
    catch(err){
        res.status(500).json({
            success : false,
            data : "Internal server error",
            message : err.message
        })
    }
}



exports.getPosts = async(req, res) => {
    try{
        const postData = await Blog.find({});

        res.status(200).json({
            success : true,
            data : postData,
            message : "All Posts data retrived"
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : err.message,
        })
    }
}

exports.getPostsByUsername = async(req, res) => {
    try{
        // extract the username from the url parameters
        const username = req.params.username;

        // check if the user exists or not
        const checkUser = await User.find({"username" : username});
        if(checkUser.length === 0){
            return res.status(500).json({
                message : "User doesn't exist!"
            })
        }

        // if we are here it means the user exists and if we don't find any data
        // from the user it means he/she has not posted anything yet
        const userPostData = await Blog.find({"username": username});

        if(userPostData.length === 0){
            return res.status(404).json({
                success : false,
                message : `No posts from user --> ${username}`
            })
        }

        res.status(200).json({
            success : true,
            data : userPostData,
            message : `All the posts of ${username} fetched`
        })
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success : false,
            message : err.message
        })
    }
}