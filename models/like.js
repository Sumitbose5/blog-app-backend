// import the mongoose library
const mongoose = require("mongoose");

// create model schema for likes
const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: "Post",
    },

    users: [{
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: "Users"
    }]
})

// export the schema
module.exports = mongoose.model("Like", likeSchema);