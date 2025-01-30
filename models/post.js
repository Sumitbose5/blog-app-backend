const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({

    username : {
        type : String,
        required : true,
        maxLength : 50
    },

    title : {
        type : String,
        required : true,
    },

    body : {
        type : String,
        required : true
    },

    likes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Like",
    }],

    likeCount : {
        type : Number,
        default : 0,
        required : true
    },

    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment",
    }]
})

module.exports = mongoose.model("Post", blogSchema);