// import the mongoose library
const mongoose = require("mongoose");

// create the comment schema
const commentSchema = new mongoose.Schema({
    postID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post",
    },

    username : {
        type : String,
        required : true
    },

    myComment : {
        type : String,
        required : true
    }
})

// export the schema
module.exports = mongoose.model("Comment", commentSchema);