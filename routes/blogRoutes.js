const express = require("express");
const router = express.Router();

// import controller
const { createPost, getPosts, getPostsByUsername } = require("../controllers/postController")
const { createComment } = require("../controllers/commentController");
const { likePost } = require("../controllers/likesController");
const { createUser } = require("../controllers/userController")

// define API routes
router.post("/posts/create", createPost);
router.get("/getPosts", getPosts);
router.get("/getPosts/:username", getPostsByUsername);

router.post("/comment/create", createComment);

router.post("/likes/like", likePost);

router.post("/user/create", createUser);


// export the router
module.exports = router;