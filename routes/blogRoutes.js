const express = require("express");
const router = express.Router();

// import controller
const { createPost, getPosts, getPostsByUsername } = require("../controllers/postController")
const { createComment } = require("../controllers/commentController");
const { likePost, unlikePost } = require("../controllers/likesController");
const { createUser } = require("../controllers/userController")

// define API routes

// User Creation
router.post("/user/create", createUser);

// Post 
router.post("/posts/create", createPost);
router.get("/getPosts", getPosts);
router.get("/getPosts/:username", getPostsByUsername);

// Like Post
router.post("/likes/like", likePost);

// Unlike Post
router.post("/likes/unlike/:id", unlikePost);

// Comment on Post
router.post("/comment/create", createComment);


// export the router
module.exports = router;